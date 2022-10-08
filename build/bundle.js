var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function u(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function s(t,e,n){t.$$.on_destroy.push(u(e,n))}function a(t,e){t.appendChild(e)}function i(t,e,n){t.insertBefore(e,n||null)}function l(t){t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function p(t,e,n){t.classList[n?"add":"remove"](e)}let m;function g(t){m=t}function $(t){(function(){if(!m)throw new Error("Function called outside component initialization");return m})().$$.on_mount.push(t)}const b=[],y=[],v=[],w=[],_=Promise.resolve();let x=!1;function E(t){v.push(t)}const A=new Set;let M=0;function k(){const t=m;do{for(;M<b.length;){const t=b[M];M++,g(t),D(t.$$)}for(g(null),b.length=0,M=0;y.length;)y.pop()();for(let t=0;t<v.length;t+=1){const e=v[t];A.has(e)||(A.add(e),e())}v.length=0}while(b.length);for(;w.length;)w.pop()();x=!1,A.clear(),g(t)}function D(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(E)}}const C=new Set;function I(t,e){-1===t.$$.dirty[0]&&(b.push(t),x||(x=!0,_.then(k)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function z(c,u,s,a,i,d,f,h=[-1]){const p=m;g(c);const $=c.$$={fragment:null,ctx:null,props:d,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u.context||(p?p.$$.context:[])),callbacks:n(),dirty:h,skip_bound:!1,root:u.target||p.$$.root};f&&f($.root);let b=!1;if($.ctx=s?s(c,u.props||{},((t,e,...n)=>{const o=n.length?n[0]:e;return $.ctx&&i($.ctx[t],$.ctx[t]=o)&&(!$.skip_bound&&$.bound[t]&&$.bound[t](o),b&&I(c,t)),e})):[],$.update(),b=!0,o($.before_update),$.fragment=!!a&&a($.ctx),u.target){if(u.hydrate){const t=function(t){return Array.from(t.childNodes)}(u.target);$.fragment&&$.fragment.l(t),t.forEach(l)}else $.fragment&&$.fragment.c();u.intro&&((y=c.$$.fragment)&&y.i&&(C.delete(y),y.i(v))),function(t,n,c,u){const{fragment:s,on_mount:a,on_destroy:i,after_update:l}=t.$$;s&&s.m(n,c),u||E((()=>{const n=a.map(e).filter(r);i?i.push(...n):o(n),t.$$.on_mount=[]})),l.forEach(E)}(c,u.target,u.anchor,u.customElement),k()}var y,v;g(p)}const N=[];function O(t,e){return{subscribe:S(t,e).subscribe}}function S(e,n=t){let o;const r=new Set;function u(t){if(c(e,t)&&(e=t,o)){const t=!N.length;for(const t of r)t[1](),N.push(t,e);if(t){for(let t=0;t<N.length;t+=2)N[t][0](N[t+1]);N.length=0}}}return{set:u,update:function(t){u(t(e))},subscribe:function(c,s=t){const a=[c,s];return r.add(a),1===r.size&&(o=n(u)||t),c(e),()=>{r.delete(a),0===r.size&&(o(),o=null)}}}}const j=t=>{let e=0;for(const n of t)e+=n;return e},L=t=>{const e=(t=>{let e=0;const n=[];return{add:o=>{n.length<t?n.push(o):(n[e]=o,e++,e===n.length&&(e=0))},clear:()=>{n.splice(0),e=0},get:()=>n}})(t),n=S({mean:0,std:0});return{...n,addData:t=>{e.add(t),n.set((()=>{const t=e.get(),n=1/t.length,o=n*j(t),r=n*Math.sqrt(j(t.map((t=>Math.pow(t-o,2)))));return{mean:o,std:r}})())},clear:()=>{n.set({mean:0,std:0}),e.clear()},ready:()=>e.get().length===t}},W=function(e,n,c){const s=!Array.isArray(e),a=s?[e]:e,i=n.length<2;return O(c,(e=>{let c=!1;const l=[];let d=0,f=t;const h=()=>{if(d)return;f();const o=n(s?l[0]:l,e);i?e(o):f=r(o)?o:t},p=a.map(((t,e)=>u(t,(t=>{l[e]=t,d&=~(1<<e),c&&h()}),(()=>{d|=1<<e}))));return c=!0,h(),function(){o(p),f()}}))}(O(null,(t=>{window.navigator.mediaDevices.getUserMedia({video:{facingMode:"user"},audio:!1}).then(t).catch((t=>console.error("Ooopsie woopsie",t)))})),((t,e)=>{null===t&&e(((t,e)=>e));const n=[],o=document.createElement("video");o.setAttribute("autoplay",""),o.setAttribute("playsinline",""),o.srcObject=t;const r=document.createElement("canvas"),c=r.getContext("2d");document.querySelector(".stream")?.appendChild(o);return o.addEventListener("play",(()=>{r.width=o.videoWidth,r.height=o.videoHeight;const t=setInterval((()=>{c?.drawImage(o,0,0,o.videoWidth,o.videoHeight)}),0);n.push((()=>clearInterval(t)))})),n.push((()=>o.remove())),n.push((()=>r.remove())),e(((t,e)=>{const n=(()=>{if(null===c)return[];try{return c.getImageData(0,0,o.videoWidth,o.videoHeight).data}catch(t){return[]}})();let r=e;for(let e=0;e<n.length;e+=4){r=t(r,[n[e+0],n[e+1],n[e+2]])}return r})),()=>{n.forEach((t=>t()))}}));function q(t){let e,n,o,r,c=Math.floor((t[2]-t[1])/1e3)+"";return{c(){e=d("p"),n=f("BANG! "),o=f(c),r=f("s")},m(t,c){i(t,e,c),a(e,n),a(e,o),a(e,r)},p(t,e){6&e&&c!==(c=Math.floor((t[2]-t[1])/1e3)+"")&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(o,c)},d(t){t&&l(e)}}}function B(e){let n;return{c(){n=d("p"),n.textContent="Waiting for movement..."},m(t,e){i(t,n,e)},p:t,d(t){t&&l(n)}}}function H(e){let n;return{c(){n=d("p"),n.textContent="Calibrating..."},m(t,e){i(t,n,e)},p:t,d(t){t&&l(n)}}}function G(e){let n,o,r,c,u,s;function m(t,e){return t[0]?null===t[1]?B:q:H}let g=m(e),$=g(e);return{c(){n=d("main"),o=d("div"),r=d("button"),r.textContent="Reset Stats",c=f(" "),$.c(),h(o,"class","stats svelte-1323ez9"),p(o,"waiting",e[0]&&null===e[1]),p(o,"ready",e[0]&&null!==e[1]),h(n,"class","svelte-1323ez9")},m(t,l){var d,f,h,p;i(t,n,l),a(n,o),a(o,r),a(o,c),$.m(o,null),u||(d=r,f="click",h=e[5],d.addEventListener(f,h,p),s=()=>d.removeEventListener(f,h,p),u=!0)},p(t,[e]){g===(g=m(t))&&$?$.p(t,e):($.d(1),$=g(t),$&&($.c(),$.m(o,null))),3&e&&p(o,"waiting",t[0]&&null===t[1]),3&e&&p(o,"ready",t[0]&&null!==t[1])},i:t,o:t,d(t){t&&l(n),$.d(),u=!1,s()}}}function T(t,e,n){let o,r,c;s(t,W,(t=>n(8,c=t)));const u=L(300);s(t,u,(t=>n(7,r=t)));const a=L(300);s(t,a,(t=>n(6,o=t)));let i=!1,l=null,d=Date.now();const f=()=>{u.clear(),a.clear(),n(1,l=null)};return $((()=>{const t=setInterval((()=>{const t=c(((t,e)=>t+e[0]+e[1]+e[2]),0),{mean:e}=r,{mean:s,std:f}=o,h=t-e,p=Math.ceil(Math.abs((h-s)/(f+10)));n(0,i=u.ready()),n(2,d=Date.now()),u.ready()?null===l&&Math.abs(p)>2&&(console.log("BANG",p,Date.now()),n(1,l=Date.now())):t>0&&(u.addData(t),a.addData(h))}),10);return()=>{clearInterval(t),f()}})),[i,l,d,u,a,f]}const F=new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),z(this,t,T,G,c,{})}}({target:document.body,props:{}});return"undefined"!=typeof module&&module.hot&&("undefined"!=typeof module&&module.hot.dispose((()=>{F.$destroy()})),"undefined"!=typeof module&&module.hot.accept()),F}();
//# sourceMappingURL=bundle.js.map
