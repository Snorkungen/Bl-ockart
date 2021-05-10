/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Components/board.scss":
/*!***********************************!*\
  !*** ./src/Components/board.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bl-ockart/./src/Components/board.scss?");

/***/ }),

/***/ "./src/Components/Base.js":
/*!********************************!*\
  !*** ./src/Components/Base.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Block\": () => (/* binding */ Block),\n/* harmony export */   \"BaseElement\": () => (/* binding */ BaseElement)\n/* harmony export */ });\n\r\n\r\nclass BaseElement extends HTMLElement {\r\n    constructor({\r\n        blockAmount,\r\n        blockSize,\r\n        blockColor\r\n    }) {\r\n        super();\r\n        this.blockAmount = blockAmount;\r\n        this.blockSize = blockSize;\r\n        this.blockColor = blockColor;\r\n\r\n        this.activeColor = this.blockColor;\r\n    }\r\n    get gap () {\r\n        return this.currgap\r\n    }\r\n    set gap(gap) {\r\n        this.currgap = gap;\r\n        this.style.gap = `${this.currgap}px`;\r\n    }\r\n    getMaximumBlockSize() {\r\n        const smallestN = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;\r\n\r\n        return Math.floor(smallestN / this.blockAmount);\r\n    }\r\n    setActiveColor(color) {\r\n        this.activeColor = color;\r\n        return this;\r\n    }\r\n    forEachBlock(cb) {\r\n        for (let rowIndex = 0; rowIndex < this.children.length; rowIndex++) {\r\n            for (let blockIndex = 0; blockIndex < this.children[rowIndex].children.length; blockIndex++) {\r\n                cb(\r\n                    this.children[rowIndex].children[blockIndex], {\r\n                        x: blockIndex,\r\n                        y: rowIndex\r\n                    })\r\n            }\r\n        }\r\n    }\r\n    forEachRow(cb) {\r\n        for (let rowIndex = 0; rowIndex < this.children.length; rowIndex++) {\r\n            cb(\r\n                this.children[rowIndex], {\r\n                    y: rowIndex\r\n                })\r\n        }\r\n    }\r\n}\r\n\r\nclass Block extends HTMLElement {\r\n    constructor({\r\n        blockSize,\r\n        blockColor,\r\n        index\r\n    }) {\r\n        super();\r\n\r\n        if(index || index === 0) this.blockIndex = index\r\n\r\n        this.colors = [];\r\n\r\n        this.setSize(blockSize);\r\n        this.setColor(blockColor);\r\n    }\r\n\r\n    setSize(size) {\r\n        this.size = size;\r\n        this.style.width = `${this.size}px`;\r\n        this.style.height = `${this.size}px`;\r\n        return this;\r\n    }\r\n    setColor(color) {\r\n        if (this.color === color) return this;\r\n        this.color = color;\r\n        this.style.background = this.color;\r\n        if (this.colors[this.colors.length - 1] === this.color) return this;\r\n        this.colors.push(color);\r\n        return this;\r\n    }\r\n    revertColor() {\r\n        if (this.colors.length <= 1) return;\r\n        this.colors.pop();\r\n        this.setColor(this.colors[this.colors.length - 1]);\r\n        return this;\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://bl-ockart/./src/Components/Base.js?");

/***/ }),

