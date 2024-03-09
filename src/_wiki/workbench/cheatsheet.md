---
title: 오로지 키보드로만 모든 것을 해결하기 위한 Cheatsheet
date:  2023-09-18
layout: wiki
tags: productivity
---

사용하기 편한 단축키를 그 중 일부는 머슬메모리로서 체화할 필요가 있는 것들이다.
Tmux/Amethyst/Wezterm 뿐만이 아니라 Chrome(Vimium)/Slack 등 데스크톱 어플리케이션을 사용할때 요긴하게 쓸만한 단축키들을 나열할 예정이다.

### Vim

기본적인 기능에 대한 설명은 [[vim/builtins]]{Vim에서 제공하는 기본 기능} 문서를 참고

#### Vim 안에서 terminal 모드 사용하기
{:#s-1-1}


터미널 모드는 Vim 버퍼 안에서 zsh 터미널을 사용하고 싶을때 주로 사용한다.
터미널 모드를 이용할때는 커맨드 모드로 진입해서`:terminal` 명령을 입력하면 된다.

커맨드 모드에서 쉘 커맨드를 실행하고 싶으면 `:! (실행할 명령어)` 명령을 입력할 수도 있지만,  상호작용이 필요한 명령어를 실행해야 한다면 한계가 있다. 다른 터미널 탭을 켜서 그때그때 CLI를 실행할 수는 있지만, 정신적으로 산만하다.

심지어 `alias`도 먹히지 않는다. alias가 동작하도록 할 수 있는 방법이 있지만 `shellcmdflag` 옵션을 세팅하는 경우에는 Neovim을 실행하는 중에 동작하는 다른 프로세스에도 매번 영향을 미치기 때문에 퍼포먼스가 굉장히 느려진다.

따라서 터미널 모드를 이용하는 것이 이득이 될 때도 종종 있다.
특히, github cli를 이용할때도 도움이 되는데, github cli는 상호작용이 요구되는 CLI 툴이다. Vim에서 제공하는 터미널 모드는 상호작용이 필요한 CLI 도구와도 궁합이 잘맞다.


#### 커스텀 키맵
{:#s-1-2}

* (custom) <kbd>Ctrl</kbd>+<kbd>w</kbd> -> <kbd>V</kbd>  : equivalent to `:vsplit term://zsh`
  * 버퍼를 수직방향으로 분할하고, 분할한 화면을 터미널로 사용한다.


### Amethyst

> **TL;DR** - 마우스의 도움이 없이도 창을 전환하고 윈도우의 레이아웃 배치를 입맛대로 할 수 있다.

**Layouts**

* <kbd>mod1</kbd>+<kbd>space</kbd>, <kbd>mod2</kbd>+<kbd>space</kbd> - 레이아웃 배치를 변경할 수 있다. 레이아웃 배치를 변경하는 방식은 `.amethyst.yml` 파일에서 선언한 layouts 리스트에서 cycle을 도는 방식이다.

**Windows**

* <kbd>mod1</kbd>+<kbd>w</kbd> - 첫번째 스크린에 있는 main-window가 포커스 모드가 된다.
* <kbd>mod1</kbd>+<kbd>e</kbd> - 두번째 스크린에 있는 main-window가 포커스 모드가 된다.
* <kbd>mod2</kbd>+<kbd>w</kbd> - 현재 포커스 모드에 있는 윈도우를 첫번째 스크린으로 옮길 수 있다.
* <kbd>mod2</kbd>+<kbd>e</kbd> - 현재 포커스 모드에 있는 윈도우를 두번째 스크린으로 옮길 수 있다.

**Swap**

* <kbd>mod2</kbd>+<kbd>j</kbd> - 현재 포커스 모드에 있는 윈도우를 레이아웃 배치상 시계방향에 위치한 윈도우와 위치를 바꿔치기 할 수 있다.
* <kbd>mod2</kbd>+<kbd>k</kbd> - 현재 포커스 모드에 있는 윈도우를 레이아웃 배치상 반시계방향에 위치한 윈도우와 위치를 바꿔치기 할 수 있다.
* <kbd>mod1</kbd>+<kbd>enter</kbd> - 현재 스크린에서 main-window 가 배치되는 위치를 swap 할 때 사용된다.

### Tmux

* C-b + w => tmux session을 switching

### Wezterm

* <kbd>Ctrl</kbd>+(<kbd>PgUp</kbd> or <kbd>PgDown</kbd>) - counter-clockwise/clockwise 방향으로 활성화할 탭을 변경할 수 있다.
* <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+(<kbd>PgUp</kbd> or <kbd>PgDown</kbd>) - counter-clockwise/clockwise 방향으로 현재 활성화된 탭의 위치를 옮길 수 있다.
* (custom) <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+(<kbd>z</kbd> or <kbd>x</kbd>) - 터미널의 opacity를 조절한다. [관련 코드](https://github.com/malkoG/dotfiles/blob/main/private_dot_config/wezterm/keymaps.lua#L87-L103)
  * 노트북 한 화면만 보고 작업해야할때 종종 사용한다. 백그라운드에 UI 화면 띄우고, 터미널 띄우고 개발하면서 Hot Module Reloading으로 화면에 바로바로 반영되는 것을 투명도 조절하면서 확인하는 용도로 사용하고 있다.
* (custom) <kbd>Ctrl</kbd>+<kbd>`</kbd> - 현재 열고 있는 탭의 title을 변경할 수 있는 프롬프트를 띄운다. [관련 코드](https://github.com/malkoG/dotfiles/blob/main/private_dot_config/wezterm/keymaps.lua#L105-L119)
  * 터미널의 각 탭이 어떤 역할을 하고 있는지 한 눈에 파악할 필요가 있는데, 현재 띄워놓은 탭의 title을 변경할때 주로 사용한다. (ex. 프로젝트1 / 프로젝트1 서버 프로세스 / 프로젝트 2 / 저널링 / 블로그)
