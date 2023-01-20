---
layout: page
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

	KnowledgeGraph(document.querySelector("#neural-network"))
	  .graphData(dataset)
	  .width(targetElement.offsetWidth)
	  .height(targetElement.offsetWidth)
	  .nodeCanvasObject(function(node, ctx) {
	    const label = node.id;
        const fontSize = 8;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText(label, node.x, node.y);

        node.__bckgDimensions = bckgDimensions;
	  })
	  .onNodeClick(function(node, event) {
		const path = node.id
		window.location.assign("/wiki/" + path)
	  })

})

</script>

