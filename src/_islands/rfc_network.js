import dataset from '../_data/rfc_references.json'

class RfcNetwork extends HTMLElement {
  static {
    customElements.define("rfc-network", this)
  }

  connectedCallback() {
    this.init()
  }

  static get observedAttributes() {
    return ['defer-hydration'];
  }

  attributeChangedCallback(name, previousValue, newValue) {
    if(name ==="defer-hydration" && newValue === null) {
      this.init();
    }
  }

  init() {
    if(this.hasAttribute("defer-hydration")) {
      return;
    }

    window.addEventListener('load', function(e) {
      const KnowledgeGraph = window.$graph()

      const targetElement = document.querySelector('#rfc-network')

      KnowledgeGraph(targetElement)
        .graphData(dataset)
        .width(targetElement.offsetWidth)
        .height(targetElement.offsetWidth)
        .nodeCanvasObject(function(node, ctx) {
        if (node.group == 1) {
          const label = node.id;
          const fontSize = 8;

          // Rendering Text
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';
          ctx.fillText(label, node.x, node.y + 12);

          ctx.beginPath()
          ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
          ctx.roundRect(
            node.x - textWidth / 2 - 6,
            node.y + fontSize / 2 + 2,
            textWidth + 12,
            fontSize + 4,
            5
          );
          ctx.fill()

          // Rendering Title
          ctx.font = `${fontSize}px Sans-Serif`;
          const titleWidth = ctx.measureText(node.title).width;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';
          ctx.fillText(node.title, node.x, node.y + 25);

          ctx.beginPath()
          ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
          ctx.roundRect(
            node.x - titleWidth / 2 - 6,
            node.y + fontSize / 2 + 2 + 12,
            titleWidth + 12,
            fontSize + 4,
            5
          );
          ctx.fill()

          const size = 12;

          const radius = size / 2;
          ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
          ctx.fill()

          node.__bckgDimensions = bckgDimensions;
        }

        })
        .nodePointerAreaPaint(function(node, color, ctx) {
          if (node.group == 1) {
            const size = 12;
            const radius = size / 2;
            ctx.fillStyle = color
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
            ctx.fill()
          }
        })
        .onNodeClick(function(node, event) {
          if (node.group == 1) {
            const path = node.id
            window.location.assign("https://www.ietf.org/rfc/" + path + ".txt")
          }
        })
		})

  }
}
