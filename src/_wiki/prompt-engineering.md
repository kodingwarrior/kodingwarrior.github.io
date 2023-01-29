---
title: 프롬프트 엔지니어링
date:  2023-01-29
layout: wiki
---

입력으로는 **인공지능이 수행해야 할 과제**를 던져주고, 인공지능이 출력으로서 이에 대한 **해답 후보**를 제공해준다. 데이터셋에 있는 것 중 해답에 가까운 것을 제공하는 것에 가깝기 때문에, 정답이 아닌 경우도 있다. 그렇기 때문에 비판적인 판단이 필요하다.

프롬프트 엔지니어링에 대한 자료는 [여기서](https://github.com/dair-ai/Prompt-Engineering-Guide) 확인할 수 있다.

ChatGPT/Github Copilot의 급부상으로 인해 인공지능을 활용한 생산성 향상에 대해 많은 논의가 되고 있으며, 관련자료를 확보하는대로 문서를 주기적으로 갱신하게 될 것 같다. 

여태까지는 인공지능을 공부해야할 필요성을 잘 느끼지는 못했었지만, 프롬프트 엔지니어링을 잘 활용하는 것이 제텔카스텐으로 생산성을 극대화하는 것 이상으로 도움이 될 것 같아서 지속적으로 관심을 가지고 있다.

## 이용가능한 서비스 

* [ChatGPT](https://openai.com/blog/chatgpt/)
  * 에디터 전용 플러그인
    * [ChatGPT.nvim](https://github.com/jackMort/ChatGPT.nvim)
	* [VSCode + ChatGPT](https://marketplace.visualstudio.com/items?itemName=gencay.vscode-chatgpt)
* [Perplexity](https://www.perplexity.ai/) - 2023년 1월 29일 기준으로, ChatGPT에서 제시해주는 해답 후보가 어느 출처에서 나온 것인지 알 방법이 없다. Perplexity AI는 해답을 제시하면서 그 해답이 어느 출처에 기반한 것인지 같이 제공해준다.
* [Github Copilot](https://github.com/features/copilot)[^1]
  * 에디터 전용 플러그인 
    * [copilot.vim](https://github.com/github/copilot.vim) - vim/neovim 둘 다 사용이 가능하다.
	* [VS Code + Github Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

[^1]: Github Copilot에 대한 [논문](https://arxiv.org/abs/2210.15157)도 있다.
