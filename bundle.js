(()=>{"use strict";function t(t,o,...e){const i=document.createElement(o);return null!==e&&e.length>0&&e.forEach((t=>{if(t){let[o,e]=t.split("=");e=t.split("=").slice(1).join("="),"content"===o?i.textContent=e:i.setAttribute(o,e)}})),t&&t.appendChild(i),i}class o extends HTMLElement{constructor({blockAmount:t,blockSize:o,blockColor:e}){super(),this.blockAmount=t,this.blockSize=o,this.blockColor=e,this.activeColor=this.blockColor}get gap(){return this.currgap}set gap(t){this.currgap=t,this.style.gap=`${this.currgap}px`}getMaximumBlockSize(){const t=window.innerWidth<window.innerHeight?window.innerWidth:window.innerHeight;return Math.floor(t/this.blockAmount)}setActiveColor(t){return this.activeColor=t,this}forEachBlock(t){for(let o=0;o<this.children.length;o++)for(let e=0;e<this.children[o].children.length;e++)t(this.children[o].children[e],{x:e,y:o})}forEachRow(t){for(let o=0;o<this.children.length;o++)t(this.children[o],{y:o})}}class e extends HTMLElement{constructor({blockSize:t,blockColor:o,index:e}){super(),(e||0===e)&&(this.blockIndex=e),this.colors=[],this.setSize(t),this.setColor(o)}setSize(t){return this.size=t,this.style.width=`${this.size}px`,this.style.height=`${this.size}px`,this}setColor(t){return this.color===t||(this.color=t,this.style.background=this.color,this.colors[this.colors.length-1]===this.color||this.colors.push(t)),this}revertColor(){if(!(this.colors.length<=1))return this.colors.pop(),this.setColor(this.colors[this.colors.length-1]),this}}class i extends Array{get first(){return this[0]}get last(){return this[this.length-1]}get lastIndex(){return this.length-1}}const s=class{constructor(t={}){this.history=new i,this.maxHistoryLength=t.maxHistoryLength||40,this.dragLength=t.dragLength||10,this.dragColor=null,this.lastFillIndex=null}remove(){return this.history.pop(),this}trimHistory(){this.history.length>this.maxHistoryLength&&this.history.shift()}click(t){return this.history.push([t]),this.trimHistory()}drag(t){if(this.history.last){const o=this.history.last;if(o.length<this.dragLength&&o[o.length-1].color==this.dragColor)return o.push(t),this.trimHistory()}return this.dragColor=t.color,this.history.push([t]),this.trimHistory()}fill(t){if(null!==this.lastFillIndex){const o=this.history[this.lastFillIndex];if(o[o.length-1].color==this.dragColor)return o.push(t),this.trimHistory()}return this.history.push([t]),this.lastFillIndex=this.history.lastIndex,this.trimHistory()}fillReset(){this.lastFillIndex=null}get state(){return this.history.last}};class r extends o{constructor({blockAmount:t,blockSize:o,blockColor:e}){super({blockAmount:t,blockSize:o,blockColor:e}),this.setBlocks(this.blockAmount)}setBlocks(t){for(let o=0;o<t;o++)this.appendChild(new e({blockSize:this.blockSize,blockColor:this.blockColor,index:o}))}}class l extends o{constructor({blockAmount:t,blockSize:o,blockColor:e}){super({blockAmount:t,blockSize:o,blockColor:e}),this.activeColor=this.blockColor,this.baseColor=this.blockColor,this.history=new s,this.setRows(this.blockAmount),this.setGap(0),this.addEventListener("mousedown",this.clickHandler),this.addEventListener("mouseover",this.mouseOverHandler),this.addEventListener("dragstart",(t=>t.preventDefault())),this.addEventListener("contextmenu",(t=>t.preventDefault())),document.addEventListener("keydown",(t=>{t.ctrlKey&&"z"===t.key&&this.revertHistory()}))}setRows(t){for(let o=0;o<t;o++)this.blockAmount=t,this.appendChild(new r({blockAmount:this.blockAmount,blockColor:this.blockColor,blockSize:this.blockSize}));return this}saveBoardState(){const t=[];return this.forEachBlock(((o,{x:e,y:i})=>{t.push({x:e,y:i,color:o.color})})),t}toggleGap(){let t=0;return 0===this.gap&&(t=1),this.setGap(t)}revertHistory(){return(this.history.state?this.history.state:[]).forEach((t=>t.revertColor())),this.history.remove(),this}setGap(t){this.gap=t,this.forEachRow((o=>{o.gap=t}))}setUpdateActiveColorFunction(t){this.updateActiveColor=t}copyColor({target:t}){return this.setActiveColor(t.color),this.updateActiveColor&&this.updateActiveColor(t.color),this}clickHandler(t){if("Block"===t.target.constructor.name)return t.ctrlKey?this.fillColor(t.target):!t.ctrlKey&&t.shiftKey?this.copyColor(t):(t.target.setColor(this.activeColor),this.history.click(t.target),this)}mouseOverHandler(t){if("Block"===t.target.constructor.name&&t.buttons)return t.target.setColor(this.activeColor),this.history.drag(t.target),this}wheelHandler(t){if(!t.shiftKey)return this;const o=this.getMaximumBlockSize();return this.blockSize+=t.deltaY<0?4:-4,o<this.blockSize||10>this.blockSize?this:void this.forEachBlock((t=>{t.setSize(this.blockSize)}))}fillRowColor(t,o,e){const i=t.color;t.setColor(o),e.fill(t),function t(s){if(s&&s.color===i)return s.setColor(o),e.fill(s),t(s.nextSibling)}(t.nextSibling),function t(s){if(s&&s.color===i)return s.setColor(o),e.fill(s),t(s.previousSibling)}(t.previousSibling)}fillColor(t){const o=t.color,e=this.activeColor,i=t.blockIndex,s=this.history,r=this.fillRowColor;this.fillRowColor(t,e,s),function t(l){if(!l)return;const h=l.children[i];return h.color===o?(r(h,e,s),t(l.nextSibling)):void 0}(t.parentNode.nextSibling),function t(l){if(!l)return;const h=l.children[i];return h.color===o?(r(h,e,s),t(l.previousSibling)):void 0}(t.parentNode.previousSibling),this.history.fillReset()}}class h extends o{constructor(t){super(t),this.activeColorBlock=new e(t),this.availableColorsRow=new r(t),this.paletteColors=t.paletteColors,this.setActiveColor(this.paletteColors[0]),this.style.display="flex",this.style.flexDirection="row",this.appendChild(this.activeColorBlock),this.appendChild(this.availableColorsRow),this.forEachBlock(((t,{x:o})=>{const e=Math.floor(this.getMaximumBlockSize()/1.2);t.setSize(e),t.setColor(this.paletteColors[o]),t.addEventListener("click",(({target:t})=>{this.setActiveColor(t.color),this.updateActiveColor&&this.updateActiveColor(t.color)}))}))}setUpdateActiveColorFunction(t){this.updateActiveColor=t}setActiveColor(t){return this.activeColor=t,this.activeColorBlock.setColor(t),this}}class n extends o{constructor(o){super(o),this.paletteColors=new Array(this.blockAmount).fill(0).map((()=>"#"+(16777216+16777215*Math.random()).toString(16).substr(1,6))),this.colorPalette=new h({...o,paletteColors:this.paletteColors}),this.board=new l(o),this.activeColor=this.paletteColors[0],this.colorPalette.setActiveColor(this.activeColor),this.board.setActiveColor(this.activeColor),this.colorPalette.setUpdateActiveColorFunction((t=>(this.setActiveColor(t),this.board.setActiveColor(t),this))),this.board.setUpdateActiveColorFunction((t=>(this.setActiveColor(t),this.colorPalette.setActiveColor(t),this))),t(this,"button","content=Toggle Gap").addEventListener("click",(t=>t.target.parentNode.board.toggleGap())),t(this,"button","content=Log Board State").addEventListener("click",(t=>console.log(t.target.parentNode.board.saveBoardState()))),this.appendChild(this.colorPalette),this.appendChild(this.board),this.board.toggleGap()}}customElements.define("sk-bl-ockart",n),customElements.define("sk-color-palette",h),customElements.define("sk-board",l),customElements.define("sk-block",e),customElements.define("sk-row",r);const c=n;document.getElementById("root").appendChild(new c({blockAmount:20,blockSize:20,blockColor:"#e0e0e0"})),new s})();