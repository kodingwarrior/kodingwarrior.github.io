---
title: 'Unix Network Programming Chapter 4 : Elementary TCP Sockets'
layout: post
date: '2018-10-19 00:00:00'
categories: post
---

# 4.1 Introduction
4장에서는 TCP 서버/클라이언트를 구축하는데 필요한 기본 소켓 함수들을 다루고 있다. 4장에서 기본 소켓 함수들을 예시를 들어서 설명 후, 5장에서  TCP 서버/클라이언트를 점진적으로 개선한다. 

또한, **여러개의 클라이언트가 서버와 동시에 연결이 되었을 때 동시성(concurrency)를 제공** 하는 유닉스의 잘 알려진 기법인 동시 서버(concurrent server)를 다룬다. 여기서 각 클라이언트의 연결은 서버가 상대방 클라이언트에 대한 연결을 유지하기 위해 `fork` 시스템 콜을 호출하도록 한다. 4장에서는 `fork` 시스템콜을 이용하여 **클라이언트마다 프로세스로 연결을 유지(one-process-per-client)**하는 모델을 다루며, 26장에서는 스레드를 설명하면서 **클라이언트마다 스레드로 연결을 유지(one-thread-per-client)**하는 모델을 다룬다.
# 4.2 `socket` Function
네트워크 I/O를 수행하기 위해서 프로세스가 가장 먼저해야 하는 작업은 **어떤 프로토콜을 이용해서 통신하고 싶은지 명시하면서** `socket` 함수를 호출하는 것이다. 예를 들면, IPv4 주소를 이용하는 TCP, IPv6 주소를 이용하는 UDP, 유닉스 도메인 스트림 프로토콜 같은 것들이 있을 것이다.


# 4.3 `connect` Function

# 4.4 `bind` Function

# 4.5 `listen` Function

# 4.6 `accept` Function

# 4.7 `fork` and `exec` Functions

# 4.8 Concurrent Servers

# 4.9 `close` Function

# 4.10 `getsockname` and `getpeername` Functions