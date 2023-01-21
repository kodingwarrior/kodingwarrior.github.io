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

	KnowledgeGraph(document.querySelector("#neural-network"))
	  .graphData(dataset)
	  .width(targetElement.offsetWidth)
	  .height(targetElement.offsetWidth)
	  .nodeCanvasObject(function(node, ctx) {
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

		// Rendering Circle
	  	const size = 12;
		const radius = size / 2;
		ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
		ctx.beginPath();
		ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
		ctx.fill()

        node.__bckgDimensions = bckgDimensions;
	  })
	  .nodePointerAreaPaint(function(node, color, ctx) {
	  	const size = 12;
		const radius = size / 2;
		ctx.fillStyle = color
		ctx.beginPath();
		ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
		ctx.fill()
	  })
	  .onNodeClick(function(node, event) {
		const path = node.id
		window.location.assign("/wiki/" + path)
	  })

})

</script>

