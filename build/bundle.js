var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function s(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function u(t,e,n){t.$$.on_destroy.push(s(e,n))}function i(t,e,n){return t.set(n),e}function l(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function d(t){t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function p(t){return document.createTextNode(t)}function h(){return p(" ")}function m(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function $(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function v(t,e,n){t.classList[n?"add":"remove"](e)}let b;function y(t){b=t}function w(){if(!b)throw new Error("Function called outside component initialization");return b}function x(t){w().$$.on_mount.push(t)}function E(){const t=w();return(e,n,{cancelable:o=!1}={})=>{const r=t.$$.callbacks[e];if(r){const c=function(t,e,{bubbles:n=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,o,e),r}(e,n,{cancelable:o});return r.slice().forEach((e=>{e.call(t,c)})),!c.defaultPrevented}return!0}}function _(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach((t=>t.call(this,e)))}const D=[],k=[],C=[],M=[],A=Promise.resolve();let z=!1;function P(t){C.push(t)}const I=new Set;let S=0;function j(){const t=b;do{for(;S<D.length;){const t=D[S];S++,y(t),L(t.$$)}for(y(null),D.length=0,S=0;k.length;)k.pop()();for(let t=0;t<C.length;t+=1){const e=C[t];I.has(e)||(I.add(e),e())}C.length=0}while(D.length);for(;M.length;)M.pop()();z=!1,I.clear(),y(t)}function L(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}const R=new Set;let N;function O(t,e){t&&t.i&&(R.delete(t),t.i(e))}function W(t,e,n,o){if(t&&t.o){if(R.has(t))return;R.add(t),N.c.push((()=>{R.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}function q(t){t&&t.c()}function H(t,n,c,s){const{fragment:u,on_mount:i,on_destroy:l,after_update:a}=t.$$;u&&u.m(n,c),s||P((()=>{const n=i.map(e).filter(r);l?l.push(...n):o(n),t.$$.on_mount=[]})),a.forEach(P)}function B(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Q(t,e){-1===t.$$.dirty[0]&&(D.push(t),z||(z=!0,A.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function U(e,r,c,s,u,i,l,a=[-1]){const f=b;y(e);const p=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:u,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(f?f.$$.context:[])),callbacks:n(),dirty:a,skip_bound:!1,root:r.target||f.$$.root};l&&l(p.root);let h=!1;if(p.ctx=c?c(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return p.ctx&&u(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),h&&Q(e,t)),n})):[],p.update(),h=!0,o(p.before_update),p.fragment=!!s&&s(p.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);p.fragment&&p.fragment.l(t),t.forEach(d)}else p.fragment&&p.fragment.c();r.intro&&O(e.$$.fragment),H(e,r.target,r.anchor,r.customElement),j()}y(f)}class G{$destroy(){B(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const T=[];function F(t,e){return{subscribe:J(t,e).subscribe}}function J(e,n=t){let o;const r=new Set;function s(t){if(c(e,t)&&(e=t,o)){const t=!T.length;for(const t of r)t[1](),T.push(t,e);if(t){for(let t=0;t<T.length;t+=2)T[t][0](T[t+1]);T.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(c,u=t){const i=[c,u];return r.add(i),1===r.size&&(o=n(s)||t),c(e),()=>{r.delete(i),0===r.size&&(o(),o=null)}}}}function K(e,n,c){const u=!Array.isArray(e),i=u?[e]:e,l=n.length<2;return F(c,(e=>{let c=!1;const a=[];let d=0,f=t;const p=()=>{if(d)return;f();const o=n(u?a[0]:a,e);l?e(o):f=r(o)?o:t},h=i.map(((t,e)=>s(t,(t=>{a[e]=t,d&=~(1<<e),c&&p()}),(()=>{d|=1<<e}))));return c=!0,p(),function(){o(h),f()}}))}const V=new URLSearchParams(window.location.search),X=null!==V.get("nocam"),Y=V.get("id"),Z={Peer:window.Peer,QRious:window.QRious},tt=0,et=1,nt=2,ot=K(F(null,(t=>{X||window.navigator.mediaDevices.getUserMedia({video:{facingMode:"user"},audio:!1}).then(t).catch((t=>console.error("Ooopsie woopsie",t)))})),((t,e)=>{null===t&&e(((t,e)=>e));const n=[],o=document.createElement("video");o.setAttribute("autoplay",""),o.setAttribute("playsinline",""),o.srcObject=t;const r=document.createElement("canvas"),c=r.getContext("2d");document.querySelector(".stream")?.appendChild(o);return o.addEventListener("play",(()=>{r.width=o.videoWidth,r.height=o.videoHeight;const t=setInterval((()=>{c?.drawImage(o,0,0,o.videoWidth,o.videoHeight)}),0);n.push((()=>clearInterval(t)))})),n.push((()=>o.remove())),n.push((()=>r.remove())),e(((t,e)=>{const n=(()=>{if(null===c)return[];try{return c.getImageData(0,0,o.videoWidth,o.videoHeight).data}catch(t){return[]}})();let r=e;for(let e=0;e<n.length;e+=4){r=t(r,[n[e+0],n[e+1],n[e+2]])}return r})),()=>{n.forEach((t=>t()))}})),rt=F(Date.now(),(t=>{const e=setInterval((()=>t(Date.now())),10);return()=>clearInterval(e)})),ct=J(!1),st=J(null),ut=J([]),it=J([]),lt=J(0),at=J(!1),dt=J({reset:!0,external:!1}),ft=K([lt,at,ut],(([t,e,n])=>t===n.length&&e)),pt=K([it,rt],(([t,e])=>[...t.slice(1).map(((e,n)=>e-t[n])),...t.length?[e-t[t.length-1]]:[]])),ht=new Z.Peer,mt=[],gt=t=>{t.on("open",(()=>{ut.update((e=>[...e,t])),t.on("close",(()=>ut.update((e=>e.filter((e=>e.peer!==t.peer)))))),t.on("data",bt(t.peer))}))},$t=t=>function(t){let e;return s(t,(t=>e=t))(),e}(ut).forEach((e=>e.send(t))),vt=[(t,e)=>{dt.set({reset:!0,external:!0})},(t,e)=>{lt.update((t=>t+1))},(t,e)=>{it.update((t=>[...t,e.time].sort()))}],bt=t=>e=>{0<=e.type&&e.type<vt.length&&vt[e.type](t,e)},yt=t=>{let e=0;for(const n of t)e+=n;return e},wt=t=>{const e=(t=>{let e=0;const n=[];return{add:o=>{n.length<t?n.push(o):(n[e]=o,e++,e===n.length&&(e=0))},clear:()=>{n.splice(0),e=0},get:()=>n}})(t),n=J({mean:0,std:0});return{...n,addData:t=>{e.add(t),n.set((()=>{const t=e.get(),n=1/t.length,o=n*yt(t),r=n*Math.sqrt(yt(t.map((t=>Math.pow(t-o,2)))));return{mean:o,std:r}})())},clear:()=>{n.set({mean:0,std:0}),e.clear()},ready:()=>e.get().length===t}},xt=t=>`${Math.floor(t/1e3)}.${(""+t%100).padEnd(2,"0")}`;function Et(e){let n,o;return{c(){n=f("div"),o=f("canvas"),g(n,"class","qr-code")},m(t,r){a(t,n,r),l(n,o),e[5](o)},p:t,i:t,o:t,d(t){t&&d(n),e[5](null)}}}function _t(t,e,n){let o,{padding:r=25}=e,{size:c=100}=e,{value:s="test data"}=e,u=null;return t.$$set=t=>{"padding"in t&&n(1,r=t.padding),"size"in t&&n(2,c=t.size),"value"in t&&n(3,s=t.value)},t.$$.update=()=>{1&t.$$.dirty&&n(4,o=null===u?null:new Z.QRious({element:u})),30&t.$$.dirty&&o&&o.set({level:"M",padding:r,size:c,value:s})},[u,r,c,s,o,function(t){k[t?"unshift":"push"]((()=>{u=t,n(0,u)}))}]}class Dt extends G{constructor(t){super(),U(this,t,_t,Et,c,{padding:1,size:2,value:3})}}function kt(t){let e,n,r,c,s,u,i,v,b,y,w,x;return b=new Dt({props:{value:t[0],size:.8*Math.min(window.innerWidth,window.innerHeight),padding:0}}),{c(){e=f("div"),n=f("button"),n.textContent="×",r=h(),c=f("div"),s=f("p"),u=f("a"),i=p(t[0]),v=h(),q(b.$$.fragment),g(n,"class","close-button svelte-7w9va"),g(u,"href",t[0]),g(c,"class","join-info svelte-7w9va"),g(e,"class","join-info-scrim svelte-7w9va")},m(o,d){var f;a(o,e,d),l(e,n),l(e,r),l(e,c),l(c,s),l(s,u),l(u,i),l(c,v),H(b,c,null),y=!0,w||(x=[m(c,"click",(f=t[3],function(t){return t.stopPropagation(),f.call(this,t)})),m(e,"click",t[4])],w=!0)},p(t,[e]){(!y||1&e)&&$(i,t[0]),(!y||1&e)&&g(u,"href",t[0]);const n={};1&e&&(n.value=t[0]),b.$set(n)},i(t){y||(O(b.$$.fragment,t),y=!0)},o(t){W(b.$$.fragment,t),y=!1},d(t){t&&d(e),B(b),w=!1,o(x)}}}function Ct(t,e,n){let o,{id:r=""}=e;const c=E();return t.$$set=t=>{"id"in t&&n(2,r=t.id)},t.$$.update=()=>{4&t.$$.dirty&&n(0,o=(t=>{const e=new URL(window.location.href);return e.searchParams.set("id",t),e.toString()})(r))},[o,c,r,function(e){_.call(this,t,e)},()=>c("close")]}class Mt extends G{constructor(t){super(),U(this,t,Ct,kt,c,{id:2})}}function At(t){let e,n;return e=new Mt({props:{id:t[2]}}),e.$on("close",t[10]),{c(){q(e.$$.fragment)},m(t,o){H(e,t,o),n=!0},p(t,n){const o={};4&n&&(o.id=t[2]),e.$set(o)},i(t){n||(O(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){B(e,t)}}}function zt(e){let n;return{c(){n=f("button"),n.textContent="Device Paired",n.disabled=!0},m(t,e){a(t,n,e)},p:t,d(t){t&&d(n)}}}function Pt(e){let n,o,r;return{c(){n=f("button"),n.textContent="Connect Device"},m(t,c){a(t,n,c),o||(r=m(n,"click",e[11]),o=!0)},p:t,d(t){t&&d(n),o=!1,r()}}}function It(t){let e,n,o,r,c=xt(t[5][0])+"";return{c(){e=f("p"),n=p("BANG! "),o=p(c),r=p("s")},m(t,c){a(t,e,c),l(e,n),l(e,o),l(e,r)},p(t,e){32&e&&c!==(c=xt(t[5][0])+"")&&$(o,c)},d(t){t&&d(e)}}}function St(e){let n;return{c(){n=f("p"),n.textContent="Waiting for movement..."},m(t,e){a(t,n,e)},p:t,d(t){t&&d(n)}}}function jt(e){let n;return{c(){n=f("p"),n.textContent="Calibrating..."},m(t,e){a(t,n,e)},p:t,d(t){t&&d(n)}}}function Lt(t){let e,n,r,c,s,u,i,p,$,b,y=null!==t[2]&&t[3]&&At(t);function w(t,e){return 0===t[4].length?Pt:zt}let x=w(t),E=x(t);function _(t,e){return t[0]?null===t[1]?St:It:jt}let D=_(t),k=D(t);return{c(){e=f("main"),y&&y.c(),n=h(),r=f("div"),c=f("div"),E.c(),s=h(),u=f("button"),u.textContent="Reset Stats",i=h(),k.c(),g(c,"class","controls svelte-oag388"),g(r,"class","stats svelte-oag388"),v(r,"waiting",t[0]&&null===t[1]),v(r,"ready",t[0]&&null!==t[1]),g(e,"class","svelte-oag388")},m(o,d){a(o,e,d),y&&y.m(e,null),l(e,n),l(e,r),l(r,c),E.m(c,null),l(c,s),l(c,u),l(r,i),k.m(r,null),p=!0,$||(b=m(u,"click",t[8]),$=!0)},p(t,[u]){null!==t[2]&&t[3]?y?(y.p(t,u),12&u&&O(y,1)):(y=At(t),y.c(),O(y,1),y.m(e,n)):y&&(N={r:0,c:[],p:N},W(y,1,1,(()=>{y=null})),N.r||o(N.c),N=N.p),x===(x=w(t))&&E?E.p(t,u):(E.d(1),E=x(t),E&&(E.c(),E.m(c,s))),D===(D=_(t))&&k?k.p(t,u):(k.d(1),k=D(t),k&&(k.c(),k.m(r,null))),3&u&&v(r,"waiting",t[0]&&null===t[1]),3&u&&v(r,"ready",t[0]&&null!==t[1])},i(t){p||(O(y),p=!0)},o(t){W(y),p=!1},d(t){t&&d(e),y&&y.d(),E.d(),k.d(),$=!1,b()}}}function Rt(t,e,n){let o,r,c,s,l,a,d,f,p,h,m,g;u(t,it,(t=>n(14,o=t))),u(t,ft,(t=>n(15,r=t))),u(t,at,(t=>n(16,c=t))),u(t,dt,(t=>n(9,a=t))),u(t,lt,(t=>n(19,d=t))),u(t,ot,(t=>n(20,f=t))),u(t,st,(t=>n(2,p=t))),u(t,ct,(t=>n(3,h=t))),u(t,ut,(t=>n(4,m=t))),u(t,pt,(t=>n(5,g=t)));const $=wt(100);u(t,$,(t=>n(18,l=t)));const v=wt(100);u(t,v,(t=>n(17,s=t)));let b=!1,y=null,w=Date.now(),E=Date.now();const _=()=>{$.clear(),v.clear(),n(1,y=null),w=Date.now(),i(it,o=[],o),i(at,c=!1,c),i(lt,d=0,d)};x((()=>{const t=setInterval((()=>{const t=f(((t,e)=>t+e[0]+e[1]+e[2]),0),{mean:e}=l,{mean:u,std:a}=s,d=t-e,p=Math.ceil(Math.abs((d-u)/(a+10)));i(at,c=$.ready(),c),n(0,b=r),E=Date.now(),$.ready()?null===y&&r&&Math.abs(p)>2&&(console.log("BANG",p,Date.now()),n(1,y=Date.now()),i(it,o=[...o,y].sort(),o),$t({type:nt,time:y})):t>0&&E-w>3e3&&($.addData(t),v.addData(d))}),10);return()=>{clearInterval(t),_()}})),x((()=>(ht.on("open",(t=>{st.set(t),null!==Y&&gt(ht.connect(Y))})),ht.on("connection",gt),mt.push(dt.subscribe((({reset:t,external:e})=>{t&&!e&&$t({type:tt})}))),mt.push(at.subscribe((t=>{t&&$t({type:et})}))),()=>{mt.forEach((t=>t()))})));return t.$$.update=()=>{512&t.$$.dirty&&a.reset&&_()},[b,y,p,h,m,g,$,v,()=>{i(dt,a={reset:!0,external:!1},a)},a,()=>ct.set(!1),()=>ct.set(!0)]}const Nt=new class extends G{constructor(t){super(),U(this,t,Rt,Lt,c,{})}}({target:document.body,props:{}});return"undefined"!=typeof module&&module.hot&&("undefined"!=typeof module&&module.hot.dispose((()=>{Nt.$destroy()})),"undefined"!=typeof module&&module.hot.accept()),Nt}();
//# sourceMappingURL=bundle.js.map