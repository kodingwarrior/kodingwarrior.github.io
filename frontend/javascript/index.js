import '$styles/index.css'
import "bridgetown-lit-renderer"

import "@11ty/is-land/is-land.js"
import "@11ty/is-land/is-land-autoinit.js"

// Import all JavaScript & CSS files from src/_components
import components from "bridgetownComponents/**/*.{js,jsx,js.rb,css}"
import ForceGraph from 'force-graph'

console.info("Bridgetown is loaded!")

window.$graph = ForceGraph;
