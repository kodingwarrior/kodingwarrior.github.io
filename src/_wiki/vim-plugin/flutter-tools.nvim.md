---
title: akinsho/flutter-tools.nvim
date:  2023-02-05
layout: wiki
---

> Build flutter and dart applications in neovim using the native LSP. It adds the ability to easily launch flutter applications, debug them, as well as extending/exposing LSP functionality such as the widget guides, an outline view of your widgets, and hot reloading.

Neovim 환경에서 [[flutter]]{Flutter} 개발을 쉽게 할 수 있도록 도와준다.

## Features

* Run flutter app with hot reloading
* Start emulators or connected devices
* Visualise colours from LSP
* Visualise logs
* Outline window


## Recipes

### Recipe 1 : P2P 채팅 어플리케이션 테스트하기

* **1)** 같은 프로젝트를 편집하는 Neovim 프로세스를 2개 띄운다. 
  * [[tmuxinator]] 를 이용한다면, 아래와 같이 configuration 파일을 선언할 수 있다.

```yml
windows:
  - frontend:
      layout: main-vertical
      panes:
        - cd ./chat_template/ && vim .
  - frontend-opposite:
      layout: main-vertical
      panes:
        - cd ./chat_template/ && vim .
```

* **2)** 각각의 프로세스에서 `:FlutterEmulators` 명령을 실행하여 어플리케이션을 실행할 디바이스를 띄운다.
* **3)** 각각의 프로세스에서 `:FlutterDevices` 명령을 실행하여, **2)** 에서 띄웠던 디바이스를 각각 다르게 지정하여 어플리케이션을 실행한다.
* **4)** **3)**에서 실행된 각각의 어플리케이션에 다른 인증정보로 접근하여 채팅이 잘 되는지 확인한다.
