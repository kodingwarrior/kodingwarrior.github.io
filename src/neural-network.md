---
layout: wiki_main
title: Knowledge network
---


<div id="neural-network">
</div>


<script>

window.addEventListener('load', function(e) {
	const KnowledgeGraph = window.$graph()

	const targetElement = document.querySelector('#neural-network')

	const dataset = ({{ site.data.wiki_datasets | jsonify }})
	console.log(dataset)

    const icons = {}

    const vimIcon = new Image()
    vimIcon.src = "{{ '/images/vim-icon.png' | relative_url }}"

    icons['vim-plugin'] = vimIcon

	KnowledgeGraph(document.querySelector("#neural-network"))
	  .graphData(dataset)
	  .width(targetElement.offsetWidth)
	  .height(targetElement.offsetWidth)
	  .nodeCanvasObject(function(node, ctx) {
        if (node.group == 1) {
	      const path = node.id;
          const fontSize = 8;
  
          const hierarchyNodes = path.split("/");
          const category = hierarchyNodes[0];
          const label = hierarchyNodes[hierarchyNodes.length - 1];
  
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
  
          const hasIcon = ['vim-plugin'].includes(category);
          const size = 12;
  
		  // Rendering Circle
          if (hasIcon) {
            const img = icons[category];
            ctx.drawImage(img, node.x - size / 2, node.y - size / 2, size, size);
          } else {
            const radius = size / 2;
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
            ctx.fill()
          }
  
          node.__bckgDimensions = bckgDimensions;
        }

        if (node.group == 2) {
	      const tagName = node.id;
          const fontSize = 12;
  
          const label = tagName;
  
		  // Rendering Text
		  ctx.font = `700 ${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth * 1.2, fontSize].map(n => n + fontSize * 0.3); // some padding
		  ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';
          ctx.fillText(label, node.x, node.y);
  
          const groupNodeWidth = textWidth + 20
          const groupNodeHeight = fontSize + 10
          ctx.beginPath()
          ctx.fillStyle = "rgb(128, 203, 196, 0.2)"
          ctx.roundRect(
            node.x - groupNodeWidth / 2, 
            node.y - groupNodeHeight / 2, 
            groupNodeWidth, 
            groupNodeHeight, 
            10
          );
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

        if (node.group == 2) {
	      const tagName = node.id;
          const fontSize = 12;
  
          const label = tagName;

          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
          const groupNodeWidth = textWidth + 20
          const groupNodeHeight = fontSize + 10
          ctx.beginPath()
          ctx.fillStyle = color
          ctx.roundRect(
            node.x - groupNodeWidth / 2, 
            node.y - groupNodeHeight / 2, 
            groupNodeWidth, 
            groupNodeHeight, 
            10
          );
          ctx.fill()
        }
	  })
	  .onNodeClick(function(node, event) {
        if (node.group == 1) {
          const path = node.id
          window.location.assign("/wiki/" + path)
        }
	  })

})

</script>

