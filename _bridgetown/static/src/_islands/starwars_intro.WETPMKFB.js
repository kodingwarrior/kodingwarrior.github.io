(()=>{var e=class extends HTMLElement{static get observedAttributes(){return["auto-play","duration","height"]}constructor(){super(),this.attachShadow({mode:"open"}),this.isPlaying=!1}connectedCallback(){this.render(),this.init();let t=this.shadowRoot.querySelector(".replay-button");t&&t.addEventListener("click",()=>{this.isPlaying=!1,this.startAnimation()})}attributeChangedCallback(t,i,r){i!==r&&(this.render(),t==="duration"&&this.isPlaying&&this.startAnimation())}init(){this.getAttribute("auto-play")==="true"&&setTimeout(()=>this.startAnimation(),1e3)}startAnimation(){if(this.isPlaying)return;this.isPlaying=!0;let t=this.shadowRoot.querySelector(".starwars-crawl"),i=this.shadowRoot.querySelector(".replay-button");i&&(i.style.display="none"),t.style.animation="none",setTimeout(()=>{t.style.animation=`starwarsCrawl ${this.duration}s linear`},10),setTimeout(()=>{this.isPlaying=!1,i&&(i.style.display="block"),this.getAttribute("auto-play")==="true"&&this.startAnimation()},this.duration*1e3)}get duration(){return parseInt(this.getAttribute("duration")||"40")}get height(){return this.getAttribute("height")||"80vh"}render(){this.shadowRoot.innerHTML=`
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
                    overflow: hidden; /* \uD14D\uC2A4\uD2B8\uAC00 \uC774 \uC601\uC5ED \uBC16\uC73C\uB85C \uBC97\uC5B4\uB098\uB294 \uAC83\uC744 \uC228\uAE40 */
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
                    perspective: 1200px; /* 3D \uD6A8\uACFC\uC758 \uAE4A\uC774 */
                    text-align: center;
                    -webkit-mask-image: linear-gradient(to top, black 25%, transparent 100%);
                    mask-image: linear-gradient(to top, black 25%, transparent 100%);
                }

                .starwars-crawl {
                    position: absolute;
                    top: 100%; /* \uCD08\uAE30 \uC0C1\uD0DC: \uD654\uBA74 \uC544\uB798\uCABD\uC5D0 \uC704\uCE58 */
                    transform-origin: 50% 100%;
                    /* !!! \uC5EC\uAE30\uC11C animation \uC18D\uC131\uC744 \uC81C\uAC70\uD588\uC2B5\uB2C8\uB2E4. !!! */
                    /* !!! \uC774\uC81C JS\uC758 startAnimation()\uC73C\uB85C\uB9CC \uC81C\uC5B4\uB429\uB2C8\uB2E4. !!! */
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
                        top: 100%; /* \uD654\uBA74 \uC544\uB798\uCABD\uC5D0\uC11C \uC2DC\uC791 */
                        transform: rotateX(40deg) translateZ(0);
                        opacity: 0; /* \uD22C\uBA85\uD55C \uC0C1\uD0DC\uC5D0\uC11C \uC2DC\uC791 */
                    }
                    10% {
                        opacity: 1;
                    }
                    100% {
                        top: -1200%; /* \uD654\uBA74 \uC704\uCABD\uC73C\uB85C \uBA40\uB9AC \uC774\uB3D9 */
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

                /* \uCEE8\uD2B8\uB864 \uBC84\uD2BC (\uC635\uC158) - \uC774 \uC608\uC2DC\uC5D0\uC11C\uB294 \uC0AC\uC6A9\uB418\uC9C0 \uC54A\uC73C\uB098 \uC2A4\uD0C0\uC77C\uC740 \uC720\uC9C0 */
                .control-button {
                    /* ... (\uC2A4\uD0C0\uC77C \uC720\uC9C0) ... */
                    display: none;
                }

                @media (max-width: 768px) {
                    /* ... (\uBBF8\uB514\uC5B4 \uCFFC\uB9AC \uC2A4\uD0C0\uC77C \uC720\uC9C0) ... */
                }
            </style>

<div class="starwars-container">
  <div class="starwars-text">
    <div class="starwars-crawl">
      <div class="intro-title">
        <h2>KODINGWARRIOR QUEST</h2>
      </div>

      <p class="intro-text"><i>\uD55C \uAC1C\uBC1C\uC790\uAC00 \uC788\uC2B5\uB2C8\uB2E4.</i><br/>
      <i>\uC815\uD574\uC9C4 \uAE38\uC744 \uAC77\uC9C0 \uC54A\uACE0,</i><br/>
      <i>\uC790\uC2E0\uB9CC\uC758 \uAE38\uC744 \uACE0\uC218\uD558\uB294 \uC0AC\uB78C\uC785\uB2C8\uB2E4.</i></p>

      <p class="intro-text"><i>\uACE0\uD589\uAE38\uC778 \uAC78 \uC54C\uBA74\uC11C\uB3C4,</i><br/>
      <i>\uAFCB\uAFCB\uC774 \uD398\uC774\uC2A4\uB97C \uC720\uC9C0\uD558\uBA70,</i><br/>
      <i>\uC870\uC6A9\uD788 \uC790\uC2E0\uC758 \uC77C\uC744 \uC774\uC5B4\uAC11\uB2C8\uB2E4.</i></p>

      <p class="intro-text">\uADF8\uB294 \uD654\uB824\uD55C \uAE30\uC220\uBCF4\uB2E4<br/>
      \uAFB8\uC900\uD568\uC774 \uB354 \uC5B4\uB835\uB2E4\uB294 \uAC78 \uC54C\uACE0 \uC788\uC2B5\uB2C8\uB2E4.<br/>
      \uADF8\uB798\uC11C \uC624\uB298\uB3C4 \uBB35\uBB35\uD788 \uCF54\uB4DC\uB97C \uC501\uB2C8\uB2E4.</p>

      <p class="intro-text">\uADF8\uB294 Ruby\uB85C \uC2DC\uC791\uD574 Python, NestJS, Flutter\uB85C \uC774\uC5B4\uAC14\uC2B5\uB2C8\uB2E4.<br/>
      \uC5B8\uC5B4\uB098 \uD504\uB808\uC784\uC6CC\uD06C\uB294 \uC911\uC694\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.<br/>
      \uC911\uC694\uD55C \uAC83\uC740, \uB204\uAD70\uAC00\uC5D0\uAC8C \uB3C4\uC6C0\uC774 \uB418\uB294 \uACB0\uACFC\uC785\uB2C8\uB2E4.</p>

      <p class="intro-text emphasis">\uADF8\uC758 \uD558\uB8E8\uB294 \uB2E8\uC21C\uD569\uB2C8\uB2E4.<br/>
      \uCF54\uB4DC\uB97C \uB2E4\uB4EC\uACE0, \uD658\uACBD\uC744 \uC815\uBE44\uD558\uBA70,<br/>
      \uC791\uC740 \uBD88\uD3B8\uC744 \uBC1C\uACAC\uD558\uBA74 \uBC14\uB85C \uACE0\uCE69\uB2C8\uB2E4.<br/>
      \uADF8\uB807\uAC8C \uC870\uAE08\uC529, \uC81C\uD488\uC740 \uB354 \uB098\uC544\uC9D1\uB2C8\uB2E4.</p>

      <p class="intro-text">\uADF8\uB294 \uC775\uC219\uD55C \uAC83\uBCF4\uB2E4<br/>
      \uC9C0\uAE08 \uD544\uC694\uD55C \uAC83\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4.<br/>
      \uC0C8\uB85C\uC6B4 \uAE30\uC220\uC740 \uB0AF\uC124\uC9C0\uB9CC,<br/>
      \uADF8 \uB0AF\uC126 \uC18D\uC5D0\uC11C \uBC30\uC6C0\uC744 \uC990\uAE41\uB2C8\uB2E4.</p>

      <p class="intro-text emphasis">\uADF8\uB294 \uBA3C\uC800 \uC55E\uC11C\uAC00\uBA70,<br/>
      \uB4A4\uB530\uB974\uB294 \uC774\uB4E4\uC774 \uAC19\uC740 \uAE38\uC744 \uAC77\uAE30 \uC27D\uAC8C \uB9CC\uB4E4\uACE0 \uC2F6\uC5B4\uD569\uB2C8\uB2E4.<br/>
      \uADF8 \uAE38\uC774 \uACE0\uD589\uC774 \uB418\uC9C0 \uC54A\uAE30\uB97C \uBC14\uB78D\uB2C8\uB2E4.</p>

      <p class="intro-text">\uADF8\uB294 \uC644\uBCBD\uC744 \uC887\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.<br/>
      \uB300\uC2E0, \uC5B4\uC81C\uBCF4\uB2E4 \uB098\uC740 \uC624\uB298\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4.<br/>
      \uADF8\uAC8C \uD504\uB85C\uB77C\uBA74, \uADF8\uAC78\uB85C \uCDA9\uBD84\uD558\uB2E4\uACE0 \uBBFF\uC2B5\uB2C8\uB2E4.</p>

      <p class="intro-text emphasis"><i>\uB9C8\uC774\uB108\uD55C \uC2A4\uD0DD\uC744 \uB2E4\uB8E8\uB294 \uAC1C\uBC1C\uC790,</i><br/>
      <i>\uAFB8\uC900\uD788 \uBC30\uC6B0\uBA70 \uC55E\uC73C\uB85C \uB098\uC544\uAC00\uB294 \uC0AC\uB78C,</i><br/>
      <i>\uADF8\uC758 \uC5EC\uC815\uC740 \uC624\uB298\uB3C4 \uACC4\uC18D\uB429\uB2C8\uB2E4.</i></p>
    </div>
  </div>
  <button class="replay-button">Replay</button>
</div>


`}};customElements.define("starwars-intro",e);})();
//# sourceMappingURL=/_bridgetown/static/src/_islands/starwars_intro.WETPMKFB.js.map