/***/ "./src/Components/BlockArtBoard.js":
/*!*****************************************!*\
  !*** ./src/Components/BlockArtBoard.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _board_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board.scss */ \"./src/Components/board.scss\");\n/* harmony import */ var _modules_createElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/createElement */ \"./src/modules/createElement.js\");\n/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Base */ \"./src/Components/Base.js\");\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Board */ \"./src/Components/Board.js\");\n\r\n\r\n\r\n\r\nconst randomRGB = () => {\r\n\r\n    return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)\r\n}\r\n\r\nclass ColorPalette extends _Base__WEBPACK_IMPORTED_MODULE_2__.BaseElement {\r\n    constructor(props) {\r\n        super(props);\r\n\r\n        this.activeColorBlock = new _Base__WEBPACK_IMPORTED_MODULE_2__.Block(props);\r\n        this.availableColorsRow = new _Board__WEBPACK_IMPORTED_MODULE_3__.Row(props);\r\n\r\n\r\n        this.paletteColors = props.paletteColors;\r\n        this.setActiveColor(this.paletteColors[0]);\r\n        this.style.display = \"flex\";\r\n        this.style.flexDirection = \"row\";\r\n\r\n\r\n        this.appendChild(this.activeColorBlock);\r\n        this.appendChild(this.availableColorsRow);\r\n        this.forEachBlock((block, {\r\n            x\r\n        }) => {\r\n            const blockSize = Math.floor(this.getMaximumBlockSize() / 1.2);\r\n            block.setSize(blockSize);\r\n            block.setColor(this.paletteColors[x]);\r\n            block.addEventListener(\"click\", ({\r\n                target: block\r\n            }) => {\r\n                this.setActiveColor(block.color);\r\n                if (this.updateActiveColor) this.updateActiveColor(block.color);\r\n            })\r\n        });\r\n    }\r\n\r\n    setUpdateActiveColorFunction(cb) {\r\n        this.updateActiveColor = cb;\r\n    }\r\n\r\n    setActiveColor(color) {\r\n        this.activeColor = color;\r\n        this.activeColorBlock.setColor(color);\r\n        return this;\r\n    }\r\n\r\n}\r\n\r\nclass BlockArt extends _Base__WEBPACK_IMPORTED_MODULE_2__.BaseElement {\r\n    constructor(props) {\r\n        super(props);\r\n\r\n        this.paletteColors = new Array(this.blockAmount).fill(0).map(() => randomRGB());\r\n\r\n        this.colorPalette = new ColorPalette({\r\n            ...props,\r\n            paletteColors: this.paletteColors\r\n        });\r\n        this.board = new _Board__WEBPACK_IMPORTED_MODULE_3__.Board(props);\r\n\r\n        this.activeColor = this.paletteColors[0]\r\n\r\n        this.colorPalette.setActiveColor(this.activeColor)\r\n        this.board.setActiveColor(this.activeColor)\r\n\r\n        this.colorPalette.setUpdateActiveColorFunction((color) => {\r\n            this.setActiveColor(color);\r\n            this.board.setActiveColor(color);\r\n            return this;\r\n        });\r\n        this.board.setUpdateActiveColorFunction((color) => {\r\n            this.setActiveColor(color);\r\n            this.colorPalette.setActiveColor(color);\r\n            return this;\r\n        });\r\n        (0,_modules_createElement__WEBPACK_IMPORTED_MODULE_1__.createElement)(this,\"button\",\"content=Toggle Gap\").addEventListener(\"click\",(event)=>event.target.parentNode.board.toggleGap())\r\n        ;(0,_modules_createElement__WEBPACK_IMPORTED_MODULE_1__.createElement)(this,\"button\",\"content=Log Board State\").addEventListener(\"click\",(event)=>console.log(event.target.parentNode.board.saveBoardState()))\r\n\r\n        this.appendChild(this.colorPalette);\r\n        this.appendChild(this.board);\r\n\r\n        this.board.toggleGap()\r\n    }\r\n}\r\n\r\ncustomElements.define(\"sk-bl-ockart\", BlockArt);\r\ncustomElements.define(\"sk-color-palette\", ColorPalette);\r\ncustomElements.define(\"sk-board\", _Board__WEBPACK_IMPORTED_MODULE_3__.Board);\r\ncustomElements.define(\"sk-block\", _Base__WEBPACK_IMPORTED_MODULE_2__.Block);\r\ncustomElements.define(\"sk-row\", _Board__WEBPACK_IMPORTED_MODULE_3__.Row);\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockArt);\n\n//# sourceURL=webpack://bl-ockart/./src/Components/BlockArtBoard.js?");

/***/ }),

