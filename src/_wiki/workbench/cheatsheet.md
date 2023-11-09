---
title: 오로지 키보드로만 모든 것을 해결하기 위한 Cheatsheet
date:  2023-09-18
layout: wiki
tags: productivity
---

사용하기 편한 단축키를 그 중 일부는 머슬메모리로서 체화할 필요가 있는 것들이다.
Tmux/Amethyst/Wezterm 뿐만이 아니라 Chrome(Vimium)/Slack 등 데스크톱 어플리케이션을 사용할때 요긴하게 쓸만한 단축키들을 나열할 예정이다.

### Vim

자세한 내용은 [[vim/builtins]]{Vim에서 제공하는 기본 기능} 문서를 참고

### Amethyst

> **TL;DR** - 마우스의 도움이 없이도 창을 전환하고 윈도우의 레이아웃 배치를 입맛대로 할 수 있다.

**Layouts**

* `mod1 + space`, `mod2 + space` - 레이아웃 배치를 변경할 수 있다. 레이아웃 배치를 변경하는 방식은 `.amethyst.yml` 파일에서 선언한 layouts 리스트에서 cycle을 도는 방식이다.

**Windows**

* `mod1 + w` - 첫번째 스크린에 있는 main-window가 포커스 모드가 된다.
* `mod1 + e` - 두번째 스크린에 있는 main-window가 포커스 모드가 된다.
* `mod2 + w` - 현재 포커스 모드에 있는 윈도우를 첫번째 스크린으로 옮길 수 있다.
* `mod2 + e` - 현재 포커스 모드에 있는 윈도우를 두번째 스크린으로 옮길 수 있다.

**Swap**

* `mod2 + j` - 현재 포커스 모드에 있는 윈도우를 레이아웃 배치상 시계방향에 위치한 윈도우와 위치를 바꿔치기 할 수 있다.
* `mod2 + k` - 현재 포커스 모드에 있는 윈도우를 레이아웃 배치상 반시계방향에 위치한 윈도우와 위치를 바꿔치기 할 수 있다.
* `mod1 + enter` - 현재 스크린에서 main-window 가 배치되는 위치를 swap 할 때 사용된다.

### Wezterm

* <kbd>Ctrl</kbd> + (<kbd>PgUp</kbd> or <kbd>PgDown</kbd>) - counter-clockwise/clockwise 방향으로 활성화할 탭을 변경할 수 있다.
* <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + (<kbd>PgUp</kbd> or <kbd>PgDown</kbd>) - counter-clockwise/clockwise 방향으로 현재 활성화된 탭의 위치를 옮길 수 있다.
* (custom) <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + (<kbd>z</kbd> or <kbd>x</kbd>) - 터미널의 opacity를 조절한다. [관련 코드](https://github.com/malkoG/dotfiles/blob/main/private_dot_config/wezterm/keymaps.lua#L87-L103)
  * 노트북 한 화면만 보고 작업해야할때 종종 사용한다. 백그라운드에 UI 화면 띄우고, 터미널 띄우고 개발하면서 Hot Module Reloading으로 화면에 바로바로 반영되는 것을 투명도 조절하면서 확인하는 용도로 사용하고 있다.
* (custom) <kbd>Ctrl</kbd> + <kbd>`</kbd> - 현재 열고 있는 탭의 title을 변경할 수 있는 프롬프트를 띄운다. [관련 코드](https://github.com/malkoG/dotfiles/blob/main/private_dot_config/wezterm/keymaps.lua#L105-L119)
  * 터미널의 각 탭이 어떤 역할을 하고 있는지 한 눈에 파악할 필요가 있는데, 현재 띄워놓은 탭의 title을 변경할때 주로 사용한다. (ex. 프로젝트1 / 프로젝트1 서버 프로세스 / 프로젝트 2 / 저널링 / 블로그)
