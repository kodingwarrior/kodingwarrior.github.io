import availableDocuments from "../_data/available_wiki_documents.json"

class RandomPageRedirection extends HTMLElement {
  static {
    customElements.define("random-page-redirection", this)
  }

  connectedCallback() {
    document.addEventListener("go-to-random-page", (e) => {
      const size = availableDocuments.length;
      const randomIdx = Math.floor(Math.random() * size);
      window.location.assign("/wiki/" + availableDocuments[Math.max(0, randomIdx)]);
    })
  }
}
