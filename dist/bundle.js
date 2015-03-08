!function e(t,i,s){function o(l,c){if(!i[l]){if(!t[l]){var a="function"==typeof require&&require;if(!c&&a)return a(l,!0);if(n)return n(l,!0);var h=new Error("Cannot find module '"+l+"'");throw h.code="MODULE_NOT_FOUND",h}var r=i[l]={exports:{}};t[l][0].call(r.exports,function(e){var i=t[l][1][e];return o(i?i:e)},r,r.exports,e,t,i,s)}return i[l].exports}for(var n="function"==typeof require&&require,l=0;l<s.length;l++)o(s[l]);return o}({1:[function(e){var t=e("./game/game.js"),i=e("./util.js");i.isMobile||i.addClass(document.body,"no-touch");var s=new t,o=document.getElementById("game");o.appendChild(s.element)},{"./game/game.js":5,"./util.js":7}],2:[function(e,t){function i(e,t,i){this.id=++l,this.field=i,this.x=e,this.y=t,this.value=null,this.element=null,this.width=500/config.field.size[0],this.height=500/config.field.size[1],this._setRandomValue(),this._createElement(),this._bindEvents()}var s=e("./colors.js"),o=e("../util.js"),n=[1,2,3,5,7,11,13],l=0;i.prototype._createElement=function(){var e=document.createElement("div");e.className="block",e.setAttribute("data-id",this.id),e.style.left=Math.floor(this.x*this.width)+"px",e.style.bottom=Math.floor(this.y*this.height)+"px";var t=document.createElement("div");t.className="block__inner",e.appendChild(t);var i=document.createElement("div");i.className="block__active",e.appendChild(i);var s=document.createElement("div");s.className="block__text",s.innerHTML=this.value,t.appendChild(s),this.innerElement=t,this.textElement=s,this.activeElement=i,this.element=e,this._updateColors()},i.prototype._setRandomValue=function(){var e=0,t=config.numbers.possibleValues;t.forEach(function(t){e+=t[1]});for(var i=0,s=t.map(function(t){var s=t[1]/e+i;return i+=s,s}),o=Math.random(),n=0,l=0;l<s.length;l++)if(o<=s[l]){n=t[l][0];break}this.value=n},i.prototype._bindEvents=function(){o.isMobile?o.on(this.element,"touchstart",this._mouseDownHandler.bind(this)):(o.on(this.element,"mousedown",this._mouseDownHandler.bind(this)),o.on(this.activeElement,"mouseover",this._mouseOverHandler.bind(this)))},i.prototype._touchMoveHandler=function(e){for(var t=0;t<e.changedTouches.length;t++){var i=e.changedTouches[t],s=document.elementFromPoint(i.clientX,i.clientY);this.activeElement===s&&this.field.blockMouseDown(this.id)}},i.prototype._mouseDownHandler=function(){this.field.blockMouseDown(this.id)},i.prototype._mouseOverHandler=function(){this.field.blockMouseOver(this.id)},i.prototype._mouseOutHandler=function(){this.field.blockMouseOut(this.id)},i.prototype.changePosition=function(e,t){this.x=e,this.y=t,this.element.style.left=Math.floor(e*this.width)+"px",this.element.style.bottom=Math.floor(t*this.height)+"px"},i.prototype._updateColors=function(){var e,t=[];for(e=n.length-1;e>0;e--)this.value%n[e]===0&&t.push({value:n[e],rgb:s[e].rgb,ratio:this.value/n[e]});var i;i=t.length?o.rgbSum(t):s[0].rgb,this.innerElement.style.backgroundColor="rgb("+i.join(",")+")"},i.prototype.changeValue=function(e){this.value=e,this.textElement.innerHTML=e,this._updateColors()},i.prototype.select=function(){o.addClass(this.element,"_selected")},i.prototype.unselect=function(){o.removeClass(this.element,"_selected")},i.prototype.animateCreate=function(){var e=this;o.addClass(this.element,"_blink"),setTimeout(function(){o.removeClass(e.element,"_blink")},0)},t.exports=i},{"../util.js":7,"./colors.js":3}],3:[function(e,t){t.exports=[{web:"#99b433",rgb:[154,180,51]},{web:"#DA532C",rgb:[218,83,44]},{web:"#1e7145",rgb:[30,113,69]},{web:"#2C89A0",rgb:[44,137,160]},{web:"#00AA88",rgb:[0,170,136]},{web:"#00d455",rgb:[0,212,85]},{web:"#ff2a2a",rgb:[255,42,42]},{web:"#CB5000",rgb:[203,80,0]}]},{}],4:[function(e,t){function i(e){this.game=e,this.blocks={},this._blocksXY={},this.size=config.field.size,this.selectedBlocks=[],this.selectedMode=!1,this.element=null,this._init(),this._createElement(),this._bindEvents()}var s=e("./block.js"),o=e("../util"),n=e("../gameConfig");i.prototype._init=function(){for(var e=0;e<this.size[0];e++){this._blocksXY[e]={};for(var t=0;t<this.size[1];t++)this.createBlock(e,t,!0)}},i.prototype.createBlock=function(e,t,i){var o=new s(e,t,this);this.blocks[o.id]=o,this._blocksXY[e][t]=o.id,i||(this.element.appendChild(o.element),o.animateCreate())},i.prototype._createElement=function(){var e=document.createDocumentFragment();this.canvas=document.createElement("canvas"),this.canvas.className="field__canvas",this.ctx=this.canvas.getContext("2d"),this.canvas.width=n.field.width,this.canvas.height=n.field.height,e.appendChild(this.canvas),o.forEach(this.blocks,function(t){e.appendChild(t.element)}),this.element=document.createElement("div"),this.element.className="field _width_"+this.size[0]+" _height_"+this.size[1],this.element.appendChild(e)},i.prototype._bindEvents=function(){o.isMobile?(o.on(document.body,"touchend",this._mouseUpHandler.bind(this)),o.on(document.body,"touchmove",this._touchMoveHandler.bind(this))):o.on(document.body,"mouseup",this._mouseUpHandler.bind(this))},i.prototype._touchMoveHandler=function(e){var t,i,s,o,n,l,c,a=this.blocks;for(l=0;l<e.changedTouches.length;l++)if(o=e.changedTouches[l],n=document.elementFromPoint(o.clientX,o.clientY),-1!=n.className.indexOf("block__active")){for(s=Object.keys(a),c=0;c<s.length;c++)if(i=a[s[c]],i.activeElement===n){this.blockMouseOver(i.id),t=!0;break}if(t)break}},i.prototype._mouseUpHandler=function(){this.selectedMode&&(this.selectedMode=!1,this._runSelected(),o.forEach(this.blocks,function(e){e.unselect()}),this.game.updateChainSum(0),this._clearPath())},i.prototype.blockMouseDown=function(e){this.selectedMode=!0,this.selectedBlocks=[e],this.blocks[e].select(),this.game.updateChainSum(this._calcChainSum())},i.prototype._checkWithLast=function(e){var t=this.blocks[this.selectedBlocks[this.selectedBlocks.length-1]],i=this.blocks[e];return t.value==i.value&&Math.abs(t.x-i.x)<=1&&Math.abs(t.y-i.y)<=1},i.prototype.blockMouseOver=function(e){if(this.selectedMode){var t=this.selectedBlocks;if(-1==t.indexOf(e))this._checkWithLast(e)&&(t.push(e),this.blocks[e].select(),this.game.updateChainSum(this._calcChainSum()),this._updatePath());else if(t[t.length-2]==e){var i=t.pop();this.blocks[i].unselect(),this.game.updateChainSum(this._calcChainSum()),this._updatePath()}}},i.prototype._updatePath=function(){var e=this.ctx;this._clearPath(),e.beginPath(),e.strokeStyle=n.path.color,e.lineWidth=n.path.width,this.selectedBlocks.forEach(function(t,i){var s=this.blocks[t],o=(s.x+.5)*s.width,l=n.field.height-(s.y+.5)*s.height;0===i?e.moveTo(o,l):e.lineTo(o,l),console.log(o,l)},this),e.stroke()},i.prototype._clearPath=function(){this.ctx.clearRect(0,0,n.field.width,n.field.height)},i.prototype.blockMouseOut=function(){},i.prototype._calcChainSum=function(){var e=this.blocks[this.selectedBlocks[0]].value||0;return e*this.selectedBlocks.length},i.prototype._calcUpdateScore=function(){var e=this.blocks[this.selectedBlocks[0]].value,t=1+.2*(this.selectedBlocks.length-3);return Math.round(e*this.selectedBlocks.length*t)},i.prototype._blockRemove=function(e){var t=this.blocks[e];this.element.removeChild(t.element),this._blocksXY[t.x][t.y]=null,delete this.blocks[e]},i.prototype._runSelected=function(){if(!(this.selectedBlocks.length<config.chain.minLength)){this.game.updateScore(this._calcUpdateScore());var e=this.selectedBlocks.pop(),t=this.blocks[e],i=t.value*(this.selectedBlocks.length+1);t.changeValue(i),this.selectedBlocks.forEach(this._blockRemove,this),this._checkPositions()}},i.prototype._checkPositions=function(){var e=this,t=this._blocksXY,i=this.blocks;o.forEach(t,function(t){var s=[];o.forEach(t,function(e){e&&s.push(e)}),s.length!=e.size[1]&&s&&(s.sort(function(e,t){return i[e].y>i[t].y}),s.forEach(function(e,s){var o=i[e];o.y!=s&&(t[o.y]=null,o.changePosition(o.x,s),t[s]=e)}))}),this._addNewBlocks()},i.prototype._addNewBlocks=function(){for(var e=this._blocksXY,t=0;t<this.size[0];t++)for(var i=0;i<this.size[1];i++)e[t][i]||this.createBlock(t,i)},t.exports=i},{"../gameConfig":6,"../util":7,"./block.js":2}],5:[function(e,t){function i(){this.field=new s(this),this.score=0,this._createElement()}var s=e("./field.js"),o=e("../util");i.prototype._createElement=function(){var e=document.createElement("div");e.className="game";var t=document.createElement("div");t.className="game__header",e.appendChild(t);var i=document.createElement("div");i.className="game__score",i.innerHTML="0",t.appendChild(i);var s=document.createElement("div");s.className="game__chainSumm",t.appendChild(s),e.appendChild(this.field.element),this.scoreElement=i,this.chainSummElement=s,this.element=e},i.prototype.updateChainSum=function(e){e?(this.chainSummElement.innerHTML=e,o.addClass(this.chainSummElement,"_showed")):o.removeClass(this.chainSummElement,"_showed")},i.prototype.updateScore=function(e){this.score+=e,this.scoreElement.innerHTML=this.score},t.exports=i},{"../util":7,"./field.js":4}],6:[function(e,t){t.exports={field:{width:500,height:500},path:{color:"rgba(255, 255, 255, 0.8)",width:10}}},{}],7:[function(e,t){var i={};i.addClass=function(e,t){var i=e.className.split(" "),s=i.indexOf(t);return-1===s&&(i.push(t),e.className=i.join(" ")),e},i.removeClass=function(e,t){var i=e.className.split(" "),s=i.indexOf(t);return-1!==s&&(i.splice(s,1),e.className=i.join(" ")),e},i.hasClass=function(e,t){var i=e.className.split(" ");return-1!=i.indexOf(t)},i.forEach=function(e,t,i){e.length?e.forEach(t,i):Object.keys(e).forEach(function(s){t.call(i,e[s],s)})},i.on=function(e,t,i){e.addEventListener(t,i)},i.off=function(e,t,i){e.removeEventListener(t,i)};var s="DeviceOrientationEvent"in window||"orientation"in window;/Windows NT|Macintosh|Mac OS X|Linux/i.test(navigator.userAgent)&&(s=!1),/Mobile/i.test(navigator.userAgent)&&(s=!0),i.isMobile=s,i.rgbSum=function(e){var t,i,s,o=[0,0,0],n=0;for(i=0;i<e.length;i++){for(t=e[i],s=0;3>s;s++)o[s]+=t.rgb[s]*t.ratio;n+=t.ratio}for(s=0;3>s;s++)o[s]=Math.floor(o[s]/n);return o},t.exports=i},{}]},{},[1]);