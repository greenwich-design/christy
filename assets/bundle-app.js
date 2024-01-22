/*! For license information please see bundle-app.js.LICENSE.txt */
(()=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";e=function(){return n};var n={},r=Object.prototype,o=r.hasOwnProperty,i=Object.defineProperty||function(t,e,n){t[e]=n.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function d(t,e,n,r){var o=e&&e.prototype instanceof h?e:h,a=Object.create(o.prototype),c=new T(r||[]);return i(a,"_invoke",{value:L(t,n,c)}),a}function f(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}n.wrap=d;var p={};function h(){}function y(){}function v(){}var m={};s(m,c,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(M([])));b&&b!==r&&o.call(b,c)&&(m=b);var w=v.prototype=h.prototype=Object.create(m);function S(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function x(e,n){function r(i,a,c,u){var l=f(e[i],e,a);if("throw"!==l.type){var s=l.arg,d=s.value;return d&&"object"==t(d)&&o.call(d,"__await")?n.resolve(d.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):n.resolve(d).then((function(t){s.value=t,c(s)}),(function(t){return r("throw",t,c,u)}))}u(l.arg)}var a;i(this,"_invoke",{value:function(t,e){function o(){return new n((function(n,o){r(t,e,n,o)}))}return a=a?a.then(o,o):o()}})}function L(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return k()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=q(a,n);if(c){if(c===p)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=f(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===p)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}function q(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,q(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),p;var o=f(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,p;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function M(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,r=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return r.next=r}}return{next:k}}function k(){return{value:void 0,done:!0}}return y.prototype=v,i(w,"constructor",{value:v,configurable:!0}),i(v,"constructor",{value:y,configurable:!0}),y.displayName=s(v,l,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,s(t,l,"GeneratorFunction")),t.prototype=Object.create(w),t},n.awrap=function(t){return{__await:t}},S(x.prototype),s(x.prototype,u,(function(){return this})),n.AsyncIterator=x,n.async=function(t,e,r,o,i){void 0===i&&(i=Promise);var a=new x(d(t,e,r,o),i);return n.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},S(w),s(w,l,"Generator"),s(w,c,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},n.values=M,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),u=o.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),E(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;E(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:M(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),p}},n}function n(t,e,n,r,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function r(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)}))}}var o={handlers:function(){},init:function(){this.handlers();var t=0,n=document.querySelector("#product-bundle").closest("[data-section]").dataset.section,o=document.querySelector("#product-bundle").querySelector("#product-bundle-blocker"),i=document.querySelectorAll(".js-bundle-prev"),a=document.querySelectorAll(".js-bundle-next"),c=document.querySelector("[data-currentstep]"),u=document.querySelector("#product-bundle [data-addcart]"),l=JSON.parse(document.querySelector("#bundleJson").innerHTML);function s(){o.classList.add("!opacity-100","!visible")}function d(){o.classList.remove("!opacity-100","!visible")}function f(t){return p.apply(this,arguments)}function p(){return(p=r(e().mark((function t(r){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(r)).then((function(t){return t.text()})).then((function(t){var e=(new DOMParser).parseFromString(t,"text/html"),r=e.querySelector("[data-moboptions]").innerHTML,o=e.querySelector("#media-gallery").innerHTML;document.querySelector("[data-moboptions]").innerHTML=r,document.querySelector("#media-gallery").innerHTML=o,document.querySelector("product-info[data-variantid]")&&e.querySelector("product-info[data-variantid]")&&(document.querySelector("product-info[data-variantid]").dataset.variantid=e.querySelector("product-info[data-variantid]").dataset.variantid);var i=e.getElementById("ProductSubmitButton-".concat(n));i&&(i.hasAttribute("disabled")?(document.querySelector('#product-bundle [data-bundlebtn="next"]').disabled=!0,document.querySelector('#product-bundle [data-bundlebtn="next"]').textContent=window.variantStrings.soldOut):(document.querySelector('#product-bundle [data-bundlebtn="next"]').disabled=!1,document.querySelector('#product-bundle [data-bundlebtn="next"]').textContent="Next")),h()}));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function h(){var t=document.querySelectorAll("#media-gallery > div:not(.hidden)"),e=document.querySelector("#media-gallery-mob"),n=document.querySelector("#media-gallery-thumbs");if(t&&e){e.querySelector(".splide__list").innerHTML="",n.querySelector(".splide__list").innerHTML="",t.forEach((function(t){var r=document.createElement("li");r.classList.add("splide__slide","!translate-x-0"),r.appendChild(t.cloneNode(!0)),r.querySelector("img").classList.remove("loaded"),e.querySelector(".splide__list").appendChild(r.cloneNode(!0)),r.querySelector("img").classList.remove("image-magnify-hover","cursor-zoom-in"),n.querySelector(".splide__list").appendChild(r.cloneNode(!0))}));var r=new Event("splidegalrefresh");window.dispatchEvent(r);var o=new Event("initzoomer");window.dispatchEvent(o)}}function y(){var t=document.querySelector(".product__info-wrapper").getBoundingClientRect().top+window.scrollY,e=document.querySelector(".header-bar").offsetHeight;e+window.scrollY>t&&window.scrollTo({top:t-e-50,behavior:"smooth"})}function v(){c&&(c.innerHTML=t),0==t?document.querySelector("#product-title").innerHTML=l.bundleData.bundleTitle:t>0&&(document.querySelector("#product-title").innerHTML=l.steps[t-1].stepTitle),document.querySelector("#product-bundle").dataset.step=t,y(),b(),w()}function m(){if(0==t)return"/products/".concat(l.bundleData.mainHandle,"?section_id=").concat(n);var e=l.steps[t-1],r=e.handle,o=e.variantId,i=e.variants;if(i&&i.length>0){var a=i.map((function(t){return t.id.replace("gid://shopify/ProductVariant/","")})).join(":");return"/products/".concat(r,"/v:").concat(a,",sv:").concat(o,"&section_id=").concat(n)}return"/products/".concat(r,"?variant=").concat(o,"&section_id=").concat(n)}function g(){return(g=r(e().mark((function n(r){return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(),t=r,e.next=4,f(m());case 4:document.querySelector("#product-bundle").classList.remove("last-step"),v(),d();case 7:case"end":return e.stop()}}),n)})))).apply(this,arguments)}function b(){if(t>0){document.querySelector("[data-variantid]")&&(l.steps[t-1].variantId=parseInt(document.querySelector("[data-variantid]").dataset.variantid));l.variants.find((function(e){return e.id===l.steps[t-1].variantId}))}}function w(){document.querySelector("#bundle-review");var t=document.querySelector("#bundle-review > ul"),e=0,n=0,r="";l.steps.length>0&&(l.steps.forEach((function(t,o){var i=t.variantId,a=l.variants.find((function(t){return t.id===i})),c=1;t.quantity&&(c=t.quantity),a.price&&(e+=a.price*c),a.compare_at_price&&(n+=a.compare_at_price*c);var u="";a.options&&a.options.length&&a.options.forEach((function(t){u+="<p>".concat(t,"</p>")}));var s="";a.featured_image&&(s='<div loading="lazy" class="w-[100px] h-[100px]"><img class="w-full h-full bg-cover" src="'.concat(a.featured_image,'&width=200&height=200&crop=center" alt="').concat(a.product_title,'" /></div>')),r+='\n                    <li class="flex justify-between gap-5">\n                    <div class="">\n                        <h3 class="font-semibold lg:d-h5 mb-3">'.concat(o+1,". ").concat(a.product_title,"</h3>\n                        <div>").concat(u,'</div>\n                        <button class="underline mt-3" data-changestep="').concat(o+1,'">Change</button>\n                    </div>\n                    ').concat(s,"\n                    </li>\n                    ")})),function(t,e){var n=document.querySelectorAll("#product-bundle [data-bundlepricehtml]"),r="",o="",i=0;e>t&&(i=100-(i=(i=100*t/e*100/100).toFixed(2)),i=Math.round(100*i)/100);if(l.bundleData.bundleDiscount>0){t-=t*l.bundleData.bundleDiscount/100,t=Math.round(t)}var a=Shopify.formatMoney(t,window.money_format),c=Shopify.formatMoney(e,window.money_format);r=e>t?'<span class="flex gap-x-2 font-semibold ">\n            <span class="line-through opacity-60">\n              '.concat(c,"\n            </span>\n            <span>").concat(a,"</span>\n            </span>"):'<span class="font-semibold">'.concat(a,"</span>");o=l.bundleData.bundleDiscount>0?"Bundle Savings ".concat(l.bundleData.bundleDiscount,"% Off"):"Bundle Savings";n.length&&n.forEach((function(t){t.querySelector(".bundleprice").innerHTML=r,t.querySelector(".bundlesavings").innerHTML=o}))}(e,n),t.innerHTML=r,t.querySelectorAll("[data-changestep]").length&&t.querySelectorAll("[data-changestep]").forEach((function(t){t.addEventListener("click",(function(){!function(t){g.apply(this,arguments)}(t.dataset.changestep)}))})))}function S(){return(S=r(e().mark((function t(){var n,r;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n={items:[]},u.disabled=!0,u.textContent="Adding...",!(l.steps.length>0)){t.next=12;break}return l.steps.forEach((function(t){var e={id:t.variantId,quantity:parseInt(t.quantity),properties:{bundle:Date.now()}};n.items.push(e)})),t.next=7,fetch(window.Shopify.routes.root+"cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(t){return t.json()})).catch((function(t){}));case 7:return t.sent,r=document.querySelector("cart-drawer"),t.next=11,fetch(window.location,{}).then((function(t){return t.text()})).then((function(t){var e=(new DOMParser).parseFromString(t,"text/html");r.innerHTML=e.querySelector("cart-drawer").innerHTML,document.querySelector("cart-drawer").open(),App.overflowFloatedStyle(),document.querySelector(".cart__contents .splide:not(.splide-custom):not(.is-initialized)")&&SplideConfig.initSplides(".cart__contents .splide:not(.splide-custom):not(.is-initialized)"),x()}));case 11:t.sent;case 12:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function x(){return L.apply(this,arguments)}function L(){return(L=r(e().mark((function n(){return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(),u.disabled=!0,u.textContent="Added",t=0,e.next=6,f(m());case 6:document.querySelector("#product-bundle").classList.remove("last-step"),u.disabled=!1,u.textContent="Add to Basket",v(),d();case 11:case"end":return e.stop()}}),n)})))).apply(this,arguments)}console.log(l),l.steps.length>0&&(document.querySelector("[data-totalstep]").innerHTML=l.steps.length),i.length&&i.forEach((function(n){n.addEventListener("click",r(e().mark((function n(){return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(),t--,e.next=4,f(m());case 4:v(),d();case 6:case"end":return e.stop()}}),n)}))))})),a.length&&a.forEach((function(n){n.addEventListener("click",r(e().mark((function n(){return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s(),!(++t>l.steps.length)){e.next=5;break}return setTimeout((function(){c&&(c.innerHTML=t),document.querySelector("#product-title").innerHTML=l.bundleData.bundleTitle,document.querySelector("#product-bundle").dataset.step=t,document.querySelector("#product-bundle").classList.add("last-step");var e=[];l.steps.length>0&&l.steps.forEach((function(t,n){var r=t.variantId,o=l.variants.find((function(t){return t.id===r}));o.featured_image&&e.push(o.featured_image)}));var n=document.querySelector("#media-gallery");if(n&&e.length){n.innerHTML="";var r="";e.forEach((function(t){document.createElement("div"),r+='<div class="flex"><figure class="w-full relative z-0"><img class="min-h-full object-cover" loading="lazy" src="'.concat(t,'&width=672" alt="').concat(l.bundleData.bundleTitle,'" /></figure></div>')})),n.innerHTML=r,h()}y(),d()}),500),e.abrupt("return");case 5:return e.next=7,f(m());case 7:v(),d();case 9:case"end":return e.stop()}}),n)}))))})),u.addEventListener("click",(function(){!function(){S.apply(this,arguments)}()})),window.addEventListener("variantchange",(function(){b(),w()})),b(),d()}};document.addEventListener("DOMContentLoaded",(function(){o.init()}))})();