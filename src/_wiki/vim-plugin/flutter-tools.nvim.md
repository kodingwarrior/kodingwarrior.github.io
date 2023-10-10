---
title: akinsho/flutter-tools.nvim
date:  2023-02-05
layout: wiki
tags: vim
---

> Build flutter and dart applications in neovim using the native LSP. It adds the ability to easily launch flutter applications, debug them, as well as extending/exposing LSP functionality such as the widget guides, an outline view of your widgets, and hot reloading.

Neovim 환경에서 [[flutter]]{Flutter} 개발을 쉽게 할 수 있도록 도와준다.

## Features

* Run flutter app with hot reloading
* Start emulators or connected devices
* Visualise colours from LSP
* Visualise logs
* Outline window

## Commands

플러터 앱을 실행할때는 `:FlutterRun`, `:FlutterDevices` 명령을 사용한다. 당연히, 모바일 환경에서 플러터 앱을 실행하려면 `:FlutterEmulators` 명령을 사용하여, 플러터앱을 구동할 기기 에뮬레이터를 띄워야 한다. 플러터 앱이 실행이 되면 `__FLUTTER_DEV_LOG__` 라는 이름의 버퍼[^1]에 실시간으로 로그가 기록된다. 


* `:FlutterLogClear` - Flutter 로그가 기록되는 버퍼(`__FLUTTER_DEV_LOG__`)를 비운다.
* `:FlutterQuit` - 현재 실행 중인 앱을 종료한다.
* `:FlutterRestart` - 현재 실행 중인 앱을 재시작한다. 
  * 다만, 이는 **Hot Reloading**이기 때문에, **fully restart** 하려면 다음과 같은 절차를 진행해야 한다.
    * **1)** (Terminal) 프로젝트 루트 디렉토리에서 `flutter clean` 명령을 실행하여, 빌드 파일 및 캐시를 비운다.
	* **2)** (Terminal) 다시 `flutter pub get` 명령을 실행하여 디펜던시를 설치한다.
	* **3)** (Neovim) `:FlutterQuit` 명령으로 실행중이던 플러터 앱을 종료한다.
	* **4)** (Neovim) `:FlutterRun` 혹은 `:FlutterDevices` 명령을 실행하여 다시 앱을 빌드 후 실행한다.

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


[^1]:  로그가 기록되는 버퍼 대신 다른 파일을 열고 있더라도, **telescope.nvim** 유저라면, 로그가 기록되는 버퍼로 이동할때 `builtin.buffers` 유틸리티 함수를 이용해서 다시 이동할 수 있다.
