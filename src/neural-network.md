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

})

</script>

