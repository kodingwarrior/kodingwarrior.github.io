---
title: kodingwarrior's workbench
date:  2023-01-20
layout: wiki
---

이 문서에서는 작업 환경을 어떻게 구성하고 있는지 기록할 것이다.


## 하드웨어 구성 

* Main laptop : [Lenovo Thinkpad X1 Extreme Gen2](https://wiki.archlinux.org/title/Lenovo_ThinkPad_X1_Extreme_(Gen_2))
  * OS : Archlinux

## 작업 환경

### 공통으로 사용하고 있는 것 

* Terminal : [[wezterm]] -- `GPU Accelerated terminal emulator which is configurable by lua`
* Text Editor / Blogging : [[neovim]]
  * Editor plugin : [[vim-plugin]]{이 문서}에서 확인
* managing workspace : [[tmuxinator]]

### macOS 에서만 사용하고 있는 것

* Amethyst (Tiling Window Manager) - https://ianyh.com/amethyst/
  * 스크린 안에 여러개의 윈도우를 배치하는 방식을 바꾼다던가, 현재 focus 모드에 있는 스크린을 단순한 키 동작 만으로 바꾼다던가 마우스를 이용하지 않고 스크린 사이를 오가는 것이 가능하다.

### Linux

* xmonad (Tiling Window Manager) - https://xmonad.org/
  * macOS의 Amethyst와 비슷한 역할을 하는 Tiling Window Manager로 haskell 기반으로 configuration을 수정할 수 있다.

## 더 보기

위에서 언급한 도구들을 사용하다보면, 마우스를 사용하지 않고도 오로지 키보드 단축키 입력만으로 이론상 모든 것을 해결할 수 있는데, 일부 단축키는 아직까지는 **머슬 메모리**에 남아있지 않은 상태다. 당장은 헷갈리기 쉽지만 유용한 shortcut들을 [[workbench/cheatsheet]]{이 문서}에 기록으로 남길 계획이다.
