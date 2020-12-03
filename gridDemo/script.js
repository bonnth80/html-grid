console.log("script.js loaded");

let dGrid = grid(document.getElementsByClassName("gridDemoCanvas")[0]);

// dGrid.setDimensions(120,90);
dGrid.setColorMinor("#DDD");
dGrid.setColorMajor("#2A2");
dGrid.setDrawMLines(true);
dGrid.drawGrid();
dGrid.fillCell(14,14);


console.log(dGrid.getConfig());
