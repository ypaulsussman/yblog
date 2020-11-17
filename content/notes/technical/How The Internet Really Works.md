## How The Internet Really Works

### Chapter 1: How Is the Internet Networked?
- A _network card_ handles a device’s connection to the network, including providing the network with the device’s identification
- _MAC_ (Media Access Control) _addresses_
  - Also called the _device ID_ 
  - Each network card has one
  - The router uses this address to identify the devices that are connected to it
  - Also allows the software operating system running on the device to identify the card’s exact model
  - Usually chosen by the manufacturer of the network card
  - Useful only to local networks; shouldn’t be required beyond this point
  - Some operating systems have started to randomize the MAC address to prevent it from being too easily linked to real-world identities
- Connecting via a router
  - After (physically connecting by cable, or choosing a Wi-Fi network), 
  - A router simply does two things. 
    - It hands out a _network address_, assigned via the _Dynamic Host Configuration Protocol_ (DHCP), to your device’s network card
    - It tells your device to route all data that it wants to send via the local network’s standard gateway (usually the router itself.)

### Chapter 2: What Form Does Information Take on the Internet?
- A _network packet_ is a unit of data that consists of 
  - routing information
    - Internet protocols assign each packet an _address tag_ that contains the origin and destination addresses.
    - This tag is part of a _packet header_ that describes the size and type of the packet.
  - content
- Network devices encode binary information differently depending on the transmission medium:
  - Through copper wire, it transmits as electrical signals.
  - Through the air, it takes the form of radiowaves.
  - Through glass fiber, it is sent as light signals.

### Chapter 3: How Do Devices Communicate on the Internet?
- The Internet Protocol (IP) standardizes...
  - how packets are structured, and 
  - how addresses on the internet must be formatted
- IP Addresses are...
  - public when they have direct access to the internet (like the one given to your home router by your ISP)
  - private when they have no direct access, but instead connect through an intermediary (like those given to the devices connected to your home router).
- _Network Address Translation_ (NAT) 
  - When using NAT, the router keeps all the information about which private-network device sent which packets in its memory. 
  - When the network receives a reply from the internet, the router rewrites the incoming packets’ tags and sends the packets to the private address that its memory says is supposed to receive them. 
  - NAT happens only in IPv4
- Some address numbers carry significance: 
  - Private addresses start with: `192.168.xxx.xxx`, `10.xxx.xxx.xxx`, or `172.16.xxx.xxx - 172.31.xxx.xxx`
  - Addresses that start with `0.0.0.0 - 0.0.0.31` or `127.xxx.xxx.xxx` are reserved for specific use cases and cannot be used to route traffic over a network.
  - All other addresses are public.
- IP addresses may be assigned statically (for servers) or dynamically (for routers and other clients)
- _Internet Protocol Security_ (IPsec) is a secure network protocol suite that authenticates and encrypts packets to prevent _IP spoofing_
  - Operates at "internet layer" (OSI layer 3), below e.g.
  - TLS (transport layer) or SSH (application layer)

### Chapter 4: How Does Information Travel on the Internet?
- The internet isn’t a unified network. 
  - Instead, it’s a network made out of tens of thousands of smaller networks called _autonomous systems_ 
  - These belong to universities, internet service providers (ISP), or telecommunications companies
  - AS are so named because they’re administered independently from each other
  - There are currently about 94,000 AS
  - Each AS controls its own map of the internet and references routes/distances to other networks from its own point of view
- The _Border Gateway Protocol_ (BGP) defines how information about IP packet routes are exchanged between multiple AS's
  - Routers that act as entry and exit points of the whole AS are called _BGP routers_
  - The BGP routers of different AS's talk to one another regularly, and exchange maps of all routes they know about and want to share
- _Internet exchange points_ (IXP) are the physical connections of several, often hundreds, of AS's. 
  - Their physical interconnection exists through an Ethernet or glass fiber cable, and other network equipment such as switches or routers
  - One such IXP/data center can be made up of several buildings containing thousands of computers and cables, all running 24/7.
  - There are more than 1,000 IXPs worldwide. Around 240 are located in Europe and around 340 in North America.
- _Transport protocols_ 
  - These handle:
    - Splitting the data into smaller pieces on the sending side and 
    - Reassembling them on the receiving side
  - Include UDP, TCP, QUIC
  - UDP:
    - Calls smaller units of data _datagrams_
    - Prioritizes speed at the cost of reliability
    - IP determines how to route packets to a destination; UDP adds information to indicate which software should handle the packets’ content at the destination.
      - To do so, UDP adds to each datagram a header containing _port numbers_ associated with a specific software or service.
      - UDP sends these datagrams individually to the IP software, which then encapsulates each datagram into a packet and sends the packets over the internet to their destination
    - UDP doesn’t keep track of... 
      - whether packets arrive at their destination, and
      - whether they arrive in the correct order
    - UDP is commonly used in VOIP, video streaming, and online gaming
  - TCP:
    - Slower, but provides error correction, as well as ordered and checked arrival
    - TCP is used for the World Wide Web, email, p2p apps, and file transfers
    - When two applications want to send packets via TCP, TCP... 
      - establishes a bidirectional communication channel called a _pipe_ or _stream_,
      - divides the data it wants to send into smaller segments,
      - numbers them, to track delivery, then
      - sends all segments individually to the IP software (which in turn encapsulates each segment into a packet); finally, it
      - requires the destination app to acknowledge packet receipt by sending back the numbers of the segments it receives.
    - Whenever the destination doesn’t acknowledge receipt, or reports a damaged packet, TCP on the sender’s side sends those packets again; any subsequent packets must wait in the pipe until the problem is resolved.
    - To establish and conclude that aforementioned stream, applications perform something like a three-way handshake:
      - To start the transmission, the applications first send special packets through TCP known as `SYN—SYN`/`ACK—ACK`. 
      - They then send the packets with the desired content.
      - Finally, the apps end the transmission by sending special packets with the commands `FIN—FIN`/`ACK—ACK`.
  - QUIC:
    - Uses UDP underneath
    - Adds a _connection ID_ to each datagram that allows the sender/receiver to maintain a connection even when changing IP addresses
    - Also adds information that the QUIC protocol can use on the receiving end to track and order the datagrams as they arrive
    - Doesn’t rely on a single stream to process data (so no queueing when a packet is dropped/damaged)

### Chapter 5: How Do People Relate to Information on the Internet?
- _DNSSEC_ is the Internet Engineering Task Force's security extensions on top of the DNS protocol
  - DNSSEC lets us authenticate DNS requests, but doesn't provide privacy
  - For this, _DNS over HTTPS_ can be used to connect to a DNS resolver of the app/user’s choice via an encrypted connection (instead of sending DNS requests to the local DNS resolver of the ISP)
- _Hypertext Transfer Protocol_ (HTTP) is... 
  - the protocol for exchanging or transferring hypertext; 
  - the foundation of data communication over the World Wide Web;
  - the protocol that makes a web browser and a web server understand each other (that is, the application layer; actual transport of the data happens via TCP/IP.)