const Aguarela = Aguarela || {};

Aguarela.utils = (() => {

    return {

        init() {
            const view = this;

            view.polyfills();
        },

        polyfills() {
            // Matches polyfill
            Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(a){const b=(this.document||this.ownerDocument).querySelectorAll(a),c=b.length;for(;0<=--c&&b.item(c)!==this;);return-1<c});

            // Includes polyfill
            Array.prototype.includes||Object.defineProperty(Array.prototype,'includes',{enumerable:!1,value:function(a){var b=this.filter(function(c){return c==a});return 0<b.length}});
            String.prototype.includes||(String.prototype.includes=function(a,b){return'number'!=typeof b&&(b=0),!(b+a.length>this.length)&&-1!==this.indexOf(a,b)});

            // Nodelist forEach polyfill
            window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(a,b){b=b||window;for(let c=0;c<this.length;c++)a.call(b,this[c],c,this)});

            // Closest polyfill
            Element.prototype.closest||(Element.prototype.closest=function(a){var b=this,c=this;if(!document.documentElement.contains(b))return null;do{if(c.matches(a))return c;c=c.parentElement}while(null!==c);return null});

			// Dataset polyfill
			if(!document.documentElement.dataset&&(!Object.getOwnPropertyDescriptor(HTMLElement.prototype,'dataset')||!Object.getOwnPropertyDescriptor(HTMLElement.prototype,'dataset').get)){const a={};a.enumerable=!0,a.get=function(){function c(j){return j.charAt(1).toUpperCase()}function d(){return this.value}function e(j,k){'undefined'==typeof k?this.removeAttribute(j):this.setAttribute(j,k)}const f=this,g={},h=this.attributes;for(let j=0;j<h.length;j++){const k=h[j];if(k&&k.name&&/^data-\w[\w-]*$/.test(k.name)){const l=k.name,m=k.value,n=l.substr(5).replace(/-./g,c);Object.defineProperty(g,n,{enumerable:a.enumerable,get:d.bind({value:m||''}),set:e.bind(f,l)})}}return g},Object.defineProperty(HTMLElement.prototype,'dataset',a)};
        }

    }

});