/***/ "./src/Components/Board.js":
/*!*********************************!*\
  !*** ./src/Components/Board.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Board\": () => (/* binding */ Board),\n/* harmony export */   \"Row\": () => (/* binding */ Row)\n/* harmony export */ });\n/* harmony import */ var _board_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board.scss */ \"./src/Components/board.scss\");\n/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base */ \"./src/Components/Base.js\");\n\r\n\r\n\r\nclass Row extends _Base__WEBPACK_IMPORTED_MODULE_1__.BaseElement {\r\n    constructor({\r\n        blockAmount,\r\n        blockSize,\r\n        blockColor\r\n    }) {\r\n        super({\r\n            blockAmount,\r\n            blockSize,\r\n            blockColor\r\n        });\r\n        this.setBlocks(this.blockAmount);\r\n    }\r\n    setBlocks(blockAmount) {\r\n        for (let i = 0; i < blockAmount; i++) {\r\n            this.appendChild(new _Base__WEBPACK_IMPORTED_MODULE_1__.Block({\r\n                blockSize: this.blockSize,\r\n                blockColor: this.blockColor,\r\n                index : i\r\n            }))\r\n        }\r\n    }\r\n}\r\n\r\n\r\nclass Board extends _Base__WEBPACK_IMPORTED_MODULE_1__.BaseElement {\r\n    constructor({\r\n        blockAmount,\r\n        blockSize,\r\n        blockColor\r\n    }) {\r\n        super({\r\n            blockAmount,\r\n            blockSize,\r\n            blockColor\r\n        });\r\n        this.activeColor = this.blockColor;\r\n\r\n        this.baseColor = this.blockColor;\r\n\r\n        this.history = [];\r\n\r\n        this.setRows(this.blockAmount);\r\n\r\n        this.setGap(0)\r\n        \r\n        // EventListeners\r\n        this.addEventListener(\"mousedown\", this.clickHandler);\r\n        this.addEventListener(\"mouseover\", this.mouseOverHandler)\r\n        // this.addEventListener(\"wheel\", this.wheelHandler);\r\n        this.addEventListener(\"dragstart\", ev => ev.preventDefault());\r\n        this.addEventListener(\"contextmenu\", ev => ev.preventDefault());\r\n\r\n        document.addEventListener(\"keydown\", (event) => {\r\n            // ctrl + z\r\n            if (event.ctrlKey && event.key === \"z\") this.revertHistory();\r\n        })\r\n    }\r\n    setRows(rowAmount) {\r\n        for (let i = 0; i < rowAmount; i++) {\r\n            this.blockAmount = rowAmount;\r\n            this.appendChild(new Row({\r\n                blockAmount: this.blockAmount,\r\n                blockColor: this.blockColor,\r\n                blockSize: this.blockSize\r\n            }))\r\n        }\r\n        return this;\r\n    }\r\n\r\n    saveBoardState() {\r\n        const blockData = [];\r\n        this.forEachBlock((block, {\r\n            x,\r\n            y\r\n        }) => {\r\n            blockData.push({\r\n                x,\r\n                y,\r\n                color: block.color\r\n            })\r\n        });\r\n        return blockData;\r\n    }\r\n    toggleGap () {\r\n        let gap = 0;\r\n        if(this.gap === 0) gap = 1;\r\n        return this.setGap(gap)\r\n    }\r\n\r\n    revertHistory() {\r\n        if (this.history.length < 1) return this;\r\n\r\n        this.history[this.history.length - 1].revertColor();\r\n        this.history.pop();\r\n        return this;\r\n    }\r\n\r\n    pushHistory(block) {\r\n        const maxHistoryLength = 50;\r\n\r\n        this.history.push(block);\r\n        if (this.history.length > maxHistoryLength) this.history.shift();\r\n        return this;\r\n    }\r\n\r\n    setGap(gap) {\r\n        this.gap = gap;\r\n        this.forEachRow((row) =>{\r\n            row.gap = gap;\r\n        })\r\n    }\r\n\r\n    setUpdateActiveColorFunction(cb) {\r\n        this.updateActiveColor = cb;\r\n    }\r\n\r\n    copyColor({\r\n        target\r\n    }) {\r\n        this.setActiveColor(target.color);\r\n        if (this.updateActiveColor) this.updateActiveColor(target.color);\r\n        return this;\r\n    }\r\n\r\n    clickHandler(event) {\r\n        if (event.target.constructor.name !== \"Block\") return;\r\n\r\n        if(event.ctrlKey) {\r\n            // fill Logic\r\n            return this.fillColor(event.target);\r\n        }\r\n        if (!event.ctrlKey && event.shiftKey) {\r\n            // copy Color;\r\n            return this.copyColor(event);\r\n        }\r\n        if ((event.ctrlKey && event.shiftKey) || (event.buttons == 2 && event.button == 2)) {\r\n            // Revert Color;\r\n            return event.target.revertColor();\r\n        }\r\n\r\n        this.pushHistory(event.target);\r\n        event.target.setColor(this.activeColor);\r\n        return this;\r\n    }\r\n    mouseOverHandler(event) {\r\n        if (event.target.constructor.name !== \"Block\") return;\r\n        if (!event.buttons) return;\r\n        this.pushHistory(event.target);\r\n        event.target.setColor(this.activeColor);\r\n        return this;\r\n    }\r\n    wheelHandler(event) {\r\n        if (!event.shiftKey) return this;\r\n        const maximumBlockSize = this.getMaximumBlockSize();\r\n        const minimumBlockSize = 10;\r\n        const blockSizeIncrement = 4;\r\n\r\n        this.blockSize += event.deltaY < 0 ? blockSizeIncrement : -blockSizeIncrement;\r\n\r\n        if (maximumBlockSize < this.blockSize) return this;\r\n        if (minimumBlockSize > this.blockSize) return this\r\n        this.forEachBlock((block) => {\r\n            block.setSize(this.blockSize);\r\n        })\r\n    };\r\n\r\n\r\n\r\n    // Complicated shit that doesnt work\r\n    fillRowColor (target,activeColor) {\r\n        const targetColor = target.color\r\n        // const activeColor = this.activeColor;\r\n        function recursiveN (block) {\r\n            if(!block) return;\r\n             if(block.color !== targetColor) return;\r\n            block.setColor(activeColor);\r\n            return recursiveN(block.nextSibling);\r\n        };\r\n        function recursiveP (block) {\r\n            if(!block) return;\r\n             if(block.color !== targetColor) return;\r\n            block.setColor(activeColor);\r\n            return recursiveP(block.previousSibling);\r\n\r\n        };\r\n\r\n        target.setColor(activeColor);\r\n        recursiveN(target.nextSibling)\r\n        recursiveP(target.previousSibling)\r\n    }\r\n\r\n    fillColor(target) {\r\n        const targetColor = target.color;\r\n        const activeColor = this.activeColor;\r\n        const targetIndex = target.blockIndex;\r\n\r\n        const fillRowColor = this.fillRowColor; \r\n\r\n        function recursiveN (row) {\r\n            if(!row) return;\r\n            const block = row.children[targetIndex];\r\n            if(block.color !== targetColor) return;\r\n            fillRowColor(block,activeColor);\r\n            return recursiveN(row.nextSibling);\r\n        };\r\n        function recursiveP (row) {\r\n            if(!row) return;\r\n            const block = row.children[targetIndex];\r\n            if(block.color !== targetColor) return;\r\n            fillRowColor(block,activeColor);\r\n            return recursiveP(row.previousSibling);\r\n        };\r\n\r\n\r\n        this.fillRowColor(target,activeColor);\r\n        recursiveN(target.parentNode.nextSibling);\r\n        recursiveP(target.parentNode.previousSibling);\r\n    }\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack://bl-ockart/./src/Components/Board.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Components_BlockArtBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components/BlockArtBoard */ \"./src/Components/BlockArtBoard.js\");\n\r\n\r\nconst root = document.getElementById(\"root\");\r\n\r\n\r\n\r\n\r\nroot.appendChild(new _Components_BlockArtBoard__WEBPACK_IMPORTED_MODULE_0__.default({\r\n    blockAmount : 20,\r\n    blockSize : 20,\r\n    blockColor : \"hotpink\"\r\n}))\n\n//# sourceURL=webpack://bl-ockart/./src/index.js?");

/***/ }),

/***/ "./src/modules/createElement.js":
/*!**************************************!*\
  !*** ./src/modules/createElement.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement)\n/* harmony export */ });\nfunction createElement(parent, elName, ...attributes) {\r\n    const newElement = document.createElement(elName);\r\n    if (attributes !== null && attributes.length > 0) {\r\n        attributes.forEach((attribute) => {\r\n            if (attribute) {\r\n                let [type, value] = attribute.split(\"=\");\r\n                value = attribute.split(\"=\").slice(1).join(\"=\");\r\n                if (type === \"content\") newElement.textContent = value;\r\n                else newElement.setAttribute(type, value);\r\n            }\r\n        });\r\n    }\r\n    if (parent) parent.appendChild(newElement);\r\n    return newElement;\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://bl-ockart/./src/modules/createElement.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;