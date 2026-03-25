(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const Gh="modulepreload",Qh=function(n,e){return new URL(n,e).href},Al={},ms=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),u=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=Promise.allSettled(t.map(h=>{if(h=Qh(h,r),h in Al)return;Al[h]=!0;const p=h.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(!!r)for(let R=a.length-1;R>=0;R--){const x=a[R];if(x.href===h&&(!p||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${y}`))return;const w=document.createElement("link");if(w.rel=p?"stylesheet":Gh,p||(w.as="script"),w.crossOrigin="",w.href=h,u&&w.setAttribute("nonce",u),document.head.appendChild(w),p)return new Promise((R,x)=>{w.addEventListener("load",R),w.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${h}`)))})}))}function i(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return s.then(a=>{for(const l of a||[])l.status==="rejected"&&i(l.reason);return e().catch(i)})};var Rl={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hc=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Yh=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Wc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,p=i>>2,y=(i&3)<<4|l>>4;let _=(l&15)<<2|h>>6,w=h&63;u||(w=64,a||(_=64)),r.push(t[p],t[y],t[_],t[w])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Hc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Yh(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const y=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||h==null||y==null)throw new Jh;const _=i<<2|l>>4;if(r.push(_),h!==64){const w=l<<4&240|h>>2;if(r.push(w),y!==64){const R=h<<6&192|y;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Jh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Xh=function(n){const e=Hc(n);return Wc.encodeByteArray(e,!0)},Ps=function(n){return Xh(n).replace(/\./g,"")},Kc=function(n){try{return Wc.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ef=()=>Zh().__FIREBASE_DEFAULTS__,tf=()=>{if(typeof process>"u"||typeof Rl>"u")return;const n=Rl.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},nf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Kc(n[1]);return e&&JSON.parse(e)},Ks=()=>{try{return ef()||tf()||nf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Gc=n=>{var e,t;return(t=(e=Ks())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},rf=n=>{const e=Gc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Qc=()=>{var n;return(n=Ks())===null||n===void 0?void 0:n.config},Yc=n=>{var e;return(e=Ks())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function of(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Ps(JSON.stringify(t)),Ps(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function af(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ce())}function lf(){var n;const e=(n=Ks())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function cf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function uf(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function df(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function hf(){const n=Ce();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ff(){return!lf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function pf(){try{return typeof indexedDB=="object"}catch{return!1}}function mf(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gf="FirebaseError";class gt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=gf,Object.setPrototypeOf(this,gt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Sr.prototype.create)}}class Sr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?yf(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new gt(s,l,r)}}function yf(n,e){return n.replace(vf,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const vf=/\{\$([^}]+)}/g;function _f(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function An(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Sl(i)&&Sl(a)){if(!An(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Sl(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function lr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function cr(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function wf(n,e){const t=new Ef(n,e);return t.subscribe.bind(t)}class Ef{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");If(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Bi),s.error===void 0&&(s.error=Bi),s.complete===void 0&&(s.complete=Bi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function If(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Bi(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(n){return n&&n._delegate?n._delegate:n}class Xt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new sf;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Af(e))try{this.getOrInitializeService({instanceIdentifier:Gt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Gt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Gt){return this.instances.has(e)}getOptions(e=Gt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:bf(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Gt){return this.component?this.component.multipleInstances?e:Gt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function bf(n){return n===Gt?void 0:n}function Af(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Tf(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var G;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(G||(G={}));const Sf={debug:G.DEBUG,verbose:G.VERBOSE,info:G.INFO,warn:G.WARN,error:G.ERROR,silent:G.SILENT},Pf=G.INFO,Cf={[G.DEBUG]:"log",[G.VERBOSE]:"log",[G.INFO]:"info",[G.WARN]:"warn",[G.ERROR]:"error"},kf=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Cf[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ko{constructor(e){this.name=e,this._logLevel=Pf,this._logHandler=kf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in G))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Sf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,G.DEBUG,...e),this._logHandler(this,G.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,G.VERBOSE,...e),this._logHandler(this,G.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,G.INFO,...e),this._logHandler(this,G.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,G.WARN,...e),this._logHandler(this,G.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,G.ERROR,...e),this._logHandler(this,G.ERROR,...e)}}const xf=(n,e)=>e.some(t=>n instanceof t);let Pl,Cl;function Df(){return Pl||(Pl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Vf(){return Cl||(Cl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Jc=new WeakMap,Xi=new WeakMap,Xc=new WeakMap,$i=new WeakMap,xo=new WeakMap;function Nf(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(kt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Jc.set(t,n)}).catch(()=>{}),xo.set(e,n),e}function Lf(n){if(Xi.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Xi.set(n,e)}let Zi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Xi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Xc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return kt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Of(n){Zi=n(Zi)}function Mf(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(qi(this),e,...t);return Xc.set(r,e.sort?e.sort():[e]),kt(r)}:Vf().includes(n)?function(...e){return n.apply(qi(this),e),kt(Jc.get(this))}:function(...e){return kt(n.apply(qi(this),e))}}function Uf(n){return typeof n=="function"?Mf(n):(n instanceof IDBTransaction&&Lf(n),xf(n,Df())?new Proxy(n,Zi):n)}function kt(n){if(n instanceof IDBRequest)return Nf(n);if($i.has(n))return $i.get(n);const e=Uf(n);return e!==n&&($i.set(n,e),xo.set(e,n)),e}const qi=n=>xo.get(n);function Ff(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=kt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(kt(a.result),u.oldVersion,u.newVersion,kt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const Bf=["get","getKey","getAll","getAllKeys","count"],$f=["put","add","delete","clear"],ji=new Map;function kl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ji.get(e))return ji.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=$f.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Bf.includes(t)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),s&&u.done]))[0]};return ji.set(e,i),i}Of(n=>({...n,get:(e,t,r)=>kl(e,t)||n.get(e,t,r),has:(e,t)=>!!kl(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(jf(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function jf(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const eo="@firebase/app",xl="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=new ko("@firebase/app"),zf="@firebase/app-compat",Hf="@firebase/analytics-compat",Wf="@firebase/analytics",Kf="@firebase/app-check-compat",Gf="@firebase/app-check",Qf="@firebase/auth",Yf="@firebase/auth-compat",Jf="@firebase/database",Xf="@firebase/data-connect",Zf="@firebase/database-compat",ep="@firebase/functions",tp="@firebase/functions-compat",np="@firebase/installations",rp="@firebase/installations-compat",sp="@firebase/messaging",ip="@firebase/messaging-compat",op="@firebase/performance",ap="@firebase/performance-compat",lp="@firebase/remote-config",cp="@firebase/remote-config-compat",up="@firebase/storage",dp="@firebase/storage-compat",hp="@firebase/firestore",fp="@firebase/vertexai-preview",pp="@firebase/firestore-compat",mp="firebase",gp="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to="[DEFAULT]",yp={[eo]:"fire-core",[zf]:"fire-core-compat",[Wf]:"fire-analytics",[Hf]:"fire-analytics-compat",[Gf]:"fire-app-check",[Kf]:"fire-app-check-compat",[Qf]:"fire-auth",[Yf]:"fire-auth-compat",[Jf]:"fire-rtdb",[Xf]:"fire-data-connect",[Zf]:"fire-rtdb-compat",[ep]:"fire-fn",[tp]:"fire-fn-compat",[np]:"fire-iid",[rp]:"fire-iid-compat",[sp]:"fire-fcm",[ip]:"fire-fcm-compat",[op]:"fire-perf",[ap]:"fire-perf-compat",[lp]:"fire-rc",[cp]:"fire-rc-compat",[up]:"fire-gcs",[dp]:"fire-gcs-compat",[hp]:"fire-fst",[pp]:"fire-fst-compat",[fp]:"fire-vertex","fire-js":"fire-js",[mp]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs=new Map,vp=new Map,no=new Map;function Dl(n,e){try{n.container.addComponent(e)}catch(t){ht.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Rn(n){const e=n.name;if(no.has(e))return ht.debug(`There were multiple attempts to register component ${e}.`),!1;no.set(e,n);for(const t of Cs.values())Dl(t,n);for(const t of vp.values())Dl(t,n);return!0}function Do(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ge(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _p={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},xt=new Sr("app","Firebase",_p);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wp{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Xt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw xt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Un=gp;function Zc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:to,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw xt.create("bad-app-name",{appName:String(s)});if(t||(t=Qc()),!t)throw xt.create("no-options");const i=Cs.get(s);if(i){if(An(t,i.options)&&An(r,i.config))return i;throw xt.create("duplicate-app",{appName:s})}const a=new Rf(s);for(const u of no.values())a.addComponent(u);const l=new wp(t,r,a);return Cs.set(s,l),l}function eu(n=to){const e=Cs.get(n);if(!e&&n===to&&Qc())return Zc();if(!e)throw xt.create("no-app",{appName:n});return e}function Dt(n,e,t){var r;let s=(r=yp[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ht.warn(l.join(" "));return}Rn(new Xt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep="firebase-heartbeat-database",Ip=1,wr="firebase-heartbeat-store";let zi=null;function tu(){return zi||(zi=Ff(Ep,Ip,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(wr)}catch(t){console.warn(t)}}}}).catch(n=>{throw xt.create("idb-open",{originalErrorMessage:n.message})})),zi}async function Tp(n){try{const t=(await tu()).transaction(wr),r=await t.objectStore(wr).get(nu(n));return await t.done,r}catch(e){if(e instanceof gt)ht.warn(e.message);else{const t=xt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ht.warn(t.message)}}}async function Vl(n,e){try{const r=(await tu()).transaction(wr,"readwrite");await r.objectStore(wr).put(e,nu(n)),await r.done}catch(t){if(t instanceof gt)ht.warn(t.message);else{const r=xt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ht.warn(r.message)}}}function nu(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp=1024,Ap=30*24*60*60*1e3;class Rp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Pp(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Nl();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=Ap}),this._storage.overwrite(this._heartbeatsCache))}catch(r){ht.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Nl(),{heartbeatsToSend:r,unsentEntries:s}=Sp(this._heartbeatsCache.heartbeats),i=Ps(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return ht.warn(t),""}}}function Nl(){return new Date().toISOString().substring(0,10)}function Sp(n,e=bp){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Ll(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Ll(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Pp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return pf()?mf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Tp(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Vl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Vl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ll(n){return Ps(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cp(n){Rn(new Xt("platform-logger",e=>new qf(e),"PRIVATE")),Rn(new Xt("heartbeat",e=>new Rp(e),"PRIVATE")),Dt(eo,xl,n),Dt(eo,xl,"esm2017"),Dt("fire-js","")}Cp("");function Vo(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function ru(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const kp=ru,su=new Sr("auth","Firebase",ru());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks=new ko("@firebase/auth");function xp(n,...e){ks.logLevel<=G.WARN&&ks.warn(`Auth (${Un}): ${n}`,...e)}function gs(n,...e){ks.logLevel<=G.ERROR&&ks.error(`Auth (${Un}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(n,...e){throw No(n,...e)}function Ye(n,...e){return No(n,...e)}function iu(n,e,t){const r=Object.assign(Object.assign({},kp()),{[e]:t});return new Sr("auth","Firebase",r).create(e,{appName:n.name})}function lt(n){return iu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function No(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return su.create(n,...e)}function O(n,e,...t){if(!n)throw No(e,...t)}function it(n){const e="INTERNAL ASSERTION FAILED: "+n;throw gs(e),new Error(e)}function ft(n,e){n||it(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ro(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Dp(){return Ol()==="http:"||Ol()==="https:"}function Ol(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Dp()||uf()||"connection"in navigator)?navigator.onLine:!0}function Np(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e,t){this.shortDelay=e,this.longDelay=t,ft(t>e,"Short delay should be less than long delay!"),this.isMobile=af()||df()}get(){return Vp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(n,e){ft(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;it("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;it("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;it("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Op=new Cr(3e4,6e4);function Ut(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function yt(n,e,t,r,s={}){return au(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=Pr(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:u},i);return cf()||(h.referrerPolicy="no-referrer"),ou.fetch()(lu(n,n.config.apiHost,t,l),h)})}async function au(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Lp),e);try{const s=new Up(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw ls(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ls(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw ls(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw ls(n,"user-disabled",a);const p=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw iu(n,p,h);ze(n,p)}}catch(s){if(s instanceof gt)throw s;ze(n,"network-request-failed",{message:String(s)})}}async function kr(n,e,t,r,s={}){const i=await yt(n,e,t,r,s);return"mfaPendingCredential"in i&&ze(n,"multi-factor-auth-required",{_serverResponse:i}),i}function lu(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?Lo(n.config,s):`${n.config.apiScheme}://${s}`}function Mp(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Up{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ye(this.auth,"network-request-failed")),Op.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ls(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ye(n,e,r);return s.customData._tokenResponse=t,s}function Ml(n){return n!==void 0&&n.enterprise!==void 0}class Fp{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Mp(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function Bp(n,e){return yt(n,"GET","/v2/recaptchaConfig",Ut(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $p(n,e){return yt(n,"POST","/v1/accounts:delete",e)}async function cu(n,e){return yt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function qp(n,e=!1){const t=se(n),r=await t.getIdToken(e),s=Oo(r);O(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:mr(Hi(s.auth_time)),issuedAtTime:mr(Hi(s.iat)),expirationTime:mr(Hi(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Hi(n){return Number(n)*1e3}function Oo(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return gs("JWT malformed, contained fewer than 3 sections"),null;try{const s=Kc(t);return s?JSON.parse(s):(gs("Failed to decode base64 JWT payload"),null)}catch(s){return gs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Ul(n){const e=Oo(n);return O(e,"internal-error"),O(typeof e.exp<"u","internal-error"),O(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof gt&&jp(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function jp({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=mr(this.lastLoginAt),this.creationTime=mr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xs(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Sn(n,cu(t,{idToken:r}));O(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?uu(i.providerUserInfo):[],l=Wp(n.providerData,a),u=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!(l!=null&&l.length),p=u?h:!1,y={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new so(i.createdAt,i.lastLoginAt),isAnonymous:p};Object.assign(n,y)}async function Hp(n){const e=se(n);await xs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Wp(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function uu(n){return n.map(e=>{var{providerId:t}=e,r=Vo(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kp(n,e){const t=await au(n,{},async()=>{const r=Pr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=lu(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",ou.fetch()(a,{method:"POST",headers:l,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Gp(n,e){return yt(n,"POST","/v2/accounts:revokeToken",Ut(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){O(e.idToken,"internal-error"),O(typeof e.idToken<"u","internal-error"),O(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ul(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){O(e.length!==0,"internal-error");const t=Ul(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(O(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Kp(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new En;return r&&(O(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(O(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(O(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new En,this.toJSON())}_performRefresh(){return it("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(n,e){O(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ot{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Vo(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new zp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new so(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Sn(this,this.stsTokenManager.getToken(this.auth,e));return O(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return qp(this,e)}reload(){return Hp(this)}_assign(e){this!==e&&(O(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ot(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){O(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await xs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ge(this.auth.app))return Promise.reject(lt(this.auth));const e=await this.getIdToken();return await Sn(this,$p(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,l,u,h,p;const y=(r=t.displayName)!==null&&r!==void 0?r:void 0,_=(s=t.email)!==null&&s!==void 0?s:void 0,w=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,R=(a=t.photoURL)!==null&&a!==void 0?a:void 0,x=(l=t.tenantId)!==null&&l!==void 0?l:void 0,k=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,B=(h=t.createdAt)!==null&&h!==void 0?h:void 0,j=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:U,emailVerified:Y,isAnonymous:z,providerData:W,stsTokenManager:E}=t;O(U&&E,e,"internal-error");const m=En.fromJSON(this.name,E);O(typeof U=="string",e,"internal-error"),Tt(y,e.name),Tt(_,e.name),O(typeof Y=="boolean",e,"internal-error"),O(typeof z=="boolean",e,"internal-error"),Tt(w,e.name),Tt(R,e.name),Tt(x,e.name),Tt(k,e.name),Tt(B,e.name),Tt(j,e.name);const g=new ot({uid:U,auth:e,email:_,emailVerified:Y,displayName:y,isAnonymous:z,photoURL:R,phoneNumber:w,tenantId:x,stsTokenManager:m,createdAt:B,lastLoginAt:j});return W&&Array.isArray(W)&&(g.providerData=W.map(I=>Object.assign({},I))),k&&(g._redirectEventId=k),g}static async _fromIdTokenResponse(e,t,r=!1){const s=new En;s.updateFromServerResponse(t);const i=new ot({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await xs(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];O(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?uu(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new En;l.updateFromIdToken(r);const u=new ot({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new so(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl=new Map;function at(n){ft(n instanceof Function,"Expected a class definition");let e=Fl.get(n);return e?(ft(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Fl.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}du.type="NONE";const Bl=du;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ys(n,e,t){return`firebase:${n}:${e}:${t}`}class In{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ys(this.userKey,s.apiKey,i),this.fullPersistenceKey=ys("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?ot._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new In(at(Bl),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||at(Bl);const a=ys(r,e.config.apiKey,e.name);let l=null;for(const h of t)try{const p=await h._get(a);if(p){const y=ot._fromJSON(e,p);h!==i&&(l=y),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new In(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new In(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $l(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(mu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(hu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(yu(e))return"Blackberry";if(vu(e))return"Webos";if(fu(e))return"Safari";if((e.includes("chrome/")||pu(e))&&!e.includes("edge/"))return"Chrome";if(gu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function hu(n=Ce()){return/firefox\//i.test(n)}function fu(n=Ce()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function pu(n=Ce()){return/crios\//i.test(n)}function mu(n=Ce()){return/iemobile/i.test(n)}function gu(n=Ce()){return/android/i.test(n)}function yu(n=Ce()){return/blackberry/i.test(n)}function vu(n=Ce()){return/webos/i.test(n)}function Mo(n=Ce()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Qp(n=Ce()){var e;return Mo(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Yp(){return hf()&&document.documentMode===10}function _u(n=Ce()){return Mo(n)||gu(n)||vu(n)||yu(n)||/windows phone/i.test(n)||mu(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wu(n,e=[]){let t;switch(n){case"Browser":t=$l(Ce());break;case"Worker":t=`${$l(Ce())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Un}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jp{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xp(n,e={}){return yt(n,"GET","/v2/passwordPolicy",Ut(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zp=6;class em{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Zp,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ql(this),this.idTokenSubscription=new ql(this),this.beforeStateQueue=new Jp(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=su,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=at(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await In.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await cu(this,{idToken:e}),r=await ot._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ge(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return O(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await xs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Np()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ge(this.app))return Promise.reject(lt(this));const t=e?se(e):null;return t&&O(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&O(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ge(this.app)?Promise.reject(lt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ge(this.app)?Promise.reject(lt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(at(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Xp(this),t=new em(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Sr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Gp(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&at(e)||this._popupRedirectResolver;O(t,this,"argument-error"),this.redirectPersistenceManager=await In.create(this,[at(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(O(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return O(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=wu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&xp(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function on(n){return se(n)}class ql{constructor(e){this.auth=e,this.observer=null,this.addObserver=wf(t=>this.observer=t)}get next(){return O(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function nm(n){Gs=n}function Eu(n){return Gs.loadJS(n)}function rm(){return Gs.recaptchaEnterpriseScript}function sm(){return Gs.gapiScript}function im(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const om="recaptcha-enterprise",am="NO_RECAPTCHA";class lm{constructor(e){this.type=om,this.auth=on(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,l)=>{Bp(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new Fp(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,a(h.siteKey)}}).catch(u=>{l(u)})})}function s(i,a,l){const u=window.grecaptcha;Ml(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{a(h)}).catch(()=>{a(am)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,a)=>{r(this.auth).then(l=>{if(!t&&Ml(window.grecaptcha))s(l,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=rm();u.length!==0&&(u+=l),Eu(u).then(()=>{s(l,i,a)}).catch(h=>{a(h)})}}).catch(l=>{a(l)})})}}async function jl(n,e,t,r=!1){const s=new lm(n);let i;try{i=await s.verify(t)}catch{i=await s.verify(t,!0)}const a=Object.assign({},e);return r?Object.assign(a,{captchaResp:i}):Object.assign(a,{captchaResponse:i}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function io(n,e,t,r){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await jl(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await jl(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cm(n,e){const t=Do(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(An(i,e??{}))return s;ze(s,"already-initialized")}return t.initialize({options:e})}function um(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(at);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function dm(n,e,t){const r=on(n);O(r._canInitEmulator,r,"emulator-config-failed"),O(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Iu(e),{host:a,port:l}=hm(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${a}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),fm()}function Iu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function hm(n){const e=Iu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:zl(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:zl(a)}}}function zl(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function fm(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return it("not implemented")}_getIdTokenResponse(e){return it("not implemented")}_linkToIdToken(e,t){return it("not implemented")}_getReauthenticationResolver(e){return it("not implemented")}}async function pm(n,e){return yt(n,"POST","/v1/accounts:update",e)}async function mm(n,e){return yt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gm(n,e){return kr(n,"POST","/v1/accounts:signInWithPassword",Ut(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ym(n,e){return kr(n,"POST","/v1/accounts:signInWithEmailLink",Ut(n,e))}async function vm(n,e){return kr(n,"POST","/v1/accounts:signInWithEmailLink",Ut(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er extends Uo{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Er(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Er(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return io(e,t,"signInWithPassword",gm);case"emailLink":return ym(e,{email:this._email,oobCode:this._password});default:ze(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return io(e,r,"signUpPassword",mm);case"emailLink":return vm(e,{idToken:t,email:this._email,oobCode:this._password});default:ze(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tn(n,e){return kr(n,"POST","/v1/accounts:signInWithIdp",Ut(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _m="http://localhost";class Zt extends Uo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Zt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ze("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Vo(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new Zt(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Tn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Tn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Tn(e,t)}buildRequest(){const e={requestUri:_m,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Pr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wm(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Em(n){const e=lr(cr(n)).link,t=e?lr(cr(e)).deep_link_id:null,r=lr(cr(n)).deep_link_id;return(r?lr(cr(r)).link:null)||r||t||e||n}class Fo{constructor(e){var t,r,s,i,a,l;const u=lr(cr(e)),h=(t=u.apiKey)!==null&&t!==void 0?t:null,p=(r=u.oobCode)!==null&&r!==void 0?r:null,y=wm((s=u.mode)!==null&&s!==void 0?s:null);O(h&&p&&y,"argument-error"),this.apiKey=h,this.operation=y,this.code=p,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(a=u.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const t=Em(e);try{return new Fo(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(){this.providerId=Ft.PROVIDER_ID}static credential(e,t){return Er._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Fo.parseLink(t);return O(r,"argument-error"),Er._fromEmailAndCode(e,r.code,r.tenantId)}}Ft.PROVIDER_ID="password";Ft.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ft.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr extends Tu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt extends xr{constructor(){super("facebook.com")}static credential(e){return Zt._fromParams({providerId:bt.PROVIDER_ID,signInMethod:bt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return bt.credentialFromTaggedObject(e)}static credentialFromError(e){return bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return bt.credential(e.oauthAccessToken)}catch{return null}}}bt.FACEBOOK_SIGN_IN_METHOD="facebook.com";bt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At extends xr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Zt._fromParams({providerId:At.PROVIDER_ID,signInMethod:At.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return At.credentialFromTaggedObject(e)}static credentialFromError(e){return At.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return At.credential(t,r)}catch{return null}}}At.GOOGLE_SIGN_IN_METHOD="google.com";At.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends xr{constructor(){super("github.com")}static credential(e){return Zt._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Rt.credential(e.oauthAccessToken)}catch{return null}}}Rt.GITHUB_SIGN_IN_METHOD="github.com";Rt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends xr{constructor(){super("twitter.com")}static credential(e,t){return Zt._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return St.credential(t,r)}catch{return null}}}St.TWITTER_SIGN_IN_METHOD="twitter.com";St.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Im(n,e){return kr(n,"POST","/v1/accounts:signUp",Ut(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await ot._fromIdTokenResponse(e,r,s),a=Hl(r);return new en({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Hl(r);return new en({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Hl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds extends gt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ds.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Ds(e,t,r,s)}}function bu(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ds._fromErrorAndOperation(n,i,e,r):i})}async function Tm(n,e,t=!1){const r=await Sn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return en._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Au(n,e,t=!1){const{auth:r}=n;if(Ge(r.app))return Promise.reject(lt(r));const s="reauthenticate";try{const i=await Sn(n,bu(r,s,e,n),t);O(i.idToken,r,"internal-error");const a=Oo(i.idToken);O(a,r,"internal-error");const{sub:l}=a;return O(n.uid===l,r,"user-mismatch"),en._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&ze(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ru(n,e,t=!1){if(Ge(n.app))return Promise.reject(lt(n));const r="signIn",s=await bu(n,r,e),i=await en._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function bm(n,e){return Ru(on(n),e)}async function Su(n,e){return Au(se(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pu(n){const e=on(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Am(n,e,t){if(Ge(n.app))return Promise.reject(lt(n));const r=on(n),a=await io(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Im).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Pu(n),u}),l=await en._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(l.user),l}function Rm(n,e,t){return Ge(n.app)?Promise.reject(lt(n)):bm(se(n),Ft.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Pu(n),r})}function Sm(n,e){return Pm(se(n),null,e)}async function Pm(n,e,t){const{auth:r}=n,i={idToken:await n.getIdToken(),returnSecureToken:!0};t&&(i.password=t);const a=await Sn(n,pm(r,i));await n._updateTokensIfNecessary(a,!0)}function Cm(n,e,t,r){return se(n).onIdTokenChanged(e,t,r)}function km(n,e,t){return se(n).beforeAuthStateChanged(e,t)}function xm(n,e,t,r){return se(n).onAuthStateChanged(e,t,r)}function Dm(n){return se(n).signOut()}async function Vm(n){return se(n).delete()}const Vs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Vs,"1"),this.storage.removeItem(Vs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nm=1e3,Lm=10;class ku extends Cu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=_u(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);Yp()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Lm):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Nm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ku.type="LOCAL";const Om=ku;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu extends Cu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}xu.type="SESSION";const Du=xu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mm(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Qs(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async h=>h(t.origin,i)),u=await Mm(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Qs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const h=Bo("",20);s.port1.start();const p=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(y){const _=y;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(_.data.response);break;default:clearTimeout(p),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(){return window}function Fm(n){Je().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vu(){return typeof Je().WorkerGlobalScope<"u"&&typeof Je().importScripts=="function"}async function Bm(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $m(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function qm(){return Vu()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nu="firebaseLocalStorageDb",jm=1,Ns="firebaseLocalStorage",Lu="fbase_key";class Dr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ys(n,e){return n.transaction([Ns],e?"readwrite":"readonly").objectStore(Ns)}function zm(){const n=indexedDB.deleteDatabase(Nu);return new Dr(n).toPromise()}function oo(){const n=indexedDB.open(Nu,jm);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ns,{keyPath:Lu})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ns)?e(r):(r.close(),await zm(),e(await oo()))})})}async function Wl(n,e,t){const r=Ys(n,!0).put({[Lu]:e,value:t});return new Dr(r).toPromise()}async function Hm(n,e){const t=Ys(n,!1).get(e),r=await new Dr(t).toPromise();return r===void 0?null:r.value}function Kl(n,e){const t=Ys(n,!0).delete(e);return new Dr(t).toPromise()}const Wm=800,Km=3;class Ou{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await oo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Km)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Vu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Qs._getInstance(qm()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Bm(),!this.activeServiceWorker)return;this.sender=new Um(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$m()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await oo();return await Wl(e,Vs,"1"),await Kl(e,Vs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Wl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Hm(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Kl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ys(s,!1).getAll();return new Dr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Wm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ou.type="LOCAL";const Gm=Ou;new Cr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qm(n,e){return e?at(e):(O(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o extends Uo{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Tn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Tn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Tn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Ym(n){return Ru(n.auth,new $o(n),n.bypassAuthState)}function Jm(n){const{auth:e,user:t}=n;return O(t,e,"internal-error"),Au(t,new $o(n),n.bypassAuthState)}async function Xm(n){const{auth:e,user:t}=n;return O(t,e,"internal-error"),Tm(t,new $o(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ym;case"linkViaPopup":case"linkViaRedirect":return Xm;case"reauthViaPopup":case"reauthViaRedirect":return Jm;default:ze(this.auth,"internal-error")}}resolve(e){ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm=new Cr(2e3,1e4);class _n extends Mu{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,_n.currentPopupAction&&_n.currentPopupAction.cancel(),_n.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return O(e,this.auth,"internal-error"),e}async onExecution(){ft(this.filter.length===1,"Popup operations only handle one event");const e=Bo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ye(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ye(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,_n.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ye(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Zm.get())};e()}}_n.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eg="pendingRedirect",vs=new Map;class tg extends Mu{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=vs.get(this.auth._key());if(!e){try{const r=await ng(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}vs.set(this.auth._key(),e)}return this.bypassAuthState||vs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ng(n,e){const t=ig(e),r=sg(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function rg(n,e){vs.set(n._key(),e)}function sg(n){return at(n._redirectPersistence)}function ig(n){return ys(eg,n.config.apiKey,n.name)}async function og(n,e,t=!1){if(Ge(n.app))return Promise.reject(lt(n));const r=on(n),s=Qm(r,e),a=await new tg(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ag=10*60*1e3;class lg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cg(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Uu(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ye(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ag&&this.cachedEventUids.clear(),this.cachedEventUids.has(Gl(e))}saveEventToCache(e){this.cachedEventUids.add(Gl(e)),this.lastProcessedEventTime=Date.now()}}function Gl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Uu({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function cg(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Uu(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ug(n,e={}){return yt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,hg=/^https?/;async function fg(n){if(n.config.emulator)return;const{authorizedDomains:e}=await ug(n);for(const t of e)try{if(pg(t))return}catch{}ze(n,"unauthorized-domain")}function pg(n){const e=ro(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!hg.test(t))return!1;if(dg.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mg=new Cr(3e4,6e4);function Ql(){const n=Je().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function gg(n){return new Promise((e,t)=>{var r,s,i;function a(){Ql(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ql(),t(Ye(n,"network-request-failed"))},timeout:mg.get()})}if(!((s=(r=Je().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Je().gapi)===null||i===void 0)&&i.load)a();else{const l=im("iframefcb");return Je()[l]=()=>{gapi.load?a():t(Ye(n,"network-request-failed"))},Eu(`${sm()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw _s=null,e})}let _s=null;function yg(n){return _s=_s||gg(n),_s}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vg=new Cr(5e3,15e3),_g="__/auth/iframe",wg="emulator/auth/iframe",Eg={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ig=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Tg(n){const e=n.config;O(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Lo(e,wg):`https://${n.config.authDomain}/${_g}`,r={apiKey:e.apiKey,appName:n.name,v:Un},s=Ig.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Pr(r).slice(1)}`}async function bg(n){const e=await yg(n),t=Je().gapi;return O(t,n,"internal-error"),e.open({where:document.body,url:Tg(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Eg,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Ye(n,"network-request-failed"),l=Je().setTimeout(()=>{i(a)},vg.get());function u(){Je().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Rg=500,Sg=600,Pg="_blank",Cg="http://localhost";class Yl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function kg(n,e,t,r=Rg,s=Sg){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},Ag),{width:r.toString(),height:s.toString(),top:i,left:a}),h=Ce().toLowerCase();t&&(l=pu(h)?Pg:t),hu(h)&&(e=e||Cg,u.scrollbars="yes");const p=Object.entries(u).reduce((_,[w,R])=>`${_}${w}=${R},`,"");if(Qp(h)&&l!=="_self")return xg(e||"",l),new Yl(null);const y=window.open(e||"",l,p);O(y,n,"popup-blocked");try{y.focus()}catch{}return new Yl(y)}function xg(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dg="__/auth/handler",Vg="emulator/auth/handler",Ng=encodeURIComponent("fac");async function Jl(n,e,t,r,s,i){O(n.config.authDomain,n,"auth-domain-config-required"),O(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Un,eventId:s};if(e instanceof Tu){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",_f(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,y]of Object.entries({}))a[p]=y}if(e instanceof xr){const p=e.getScopes().filter(y=>y!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const u=await n._getAppCheckToken(),h=u?`#${Ng}=${encodeURIComponent(u)}`:"";return`${Lg(n)}?${Pr(l).slice(1)}${h}`}function Lg({config:n}){return n.emulator?Lo(n,Vg):`https://${n.authDomain}/${Dg}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wi="webStorageSupport";class Og{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Du,this._completeRedirectFn=og,this._overrideRedirectResult=rg}async _openPopup(e,t,r,s){var i;ft((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await Jl(e,t,r,ro(),s);return kg(e,a,Bo())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Jl(e,t,r,ro(),s);return Fm(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(ft(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await bg(e),r=new lg(e);return t.register("authEvent",s=>(O(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Wi,{type:Wi},s=>{var i;const a=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Wi];a!==void 0&&t(!!a),ze(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=fg(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return _u()||fu()||Mo()}}const Mg=Og;var Xl="@firebase/auth",Zl="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){O(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fg(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Bg(n){Rn(new Xt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;O(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:wu(n)},h=new tm(r,s,i,u);return um(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Rn(new Xt("auth-internal",e=>{const t=on(e.getProvider("auth").getImmediate());return(r=>new Ug(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Dt(Xl,Zl,Fg(n)),Dt(Xl,Zl,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $g=5*60,qg=Yc("authIdTokenMaxAge")||$g;let ec=null;const jg=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>qg)return;const s=t==null?void 0:t.token;ec!==s&&(ec=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function zg(n=eu()){const e=Do(n,"auth");if(e.isInitialized())return e.getImmediate();const t=cm(n,{popupRedirectResolver:Mg,persistence:[Gm,Om,Du]}),r=Yc("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=jg(i.toString());km(t,a,()=>a(t.currentUser)),Cm(t,l=>a(l))}}const s=Gc("auth");return s&&dm(t,`http://${s}`),t}function Hg(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}nm({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Ye("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",Hg().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Bg("Browser");var Wg="firebase",Kg="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Dt(Wg,Kg,"app");var tc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yt,Fu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,m){function g(){}g.prototype=m.prototype,E.D=m.prototype,E.prototype=new g,E.prototype.constructor=E,E.C=function(I,T,b){for(var v=Array(arguments.length-2),we=2;we<arguments.length;we++)v[we-2]=arguments[we];return m.prototype[T].apply(I,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,m,g){g||(g=0);var I=Array(16);if(typeof m=="string")for(var T=0;16>T;++T)I[T]=m.charCodeAt(g++)|m.charCodeAt(g++)<<8|m.charCodeAt(g++)<<16|m.charCodeAt(g++)<<24;else for(T=0;16>T;++T)I[T]=m[g++]|m[g++]<<8|m[g++]<<16|m[g++]<<24;m=E.g[0],g=E.g[1],T=E.g[2];var b=E.g[3],v=m+(b^g&(T^b))+I[0]+3614090360&4294967295;m=g+(v<<7&4294967295|v>>>25),v=b+(T^m&(g^T))+I[1]+3905402710&4294967295,b=m+(v<<12&4294967295|v>>>20),v=T+(g^b&(m^g))+I[2]+606105819&4294967295,T=b+(v<<17&4294967295|v>>>15),v=g+(m^T&(b^m))+I[3]+3250441966&4294967295,g=T+(v<<22&4294967295|v>>>10),v=m+(b^g&(T^b))+I[4]+4118548399&4294967295,m=g+(v<<7&4294967295|v>>>25),v=b+(T^m&(g^T))+I[5]+1200080426&4294967295,b=m+(v<<12&4294967295|v>>>20),v=T+(g^b&(m^g))+I[6]+2821735955&4294967295,T=b+(v<<17&4294967295|v>>>15),v=g+(m^T&(b^m))+I[7]+4249261313&4294967295,g=T+(v<<22&4294967295|v>>>10),v=m+(b^g&(T^b))+I[8]+1770035416&4294967295,m=g+(v<<7&4294967295|v>>>25),v=b+(T^m&(g^T))+I[9]+2336552879&4294967295,b=m+(v<<12&4294967295|v>>>20),v=T+(g^b&(m^g))+I[10]+4294925233&4294967295,T=b+(v<<17&4294967295|v>>>15),v=g+(m^T&(b^m))+I[11]+2304563134&4294967295,g=T+(v<<22&4294967295|v>>>10),v=m+(b^g&(T^b))+I[12]+1804603682&4294967295,m=g+(v<<7&4294967295|v>>>25),v=b+(T^m&(g^T))+I[13]+4254626195&4294967295,b=m+(v<<12&4294967295|v>>>20),v=T+(g^b&(m^g))+I[14]+2792965006&4294967295,T=b+(v<<17&4294967295|v>>>15),v=g+(m^T&(b^m))+I[15]+1236535329&4294967295,g=T+(v<<22&4294967295|v>>>10),v=m+(T^b&(g^T))+I[1]+4129170786&4294967295,m=g+(v<<5&4294967295|v>>>27),v=b+(g^T&(m^g))+I[6]+3225465664&4294967295,b=m+(v<<9&4294967295|v>>>23),v=T+(m^g&(b^m))+I[11]+643717713&4294967295,T=b+(v<<14&4294967295|v>>>18),v=g+(b^m&(T^b))+I[0]+3921069994&4294967295,g=T+(v<<20&4294967295|v>>>12),v=m+(T^b&(g^T))+I[5]+3593408605&4294967295,m=g+(v<<5&4294967295|v>>>27),v=b+(g^T&(m^g))+I[10]+38016083&4294967295,b=m+(v<<9&4294967295|v>>>23),v=T+(m^g&(b^m))+I[15]+3634488961&4294967295,T=b+(v<<14&4294967295|v>>>18),v=g+(b^m&(T^b))+I[4]+3889429448&4294967295,g=T+(v<<20&4294967295|v>>>12),v=m+(T^b&(g^T))+I[9]+568446438&4294967295,m=g+(v<<5&4294967295|v>>>27),v=b+(g^T&(m^g))+I[14]+3275163606&4294967295,b=m+(v<<9&4294967295|v>>>23),v=T+(m^g&(b^m))+I[3]+4107603335&4294967295,T=b+(v<<14&4294967295|v>>>18),v=g+(b^m&(T^b))+I[8]+1163531501&4294967295,g=T+(v<<20&4294967295|v>>>12),v=m+(T^b&(g^T))+I[13]+2850285829&4294967295,m=g+(v<<5&4294967295|v>>>27),v=b+(g^T&(m^g))+I[2]+4243563512&4294967295,b=m+(v<<9&4294967295|v>>>23),v=T+(m^g&(b^m))+I[7]+1735328473&4294967295,T=b+(v<<14&4294967295|v>>>18),v=g+(b^m&(T^b))+I[12]+2368359562&4294967295,g=T+(v<<20&4294967295|v>>>12),v=m+(g^T^b)+I[5]+4294588738&4294967295,m=g+(v<<4&4294967295|v>>>28),v=b+(m^g^T)+I[8]+2272392833&4294967295,b=m+(v<<11&4294967295|v>>>21),v=T+(b^m^g)+I[11]+1839030562&4294967295,T=b+(v<<16&4294967295|v>>>16),v=g+(T^b^m)+I[14]+4259657740&4294967295,g=T+(v<<23&4294967295|v>>>9),v=m+(g^T^b)+I[1]+2763975236&4294967295,m=g+(v<<4&4294967295|v>>>28),v=b+(m^g^T)+I[4]+1272893353&4294967295,b=m+(v<<11&4294967295|v>>>21),v=T+(b^m^g)+I[7]+4139469664&4294967295,T=b+(v<<16&4294967295|v>>>16),v=g+(T^b^m)+I[10]+3200236656&4294967295,g=T+(v<<23&4294967295|v>>>9),v=m+(g^T^b)+I[13]+681279174&4294967295,m=g+(v<<4&4294967295|v>>>28),v=b+(m^g^T)+I[0]+3936430074&4294967295,b=m+(v<<11&4294967295|v>>>21),v=T+(b^m^g)+I[3]+3572445317&4294967295,T=b+(v<<16&4294967295|v>>>16),v=g+(T^b^m)+I[6]+76029189&4294967295,g=T+(v<<23&4294967295|v>>>9),v=m+(g^T^b)+I[9]+3654602809&4294967295,m=g+(v<<4&4294967295|v>>>28),v=b+(m^g^T)+I[12]+3873151461&4294967295,b=m+(v<<11&4294967295|v>>>21),v=T+(b^m^g)+I[15]+530742520&4294967295,T=b+(v<<16&4294967295|v>>>16),v=g+(T^b^m)+I[2]+3299628645&4294967295,g=T+(v<<23&4294967295|v>>>9),v=m+(T^(g|~b))+I[0]+4096336452&4294967295,m=g+(v<<6&4294967295|v>>>26),v=b+(g^(m|~T))+I[7]+1126891415&4294967295,b=m+(v<<10&4294967295|v>>>22),v=T+(m^(b|~g))+I[14]+2878612391&4294967295,T=b+(v<<15&4294967295|v>>>17),v=g+(b^(T|~m))+I[5]+4237533241&4294967295,g=T+(v<<21&4294967295|v>>>11),v=m+(T^(g|~b))+I[12]+1700485571&4294967295,m=g+(v<<6&4294967295|v>>>26),v=b+(g^(m|~T))+I[3]+2399980690&4294967295,b=m+(v<<10&4294967295|v>>>22),v=T+(m^(b|~g))+I[10]+4293915773&4294967295,T=b+(v<<15&4294967295|v>>>17),v=g+(b^(T|~m))+I[1]+2240044497&4294967295,g=T+(v<<21&4294967295|v>>>11),v=m+(T^(g|~b))+I[8]+1873313359&4294967295,m=g+(v<<6&4294967295|v>>>26),v=b+(g^(m|~T))+I[15]+4264355552&4294967295,b=m+(v<<10&4294967295|v>>>22),v=T+(m^(b|~g))+I[6]+2734768916&4294967295,T=b+(v<<15&4294967295|v>>>17),v=g+(b^(T|~m))+I[13]+1309151649&4294967295,g=T+(v<<21&4294967295|v>>>11),v=m+(T^(g|~b))+I[4]+4149444226&4294967295,m=g+(v<<6&4294967295|v>>>26),v=b+(g^(m|~T))+I[11]+3174756917&4294967295,b=m+(v<<10&4294967295|v>>>22),v=T+(m^(b|~g))+I[2]+718787259&4294967295,T=b+(v<<15&4294967295|v>>>17),v=g+(b^(T|~m))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(T+(v<<21&4294967295|v>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+b&4294967295}r.prototype.u=function(E,m){m===void 0&&(m=E.length);for(var g=m-this.blockSize,I=this.B,T=this.h,b=0;b<m;){if(T==0)for(;b<=g;)s(this,E,b),b+=this.blockSize;if(typeof E=="string"){for(;b<m;)if(I[T++]=E.charCodeAt(b++),T==this.blockSize){s(this,I),T=0;break}}else for(;b<m;)if(I[T++]=E[b++],T==this.blockSize){s(this,I),T=0;break}}this.h=T,this.o+=m},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;var g=8*this.o;for(m=E.length-8;m<E.length;++m)E[m]=g&255,g/=256;for(this.u(E),E=Array(16),m=g=0;4>m;++m)for(var I=0;32>I;I+=8)E[g++]=this.g[m]>>>I&255;return E};function i(E,m){var g=l;return Object.prototype.hasOwnProperty.call(g,E)?g[E]:g[E]=m(E)}function a(E,m){this.h=m;for(var g=[],I=!0,T=E.length-1;0<=T;T--){var b=E[T]|0;I&&b==m||(g[T]=b,I=!1)}this.g=g}var l={};function u(E){return-128<=E&&128>E?i(E,function(m){return new a([m|0],0>m?-1:0)}):new a([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return y;if(0>E)return k(h(-E));for(var m=[],g=1,I=0;E>=g;I++)m[I]=E/g|0,g*=4294967296;return new a(m,0)}function p(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return k(p(E.substring(1),m));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=h(Math.pow(m,8)),I=y,T=0;T<E.length;T+=8){var b=Math.min(8,E.length-T),v=parseInt(E.substring(T,T+b),m);8>b?(b=h(Math.pow(m,b)),I=I.j(b).add(h(v))):(I=I.j(g),I=I.add(h(v)))}return I}var y=u(0),_=u(1),w=u(16777216);n=a.prototype,n.m=function(){if(x(this))return-k(this).m();for(var E=0,m=1,g=0;g<this.g.length;g++){var I=this.i(g);E+=(0<=I?I:4294967296+I)*m,m*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(R(this))return"0";if(x(this))return"-"+k(this).toString(E);for(var m=h(Math.pow(E,6)),g=this,I="";;){var T=Y(g,m).g;g=B(g,T.j(m));var b=((0<g.g.length?g.g[0]:g.h)>>>0).toString(E);if(g=T,R(g))return b+I;for(;6>b.length;)b="0"+b;I=b+I}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function R(E){if(E.h!=0)return!1;for(var m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function x(E){return E.h==-1}n.l=function(E){return E=B(this,E),x(E)?-1:R(E)?0:1};function k(E){for(var m=E.g.length,g=[],I=0;I<m;I++)g[I]=~E.g[I];return new a(g,~E.h).add(_)}n.abs=function(){return x(this)?k(this):this},n.add=function(E){for(var m=Math.max(this.g.length,E.g.length),g=[],I=0,T=0;T<=m;T++){var b=I+(this.i(T)&65535)+(E.i(T)&65535),v=(b>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);I=v>>>16,b&=65535,v&=65535,g[T]=v<<16|b}return new a(g,g[g.length-1]&-2147483648?-1:0)};function B(E,m){return E.add(k(m))}n.j=function(E){if(R(this)||R(E))return y;if(x(this))return x(E)?k(this).j(k(E)):k(k(this).j(E));if(x(E))return k(this.j(k(E)));if(0>this.l(w)&&0>E.l(w))return h(this.m()*E.m());for(var m=this.g.length+E.g.length,g=[],I=0;I<2*m;I++)g[I]=0;for(I=0;I<this.g.length;I++)for(var T=0;T<E.g.length;T++){var b=this.i(I)>>>16,v=this.i(I)&65535,we=E.i(T)>>>16,vt=E.i(T)&65535;g[2*I+2*T]+=v*vt,j(g,2*I+2*T),g[2*I+2*T+1]+=b*vt,j(g,2*I+2*T+1),g[2*I+2*T+1]+=v*we,j(g,2*I+2*T+1),g[2*I+2*T+2]+=b*we,j(g,2*I+2*T+2)}for(I=0;I<m;I++)g[I]=g[2*I+1]<<16|g[2*I];for(I=m;I<2*m;I++)g[I]=0;return new a(g,0)};function j(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function U(E,m){this.g=E,this.h=m}function Y(E,m){if(R(m))throw Error("division by zero");if(R(E))return new U(y,y);if(x(E))return m=Y(k(E),m),new U(k(m.g),k(m.h));if(x(m))return m=Y(E,k(m)),new U(k(m.g),m.h);if(30<E.g.length){if(x(E)||x(m))throw Error("slowDivide_ only works with positive integers.");for(var g=_,I=m;0>=I.l(E);)g=z(g),I=z(I);var T=W(g,1),b=W(I,1);for(I=W(I,2),g=W(g,2);!R(I);){var v=b.add(I);0>=v.l(E)&&(T=T.add(g),b=v),I=W(I,1),g=W(g,1)}return m=B(E,T.j(m)),new U(T,m)}for(T=y;0<=E.l(m);){for(g=Math.max(1,Math.floor(E.m()/m.m())),I=Math.ceil(Math.log(g)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),b=h(g),v=b.j(m);x(v)||0<v.l(E);)g-=I,b=h(g),v=b.j(m);R(b)&&(b=_),T=T.add(b),E=B(E,v)}return new U(T,E)}n.A=function(E){return Y(this,E).h},n.and=function(E){for(var m=Math.max(this.g.length,E.g.length),g=[],I=0;I<m;I++)g[I]=this.i(I)&E.i(I);return new a(g,this.h&E.h)},n.or=function(E){for(var m=Math.max(this.g.length,E.g.length),g=[],I=0;I<m;I++)g[I]=this.i(I)|E.i(I);return new a(g,this.h|E.h)},n.xor=function(E){for(var m=Math.max(this.g.length,E.g.length),g=[],I=0;I<m;I++)g[I]=this.i(I)^E.i(I);return new a(g,this.h^E.h)};function z(E){for(var m=E.g.length+1,g=[],I=0;I<m;I++)g[I]=E.i(I)<<1|E.i(I-1)>>>31;return new a(g,E.h)}function W(E,m){var g=m>>5;m%=32;for(var I=E.g.length-g,T=[],b=0;b<I;b++)T[b]=0<m?E.i(b+g)>>>m|E.i(b+g+1)<<32-m:E.i(b+g);return new a(T,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Fu=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=p,Yt=a}).apply(typeof tc<"u"?tc:typeof self<"u"?self:typeof window<"u"?window:{});var cs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bu,ur,$u,ws,ao,qu,ju,zu;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,d){return o==Array.prototype||o==Object.prototype||(o[c]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof cs=="object"&&cs];for(var c=0;c<o.length;++c){var d=o[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var d=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var A=o[f];if(!(A in d))break e;d=d[A]}o=o[o.length-1],f=d[o],c=c(f),c!=f&&c!=null&&e(d,o,{configurable:!0,writable:!0,value:c})}}function i(o,c){o instanceof String&&(o+="");var d=0,f=!1,A={next:function(){if(!f&&d<o.length){var S=d++;return{value:c(S,o[S]),done:!1}}return f=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}s("Array.prototype.values",function(o){return o||function(){return i(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function h(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function p(o,c,d){return o.call.apply(o.bind,arguments)}function y(o,c,d){if(!o)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,f),o.apply(c,A)}}return function(){return o.apply(c,arguments)}}function _(o,c,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:y,_.apply(null,arguments)}function w(o,c){var d=Array.prototype.slice.call(arguments,1);return function(){var f=d.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function R(o,c){function d(){}d.prototype=c.prototype,o.aa=c.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(f,A,S){for(var D=Array(arguments.length-2),ee=2;ee<arguments.length;ee++)D[ee-2]=arguments[ee];return c.prototype[A].apply(f,D)}}function x(o){const c=o.length;if(0<c){const d=Array(c);for(let f=0;f<c;f++)d[f]=o[f];return d}return[]}function k(o,c){for(let d=1;d<arguments.length;d++){const f=arguments[d];if(u(f)){const A=o.length||0,S=f.length||0;o.length=A+S;for(let D=0;D<S;D++)o[A+D]=f[D]}else o.push(f)}}class B{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function j(o){return/^[\s\xa0]*$/.test(o)}function U(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function Y(o){return Y[" "](o),o}Y[" "]=function(){};var z=U().indexOf("Gecko")!=-1&&!(U().toLowerCase().indexOf("webkit")!=-1&&U().indexOf("Edge")==-1)&&!(U().indexOf("Trident")!=-1||U().indexOf("MSIE")!=-1)&&U().indexOf("Edge")==-1;function W(o,c,d){for(const f in o)c.call(d,o[f],f,o)}function E(o,c){for(const d in o)c.call(void 0,o[d],d,o)}function m(o){const c={};for(const d in o)c[d]=o[d];return c}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(o,c){let d,f;for(let A=1;A<arguments.length;A++){f=arguments[A];for(d in f)o[d]=f[d];for(let S=0;S<g.length;S++)d=g[S],Object.prototype.hasOwnProperty.call(f,d)&&(o[d]=f[d])}}function T(o){var c=1;o=o.split(":");const d=[];for(;0<c&&o.length;)d.push(o.shift()),c--;return o.length&&d.push(o.join(":")),d}function b(o){l.setTimeout(()=>{throw o},0)}function v(){var o=gi;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class we{constructor(){this.h=this.g=null}add(c,d){const f=vt.get();f.set(c,d),this.h?this.h.next=f:this.g=f,this.h=f}}var vt=new B(()=>new We,o=>o.reset());class We{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Hn,Wn=!1,gi=new we,Aa=()=>{const o=l.Promise.resolve(void 0);Hn=()=>{o.then(ph)}};var ph=()=>{for(var o;o=v();){try{o.h.call(o.g)}catch(d){b(d)}var c=vt;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}Wn=!1};function _t(){this.s=this.s,this.C=this.C}_t.prototype.s=!1,_t.prototype.ma=function(){this.s||(this.s=!0,this.N())},_t.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ee(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}Ee.prototype.h=function(){this.defaultPrevented=!0};var mh=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return o}();function Kn(o,c){if(Ee.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(z){e:{try{Y(c.nodeName);var A=!0;break e}catch{}A=!1}A||(c=null)}}else d=="mouseover"?c=o.fromElement:d=="mouseout"&&(c=o.toElement);this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:gh[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Kn.aa.h.call(this)}}R(Kn,Ee);var gh={2:"touch",3:"pen",4:"mouse"};Kn.prototype.h=function(){Kn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var jr="closure_listenable_"+(1e6*Math.random()|0),yh=0;function vh(o,c,d,f,A){this.listener=o,this.proxy=null,this.src=c,this.type=d,this.capture=!!f,this.ha=A,this.key=++yh,this.da=this.fa=!1}function zr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Hr(o){this.src=o,this.g={},this.h=0}Hr.prototype.add=function(o,c,d,f,A){var S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);var D=vi(o,c,f,A);return-1<D?(c=o[D],d||(c.fa=!1)):(c=new vh(c,this.src,S,!!f,A),c.fa=d,o.push(c)),c};function yi(o,c){var d=c.type;if(d in o.g){var f=o.g[d],A=Array.prototype.indexOf.call(f,c,void 0),S;(S=0<=A)&&Array.prototype.splice.call(f,A,1),S&&(zr(c),o.g[d].length==0&&(delete o.g[d],o.h--))}}function vi(o,c,d,f){for(var A=0;A<o.length;++A){var S=o[A];if(!S.da&&S.listener==c&&S.capture==!!d&&S.ha==f)return A}return-1}var _i="closure_lm_"+(1e6*Math.random()|0),wi={};function Ra(o,c,d,f,A){if(Array.isArray(c)){for(var S=0;S<c.length;S++)Ra(o,c[S],d,f,A);return null}return d=Ca(d),o&&o[jr]?o.K(c,d,h(f)?!!f.capture:!1,A):_h(o,c,d,!1,f,A)}function _h(o,c,d,f,A,S){if(!c)throw Error("Invalid event type");var D=h(A)?!!A.capture:!!A,ee=Ii(o);if(ee||(o[_i]=ee=new Hr(o)),d=ee.add(c,d,f,D,S),d.proxy)return d;if(f=wh(),d.proxy=f,f.src=o,f.listener=d,o.addEventListener)mh||(A=D),A===void 0&&(A=!1),o.addEventListener(c.toString(),f,A);else if(o.attachEvent)o.attachEvent(Pa(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return d}function wh(){function o(d){return c.call(o.src,o.listener,d)}const c=Eh;return o}function Sa(o,c,d,f,A){if(Array.isArray(c))for(var S=0;S<c.length;S++)Sa(o,c[S],d,f,A);else f=h(f)?!!f.capture:!!f,d=Ca(d),o&&o[jr]?(o=o.i,c=String(c).toString(),c in o.g&&(S=o.g[c],d=vi(S,d,f,A),-1<d&&(zr(S[d]),Array.prototype.splice.call(S,d,1),S.length==0&&(delete o.g[c],o.h--)))):o&&(o=Ii(o))&&(c=o.g[c.toString()],o=-1,c&&(o=vi(c,d,f,A)),(d=-1<o?c[o]:null)&&Ei(d))}function Ei(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[jr])yi(c.i,o);else{var d=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(d,f,o.capture):c.detachEvent?c.detachEvent(Pa(d),f):c.addListener&&c.removeListener&&c.removeListener(f),(d=Ii(c))?(yi(d,o),d.h==0&&(d.src=null,c[_i]=null)):zr(o)}}}function Pa(o){return o in wi?wi[o]:wi[o]="on"+o}function Eh(o,c){if(o.da)o=!0;else{c=new Kn(c,this);var d=o.listener,f=o.ha||o.src;o.fa&&Ei(o),o=d.call(f,c)}return o}function Ii(o){return o=o[_i],o instanceof Hr?o:null}var Ti="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ca(o){return typeof o=="function"?o:(o[Ti]||(o[Ti]=function(c){return o.handleEvent(c)}),o[Ti])}function Ie(){_t.call(this),this.i=new Hr(this),this.M=this,this.F=null}R(Ie,_t),Ie.prototype[jr]=!0,Ie.prototype.removeEventListener=function(o,c,d,f){Sa(this,o,c,d,f)};function ke(o,c){var d,f=o.F;if(f)for(d=[];f;f=f.F)d.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new Ee(c,o);else if(c instanceof Ee)c.target=c.target||o;else{var A=c;c=new Ee(f,o),I(c,A)}if(A=!0,d)for(var S=d.length-1;0<=S;S--){var D=c.g=d[S];A=Wr(D,f,!0,c)&&A}if(D=c.g=o,A=Wr(D,f,!0,c)&&A,A=Wr(D,f,!1,c)&&A,d)for(S=0;S<d.length;S++)D=c.g=d[S],A=Wr(D,f,!1,c)&&A}Ie.prototype.N=function(){if(Ie.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var d=o.g[c],f=0;f<d.length;f++)zr(d[f]);delete o.g[c],o.h--}}this.F=null},Ie.prototype.K=function(o,c,d,f){return this.i.add(String(o),c,!1,d,f)},Ie.prototype.L=function(o,c,d,f){return this.i.add(String(o),c,!0,d,f)};function Wr(o,c,d,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var A=!0,S=0;S<c.length;++S){var D=c[S];if(D&&!D.da&&D.capture==d){var ee=D.listener,pe=D.ha||D.src;D.fa&&yi(o.i,D),A=ee.call(pe,f)!==!1&&A}}return A&&!f.defaultPrevented}function ka(o,c,d){if(typeof o=="function")d&&(o=_(o,d));else if(o&&typeof o.handleEvent=="function")o=_(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(o,c||0)}function xa(o){o.g=ka(()=>{o.g=null,o.i&&(o.i=!1,xa(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class Ih extends _t{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:xa(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Gn(o){_t.call(this),this.h=o,this.g={}}R(Gn,_t);var Da=[];function Va(o){W(o.g,function(c,d){this.g.hasOwnProperty(d)&&Ei(c)},o),o.g={}}Gn.prototype.N=function(){Gn.aa.N.call(this),Va(this)},Gn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var bi=l.JSON.stringify,Th=l.JSON.parse,bh=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function Ai(){}Ai.prototype.h=null;function Na(o){return o.h||(o.h=o.i())}function La(){}var Qn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ri(){Ee.call(this,"d")}R(Ri,Ee);function Si(){Ee.call(this,"c")}R(Si,Ee);var zt={},Oa=null;function Kr(){return Oa=Oa||new Ie}zt.La="serverreachability";function Ma(o){Ee.call(this,zt.La,o)}R(Ma,Ee);function Yn(o){const c=Kr();ke(c,new Ma(c))}zt.STAT_EVENT="statevent";function Ua(o,c){Ee.call(this,zt.STAT_EVENT,o),this.stat=c}R(Ua,Ee);function xe(o){const c=Kr();ke(c,new Ua(c,o))}zt.Ma="timingevent";function Fa(o,c){Ee.call(this,zt.Ma,o),this.size=c}R(Fa,Ee);function Jn(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},c)}function Xn(){this.g=!0}Xn.prototype.xa=function(){this.g=!1};function Ah(o,c,d,f,A,S){o.info(function(){if(o.g)if(S)for(var D="",ee=S.split("&"),pe=0;pe<ee.length;pe++){var J=ee[pe].split("=");if(1<J.length){var Te=J[0];J=J[1];var be=Te.split("_");D=2<=be.length&&be[1]=="type"?D+(Te+"="+J+"&"):D+(Te+"=redacted&")}}else D=null;else D=S;return"XMLHTTP REQ ("+f+") [attempt "+A+"]: "+c+`
`+d+`
`+D})}function Rh(o,c,d,f,A,S,D){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+A+"]: "+c+`
`+d+`
`+S+" "+D})}function un(o,c,d,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Ph(o,d)+(f?" "+f:"")})}function Sh(o,c){o.info(function(){return"TIMEOUT: "+c})}Xn.prototype.info=function(){};function Ph(o,c){if(!o.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var f=d[o];if(!(2>f.length)){var A=f[1];if(Array.isArray(A)&&!(1>A.length)){var S=A[0];if(S!="noop"&&S!="stop"&&S!="close")for(var D=1;D<A.length;D++)A[D]=""}}}}return bi(d)}catch{return c}}var Gr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ba={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Pi;function Qr(){}R(Qr,Ai),Qr.prototype.g=function(){return new XMLHttpRequest},Qr.prototype.i=function(){return{}},Pi=new Qr;function wt(o,c,d,f){this.j=o,this.i=c,this.l=d,this.R=f||1,this.U=new Gn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new $a}function $a(){this.i=null,this.g="",this.h=!1}var qa={},Ci={};function ki(o,c,d){o.L=1,o.v=Zr(nt(c)),o.m=d,o.P=!0,ja(o,null)}function ja(o,c){o.F=Date.now(),Yr(o),o.A=nt(o.v);var d=o.A,f=o.R;Array.isArray(f)||(f=[String(f)]),rl(d.i,"t",f),o.C=0,d=o.j.J,o.h=new $a,o.g=El(o.j,d?c:null,!o.m),0<o.O&&(o.M=new Ih(_(o.Y,o,o.g),o.O)),c=o.U,d=o.g,f=o.ca;var A="readystatechange";Array.isArray(A)||(A&&(Da[0]=A.toString()),A=Da);for(var S=0;S<A.length;S++){var D=Ra(d,A[S],f||c.handleEvent,!1,c.h||c);if(!D)break;c.g[D.key]=D}c=o.H?m(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),Yn(),Ah(o.i,o.u,o.A,o.l,o.R,o.m)}wt.prototype.ca=function(o){o=o.target;const c=this.M;c&&rt(o)==3?c.j():this.Y(o)},wt.prototype.Y=function(o){try{if(o==this.g)e:{const be=rt(this.g);var c=this.g.Ba();const fn=this.g.Z();if(!(3>be)&&(be!=3||this.g&&(this.h.h||this.g.oa()||ul(this.g)))){this.J||be!=4||c==7||(c==8||0>=fn?Yn(3):Yn(2)),xi(this);var d=this.g.Z();this.X=d;t:if(za(this)){var f=ul(this.g);o="";var A=f.length,S=rt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ht(this),Zn(this);var D="";break t}this.h.i=new l.TextDecoder}for(c=0;c<A;c++)this.h.h=!0,o+=this.h.i.decode(f[c],{stream:!(S&&c==A-1)});f.length=0,this.h.g+=o,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=d==200,Rh(this.i,this.u,this.A,this.l,this.R,be,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ee,pe=this.g;if((ee=pe.g?pe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(ee)){var J=ee;break t}}J=null}if(d=J)un(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Di(this,d);else{this.o=!1,this.s=3,xe(12),Ht(this),Zn(this);break e}}if(this.P){d=!0;let $e;for(;!this.J&&this.C<D.length;)if($e=Ch(this,D),$e==Ci){be==4&&(this.s=4,xe(14),d=!1),un(this.i,this.l,null,"[Incomplete Response]");break}else if($e==qa){this.s=4,xe(15),un(this.i,this.l,D,"[Invalid Chunk]"),d=!1;break}else un(this.i,this.l,$e,null),Di(this,$e);if(za(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),be!=4||D.length!=0||this.h.h||(this.s=1,xe(16),d=!1),this.o=this.o&&d,!d)un(this.i,this.l,D,"[Invalid Chunked Response]"),Ht(this),Zn(this);else if(0<D.length&&!this.W){this.W=!0;var Te=this.j;Te.g==this&&Te.ba&&!Te.M&&(Te.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),Ui(Te),Te.M=!0,xe(11))}}else un(this.i,this.l,D,null),Di(this,D);be==4&&Ht(this),this.o&&!this.J&&(be==4?yl(this.j,this):(this.o=!1,Yr(this)))}else Wh(this.g),d==400&&0<D.indexOf("Unknown SID")?(this.s=3,xe(12)):(this.s=0,xe(13)),Ht(this),Zn(this)}}}catch{}finally{}};function za(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Ch(o,c){var d=o.C,f=c.indexOf(`
`,d);return f==-1?Ci:(d=Number(c.substring(d,f)),isNaN(d)?qa:(f+=1,f+d>c.length?Ci:(c=c.slice(f,f+d),o.C=f+d,c)))}wt.prototype.cancel=function(){this.J=!0,Ht(this)};function Yr(o){o.S=Date.now()+o.I,Ha(o,o.I)}function Ha(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Jn(_(o.ba,o),c)}function xi(o){o.B&&(l.clearTimeout(o.B),o.B=null)}wt.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Sh(this.i,this.A),this.L!=2&&(Yn(),xe(17)),Ht(this),this.s=2,Zn(this)):Ha(this,this.S-o)};function Zn(o){o.j.G==0||o.J||yl(o.j,o)}function Ht(o){xi(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,Va(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function Di(o,c){try{var d=o.j;if(d.G!=0&&(d.g==o||Vi(d.h,o))){if(!o.K&&Vi(d.h,o)&&d.G==3){try{var f=d.Da.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var A=f;if(A[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)is(d),rs(d);else break e;Mi(d),xe(18)}}else d.za=A[1],0<d.za-d.T&&37500>A[2]&&d.F&&d.v==0&&!d.C&&(d.C=Jn(_(d.Za,d),6e3));if(1>=Ga(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Kt(d,11)}else if((o.K||d.g==o)&&is(d),!j(c))for(A=d.Da.g.parse(c),c=0;c<A.length;c++){let J=A[c];if(d.T=J[0],J=J[1],d.G==2)if(J[0]=="c"){d.K=J[1],d.ia=J[2];const Te=J[3];Te!=null&&(d.la=Te,d.j.info("VER="+d.la));const be=J[4];be!=null&&(d.Aa=be,d.j.info("SVER="+d.Aa));const fn=J[5];fn!=null&&typeof fn=="number"&&0<fn&&(f=1.5*fn,d.L=f,d.j.info("backChannelRequestTimeoutMs_="+f)),f=d;const $e=o.g;if($e){const as=$e.g?$e.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(as){var S=f.h;S.g||as.indexOf("spdy")==-1&&as.indexOf("quic")==-1&&as.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Ni(S,S.h),S.h=null))}if(f.D){const Fi=$e.g?$e.g.getResponseHeader("X-HTTP-Session-Id"):null;Fi&&(f.ya=Fi,te(f.I,f.D,Fi))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),f=d;var D=o;if(f.qa=wl(f,f.J?f.ia:null,f.W),D.K){Qa(f.h,D);var ee=D,pe=f.L;pe&&(ee.I=pe),ee.B&&(xi(ee),Yr(ee)),f.g=D}else ml(f);0<d.i.length&&ss(d)}else J[0]!="stop"&&J[0]!="close"||Kt(d,7);else d.G==3&&(J[0]=="stop"||J[0]=="close"?J[0]=="stop"?Kt(d,7):Oi(d):J[0]!="noop"&&d.l&&d.l.ta(J),d.v=0)}}Yn(4)}catch{}}var kh=class{constructor(o,c){this.g=o,this.map=c}};function Wa(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ka(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ga(o){return o.h?1:o.g?o.g.size:0}function Vi(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Ni(o,c){o.g?o.g.add(c):o.h=c}function Qa(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Wa.prototype.cancel=function(){if(this.i=Ya(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Ya(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const d of o.g.values())c=c.concat(d.D);return c}return x(o.i)}function xh(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var c=[],d=o.length,f=0;f<d;f++)c.push(o[f]);return c}c=[],d=0;for(f in o)c[d++]=o[f];return c}function Dh(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var c=[];o=o.length;for(var d=0;d<o;d++)c.push(d);return c}c=[],d=0;for(const f in o)c[d++]=f;return c}}}function Ja(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var d=Dh(o),f=xh(o),A=f.length,S=0;S<A;S++)c.call(void 0,f[S],d&&d[S],o)}var Xa=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Vh(o,c){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var f=o[d].indexOf("="),A=null;if(0<=f){var S=o[d].substring(0,f);A=o[d].substring(f+1)}else S=o[d];c(S,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Wt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Wt){this.h=o.h,Jr(this,o.j),this.o=o.o,this.g=o.g,Xr(this,o.s),this.l=o.l;var c=o.i,d=new nr;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),Za(this,d),this.m=o.m}else o&&(c=String(o).match(Xa))?(this.h=!1,Jr(this,c[1]||"",!0),this.o=er(c[2]||""),this.g=er(c[3]||"",!0),Xr(this,c[4]),this.l=er(c[5]||"",!0),Za(this,c[6]||"",!0),this.m=er(c[7]||"")):(this.h=!1,this.i=new nr(null,this.h))}Wt.prototype.toString=function(){var o=[],c=this.j;c&&o.push(tr(c,el,!0),":");var d=this.g;return(d||c=="file")&&(o.push("//"),(c=this.o)&&o.push(tr(c,el,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(tr(d,d.charAt(0)=="/"?Oh:Lh,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",tr(d,Uh)),o.join("")};function nt(o){return new Wt(o)}function Jr(o,c,d){o.j=d?er(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Xr(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function Za(o,c,d){c instanceof nr?(o.i=c,Fh(o.i,o.h)):(d||(c=tr(c,Mh)),o.i=new nr(c,o.h))}function te(o,c,d){o.i.set(c,d)}function Zr(o){return te(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function er(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function tr(o,c,d){return typeof o=="string"?(o=encodeURI(o).replace(c,Nh),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Nh(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var el=/[#\/\?@]/g,Lh=/[#\?:]/g,Oh=/[#\?]/g,Mh=/[#\?@]/g,Uh=/#/g;function nr(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function Et(o){o.g||(o.g=new Map,o.h=0,o.i&&Vh(o.i,function(c,d){o.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}n=nr.prototype,n.add=function(o,c){Et(this),this.i=null,o=dn(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(c),this.h+=1,this};function tl(o,c){Et(o),c=dn(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function nl(o,c){return Et(o),c=dn(o,c),o.g.has(c)}n.forEach=function(o,c){Et(this),this.g.forEach(function(d,f){d.forEach(function(A){o.call(c,A,f,this)},this)},this)},n.na=function(){Et(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let f=0;f<c.length;f++){const A=o[f];for(let S=0;S<A.length;S++)d.push(c[f])}return d},n.V=function(o){Et(this);let c=[];if(typeof o=="string")nl(this,o)&&(c=c.concat(this.g.get(dn(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)c=c.concat(o[d])}return c},n.set=function(o,c){return Et(this),this.i=null,o=dn(this,o),nl(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function rl(o,c,d){tl(o,c),0<d.length&&(o.i=null,o.g.set(dn(o,c),x(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var f=c[d];const S=encodeURIComponent(String(f)),D=this.V(f);for(f=0;f<D.length;f++){var A=S;D[f]!==""&&(A+="="+encodeURIComponent(String(D[f]))),o.push(A)}}return this.i=o.join("&")};function dn(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Fh(o,c){c&&!o.j&&(Et(o),o.i=null,o.g.forEach(function(d,f){var A=f.toLowerCase();f!=A&&(tl(this,f),rl(this,A,d))},o)),o.j=c}function Bh(o,c){const d=new Xn;if(l.Image){const f=new Image;f.onload=w(It,d,"TestLoadImage: loaded",!0,c,f),f.onerror=w(It,d,"TestLoadImage: error",!1,c,f),f.onabort=w(It,d,"TestLoadImage: abort",!1,c,f),f.ontimeout=w(It,d,"TestLoadImage: timeout",!1,c,f),l.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function $h(o,c){const d=new Xn,f=new AbortController,A=setTimeout(()=>{f.abort(),It(d,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(S=>{clearTimeout(A),S.ok?It(d,"TestPingServer: ok",!0,c):It(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(A),It(d,"TestPingServer: error",!1,c)})}function It(o,c,d,f,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),f(d)}catch{}}function qh(){this.g=new bh}function jh(o,c,d){const f=d||"";try{Ja(o,function(A,S){let D=A;h(A)&&(D=bi(A)),c.push(f+S+"="+encodeURIComponent(D))})}catch(A){throw c.push(f+"type="+encodeURIComponent("_badmap")),A}}function es(o){this.l=o.Ub||null,this.j=o.eb||!1}R(es,Ai),es.prototype.g=function(){return new ts(this.l,this.j)},es.prototype.i=function(o){return function(){return o}}({});function ts(o,c){Ie.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(ts,Ie),n=ts.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,sr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,rr(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,sr(this)),this.g&&(this.readyState=3,sr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;sl(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function sl(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?rr(this):sr(this),this.readyState==3&&sl(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,rr(this))},n.Qa=function(o){this.g&&(this.response=o,rr(this))},n.ga=function(){this.g&&rr(this)};function rr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,sr(o)}n.setRequestHeader=function(o,c){this.u.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=c.next();return o.join(`\r
`)};function sr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ts.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function il(o){let c="";return W(o,function(d,f){c+=f,c+=":",c+=d,c+=`\r
`}),c}function Li(o,c,d){e:{for(f in d){var f=!1;break e}f=!0}f||(d=il(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):te(o,c,d))}function oe(o){Ie.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(oe,Ie);var zh=/^https?$/i,Hh=["POST","PUT"];n=oe.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,c,d,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Pi.g(),this.v=this.o?Na(this.o):Na(Pi),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(S){ol(this,S);return}if(o=d||"",d=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var A in f)d.set(A,f[A]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const S of f.keys())d.set(S,f.get(S));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),A=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Hh,c,void 0))||f||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,D]of d)this.g.setRequestHeader(S,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{cl(this),this.u=!0,this.g.send(o),this.u=!1}catch(S){ol(this,S)}};function ol(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,al(o),ns(o)}function al(o){o.A||(o.A=!0,ke(o,"complete"),ke(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ke(this,"complete"),ke(this,"abort"),ns(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ns(this,!0)),oe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ll(this):this.bb())},n.bb=function(){ll(this)};function ll(o){if(o.h&&typeof a<"u"&&(!o.v[1]||rt(o)!=4||o.Z()!=2)){if(o.u&&rt(o)==4)ka(o.Ea,0,o);else if(ke(o,"readystatechange"),rt(o)==4){o.h=!1;try{const D=o.Z();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var f;if(f=D===0){var A=String(o.D).match(Xa)[1]||null;!A&&l.self&&l.self.location&&(A=l.self.location.protocol.slice(0,-1)),f=!zh.test(A?A.toLowerCase():"")}d=f}if(d)ke(o,"complete"),ke(o,"success");else{o.m=6;try{var S=2<rt(o)?o.g.statusText:""}catch{S=""}o.l=S+" ["+o.Z()+"]",al(o)}}finally{ns(o)}}}}function ns(o,c){if(o.g){cl(o);const d=o.g,f=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||ke(o,"ready");try{d.onreadystatechange=f}catch{}}}function cl(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function rt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<rt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),Th(c)}};function ul(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Wh(o){const c={};o=(o.g&&2<=rt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(j(o[f]))continue;var d=T(o[f]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=c[A]||[];c[A]=S,S.push(d)}E(c,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ir(o,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||c}function dl(o){this.Aa=0,this.i=[],this.j=new Xn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ir("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ir("baseRetryDelayMs",5e3,o),this.cb=ir("retryDelaySeedMs",1e4,o),this.Wa=ir("forwardChannelMaxRetries",2,o),this.wa=ir("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Wa(o&&o.concurrentRequestLimit),this.Da=new qh,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=dl.prototype,n.la=8,n.G=1,n.connect=function(o,c,d,f){xe(0),this.W=o,this.H=c||{},d&&f!==void 0&&(this.H.OSID=d,this.H.OAID=f),this.F=this.X,this.I=wl(this,null,this.W),ss(this)};function Oi(o){if(hl(o),o.G==3){var c=o.U++,d=nt(o.I);if(te(d,"SID",o.K),te(d,"RID",c),te(d,"TYPE","terminate"),or(o,d),c=new wt(o,o.j,c),c.L=2,c.v=Zr(nt(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=El(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Yr(c)}_l(o)}function rs(o){o.g&&(Ui(o),o.g.cancel(),o.g=null)}function hl(o){rs(o),o.u&&(l.clearTimeout(o.u),o.u=null),is(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function ss(o){if(!Ka(o.h)&&!o.s){o.s=!0;var c=o.Ga;Hn||Aa(),Wn||(Hn(),Wn=!0),gi.add(c,o),o.B=0}}function Kh(o,c){return Ga(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Jn(_(o.Ga,o,c),vl(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const A=new wt(this,this.j,o);let S=this.o;if(this.S&&(S?(S=m(S),I(S,this.S)):S=this.S),this.m!==null||this.O||(A.H=S,S=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var f=this.i[d];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=pl(this,A,c),d=nt(this.I),te(d,"RID",o),te(d,"CVER",22),this.D&&te(d,"X-HTTP-Session-Id",this.D),or(this,d),S&&(this.O?c="headers="+encodeURIComponent(String(il(S)))+"&"+c:this.m&&Li(d,this.m,S)),Ni(this.h,A),this.Ua&&te(d,"TYPE","init"),this.P?(te(d,"$req",c),te(d,"SID","null"),A.T=!0,ki(A,d,null)):ki(A,d,c),this.G=2}}else this.G==3&&(o?fl(this,o):this.i.length==0||Ka(this.h)||fl(this))};function fl(o,c){var d;c?d=c.l:d=o.U++;const f=nt(o.I);te(f,"SID",o.K),te(f,"RID",d),te(f,"AID",o.T),or(o,f),o.m&&o.o&&Li(f,o.m,o.o),d=new wt(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),c&&(o.i=c.D.concat(o.i)),c=pl(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ni(o.h,d),ki(d,f,c)}function or(o,c){o.H&&W(o.H,function(d,f){te(c,f,d)}),o.l&&Ja({},function(d,f){te(c,f,d)})}function pl(o,c,d){d=Math.min(o.i.length,d);var f=o.l?_(o.l.Na,o.l,o):null;e:{var A=o.i;let S=-1;for(;;){const D=["count="+d];S==-1?0<d?(S=A[0].g,D.push("ofs="+S)):S=0:D.push("ofs="+S);let ee=!0;for(let pe=0;pe<d;pe++){let J=A[pe].g;const Te=A[pe].map;if(J-=S,0>J)S=Math.max(0,A[pe].g-100),ee=!1;else try{jh(Te,D,"req"+J+"_")}catch{f&&f(Te)}}if(ee){f=D.join("&");break e}}}return o=o.i.splice(0,d),c.D=o,f}function ml(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;Hn||Aa(),Wn||(Hn(),Wn=!0),gi.add(c,o),o.v=0}}function Mi(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Jn(_(o.Fa,o),vl(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,gl(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Jn(_(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,xe(10),rs(this),gl(this))};function Ui(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function gl(o){o.g=new wt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=nt(o.qa);te(c,"RID","rpc"),te(c,"SID",o.K),te(c,"AID",o.T),te(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&te(c,"TO",o.ja),te(c,"TYPE","xmlhttp"),or(o,c),o.m&&o.o&&Li(c,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Zr(nt(c)),d.m=null,d.P=!0,ja(d,o)}n.Za=function(){this.C!=null&&(this.C=null,rs(this),Mi(this),xe(19))};function is(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function yl(o,c){var d=null;if(o.g==c){is(o),Ui(o),o.g=null;var f=2}else if(Vi(o.h,c))d=c.D,Qa(o.h,c),f=1;else return;if(o.G!=0){if(c.o)if(f==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var A=o.B;f=Kr(),ke(f,new Fa(f,d)),ss(o)}else ml(o);else if(A=c.s,A==3||A==0&&0<c.X||!(f==1&&Kh(o,c)||f==2&&Mi(o)))switch(d&&0<d.length&&(c=o.h,c.i=c.i.concat(d)),A){case 1:Kt(o,5);break;case 4:Kt(o,10);break;case 3:Kt(o,6);break;default:Kt(o,2)}}}function vl(o,c){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*c}function Kt(o,c){if(o.j.info("Error code "+c),c==2){var d=_(o.fb,o),f=o.Xa;const A=!f;f=new Wt(f||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Jr(f,"https"),Zr(f),A?Bh(f.toString(),d):$h(f.toString(),d)}else xe(2);o.G=0,o.l&&o.l.sa(c),_l(o),hl(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),xe(2)):(this.j.info("Failed to ping google.com"),xe(1))};function _l(o){if(o.G=0,o.ka=[],o.l){const c=Ya(o.h);(c.length!=0||o.i.length!=0)&&(k(o.ka,c),k(o.ka,o.i),o.h.i.length=0,x(o.i),o.i.length=0),o.l.ra()}}function wl(o,c,d){var f=d instanceof Wt?nt(d):new Wt(d);if(f.g!="")c&&(f.g=c+"."+f.g),Xr(f,f.s);else{var A=l.location;f=A.protocol,c=c?c+"."+A.hostname:A.hostname,A=+A.port;var S=new Wt(null);f&&Jr(S,f),c&&(S.g=c),A&&Xr(S,A),d&&(S.l=d),f=S}return d=o.D,c=o.ya,d&&c&&te(f,d,c),te(f,"VER",o.la),or(o,f),f}function El(o,c,d){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new oe(new es({eb:d})):new oe(o.pa),c.Ha(o.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Il(){}n=Il.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function os(){}os.prototype.g=function(o,c){return new Oe(o,c)};function Oe(o,c){Ie.call(this),this.g=new dl(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!j(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!j(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new hn(this)}R(Oe,Ie),Oe.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Oe.prototype.close=function(){Oi(this.g)},Oe.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=bi(o),o=d);c.i.push(new kh(c.Ya++,o)),c.G==3&&ss(c)},Oe.prototype.N=function(){this.g.l=null,delete this.j,Oi(this.g),delete this.g,Oe.aa.N.call(this)};function Tl(o){Ri.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const d in c){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}R(Tl,Ri);function bl(){Si.call(this),this.status=1}R(bl,Si);function hn(o){this.g=o}R(hn,Il),hn.prototype.ua=function(){ke(this.g,"a")},hn.prototype.ta=function(o){ke(this.g,new Tl(o))},hn.prototype.sa=function(o){ke(this.g,new bl)},hn.prototype.ra=function(){ke(this.g,"b")},os.prototype.createWebChannel=os.prototype.g,Oe.prototype.send=Oe.prototype.o,Oe.prototype.open=Oe.prototype.m,Oe.prototype.close=Oe.prototype.close,zu=function(){return new os},ju=function(){return Kr()},qu=zt,ao={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Gr.NO_ERROR=0,Gr.TIMEOUT=8,Gr.HTTP_ERROR=6,ws=Gr,Ba.COMPLETE="complete",$u=Ba,La.EventType=Qn,Qn.OPEN="a",Qn.CLOSE="b",Qn.ERROR="c",Qn.MESSAGE="d",Ie.prototype.listen=Ie.prototype.K,ur=La,oe.prototype.listenOnce=oe.prototype.L,oe.prototype.getLastError=oe.prototype.Ka,oe.prototype.getLastErrorCode=oe.prototype.Ba,oe.prototype.getStatus=oe.prototype.Z,oe.prototype.getResponseJson=oe.prototype.Oa,oe.prototype.getResponseText=oe.prototype.oa,oe.prototype.send=oe.prototype.ea,oe.prototype.setWithCredentials=oe.prototype.Ha,Bu=oe}).apply(typeof cs<"u"?cs:typeof self<"u"?self:typeof window<"u"?window:{});const nc="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Re.UNAUTHENTICATED=new Re(null),Re.GOOGLE_CREDENTIALS=new Re("google-credentials-uid"),Re.FIRST_PARTY=new Re("first-party-uid"),Re.MOCK_USER=new Re("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fn="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn=new ko("@firebase/firestore");function ar(){return tn.logLevel}function N(n,...e){if(tn.logLevel<=G.DEBUG){const t=e.map(qo);tn.debug(`Firestore (${Fn}): ${n}`,...t)}}function pt(n,...e){if(tn.logLevel<=G.ERROR){const t=e.map(qo);tn.error(`Firestore (${Fn}): ${n}`,...t)}}function Pn(n,...e){if(tn.logLevel<=G.WARN){const t=e.map(qo);tn.warn(`Firestore (${Fn}): ${n}`,...t)}}function qo(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(n="Unexpected state"){const e=`FIRESTORE (${Fn}) INTERNAL ASSERTION FAILED: `+n;throw pt(e),new Error(e)}function Z(n,e){n||F()}function q(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends gt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Gg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Re.UNAUTHENTICATED))}shutdown(){}}class Qg{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Yg{constructor(e){this.t=e,this.currentUser=Re.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Z(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new ct;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ct,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ct)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Z(typeof r.accessToken=="string"),new Hu(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Z(e===null||typeof e=="string"),new Re(e)}}class Jg{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Re.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Xg{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new Jg(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Re.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Zg{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ey{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Z(this.o===void 0);const r=i=>{i.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Z(typeof t.token=="string"),this.R=t.token,new Zg(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ty(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wu{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=ty(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%e.length))}return r}}function X(n,e){return n<e?-1:n>e?1:0}function Cn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return le.fromMillis(Date.now())}static fromDate(e){return le.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new le(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?X(this.nanoseconds,e.nanoseconds):X(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.timestamp=e}static fromTimestamp(e){return new $(e)}static min(){return new $(new le(0,0))}static max(){return new $(new le(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(e,t,r){t===void 0?t=0:t>e.length&&F(),r===void 0?r=e.length-t:r>e.length-t&&F(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ir.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ir?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=e.get(s),a=t.get(s);if(i<a)return-1;if(i>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ne extends Ir{construct(e,t,r){return new ne(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new ne(t)}static emptyPath(){return new ne([])}}const ny=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ge extends Ir{construct(e,t,r){return new ge(e,t,r)}static isValidIdentifier(e){return ny.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ge.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ge(["__name__"])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new V(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new V(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new V(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ge(t)}static emptyPath(){return new ge([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(ne.fromString(e))}static fromName(e){return new L(ne.fromString(e).popFirst(5))}static empty(){return new L(ne.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ne.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ne.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new ne(e.slice()))}}function ry(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=$.fromTimestamp(r===1e9?new le(t+1,0):new le(t,r));return new Nt(s,L.empty(),e)}function sy(n){return new Nt(n.readTime,n.key,-1)}class Nt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Nt($.min(),L.empty(),-1)}static max(){return new Nt($.max(),L.empty(),-1)}}function iy(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:X(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oy="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ay{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vr(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==oy)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&F(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):C.reject(t)}static resolve(e){return new C((t,r)=>{t(e)})}static reject(e){return new C((t,r)=>{r(e)})}static waitFor(e){return new C((t,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next(s=>s?C.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new C((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next(p=>{a[h]=p,++l,l===i&&r(a)},p=>s(p))}})}static doWhile(e,t){return new C((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function ly(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Nr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}jo.oe=-1;function Js(n){return n==null}function Ls(n){return n===0&&1/n==-1/0}function cy(n){return typeof n=="number"&&Number.isInteger(n)&&!Ls(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function an(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Ku(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e,t){this.comparator=e,this.root=t||me.EMPTY}insert(e,t){return new ie(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,me.BLACK,null,null))}remove(e){return new ie(this.comparator,this.root.remove(e,this.comparator).copy(null,null,me.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new us(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new us(this.root,e,this.comparator,!1)}getReverseIterator(){return new us(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new us(this.root,e,this.comparator,!0)}}class us{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class me{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??me.RED,this.left=s??me.EMPTY,this.right=i??me.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new me(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return me.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return me.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw F();const e=this.left.check();if(e!==this.right.check())throw F();return e+(this.isRed()?0:1)}}me.EMPTY=null,me.RED=!0,me.BLACK=!1;me.EMPTY=new class{constructor(){this.size=0}get key(){throw F()}get value(){throw F()}get color(){throw F()}get left(){throw F()}get right(){throw F()}copy(e,t,r,s,i){return this}insert(e,t,r){return new me(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e){this.comparator=e,this.data=new ie(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new sc(this.data.getIterator())}getIteratorFrom(e){return new sc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ye)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ye(this.comparator);return t.data=e,t}}class sc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.fields=e,e.sort(ge.comparator)}static empty(){return new Ue([])}unionWith(e){let t=new ye(ge.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ue(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Cn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Gu("Invalid base64 string: "+i):i}}(e);return new _e(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new _e(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return X(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}_e.EMPTY_BYTE_STRING=new _e("");const uy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Lt(n){if(Z(!!n),typeof n=="string"){let e=0;const t=uy.exec(n);if(Z(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ae(n.seconds),nanos:ae(n.nanos)}}function ae(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function nn(n){return typeof n=="string"?_e.fromBase64String(n):_e.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zo(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Ho(n){const e=n.mapValue.fields.__previous_value__;return zo(e)?Ho(e):e}function Tr(n){const e=Lt(n.mapValue.fields.__local_write_time__.timestampValue);return new le(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dy{constructor(e,t,r,s,i,a,l,u,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h}}class br{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new br("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof br&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ds={mapValue:{}};function rn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?zo(n)?4:fy(n)?9007199254740991:hy(n)?10:11:F()}function tt(n,e){if(n===e)return!0;const t=rn(n);if(t!==rn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Tr(n).isEqual(Tr(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Lt(s.timestampValue),l=Lt(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return nn(s.bytesValue).isEqual(nn(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return ae(s.geoPointValue.latitude)===ae(i.geoPointValue.latitude)&&ae(s.geoPointValue.longitude)===ae(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return ae(s.integerValue)===ae(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ae(s.doubleValue),l=ae(i.doubleValue);return a===l?Ls(a)===Ls(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return Cn(n.arrayValue.values||[],e.arrayValue.values||[],tt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(rc(a)!==rc(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!tt(a[u],l[u])))return!1;return!0}(n,e);default:return F()}}function Ar(n,e){return(n.values||[]).find(t=>tt(t,e))!==void 0}function kn(n,e){if(n===e)return 0;const t=rn(n),r=rn(e);if(t!==r)return X(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return X(n.booleanValue,e.booleanValue);case 2:return function(i,a){const l=ae(i.integerValue||i.doubleValue),u=ae(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return ic(n.timestampValue,e.timestampValue);case 4:return ic(Tr(n),Tr(e));case 5:return X(n.stringValue,e.stringValue);case 6:return function(i,a){const l=nn(i),u=nn(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const l=i.split("/"),u=a.split("/");for(let h=0;h<l.length&&h<u.length;h++){const p=X(l[h],u[h]);if(p!==0)return p}return X(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const l=X(ae(i.latitude),ae(a.latitude));return l!==0?l:X(ae(i.longitude),ae(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return oc(n.arrayValue,e.arrayValue);case 10:return function(i,a){var l,u,h,p;const y=i.fields||{},_=a.fields||{},w=(l=y.value)===null||l===void 0?void 0:l.arrayValue,R=(u=_.value)===null||u===void 0?void 0:u.arrayValue,x=X(((h=w==null?void 0:w.values)===null||h===void 0?void 0:h.length)||0,((p=R==null?void 0:R.values)===null||p===void 0?void 0:p.length)||0);return x!==0?x:oc(w,R)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===ds.mapValue&&a===ds.mapValue)return 0;if(i===ds.mapValue)return 1;if(a===ds.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),h=a.fields||{},p=Object.keys(h);u.sort(),p.sort();for(let y=0;y<u.length&&y<p.length;++y){const _=X(u[y],p[y]);if(_!==0)return _;const w=kn(l[u[y]],h[p[y]]);if(w!==0)return w}return X(u.length,p.length)}(n.mapValue,e.mapValue);default:throw F()}}function ic(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return X(n,e);const t=Lt(n),r=Lt(e),s=X(t.seconds,r.seconds);return s!==0?s:X(t.nanos,r.nanos)}function oc(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=kn(t[s],r[s]);if(i)return i}return X(t.length,r.length)}function xn(n){return lo(n)}function lo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Lt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return nn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=lo(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${lo(t.fields[a])}`;return s+"}"}(n.mapValue):F()}function ac(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function co(n){return!!n&&"integerValue"in n}function Wo(n){return!!n&&"arrayValue"in n}function lc(n){return!!n&&"nullValue"in n}function cc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Es(n){return!!n&&"mapValue"in n}function hy(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function gr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return an(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=gr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=gr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function fy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.value=e}static empty(){return new Le({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Es(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=gr(t)}setAll(e){let t=ge.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=gr(a):s.push(l.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Es(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return tt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Es(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){an(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Le(gr(this.value))}}function Qu(n){const e=[];return an(n.fields,(t,r)=>{const s=new ge([t]);if(Es(r)){const i=Qu(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Ue(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Se(e,0,$.min(),$.min(),$.min(),Le.empty(),0)}static newFoundDocument(e,t,r,s){return new Se(e,1,t,$.min(),r,s,0)}static newNoDocument(e,t){return new Se(e,2,t,$.min(),$.min(),Le.empty(),0)}static newUnknownDocument(e,t){return new Se(e,3,t,$.min(),$.min(),Le.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual($.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Le.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Le.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=$.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Se&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Se(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e,t){this.position=e,this.inclusive=t}}function uc(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),t.key):r=kn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function dc(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!tt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,t="asc"){this.field=e,this.dir=t}}function py(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{}class ue extends Yu{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new gy(e,t,r):t==="array-contains"?new _y(e,r):t==="in"?new wy(e,r):t==="not-in"?new Ey(e,r):t==="array-contains-any"?new Iy(e,r):new ue(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new yy(e,r):new vy(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(kn(t,this.value)):t!==null&&rn(this.value)===rn(t)&&this.matchesComparison(kn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return F()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class He extends Yu{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new He(e,t)}matches(e){return Ju(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Ju(n){return n.op==="and"}function Xu(n){return my(n)&&Ju(n)}function my(n){for(const e of n.filters)if(e instanceof He)return!1;return!0}function uo(n){if(n instanceof ue)return n.field.canonicalString()+n.op.toString()+xn(n.value);if(Xu(n))return n.filters.map(e=>uo(e)).join(",");{const e=n.filters.map(t=>uo(t)).join(",");return`${n.op}(${e})`}}function Zu(n,e){return n instanceof ue?function(r,s){return s instanceof ue&&r.op===s.op&&r.field.isEqual(s.field)&&tt(r.value,s.value)}(n,e):n instanceof He?function(r,s){return s instanceof He&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,l)=>i&&Zu(a,s.filters[l]),!0):!1}(n,e):void F()}function ed(n){return n instanceof ue?function(t){return`${t.field.canonicalString()} ${t.op} ${xn(t.value)}`}(n):n instanceof He?function(t){return t.op.toString()+" {"+t.getFilters().map(ed).join(" ,")+"}"}(n):"Filter"}class gy extends ue{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class yy extends ue{constructor(e,t){super(e,"in",t),this.keys=td("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class vy extends ue{constructor(e,t){super(e,"not-in",t),this.keys=td("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function td(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>L.fromName(r.referenceValue))}class _y extends ue{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Wo(t)&&Ar(t.arrayValue,this.value)}}class wy extends ue{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ar(this.value.arrayValue,t)}}class Ey extends ue{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ar(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Ar(this.value.arrayValue,t)}}class Iy extends ue{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Wo(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ar(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ty{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.ue=null}}function hc(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Ty(n,e,t,r,s,i,a)}function Ko(n){const e=q(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>uo(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Js(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>xn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>xn(r)).join(",")),e.ue=t}return e.ue}function Go(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!py(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Zu(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!dc(n.startAt,e.startAt)&&dc(n.endAt,e.endAt)}function ho(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function by(n,e,t,r,s,i,a,l){return new Bn(n,e,t,r,s,i,a,l)}function Qo(n){return new Bn(n)}function fc(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function nd(n){return n.collectionGroup!==null}function yr(n){const e=q(n);if(e.ce===null){e.ce=[];const t=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ye(ge.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Rr(i,r))}),t.has(ge.keyField().canonicalString())||e.ce.push(new Rr(ge.keyField(),r))}return e.ce}function Xe(n){const e=q(n);return e.le||(e.le=Ay(e,yr(n))),e.le}function Ay(n,e){if(n.limitType==="F")return hc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Rr(s.field,i)});const t=n.endAt?new Os(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Os(n.startAt.position,n.startAt.inclusive):null;return hc(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function fo(n,e){const t=n.filters.concat([e]);return new Bn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ms(n,e,t){return new Bn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Xs(n,e){return Go(Xe(n),Xe(e))&&n.limitType===e.limitType}function rd(n){return`${Ko(Xe(n))}|lt:${n.limitType}`}function pn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>ed(s)).join(", ")}]`),Js(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>xn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>xn(s)).join(",")),`Target(${r})`}(Xe(n))}; limitType=${n.limitType})`}function Zs(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):L.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of yr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,u){const h=uc(a,l,u);return a.inclusive?h<=0:h<0}(r.startAt,yr(r),s)||r.endAt&&!function(a,l,u){const h=uc(a,l,u);return a.inclusive?h>=0:h>0}(r.endAt,yr(r),s))}(n,e)}function Ry(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function sd(n){return(e,t)=>{let r=!1;for(const s of yr(n)){const i=Sy(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Sy(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):function(i,a,l){const u=a.data.field(i),h=l.data.field(i);return u!==null&&h!==null?kn(u,h):F()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return F()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){an(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Ku(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Py=new ie(L.comparator);function mt(){return Py}const id=new ie(L.comparator);function dr(...n){let e=id;for(const t of n)e=e.insert(t.key,t);return e}function od(n){let e=id;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Qt(){return vr()}function ad(){return vr()}function vr(){return new $n(n=>n.toString(),(n,e)=>n.isEqual(e))}const Cy=new ie(L.comparator),ky=new ye(L.comparator);function K(...n){let e=ky;for(const t of n)e=e.add(t);return e}const xy=new ye(X);function Dy(){return xy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ls(e)?"-0":e}}function ld(n){return{integerValue:""+n}}function Vy(n,e){return cy(e)?ld(e):Yo(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(){this._=void 0}}function Ny(n,e,t){return n instanceof Us?function(s,i){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&zo(i)&&(i=Ho(i)),i&&(a.fields.__previous_value__=i),{mapValue:a}}(t,e):n instanceof Dn?ud(n,e):n instanceof Vn?dd(n,e):function(s,i){const a=cd(s,i),l=pc(a)+pc(s.Pe);return co(a)&&co(s.Pe)?ld(l):Yo(s.serializer,l)}(n,e)}function Ly(n,e,t){return n instanceof Dn?ud(n,e):n instanceof Vn?dd(n,e):t}function cd(n,e){return n instanceof Fs?function(r){return co(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Us extends ei{}class Dn extends ei{constructor(e){super(),this.elements=e}}function ud(n,e){const t=hd(e);for(const r of n.elements)t.some(s=>tt(s,r))||t.push(r);return{arrayValue:{values:t}}}class Vn extends ei{constructor(e){super(),this.elements=e}}function dd(n,e){let t=hd(e);for(const r of n.elements)t=t.filter(s=>!tt(s,r));return{arrayValue:{values:t}}}class Fs extends ei{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function pc(n){return ae(n.integerValue||n.doubleValue)}function hd(n){return Wo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(e,t){this.field=e,this.transform=t}}function Oy(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Dn&&s instanceof Dn||r instanceof Vn&&s instanceof Vn?Cn(r.elements,s.elements,tt):r instanceof Fs&&s instanceof Fs?tt(r.Pe,s.Pe):r instanceof Us&&s instanceof Us}(n.transform,e.transform)}class My{constructor(e,t){this.version=e,this.transformResults=t}}class Ve{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ve}static exists(e){return new Ve(void 0,e)}static updateTime(e){return new Ve(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Is(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ti{}function pd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ni(n.key,Ve.none()):new Lr(n.key,n.data,Ve.none());{const t=n.data,r=Le.empty();let s=new ye(ge.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Bt(n.key,r,new Ue(s.toArray()),Ve.none())}}function Uy(n,e,t){n instanceof Lr?function(s,i,a){const l=s.value.clone(),u=gc(s.fieldTransforms,i,a.transformResults);l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof Bt?function(s,i,a){if(!Is(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=gc(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(md(s)),u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function _r(n,e,t,r){return n instanceof Lr?function(i,a,l,u){if(!Is(i.precondition,a))return l;const h=i.value.clone(),p=yc(i.fieldTransforms,u,a);return h.setAll(p),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Bt?function(i,a,l,u){if(!Is(i.precondition,a))return l;const h=yc(i.fieldTransforms,u,a),p=a.data;return p.setAll(md(i)),p.setAll(h),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(y=>y.field))}(n,e,t,r):function(i,a,l){return Is(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function Fy(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=cd(r.transform,s||null);i!=null&&(t===null&&(t=Le.empty()),t.set(r.field,i))}return t||null}function mc(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Cn(r,s,(i,a)=>Oy(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Lr extends ti{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Bt extends ti{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function md(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function gc(n,e,t){const r=new Map;Z(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,Ly(a,l,t[s]))}return r}function yc(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Ny(i,a,e))}return r}class ni extends ti{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class By extends ti{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Uy(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=_r(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=_r(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=ad();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const u=pd(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument($.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),K())}isEqual(e){return this.batchId===e.batchId&&Cn(this.mutations,e.mutations,(t,r)=>mc(t,r))&&Cn(this.baseMutations,e.baseMutations,(t,r)=>mc(t,r))}}class Jo{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Z(e.mutations.length===r.length);let s=function(){return Cy}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Jo(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ce,Q;function zy(n){switch(n){default:return F();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function gd(n){if(n===void 0)return pt("GRPC error has no .code"),P.UNKNOWN;switch(n){case ce.OK:return P.OK;case ce.CANCELLED:return P.CANCELLED;case ce.UNKNOWN:return P.UNKNOWN;case ce.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ce.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ce.INTERNAL:return P.INTERNAL;case ce.UNAVAILABLE:return P.UNAVAILABLE;case ce.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ce.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ce.NOT_FOUND:return P.NOT_FOUND;case ce.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ce.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ce.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ce.ABORTED:return P.ABORTED;case ce.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ce.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ce.DATA_LOSS:return P.DATA_LOSS;default:return F()}}(Q=ce||(ce={}))[Q.OK=0]="OK",Q[Q.CANCELLED=1]="CANCELLED",Q[Q.UNKNOWN=2]="UNKNOWN",Q[Q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Q[Q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Q[Q.NOT_FOUND=5]="NOT_FOUND",Q[Q.ALREADY_EXISTS=6]="ALREADY_EXISTS",Q[Q.PERMISSION_DENIED=7]="PERMISSION_DENIED",Q[Q.UNAUTHENTICATED=16]="UNAUTHENTICATED",Q[Q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Q[Q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Q[Q.ABORTED=10]="ABORTED",Q[Q.OUT_OF_RANGE=11]="OUT_OF_RANGE",Q[Q.UNIMPLEMENTED=12]="UNIMPLEMENTED",Q[Q.INTERNAL=13]="INTERNAL",Q[Q.UNAVAILABLE=14]="UNAVAILABLE",Q[Q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hy(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wy=new Yt([4294967295,4294967295],0);function vc(n){const e=Hy().encode(n),t=new Fu;return t.update(e),new Uint8Array(t.digest())}function _c(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Yt([t,r],0),new Yt([s,i],0)]}class Xo{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new hr(`Invalid padding: ${t}`);if(r<0)throw new hr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new hr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new hr(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Yt.fromNumber(this.Ie)}Ee(e,t,r){let s=e.add(t.multiply(Yt.fromNumber(r)));return s.compare(Wy)===1&&(s=new Yt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=vc(e),[r,s]=_c(t);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);if(!this.de(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Xo(i,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.Ie===0)return;const t=vc(e),[r,s]=_c(t);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class hr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Or.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ri($.min(),s,new ie(X),mt(),K())}}class Or{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Or(r,t,K(),K(),K())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e,t,r,s){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=s}}class yd{constructor(e,t){this.targetId=e,this.me=t}}class vd{constructor(e,t,r=_e.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class wc{constructor(){this.fe=0,this.ge=Ic(),this.pe=_e.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=K(),t=K(),r=K();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:F()}}),new Or(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=Ic()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Z(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Ky{constructor(e){this.Le=e,this.Be=new Map,this.ke=mt(),this.qe=Ec(),this.Qe=new ie(X)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:F()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,s)=>{this.ze(s)&&t(s)})}He(e){const t=e.targetId,r=e.me.count,s=this.Je(t);if(s){const i=s.target;if(ho(i))if(r===0){const a=new L(i.path);this.Ue(t,a,Se.newNoDocument(a,$.min()))}else Z(r===1);else{const a=this.Ye(t);if(a!==r){const l=this.Ze(e),u=l?this.Xe(l,e,a):1;if(u!==0){this.je(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=nn(r).toUint8Array()}catch(u){if(u instanceof Gu)return Pn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Xo(a,s,i)}catch(u){return Pn(u instanceof hr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(t,i,null),s++)}),s}rt(e){const t=new Map;this.Be.forEach((i,a)=>{const l=this.Je(a);if(l){if(i.current&&ho(l.target)){const u=new L(l.target.path);this.ke.get(u)!==null||this.it(a,u)||this.Ue(a,u,Se.newNoDocument(u,e))}i.be&&(t.set(a,i.ve()),i.Ce())}});let r=K();this.qe.forEach((i,a)=>{let l=!0;a.forEachWhile(u=>{const h=this.Je(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,a)=>a.setReadTime(e));const s=new ri(e,t,this.Qe,this.ke,r);return this.ke=mt(),this.qe=Ec(),this.Qe=new ie(X),s}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new wc,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ye(X),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new wc),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function Ec(){return new ie(L.comparator)}function Ic(){return new ie(L.comparator)}const Gy={asc:"ASCENDING",desc:"DESCENDING"},Qy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Yy={and:"AND",or:"OR"};class Jy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function po(n,e){return n.useProto3Json||Js(e)?e:{value:e}}function Bs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function _d(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Xy(n,e){return Bs(n,e.toTimestamp())}function Ze(n){return Z(!!n),$.fromTimestamp(function(t){const r=Lt(t);return new le(r.seconds,r.nanos)}(n))}function Zo(n,e){return mo(n,e).canonicalString()}function mo(n,e){const t=function(s){return new ne(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function wd(n){const e=ne.fromString(n);return Z(Ad(e)),e}function go(n,e){return Zo(n.databaseId,e.path)}function Ki(n,e){const t=wd(e);if(t.get(1)!==n.databaseId.projectId)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(Id(t))}function Ed(n,e){return Zo(n.databaseId,e)}function Zy(n){const e=wd(n);return e.length===4?ne.emptyPath():Id(e)}function yo(n){return new ne(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Id(n){return Z(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Tc(n,e,t){return{name:go(n,e),fields:t.value.mapValue.fields}}function ev(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:F()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,p){return h.useProto3Json?(Z(p===void 0||typeof p=="string"),_e.fromBase64String(p||"")):(Z(p===void 0||p instanceof Buffer||p instanceof Uint8Array),_e.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(h){const p=h.code===void 0?P.UNKNOWN:gd(h.code);return new V(p,h.message||"")}(a);t=new vd(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ki(n,r.document.name),i=Ze(r.document.updateTime),a=r.document.createTime?Ze(r.document.createTime):$.min(),l=new Le({mapValue:{fields:r.document.fields}}),u=Se.newFoundDocument(s,i,a,l),h=r.targetIds||[],p=r.removedTargetIds||[];t=new Ts(h,p,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Ki(n,r.document),i=r.readTime?Ze(r.readTime):$.min(),a=Se.newNoDocument(s,i),l=r.removedTargetIds||[];t=new Ts([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Ki(n,r.document),i=r.removedTargetIds||[];t=new Ts([],i,s,null)}else{if(!("filter"in e))return F();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new jy(s,i),l=r.targetId;t=new yd(l,a)}}return t}function tv(n,e){let t;if(e instanceof Lr)t={update:Tc(n,e.key,e.value)};else if(e instanceof ni)t={delete:go(n,e.key)};else if(e instanceof Bt)t={update:Tc(n,e.key,e.data),updateMask:uv(e.fieldMask)};else{if(!(e instanceof By))return F();t={verify:go(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const l=a.transform;if(l instanceof Us)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Dn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Vn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Fs)return{fieldPath:a.field.canonicalString(),increment:l.Pe};throw F()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:Xy(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:F()}(n,e.precondition)),t}function nv(n,e){return n&&n.length>0?(Z(e!==void 0),n.map(t=>function(s,i){let a=s.updateTime?Ze(s.updateTime):Ze(i);return a.isEqual($.min())&&(a=Ze(i)),new My(a,s.transformResults||[])}(t,e))):[]}function rv(n,e){return{documents:[Ed(n,e.path)]}}function sv(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Ed(n,s);const i=function(h){if(h.length!==0)return bd(He.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(p=>function(_){return{field:mn(_.field),direction:av(_.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=po(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:t,parent:s}}function iv(n){let e=Zy(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Z(r===1);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=function(y){const _=Td(y);return _ instanceof He&&Xu(_)?_.getFilters():[_]}(t.where));let a=[];t.orderBy&&(a=function(y){return y.map(_=>function(R){return new Rr(gn(R.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(_))}(t.orderBy));let l=null;t.limit&&(l=function(y){let _;return _=typeof y=="object"?y.value:y,Js(_)?null:_}(t.limit));let u=null;t.startAt&&(u=function(y){const _=!!y.before,w=y.values||[];return new Os(w,_)}(t.startAt));let h=null;return t.endAt&&(h=function(y){const _=!y.before,w=y.values||[];return new Os(w,_)}(t.endAt)),by(e,s,a,i,l,"F",u,h)}function ov(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Td(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=gn(t.unaryFilter.field);return ue.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=gn(t.unaryFilter.field);return ue.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=gn(t.unaryFilter.field);return ue.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=gn(t.unaryFilter.field);return ue.create(a,"!=",{nullValue:"NULL_VALUE"});default:return F()}}(n):n.fieldFilter!==void 0?function(t){return ue.create(gn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return F()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return He.create(t.compositeFilter.filters.map(r=>Td(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F()}}(t.compositeFilter.op))}(n):F()}function av(n){return Gy[n]}function lv(n){return Qy[n]}function cv(n){return Yy[n]}function mn(n){return{fieldPath:n.canonicalString()}}function gn(n){return ge.fromServerFormat(n.fieldPath)}function bd(n){return n instanceof ue?function(t){if(t.op==="=="){if(cc(t.value))return{unaryFilter:{field:mn(t.field),op:"IS_NAN"}};if(lc(t.value))return{unaryFilter:{field:mn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(cc(t.value))return{unaryFilter:{field:mn(t.field),op:"IS_NOT_NAN"}};if(lc(t.value))return{unaryFilter:{field:mn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:mn(t.field),op:lv(t.op),value:t.value}}}(n):n instanceof He?function(t){const r=t.getFilters().map(s=>bd(s));return r.length===1?r[0]:{compositeFilter:{op:cv(t.op),filters:r}}}(n):F()}function uv(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Ad(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e,t,r,s,i=$.min(),a=$.min(),l=_e.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Pt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Pt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Pt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Pt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(e){this.ct=e}}function hv(n){const e=iv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ms(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fv{constructor(){this.un=new pv}addToCollectionParentIndex(e,t){return this.un.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(Nt.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(Nt.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class pv{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ye(ne.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ye(ne.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Nn(0)}static kn(){return new Nn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mv{constructor(){this.changes=new $n(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Se.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yv{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&_r(r.mutation,s,Ue.empty(),le.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,K()).next(()=>r))}getLocalViewOfDocuments(e,t,r=K()){const s=Qt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=dr();return i.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Qt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,K()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let i=mt();const a=vr(),l=function(){return vr()}();return t.forEach((u,h)=>{const p=r.get(h.key);s.has(h.key)&&(p===void 0||p.mutation instanceof Bt)?i=i.insert(h.key,h):p!==void 0?(a.set(h.key,p.mutation.getFieldMask()),_r(p.mutation,h,p.mutation.getFieldMask(),le.now())):a.set(h.key,Ue.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((h,p)=>a.set(h,p)),t.forEach((h,p)=>{var y;return l.set(h,new gv(p,(y=a.get(h))!==null&&y!==void 0?y:null))}),l))}recalculateAndSaveOverlays(e,t){const r=vr();let s=new ie((a,l)=>a-l),i=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const h=t.get(u);if(h===null)return;let p=r.get(u)||Ue.empty();p=l.applyToLocalView(h,p),r.set(u,p);const y=(s.get(l.batchId)||K()).add(u);s=s.insert(l.batchId,y)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,p=u.value,y=ad();p.forEach(_=>{if(!i.has(_)){const w=pd(t.get(_),r.get(_));w!==null&&y.set(_,w),i=i.add(_)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,y))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return L.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):nd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):C.resolve(Qt());let l=-1,u=i;return a.next(h=>C.forEach(h,(p,y)=>(l<y.largestBatchId&&(l=y.largestBatchId),i.get(p)?C.resolve():this.remoteDocumentCache.getEntry(e,p).next(_=>{u=u.insert(p,_)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,u,h,K())).next(p=>({batchId:l,changes:od(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(r=>{let s=dr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=dr();return this.indexManager.getCollectionParents(e,i).next(l=>C.forEach(l,u=>{const h=function(y,_){return new Bn(_,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(p=>{p.forEach((y,_)=>{a=a.insert(y,_)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,h)=>{const p=h.getKey();a.get(p)===null&&(a=a.insert(p,Se.newInvalidDocument(p)))});let l=dr();return a.forEach((u,h)=>{const p=i.get(u);p!==void 0&&_r(p.mutation,h,Ue.empty(),le.now()),Zs(t,h)&&(l=l.insert(u,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return C.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Ze(s.createTime)}}(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:hv(s.bundledQuery),readTime:Ze(s.readTime)}}(t)),C.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _v{constructor(){this.overlays=new ie(L.comparator),this.Ir=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Qt();return C.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.ht(e,t,i)}),C.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const s=Qt(),i=t.length+1,a=new L(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return C.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ie((h,p)=>h-p);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let p=i.get(h.largestBatchId);p===null&&(p=Qt(),i=i.insert(h.largestBatchId,p)),p.set(h.getKey(),h)}}const l=Qt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,p)=>l.set(h,p)),!(l.size()>=s)););return C.resolve(l)}ht(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new qy(t,r));let i=this.Ir.get(t);i===void 0&&(i=K(),this.Ir.set(t,i)),this.Ir.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{constructor(){this.sessionToken=_e.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(){this.Tr=new ye(he.Er),this.dr=new ye(he.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new he(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new he(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new L(new ne([])),r=new he(t,e),s=new he(t,e+1),i=[];return this.dr.forEachInRange([r,s],a=>{this.Vr(a),i.push(a.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new L(new ne([])),r=new he(t,e),s=new he(t,e+1);let i=K();return this.dr.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new he(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class he{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return L.comparator(e.key,t.key)||X(e.wr,t.wr)}static Ar(e,t){return X(e.wr,t.wr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ev{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ye(he.Er)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new $y(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.br=this.br.add(new he(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.vr(r),i=s<0?0:s;return C.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new he(t,0),s=new he(t,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],a=>{const l=this.Dr(a.wr);i.push(l)}),C.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ye(X);return t.forEach(s=>{const i=new he(s,0),a=new he(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,a],l=>{r=r.add(l.wr)})}),C.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;L.isDocumentKey(i)||(i=i.child(""));const a=new he(new L(i),0);let l=new ye(X);return this.br.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(u.wr)),!0)},a),C.resolve(this.Cr(l))}Cr(e){const t=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){Z(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return C.forEach(t.mutations,s=>{const i=new he(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new he(t,0),s=this.br.firstAfterOrEqual(r);return C.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iv{constructor(e){this.Mr=e,this.docs=function(){return new ie(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():Se.newInvalidDocument(t))}getEntries(e,t){let r=mt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Se.newInvalidDocument(s))}),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=mt();const a=t.path,l=new L(a.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:p}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||iy(sy(p),r)<=0||(s.has(p.key)||Zs(t,p))&&(i=i.insert(p.key,p.mutableCopy()))}return C.resolve(i)}getAllFromCollectionGroup(e,t,r,s){F()}Or(e,t){return C.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Tv(this)}getSize(e){return C.resolve(this.size)}}class Tv extends mv{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),C.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bv{constructor(e){this.persistence=e,this.Nr=new $n(t=>Ko(t),Go),this.lastRemoteSnapshotVersion=$.min(),this.highestTargetId=0,this.Lr=0,this.Br=new ea,this.targetCount=0,this.kr=Nn.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,s)=>t(s)),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),C.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Nn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.Kn(t),C.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Nr.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.Nr.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),C.waitFor(i).next(()=>s)}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),C.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{constructor(e,t){this.qr={},this.overlays={},this.Qr=new jo(0),this.Kr=!1,this.Kr=!0,this.$r=new wv,this.referenceDelegate=e(this),this.Ur=new bv(this),this.indexManager=new fv,this.remoteDocumentCache=function(s){return new Iv(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new dv(t),this.Gr=new vv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new _v,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new Ev(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){N("MemoryPersistence","Starting transaction:",e);const s=new Rv(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,t){return C.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class Rv extends ay{constructor(e){super(),this.currentSequenceNumber=e}}class ta{constructor(e){this.persistence=e,this.Jr=new ea,this.Yr=null}static Zr(e){return new ta(e)}get Xr(){if(this.Yr)return this.Yr;throw F()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),C.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.Xr,r=>{const s=L.fromPath(r);return this.ei(e,s).next(i=>{i||t.removeEntry(s,$.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return C.or([()=>C.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=s}static Wi(e,t){let r=K(),s=K();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new na(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pv{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return ff()?8:ly(Ce())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.Yi(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.Zi(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Sv;return this.Xi(e,t,a).next(l=>{if(i.result=l,this.zi)return this.es(e,t,a,l.size)})}).next(()=>i.result)}es(e,t,r,s){return r.documentReadCount<this.ji?(ar()<=G.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",pn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),C.resolve()):(ar()<=G.DEBUG&&N("QueryEngine","Query:",pn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(ar()<=G.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",pn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Xe(t))):C.resolve())}Yi(e,t){if(fc(t))return C.resolve(null);let r=Xe(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Ms(t,null,"F"),r=Xe(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=K(...i);return this.Ji.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.ts(t,l);return this.ns(t,h,a,u.readTime)?this.Yi(e,Ms(t,null,"F")):this.rs(e,h,t,u)}))})))}Zi(e,t,r,s){return fc(t)||s.isEqual($.min())?C.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const a=this.ts(t,i);return this.ns(t,a,r,s)?C.resolve(null):(ar()<=G.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),pn(t)),this.rs(e,a,t,ry(s,-1)).next(l=>l))})}ts(e,t){let r=new ye(sd(e));return t.forEach((s,i)=>{Zs(e,i)&&(r=r.add(i))}),r}ns(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,t,r){return ar()<=G.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",pn(t)),this.Ji.getDocumentsMatchingQuery(e,t,Nt.min(),r)}rs(e,t,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cv{constructor(e,t,r,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new ie(X),this._s=new $n(i=>Ko(i),Go),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new yv(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function kv(n,e,t,r){return new Cv(n,e,t,r)}async function Rd(n,e){const t=q(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let u=K();for(const h of s){a.push(h.batchId);for(const p of h.mutations)u=u.add(p.key)}for(const h of i){l.push(h.batchId);for(const p of h.mutations)u=u.add(p.key)}return t.localDocuments.getDocuments(r,u).next(h=>({hs:h,removedBatchIds:a,addedBatchIds:l}))})})}function xv(n,e){const t=q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,h,p){const y=h.batch,_=y.keys();let w=C.resolve();return _.forEach(R=>{w=w.next(()=>p.getEntry(u,R)).next(x=>{const k=h.docVersions.get(R);Z(k!==null),x.version.compareTo(k)<0&&(y.applyToRemoteDocument(x,h),x.isValidDocument()&&(x.setReadTime(h.commitVersion),p.addEntry(x)))})}),w.next(()=>l.mutationQueue.removeMutationBatch(u,y))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=K();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Sd(n){const e=q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Dv(n,e){const t=q(n),r=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const l=[];e.targetChanges.forEach((p,y)=>{const _=s.get(y);if(!_)return;l.push(t.Ur.removeMatchingKeys(i,p.removedDocuments,y).next(()=>t.Ur.addMatchingKeys(i,p.addedDocuments,y)));let w=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(y)!==null?w=w.withResumeToken(_e.EMPTY_BYTE_STRING,$.min()).withLastLimboFreeSnapshotVersion($.min()):p.resumeToken.approximateByteSize()>0&&(w=w.withResumeToken(p.resumeToken,r)),s=s.insert(y,w),function(x,k,B){return x.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=3e8?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0}(_,w,p)&&l.push(t.Ur.updateTargetData(i,w))});let u=mt(),h=K();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))}),l.push(Vv(i,a,e.documentUpdates).next(p=>{u=p.Ps,h=p.Is})),!r.isEqual($.min())){const p=t.Ur.getLastRemoteSnapshotVersion(i).next(y=>t.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(p)}return C.waitFor(l).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,h)).next(()=>u)}).then(i=>(t.os=s,i))}function Vv(n,e,t){let r=K(),s=K();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=mt();return t.forEach((l,u)=>{const h=i.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual($.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):N("LocalStore","Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ps:a,Is:s}})}function Nv(n,e){const t=q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Lv(n,e){const t=q(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Ur.getTargetData(r,e).next(i=>i?(s=i,C.resolve(s)):t.Ur.allocateTargetId(r).next(a=>(s=new Pt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r})}async function vo(n,e,t){const r=q(n),s=r.os.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Nr(a))throw a;N("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function bc(n,e,t){const r=q(n);let s=$.min(),i=K();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,h,p){const y=q(u),_=y._s.get(p);return _!==void 0?C.resolve(y.os.get(_)):y.Ur.getTargetData(h,p)}(r,a,Xe(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,l.targetId).next(u=>{i=u})}).next(()=>r.ss.getDocumentsMatchingQuery(a,e,t?s:$.min(),t?i:K())).next(l=>(Ov(r,Ry(e),l),{documents:l,Ts:i})))}function Ov(n,e,t){let r=n.us.get(e)||$.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.us.set(e,r)}class Ac{constructor(){this.activeTargetIds=Dy()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Mv{constructor(){this.so=new Ac,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Ac,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uv{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){N("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){N("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hs=null;function Gi(){return hs===null?hs=function(){return 268435456+Math.round(2147483648*Math.random())}():hs++,"0x"+hs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bv{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ae="WebChannelConnection";class $v extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(t,r,s,i,a){const l=Gi(),u=this.xo(t,r.toUriEncodedString());N("RestConnection",`Sending RPC '${t}' ${l}:`,u,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,i,a),this.No(t,u,h,s).then(p=>(N("RestConnection",`Received RPC '${t}' ${l}: `,p),p),p=>{throw Pn("RestConnection",`RPC '${t}' ${l} failed with error: `,p,"url: ",u,"request:",s),p})}Lo(t,r,s,i,a,l){return this.Mo(t,r,s,i,a)}Oo(t,r,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Fn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,a)=>t[a]=i),s&&s.headers.forEach((i,a)=>t[a]=i)}xo(t,r){const s=Fv[t];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,s){const i=Gi();return new Promise((a,l)=>{const u=new Bu;u.setWithCredentials(!0),u.listenOnce($u.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case ws.NO_ERROR:const p=u.getResponseJson();N(Ae,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(p)),a(p);break;case ws.TIMEOUT:N(Ae,`RPC '${e}' ${i} timed out`),l(new V(P.DEADLINE_EXCEEDED,"Request time out"));break;case ws.HTTP_ERROR:const y=u.getStatus();if(N(Ae,`RPC '${e}' ${i} failed with status:`,y,"response text:",u.getResponseText()),y>0){let _=u.getResponseJson();Array.isArray(_)&&(_=_[0]);const w=_==null?void 0:_.error;if(w&&w.status&&w.message){const R=function(k){const B=k.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(B)>=0?B:P.UNKNOWN}(w.status);l(new V(R,w.message))}else l(new V(P.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new V(P.UNAVAILABLE,"Connection failed."));break;default:F()}}finally{N(Ae,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);N(Ae,`RPC '${e}' ${i} sending request:`,s),u.send(t,"POST",h,r,15)})}Bo(e,t,r){const s=Gi(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=zu(),l=ju(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const p=i.join("");N(Ae,`Creating RPC '${e}' stream ${s}: ${p}`,u);const y=a.createWebChannel(p,u);let _=!1,w=!1;const R=new Bv({Io:k=>{w?N(Ae,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(_||(N(Ae,`Opening RPC '${e}' stream ${s} transport.`),y.open(),_=!0),N(Ae,`RPC '${e}' stream ${s} sending:`,k),y.send(k))},To:()=>y.close()}),x=(k,B,j)=>{k.listen(B,U=>{try{j(U)}catch(Y){setTimeout(()=>{throw Y},0)}})};return x(y,ur.EventType.OPEN,()=>{w||(N(Ae,`RPC '${e}' stream ${s} transport opened.`),R.yo())}),x(y,ur.EventType.CLOSE,()=>{w||(w=!0,N(Ae,`RPC '${e}' stream ${s} transport closed`),R.So())}),x(y,ur.EventType.ERROR,k=>{w||(w=!0,Pn(Ae,`RPC '${e}' stream ${s} transport errored:`,k),R.So(new V(P.UNAVAILABLE,"The operation could not be completed")))}),x(y,ur.EventType.MESSAGE,k=>{var B;if(!w){const j=k.data[0];Z(!!j);const U=j,Y=U.error||((B=U[0])===null||B===void 0?void 0:B.error);if(Y){N(Ae,`RPC '${e}' stream ${s} received error:`,Y);const z=Y.status;let W=function(g){const I=ce[g];if(I!==void 0)return gd(I)}(z),E=Y.message;W===void 0&&(W=P.INTERNAL,E="Unknown error status: "+z+" with message "+Y.message),w=!0,R.So(new V(W,E)),y.close()}else N(Ae,`RPC '${e}' stream ${s} received:`,j),R.bo(j)}}),x(l,qu.STAT_EVENT,k=>{k.stat===ao.PROXY?N(Ae,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===ao.NOPROXY&&N(Ae,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{R.wo()},0),R}}function Qi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function si(n){return new Jy(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(e,t,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e,t,r,s,i,a,l,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Pd(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(pt(t.toString()),pt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===t&&this.P_(r,s)},r=>{e(()=>{const s=new V(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return N("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(N("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class qv extends Cd{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=ev(this.serializer,e),r=function(i){if(!("targetChange"in i))return $.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?$.min():a.readTime?Ze(a.readTime):$.min()}(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=yo(this.serializer),t.addTarget=function(i,a){let l;const u=a.target;if(l=ho(u)?{documents:rv(i,u)}:{query:sv(i,u)._t},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=_d(i,a.resumeToken);const h=po(i,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo($.min())>0){l.readTime=Bs(i,a.snapshotVersion.toTimestamp());const h=po(i,a.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=ov(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=yo(this.serializer),t.removeTarget=e,this.a_(t)}}class jv extends Cd{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Z(!!e.streamToken),this.lastStreamToken=e.streamToken,Z(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Z(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=nv(e.writeResults,e.commitTime),r=Ze(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=yo(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>tv(this.serializer,r))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zv extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Mo(e,mo(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new V(P.UNKNOWN,i.toString())})}Lo(e,t,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Lo(e,mo(t,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(P.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class Hv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(pt(t),this.D_=!1):N("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wv{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(a=>{r.enqueueAndForget(async()=>{ln(this)&&(N("RemoteStore","Restarting streams for network reachability change."),await async function(u){const h=q(u);h.L_.add(4),await Mr(h),h.q_.set("Unknown"),h.L_.delete(4),await ii(h)}(this))})}),this.q_=new Hv(r,s)}}async function ii(n){if(ln(n))for(const e of n.B_)await e(!0)}async function Mr(n){for(const e of n.B_)await e(!1)}function kd(n,e){const t=q(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),oa(t)?ia(t):qn(t).r_()&&sa(t,e))}function ra(n,e){const t=q(n),r=qn(t);t.N_.delete(e),r.r_()&&xd(t,e),t.N_.size===0&&(r.r_()?r.o_():ln(t)&&t.q_.set("Unknown"))}function sa(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo($.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}qn(n).A_(e)}function xd(n,e){n.Q_.xe(e),qn(n).R_(e)}function ia(n){n.Q_=new Ky({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),qn(n).start(),n.q_.v_()}function oa(n){return ln(n)&&!qn(n).n_()&&n.N_.size>0}function ln(n){return q(n).L_.size===0}function Dd(n){n.Q_=void 0}async function Kv(n){n.q_.set("Online")}async function Gv(n){n.N_.forEach((e,t)=>{sa(n,e)})}async function Qv(n,e){Dd(n),oa(n)?(n.q_.M_(e),ia(n)):n.q_.set("Unknown")}async function Yv(n,e,t){if(n.q_.set("Online"),e instanceof vd&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.N_.delete(l),s.Q_.removeTarget(l))}(n,e)}catch(r){N("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await $s(n,r)}else if(e instanceof Ts?n.Q_.Ke(e):e instanceof yd?n.Q_.He(e):n.Q_.We(e),!t.isEqual($.min()))try{const r=await Sd(n.localStore);t.compareTo(r)>=0&&await function(i,a){const l=i.Q_.rt(a);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const p=i.N_.get(h);p&&i.N_.set(h,p.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,h)=>{const p=i.N_.get(u);if(!p)return;i.N_.set(u,p.withResumeToken(_e.EMPTY_BYTE_STRING,p.snapshotVersion)),xd(i,u);const y=new Pt(p.target,u,h,p.sequenceNumber);sa(i,y)}),i.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){N("RemoteStore","Failed to raise snapshot:",r),await $s(n,r)}}async function $s(n,e,t){if(!Nr(e))throw e;n.L_.add(1),await Mr(n),n.q_.set("Offline"),t||(t=()=>Sd(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{N("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await ii(n)})}function Vd(n,e){return e().catch(t=>$s(n,t,e))}async function oi(n){const e=q(n),t=Ot(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;Jv(e);)try{const s=await Nv(e.localStore,r);if(s===null){e.O_.length===0&&t.o_();break}r=s.batchId,Xv(e,s)}catch(s){await $s(e,s)}Nd(e)&&Ld(e)}function Jv(n){return ln(n)&&n.O_.length<10}function Xv(n,e){n.O_.push(e);const t=Ot(n);t.r_()&&t.V_&&t.m_(e.mutations)}function Nd(n){return ln(n)&&!Ot(n).n_()&&n.O_.length>0}function Ld(n){Ot(n).start()}async function Zv(n){Ot(n).p_()}async function e_(n){const e=Ot(n);for(const t of n.O_)e.m_(t.mutations)}async function t_(n,e,t){const r=n.O_.shift(),s=Jo.from(r,e,t);await Vd(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await oi(n)}async function n_(n,e){e&&Ot(n).V_&&await async function(r,s){if(function(a){return zy(a)&&a!==P.ABORTED}(s.code)){const i=r.O_.shift();Ot(r).s_(),await Vd(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await oi(r)}}(n,e),Nd(n)&&Ld(n)}async function Sc(n,e){const t=q(n);t.asyncQueue.verifyOperationInProgress(),N("RemoteStore","RemoteStore received new credentials");const r=ln(t);t.L_.add(3),await Mr(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await ii(t)}async function r_(n,e){const t=q(n);e?(t.L_.delete(2),await ii(t)):e||(t.L_.add(2),await Mr(t),t.q_.set("Unknown"))}function qn(n){return n.K_||(n.K_=function(t,r,s){const i=q(t);return i.w_(),new qv(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Eo:Kv.bind(null,n),Ro:Gv.bind(null,n),mo:Qv.bind(null,n),d_:Yv.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),oa(n)?ia(n):n.q_.set("Unknown")):(await n.K_.stop(),Dd(n))})),n.K_}function Ot(n){return n.U_||(n.U_=function(t,r,s){const i=q(t);return i.w_(),new jv(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Zv.bind(null,n),mo:n_.bind(null,n),f_:e_.bind(null,n),g_:t_.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await oi(n)):(await n.U_.stop(),n.O_.length>0&&(N("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new ct,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new aa(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function la(n,e){if(pt("AsyncQueue",`${e}: ${n}`),Nr(n))return new V(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=dr(),this.sortedSet=new ie(this.comparator)}static emptySet(e){return new bn(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof bn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new bn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(){this.W_=new ie(L.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):F():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Ln{constructor(e,t,r,s,i,a,l,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new Ln(e,t,bn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Xs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class i_{constructor(){this.queries=Cc(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const s=q(t),i=s.queries;s.queries=Cc(),i.forEach((a,l)=>{for(const u of l.j_)u.onError(r)})})(this,new V(P.ABORTED,"Firestore shutting down"))}}function Cc(){return new $n(n=>rd(n),Xs)}async function Od(n,e){const t=q(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new s_,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await t.onListen(s,!0);break;case 1:i.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=la(a,`Initialization of query '${pn(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.j_.push(e),e.Z_(t.onlineState),i.z_&&e.X_(i.z_)&&ca(t)}async function Md(n,e){const t=q(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.j_.indexOf(e);a>=0&&(i.j_.splice(a,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function o_(n,e){const t=q(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.j_)l.X_(s)&&(r=!0);a.z_=s}}r&&ca(t)}function a_(n,e,t){const r=q(n),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(t);r.queries.delete(e)}function ca(n){n.Y_.forEach(e=>{e.next()})}var _o,kc;(kc=_o||(_o={})).ea="default",kc.Cache="cache";class Ud{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Ln(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Ln.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==_o.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(e){this.key=e}}class Bd{constructor(e){this.key=e}}class l_{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=K(),this.mutatedKeys=K(),this.Aa=sd(e),this.Ra=new bn(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new Pc,s=t?t.Ra:this.Ra;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,y)=>{const _=s.get(p),w=Zs(this.query,y)?y:null,R=!!_&&this.mutatedKeys.has(_.key),x=!!w&&(w.hasLocalMutations||this.mutatedKeys.has(w.key)&&w.hasCommittedMutations);let k=!1;_&&w?_.data.isEqual(w.data)?R!==x&&(r.track({type:3,doc:w}),k=!0):this.ga(_,w)||(r.track({type:2,doc:w}),k=!0,(u&&this.Aa(w,u)>0||h&&this.Aa(w,h)<0)&&(l=!0)):!_&&w?(r.track({type:0,doc:w}),k=!0):_&&!w&&(r.track({type:1,doc:_}),k=!0,(u||h)&&(l=!0)),k&&(w?(a=a.add(w),i=x?i.add(p):i.delete(p)):(a=a.delete(p),i=i.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{Ra:a,fa:r,ns:l,mutatedKeys:i}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((p,y)=>function(w,R){const x=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F()}};return x(w)-x(R)}(p.type,y.type)||this.Aa(p.doc,y.doc)),this.pa(r),s=s!=null&&s;const l=t&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,h=u!==this.Ea;return this.Ea=u,a.length!==0||h?{snapshot:new Ln(this.query,e.Ra,i,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Pc,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=K(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const t=[];return e.forEach(r=>{this.da.has(r)||t.push(new Bd(r))}),this.da.forEach(r=>{e.has(r)||t.push(new Fd(r))}),t}ba(e){this.Ta=e.Ts,this.da=K();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Ln.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class c_{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class u_{constructor(e){this.key=e,this.va=!1}}class d_{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new $n(l=>rd(l),Xs),this.Ma=new Map,this.xa=new Set,this.Oa=new ie(L.comparator),this.Na=new Map,this.La=new ea,this.Ba={},this.ka=new Map,this.qa=Nn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function h_(n,e,t=!0){const r=Wd(n);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await $d(r,e,t,!0),s}async function f_(n,e){const t=Wd(n);await $d(t,e,!0,!1)}async function $d(n,e,t,r){const s=await Lv(n.localStore,Xe(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await p_(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&kd(n.remoteStore,s),l}async function p_(n,e,t,r,s){n.Ka=(y,_,w)=>async function(x,k,B,j){let U=k.view.ma(B);U.ns&&(U=await bc(x.localStore,k.query,!1).then(({documents:E})=>k.view.ma(E,U)));const Y=j&&j.targetChanges.get(k.targetId),z=j&&j.targetMismatches.get(k.targetId)!=null,W=k.view.applyChanges(U,x.isPrimaryClient,Y,z);return Dc(x,k.targetId,W.wa),W.snapshot}(n,y,_,w);const i=await bc(n.localStore,e,!0),a=new l_(e,i.Ts),l=a.ma(i.documents),u=Or.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(l,n.isPrimaryClient,u);Dc(n,t,h.wa);const p=new c_(e,t,a);return n.Fa.set(e,p),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),h.snapshot}async function m_(n,e,t){const r=q(n),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(a=>!Xs(a,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await vo(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ra(r.remoteStore,s.targetId),wo(r,s.targetId)}).catch(Vr)):(wo(r,s.targetId),await vo(r.localStore,s.targetId,!0))}async function g_(n,e){const t=q(n),r=t.Fa.get(e),s=t.Ma.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ra(t.remoteStore,r.targetId))}async function y_(n,e,t){const r=b_(n);try{const s=await function(a,l){const u=q(a),h=le.now(),p=l.reduce((w,R)=>w.add(R.key),K());let y,_;return u.persistence.runTransaction("Locally write mutations","readwrite",w=>{let R=mt(),x=K();return u.cs.getEntries(w,p).next(k=>{R=k,R.forEach((B,j)=>{j.isValidDocument()||(x=x.add(B))})}).next(()=>u.localDocuments.getOverlayedDocuments(w,R)).next(k=>{y=k;const B=[];for(const j of l){const U=Fy(j,y.get(j.key).overlayedDocument);U!=null&&B.push(new Bt(j.key,U,Qu(U.value.mapValue),Ve.exists(!0)))}return u.mutationQueue.addMutationBatch(w,h,B,l)}).next(k=>{_=k;const B=k.applyToLocalDocumentSet(y,x);return u.documentOverlayCache.saveOverlays(w,k.batchId,B)})}).then(()=>({batchId:_.batchId,changes:od(y)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,u){let h=a.Ba[a.currentUser.toKey()];h||(h=new ie(X)),h=h.insert(l,u),a.Ba[a.currentUser.toKey()]=h}(r,s.batchId,t),await Ur(r,s.changes),await oi(r.remoteStore)}catch(s){const i=la(s,"Failed to persist write");t.reject(i)}}async function qd(n,e){const t=q(n);try{const r=await Dv(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Na.get(i);a&&(Z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?Z(a.va):s.removedDocuments.size>0&&(Z(a.va),a.va=!1))}),await Ur(t,r,e)}catch(r){await Vr(r)}}function xc(n,e,t){const r=q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Fa.forEach((i,a)=>{const l=a.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const u=q(a);u.onlineState=l;let h=!1;u.queries.forEach((p,y)=>{for(const _ of y.j_)_.Z_(l)&&(h=!0)}),h&&ca(u)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function v_(n,e,t){const r=q(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Na.get(e),i=s&&s.key;if(i){let a=new ie(L.comparator);a=a.insert(i,Se.newNoDocument(i,$.min()));const l=K().add(i),u=new ri($.min(),new Map,new ie(X),a,l);await qd(r,u),r.Oa=r.Oa.remove(i),r.Na.delete(e),ua(r)}else await vo(r.localStore,e,!1).then(()=>wo(r,e,t)).catch(Vr)}async function __(n,e){const t=q(n),r=e.batch.batchId;try{const s=await xv(t.localStore,e);zd(t,r,null),jd(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Ur(t,s)}catch(s){await Vr(s)}}async function w_(n,e,t){const r=q(n);try{const s=await function(a,l){const u=q(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let p;return u.mutationQueue.lookupMutationBatch(h,l).next(y=>(Z(y!==null),p=y.keys(),u.mutationQueue.removeMutationBatch(h,y))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,p,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,p)).next(()=>u.localDocuments.getDocuments(h,p))})}(r.localStore,e);zd(r,e,t),jd(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Ur(r,s)}catch(s){await Vr(s)}}function jd(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function zd(n,e,t){const r=q(n);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function wo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(r=>{n.La.containsKey(r)||Hd(n,r)})}function Hd(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(ra(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),ua(n))}function Dc(n,e,t){for(const r of t)r instanceof Fd?(n.La.addReference(r.key,e),E_(n,r)):r instanceof Bd?(N("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||Hd(n,r.key)):F()}function E_(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(N("SyncEngine","New document in limbo: "+t),n.xa.add(r),ua(n))}function ua(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new L(ne.fromString(e)),r=n.qa.next();n.Na.set(r,new u_(t)),n.Oa=n.Oa.insert(t,r),kd(n.remoteStore,new Pt(Xe(Qo(t.path)),r,"TargetPurposeLimboResolution",jo.oe))}}async function Ur(n,e,t){const r=q(n),s=[],i=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{a.push(r.Ka(u,e,t).then(h=>{var p;if((h||t)&&r.isPrimaryClient){const y=h?!h.fromCache:(p=t==null?void 0:t.targetChanges.get(u.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(u.targetId,y?"current":"not-current")}if(h){s.push(h);const y=na.Wi(u.targetId,h);i.push(y)}}))}),await Promise.all(a),r.Ca.d_(s),await async function(u,h){const p=q(u);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>C.forEach(h,_=>C.forEach(_.$i,w=>p.persistence.referenceDelegate.addReference(y,_.targetId,w)).next(()=>C.forEach(_.Ui,w=>p.persistence.referenceDelegate.removeReference(y,_.targetId,w)))))}catch(y){if(!Nr(y))throw y;N("LocalStore","Failed to update sequence numbers: "+y)}for(const y of h){const _=y.targetId;if(!y.fromCache){const w=p.os.get(_),R=w.snapshotVersion,x=w.withLastLimboFreeSnapshotVersion(R);p.os=p.os.insert(_,x)}}}(r.localStore,i))}async function I_(n,e){const t=q(n);if(!t.currentUser.isEqual(e)){N("SyncEngine","User change. New user:",e.toKey());const r=await Rd(t.localStore,e);t.currentUser=e,function(i,a){i.ka.forEach(l=>{l.forEach(u=>{u.reject(new V(P.CANCELLED,a))})}),i.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ur(t,r.hs)}}function T_(n,e){const t=q(n),r=t.Na.get(e);if(r&&r.va)return K().add(r.key);{let s=K();const i=t.Ma.get(e);if(!i)return s;for(const a of i){const l=t.Fa.get(a);s=s.unionWith(l.view.Va)}return s}}function Wd(n){const e=q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=qd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=T_.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=v_.bind(null,e),e.Ca.d_=o_.bind(null,e.eventManager),e.Ca.$a=a_.bind(null,e.eventManager),e}function b_(n){const e=q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=__.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=w_.bind(null,e),e}class qs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=si(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return kv(this.persistence,new Pv,e.initialUser,this.serializer)}Ga(e){return new Av(ta.Zr,this.serializer)}Wa(e){return new Mv}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}qs.provider={build:()=>new qs};class Eo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>xc(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=I_.bind(null,this.syncEngine),await r_(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new i_}()}createDatastore(e){const t=si(e.databaseInfo.databaseId),r=function(i){return new $v(i)}(e.databaseInfo);return function(i,a,l,u){return new zv(i,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,l){return new Wv(r,s,i,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>xc(this.syncEngine,t,0),function(){return Rc.D()?new Rc:new Uv}())}createSyncEngine(e,t){return function(s,i,a,l,u,h,p){const y=new d_(s,i,a,l,u,h);return p&&(y.Qa=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=q(s);N("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Mr(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Eo.provider={build:()=>new Eo};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):pt("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Re.UNAUTHENTICATED,this.clientId=Wu.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{N("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(N("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ct;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=la(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Yi(n,e){n.asyncQueue.verifyOperationInProgress(),N("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Rd(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Vc(n,e){n.asyncQueue.verifyOperationInProgress();const t=await R_(n);N("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Sc(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Sc(e.remoteStore,s)),n._onlineComponents=e}async function R_(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N("FirestoreClient","Using user provided OfflineComponentProvider");try{await Yi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Pn("Error using user provided cache. Falling back to memory cache: "+t),await Yi(n,new qs)}}else N("FirestoreClient","Using default OfflineComponentProvider"),await Yi(n,new qs);return n._offlineComponents}async function Gd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N("FirestoreClient","Using user provided OnlineComponentProvider"),await Vc(n,n._uninitializedComponentsProvider._online)):(N("FirestoreClient","Using default OnlineComponentProvider"),await Vc(n,new Eo))),n._onlineComponents}function S_(n){return Gd(n).then(e=>e.syncEngine)}async function Qd(n){const e=await Gd(n),t=e.eventManager;return t.onListen=h_.bind(null,e.syncEngine),t.onUnlisten=m_.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=f_.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=g_.bind(null,e.syncEngine),t}function P_(n,e,t={}){const r=new ct;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,h){const p=new Kd({next:_=>{p.Za(),a.enqueueAndForget(()=>Md(i,y));const w=_.docs.has(l);!w&&_.fromCache?h.reject(new V(P.UNAVAILABLE,"Failed to get document because the client is offline.")):w&&_.fromCache&&u&&u.source==="server"?h.reject(new V(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(_)},error:_=>h.reject(_)}),y=new Ud(Qo(l.path),p,{includeMetadataChanges:!0,_a:!0});return Od(i,y)}(await Qd(n),n.asyncQueue,e,t,r)),r.promise}function C_(n,e,t={}){const r=new ct;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,h){const p=new Kd({next:_=>{p.Za(),a.enqueueAndForget(()=>Md(i,y)),_.fromCache&&u.source==="server"?h.reject(new V(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),y=new Ud(l,p,{includeMetadataChanges:!0,_a:!0});return Od(i,y)}(await Qd(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yd(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nc=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jd(n,e,t){if(!t)throw new V(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function k_(n,e,t,r){if(e===!0&&r===!0)throw new V(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Lc(n){if(!L.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Oc(n){if(L.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ai(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":F()}function Be(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ai(n);throw new V(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new V(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}k_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Yd((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class li{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Mc({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Mc(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Gg;switch(r.type){case"firstParty":return new Xg(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Nc.get(t);r&&(N("ComponentProvider","Removing Datastore"),Nc.delete(t),r.terminate())}(this),Promise.resolve()}}function x_(n,e,t,r={}){var s;const i=(n=Be(n,li))._getSettings(),a=`${e}:${t}`;if(i.host!=="firestore.googleapis.com"&&i.host!==a&&Pn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},i),{host:a,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=Re.MOCK_USER;else{l=of(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new V(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Re(h)}n._authCredentials=new Qg(new Hu(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new $t(this.firestore,e,this._query)}}class Ne{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Vt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ne(this.firestore,e,this._key)}}class Vt extends $t{constructor(e,t,r){super(e,t,Qo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ne(this.firestore,null,new L(e))}withConverter(e){return new Vt(this.firestore,e,this._path)}}function De(n,e,...t){if(n=se(n),Jd("collection","path",e),n instanceof li){const r=ne.fromString(e,...t);return Oc(r),new Vt(n,null,r)}{if(!(n instanceof Ne||n instanceof Vt))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ne.fromString(e,...t));return Oc(r),new Vt(n.firestore,null,r)}}function re(n,e,...t){if(n=se(n),arguments.length===1&&(e=Wu.newId()),Jd("doc","path",e),n instanceof li){const r=ne.fromString(e,...t);return Lc(r),new Ne(n,null,new L(r))}{if(!(n instanceof Ne||n instanceof Vt))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ne.fromString(e,...t));return Lc(r),new Ne(n.firestore,n instanceof Vt?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uc{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Pd(this,"async_queue_retry"),this.Vu=()=>{const r=Qi();r&&N("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=Qi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Qi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new ct;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Nr(e))throw e;N("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l}(r);throw pt("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=aa.createAndSchedule(this,e,t,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&F()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class qt extends li{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Uc,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Uc(e),this._firestoreClient=void 0,await e}}}function D_(n,e){const t=typeof n=="object"?n:eu(),r=typeof n=="string"?n:"(default)",s=Do(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=rf("firestore");i&&x_(s,...i)}return s}function ci(n){if(n._terminated)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||V_(n),n._firestoreClient}function V_(n){var e,t,r;const s=n._freezeSettings(),i=function(l,u,h,p){return new dy(l,u,h,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Yd(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new A_(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e){this._byteString=e}static fromBase64String(e){try{return new On(_e.fromBase64String(e))}catch(t){throw new V(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new On(_e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ge(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return X(this._lat,e._lat)||X(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_=/^__.*__$/;class L_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Bt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Lr(e,this.data,t,this.fieldTransforms)}}class Xd{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Bt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Zd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F()}}class ui{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new ui(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return js(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Zd(this.Cu)&&N_.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class O_{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||si(e)}Qu(e,t,r,s=!1){return new ui({Cu:e,methodName:t,qu:r,path:ge.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function $r(n){const e=n._freezeSettings(),t=si(n._databaseId);return new O_(n._databaseId,!!e.ignoreUndefinedProperties,t)}function fa(n,e,t,r,s,i={}){const a=n.Qu(i.merge||i.mergeFields?2:0,e,t,s);ga("Data must be an object, but it was:",a,r);const l=rh(r,a);let u,h;if(i.merge)u=new Ue(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const p=[];for(const y of i.mergeFields){const _=Io(e,y,t);if(!a.contains(_))throw new V(P.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);ih(p,_)||p.push(_)}u=new Ue(p),h=a.fieldTransforms.filter(y=>u.covers(y.field))}else u=null,h=a.fieldTransforms;return new L_(new Le(l),u,h)}class di extends Br{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof di}}function eh(n,e,t){return new ui({Cu:3,qu:e.settings.qu,methodName:n._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class pa extends Br{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=eh(this,e,!0),r=this.Ku.map(i=>cn(i,t)),s=new Dn(r);return new fd(e.path,s)}isEqual(e){return e instanceof pa&&An(this.Ku,e.Ku)}}class ma extends Br{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=eh(this,e,!0),r=this.Ku.map(i=>cn(i,t)),s=new Vn(r);return new fd(e.path,s)}isEqual(e){return e instanceof ma&&An(this.Ku,e.Ku)}}function th(n,e,t,r){const s=n.Qu(1,e,t);ga("Data must be an object, but it was:",s,r);const i=[],a=Le.empty();an(r,(u,h)=>{const p=ya(e,u,t);h=se(h);const y=s.Nu(p);if(h instanceof di)i.push(p);else{const _=cn(h,y);_!=null&&(i.push(p),a.set(p,_))}});const l=new Ue(i);return new Xd(a,l,s.fieldTransforms)}function nh(n,e,t,r,s,i){const a=n.Qu(1,e,t),l=[Io(e,r,t)],u=[s];if(i.length%2!=0)throw new V(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<i.length;_+=2)l.push(Io(e,i[_])),u.push(i[_+1]);const h=[],p=Le.empty();for(let _=l.length-1;_>=0;--_)if(!ih(h,l[_])){const w=l[_];let R=u[_];R=se(R);const x=a.Nu(w);if(R instanceof di)h.push(w);else{const k=cn(R,x);k!=null&&(h.push(w),p.set(w,k))}}const y=new Ue(h);return new Xd(p,y,a.fieldTransforms)}function M_(n,e,t,r=!1){return cn(t,n.Qu(r?4:3,e))}function cn(n,e){if(sh(n=se(n)))return ga("Unsupported field value:",e,n),rh(n,e);if(n instanceof Br)return function(r,s){if(!Zd(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const l of r){let u=cn(l,s.Lu(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=se(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Vy(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=le.fromDate(r);return{timestampValue:Bs(s.serializer,i)}}if(r instanceof le){const i=new le(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Bs(s.serializer,i)}}if(r instanceof da)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof On)return{bytesValue:_d(s.serializer,r._byteString)};if(r instanceof Ne){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Zo(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ha)return function(a,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return Yo(l.serializer,u)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${ai(r)}`)}(n,e)}function rh(n,e){const t={};return Ku(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):an(n,(r,s)=>{const i=cn(s,e.Mu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function sh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof le||n instanceof da||n instanceof On||n instanceof Ne||n instanceof Br||n instanceof ha)}function ga(n,e,t){if(!sh(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=ai(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function Io(n,e,t){if((e=se(e))instanceof Fr)return e._internalPath;if(typeof e=="string")return ya(n,e);throw js("Field path arguments must be of type string or ",n,!1,void 0,t)}const U_=new RegExp("[~\\*/\\[\\]]");function ya(n,e,t){if(e.search(U_)>=0)throw js(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Fr(...e.split("."))._internalPath}catch{throw js(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function js(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new V(P.INVALID_ARGUMENT,l+n+u)}function ih(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ne(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new F_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(hi("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class F_ extends oh{data(){return super.data()}}function hi(n,e){return typeof e=="string"?ya(n,e):e instanceof Fr?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class va{}class _a extends va{}function ut(n,e,...t){let r=[];e instanceof va&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof wa).length,l=i.filter(u=>u instanceof fi).length;if(a>1||a>0&&l>0)throw new V(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class fi extends _a{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new fi(e,t,r)}_apply(e){const t=this._parse(e);return ah(e._query,t),new $t(e.firestore,e.converter,fo(e._query,t))}_parse(e){const t=$r(e.firestore);return function(i,a,l,u,h,p,y){let _;if(h.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new V(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Bc(y,p);const w=[];for(const R of y)w.push(Fc(u,i,R));_={arrayValue:{values:w}}}else _=Fc(u,i,y)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Bc(y,p),_=M_(l,a,y,p==="in"||p==="not-in");return ue.create(h,p,_)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function qe(n,e,t){const r=e,s=hi("where",n);return fi._create(s,r,t)}class wa extends va{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new wa(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:He.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const l=i.getFlattenedFilters();for(const u of l)ah(a,u),a=fo(a,u)}(e._query,t),new $t(e.firestore,e.converter,fo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ea extends _a{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ea(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new V(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new V(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Rr(i,a)}(e._query,this._field,this._direction);return new $t(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new Bn(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function $_(n,e="asc"){const t=e,r=hi("orderBy",n);return Ea._create(r,t)}class Ia extends _a{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Ia(e,t,r)}_apply(e){return new $t(e.firestore,e.converter,Ms(e._query,this._limit,this._limitType))}}function q_(n){return Ia._create("limit",n,"F")}function Fc(n,e,t){if(typeof(t=se(t))=="string"){if(t==="")throw new V(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!nd(e)&&t.indexOf("/")!==-1)throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ne.fromString(t));if(!L.isDocumentKey(r))throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ac(n,new L(r))}if(t instanceof Ne)return ac(n,t._key);throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ai(t)}.`)}function Bc(n,e){if(!Array.isArray(n)||n.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function ah(n,e){const t=function(s,i){for(const a of s)for(const l of a.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class j_{convertValue(e,t="none"){switch(rn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ae(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(nn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw F()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return an(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>ae(a.doubleValue));return new ha(i)}convertGeoPoint(e){return new da(ae(e.latitude),ae(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Ho(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Tr(e));default:return null}}convertTimestamp(e){const t=Lt(e);return new le(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ne.fromString(e);Z(Ad(r));const s=new br(r.get(1),r.get(3)),i=new L(r.popFirst(5));return s.isEqual(t)||pt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ta(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class lh extends oh{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new bs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(hi("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class bs extends lh{data(e={}){return super.data(e)}}class z_{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new fr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new bs(this._firestore,this._userDataWriter,r.key,r,new fr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const u=new bs(s._firestore,s._userDataWriter,l.doc.key,l.doc,new fr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new bs(s._firestore,s._userDataWriter,l.doc.key,l.doc,new fr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,p=-1;return l.type!==0&&(h=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),p=a.indexOf(l.doc.key)),{type:H_(l.type),doc:u,oldIndex:h,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function H_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(n){n=Be(n,Ne);const e=Be(n.firestore,qt);return P_(ci(e),n._key).then(t=>W_(e,n,t))}class ch extends j_{constructor(e){super(),this.firestore=e}convertBytes(e){return new On(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ne(this.firestore,null,t)}}function je(n){n=Be(n,$t);const e=Be(n.firestore,qt),t=ci(e),r=new ch(e);return B_(n._query),C_(t,n._query).then(s=>new z_(e,r,n,s))}function zs(n,e,t){n=Be(n,Ne);const r=Be(n.firestore,qt),s=Ta(n.converter,e,t);return qr(r,[fa($r(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Ve.none())])}function Ke(n,e,t,...r){n=Be(n,Ne);const s=Be(n.firestore,qt),i=$r(s);let a;return a=typeof(e=se(e))=="string"||e instanceof Fr?nh(i,"updateDoc",n._key,e,t,r):th(i,"updateDoc",n._key,e),qr(s,[a.toMutation(n._key,Ve.exists(!0))])}function jn(n){return qr(Be(n.firestore,qt),[new ni(n._key,Ve.none())])}function pi(n,e){const t=Be(n.firestore,qt),r=re(n),s=Ta(n.converter,e);return qr(t,[fa($r(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Ve.exists(!1))]).then(()=>r)}function qr(n,e){return function(r,s){const i=new ct;return r.asyncQueue.enqueueAndForget(async()=>y_(await S_(r),s,i)),i.promise}(ci(n),e)}function W_(n,e,t){const r=t.docs.get(e._key),s=new ch(n);return new lh(n,s,e._key,r,new fr(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K_{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=$r(e)}set(e,t,r){this._verifyNotCommitted();const s=Ji(e,this._firestore),i=Ta(s.converter,t,r),a=fa(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(a.toMutation(s._key,Ve.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=Ji(e,this._firestore);let a;return a=typeof(t=se(t))=="string"||t instanceof Fr?nh(this._dataReader,"WriteBatch.update",i._key,t,r,s):th(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(a.toMutation(i._key,Ve.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Ji(e,this._firestore);return this._mutations=this._mutations.concat(new ni(t._key,Ve.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new V(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Ji(n,e){if((n=se(n)).firestore!==e)throw new V(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function Hs(...n){return new pa("arrayUnion",n)}function Ct(...n){return new ma("arrayRemove",n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uh(n){return ci(n=Be(n,qt)),new K_(n,e=>qr(n,e))}(function(e,t=!0){(function(s){Fn=s})(Un),Rn(new Xt("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new qt(new Yg(r.getProvider("auth-internal")),new ey(r.getProvider("app-check-internal")),function(h,p){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new V(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new br(h.options.projectId,p)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),Dt(nc,"4.7.3",e),Dt(nc,"4.7.3","esm2017")})();const G_={apiKey:"AIzaSyCSdbVzlGYazn9zJH8ee55jJwNAioZg7m8",authDomain:"manhwadb-9319f.firebaseapp.com",projectId:"manhwadb-9319f",storageBucket:"manhwadb-9319f.firebasestorage.app",messagingSenderId:"647854568421",appId:"1:647854568421:web:802c4cf20e69264e9b350c"},dh=Zc(G_),jt=zg(dh),H=D_(dh);function Q_(n){return n?n instanceof le?n.toDate().toISOString():n!=null&&n.seconds?new Date(n.seconds*1e3).toISOString():n:null}function mi(n){if(!n.exists())return null;const e=n.data();return Object.keys(e).forEach(t=>{var r;(e[t]instanceof le||(r=e[t])!=null&&r.seconds)&&(e[t]=Q_(e[t]))}),{id:n.id,...e}}function dt(n){return n.docs.map(e=>mi(e))}let As=null;const Pe={get:()=>{var n;return((n=jt.currentUser)==null?void 0:n.uid)||null},currentUser:()=>As,setProfile:n=>{As=n},clear:()=>{As=null}},de={byId:async n=>{if(!n)return null;const e=await et(re(H,"users",n));return mi(e)},byUsername:async n=>{const e=await et(re(H,"usernames",n.toLowerCase()));if(!e.exists())return null;const{uid:t}=e.data();return de.byId(t)},save:async n=>{var r;const{id:e,...t}=n;await zs(re(H,"users",e),t,{merge:!0}),((r=jt.currentUser)==null?void 0:r.uid)===e&&Pe.setProfile({...As||{},...t,id:e})},delete:async n=>{await jn(re(H,"users",n))}},Fe={all:async()=>{const n=await je(De(H,"reviews"));return dt(n).sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt))},byId:async n=>{const e=await et(re(H,"reviews",n));return mi(e)},byUser:async n=>{const e=ut(De(H,"reviews"),qe("userId","==",n)),t=await je(e);return dt(t).sort((r,s)=>new Date(s.createdAt)-new Date(r.createdAt))},topRated:async(n=10)=>{const e=await je(ut(De(H,"reviews"),$_("createdAt","desc"),q_(200)));return dt(e).sort((t,r)=>r.rating-t.rating).slice(0,n)},create:async(n,e)=>{const t=Pe.currentUser();return{id:(await pi(De(H,"reviews"),{userId:n,username:(t==null?void 0:t.username)||"Unknown",title:e.title||"",coverBase64:e.coverBase64||"",text:e.text||"",rating:e.rating??0,chapters:e.chapters||0,status:e.status||"done",tags:e.tags||[],date:e.date||"",likes:[],dislikes:[],createdAt:new Date().toISOString(),updatedAt:null})).id,userId:n,...e}},update:async(n,e)=>(await Ke(re(H,"reviews",n),{...e,updatedAt:new Date().toISOString()}),{id:n,...e}),delete:async n=>{await jn(re(H,"reviews",n));const e=await je(ut(De(H,"comments"),qe("reviewId","==",n))),t=uh(H);e.docs.forEach(r=>t.delete(r.ref)),await t.commit()},toggleLike:async(n,e)=>{const t=re(H,"reviews",n),r=await et(t);if(!r.exists())return;const{likes:s=[],dislikes:i=[]}=r.data();s.includes(e)?await Ke(t,{likes:Ct(e)}):await Ke(t,{likes:Hs(e),dislikes:Ct(e)})},toggleDislike:async(n,e)=>{const t=re(H,"reviews",n),r=await et(t);if(!r.exists())return;const{likes:s=[],dislikes:i=[]}=r.data();i.includes(e)?await Ke(t,{dislikes:Ct(e)}):await Ke(t,{dislikes:Hs(e),likes:Ct(e)})}},yn={byReview:async n=>{const e=ut(De(H,"comments"),qe("reviewId","==",n)),t=await je(e);return dt(t).sort((r,s)=>new Date(r.createdAt)-new Date(s.createdAt))},create:async(n,e,t,r=null)=>{const s=Pe.currentUser();return{id:(await pi(De(H,"comments"),{reviewId:n,userId:e,username:(s==null?void 0:s.username)||"Unknown",avatarBase64:(s==null?void 0:s.avatarBase64)||"",text:t,parentId:r,likes:[],dislikes:[],createdAt:new Date().toISOString(),updatedAt:null})).id,reviewId:n,userId:e,text:t,parentId:r}},delete:async n=>{await jn(re(H,"comments",n));const e=await je(ut(De(H,"comments"),qe("parentId","==",n))),t=uh(H);e.docs.forEach(r=>t.delete(r.ref)),await t.commit()},toggleLike:async(n,e)=>{var s;const t=re(H,"comments",n),r=await et(t);r.exists()&&((s=r.data().likes)!=null&&s.includes(e)?await Ke(t,{likes:Ct(e)}):await Ke(t,{likes:Hs(e),dislikes:Ct(e)}))},toggleDislike:async(n,e)=>{var s;const t=re(H,"comments",n),r=await et(t);r.exists()&&((s=r.data().dislikes)!=null&&s.includes(e)?await Ke(t,{dislikes:Ct(e)}):await Ke(t,{dislikes:Hs(e),likes:Ct(e)}))}};function fs(n,e){return[n,e].sort().join("_")}const Me={between:async(n,e)=>{const t=await et(re(H,"friends",fs(n,e)));return mi(t)},ofUser:async n=>{const e=ut(De(H,"friends"),qe("users","array-contains",n),qe("status","==","accepted")),t=await je(e);return dt(t)},pendingFor:async n=>{const e=ut(De(H,"friends"),qe("receiverId","==",n),qe("status","==","pending")),t=await je(e);return dt(t)},sentBy:async n=>{const e=ut(De(H,"friends"),qe("requesterId","==",n),qe("status","==","pending")),t=await je(e);return dt(t)},send:async(n,e)=>{if(await Me.between(n,e))return!1;const r=fs(n,e);return await zs(re(H,"friends",r),{users:[n,e],requesterId:n,receiverId:e,status:"pending",createdAt:new Date().toISOString()}),!0},accept:async(n,e)=>{await Ke(re(H,"friends",fs(n,e)),{status:"accepted"})},remove:async(n,e)=>{await jn(re(H,"friends",fs(n,e)))}},sn={recent:async(n=40)=>{const e=await je(De(H,"news"));return dt(e).sort((t,r)=>new Date(r.createdAt)-new Date(t.createdAt)).slice(0,n)},add:async(n,e,t=null,r={})=>{await pi(De(H,"news"),{type:n,userId:e,targetId:t,createdAt:new Date().toISOString(),...r})}},$c=[{name:"Toongod",url:"https://www.toongod.org/",desc:"18+"},{name:"Hentai20",url:"https://hentai20.io/",desc:"18+"},{name:"AllHen",url:"https://20.allhen.online/",desc:"18+"},{name:"Desu",url:"https://desu.uno/",desc:"18+"},{name:"HentaiChan",url:"https://hentaichan.live/",desc:"18+"},{name:"imhentai",url:"https://imhentai.xxx/",desc:"18+"}],Y_={all:()=>{try{const n=JSON.parse(localStorage.getItem("mdb_top_sites_v2"));return n!=null&&n.length?n:$c}catch{return $c}},save:n=>localStorage.setItem("mdb_top_sites_v2",JSON.stringify(n))},ba={byUser:async n=>{try{const e=ut(De(H,"playlists"),qe("userId","==",n)),t=await je(e);return dt(t).sort((r,s)=>new Date(s.createdAt)-new Date(r.createdAt))}catch(e){return console.error("Playlists error (likely missing Firestore rules):",e),[]}},create:async(n,e,t=[])=>({id:(await pi(De(H,"playlists"),{userId:n,name:e,reviewIds:t,createdAt:new Date().toISOString()})).id,userId:n,name:e,reviewIds:t}),delete:async n=>{await jn(re(H,"playlists",n))}},pr={};let To=null;function st(n,e){pr[n]=e}function ve(n){window.location.hash=n}function J_(n){To=n}function X_(){function n(){const e=window.location.hash.replace("#","")||"home";To&&To(e);let t=!1;for(const r of Object.keys(pr)){const s=[],i=r.replace(/:([^/]+)/g,(u,h)=>(s.push(h),"([^/]+)")),a=new RegExp(`^${i}$`),l=e.match(a);if(l){const u={};s.forEach((h,p)=>{u[h]=decodeURIComponent(l[p+1])}),pr[r](u),t=!0;break}}!t&&pr.home&&pr.home({})}window.addEventListener("hashchange",n),n()}function Z_(n){return`${n.toLowerCase().replace(/[^a-z0-9]/g,"_")}@manhwadb.app`}async function ew(n,e,t=""){if(!n||n.trim().length<3)return{error:"Ім'я користувача має бути мінімум 3 символи"};if(!/^[a-zA-Z0-9_а-яА-ЯіІїЇєЄ]+$/.test(n))return{error:"Логін може містити лише літери, цифри та _"};if(!e||e.length<6)return{error:"Пароль має бути мінімум 6 символів"};if((await et(re(H,"usernames",n.toLowerCase()))).exists())return{error:"Такий логін вже зайнятий. Оберіть інший."};const s=Z_(n);let i;try{i=await Am(jt,s,e)}catch(u){return u.code==="auth/email-already-in-use"?{error:"Такий логін вже зайнятий."}:{error:u.message}}const a=i.user.uid,l=new Date().toISOString();return await zs(re(H,"users",a),{username:n.trim(),email:t||"",bio:"",avatarBase64:"",top4:[null,null,null,null],createdAt:l}),await zs(re(H,"usernames",n.toLowerCase()),{uid:a,internalEmail:s}),{user:{id:a,username:n.trim()}}}async function tw(n,e){if(!n||!e)return{error:"Заповніть всі поля"};const t=await et(re(H,"usernames",n.toLowerCase()));if(!t.exists())return{error:"Користувача не знайдено"};const{internalEmail:r}=t.data();try{return{user:(await Rm(jt,r,e)).user}}catch(s){return s.code==="auth/wrong-password"||s.code==="auth/invalid-credential"?{error:"Невірний пароль"}:{error:s.message}}}async function nw(){await Dm(jt)}async function rw(n,e,t){const r=jt.currentUser;if(!r)return{error:"Не авторизовано"};if(t.length<6)return{error:"Новий пароль має бути мінімум 6 символів"};try{const s=Ft.credential(r.email,e);return await Su(r,s),await Sm(r,t),{ok:!0}}catch(s){return s.code==="auth/wrong-password"||s.code==="auth/invalid-credential"?{error:"Старий пароль невірний"}:{error:s.message}}}async function sw(n){const e=jt.currentUser;if(!e)return{error:"Не авторизовано"};try{const t=Ft.credential(e.email,n);return await Su(e,t),await Vm(e),{ok:!0}}catch(t){return t.code==="auth/wrong-password"||t.code==="auth/invalid-credential"?{error:"Невірний пароль"}:{error:t.message}}}function Mn(n){if(!n)return"";const e=Date.now(),t=new Date(n).getTime(),r=Math.floor((e-t)/1e3);return r<60?"щойно":r<3600?`${Math.floor(r/60)} хв тому`:r<86400?`${Math.floor(r/3600)} год тому`:r<86400*30?`${Math.floor(r/86400)} д тому`:new Date(n).toLocaleDateString("uk-UA",{day:"numeric",month:"short",year:"numeric"})}function hh(n){return n?new Date(n).toLocaleDateString("uk-UA",{day:"numeric",month:"long",year:"numeric"}):""}function M(n){return(n||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function bo(n,e=700,t=.65){return new Promise((r,s)=>{const i=new FileReader;i.onload=a=>{const l=new Image;l.onload=()=>{const u=document.createElement("canvas");let h=l.width,p=l.height;h>e&&(p=Math.round(p*e/h),h=e),u.width=h,u.height=p,u.getContext("2d").drawImage(l,0,0,h,p),r(u.toDataURL("image/jpeg",t))},l.onerror=s,l.src=a.target.result},i.onerror=s,i.readAsDataURL(n)})}function iw(n){return bo(n,200,.7)}function Ws(n,e=!1){if(e)return`<div class="crosses-display">${Array(10).fill('<span class="cross-mark">✕</span>').join("")}</div>`;const t=Math.floor(n),r=n%1>=.5,s=10-t-(r?1:0);let i='<div class="stars-display">';for(let a=0;a<t;a++)i+='<span class="star full"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>';r&&(i+='<span class="star half"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>');for(let a=0;a<s;a++)i+='<span class="star"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>';return i+="</div>",i}function Qe(n,e="md"){if(n&&n.avatarBase64)return`<img class="avatar avatar-${e}" src="${n.avatarBase64}" alt="${M(n.username)}">`;const t=n?(n.username||"?").charAt(0).toUpperCase():"?";return`<div class="avatar avatar-${e}">${t}</div>`}function fe(n,e="info"){let t=document.querySelector(".toast-container");t||(t=document.createElement("div"),t.className="toast-container",document.body.appendChild(t));const r=document.createElement("div");r.className=`toast toast-${e}`;const s={success:"✅",error:"❌",info:"ℹ️"};r.innerHTML=`<span>${s[e]||""}</span><span>${M(n)}</span>`,t.appendChild(r),setTimeout(()=>{r.style.opacity="0",r.style.transition="opacity 0.3s",setTimeout(()=>r.remove(),300)},3500)}function zn(n){n.innerHTML='<div style="display:flex;justify-content:center;padding:80px"><div class="loader-spinner"></div></div>'}let Rs=null;function Ao(n="login"){Jt();const e=document.createElement("div");e.className="modal-backdrop",e.id="auth-modal",e.innerHTML=`
    <div class="modal-box">
      <div class="modal-header">
        <span class="modal-title">ManhwaDB</span>
        <button class="modal-close" id="auth-modal-close">✕</button>
      </div>
      <div class="modal-body">
        <div class="modal-tabs">
          <button class="modal-tab ${n==="login"?"active":""}" data-tab="login">Увійти</button>
          <button class="modal-tab ${n==="register"?"active":""}" data-tab="register">Зареєструватися</button>
        </div>
        <div id="auth-tab-content"></div>
      </div>
    </div>`,document.body.appendChild(e),Rs=e,qc(e,n),e.querySelectorAll(".modal-tab").forEach(t=>{t.addEventListener("click",()=>{e.querySelectorAll(".modal-tab").forEach(r=>r.classList.remove("active")),t.classList.add("active"),qc(e,t.dataset.tab)})}),document.getElementById("auth-modal-close").addEventListener("click",Jt),e.addEventListener("click",t=>{t.target===e&&Jt()}),document.addEventListener("keydown",fh)}function fh(n){n.key==="Escape"&&Jt()}function Jt(){Rs&&(Rs.remove(),Rs=null),document.removeEventListener("keydown",fh)}function ps(n,e){n.disabled=e,n.textContent=e?"Зачекайте...":n.dataset.label}function qc(n,e){const t=n.querySelector("#auth-tab-content");if(e==="login"){t.innerHTML=`
      <div class="form-group" style="margin-bottom:16px">
        <label class="form-label">Логін</label>
        <input class="input" type="text" id="auth-username" placeholder="Ваш логін" autocomplete="username">
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Пароль</label>
        <input class="input" type="password" id="auth-password" placeholder="Ваш пароль" autocomplete="current-password">
      </div>
      <div id="auth-error" class="form-error" style="display:none;margin-bottom:12px"></div>
      <button class="btn btn-primary" style="width:100%" id="auth-submit" data-label="Увійти">Увійти</button>`;const r=async()=>{const s=t.querySelector("#auth-username").value.trim(),i=t.querySelector("#auth-password").value,a=t.querySelector("#auth-error"),l=t.querySelector("#auth-submit");ps(l,!0);const u=await tw(s,i);u.error?(a.textContent=u.error,a.style.display="block",ps(l,!1)):(Jt(),fe("Вітаємо! 👋","success"),setTimeout(()=>window.location.reload(),300))};t.querySelector("#auth-submit").addEventListener("click",r),t.querySelectorAll("input").forEach(s=>s.addEventListener("keydown",i=>{i.key==="Enter"&&r()}))}else{t.innerHTML=`
      <div class="form-group" style="margin-bottom:14px">
        <label class="form-label">Логін <span style="color:var(--accent)">*</span></label>
        <input class="input" type="text" id="auth-username" placeholder="Лише літери, цифри, _ (мін. 3)" autocomplete="username">
      </div>
      <div class="form-group" style="margin-bottom:14px">
        <label class="form-label">Email (необов'язково)</label>
        <input class="input" type="email" id="auth-email" placeholder="your@email.com" autocomplete="email">
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Пароль <span style="color:var(--accent)">*</span></label>
        <input class="input" type="password" id="auth-password" placeholder="Мінімум 6 символів" autocomplete="new-password">
      </div>
      <div id="auth-error" class="form-error" style="display:none;margin-bottom:12px"></div>
      <button class="btn btn-primary" style="width:100%" id="auth-submit" data-label="Створити акаунт">Створити акаунт</button>`;const r=async()=>{const s=t.querySelector("#auth-username").value.trim(),i=t.querySelector("#auth-email").value.trim(),a=t.querySelector("#auth-password").value,l=t.querySelector("#auth-error"),u=t.querySelector("#auth-submit");ps(u,!0);const h=await ew(s,a,i);h.error?(l.textContent=h.error,l.style.display="block",ps(u,!1)):(sn.add("joined",h.user.id,null,{username:h.user.username}).catch(()=>{}),Jt(),fe(`Ласкаво просимо, ${h.user.username}! 🎉`,"success"),setTimeout(()=>window.location.reload(),500))};t.querySelector("#auth-submit").addEventListener("click",r),t.querySelectorAll("input").forEach(s=>s.addEventListener("keydown",i=>{i.key==="Enter"&&r()}))}setTimeout(()=>{var r;return(r=t.querySelector("input"))==null?void 0:r.focus()},50)}const Ss=Object.freeze(Object.defineProperty({__proto__:null,closeAuthModal:Jt,showAuthModal:Ao},Symbol.toStringTag,{value:"Module"}));function Ro(){var i,a,l;const n=Pe.currentUser(),e=document.getElementById("app");let t=document.getElementById("site-header");t&&t.remove(),t=document.createElement("header"),t.id="site-header",t.className="site-header";const s=(window.location.hash.replace("#","")||"home").split("/")[0];t.innerHTML=`
    <a href="#home" class="header-logo">ManhwaDB</a>
    <nav class="header-nav">
      <button class="nav-link ${s==="home"||s===""?"active":""}" data-hash="home">🏠 Головна</button>
      <button class="nav-link ${s==="faq"?"active":""}" data-hash="faq">❔ FAQ</button>
      ${n?`<button class="nav-link ${s==="new-review"?"active":""}" data-hash="new-review">✍️ Нова рецензія</button>`:""}
      ${n?`<button class="nav-link ${s==="friends"?"active":""}" data-hash="friends">👥 Друзі</button>`:""}
      ${n?`<button class="nav-link ${s==="account"?"active":""}" data-hash="account">👤 Мій акаунт</button>`:""}
    </nav>
    <div class="header-auth">
      ${n?`<span style="color:var(--text-secondary);font-size:0.85rem;margin-right:8px">Вітаємо, <strong style="color:var(--text-primary)">${n.username}</strong></span>
           <button class="btn btn-secondary btn-sm" id="logout-btn">Вийти</button>`:`<button class="btn btn-ghost btn-sm" id="login-btn">Увійти</button>
           <button class="btn btn-primary btn-sm" id="register-btn">Реєстрація</button>`}
    </div>`,e.insertBefore(t,e.firstChild),t.querySelectorAll("[data-hash]").forEach(u=>{u.addEventListener("click",()=>ve(u.dataset.hash))}),(i=document.getElementById("logout-btn"))==null||i.addEventListener("click",async()=>{await nw(),fe("Ви вийшли з акаунту","info"),window.location.hash="home",window.location.reload()}),(a=document.getElementById("login-btn"))==null||a.addEventListener("click",()=>Ao("login")),(l=document.getElementById("register-btn"))==null||l.addEventListener("click",()=>Ao("register"))}async function ow(){const n=document.getElementById("page-root");zn(n);const e=Y_.all(),[t,r]=await Promise.all([Fe.all(),sn.recent(50)]),s=[...t].sort((h,p)=>p.rating-h.rating).slice(0,10);n.innerHTML=`
    <div class="page-container">
      <!-- Search -->
      <div class="hero-search">
        <h1>Знайдіть вашу наступну манхву</h1>
        <p>Рецензії, рейтинги та рекомендації від спільноти</p>
        <div class="hero-search-input-wrap">
          <input class="input" id="home-search" placeholder="🔍  Пошук за назвою..." autocomplete="off">
          <button class="btn btn-primary" id="home-search-btn">Пошук</button>
        </div>
        <div id="search-results" style="margin-top:16px;text-align:left;max-width:600px;margin-left:auto;margin-right:auto;display:none"></div>
      </div>

      <div class="home-layout">
        <!-- LEFT -->
        <div class="home-left">
          <div class="two-col">
            <!-- Top Sites -->
            <div>
              <div class="section-title">🌐 Топ сайтів для читання</div>
              <div style="display:flex;flex-direction:column;gap:8px">
                ${e.map((h,p)=>`
                  <a class="top-site-item" href="${M(h.url)}" target="_blank" rel="noopener">
                    <span class="top-site-rank">${p+1}</span>
                    <div>
                      <div style="font-weight:600">${M(h.name)}</div>
                      <div style="font-size:0.75rem;color:var(--text-muted)">${M(h.desc)}</div>
                    </div>
                    <span style="margin-left:auto;color:var(--text-muted);font-size:12px">↗</span>
                  </a>`).join("")}
              </div>
            </div>

            <!-- Top Popular -->
            <div>
              <div class="section-title">🔥 Топ популярних</div>
              ${s.length===0?'<div class="empty-state"><div class="empty-icon">📖</div><h3>Ще немає рецензій</h3></div>':s.map((h,p)=>`
                    <div class="review-card" style="margin-bottom:10px;cursor:pointer" data-review-id="${h.id}">
                      <div class="review-cover">
                        ${h.coverBase64?`<img src="${h.coverBase64}" alt="">`:'<div class="review-cover-placeholder">📖</div>'}
                      </div>
                      <div class="review-body">
                        <div style="font-size:0.75rem;color:var(--accent2);font-weight:700;margin-bottom:2px">#${p+1}</div>
                        <div class="review-title">${M(h.title)}</div>
                        <div style="margin:4px 0">${Ws(h.rating,h.status==="dropped")}</div>
                        <div style="font-size:0.78rem;color:var(--text-muted)">— ${M(h.username||"")}</div>
                      </div>
                    </div>`).join("")}
            </div>
          </div>
        </div>

        <!-- RIGHT: News Feed -->
        <div>
          <div class="section-title">📡 Стрічка новин</div>
          <div class="news-feed">
            ${r.length===0?'<div class="empty-state"><div class="empty-icon">📭</div><h3>Тут поки тихо</h3><p>Реєструйтесь та діліться рецензіями!</p></div>':r.map(aw).join("")}
          </div>
        </div>
      </div>
    </div>`,n.querySelectorAll("[data-review-id]").forEach(h=>{h.addEventListener("click",()=>ve(`review/${h.dataset.reviewId}`))});const i=document.getElementById("home-search"),a=document.getElementById("home-search-btn"),l=document.getElementById("search-results");function u(){const h=i.value.trim().toLowerCase();if(!h){l.style.display="none";return}const p=t.filter(y=>y.title.toLowerCase().includes(h));if(p.length===0){l.style.display="block",l.innerHTML='<div class="empty-state" style="padding:20px"><h3>Нічого не знайдено</h3></div>';return}l.style.display="block",l.innerHTML=p.slice(0,12).map(y=>`
      <div class="review-card" style="margin-bottom:8px;cursor:pointer" data-review-id="${y.id}">
        <div class="review-cover" style="width:50px">
          ${y.coverBase64?`<img src="${y.coverBase64}" alt="">`:'<div class="review-cover-placeholder" style="font-size:14px">📖</div>'}
        </div>
        <div class="review-body">
          <div class="review-title">${M(y.title)}</div>
          <div style="margin:4px 0">${Ws(y.rating,y.status==="dropped")}</div>
          <div style="font-size:0.78rem;color:var(--text-muted)">${M(y.username||"")}</div>
        </div>
      </div>`).join(""),l.querySelectorAll("[data-review-id]").forEach(y=>{y.addEventListener("click",()=>ve(`review/${y.dataset.reviewId}`))})}a.addEventListener("click",u),i.addEventListener("keydown",h=>{h.key==="Enter"&&u()}),i.addEventListener("input",()=>{i.value.trim()||(l.style.display="none")})}function aw(n){const e=n.username?`<strong>${M(n.username)}</strong>`:"Хтось";let t="📢",r="";return n.type==="joined"?(t="🎉",r=`${e} приєднався до ManhwaDB`):n.type==="review"?(t="📝",r=`${e} залишив рецензію на <strong>${M(n.extra||"манхву")}</strong>`):n.type==="friend"?(t="🤝",r=`${e} та <strong>${M(n.friendName||"Хтось")}</strong> тепер друзі!`):(t="📢",r=`${e} щось зробив`),`<div class="news-item"><span class="news-icon">${t}</span><div><div class="news-text">${r}</div><div class="news-ts">${Mn(n.createdAt)}</div></div></div>`}function lw(){const n=document.getElementById("page-root");n.innerHTML=`
    <div class="page-container" style="max-width:700px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px">
        <button class="btn btn-ghost btn-sm" id="back-btn">← Назад</button>
        <h1 class="section-title" style="margin:0">ℹ️ Правила та FAQ</h1>
      </div>
      <div class="card card-padding" style="line-height:1.6;font-size:0.95rem">
        <h3 style="margin-top:0;margin-bottom:16px">Правила платформи ManhwaDB</h3>
        <p>Вітаємо на нашій спільноті для огляду манхв! Щоб підтримувати приємну атмосферу, будь ласка, дотримуйтесь наступних правил:</p>
        <ol style="margin-left:20px;margin-bottom:32px;padding-left:12px">
          <li style="margin-bottom:12px"><strong>Повага до інших:</strong> Заборонені будь-які образи, погрози або мова ворожнечі у рецензіях чи коментарях.</li>
          <li style="margin-bottom:12px"><strong>Без спойлерів:</strong> Якщо ви обговорюєте важливий сюжетний поворот у рецензії, попереджайте про це інших, щоб не зіпсувати враження від прочитання.</li>
          <li style="margin-bottom:12px"><strong>Релевантний контент:</strong> Рецензії повинні стосуватися безпосередньо манхви. Спам або відрита реклама ресурсів суворо заборонені.</li>
          <li style="margin-bottom:12px"><strong>Медиа-контент:</strong> Відповідальність за завантажений контент несе користувач. Суворо заборонено завантажувати медіа-матеріали шокуючого характеру або надмірно відверті (18+) як обкладинки для рецензій.</li>
        </ol>

        <h3 style="margin-bottom:12px">Обмеження</h3>
        <ul style="margin-left:20px;color:var(--text-muted);padding-left:12px">
          <li style="margin-bottom:8px">Функціонал "Оцінка" (від 1 до 10) блокується для манхв зі статусом <em>"В планах"</em> або <em>"Кинуто"</em>.</li>
          <li style="margin-bottom:8px">Обкладинки для рецензій, які ви завантажуєте власноруч, автоматично стискаються бразуером у фоновому режимі (WebP) для економії місця. Проте файли розміром більше 10MB можуть спричинити зависання.</li>
          <li style="margin-bottom:8px">Кожен користувач може додавати манхви у "Топ-4", які відображатимуться на його головній сторінці профілю для всіх друзів.</li>
        </ul>
      </div>
    </div>
  `,document.getElementById("back-btn").addEventListener("click",()=>history.back())}async function jc(n=null){var Y;const e=Pe.currentUser();if(!e){ve("home");return}const t=document.getElementById("page-root");let r=null;n&&(zn(t),r=await Fe.byId(n));let s=(r==null?void 0:r.coverBase64)||"",i=(r==null?void 0:r.rating)??5,a=(r==null?void 0:r.chapters)||"",l=(r==null?void 0:r.status)||"done";t.innerHTML=`
    <div class="page-container" style="max-width:720px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px">
        <button class="btn btn-ghost btn-sm" id="back-btn">← Назад</button>
        <h1 class="section-title" style="margin:0">${r?"✏️ Редагувати рецензію":"✍️ Нова рецензія"}</h1>
      </div>
      <div class="card card-padding">
        <!-- Cover -->
        <div class="form-group" style="margin-bottom:20px">
          <label class="form-label">Обкладинка манхви (необов'язково)</label>
          <div class="cover-upload-area" id="cover-upload-area">
            ${s?`<img src="${s}" id="cover-preview-img">`:""}
            <div class="upload-overlay">
              <span style="font-size:28px">🖼️</span>
              <span>${s?"Змінити обкладинку":"Натисніть або перетягніть"}</span>
            </div>
            ${s?"":'<span style="font-size:32px">🖼️</span><span>Натисніть або перетягніть файл</span>'}
          </div>
          <input type="file" id="cover-file" accept="image/*" style="display:none">
          <div id="cover-actions" style="margin-top:8px;display:${s?"flex":"none"};gap:8px">
            <button class="btn btn-danger btn-sm" id="remove-cover-btn">🗑 Видалити обкладинку</button>
          </div>
        </div>

        <!-- Title -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Назва манхви <span style="color:var(--accent)">*</span></label>
          <div style="position:relative">
            <input class="input" type="text" id="review-title" placeholder="Введіть назву (пошук в базі)..." value="${M((r==null?void 0:r.title)||"")}" autocomplete="off">
            <div id="autocomplete-results" style="display:none;position:absolute;top:100%;left:0;right:0;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);box-shadow:var(--shadow-float);z-index:100;max-height:300px;overflow-y:auto;margin-top:4px">
            </div>
          </div>
        </div>

        <!-- Chapters -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Кількість глав <span style="color:var(--accent)">*</span></label>
          <input class="input" type="number" id="review-chapters" placeholder="0" min="0" value="${a}">
        </div>

        <!-- Date -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Дата прочитання (необов'язково)</label>
          <input class="input" type="date" id="review-date" value="${(r==null?void 0:r.date)||""}">
        </div>

        <!-- Tags -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Теги (через кому)</label>
          <input class="input" type="text" id="review-tags" placeholder="екшн, романтика, фентезі..." value="${((Y=r==null?void 0:r.tags)==null?void 0:Y.join(", "))||""}">
        </div>

        <!-- Status -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Статус <span style="color:var(--accent)">*</span></label>
          <select class="select" id="review-status">
            <option value="done" ${l==="done"?"selected":""}>✅ Завершено</option>
            <option value="reading" ${l==="reading"?"selected":""}>📖 Читаю</option>
            <option value="planned" ${l==="planned"?"selected":""}>⏳ В планах (Прочитати потім)</option>
            <option value="dropped" ${l==="dropped"?"selected":""}>❌ Кинув</option>
          </select>
        </div>

        <!-- Rating -->
        <div class="form-group" style="margin-bottom:16px;text-align:center">
          <label class="form-label">Оцінка <span style="color:var(--accent)">*</span></label>
          <div id="interactive-stars-wrap" style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;padding:12px;background:var(--bg-surface);border-radius:12px;border:1px solid var(--border)">
             <!-- Rendered dynamically -->
          </div>
          <div id="rating-label" style="font-size:1.2rem;font-weight:700;color:var(--accent2);margin-top:8px">
            ${l==="dropped"?"Кинута":l==="planned"?"-":i+"/10"}
          </div>
        </div>

        <!-- Text -->
        <div class="form-group" style="margin-bottom:24px">
          <label class="form-label">Текст рецензії (необов'язково)</label>
          <textarea class="textarea" id="review-text" placeholder="Ваші враження про манхву..." style="min-height:160px">${M((r==null?void 0:r.text)||"")}</textarea>
        </div>

        <div id="review-form-error" class="form-error" style="display:none;margin-bottom:12px"></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" id="save-review-btn" style="flex:1;min-width:180px" data-label="${r?"Зберегти зміни":"Опублікувати рецензію"}">
            ${r?"💾 Зберегти зміни":"📝 Опублікувати рецензію"}
          </button>
          <button class="btn btn-secondary" id="cancel-review-btn">Скасувати</button>
        </div>
      </div>
    </div>`,document.getElementById("back-btn").addEventListener("click",()=>history.back()),document.getElementById("cancel-review-btn").addEventListener("click",()=>history.back());const u=document.getElementById("cover-upload-area"),h=document.getElementById("cover-file"),p=document.getElementById("cover-actions");function y(){const z=u.querySelector("#cover-preview-img"),W=u.querySelectorAll("span:not(.upload-overlay span)");if(s){if(z)z.src=s;else{const E=document.createElement("img");E.id="cover-preview-img",E.src=s;const m=u.querySelector(".upload-overlay");u.insertBefore(E,m)}W.forEach(E=>E.remove()),p.style.display="flex"}else if(z&&z.remove(),p.style.display="none",!u.querySelector("span:not(.upload-overlay span)")){const E=document.createElement("span");E.style.fontSize="32px",E.textContent="🖼️";const m=document.createElement("span");m.textContent="Натисніть або перетягніть файл",u.appendChild(E),u.appendChild(m)}}u.addEventListener("click",()=>h.click()),h.addEventListener("change",async()=>{const z=h.files[0];z&&(s=await bo(z,700,.65),y())}),document.getElementById("remove-cover-btn").addEventListener("click",z=>{z.stopPropagation(),s="",y()}),u.addEventListener("dragover",z=>{z.preventDefault(),u.style.borderColor="var(--accent)"}),u.addEventListener("dragleave",()=>{u.style.borderColor=""}),u.addEventListener("drop",async z=>{z.preventDefault(),u.style.borderColor="";const W=z.dataTransfer.files[0];W!=null&&W.type.startsWith("image/")&&(s=await bo(W,700,.65),y())});const _=document.getElementById("review-title"),w=document.getElementById("autocomplete-results");let R=null;_.addEventListener("input",()=>{const z=_.value.trim();if(z.length<3){w.style.display="none";return}clearTimeout(R),R=setTimeout(async()=>{try{w.style.display="block",w.innerHTML='<div style="padding:12px;text-align:center;color:var(--text-muted)">Шукаю в AniList...</div>';const m=(await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:"query ($search: String) { Page(page: 1, perPage: 8) { media(search: $search, type: MANGA) { id title { romaji english } coverImage { extraLarge } chapters } } }",variables:{search:z}})})).json()).data.Page.media;if(m.length===0){w.innerHTML='<div style="padding:12px;text-align:center;color:var(--text-muted)">Нічого не знайдено</div>';return}w.innerHTML=m.map(g=>{var b;const I=g.title.english||g.title.romaji,T=((b=g.coverImage)==null?void 0:b.extraLarge)||"";return`
            <div class="ac-item" style="display:flex;align-items:center;gap:12px;padding:8px;cursor:pointer;border-bottom:1px solid var(--border);transition:0.1s" data-title="${M(I)}" data-cover="${T}" data-chapters="${g.chapters||0}">
              ${T?`<img src="${T}" style="width:32px;height:45px;object-fit:cover;border-radius:4px">`:'<div style="width:32px;height:45px;background:var(--bg-hover);border-radius:4px"></div>'}
              <div style="flex:1;font-weight:500;font-size:0.9rem">${M(I)}</div>
              ${g.chapters?`<div style="font-size:0.75rem;color:var(--text-muted)">${g.chapters} глав</div>`:""}
            </div>
          `}).join(""),w.querySelectorAll(".ac-item").forEach(g=>{g.addEventListener("mouseenter",()=>g.style.background="var(--bg-hover)"),g.addEventListener("mouseleave",()=>g.style.background=""),g.addEventListener("click",()=>{_.value=g.dataset.title,document.getElementById("review-chapters").value=g.dataset.chapters,g.dataset.cover&&(s=g.dataset.cover,y(),fe("Дані завантажено з AniList!","info")),w.style.display="none"})})}catch{w.innerHTML='<div style="padding:12px;text-align:center;color:var(--accent)">Помилка пошуку</div>'}},600)}),document.addEventListener("click",z=>{!_.contains(z.target)&&!w.contains(z.target)&&(w.style.display="none")});const x=document.getElementById("review-status"),k=document.getElementById("interactive-stars-wrap"),B=document.getElementById("rating-label");function j(z=null){const W=l==="dropped",E=l==="planned";if(W||E){k.innerHTML='<span style="color:var(--text-muted);font-size:1rem;padding:8px">'+(E?"Ще не оцінено":"Оцінка недоступна")+"</span>",k.style.pointerEvents="none";return}k.style.pointerEvents="auto",k.innerHTML="",i=Math.round(i);const m=z!==null?z:i;for(let g=1;g<=10;g++){const I=g<=m?"★":"☆",T=g<=m?"var(--accent2)":"var(--text-muted)",b=document.createElement("span");b.textContent=I,b.style.fontSize="32px",b.style.lineHeight="1",b.style.color=T,b.style.transition="0.1s transform, 0.1s color",b.addEventListener("mouseover",()=>{j(g),b.style.transform="scale(1.2)"}),b.addEventListener("mouseleave",()=>{b.style.transform="scale(1)"}),b.addEventListener("click",()=>{i=g,j(),B.textContent=i+"/10"}),k.appendChild(b)}}k.addEventListener("mouseleave",()=>{l!=="dropped"&&l!=="planned"&&j()}),x.addEventListener("change",()=>{l=x.value;const z=l==="dropped";l==="planned"?B.textContent="-":B.textContent=z?"Кинута":i+"/10",j()}),j();const U=document.getElementById("save-review-btn");U.addEventListener("click",async()=>{const z=document.getElementById("review-title").value.trim(),W=document.getElementById("review-chapters").value,E=parseInt(W,10),m=document.getElementById("review-date").value,g=document.getElementById("review-tags").value,I=document.getElementById("review-text").value.trim(),T=x.value,b=T==="dropped"||T==="planned"?0:i,v=g.split(",").map(We=>We.trim()).filter(Boolean),we=document.getElementById("review-form-error");if(!z){we.textContent="Назва обов'язкова",we.style.display="block";return}if(!W||isNaN(E)||E<0){we.textContent="Кількість глав обов'язкова (0 або більше)",we.style.display="block";return}U.disabled=!0,U.textContent="Збереження...";const vt={title:z,coverBase64:s,text:I,rating:b,chapters:E,status:T,tags:v,date:m};try{let We;r?(We=await Fe.update(n,vt),fe("Рецензію оновлено ✅","success")):(We=await Fe.create(e.id,vt),await sn.add("review",e.id,We.id,{username:e.username,extra:z}),fe("Рецензію опубліковано! 📝","success")),ve(`review/${We.id}`)}catch(We){we.textContent="Помилка: "+We.message,we.style.display="block",U.disabled=!1,U.textContent=U.dataset.label}})}async function vn(){const n=Pe.currentUser();if(!n){ve("home");return}const e=document.getElementById("page-root");zn(e);const[t,r,s]=await Promise.all([Me.ofUser(n.id),Me.pendingFor(n.id),Me.sentBy(n.id)]),i=async w=>{const R=w.requesterId===n.id?w.receiverId:w.requesterId,x=await de.byId(R);return{...w,otherUser:x,otherId:R}},[a,l,u]=await Promise.all([Promise.all(t.map(i)),Promise.all(r.map(async w=>{const R=await de.byId(w.requesterId);return{...w,otherUser:R}})),Promise.all(s.map(async w=>{const R=await de.byId(w.receiverId);return{...w,otherUser:R}}))]);e.innerHTML=`
    <div class="page-container" style="max-width:800px">
      <div class="section-title" style="margin-bottom:24px">👥 Мої друзі</div>

      <!-- Search -->
      <div class="card card-padding" style="margin-bottom:24px">
        <div class="section-title" style="font-size:1rem;margin-bottom:12px">🔍 Знайти нових друзів</div>
        <div style="display:flex;gap:10px">
          <input class="input" id="friend-search-input" placeholder="Введіть точний логін користувача...">
          <button class="btn btn-primary" id="friend-search-btn" style="white-space:nowrap">Знайти</button>
        </div>
        <div id="friend-search-result" style="margin-top:12px"></div>
      </div>

      <!-- Incoming requests -->
      ${l.length?`
        <div style="margin-bottom:24px">
          <div class="section-title" style="font-size:1rem;margin-bottom:12px">📩 Вхідні запити (${l.length})</div>
          <div style="display:flex;flex-direction:column;gap:8px" id="pending-list">
            ${l.map(w=>{var R;return`
              <div class="friend-item">
                ${Qe(w.otherUser,"sm")}
                <div class="friend-info">
                  <div class="friend-name" data-profile="${w.requesterId}" style="cursor:pointer">${M(((R=w.otherUser)==null?void 0:R.username)||"Невідомий")}</div>
                </div>
                <button class="btn btn-primary btn-sm" data-accept="${w.requesterId}">✅ Прийняти</button>
                <button class="btn btn-danger btn-sm" data-decline="${w.requesterId}">❌</button>
              </div>`}).join("")}
          </div>
        </div>`:""}

      <!-- Sent requests -->
      ${u.length?`
        <div style="margin-bottom:24px">
          <div class="section-title" style="font-size:1rem;margin-bottom:12px">📤 Надіслані запити (${u.length})</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${u.map(w=>{var R;return`
              <div class="friend-item">
                ${Qe(w.otherUser,"sm")}
                <div class="friend-info">
                  <div class="friend-name" data-profile="${w.receiverId}" style="cursor:pointer">${M(((R=w.otherUser)==null?void 0:R.username)||"Невідомий")}</div>
                </div>
                <span class="friend-status friend-pending">Очікує</span>
                <button class="btn btn-ghost btn-xs" data-cancel="${w.receiverId}">✕</button>
              </div>`}).join("")}
          </div>
        </div>`:""}

      <!-- Friends list -->
      <div class="section-title" style="font-size:1rem;margin-bottom:12px">✅ Друзі (${a.length})</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${a.length===0?'<div class="empty-state"><div class="empty-icon">🤝</div><h3>У вас ще немає друзів</h3><p>Знайдіть їх за логіном вище!</p></div>':a.map(w=>{var R;return`
              <div class="friend-item">
                ${Qe(w.otherUser,"md")}
                <div class="friend-info">
                  <div class="friend-name" data-profile="${w.otherId}" style="cursor:pointer">${M(((R=w.otherUser)==null?void 0:R.username)||"Невідомий")}</div>
                </div>
                <span class="friend-status friend-accepted">Друг</span>
                <button class="btn btn-secondary btn-xs" data-view-profile="${w.otherId}">Профіль</button>
                <button class="btn btn-danger btn-xs" data-remove="${w.otherId}">Видалити</button>
              </div>`}).join("")}
      </div>
    </div>`;const h=document.getElementById("friend-search-btn"),p=document.getElementById("friend-search-input"),y=document.getElementById("friend-search-result"),_=async()=>{var B;const w=p.value.trim();if(!w)return;h.disabled=!0,h.textContent="...";const R=await de.byUsername(w);if(h.disabled=!1,h.textContent="Знайти",!R||R.id===n.id){y.innerHTML='<div style="color:var(--text-muted);font-size:0.875rem">Користувача не знайдено</div>';return}const x=await Me.between(n.id,R.id);let k="";x?x.status==="pending"?k='<span class="friend-status friend-pending">Запит надіслано</span>':k='<span class="friend-status friend-accepted">Вже друзі ✅</span>':k=`<button class="btn btn-primary btn-sm" id="add-friend-btn" data-uid="${R.id}">➕ Надіслати запит</button>`,y.innerHTML=`<div class="friend-item">
      ${Qe(R,"sm")}
      <div class="friend-info"><div class="friend-name">${M(R.username)}</div></div>
      ${k}
    </div>`,(B=document.getElementById("add-friend-btn"))==null||B.addEventListener("click",async()=>{await Me.send(n.id,R.id),await sn.add("friend",n.id,R.id,{username:n.username}),fe(`Запит надіслано ${R.username}`,"success"),await vn()})};h.addEventListener("click",_),p.addEventListener("keydown",w=>{w.key==="Enter"&&_()}),e.querySelectorAll("[data-accept]").forEach(w=>{w.addEventListener("click",async()=>{const R=w.dataset.accept;await Me.accept(R,n.id);const x=await de.byId(R);await sn.add("friend",n.id,R,{username:n.username,friendName:(x==null?void 0:x.username)||"Unknown"}).catch(console.error),fe("Запит прийнято ✅","success"),await vn()})}),e.querySelectorAll("[data-decline]").forEach(w=>{w.addEventListener("click",async()=>{await Me.remove(w.dataset.decline,n.id),await vn()})}),e.querySelectorAll("[data-cancel]").forEach(w=>{w.addEventListener("click",async()=>{await Me.remove(n.id,w.dataset.cancel),await vn()})}),e.querySelectorAll("[data-remove]").forEach(w=>{w.addEventListener("click",async()=>{window.confirm("Видалити зі списку друзів?")&&(await Me.remove(n.id,w.dataset.remove),fe("Видалено зі списку друзів","info"),await vn())})}),e.querySelectorAll("[data-profile], [data-view-profile]").forEach(w=>{w.addEventListener("click",()=>ve(`profile/${w.dataset.profile||w.dataset.viewProfile}`))})}async function cw(){const n=Pe.currentUser();if(!n){ve("home");return}await Mt(n.id,!0)}async function Mt(n,e=!1){var u,h,p,y;const t=document.getElementById("page-root");zn(t);const[r,s,i]=await Promise.all([de.byId(n),Fe.byUser(n),ba.byUser(n)]);if(!r){t.innerHTML='<div class="page-container"><div class="empty-state"><div class="empty-icon">😕</div><h3>Користувача не знайдено</h3></div></div>';return}const a=r.top4||[null,null,null,null],l=await Promise.all(a.map(_=>_?Fe.byId(_):Promise.resolve(null)));if(t.innerHTML=`
    <div class="page-container">
      <!-- Profile Header -->
      <div class="profile-header">
        <div id="avatar-wrap" style="cursor:${e?"pointer":"default"};position:relative">
          ${Qe(r,"xl")}
          ${e?'<div style="position:absolute;bottom:4px;right:4px;background:var(--accent);border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px">📷</div>':""}
        </div>
        ${e?'<input type="file" id="avatar-file" accept="image/*" style="display:none">':""}
        <div class="profile-info">
          <div class="profile-name">${M(r.username)}</div>
          ${r.bio?`<div class="profile-bio">${M(r.bio)}</div>`:e?'<div class="profile-bio" style="color:var(--text-muted);font-style:italic">Додайте опис в налаштуваннях</div>':""}
          <div class="profile-stats">
            <div class="profile-stat"><div class="stat-value">${s.length}</div><div class="stat-label">Рецензій</div></div>
            <div class="profile-stat"><div class="stat-value">${s.filter(_=>_.status==="done").length}</div><div class="stat-label">Завершено</div></div>
            <div class="profile-stat"><div class="stat-value">${s.filter(_=>_.status==="reading").length}</div><div class="stat-label">Читаю</div></div>
            <div class="profile-stat"><div class="stat-value">${s.filter(_=>_.status==="planned").length}</div><div class="stat-label">В планах</div></div>
            <div class="profile-stat"><div class="stat-value">${s.filter(_=>_.status==="dropped").length}</div><div class="stat-label">Кинуто</div></div>
          </div>
          ${e?'<div style="margin-top:16px"><button class="btn btn-secondary btn-sm" id="edit-account-btn">⚙️ Налаштування</button></div>':""}
          <div id="friend-btn-area"></div>
        </div>
      </div>

      <!-- Top 4 -->
      <div style="margin-bottom:32px">
        <div class="section-title">⭐ Топ 4 манхви</div>
        <div class="top4-grid">
          ${l.map((_,w)=>`
            <div class="top4-slot${e?"":" no-hover"}" data-slot="${w}">
              ${_!=null&&_.coverBase64?`<img src="${_.coverBase64}" alt="${M((_==null?void 0:_.title)||"")}">`:e?"+":"?"}
              ${_&&e?`<button class="top4-slot-remove" data-remove-slot="${w}">✕</button>`:""}
            </div>`).join("")}
        </div>
        ${e?'<p style="color:var(--text-muted);font-size:0.78rem;margin-top:8px">Натисніть на слот, щоб обрати манхву</p>':""}
      </div>

      <!-- Recent Reviews -->
      <div style="margin-bottom:32px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <div class="section-title" style="margin:0">📚 Останні рецензії</div>
          ${s.length>6?'<span class="see-all-link" id="see-all-btn">Дивитися всі →</span>':""}
        </div>
        ${s.length===0?`<div class="empty-state"><div class="empty-icon">📖</div><h3>Ще немає рецензій</h3>${e?'<p><button class="btn btn-primary btn-sm" id="add-first-review">✍️ Написати першу</button></p>':""}</div>`:`<div class="manhwa-grid">
              ${s.slice(0,6).map(_=>`
                <div class="manhwa-thumb-wrap" style="display:flex;flex-direction:column;align-items:center;cursor:pointer" data-review-id="${_.id}" title="${M(_.title)}">
                  <div class="manhwa-thumb">
                    ${_.coverBase64?`<img src="${_.coverBase64}" alt="${M(_.title)}">`:'<div class="manhwa-thumb-placeholder">📖</div>'}
                  </div>
                  <div style="font-size:0.75rem;font-weight:600;margin-top:6px;text-align:center;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;width:100%">${M(_.title)}</div>
                </div>`).join("")}
             </div>
             <button class="btn btn-secondary" id="library-btn" style="width:100%;margin-top:16px">Дивитися всі манхви</button>`}
      </div>

      <!-- Playlists -->
      <div style="margin-bottom:32px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <div class="section-title" style="margin:0">📂 Мої плейлісти</div>
          ${e?'<button class="btn btn-primary btn-sm" id="create-playlist-btn">➕ Створити</button>':""}
        </div>
        ${i.length===0?'<div class="empty-state"><div class="empty-icon">📁</div><h3>Ще немає плейлістів</h3></div>':`<div class="manhwa-grid">
              ${i.map(_=>`
                <div class="playlist-card" data-playlist-id="${_.id}" style="background:var(--bg-surface);padding:16px;border-radius:var(--radius-md);border:1px solid var(--border);cursor:pointer;text-align:center;display:flex;flex-direction:column;justify-content:center;min-height:120px;transition:0.2s">
                  <div style="font-size:2rem;margin-bottom:8px">📑</div>
                  <div style="font-weight:600;font-size:0.9rem;line-height:1.2;margin-bottom:4px">${M(_.name)}</div>
                  <div style="font-size:0.75rem;color:var(--text-muted)">${_.reviewIds.length} манхв</div>
                </div>`).join("")}
             </div>`}
      </div>
    </div>
    <div id="edit-modal-placeholder"></div>
    <div id="top4-modal-placeholder"></div>
    <div id="playlist-modal-placeholder"></div>`,t.querySelectorAll("[data-review-id]").forEach(_=>{_.addEventListener("click",()=>ve(`review/${_.dataset.reviewId}`))}),(u=document.getElementById("library-btn"))==null||u.addEventListener("click",()=>ve(`all-reviews/${n}`)),(h=document.getElementById("add-first-review"))==null||h.addEventListener("click",()=>ve("new-review")),t.querySelectorAll("[data-playlist-id]").forEach(_=>{_.addEventListener("click",()=>{const w=i.find(R=>R.id===_.dataset.playlistId);w&&dw(w,s,n,e)})}),e){const _=document.getElementById("avatar-wrap"),w=document.getElementById("avatar-file");_==null||_.addEventListener("click",()=>w.click()),w==null||w.addEventListener("change",async()=>{const R=w.files[0];if(!R)return;const x=await iw(R),k=Pe.currentUser();await de.save({...k,avatarBase64:x}),fe("Аватар оновлено ✅","success"),await Mt(n,e)}),(p=document.getElementById("edit-account-btn"))==null||p.addEventListener("click",()=>hw(r)),t.querySelectorAll("[data-slot]").forEach(R=>{R.addEventListener("click",x=>{x.target.dataset.removeSlot===void 0&&pw(n,parseInt(R.dataset.slot),s)})}),t.querySelectorAll("[data-remove-slot]").forEach(R=>{R.addEventListener("click",async x=>{x.stopPropagation();const k=parseInt(R.dataset.removeSlot),B=await de.byId(n),j=[...B.top4||[null,null,null,null]];j[k]=null,await de.save({...B,top4:j}),await Mt(n,e)})}),(y=document.getElementById("create-playlist-btn"))==null||y.addEventListener("click",()=>uw(n,s))}}function uw(n,e){const t=document.getElementById("playlist-modal-placeholder");t.innerHTML=`
    <div class="modal-backdrop" id="playlist-create-modal">
      <div class="modal-box modal-box-lg">
        <div class="modal-header">
          <span class="modal-title">📑 Новий плейліст</span>
          <button class="modal-close" id="pc-close">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-body-scroll">
            <div class="form-group" style="margin-bottom:16px">
              <label class="form-label">Назва плейлісту <span style="color:var(--accent)">*</span></label>
              <input class="input" type="text" id="pc-name" placeholder="Мої улюблені...">
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label class="form-label">Виберіть манхви</label>
              <div style="display:flex;flex-direction:column;gap:8px;max-height:300px;overflow-y:auto;padding:8px" class="modal-body-scroll">
                ${e.length===0?'<div style="color:var(--text-muted)">Немає рецензій для вибору</div>':e.map(i=>`
                    <label style="display:flex;align-items:center;gap:12px;cursor:pointer;padding:8px;background:var(--bg-surface);border-radius:var(--radius-sm)">
                      <input type="checkbox" value="${i.id}" class="pc-review-cb" style="width:18px;height:18px;cursor:pointer">
                      ${i.coverBase64?`<img src="${i.coverBase64}" style="width:36px;height:48px;object-fit:cover;border-radius:4px">`:'<div style="width:36px;height:48px;background:var(--bg-hover);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:12px">📖</div>'}
                      <div style="flex:1;font-weight:500;font-size:0.9rem">${M(i.title)}</div>
                    </label>
                  `).join("")}
              </div>
            </div>
            <div id="pc-error" class="form-error" style="display:none;margin-bottom:12px"></div>
            <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px">
              <button class="btn btn-secondary" id="pc-close2">Скасувати</button>
              <button class="btn btn-primary" id="pc-save-btn">Створити</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;const r=()=>{t.innerHTML=""};document.getElementById("pc-close").addEventListener("click",r),document.getElementById("pc-close2").addEventListener("click",r);const s=document.getElementById("pc-save-btn");s.addEventListener("click",async()=>{const i=document.getElementById("pc-name").value.trim();if(!i){const l=document.getElementById("pc-error");l.textContent="Назва обов'язкова",l.style.display="block";return}const a=Array.from(document.querySelectorAll(".pc-review-cb:checked")).map(l=>l.value);s.disabled=!0,s.textContent="...",await ba.create(n,i,a),fe("Плейліст створено!","success"),r(),await Mt(n,!0)})}function dw(n,e,t,r){const s=document.getElementById("playlist-modal-placeholder"),i=n.reviewIds.map(l=>e.find(u=>u.id===l)).filter(Boolean);s.innerHTML=`
    <div class="modal-backdrop" id="playlist-view-modal">
      <div class="modal-box modal-box-lg">
        <div class="modal-header">
          <span class="modal-title">📑 ${M(n.name)}</span>
          <button class="modal-close" id="pv-close">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-body-scroll" style="max-height:450px;overflow-y:auto;padding-right:8px">
            ${i.length===0?'<div class="empty-state"><h3>Плейліст порожній</h3></div>':i.map(l=>`
                <div class="review-card" style="margin-bottom:10px;cursor:pointer" data-pv-review="${l.id}">
                  <div class="review-cover" style="width:60px">
                    ${l.coverBase64?`<img src="${l.coverBase64}" alt="">`:'<div class="review-cover-placeholder">📖</div>'}
                  </div>
                  <div class="review-body">
                    <div class="review-title">${M(l.title)}</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px">📚 ${l.chapters||0} глав | Оцінка: ${l.status==="planned"?"-":l.status==="dropped"?"Кинуто":l.rating}</div>
                  </div>
                </div>
              `).join("")}
          </div>
          ${r?`
            <div style="margin-top:20px;border-top:1px solid var(--border);padding-top:16px">
              <button class="btn btn-danger btn-sm" id="pv-del-btn">🗑 Видалити плейліст</button>
            </div>
          `:""}
        </div>
      </div>
    </div>`;const a=()=>{s.innerHTML=""};document.getElementById("pv-close").addEventListener("click",a),s.querySelectorAll("[data-pv-review]").forEach(l=>{l.addEventListener("click",()=>{a(),ve(`review/${l.dataset.pvReview}`)})}),r&&document.getElementById("pv-del-btn").addEventListener("click",async()=>{window.confirm("Дійсно видалити цей плейліст?")&&(document.getElementById("pv-del-btn").disabled=!0,await ba.delete(n.id),fe("Плейліст видалено","info"),a(),await Mt(t,r))})}function hw(n){const e=document.getElementById("edit-modal-placeholder");e.innerHTML=`
    <div class="modal-backdrop" id="edit-modal">
      <div class="modal-box">
        <div class="modal-header">
          <span class="modal-title">⚙️ Налаштування акаунту</span>
          <button class="modal-close" id="edit-modal-close">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Тема сайту</label>
            <select class="select" id="edit-theme">
              <option value="dark" ${localStorage.getItem("theme")!=="light"?"selected":""}>🌙 Темна тема</option>
              <option value="light" ${localStorage.getItem("theme")==="light"?"selected":""}>☀️ Світла тема</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:14px; display:flex; flex-direction:row; align-items:center; justify-content:space-between;">
            <label class="form-label" for="edit-push" style="margin:0;cursor:pointer">Отримувати Push-повідомлення</label>
            <label class="ios-switch">
              <input type="checkbox" id="edit-push" ${localStorage.getItem("push_enabled")==="true"?"checked":""}>
              <span class="ios-slider"></span>
            </label>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Опис</label>
            <textarea class="textarea" id="edit-bio" style="min-height:80px">${M(n.bio||"")}</textarea>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Email</label>
            <input class="input" type="email" id="edit-email" value="${M(n.email||"")}">
          </div>
          <div class="divider"></div>
          <div class="section-title" style="font-size:0.95rem;margin-bottom:12px">🔑 Змінити пароль</div>
          <div class="form-group" style="margin-bottom:10px">
            <label class="form-label">Старий пароль</label>
            <input class="input" type="password" id="edit-old-password">
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Новий пароль</label>
            <input class="input" type="password" id="edit-new-password" placeholder="Мінімум 6 символів">
          </div>
          <div id="edit-error" class="form-error" style="display:none;margin-bottom:10px"></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
            <button class="btn btn-secondary" id="save-edit-btn" style="flex:1;transition:0.2s" disabled>💾 Зберегти</button>
            <button class="btn btn-secondary" id="edit-modal-close2">Скасувати</button>
          </div>
          <div class="divider"></div>
          <button class="btn btn-danger" style="width:100%" id="delete-account-btn">🗑️ Видалити акаунт</button>
        </div>
      </div>
    </div>`;const t=()=>e.innerHTML="";document.getElementById("edit-modal-close").addEventListener("click",t),document.getElementById("edit-modal-close2").addEventListener("click",t),document.getElementById("edit-modal").addEventListener("click",i=>{i.target.id==="edit-modal"&&t()});const r=document.getElementById("save-edit-btn"),s=()=>{r.disabled=!1,r.classList.remove("btn-secondary"),r.classList.add("btn-active-green")};e.querySelectorAll("#edit-old-password, #edit-new-password, #edit-bio").forEach(i=>i.addEventListener("input",s)),e.querySelectorAll("#edit-theme, #edit-push").forEach(i=>i.addEventListener("change",s)),r.addEventListener("click",async()=>{const i=document.getElementById("edit-bio").value.trim(),a=document.getElementById("edit-email").value.trim(),l=document.getElementById("edit-old-password").value,u=document.getElementById("edit-new-password").value,h=document.getElementById("edit-theme").value,p=document.getElementById("edit-push").checked,y=document.getElementById("edit-error"),_=document.getElementById("save-edit-btn");if(_.disabled=!0,_.textContent="Збереження...",localStorage.setItem("theme",h),document.documentElement.setAttribute("data-theme",h),localStorage.setItem("push_enabled",p),l||u){const w=await rw(n.id,l,u);if(w.error){y.textContent=w.error,y.style.display="block",_.disabled=!1,_.textContent="💾 Зберегти";return}}await de.save({...await de.byId(n.id),bio:i,email:a}),t(),fe("Акаунт оновлено ✅","success"),await Mt(n.id,!0)}),document.getElementById("delete-account-btn").addEventListener("click",()=>{fw(n)})}function fw(n){const e=document.getElementById("edit-modal-placeholder");e.innerHTML=`
    <div class="modal-backdrop" id="delete-modal">
      <div class="modal-box">
        <div class="modal-header">
          <span class="modal-title" style="color:var(--accent)">⚠️ Видалення акаунту</span>
          <button class="modal-close" id="del-modal-close">✕</button>
        </div>
        <div class="modal-body">
          <p style="color:var(--text-secondary);margin-bottom:16px;line-height:1.6">
            Ця дія <strong style="color:var(--accent)">незворотна</strong>. Всі ваші рецензії та дані будуть видалені назавжди.
          </p>
          <div class="form-group" style="margin-bottom:16px">
            <label class="form-label">Введіть ваш пароль для підтвердження</label>
            <input class="input" type="password" id="delete-confirm-password" placeholder="Ваш пароль">
          </div>
          <div id="del-error" class="form-error" style="display:none;margin-bottom:12px"></div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-danger" id="confirm-delete-btn" style="flex:1">🗑️ Так, видалити акаунт</button>
            <button class="btn btn-secondary" id="del-modal-close2">Скасувати</button>
          </div>
        </div>
      </div>
    </div>`;const t=()=>e.innerHTML="";document.getElementById("del-modal-close").addEventListener("click",t),document.getElementById("del-modal-close2").addEventListener("click",t),document.getElementById("confirm-delete-btn").addEventListener("click",async()=>{const r=document.getElementById("delete-confirm-password").value,s=document.getElementById("del-error"),i=document.getElementById("confirm-delete-btn");i.disabled=!0,i.textContent="Видалення...";try{const a=await Fe.byUser(n.id);for(const u of a)await Fe.delete(u.id);await de.delete(n.id),await jn(re(H,"usernames",n.username.toLowerCase()));const l=await sw(r);if(l.error){s.textContent=l.error,s.style.display="block",i.disabled=!1,i.textContent="🗑️ Так, видалити акаунт";return}fe("Акаунт видалено. До побачення!","info"),setTimeout(()=>{window.location.hash="home",window.location.reload()},800)}catch(a){s.textContent=a.message,s.style.display="block",i.disabled=!1,i.textContent="🗑️ Так, видалити акаунт"}})}function pw(n,e,t){const r=document.getElementById("top4-modal-placeholder");r.innerHTML=`
    <div class="modal-backdrop" id="top4-modal">
      <div class="modal-box modal-box-lg">
        <div class="modal-header">
          <span class="modal-title">🎬 Обрати манхву для топ 4</span>
          <button class="modal-close" id="top4-modal-close">✕</button>
        </div>
        <div class="modal-body">
          <input class="input" id="top4-search" placeholder="🔍  Пошук..." style="margin-bottom:16px">
          <div class="manhwa-grid">
            ${t.length===0?"<div class='empty-state'><h3>Немає рецензій</h3></div>":t.map(i=>`
                <div class="manhwa-thumb" data-pick-review="${i.id}" title="${M(i.title)}">
                  ${i.coverBase64?`<img src="${i.coverBase64}" alt="">`:`<div class="manhwa-thumb-placeholder" style="font-size:11px;padding:4px;text-align:center;word-break:break-word">${M(i.title)}</div>`}
                </div>`).join("")}
          </div>
        </div>
      </div>
    </div>`;const s=()=>r.innerHTML="";document.getElementById("top4-modal-close").addEventListener("click",s),document.getElementById("top4-modal").addEventListener("click",i=>{i.target.id==="top4-modal"&&s()}),document.getElementById("top4-search").addEventListener("input",i=>{const a=i.target.value.toLowerCase();r.querySelectorAll("[data-pick-review]").forEach(l=>{l.style.display=!a||l.title.toLowerCase().includes(a)?"":"none"})}),r.querySelectorAll("[data-pick-review]").forEach(i=>{i.addEventListener("click",async()=>{const a=await de.byId(n),l=[...a.top4||[null,null,null,null]];l[e]=i.dataset.pickReview,await de.save({...a,top4:l}),s(),await Mt(n,!0)})})}async function So({id:n}){var t,r;const e=Pe.currentUser();if(e&&e.id===n){ve("account");return}if(await Mt(n,!1),e&&document.querySelector(".profile-info")){const i=await Me.between(e.id,n);let a="";i?i.status==="pending"?i.requesterId===e.id?a='<button class="btn btn-secondary btn-sm" disabled>⏳ Запит надіслано</button>':a='<button class="btn btn-primary btn-sm" id="accept-friend-profile-btn">✅ Прийняти запит</button>':a='<button class="btn btn-secondary btn-sm" disabled>✅ Друзі</button>':a='<button class="btn btn-primary btn-sm" id="add-friend-profile-btn">➕ Додати в друзі</button>';const l=document.getElementById("friend-btn-area");l&&(l.style.marginTop="12px",l.innerHTML=a),(t=document.getElementById("add-friend-profile-btn"))==null||t.addEventListener("click",async()=>{await Me.send(e.id,n),await sn.add("friend",e.id,n,{username:e.username}),fe("Запит надіслано!","success"),await So({id:n})}),(r=document.getElementById("accept-friend-profile-btn"))==null||r.addEventListener("click",async()=>{await Me.accept(n,e.id);const u=await de.byId(n);await sn.add("friend",e.id,n,{username:e.username,friendName:(u==null?void 0:u.username)||"Unknown"}).catch(console.error),fe("Тепер ви друзі ✅","success"),await So({id:n})})}}async function Po({id:n}){var R,x,k,B,j;const e=document.getElementById("page-root");zn(e);const[t,r]=await Promise.all([Fe.byId(n),Promise.resolve(Pe.currentUser())]);if(!t){e.innerHTML='<div class="page-container"><div class="empty-state"><div class="empty-icon">😕</div><h3>Рецензія не знайдена</h3></div></div>';return}const s=await de.byId(t.userId),i=r&&r.id===t.userId,a=t.status==="dropped",l=t.status==="planned",u={done:"✅ Завершено",reading:"📖 Читаю",planned:"⏳ В планах",dropped:"❌ Кинув"},h={done:"status-done",reading:"status-reading",planned:"status-planned",dropped:"status-dropped"},p=t.likes||[],y=t.dislikes||[],_=r&&p.includes(r.id),w=r&&y.includes(r.id);e.innerHTML=`
    <div class="page-container" style="max-width:860px">
      <button class="btn btn-ghost btn-sm" id="back-btn" style="margin-bottom:20px">← Назад</button>

      <div class="review-full-layout">
        <div class="review-full-cover">
          ${t.coverBase64?`<img src="${t.coverBase64}" alt="${M(t.title)}">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:48px;background:var(--bg-surface)">📖</div>'}
        </div>
        <div class="review-full-body">
          <div class="review-full-title">${M(t.title)}</div>
          <div class="review-full-author">
            ${Qe(s,"sm")}
            <a href="#" data-profile="${t.userId}" style="color:var(--accent3);font-weight:600;text-decoration:none;font-size:0.9rem">${M((s==null?void 0:s.username)||t.username||"Невідомий")}</a>
          </div>
          <div class="review-full-meta">
            <span class="status-badge ${h[t.status]||""}">${u[t.status]||""}</span>
            <span style="color:var(--text-muted);font-size:0.85rem">📚 ${t.chapters||0} глав</span>
            ${t.date?`<span style="color:var(--text-muted);font-size:0.85rem">📅 ${hh(t.date)}</span>`:""}
            <span style="color:var(--text-muted);font-size:0.85rem">🕐 ${Mn(t.createdAt)}</span>
          </div>
          <div style="margin-bottom:12px">
            ${l?'<span style="color:var(--text-muted);font-size:0.9rem">Ще не оцінено</span>':Ws(t.rating,a)}
            ${l?"":`<span style="color:var(--text-muted);font-size:0.85rem;margin-left:8px">${a?"Кинуто":`${t.rating}/10`}</span>`}
          </div>
          ${(R=t.tags)!=null&&R.length?`<div class="review-tags">${t.tags.map(U=>`<span class="tag">${M(U)}</span>`).join("")}</div>`:""}
          ${t.updatedAt?`<span class="edited-badge">Редаговано ${Mn(t.updatedAt)}</span>`:""}

          <!-- Reactions -->
          <div class="review-action-bar" style="margin-top:16px">
            <button class="reaction-btn ${_?"liked":""}" id="rv-like-btn" data-id="${n}">👍 ${p.length}</button>
            <button class="reaction-btn ${w?"disliked":""}" id="rv-dislike-btn" data-id="${n}">👎 ${y.length}</button>
          </div>

          ${i?`
            <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
              <button class="btn btn-secondary btn-sm" id="edit-review-btn">✏️ Редагувати</button>
              <button class="btn btn-danger btn-sm" id="delete-review-btn">🗑️ Видалити</button>
            </div>`:""}
        </div>
      </div>

      ${t.text?`<div class="card card-padding" style="margin-bottom:24px"><div class="review-full-text">${M(t.text)}</div></div>`:""}

      <!-- Comments -->
      <div class="comments-section">
        <div class="section-title">💬 Коментарі</div>
        <div id="comments-list"><div style="display:flex;justify-content:center;padding:24px"><div class="loader-spinner"></div></div></div>
        ${r?`
          <div style="display:flex;gap:12px;margin-top:20px;align-items:flex-start">
            ${Qe(r,"sm")}
            <div style="flex:1">
              <textarea class="textarea" id="new-comment-text" placeholder="Залиште коментар..." style="min-height:80px"></textarea>
              <button class="btn btn-primary btn-sm" id="post-comment-btn" style="margin-top:8px">Надіслати</button>
            </div>
          </div>`:'<p style="color:var(--text-muted);font-size:0.875rem;margin-top:16px"><a href="#" id="login-to-comment" style="color:var(--accent)">Увійдіть</a>, щоб залишити коментар</p>'}
      </div>
    </div>`,document.getElementById("back-btn").addEventListener("click",()=>history.back()),e.querySelectorAll("[data-profile]").forEach(U=>{U.addEventListener("click",Y=>{Y.preventDefault(),ve(`profile/${U.dataset.profile}`)})}),r&&((x=document.getElementById("rv-like-btn"))==null||x.addEventListener("click",async()=>{await Fe.toggleLike(n,r.id),Po({id:n})}),(k=document.getElementById("rv-dislike-btn"))==null||k.addEventListener("click",async()=>{await Fe.toggleDislike(n,r.id),Po({id:n})})),i&&(document.getElementById("edit-review-btn").addEventListener("click",()=>ve(`edit-review/${n}`)),document.getElementById("delete-review-btn").addEventListener("click",async()=>{window.confirm("Видалити цю рецензію? Це неможливо скасувати.")&&(await Fe.delete(n),fe("Рецензію видалено","info"),ve("account"))})),(B=document.getElementById("login-to-comment"))==null||B.addEventListener("click",U=>{U.preventDefault(),ms(()=>Promise.resolve().then(()=>Ss),void 0,import.meta.url).then(Y=>Y.showAuthModal("login"))}),(j=document.getElementById("post-comment-btn"))==null||j.addEventListener("click",async()=>{const U=document.getElementById("new-comment-text").value.trim();if(!U)return;const Y=document.getElementById("post-comment-btn");Y.disabled=!0,Y.textContent="...",await yn.create(n,r.id,U),document.getElementById("new-comment-text").value="",Y.disabled=!1,Y.textContent="Надіслати",await wn(n,r),fe("Коментар додано","success")}),await wn(n,r)}async function wn(n,e){const t=document.getElementById("comments-list");if(!t)return;const r=await yn.byReview(n),s=r.filter(a=>!a.parentId),i=r.filter(a=>a.parentId);if(s.length===0){t.innerHTML='<div class="empty-state" style="padding:24px"><div class="empty-icon">💬</div><h3>Коментарів поки немає</h3></div>';return}t.innerHTML=s.map(a=>mw(a,i,e)).join(""),t.querySelectorAll("[data-comment-like]").forEach(a=>{a.addEventListener("click",async()=>{e&&(await yn.toggleLike(a.dataset.commentLike,e.id),await wn(n,e))})}),t.querySelectorAll("[data-comment-dislike]").forEach(a=>{a.addEventListener("click",async()=>{e&&(await yn.toggleDislike(a.dataset.commentDislike,e.id),await wn(n,e))})}),t.querySelectorAll("[data-reply-btn]").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.replyBtn,u=document.getElementById(`reply-form-${l}`);if(u){u.remove();return}const h=document.createElement("div");h.id=`reply-form-${l}`,h.className="comment-item reply",h.style.borderBottom="none",h.innerHTML=`<div style="flex:1;display:flex;gap:8px;align-items:flex-start">
        <div style="flex:1">
          <textarea class="textarea" placeholder="Ваша відповідь..." style="min-height:60px;font-size:0.85rem"></textarea>
          <div style="display:flex;gap:8px;margin-top:6px">
            <button class="btn btn-primary btn-xs reply-submit-btn">Відповісти</button>
            <button class="btn btn-ghost btn-xs reply-cancel-btn">Скасувати</button>
          </div>
        </div>
      </div>`,a.closest(".comment-item").after(h),h.querySelector(".reply-cancel-btn").addEventListener("click",()=>h.remove()),h.querySelector(".reply-submit-btn").addEventListener("click",async()=>{const p=h.querySelector("textarea").value.trim();!p||!e||(h.querySelector(".reply-submit-btn").disabled=!0,await yn.create(n,e.id,p,l),await wn(n,e))})})}),t.querySelectorAll("[data-delete-comment]").forEach(a=>{a.addEventListener("click",async()=>{window.confirm("Видалити коментар?")&&(await yn.delete(a.dataset.deleteComment),await wn(n,e))})})}function mw(n,e,t){const r=e.filter(u=>u.parentId===n.id),s=t&&t.id===n.userId,i=n.likes||[],a=n.dislikes||[],l={username:n.username,avatarBase64:n.avatarBase64};return`<div class="comment-item">
    ${Qe(l,"sm")}
    <div class="comment-body">
      <div class="comment-header">
        <span class="comment-author" data-profile="${n.userId}" style="cursor:pointer">${M(n.username||"Незнайомець")}</span>
        <span class="comment-ts">${Mn(n.createdAt)}</span>
      </div>
      <div class="comment-text">${M(n.text)}</div>
      <div class="comment-actions">
        <button class="reaction-btn ${t&&i.includes(t.id)?"liked":""}" data-comment-like="${n.id}">👍 ${i.length}</button>
        <button class="reaction-btn ${t&&a.includes(t.id)?"disliked":""}" data-comment-dislike="${n.id}">👎 ${a.length}</button>
        ${t?`<button class="btn btn-ghost btn-xs" data-reply-btn="${n.id}">💬 Відповісти</button>`:""}
        ${s?`<button class="btn btn-danger btn-xs" data-delete-comment="${n.id}">🗑</button>`:""}
      </div>
    </div>
  </div>
  ${r.map(u=>{const h=u.likes||[],p=u.dislikes||[],y={username:u.username,avatarBase64:u.avatarBase64};return`<div class="comment-item reply">
      ${Qe(y,"sm")}
      <div class="comment-body">
        <div class="comment-header">
          <span class="comment-author">${M(u.username||"Незнайомець")}</span>
          <span class="comment-ts">${Mn(u.createdAt)}</span>
        </div>
        <div class="comment-text">${M(u.text)}</div>
        <div class="comment-actions">
          <button class="reaction-btn ${t&&h.includes(t.id)?"liked":""}" data-comment-like="${u.id}">👍 ${h.length}</button>
          <button class="reaction-btn ${t&&p.includes(t.id)?"disliked":""}" data-comment-dislike="${u.id}">👎 ${p.length}</button>
          ${(t==null?void 0:t.id)===u.userId?`<button class="btn btn-danger btn-xs" data-delete-comment="${u.id}">🗑</button>`:""}
        </div>
      </div>
    </div>`}).join("")}`}async function gw({userId:n}){const e=document.getElementById("page-root");zn(e);const[t,r]=await Promise.all([de.byId(n),Fe.byUser(n)]);if(!t){e.innerHTML='<div class="page-container"><div class="empty-state"><h3>Користувача не знайдено</h3></div></div>';return}e.innerHTML=`
    <div class="page-container">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;flex-wrap:wrap">
        <button class="btn btn-ghost btn-sm" id="back-btn">← Назад</button>
        ${Qe(t,"sm")}
        <div>
          <div style="font-family:var(--font-display);font-weight:700;font-size:1.1rem">Бібліотека: ${M(t.username)}</div>
          <div style="color:var(--text-muted);font-size:0.8rem">Всього збережено — ${r.length} манхв</div>
        </div>
      </div>

      <!-- Sorting Bar -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;align-items:center" id="sort-controls">
        <div style="font-size:0.9rem;color:var(--text-muted);margin-right:8px">Сортувати:</div>
        <button class="btn btn-secondary btn-sm sort-btn active" data-sort="rating" data-dir="desc">⭐ Оцінка ⬇️</button>
        <button class="btn btn-secondary btn-sm sort-btn" data-sort="date" data-dir="desc">📅 Дата ⬇️</button>
        <button class="btn btn-secondary btn-sm sort-btn" data-sort="status" data-dir="desc">📌 Статус ⬇️</button>
        <button class="btn btn-secondary btn-sm sort-btn" data-sort="chapters" data-dir="desc">📚 Глави ⬇️</button>
        <input class="input" id="all-reviews-search" placeholder="🔍 Пошук..." style="max-width:220px;margin-left:auto">
      </div>

      <div id="all-reviews-grid" style="display:flex;flex-direction:column;gap:10px">
        ${zc(r)}
      </div>
    </div>`,document.getElementById("back-btn").addEventListener("click",()=>history.back());const s=()=>{e.querySelectorAll("[data-review-id]").forEach(y=>{y.addEventListener("click",()=>ve(`review/${y.dataset.reviewId}`))})};let i="rating",a="desc",l="";const u=document.getElementById("all-reviews-grid"),h=(y,_)=>_==="rating"?y.rating:_==="chapters"?y.chapters||0:_==="date"?new Date(y.date||y.createdAt).getTime():_==="status"&&{done:4,reading:3,planned:2,dropped:1}[y.status]||0,p=()=>{let y=[...r];l&&(y=y.filter(_=>_.title.toLowerCase().includes(l))),y.sort((_,w)=>{const R=h(_,i),x=h(w,i);return R<x?a==="desc"?1:-1:R>x?a==="desc"?-1:1:0}),u.innerHTML=zc(y),s()};e.querySelectorAll(".sort-btn").forEach(y=>{y.addEventListener("click",()=>{const _=y.dataset.sort;i===_?(a=a==="desc"?"asc":"desc",y.dataset.dir=a):(e.querySelectorAll(".sort-btn").forEach(R=>{R.classList.remove("active"),R!==y&&(R.dataset.dir="desc",R.innerHTML=R.innerHTML.replace("⬆️","⬇️"))}),y.classList.add("active"),i=_,a="desc",y.dataset.dir="desc");const w=a==="desc"?"⬇️":"⬆️";y.innerHTML=y.innerHTML.replace(/⬇️|⬆️/,w),p()})}),document.getElementById("all-reviews-search").addEventListener("input",y=>{l=y.target.value.toLowerCase().trim(),p()}),p()}function zc(n){if(n.length===0)return'<div class="empty-state"><div class="empty-icon">📭</div><h3>Нічого не знайдено</h3></div>';const e={done:"✅ Завершено",reading:"📖 Читаю",planned:"⏳ В планах",dropped:"❌ Кинув"},t={done:"status-done",reading:"status-reading",planned:"status-planned",dropped:"status-dropped"};return n.map(r=>{var i;const s=r.status==="dropped"||r.status==="planned";return`<div class="review-card" style="cursor:pointer" data-review-id="${r.id}">
      <div class="review-cover" style="width:80px">
        ${r.coverBase64?`<img src="${r.coverBase64}" alt="${M(r.title)}">`:'<div class="review-cover-placeholder">📖</div>'}
      </div>
      <div class="review-body">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
          <div class="review-date">${r.date?hh(r.date):Mn(r.createdAt)}</div>
          <span class="status-badge ${t[r.status]||""}" style="font-size:0.7rem">${e[r.status]||""}</span>
          <span style="color:var(--text-muted);font-size:0.75rem">📚 ${r.chapters||0} глав</span>
        </div>
        <div class="review-title">${M(r.title)}</div>
        <div style="margin:6px 0">${r.status==="planned"?'<span style="color:var(--text-muted);font-size:0.8rem">Ще не оцінено</span>':Ws(r.rating,s)}</div>
        ${(i=r.tags)!=null&&i.length?`<div class="review-tags">${r.tags.map(a=>`<span class="tag">${M(a)}</span>`).join("")}</div>`:""}
        ${r.text?`<div class="review-text-preview" style="margin-top:6px">${M(r.text)} <span style="color:var(--accent)">...</span></div>`:""}
      </div>
    </div>`}).join("")}let Co=!1;function yw(){document.addEventListener("keydown",t=>{t.key==="Escape"&&document.querySelectorAll(".modal-backdrop").forEach(r=>{const s=r.querySelector(".modal-close, #edit-modal-close2, #del-modal-close2");s?s.click():r.remove()})});const n=document.getElementById("app");n.innerHTML="";const e=document.createElement("div");e.id="page-root",n.appendChild(e),J_(()=>{Ro(),window.scrollTo({top:0,behavior:"smooth"})}),st("home",()=>ow()),st("faq",()=>lw()),st("new-review",()=>{if(!Pe.currentUser()){ms(()=>Promise.resolve().then(()=>Ss),void 0,import.meta.url).then(t=>t.showAuthModal("login")),window.location.hash="home";return}jc(null)}),st("edit-review/:id",({id:t})=>{if(!Pe.currentUser()){window.location.hash="home";return}jc(t)}),st("friends",()=>{if(!Pe.currentUser()){ms(()=>Promise.resolve().then(()=>Ss),void 0,import.meta.url).then(t=>t.showAuthModal("login")),window.location.hash="home";return}vn()}),st("account",()=>{if(!Pe.currentUser()){ms(()=>Promise.resolve().then(()=>Ss),void 0,import.meta.url).then(t=>t.showAuthModal("login")),window.location.hash="home";return}cw()}),st("profile/:id",({id:t})=>So({id:t})),st("review/:id",({id:t})=>Po({id:t})),st("all-reviews/:userId",({userId:t})=>gw({userId:t})),Ro(),Co||(X_(),Co=!0)}xm(jt,async n=>{if(n){const e=await de.byId(n.uid);Pe.setProfile(e?{...e,id:n.uid}:{id:n.uid,username:n.displayName||"User"})}else Pe.setProfile(null);Co?Ro():yw()});
