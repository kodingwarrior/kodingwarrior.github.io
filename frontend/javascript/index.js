import '$styles/index.css'

// Import all JavaScript & CSS files from src/_components
import components from "bridgetownComponents/**/*.{js,jsx,js.rb,css}"
import ForceGraph from 'force-graph'

console.info("Bridgetown is loaded!")

window.$graph = ForceGraph;
