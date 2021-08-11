---
"slug": "tls-hole-punching"
title: "TLS hole punching"
description: ""
date: 2021-08-11
---

[Hole punching](https://en.wikipedia.org/wiki/Hole_punching_%28networking%29) is a technique that allows 2 peers on disparate private networks to communicate directly with each other. Hole punching exists because most routers on private home and office networks perform [Network Address Translation](https://en.wikipedia.org/wiki/Network_address_translation) (NAT), a method that's grown in popularity under looming [IPv4 address exhaustion](https://en.wikipedia.org/wiki/IPv4_address_exhaustion). This means people browsing the web on a private NAT-ed network *do not* have globally unique, public IPv4 addresses to identify their machines. In fact, they typically share a public IP address assigned by their Internet Service Provider (ISP) with other machines on the network. NAT creates a mapping by modifying IP packet headers such that incoming traffic is routed to the appropriate machine on the network. Suppose I'm checking my email on my phone and my friend, who's visiting, is simultaneously watching a movie on their laptop. NAT makes sure the traffic pertaining to the former is routed to my phone and traffic relating to the latter is routed to my friend's computer.

In the case of most web communication, traffic is relayed from client to client by a server behind a globally unique IP address. This avoids direct communication between clients and, as a result, the issues it poses. Clients connect to a known entity that forwards information back and forth between them without having to worry about NAT routers dropping traffic. However, peer-to-peer (p2p) communication via hole punching offers potential security and privacy benefits as well as lower latency: traffic travels directly between peers without a "server detour".

If I want to connect directly to my friend on another network, I run into several issues. First, my friend cannot give me a public IPv4 address to reach their machine. They have a private IPv4 address, but this only works if I'm on their network. Even if they have an IPv6 address that identifies their machine, we'll still likely have issues communicating. Routers usually drop unsolicited inbound traffic, including IPv6 traffic. If the router cannot correlate incoming traffic to contemporaneous outbound traffic, it drops the traffic. If I try to send packets to my friend's IPv6 address, chances are they won't make it to their machine. If my friend and I send packets to each other at the same time, we *might* receive each other's packets. This process is difficult to coordinate though and its success is contingent on the chronology and timing of packets sent and received. To further complicate the situation, different routers implement NAT differently. If my friend's behind a [symmetric NAT](https://en.wikipedia.org/wiki/Network_address_translation#Symmetric_NAT), certain hole punching techniques won't work.

This post details a hole punching procedure that allows two peers to establish a direct, secure connection without a 3rd party (i.e. rendezvous server). This process should work for peers on many home networks. However, I cannot guarantee it working across all home networks and certainly not many corporate networks.

There are 2 types of hole punching, one for each major Internet transport protocol: [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) and [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol). UDP hole punching is the more prevalent of the two, commonly used for VoIP and gaming. Direct p2p communication improves latency, often times critical in realtime applications. UDP makes no promises regarding reliable delivery of data, but this "shortcoming" is preferable for certain use cases. If I'm video chatting my friend, it's ok if packets are dropped. Their video might freeze for a second and their audio might cut out. The more important point is, when the chat resumes, I see and hear the latest video and audio. I don't need or even want to receive the earlier media that was dropped.

TCP, on the other hand, ensures reliable delivery. Everything is eventually delivered in the order it was sent. Packets can still be dropped, but they'll be resent. This isn't ideal for video chatting my friend, but well suited for other use cases such as file sharing, where the entire content should eventually be delivered uncorrupted. Using [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security), or TLS, we can secure the connection by encrypting all the content that is sent over the wire. This prevents eavesdroppers from seeing what content is shared. My peer is the only party that can access the actual file.

Combining TLS with TCP hole punching achieves a direct connection between peers, over which information is reliably and securely exchanged. I'll walk through some code and packet traces that outline how this facilitates encrypted p2p communication. I created a [repo](https://github.com/zbo14/tls-hole-punching) in case you want to inspect the source or run the demo yourself.

Let's set the stage: Alice and Bob want to directly and securely exchange messages with each other. Alice is on her office network with public IPv4 address, "1.2.3.4". Bob is at home and his router has public IPv4 address, "5.6.7.8". Both networks have firewalls that drop unsolicited, inbound TCP traffic.

Let's write some Python code to help Alice and Bob achieve direct and secure communication. First, we'll create a stream socket and bind it to a local port:

```python
import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sock.bind(('', 54312))
```

We explicitly bind the socket to port 54312. **Note:** the local port we bind to is not necessarily the same number as the external port in the NAT mapping. For the sake of simplicity, we'll assume Alice and Bob are behind NATs that preserve the local port number in the mapping. However, this isn't always the case and other NATs may employ [different methods](https://en.wikipedia.org/wiki/TCP_hole_punching#Methods_of_Port_Prediction_(with_predictable_NATs)). Usually during socket creation, the OS selects a random port to bind to, which isn't currently claimed by other socket(s). However, Alice and Bob need to know each other's ports beforehand so they can connect through each other's firewall:

```python
# remote_ip is your peer's public IPv4 address
sock.connect((remote_ip, 54312))
```

Socket APIs follow a client-server paradigm. Typically, 1 party with a publicly accessible endpoint [listens](https://linux.die.net/man/2/listen) for the other party to [connect](https://linux.die.net/man/2/connect) to that endpoint and then [accepts](https://linux.die.net/man/2/accept) the connection. Python has a [socket module](https://docs.python.org/3/library/socket.html) that mirrors this API. The implementation in the above snippet differs from normal connection establishment because each party connects and neither listens. This approach, uncommon as it is, is common enough to have a name: TCP simultaneous open.

Before we dig into TCP simultaneous open, let's add some firewall rules and run normal, client-server connection establishment with netcat. Suppose Bob runs: `nc -l 54312` in terminal and Alice runs `nc 5.6.7.8 54312`. `tcpdump` show us something like the following:

```
1.2.3.4.54312 > 5.6.7.8.54312: Flags [S], seq 2771453946, win 64240, options [mss 1460,sackOK,TS val 3414096111 ecr 0,nop,wscale 7], length 0
5.6.7.8.54312 > 1.2.3.4.54312: Flags [S.], seq 3827176480, ack 2771453947, win 65160, options [mss 1460,sackOK,TS val 1482156387 ecr 3414096111,nop,wscale 6], length 0
1.2.3.4.54312 > 5.6.7.8.54312: Flags [.], ack 1, win 502, options [nop,nop,TS val 3414096138 ecr 1482156387], length 0
```

Each line in the above snippet corresponds to a step in the [3-way handshake](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment): SYN, SYN-ACK, and ACK. Alice performs the "active open" by initially sending the SYN. Bob performs the "passive open" by responding with the SYN-ACK. Alice completes connection establishment by sending the ACK. Nothing unusual here.

What happens if Alice and Bob run our Python code with no permissive firewall rules? `tcpdump` yields a different packet capture depicting the TCP simultaneous open:

```
1.2.3.4.54312 > 5.6.7.8.54312: Flags [S], seq 3435528952, win 64240, options [mss 1460,sackOK,TS val 3389124722 ecr 0,nop,wscale 7], length 0
5.6.7.8.54312 > 1.2.3.4.54312: Flags [S], seq 205727395, win 64240, options [mss 1460,sackOK,TS val 1457185603 ecr 0,nop,wscale 6], length 0
1.2.3.4.54312 > 5.6.7.8.54312: Flags [S.], seq 3435528952, ack 205727396, win 64240, options [mss 1460,sackOK,TS val 3389125371 ecr 1457185603,nop,wscale 7], length 0
5.6.7.8.54312 > 1.2.3.4.54312: Flags [.], ack 1, win 1004, options [nop,nop,TS val 1457185623 ecr 3389125371], length 0
```

We have 4 lines this time! Alice performs the initial active open. Then Bob sends a SYN, Alice responds with the SYN-ACK, and Bob completes the handshake with the ACK. What's happening here?!

Alice's initial SYN doesn't make it to Bob. The router on Bob's network deems the SYN unsolicited and drops it. However, Alice's SYN "punches a hole" when it passes through her router. In other words, her router stores a NAT mapping between Alice's machine and Bob's endpoint. When Bob's SYN arrives at Alice's router, it matches the NAT mapping and is forwarded to Alice's machine. The 3-way handshake then proceeds as usual.

Take a look at the [TCP state diagram](https://upload.wikimedia.org/wikipedia/commons/f/f6/Tcp_state_diagram_fixed_new.svg). In the first example, Alice and Bob follow the "client" and "server" paths, respectively. In the second snippet, Alice starts on the client path but then moves from SYN-SENT to SYN-RECEIVED and continues along the server path. Bob, on the other hand, follows the client path entirely.

There are a [couple conditions](https://en.wikipedia.org/wiki/TCP_hole_punching#Other_requirements_on_the_NAT_to_comply_with_TCP_simultaneous_open) necessary for TCP simultaneous open to work. Each peer's NAT should...

> (1) not send an RST as a response to an incoming SYN packet that is not part of any mapping
>
> (2) accept an incoming SYN for a public endpoint when the NAT has previously seen an outgoing SYN for the same endpoint

In regards to the 1st point, one can check `tcpdump` to see whether a NAT responds to an unrecognized SYN with an RST. The 2nd point can also be tested in isolation. However, it might just be easier to run the demo in this post. If it works, then the 2nd condition must hold true as well.

Alice and Bob's simultaneous open differs from other simultaneous opens where *each* party receives the other's SYN, moves from SYN-SENT to SYN-RECEIVED, and then ACKs. Of course, this path is unrealistic in scenarios where both peers are on NAT-ed networks. Someone's initial inbound traffic will be dropped. :/

Alright, Alice and Bob have established a direct connection. How do they go about securing this channel of communication? Fortunately, it's fairly easy to "wrap" an existing TCP connection with TLS. Take a look at the following Python code:

```python
import socket
import ssl

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sock.bind(('', 54312))

# remote_ip is your peer's public IPv4 address
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

The beginning should look familiar. After we establish the connection, we create a TLS context and wrap the existing TCP socket with this context. **Note:** TLS was formerly named SSL, or Secure Sockets Layer. Despite the name holdover, the above code is using TLS and not the deprecated SSL.

The TLS protocol also follows a client-server paradigm. Even though both peers act as clients with regard to TCP, 1 peer must act as the TLS server and the other as the TLS client. For the sake of simplicity, I hard-coded the value in the above snippet, so the `server_side` peer can simply change the value to `True`. There are ways to coordinate role agreement programmatically, however. A naive approach involves each peer comparing its public IP address against the other's public IP address. The peer with the lexicographically "greater" address could be the server and the other would be the client.

The peer acting as the TLS server then needs to load a TLS certificate and the corresponding private key. This can be a self-signed certificate for "localhost" generated by [OpenSSL](https://www.openssl.org/) or the like. Since we specify peers by public IP address and external port, we don't care about hostnames or verifying them. Hostname verification is absolutely essential for websites, but we really only care about encrypting our connection. This is why the TLS client sets `context.check_hostname` to `False` and `context.verify_mode` to `ssl.CERT_NONE`. Otherwise, Python will raise a `ssl.SSLCertVerificationError`.

There are other ways to secure existing TCP connections besides using TLS. This approach seems fairly simple despite shoehorning a p2p configuration into a client-server framework. More importantly, it leverages an existing RFC protocol and module in the Python standard library. I'd be interested to see an implementation that uses the [Noise Framework](http://noiseprotocol.org/) to secure p2p connections. Any takers? ;)

We've established a direct, secure channel of communication between Alice and Bob. Let's send some messages and wrap-up:

```python
# continued...

tls_sock.send(b'hello world')
msg = tls_sock.recv(11)

print(msg.decode())

sock.close()
```

Just a simple "hello world" for now. Alice and Bob should both see the greeting in their terminals. Finally, Alice and Bob close their sockets.

This shows how 2 peers on disparate, NAT-ed networks can connect directly and securely. We achieved this by coordinating a TCP simultaneous open that also functions as a TCP hole punching technique. Once a TCP connection is established through the NAT mapping, we secure the connection by wrapping it with TLS.

The [demo repo](https://github.com/zbo14/tls-hole-punching) includes the Python code as well as a NodeJS example. You should be able to run both examples on the command line (please refer to the README for more info). I've also been working on [a CLI](https://github.com/zbo14/ptt) that implements the procedure outlined in this post *and* layers other functionality on top of it. It allows you to add, remove, and connect to peers. Once connected to a peer, you can send and receive messages and files, all from the comfort of your terminal. In addition, desktop notifications appear when you receive content from a peer. This project is still in the early stages, but I'm excited to see whether it makes secure p2p communication and file-sharing easier. Still a lot of work to do, but hopefully it's a start!

*Happy hole punching!*
