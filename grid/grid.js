// Grid.js
// version:         1.00.0001 
// author:          Tom Bonner
// Last updated:    30 March 2019
// Description:     Grid.js is a basic web graphics framework for
//                  creating a customizeable grid on an HTML5
//                  canvas
// Dependencies:    None


// Include in your project by creating assigning the object
// returned by this function to an object in your document
// ex:
//          var g = grid(canvasElement);
function grid(canvasElement) {
    
    // Meta Data
    const   version = "1.00.0001";

    // Document data
    var canv = canvasElement.getContext("2d");
    const GRID_PIXEL_OFFSET = 0.5;

    // Object Data
    var numHLines = 40,             // Number of horizontal lines
        numVLines = 40,             // Number of vertical lines
        cellWidth =                 // derived cell width
            canvasElement.width / numVLines,
        cellHeight =                // derived cell height
            canvasElement.height / numHLines,
        drawMLines = false,         // flag for rendering thick major lines
        mLineInterval = 5,          // major lines every mLineInterval lines
        colorMajor = "#CCCCCC",     // color of major lines if drawMLines == true
        colorMinor = "#EEEEEE";     // color of minor lines
    
    console.log("grid.js: GridObject initialized.");

    this.getSettings = function(){
        // returns object list showing current setting values
        return {
            "MetaData": {
                "version: " : version
            },
            "DocumentData": {
            "Canvas": canv
            },
            "ObjectSettings": {
            "numHLines": numHLines,
            "numVlines": numVLines,
            "cellWidth": cellWidth,
            "cellHeight": cellHeight,
            "drawMLines": drawMLines,
            "mLineInterval": mLineInterval,
            "colorMajor": colorMajor,
            "colorMinor": colorMinor
            }
        }
    }

    this.getHLines = function(){
        return numHLines;
    }
    this.setHLines = function(x){
        numHLines = x;
        cellHeight = canvasElement.height / numHLines;
    }

    this.getVLines = function(){
        return numVLines;
    }
    this.setVLines = function(x){
        numVLines = x;
        cellWidth = canvasElement.width / numVLines;
    }

    this.setDimensions = function(numVLines,numHLines) {
        setHLines(numHLines);
        setVLines(numVLines);
    }

    this.getCellWidth = function(){
        return cellWidth;
    }

    this.getCellHeight = function(){
        return cellHeight;
    }

    this.getColorMajor = function(){
        return colorMajor;
    }

    this.getColorMinor = function(){
        return colorMajor;
    }

    this.setColorMajor= function(colorStr = colorMajor, redrawGrid = false){
        var isValidHex  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorStr),
            isValidRGB = /^rgb\([0-9]{1,3}\,[0-9]{1,3}\,[0-9]{1,3}\)$/i.test(colorStr),
            isValidRGBa = /^rgba\([0-9]{1,3}\,[0-9]{1,3}\,[0-9]{1,3}\,[0-9]*\.[0-9]*f?\)$/i.test(colorStr);

        if (isValidHex || isValidRGB || isValidRGBa) {
            colorMajor = colorStr;
            if (redrawGrid) drawGrid();
            return true;
        } else {
            console.error("grid.js: invalid color string in GridObject.setColorMajor() function\n\ttry \"#FFF\", \"#FFFFFF\", \"rgb(255,255,255)\", or \"rgba(255,255,255,1.0f)\"")
            return false;
        }
    }

    this.setColorMinor= function(colorStr = colorMinor, redrawGrid = false){
        var isValidHex  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorStr),
            isValidRGB = /^rgb\([0-9]{1,3}\,[0-9]{1,3}\,[0-9]{1,3}\)$/i.test(colorStr),
            isValidRGBa = /^rgba\([0-9]{1,3}\,[0-9]{1,3}\,[0-9]{1,3}\,[0-9]*\.[0-9]*f?\)$/i.test(colorStr);

        if (isValidHex || isValidRGB || isValidRGBa) {
            colorMinor = colorStr;
            if (redrawGrid) drawGrid();
            return true;
        } else {
            console.error("grid.js: invalid color string in GridObject.setColorMinor() function\n\ttry \"#FFF\", \"#FFFFFF\", \"rgb(255,255,255)\", or \"rgba(255,255,255,1.0f)\"")
            return false;
        }
    }

    this.getDrawMLines = function(){
        return drawMLines;
    }
    
    this.setDrawMLines = function(bDrawMLines){
        drawMLines = bDrawMLines;
    }

    this.getMLineInterval = function(){
        return mLineInterval;
    }

    this.setMLineInterval = function(iInterval){
        mLineInterval = iInterval;
    }

    this.drawGrid = function() {
        clearGrid();
        drawVLines();
        drawHLines();        
        
        if (drawMLines){
            var x = GRID_PIXEL_OFFSET, y = GRID_PIXEL_OFFSET;
            canv.strokeStyle = colorMajor;

            canv.beginPath();
            while (x < canvasElement.width) {
                x+=(cellWidth*mLineInterval);
                canv.moveTo(x,GRID_PIXEL_OFFSET);
                canv.lineTo(x,canvasElement.height);
            }
            canv.stroke();
            
            canv.beginPath();
            while (y < canvasElement.height) {
                y+=(cellHeight*mLineInterval);
                canv.moveTo(GRID_PIXEL_OFFSET,y);
                canv.lineTo(canvasElement.width, y);
            }
            canv.stroke();
        }        
    }

    this.drawVLines = function(){
        var x = GRID_PIXEL_OFFSET;
        canv.beginPath();
        canv.strokeStyle = colorMinor;
        while (x < canvasElement.width) {
            canv.moveTo(x,GRID_PIXEL_OFFSET);
            canv.lineTo(x,canvasElement.height);
            x+=cellWidth;
        }
        canv.stroke();            
    }

    this.drawHLines = function(){
        var x = GRID_PIXEL_OFFSET;    
        canv.beginPath();     
        canv.strokeStyle = colorMinor;           
        while (x < canvasElement.height) {
            canv.moveTo(GRID_PIXEL_OFFSET,x);
            canv.lineTo(canvasElement.width,x);
            x+=cellHeight;
        }
        canv.stroke();
    }

    this.clearGrid = function(){
        // clears the grid
        // WARNING: this doest just clear the grid, but clears the entire canvas!
        console.warn("grid.js: Canvas is being cleared.")
        canv.clearRect(0,0, canvasElement.width, canvasElement.height);
    }

    this.help = function() {
        console.log("Get better n00b!");
        console.log("Disclaimer: This is obviously a placeholder and not meant to imply any insult in any way. A real help dialogue is currently underway.");
    }
    
    return this;
}

console.log("grid.js: grid loaded.");