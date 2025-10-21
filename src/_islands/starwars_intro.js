class StarWarsIntro extends HTMLElement {
  // 관찰할 속성 정의
  static get observedAttributes() {
    return ["auto-play", "duration", "height"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isPlaying = false;
  }

  connectedCallback() {
    this.render();
    this.init();

    const replayButton = this.shadowRoot.querySelector(".replay-button");
    if (replayButton) {
      replayButton.addEventListener("click", () => {
        this.isPlaying = false; // Reset flag to allow restart
        this.startAnimation();
      });
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      // 속성 변경 시 애니메이션을 재시작할 필요가 있다면 (예: duration 변경 시)
      if (name === "duration" && this.isPlaying) {
        this.startAnimation();
      }
    }
  }

  init() {
    const autoPlay = this.getAttribute("auto-play") === "true";

    if (autoPlay) {
      // 1초 후 자동 시작
      setTimeout(() => this.startAnimation(), 1000);
    }
  }

  /**
   * 애니메이션을 시작/재시작합니다.
   */
  startAnimation() {
    if (this.isPlaying) return; // 이미 재생 중이라면 중복 실행 방지

    this.isPlaying = true;
    const crawl = this.shadowRoot.querySelector(".starwars-crawl");
    const replayButton = this.shadowRoot.querySelector(".replay-button"); // Get button reference

    // Hide button at start
    if (replayButton) {
      replayButton.style.display = "none";
    }

    // 1. 애니메이션을 'none'으로 설정하여 초기 상태(0% 키프레임)로 리셋
    //    (top: 100%, opacity: 0) 상태로 되돌아갑니다.
    crawl.style.animation = "none";

    // 2. DOM이 변경된 것을 감지할 수 있도록 짧은 딜레이 후 애니메이션 재시작
    //    (reflow/repaint를 유도하여 애니메이션을 처음부터 다시 재생)
    setTimeout(() => {
      crawl.style.animation = `starwarsCrawl ${this.duration}s linear`;
    }, 10);

    // 3. 애니메이션 종료 시간 계산 후 재시작 (무한 반복)
    setTimeout(() => {
      this.isPlaying = false;
      // Show button when animation ends
      if (replayButton) {
        replayButton.style.display = "block"; // Or 'inline-block' depending on desired layout
      }
      // auto-play가 true인 경우에만 재시작
      if (this.getAttribute("auto-play") === "true") {
        this.startAnimation();
      }
    }, this.duration * 1000);
  }

  get duration() {
    return parseInt(this.getAttribute("duration") || "40");
  }

  get height() {
    return this.getAttribute("height") || "80vh";
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .starwars-container {
                    position: relative;
                    width: 100%;
                    height: ${this.height};
                    min-height: 600px;
                    background: transparent;
                    overflow: hidden; /* 텍스트가 이 영역 밖으로 벗어나는 것을 숨김 */
                    border-radius: 3px;
                }



                .starwars-text {
                    display: flex;
                    justify-content: center;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    color: #444;
                    font-family: 'Pathway Gothic One', 'Pretendard', sans-serif;
                    font-size: calc(2rem + 4vw);
                    font-weight: 600;
                    letter-spacing: 4px;
                    line-height: 150%;
                    perspective: 1200px; /* 3D 효과의 깊이 */
                    text-align: center;
                    -webkit-mask-image: linear-gradient(to top, black 25%, transparent 100%);
                    mask-image: linear-gradient(to top, black 25%, transparent 100%);
                }

                .starwars-crawl {
                    position: absolute;
                    top: 100%; /* 초기 상태: 화면 아래쪽에 위치 */
                    transform-origin: 50% 100%;
                    /* !!! 여기서 animation 속성을 제거했습니다. !!! */
                    /* !!! 이제 JS의 startAnimation()으로만 제어됩니다. !!! */
                    width: 200%;

                }

                .intro-title {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .episode {
                    font-size: 0.6em;
                    margin: 0;
                    opacity: 0.8;
                    letter-spacing: 2px;
                }

                .intro-title h2 {
                    margin: 1rem 0 3rem;
                    text-transform: uppercase;
                    font-size: 1.1em;
                    font-weight: 900;
                    letter-spacing: 6px;
                    color: #444;
                }

                .intro-text {
                    font-size: 0.55em;
                    margin-bottom: 3rem;
                    text-align: center;
                    line-height: 140%;
                }

                .intro-text.emphasis {
                    font-size: 0.6em;
                    margin: 4rem 0;
                    font-weight: 700;
                }

                @keyframes starwarsCrawl {
                    0% {
                        top: 100%; /* 화면 아래쪽에서 시작 */
                        transform: rotateX(40deg) translateZ(0);
                        opacity: 0; /* 투명한 상태에서 시작 */
                    }
                    10% {
                        opacity: 1;
                    }
                    100% {
                        top: -1200%; /* 화면 위쪽으로 멀리 이동 */
                        transform: rotateX(55deg) translateZ(-3000px);
                        opacity: 1;
                    }
                }

                .replay-button {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    padding: 10px 20px;
                    background-color: #feda4a;
                    color: black;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1em;
                    z-index: 10; /* Ensure it's above other elements */
                    display: none; /* Hidden by default */
                }

                .replay-button:hover {
                    background-color: #e0c030;
                }

                /* 컨트롤 버튼 (옵션) - 이 예시에서는 사용되지 않으나 스타일은 유지 */
                .control-button {
                    /* ... (스타일 유지) ... */
                    display: none;
                }

                @media (max-width: 768px) {
                    /* ... (미디어 쿼리 스타일 유지) ... */
                }
            </style>

<div class="starwars-container">
  <div class="starwars-text">
    <div class="starwars-crawl">
      <div class="intro-title">
        <h2>KODINGWARRIOR QUEST</h2>
      </div>

      <p class="intro-text"><i>한 개발자가 있습니다.</i><br/>
      <i>정해진 길을 걷지 않고,</i><br/>
      <i>자신만의 길을 고수하는 사람입니다.</i></p>

      <p class="intro-text"><i>고행길인 걸 알면서도,</i><br/>
      <i>꿋꿋이 페이스를 유지하며,</i><br/>
      <i>조용히 자신의 일을 이어갑니다.</i></p>

      <p class="intro-text">그는 화려한 기술보다<br/>
      꾸준함이 더 어렵다는 걸 알고 있습니다.<br/>
      그래서 오늘도 묵묵히 코드를 씁니다.</p>

      <p class="intro-text">그는 Ruby로 시작해 Python, NestJS, Flutter로 이어갔습니다.<br/>
      언어나 프레임워크는 중요하지 않습니다.<br/>
      중요한 것은, 누군가에게 도움이 되는 결과입니다.</p>

      <p class="intro-text emphasis">그의 하루는 단순합니다.<br/>
      코드를 다듬고, 환경을 정비하며,<br/>
      작은 불편을 발견하면 바로 고칩니다.<br/>
      그렇게 조금씩, 제품은 더 나아집니다.</p>

      <p class="intro-text">그는 익숙한 것보다<br/>
      지금 필요한 것을 선택합니다.<br/>
      새로운 기술은 낯설지만,<br/>
      그 낯섦 속에서 배움을 즐깁니다.</p>

      <p class="intro-text emphasis">그는 먼저 앞서가며,<br/>
      뒤따르는 이들이 같은 길을 걷기 쉽게 만들고 싶어합니다.<br/>
      그 길이 고행이 되지 않기를 바랍니다.</p>

      <p class="intro-text">그는 완벽을 좇지 않습니다.<br/>
      대신, 어제보다 나은 오늘을 선택합니다.<br/>
      그게 프로라면, 그걸로 충분하다고 믿습니다.</p>

      <p class="intro-text emphasis"><i>마이너한 스택을 다루는 개발자,</i><br/>
      <i>꾸준히 배우며 앞으로 나아가는 사람,</i><br/>
      <i>그의 여정은 오늘도 계속됩니다.</i></p>
    </div>
  </div>
  <button class="replay-button">Replay</button>
</div>


`;
  }
}

// Custom Element 등록
customElements.define("starwars-intro", StarWarsIntro);
