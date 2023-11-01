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

* `Ctrl + PgUp/PgDown` - counter-clockwise/clockwise 방향으로 활성화할 탭을 변경할 수 있다.
* `Ctrl + Shift + PgUp/PgDown` - counter-clockwise/clockwise 방향으로 현재 활성화된 탭의 위치를 옮길 수 있다.
