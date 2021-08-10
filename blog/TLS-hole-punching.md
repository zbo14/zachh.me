---
"slug": "tls-hole-punching"
title: "TLS hole punching"
description: ""
date: 2021-07-14
---

[Hole punching](https://en.wikipedia.org/wiki/Hole_punching_%28networking%29) is a technique that allows 2 peers on disparate private networks to communicate directly with each other. Hole punching exists because most routers on private home and office networks perform [network address translation](https://en.wikipedia.org/wiki/Network_address_translation) (NAT), a method that's grown in popularity under looming IPv4 address exhaustion. This means people browsing the web on a private NAT-ed network *do not* have globally unique, public IPv4 addresses to identify their devices. In fact, they typically "share" a public IP address assigned by their Internet Service Provider (ISP) with other devices on the network. NAT creates a mapping by modifying IP packet headers such that incoming traffic is routed to the appropriate device on the network. Suppose I'm checking my email on my phone and my roommate is simultaneously watching a movie on his laptop. NAT makes sure the traffic pertaining to the former is routed to my phone and traffic relating to the latter is routed to my roommate's computer.

In the case of most web communication, traffic is relayed from client to client by a server behind a globally unique IP address. This avoids direct communication between clients and, as a result, the issues it poses. Clients connect to a known entity that forwards information back and forth between them without having to worry about NAT routers dropping traffic. However, peer-to-peer (p2p) communication via hole punching offers potential security / privacy benefits as well as lower latency: traffic travels directly between peers without a "server detour".

If I want to connect directly to my friend on another network, I run into several issues thanks to NAT. First, my friend cannot give me a public IPv4 address to reach their device. They have a private IPv4 address, but this only works if I'm on their network. Even if they provide an IPv6 address that identifies their device, we still could have issues communicating. Routers usually drop unsolicited inbound traffic, including IPv6 traffic. If the router cannot correlate incoming traffic to contemporaneous outbound traffic, then it deems the traffic unsolicited. If I try to send packets to my friend's IPv6 address, chances are they won't make it to their device. If my friend and I send packets to each other at the same time, we *might* receive each other's packets. This process is difficult to coordinate though and its success is dependent on the chronology and timing of packets sends and receives. To further complicate the situation, different routers implement NAT differently. If my friend's behind a [symmetric NAT](https://en.wikipedia.org/wiki/Network_address_translation#Symmetric_NAT), certain hole punching techniques won't work. This post details a hole punching procedure that allows two peers to establish a direct, reliable, and secure connection without a 3rd party rendezvous server. This process should work for peers on many home networks, though I cannot guarantee it working across all home networks and certainly not many corporate networks.

There are 2 types of hole punching, one for each major Internet transport protocol: [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) and [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol). UDP hole punching is the more prevalent of the two, commonly used for VoIP and gaming. Direct p2p communication improves latency, often times critical in realtime applications. UDP makes no promises regarding reliable delivery of data, but this "shortcoming" is preferable for certain use cases. If I'm video chatting my friend, it's ok if packets are dropped. Their video might freeze for a second and their audio might cut out. The more important point is, when the chat resumes, I see and hear the latest video and audio. I don't need or even want to receive the earlier media that was dropped.

TCP, on the other hand, ensures reliable delivery. Everything is eventually delivered in the order it was sent. Packets can still be dropped, but they'll be resent. This isn't ideal for video chatting my friend, but well suited for other use cases such as file sharing, where the entire content should eventually be delivered uncorrupted. Using [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security), or TLS, we can secure the connection by encrypting all the content that is sent over the wire. This prevents eavesdroppers and network sniffers from seeing what content is shared. My peer is the only party that can access the actual file.

Combining TLS with TCP hole-punching achieves a direct, reliable, and secure connection between peers. I'll walk through some code and packet traces that outline how this facilitates encrypted p2p communication. I created a [repo](https://github.com/zbo14/tls-hole-punching) in case you want to inspect the source or run the demo yourself.

Alice and Bob want to directly and securely exchange messages with each other. Alice is on her office network with public IPv4 address, "1.2.3.4". Bob is at home and his router has public IPv4 address, "5.6.7.8". Both networks have firewalls that drop unsolicited, inbound TCP traffic.

Let's write some Python code to help Alice and Bob achieve direct and secure communication. First, we'll create a stream socket and bind it to a local port:

```python
import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sock.bind(('', 54312))
```

We explicitly bind the socket to port 54312. **Note:** the local port we bind to is not necessarily the same number as the external port in the NAT mapping. For the sake of simplicity, we'll assume Alice and Bob are behind NATs that preserve the local port number in the mapping. However, this isn't always the case and other NATs may employ [different methods](https://en.wikipedia.org/wiki/TCP_hole_punching#Methods_of_Port_Prediction_(with_predictable_NATs). Usually during socket creation, the OS selects a random port to bind to, which isn't currently claimed by other socket(s). However, Alice and Bob need to know each other's ports beforehand so they can connect through each other's firewall:

```python
# remote_ip is the other party's public IPv4 address
sock.connect((remote_ip, 54312))
```

Socket APIs follow a client-server paradigm. Typically, 1 party with a publicly accessible endpoint [listens](https://linux.die.net/man/2/listen) for the other party to [connect](https://linux.die.net/man/2/connect) to that endpoint and then [accepts](https://linux.die.net/man/2/accept) the connection. Python has a [socket module](https://docs.python.org/3/library/socket.html) that mirrors this API. The implementation in the above snippet differs from normal connection establishment because each party connects and neither listens. This approach, uncommon as it is, is common enough to have a name: TCP simultaneous open.

Before we dig into TCP simultaneous open, let's add some firewall rules and run normal connection establishment with netcat. Suppose Bob runs `nc -l 54312` in terminal and Alice runs `nc <bob's_ip> 54312`. `tcpdump` show us something like the following:

```
alice.54312 > bob.54312: Flags [S], seq 2771453946, win 64240, options [mss 1460,sackOK,TS val 3414096111 ecr 0,nop,wscale 7], length 0
bob.54312 > alice.54312: Flags [S.], seq 3827176480, ack 2771453947, win 65160, options [mss 1460,sackOK,TS val 1482156387 ecr 3414096111,nop,wscale 6], length 0
alice.54312 > bob.54312: Flags [.], ack 1, win 502, options [nop,nop,TS val 3414096138 ecr 1482156387], length 0
```

Each line in the above snippet corresponds to a step in the [3-way handshake](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment): SYN, SYN-ACK, and ACK. Alice performs the "active open" by initially sending the SYN. Bob performs the "passive open" by responding with the SYN-ACK. Alice completes connection establishment by sending the ACK. Nothing unusual here.

What happens if Alice and Bob run our python code with no additional firewall rules? `tcpdump` yields a different packet capture depicting the TCP simultaneous open:

```
alice.54312 > bob.54312: Flags [S], seq 3435528952, win 64240, options [mss 1460,sackOK,TS val 3389124722 ecr 0,nop,wscale 7], length 0
bob.54312 > alice.54312: Flags [S], seq 205727395, win 64240, options [mss 1460,sackOK,TS val 1457185603 ecr 0,nop,wscale 6], length 0
alice.54312 > bob.54312: Flags [S.], seq 3435528952, ack 205727396, win 64240, options [mss 1460,sackOK,TS val 3389125371 ecr 1457185603,nop,wscale 7], length 0
bob.54312 > alice.54312: Flags [.], ack 1, win 1004, options [nop,nop,TS val 1457185623 ecr 3389125371], length 0
```

We have 4 lines this time! Alice performs the initial active open. Then Bob sends a SYN, Alice responds with the SYN-ACK, and Bob completes the handshake with the ACK. What's happening here?!

Alice's initial SYN doesn't make it to Bob. The router on Bob's network deems the SYN unsolicited and drops it. However, Alice's router stores a NAT mapping between Alice's machine and Bob's endpoint once it forwards her SYN to Bob. Even though he doesn't receive Alice's SYN, Bob performs the active open as well and sends his own SYN. When the SYN arrives at Alice's router, it matches the NAT mapping and is forwarded to Alice's machine. The 3-way handshake then proceeds per usual.

Take a look at the [TCP state diagram](https://upload.wikimedia.org/wikipedia/commons/f/f6/Tcp_state_diagram_fixed_new.svg). In the first snippet, Alice and Bob follow the "client" and "server" paths, respectively. In the second snippet, Alice starts on the client path but then moves from SYN-SENT to SYN-RECEIVED and continues along the server path. Bob, on the other hand, follows the client path entirely.

Alice and Bob's simultaneous open differs from other simultaneous opens where *each* party receives the other's SYN, moves from SYN-SENT to SYN-RECEIVED, and then ACKs. Of course, this path is unrealistic in scenarios where both peers are on NAT-ed networks. Someone's initial inbound traffic will be dropped. :/

Alright, Alice and Bob have established a direct connection. How do they go about securing this channel of communication? Fortunately, it's fairly easy to "wrap" an existing TCP connection with a secure TLS context. Take a look at the following Python code:

```python
import socket
import ssl

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sock.bind(('', 54312))

# remote_ip is the other party's public IPv4 address
sock.connect((remote_ip, 54312))

server_side = False # 1 peer should set this to True
proto = ssl.PROTOCOL_TLS_SERVER if server_side else ssl.PROTOCOL_TLS_CLIENT

context = ssl.SSLContext(proto)

if server_side:
    context.load_cert_chain('/path/to/cert', '/path/to/key')
else:
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE

tls_sock = context.wrap_socket(sock=sock, server_side=server_side)
```

The beginning should look familiar. After we establish the connection, we create a TLS context and wrap the existing TCP socket with this context. **Note:** TLS was formerly named SSL, or Secure Sockets Layer. Despite the name holdover, the above code is in fact using TLS.

TLS also follows a client-server paradigm. Even though both peers act as clients with regard to TCP, 1 peer must act as the TLS server and the other as the TLS client. For the sake of simplicity, I hard-coded the value in the above snippet, so the `server_side` peer would simply change the value to `True`. However, there are ways to coordinate role agreement programmatically. For instance, a naive approach involves each peer comparing its public IP address against its peer's address. The peer with the lexicographically "greater" address is the server and the other is the client.

We need some trickery to shoehorn our p2p implementation into a client-server framework. The server needs to load a TLS certificate and the corresponding private key. This can be a self-signed certificate for "localhost" generated by [OpenSSL](https://www.openssl.org/) or the like. Since we specify peers by public IP address and external port, we don't care about hostnames or verifying them. Hostname verification is absolutely essential for the web, but for our case, we really only care about encryption. This is why the TLS client sets `context.check_hostname` to `False` and `context.verify_mode` to `ssl.CERT_NONE`. There are certainly other ways to secure existing TCP connections, but this approach seemed fairly simple despite a bit of shoehorning, while leveraging existing modules in the Python standard library.
