---
title: 'Unix Network Programming Chapter 3 : Socket Introduction'
layout: post
date: '2018-10-18 07:09:00'
categories: post
---

# 3.1 Introduction

이 챕터에서는 전반적으로 네트워크 프로그래밍에서 주로 활용되는 socket API 를 다룰때 알아둬야 할 내용을 다루고 있다. 소켓 주소 구조체를 다루는 자료구조를 다루는 것부터 시작해서, 1) 프로세스에서 커널로, 2) 커널에서 프로세스로 어떻게 소켓 주소 구조체를 통해 정보를 전달하는지를 다루며,  IP 주소를 나타내는 텍스트 표현법과 소켓 주소 구조체에 저장되는 이진 값 사이의 변환을 해주는 `inet_addr`, `inet_ntoa` 함수를 다루면서도 IPv4/IPv6 의 호환을 위해 `inet_pton`, `inet_ntop` 유틸리티 함수를 다룬다.


# 3.2 Socket Address Structure
IPv4 소켓 주소 구조체는 흔히 `인터넷 소켓 주소 구조체` 라고 불리며, `<netinet/in.h>` 헤더 파일에 `sockaddr_in` 이라는 구조체로서 정의되어 있다.

POSIX 표준에서는 아래와 같이 정의되어 있다.

```c
struct in_addr {
    in_addr_t s_addr; /* 32 bit IPv4 주소이며, 네트워크 바이트 순서 */
}

struct sockaddr_in {
    uint8_t  sin_len; /* 구조체의 크기 */
    sa_family_t sin_family; /* AF_INET */
    in_port_t sin_port; /* 포트 번호를 담기 위한 16 bit 변수이며, 네트워크 바이트 순서 */
		
    struct in_addr sin_addr; /* 32 bit IPv4 주소이며, 네트워크 바이트 순서 */
		
    char sin_zero[8]; /* 사용되지 않는 패딩 바이트 */
}
```

이를 시각화하면 아래와 같이 나타낼 수 있다.

```
+--------------+-----------------+---------------+-----------------------+
| sin_len : 1B | sin_family : 1B | sin_port : 2B | sin_addr(s_addr) : 4B |
+--------------+-----------------+---------------+-----------------------+
|                             sin_zero[] : 8B                            |
+------------------------------------------------------------------------+
```

여기서 좀 더 설명이 필요한 부분이 있는데,

* `sin_len`는 **소켓 주소 구조체 자체의 크기**를 나타내는 1 바이트 크기의 멤버변수이다. 운영체제에 따라, `sin_len` 멤버변수가 정의되어 있지 않기도 하는데, 그럴 경우에는 `sin_family` 가 첫번째로 나타나는 멤버변수이며 2 바이트의 크기를 가진다.


# 3.3 Value-Result Arguments

value-result 전달은 함수 내부에서 parameter에 대한 조작을 수행한 후, 함수가 리턴할 때 argument에 parameter에 대한 조작을 수행한 결과가 저장되는 방식을 나타낸다.

# 3.4 Byte Ordering Functions

# 3.5 Byte Manipulation Functions

# 3.6 `inet_aton`, `inet_addr`, and `inet_ntoa` Functions

# 3.7 `inet_pton` and `inet_ntop` Functions

# 3.8 `sock_ntop` and Related Functions

# 3.9 `readn`, `writen` and `readline` Functions