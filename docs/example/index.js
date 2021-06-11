var makeSuperFireFontFromSimpleElementWithPlaneText=function(){"use strict";const e=()=>{const e=document.createElement("div");var t;return t=e,document.getElementsByTagName("body")[0].appendChild(t),e},t=({text:t,styles:n})=>{const r=e();(({targetElement:e,styles:t})=>{for(const n in t)e.style.setProperty(n,t.getPropertyValue(n));e.style.position="absolute",e.style.height="auto",e.style.width="auto",e.style.display="block",e.style.visibility="hidden",e.style.whiteSpace="nowrap",e.style.padding="0px",e.style.border="none"})({targetElement:r,styles:n});const o=(({elementForMesuarement:e,text:t})=>(e.innerText=t,e.getBoundingClientRect().width))({elementForMesuarement:r,text:t});return r.remove(),o};(e=>{const t=document.createElement("style");t.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(t)})(["-webkit-","-o-","-moz-",""].map((e=>`\n    @${e}keyframes fire_front_keyframes {\n        from {\n            transform: perspective(500px) translateX(100vw) scale3d(1, 1, 10) rotateY(0deg);\n        }\n\n        10% {\n            transform: perspective(500px) translateX(90vw) scale3d(1, 1, 10) rotateY(0deg);\n        }\n\n\n        20% {\n            transform: perspective(500px) translateX(80vw) scale3d(1, 1, 10) rotateY(0deg);\n        }\n\n        30% {\n            transform: perspective(500px) translateX(70vw) scale3d(3, 3, 10) rotateY(45deg);\n        }\n\n        40%{\n            transform: perspective(500px) translateX(60vw) scale3d(6, 6, 10) rotateY(90deg);\n        }\n\n\n        50% {\n            transform: perspective(500px) translateX(50vw) scale3d(10, 10, 10) rotateY(180deg);\n        }\n\n        to {\n            transform: perspective(500px) translateX(0px) scale3d(1, 1, 10) rotateY(360deg);\n        }\n   }\n`)).join("\n"));var n=makeSuperFireFontFromSimpleElementWithPlaneText=e=>{const t=r(e);o(e),Array.from(t).forEach(((t,n)=>{const r=a({symbol:t,symbolNumber:n,rootElement:e});e.appendChild(r)}))};const r=e=>e.innerText,o=e=>{e.innerText=""},s=({symbolContainerElement:e,symbol:n,symbolNumber:r,rootElement:o})=>{const s=t({text:n,styles:m(o)});Object.assign(e.style,{width:`${s}px`,height:"1em",display:"inline-block","will-change":"transform",transform:"translateX(100vw)",animation:"fire_front_keyframes 3s linear forwards",position:"relative","transform-style":"preserve-3d","transform-origin":"center",animationDelay:.5*r+"s"});new ResizeObserver(function(e,t,n){let r;return function(){const o=this,s=arguments,l=function(){r=null,n||e.apply(o,s)},a=n&&!r;clearTimeout(r),r=setTimeout(l,t),a&&e.apply(o,s)}}((()=>{const r=t({text:n,styles:m(o)});e.style.width=`${r}px`}),500)).observe(o)},l=({symbol:e,symbolNumber:t,rootElement:n})=>{const r=(({symbol:e,rootElement:t,symbolNumber:n})=>{const r=document.createElement("div");return s({symbolContainerElement:r,symbol:e,symbolNumber:n,rootElement:t}),r})({symbol:e,symbolNumber:t,rootElement:n});return(({symbolConainer:e,symbol:t,rootElement:n})=>{for(let n=0;n<10;n++){const r=document.createElement("span");r.innerText=t,e.appendChild(r),r.style.position="absolute",r.style.transform=`translateZ(calc(1em * ${.0042*n}))`}})({symbolConainer:r,symbol:e,rootElement:n}),r},a=({symbol:e,symbolNumber:t,rootElement:n})=>" "===e?(()=>{const e=document.createElement("span");return e.innerText=" ",e})():l({symbol:e,symbolNumber:t,rootElement:n}),m=e=>window.getComputedStyle(e);return n}();