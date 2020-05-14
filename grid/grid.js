// Grid.js
// version:         1.00.0010
// author:          Tom Bonner
// Last updated:    13 May 2020
// Description:     Grid.js is a basic web graphics framework for
//                  creating a customizeable grid on an HTML5
//                  canvas
// Dependencies:    None


// Include in your project by creating assigning the object
// returned by this function to an object in your document
// ex:
//          var g = grid(canvasElement);
function grid(canvasElement) {

    // Document data
    const GRID_PIXEL_OFFSET = 0.5;

    // Object Data
    let config = {
        metaData: {
            version: "1.00.0001"
        },
        documentData: {
            canvas: canvasElement.getContext("2d")
        },
        objectSettings: {
            numHLines: 40,          // Number of horizontal lines
            numVlines: 40,          // Number of vertical lines
            drawMLines: false,      // flag for rendering thick major lines
            mLineInterval: 5,       // major lines ever mLineInterval Lines
            colorMajor: "#CCC",     // color of major lines if drawMlines === true
            colorMinor: "#EEE",     // color of minor lines
            bgColor: "#FFF"         // color of unfilled cells
        }
    };

    //-------------------------------------------------------
    // Methods
    //-------------------------------------------------------

    // Configuration Methods
    this.getConfig = function(){
        // returns object list showing current setting values
        return config;
    }

    this.setHLines = function(hLines){
        config.objectSettings.numHLines = hLines;
        config.objectSettings.cellHeight = canvasElement.height / config.numHLines;
    }
    this.getHLines = function(){
        return config.numHLines;
    }

    this.setVLines = function(vLines){
        config.objectSettings.numVLines = vLines;
        config.objectSettings.cellWidth = canvasElement.width / config.numVLines;
    }
    this.getVLines = function(){
        return config.numVLines;
    }

    this.setDimensions = function(vLines,hLines) {
        setHLines(hLines);
        setVLines(vLines);
    }

    this.getCellWidth = function(){
        return config.documentData.canvas.canvas.width / config.objectSettings.numVLines;
    }

    this.getCellHeight = function(){
        return config.documentData.canvas.canvas.height / config.objectSettings.numHLines;
    }

    this.setColorMajor = function(colorStr = getColorMajor(), redrawGrid = false){
        if (isValidColor(colorStr)) {
            config.objectSettings.colorMajor = colorStr;
            if (redrawGrid) drawGrid();
            return true;
        } else {
            console.error("grid.js: invalid color string in GridObject.setColorMajor() function\n\ttry \"#FFF\", \"#FFFFFF\", \"rgb(255,255,255)\", or \"rgba(255,255,255,1.0f)\"")
            return false;
        }
    }
    this.getColorMajor = function(){
        return config.colorMajor;
    }

    this.setColorMinor = function(colorStr = getColorMinor(), redrawGrid = false){

        if (isValidColor(colorStr)) {
            config.objectSettings.colorMinor = colorStr;
            if (redrawGrid) drawGrid();
            return true;
        } else {
            console.error("grid.js: invalid color string in GridObject.setColorMinor() function\n\ttry \"#FFF\", \"#FFFFFF\", \"rgb(255,255,255)\", or \"rgba(255,255,255,1.0f)\"")
            return false;
        }
    }
    this.getColorMinor = function(){
        return config.colorMajor;
    }

    this.setDrawMLines = function(bDrawMLines){
        config.objectSettings.drawMLines = bDrawMLines;
    }
    this.getDrawMLines = function(){
        return drawMLines;
    }

    this.setMLineInterval = function(iInterval){
        config.objectSettings.mLineInterval = iInterval;
    }
    this.getMLineInterval = function(){
        return mLineInterval;
    }

    // Action Methods

    this.drawGrid = function() {
        clearGrid();
        drawVLines();
        drawHLines();

        if (config.objectSettings.drawMLines){
            let x = GRID_PIXEL_OFFSET, y = GRID_PIXEL_OFFSET;
            let c = config.documentData.canvas;

            c.strokeStyle = config.objectSettings.colorMajor;

            c.beginPath();
            while (x < c.canvas.width) {
                x += (getCellWidth() * config.objectSettings.mLineInterval);
                c.moveTo(x, GRID_PIXEL_OFFSET);
                c.lineTo(x, c.canvas.height);
            }
            c.stroke();

            config.documentData.canvas.beginPath();
            while (y < c.canvas.height) {
                y += (getCellHeight() * config.objectSettings.mLineInterval);
                c.moveTo(GRID_PIXEL_OFFSET,y);
                c.lineTo(c.canvas.width, y);
            }
            c.stroke();
        }
    }

    this.drawVLines = function(){
        let x = GRID_PIXEL_OFFSET;
        let c = config.documentData.canvas;
        let cellWidth = getCellWidth();

        c.beginPath();
        c.strokeStyle = config.objectSettings.colorMinor;
        while (x < c.canvas.width) {
            c.moveTo(x, GRID_PIXEL_OFFSET);
            c.lineTo(x, c.canvas.height);
            x += cellWidth;
        }
        c.stroke();
    }

    this.drawHLines = function(){
        let x = GRID_PIXEL_OFFSET;
        let c = config.documentData.canvas;
        let cellHeight = getCellHeight();

        c.beginPath();
        c.strokeStyle = config.objectSettings.colorMinor;
        while (x < c.canvas.height) {
            c.moveTo(GRID_PIXEL_OFFSET, x);
            c.lineTo(c.canvas.width, x);
            x += cellHeight;
        }
        c.stroke();
    }

    this.fillCell = function(x, y, color = "#00F") {
        let c = config.documentData.canvas;
        c.fillStyle = color;
        c.fillRect(
            x * getCellWidth() + 1,
            y * getCellHeight() + 1,
            getCellWidth() - 1,
            getCellHeight() - 1
        );
    }

    this.clearCell = function(x,y) {
        fillCell(x,y,config.objectSettings.bgColor);
    }

    this.clearGrid = function(){
        // WARNING: this doest just clear the grid, but clears the entire canvas!
        console.warn("grid.js: Canvas is being cleared.")
        config.documentData.canvas.clearRect(0,0, canvasElement.width, canvasElement.height);
    }

    this.help = function() {
        console.log("Get better n00b!");
        console.log("Disclaimer: This is obviously a placeholder and not meant to imply any insult in any way. A real help dialogue is currently underway.");
    }

    // Validate

    this.isValidColor = function(colorStr) {
        return  (typeof(colorStr) == "string") &&
            (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorStr) ||
                /^rgb\([0-9]{1,3}\,[0-9]{1,3}\,[0-9]{1,3}\)$/i.test(colorStr) ||
                /^rgba\([0-9]{1,3}\,[0-9]{1,3}\,[0-9]{1,3}\,[0-9]*\.[0-9]*f?\)$/i.test(colorStr));
    }

    return this;
}

console.log("grid.js: grid loaded.");