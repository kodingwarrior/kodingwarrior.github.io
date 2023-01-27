---
title: mind.nvim
date:  2023-01-27
layout: wiki
---

Private 한 문서들을 Notion과 같이 트리 구조로 관리할 수 있게 해주는 플러그인이다. 문서는 마크다운 파일로 관리가 가능하다. 자세한 설명은 vim help가 더 친절하고 정확하기 때문에,  `:h mind-usage` 명령으로 사용법을 확인하는 것을 권장한다. 

개인적으로는 `:MindOpenMain` 명령어를 키면서 사용하고 있는데, 어떤 프로젝트를 열고 있더라도 메모장처럼 띄워서 사용할 수 있는 것이 큰 장점이다. Dropbox와 연동하면, 그 장점이 두배가 된다.

## Recipe 1 : Dropbox 와 연동하기

mind.nvim은 내부적으로 사용하고 있는 데이터를 `~/.lcoal/share/mind.nvim` 경로에서 관리하고 있다. 

아래와 같이 관리할 데이터의 경로를 Dropbox 전용 경로로 지정해두면 Dropbox에서도 내가 작성한 문서를 바로바로 확인이 가능하며, 다른 개발환경에서도 즉시 접근이 가능하다. 사실상 neovim 환경에서 notion 을 사용하는 경험과 비슷한 경험을 누릴 수 있다.

```lua
config = function()
  require'mind'.setup({
	persistence = {
	  state_path = "/home/kodingwarrior/Dropbox/mind-vault/mind.json",
	  data_dir = "/home/kodingwarrior/Dropbox/mind-vault/data",
	}
  })
end
```
