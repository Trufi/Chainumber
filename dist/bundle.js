!function e(t,s,i){function n(r,l){if(!s[r]){if(!t[r]){var c="function"==typeof require&&require;if(!l&&c)return c(r,!0);if(o)return o(r,!0);var h=new Error("Cannot find module '"+r+"'");throw h.code="MODULE_NOT_FOUND",h}var a=s[r]={exports:{}};t[r][0].call(a.exports,function(e){var s=t[r][1][e];return n(s?s:e)},a,a.exports,e,t,s,i)}return s[r].exports}for(var o="function"==typeof require&&require,r=0;r<i.length;r++)n(i[r]);return n}({1:[function(e){var t=e("./model/field.js"),s=e("./view/field"),i=(e("./config.js"),new t),n=new s(i),o=document.getElementById("game");o.appendChild(n.fragment)},{"./config.js":3,"./model/field.js":4,"./view/field":7}],2:[function(e,t){function s(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(e){return"function"==typeof e}function n(e){return"number"==typeof e}function o(e){return"object"==typeof e&&null!==e}function r(e){return void 0===e}t.exports=s,s.EventEmitter=s,s.prototype._events=void 0,s.prototype._maxListeners=void 0,s.defaultMaxListeners=10,s.prototype.setMaxListeners=function(e){if(!n(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},s.prototype.emit=function(e){var t,s,n,l,c,h;if(this._events||(this._events={}),"error"===e&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(s=this._events[e],r(s))return!1;if(i(s))switch(arguments.length){case 1:s.call(this);break;case 2:s.call(this,arguments[1]);break;case 3:s.call(this,arguments[1],arguments[2]);break;default:for(n=arguments.length,l=new Array(n-1),c=1;n>c;c++)l[c-1]=arguments[c];s.apply(this,l)}else if(o(s)){for(n=arguments.length,l=new Array(n-1),c=1;n>c;c++)l[c-1]=arguments[c];for(h=s.slice(),n=h.length,c=0;n>c;c++)h[c].apply(this,l)}return!0},s.prototype.addListener=function(e,t){var n;if(!i(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,i(t.listener)?t.listener:t),this._events[e]?o(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,o(this._events[e])&&!this._events[e].warned){var n;n=r(this._maxListeners)?s.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},s.prototype.on=s.prototype.addListener,s.prototype.once=function(e,t){function s(){this.removeListener(e,s),n||(n=!0,t.apply(this,arguments))}if(!i(t))throw TypeError("listener must be a function");var n=!1;return s.listener=t,this.on(e,s),this},s.prototype.removeListener=function(e,t){var s,n,r,l;if(!i(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(s=this._events[e],r=s.length,n=-1,s===t||i(s.listener)&&s.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(o(s)){for(l=r;l-->0;)if(s[l]===t||s[l].listener&&s[l].listener===t){n=l;break}if(0>n)return this;1===s.length?(s.length=0,delete this._events[e]):s.splice(n,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},s.prototype.removeAllListeners=function(e){var t,s;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(s=this._events[e],i(s))this.removeListener(e,s);else for(;s.length;)this.removeListener(e,s[s.length-1]);return delete this._events[e],this},s.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?i(this._events[e])?[this._events[e]]:this._events[e].slice():[]},s.listenerCount=function(e,t){var s;return s=e._events&&e._events[t]?i(e._events[t])?1:e._events[t].length:0}},{}],3:[function(e,t){t.exports={field:{size:[5,5]},block:{width:54,height:54},numbers:{possibleValues:[[1,1],[2,1]]},chain:{minLength:2}}},{}],4:[function(e,t){function s(){i.call(this),this._blockIdCounter=0,this.blocks={},this._blocksXY={},this.size=n.field.size,this.selectedBlocks=[],this.selectedMode=!1,this._init()}var i=e("events").EventEmitter,n=e("./../config.js");s.prototype=Object.create(i.prototype),s.prototype.constructor=s,s.prototype._getBlockValue=function(){var e=0,t=n.numbers.possibleValues;t.forEach(function(t){e+=t[1]});for(var s=0,i=t.map(function(t){var i=t[1]/e+s;return s+=i,i}),o=Math.random(),r=0,l=0;l<i.length;l++)if(o<=i[l]){r=t[l][0];break}return r},s.prototype._init=function(){for(var e=this._blocksXY,t=0;t<this.size[0];t++){e[t]={};for(var s=0;s<this.size[1];s++)this.createBlock({x:t,y:s})}},s.prototype.createBlock=function(e){var t={id:++this._blockIdCounter,value:this._getBlockValue(),x:e.x,y:e.y};this._blocksXY[e.x][e.y]=t,this.blocks[t.id]=t,this.emit("blockCreated",t.id)},s.prototype.blockMouseDown=function(e){this.selectedMode=!0,this.selectedBlocks=[e],this.emit("blockSelectStart")},s.prototype.blockMouseUp=function(){this.selectedMode&&(this.selectedMode=!1,this._runSelected(),this.emit("blockSelectFinished"))},s.prototype._checkWithLast=function(e){var t=this.blocks[this.selectedBlocks[this.selectedBlocks.length-1]],s=this.blocks[e];return t.value==s.value&&Math.abs(t.x-s.x)<=1&&Math.abs(t.y-s.y)<=1},s.prototype.blockMouseOver=function(e){if(this.selectedMode){var t=this.selectedBlocks;-1==t.indexOf(e)?this._checkWithLast(e)&&(t.push(e),this.emit("blockSelect")):t[t.length-2]==e&&(t.pop(),this.emit("blockUnselect"))}},s.prototype.blockMouseOut=function(){},s.prototype._runSelected=function(){if(!(this.selectedBlocks.length<n.chain.minLength)){var e=this.blocks[this.selectedBlocks.pop()],t=e.value;e.value=t*(this.selectedBlocks.length+1),this.emit("blockValueChanged",e.id),this.selectedBlocks.forEach(function(e){var t=this.blocks[e];this._blocksXY[t.x][t.y]=null,delete this.blocks[e],this.emit("blockRemoved",e)},this),this._checkPositions()}},s.prototype._checkPositions=function(){Object.keys(this._blocksXY).forEach(function(e){var t=[];Object.keys(this._blocksXY[e]).forEach(function(s){var i=this._blocksXY[e][s];i&&t.push(i)},this),t.sort(function(e,t){return e.y>t.y}),t.forEach(function(e,t){e.y!=t&&(this._blocksXY[e.x][e.y]=null,e.y=t,this._blocksXY[e.x][e.y]=e,this.emit("blockPositionChanged",e.id))},this)},this),this._addNewBlocks()},s.prototype._addNewBlocks=function(){Object.keys(this._blocksXY).forEach(function(e){Object.keys(this._blocksXY[e]).forEach(function(t){this._blocksXY[e][t]||this.createBlock({x:e,y:t})},this)},this)},t.exports=s},{"./../config.js":3,events:2}],5:[function(e,t){var s={};s.addClass=function(e,t){var s=e.className.split(" "),i=s.indexOf(t);return-1===i&&(s.push(t),e.className=s.join(" ")),e},s.removeClass=function(e,t){var s=e.className.split(" "),i=s.indexOf(t);return-1!==i&&(s.splice(i,1),e.className=s.join(" ")),e},s.hasClass=function(e,t){var s=e.className.split(" ");return-1!=s.indexOf(t)},t.exports=s},{}],6:[function(e,t){function s(e){this.element=null,this._createElement(e)}var i=e("./../config"),n=e("../util");s.prototype._createElement=function(e){var t=document.createElement("div");t.className="block _"+e.value,t.style.bottom=e.y*i.block.height+"px",t.style.left=e.x*i.block.width+"px";var s=document.createElement("div");s.className="block__active",t.appendChild(s);var n=document.createElement("div");n.className="block__text",n.innerHTML=e.value,t.appendChild(n),this.textElement=n,this.activeElement=s,this.element=t},s.prototype.changePosition=function(e,t){this.element.style.left=e*i.block.width+"px",this.element.style.bottom=t*i.block.height+"px"},s.prototype.changeValue=function(e){this.textElement.innerHTML=e},s.prototype.select=function(){n.addClass(this.element,"_selected")},s.prototype.unselect=function(){n.removeClass(this.element,"_selected")},t.exports=s},{"../util":5,"./../config":3}],7:[function(e,t){function s(e){this.model=e,this.viewBlocks={},this.fragment=null,this._createField(),this._bindEvents()}var i=e("./block"),n=e("../util.js");s.prototype._createField=function(){this.fragment=document.createElement("div"),this.fragment.className="field",Object.keys(this.model.blocks).forEach(this._createBlock,this)},s.prototype._createBlock=function(e,t){var s=new i(this.model.blocks[e]);this.viewBlocks[e]=s,s.element.addEventListener("mousedown",function(){this.model.blockMouseDown(e)}.bind(this)),s.activeElement.addEventListener("mouseover",function(){this.model.blockMouseOver(e)}.bind(this)),s.activeElement.addEventListener("mouseout",function(){this.model.blockMouseOut(e)}.bind(this)),this.fragment.appendChild(s.element),t===!0&&(n.addClass(s.element,"_blink"),setTimeout(function(){n.removeClass(s.element,"_blink")},0))},s.prototype.blockCreate=function(e){this._createBlock(e,!0)},s.prototype._bindEvents=function(){document.body.addEventListener("mouseup",function(){this.model.blockMouseUp()}.bind(this)),this.model.on("blockCreated",this.blockCreate.bind(this)),this.model.on("blockRemoved",this.blockRemoved.bind(this)),this.model.on("blockPositionChanged",this.updateBlockPosition.bind(this)),this.model.on("blockValueChanged",this.updateBlockValue.bind(this)),this.model.on("blockSelectStart",this.startSelect.bind(this)),this.model.on("blockSelect",this.select.bind(this)),this.model.on("blockUnselect",this.unselect.bind(this)),this.model.on("blockSelectFinished",this.selectFinished.bind(this))},s.prototype.updateBlockPosition=function(e){var t=this.model.blocks[e];this.viewBlocks[e].changePosition(t.x,t.y)},s.prototype.updateBlockValue=function(e){this.viewBlocks[e].changeValue(this.model.blocks[e].value)},s.prototype.startSelect=function(){var e=this.model.selectedBlocks[0];this.selectedBlocks=[e],this.viewBlocks[e].select()},s.prototype.select=function(){var e=this.model.selectedBlocks,t=e[e.length-1];this.selectedBlocks.push(t),this.viewBlocks[t].select()},s.prototype.unselect=function(){var e=this.selectedBlocks.pop();this.viewBlocks[e].unselect()},s.prototype.selectFinished=function(){this.selectedBlocks.forEach(function(e){this.viewBlocks[e]&&this.viewBlocks[e].unselect()},this)},s.prototype.blockRemoved=function(e){var t=this.viewBlocks[e].element;this.fragment.removeChild(t),delete this.viewBlocks[e]},t.exports=s},{"../util.js":5,"./block":6}]},{},[1]);