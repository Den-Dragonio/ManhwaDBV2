(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const Kd="modulepreload",Gd=function(n,e){return new URL(n,e).href},bl={},ms=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),u=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=Promise.allSettled(t.map(d=>{if(d=Gd(d,r),d in bl)return;bl[d]=!0;const p=d.endsWith(".css"),g=p?'[rel="stylesheet"]':"";if(!!r)for(let S=a.length-1;S>=0;S--){const D=a[S];if(D.href===d&&(!p||D.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${g}`))return;const w=document.createElement("link");if(w.rel=p?"stylesheet":Kd,p||(w.as="script"),w.crossOrigin="",w.href=d,u&&w.setAttribute("nonce",u),document.head.appendChild(w),p)return new Promise((S,D)=>{w.addEventListener("load",S),w.addEventListener("error",()=>D(new Error(`Unable to preload CSS for ${d}`)))})}))}function i(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return s.then(a=>{for(const l of a||[])l.status==="rejected"&&i(l.reason);return e().catch(i)})};var Al={};/**
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
 */const zc=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Qd=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Hc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,p=i>>2,g=(i&3)<<4|l>>4;let T=(l&15)<<2|d>>6,w=d&63;u||(w=64,a||(T=64)),r.push(t[p],t[g],t[T],t[w])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(zc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Qd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const g=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||d==null||g==null)throw new Yd;const T=i<<2|l>>4;if(r.push(T),d!==64){const w=l<<4&240|d>>2;if(r.push(w),g!==64){const S=d<<6&192|g;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Yd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Jd=function(n){const e=zc(n);return Hc.encodeByteArray(e,!0)},Ps=function(n){return Jd(n).replace(/\./g,"")},Wc=function(n){try{return Hc.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Xd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Zd=()=>Xd().__FIREBASE_DEFAULTS__,ef=()=>{if(typeof process>"u"||typeof Al>"u")return;const n=Al.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},tf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Wc(n[1]);return e&&JSON.parse(e)},Ws=()=>{try{return Zd()||ef()||tf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Kc=n=>{var e,t;return(t=(e=Ws())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},nf=n=>{const e=Kc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Gc=()=>{var n;return(n=Ws())===null||n===void 0?void 0:n.config},Qc=n=>{var e;return(e=Ws())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class rf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function sf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Ps(JSON.stringify(t)),Ps(JSON.stringify(a)),""].join(".")}/**
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
 */function Se(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function of(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Se())}function af(){var n;const e=(n=Ws())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function lf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function cf(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function uf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function hf(){const n=Se();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function df(){return!af()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ff(){try{return typeof indexedDB=="object"}catch{return!1}}function pf(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const mf="FirebaseError";class dt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=mf,Object.setPrototypeOf(this,dt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Rr.prototype.create)}}class Rr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?gf(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new dt(s,l,r)}}function gf(n,e){return n.replace(_f,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const _f=/\{\$([^}]+)}/g;function yf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function bn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Rl(i)&&Rl(a)){if(!bn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Rl(n){return n!==null&&typeof n=="object"}/**
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
 */function Sr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ar(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function lr(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function vf(n,e){const t=new wf(n,e);return t.subscribe.bind(t)}class wf{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Ef(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Ui),s.error===void 0&&(s.error=Ui),s.complete===void 0&&(s.complete=Ui);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ef(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ui(){}/**
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
 */function ne(n){return n&&n._delegate?n._delegate:n}class Yt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Wt="[DEFAULT]";/**
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
 */class If{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new rf;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(bf(e))try{this.getOrInitializeService({instanceIdentifier:Wt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Wt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Wt){return this.instances.has(e)}getOptions(e=Wt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Tf(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Wt){return this.component?this.component.multipleInstances?e:Wt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Tf(n){return n===Wt?void 0:n}function bf(n){return n.instantiationMode==="EAGER"}/**
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
 */class Af{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new If(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var K;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(K||(K={}));const Rf={debug:K.DEBUG,verbose:K.VERBOSE,info:K.INFO,warn:K.WARN,error:K.ERROR,silent:K.SILENT},Sf=K.INFO,Pf={[K.DEBUG]:"log",[K.VERBOSE]:"log",[K.INFO]:"info",[K.WARN]:"warn",[K.ERROR]:"error"},Cf=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Pf[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Po{constructor(e){this.name=e,this._logLevel=Sf,this._logHandler=Cf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in K))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Rf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,K.DEBUG,...e),this._logHandler(this,K.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,K.VERBOSE,...e),this._logHandler(this,K.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,K.INFO,...e),this._logHandler(this,K.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,K.WARN,...e),this._logHandler(this,K.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,K.ERROR,...e),this._logHandler(this,K.ERROR,...e)}}const kf=(n,e)=>e.some(t=>n instanceof t);let Sl,Pl;function Df(){return Sl||(Sl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Vf(){return Pl||(Pl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Yc=new WeakMap,Yi=new WeakMap,Jc=new WeakMap,Fi=new WeakMap,Co=new WeakMap;function Nf(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Rt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Yc.set(t,n)}).catch(()=>{}),Co.set(e,n),e}function Lf(n){if(Yi.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Yi.set(n,e)}let Ji={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Yi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Jc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Rt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function xf(n){Ji=n(Ji)}function Of(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Bi(this),e,...t);return Jc.set(r,e.sort?e.sort():[e]),Rt(r)}:Vf().includes(n)?function(...e){return n.apply(Bi(this),e),Rt(Yc.get(this))}:function(...e){return Rt(n.apply(Bi(this),e))}}function Mf(n){return typeof n=="function"?Of(n):(n instanceof IDBTransaction&&Lf(n),kf(n,Df())?new Proxy(n,Ji):n)}function Rt(n){if(n instanceof IDBRequest)return Nf(n);if(Fi.has(n))return Fi.get(n);const e=Mf(n);return e!==n&&(Fi.set(n,e),Co.set(e,n)),e}const Bi=n=>Co.get(n);function Uf(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=Rt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Rt(a.result),u.oldVersion,u.newVersion,Rt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const Ff=["get","getKey","getAll","getAllKeys","count"],Bf=["put","add","delete","clear"],$i=new Map;function Cl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if($i.get(e))return $i.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Bf.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Ff.includes(t)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[t](...l),s&&u.done]))[0]};return $i.set(e,i),i}xf(n=>({...n,get:(e,t,r)=>Cl(e,t)||n.get(e,t,r),has:(e,t)=>!!Cl(e,t)||n.has(e,t)}));/**
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
 */class $f{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(qf(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function qf(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Xi="@firebase/app",kl="0.10.13";/**
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
 */const lt=new Po("@firebase/app"),jf="@firebase/app-compat",zf="@firebase/analytics-compat",Hf="@firebase/analytics",Wf="@firebase/app-check-compat",Kf="@firebase/app-check",Gf="@firebase/auth",Qf="@firebase/auth-compat",Yf="@firebase/database",Jf="@firebase/data-connect",Xf="@firebase/database-compat",Zf="@firebase/functions",ep="@firebase/functions-compat",tp="@firebase/installations",np="@firebase/installations-compat",rp="@firebase/messaging",sp="@firebase/messaging-compat",ip="@firebase/performance",op="@firebase/performance-compat",ap="@firebase/remote-config",lp="@firebase/remote-config-compat",cp="@firebase/storage",up="@firebase/storage-compat",hp="@firebase/firestore",dp="@firebase/vertexai-preview",fp="@firebase/firestore-compat",pp="firebase",mp="10.14.1";/**
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
 */const Zi="[DEFAULT]",gp={[Xi]:"fire-core",[jf]:"fire-core-compat",[Hf]:"fire-analytics",[zf]:"fire-analytics-compat",[Kf]:"fire-app-check",[Wf]:"fire-app-check-compat",[Gf]:"fire-auth",[Qf]:"fire-auth-compat",[Yf]:"fire-rtdb",[Jf]:"fire-data-connect",[Xf]:"fire-rtdb-compat",[Zf]:"fire-fn",[ep]:"fire-fn-compat",[tp]:"fire-iid",[np]:"fire-iid-compat",[rp]:"fire-fcm",[sp]:"fire-fcm-compat",[ip]:"fire-perf",[op]:"fire-perf-compat",[ap]:"fire-rc",[lp]:"fire-rc-compat",[cp]:"fire-gcs",[up]:"fire-gcs-compat",[hp]:"fire-fst",[fp]:"fire-fst-compat",[dp]:"fire-vertex","fire-js":"fire-js",[pp]:"fire-js-all"};/**
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
 */const Cs=new Map,_p=new Map,eo=new Map;function Dl(n,e){try{n.container.addComponent(e)}catch(t){lt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function An(n){const e=n.name;if(eo.has(e))return lt.debug(`There were multiple attempts to register component ${e}.`),!1;eo.set(e,n);for(const t of Cs.values())Dl(t,n);for(const t of _p.values())Dl(t,n);return!0}function ko(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function He(n){return n.settings!==void 0}/**
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
 */const yp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},St=new Rr("app","Firebase",yp);/**
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
 */class vp{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Yt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw St.create("app-deleted",{appName:this._name})}}/**
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
 */const Mn=mp;function Xc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Zi,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw St.create("bad-app-name",{appName:String(s)});if(t||(t=Gc()),!t)throw St.create("no-options");const i=Cs.get(s);if(i){if(bn(t,i.options)&&bn(r,i.config))return i;throw St.create("duplicate-app",{appName:s})}const a=new Af(s);for(const u of eo.values())a.addComponent(u);const l=new vp(t,r,a);return Cs.set(s,l),l}function Zc(n=Zi){const e=Cs.get(n);if(!e&&n===Zi&&Gc())return Xc();if(!e)throw St.create("no-app",{appName:n});return e}function Pt(n,e,t){var r;let s=(r=gp[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),lt.warn(l.join(" "));return}An(new Yt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const wp="firebase-heartbeat-database",Ep=1,vr="firebase-heartbeat-store";let qi=null;function eu(){return qi||(qi=Uf(wp,Ep,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(vr)}catch(t){console.warn(t)}}}}).catch(n=>{throw St.create("idb-open",{originalErrorMessage:n.message})})),qi}async function Ip(n){try{const t=(await eu()).transaction(vr),r=await t.objectStore(vr).get(tu(n));return await t.done,r}catch(e){if(e instanceof dt)lt.warn(e.message);else{const t=St.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});lt.warn(t.message)}}}async function Vl(n,e){try{const r=(await eu()).transaction(vr,"readwrite");await r.objectStore(vr).put(e,tu(n)),await r.done}catch(t){if(t instanceof dt)lt.warn(t.message);else{const r=St.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});lt.warn(r.message)}}}function tu(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Tp=1024,bp=30*24*60*60*1e3;class Ap{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Sp(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Nl();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=bp}),this._storage.overwrite(this._heartbeatsCache))}catch(r){lt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Nl(),{heartbeatsToSend:r,unsentEntries:s}=Rp(this._heartbeatsCache.heartbeats),i=Ps(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return lt.warn(t),""}}}function Nl(){return new Date().toISOString().substring(0,10)}function Rp(n,e=Tp){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Ll(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Ll(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Sp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ff()?pf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Ip(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Vl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Vl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ll(n){return Ps(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function Pp(n){An(new Yt("platform-logger",e=>new $f(e),"PRIVATE")),An(new Yt("heartbeat",e=>new Ap(e),"PRIVATE")),Pt(Xi,kl,n),Pt(Xi,kl,"esm2017"),Pt("fire-js","")}Pp("");function Do(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function nu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Cp=nu,ru=new Rr("auth","Firebase",nu());/**
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
 */const ks=new Po("@firebase/auth");function kp(n,...e){ks.logLevel<=K.WARN&&ks.warn(`Auth (${Mn}): ${n}`,...e)}function gs(n,...e){ks.logLevel<=K.ERROR&&ks.error(`Auth (${Mn}): ${n}`,...e)}/**
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
 */function $e(n,...e){throw Vo(n,...e)}function Ge(n,...e){return Vo(n,...e)}function su(n,e,t){const r=Object.assign(Object.assign({},Cp()),{[e]:t});return new Rr("auth","Firebase",r).create(e,{appName:n.name})}function ot(n){return su(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Vo(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return ru.create(n,...e)}function U(n,e,...t){if(!n)throw Vo(e,...t)}function rt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw gs(e),new Error(e)}function ct(n,e){n||rt(e)}/**
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
 */function to(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Dp(){return xl()==="http:"||xl()==="https:"}function xl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function Vp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Dp()||cf()||"connection"in navigator)?navigator.onLine:!0}function Np(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Pr{constructor(e,t){this.shortDelay=e,this.longDelay=t,ct(t>e,"Short delay should be less than long delay!"),this.isMobile=of()||uf()}get(){return Vp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function No(n,e){ct(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class iu{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;rt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;rt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;rt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const xp=new Pr(3e4,6e4);function Ot(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function ft(n,e,t,r,s={}){return ou(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=Sr(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},i);return lf()||(d.referrerPolicy="no-referrer"),iu.fetch()(au(n,n.config.apiHost,t,l),d)})}async function ou(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Lp),e);try{const s=new Mp(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw ls(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,d]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ls(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw ls(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw ls(n,"user-disabled",a);const p=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw su(n,p,d);$e(n,p)}}catch(s){if(s instanceof dt)throw s;$e(n,"network-request-failed",{message:String(s)})}}async function Cr(n,e,t,r,s={}){const i=await ft(n,e,t,r,s);return"mfaPendingCredential"in i&&$e(n,"multi-factor-auth-required",{_serverResponse:i}),i}function au(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?No(n.config,s):`${n.config.apiScheme}://${s}`}function Op(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Mp{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ge(this.auth,"network-request-failed")),xp.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ls(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ge(n,e,r);return s.customData._tokenResponse=t,s}function Ol(n){return n!==void 0&&n.enterprise!==void 0}class Up{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Op(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function Fp(n,e){return ft(n,"GET","/v2/recaptchaConfig",Ot(n,e))}/**
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
 */async function Bp(n,e){return ft(n,"POST","/v1/accounts:delete",e)}async function lu(n,e){return ft(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function pr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function $p(n,e=!1){const t=ne(n),r=await t.getIdToken(e),s=Lo(r);U(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:pr(ji(s.auth_time)),issuedAtTime:pr(ji(s.iat)),expirationTime:pr(ji(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function ji(n){return Number(n)*1e3}function Lo(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return gs("JWT malformed, contained fewer than 3 sections"),null;try{const s=Wc(t);return s?JSON.parse(s):(gs("Failed to decode base64 JWT payload"),null)}catch(s){return gs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Ml(n){const e=Lo(n);return U(e,"internal-error"),U(typeof e.exp<"u","internal-error"),U(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Rn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof dt&&qp(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function qp({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class jp{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class no{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=pr(this.lastLoginAt),this.creationTime=pr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ds(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Rn(n,lu(t,{idToken:r}));U(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?cu(i.providerUserInfo):[],l=Hp(n.providerData,a),u=n.isAnonymous,d=!(n.email&&i.passwordHash)&&!(l!=null&&l.length),p=u?d:!1,g={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new no(i.createdAt,i.lastLoginAt),isAnonymous:p};Object.assign(n,g)}async function zp(n){const e=ne(n);await Ds(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Hp(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function cu(n){return n.map(e=>{var{providerId:t}=e,r=Do(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function Wp(n,e){const t=await ou(n,{},async()=>{const r=Sr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=au(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",iu.fetch()(a,{method:"POST",headers:l,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Kp(n,e){return ft(n,"POST","/v2/accounts:revokeToken",Ot(n,e))}/**
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
 */class wn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){U(e.idToken,"internal-error"),U(typeof e.idToken<"u","internal-error"),U(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ml(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){U(e.length!==0,"internal-error");const t=Ml(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(U(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Wp(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new wn;return r&&(U(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(U(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(U(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new wn,this.toJSON())}_performRefresh(){return rt("not implemented")}}/**
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
 */function yt(n,e){U(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class st{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Do(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new jp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new no(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Rn(this,this.stsTokenManager.getToken(this.auth,e));return U(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return $p(this,e)}reload(){return zp(this)}_assign(e){this!==e&&(U(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new st(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){U(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ds(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(He(this.auth.app))return Promise.reject(ot(this.auth));const e=await this.getIdToken();return await Rn(this,Bp(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,l,u,d,p;const g=(r=t.displayName)!==null&&r!==void 0?r:void 0,T=(s=t.email)!==null&&s!==void 0?s:void 0,w=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,S=(a=t.photoURL)!==null&&a!==void 0?a:void 0,D=(l=t.tenantId)!==null&&l!==void 0?l:void 0,k=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,L=(d=t.createdAt)!==null&&d!==void 0?d:void 0,F=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:M,emailVerified:z,isAnonymous:ye,providerData:te,stsTokenManager:E}=t;U(M&&E,e,"internal-error");const m=wn.fromJSON(this.name,E);U(typeof M=="string",e,"internal-error"),yt(g,e.name),yt(T,e.name),U(typeof z=="boolean",e,"internal-error"),U(typeof ye=="boolean",e,"internal-error"),yt(w,e.name),yt(S,e.name),yt(D,e.name),yt(k,e.name),yt(L,e.name),yt(F,e.name);const _=new st({uid:M,auth:e,email:T,emailVerified:z,displayName:g,isAnonymous:ye,photoURL:S,phoneNumber:w,tenantId:D,stsTokenManager:m,createdAt:L,lastLoginAt:F});return te&&Array.isArray(te)&&(_.providerData=te.map(v=>Object.assign({},v))),k&&(_._redirectEventId=k),_}static async _fromIdTokenResponse(e,t,r=!1){const s=new wn;s.updateFromServerResponse(t);const i=new st({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ds(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];U(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?cu(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new wn;l.updateFromIdToken(r);const u=new st({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new no(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,d),u}}/**
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
 */const Ul=new Map;function it(n){ct(n instanceof Function,"Expected a class definition");let e=Ul.get(n);return e?(ct(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ul.set(n,e),e)}/**
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
 */class uu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}uu.type="NONE";const Fl=uu;/**
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
 */function _s(n,e,t){return`firebase:${n}:${e}:${t}`}class En{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=_s(this.userKey,s.apiKey,i),this.fullPersistenceKey=_s("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?st._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new En(it(Fl),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||it(Fl);const a=_s(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const p=await d._get(a);if(p){const g=st._fromJSON(e,p);d!==i&&(l=g),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new En(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new En(i,e,r))}}/**
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
 */function Bl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(pu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(hu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(gu(e))return"Blackberry";if(_u(e))return"Webos";if(du(e))return"Safari";if((e.includes("chrome/")||fu(e))&&!e.includes("edge/"))return"Chrome";if(mu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function hu(n=Se()){return/firefox\//i.test(n)}function du(n=Se()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function fu(n=Se()){return/crios\//i.test(n)}function pu(n=Se()){return/iemobile/i.test(n)}function mu(n=Se()){return/android/i.test(n)}function gu(n=Se()){return/blackberry/i.test(n)}function _u(n=Se()){return/webos/i.test(n)}function xo(n=Se()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Gp(n=Se()){var e;return xo(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Qp(){return hf()&&document.documentMode===10}function yu(n=Se()){return xo(n)||mu(n)||_u(n)||gu(n)||/windows phone/i.test(n)||pu(n)}/**
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
 */function vu(n,e=[]){let t;switch(n){case"Browser":t=Bl(Se());break;case"Worker":t=`${Bl(Se())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Mn}/${r}`}/**
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
 */class Yp{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function Jp(n,e={}){return ft(n,"GET","/v2/passwordPolicy",Ot(n,e))}/**
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
 */const Xp=6;class Zp{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Xp,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class em{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new $l(this),this.idTokenSubscription=new $l(this),this.beforeStateQueue=new Yp(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ru,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=it(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await En.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await lu(this,{idToken:e}),r=await st._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(He(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return U(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ds(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Np()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(He(this.app))return Promise.reject(ot(this));const t=e?ne(e):null;return t&&U(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&U(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return He(this.app)?Promise.reject(ot(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return He(this.app)?Promise.reject(ot(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(it(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Jp(this),t=new Zp(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Rr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Kp(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&it(e)||this._popupRedirectResolver;U(t,this,"argument-error"),this.redirectPersistenceManager=await En.create(this,[it(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(U(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return U(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=vu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&kp(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function sn(n){return ne(n)}class $l{constructor(e){this.auth=e,this.observer=null,this.addObserver=vf(t=>this.observer=t)}get next(){return U(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ks={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function tm(n){Ks=n}function wu(n){return Ks.loadJS(n)}function nm(){return Ks.recaptchaEnterpriseScript}function rm(){return Ks.gapiScript}function sm(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const im="recaptcha-enterprise",om="NO_RECAPTCHA";class am{constructor(e){this.type=im,this.auth=sn(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,l)=>{Fp(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const d=new Up(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,a(d.siteKey)}}).catch(u=>{l(u)})})}function s(i,a,l){const u=window.grecaptcha;Ol(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{a(d)}).catch(()=>{a(om)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,a)=>{r(this.auth).then(l=>{if(!t&&Ol(window.grecaptcha))s(l,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=nm();u.length!==0&&(u+=l),wu(u).then(()=>{s(l,i,a)}).catch(d=>{a(d)})}}).catch(l=>{a(l)})})}}async function ql(n,e,t,r=!1){const s=new am(n);let i;try{i=await s.verify(t)}catch{i=await s.verify(t,!0)}const a=Object.assign({},e);return r?Object.assign(a,{captchaResp:i}):Object.assign(a,{captchaResponse:i}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function ro(n,e,t,r){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await ql(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await ql(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(i)})}/**
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
 */function lm(n,e){const t=ko(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(bn(i,e??{}))return s;$e(s,"already-initialized")}return t.initialize({options:e})}function cm(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(it);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function um(n,e,t){const r=sn(n);U(r._canInitEmulator,r,"emulator-config-failed"),U(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Eu(e),{host:a,port:l}=hm(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${a}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),dm()}function Eu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function hm(n){const e=Eu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:jl(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:jl(a)}}}function jl(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function dm(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Oo{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return rt("not implemented")}_getIdTokenResponse(e){return rt("not implemented")}_linkToIdToken(e,t){return rt("not implemented")}_getReauthenticationResolver(e){return rt("not implemented")}}async function fm(n,e){return ft(n,"POST","/v1/accounts:update",e)}async function pm(n,e){return ft(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function mm(n,e){return Cr(n,"POST","/v1/accounts:signInWithPassword",Ot(n,e))}/**
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
 */async function gm(n,e){return Cr(n,"POST","/v1/accounts:signInWithEmailLink",Ot(n,e))}async function _m(n,e){return Cr(n,"POST","/v1/accounts:signInWithEmailLink",Ot(n,e))}/**
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
 */class wr extends Oo{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new wr(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new wr(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ro(e,t,"signInWithPassword",mm);case"emailLink":return gm(e,{email:this._email,oobCode:this._password});default:$e(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ro(e,r,"signUpPassword",pm);case"emailLink":return _m(e,{idToken:t,email:this._email,oobCode:this._password});default:$e(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function In(n,e){return Cr(n,"POST","/v1/accounts:signInWithIdp",Ot(n,e))}/**
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
 */const ym="http://localhost";class Jt extends Oo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Jt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):$e("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Do(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new Jt(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return In(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,In(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,In(e,t)}buildRequest(){const e={requestUri:ym,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Sr(t)}return e}}/**
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
 */function vm(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function wm(n){const e=ar(lr(n)).link,t=e?ar(lr(e)).deep_link_id:null,r=ar(lr(n)).deep_link_id;return(r?ar(lr(r)).link:null)||r||t||e||n}class Mo{constructor(e){var t,r,s,i,a,l;const u=ar(lr(e)),d=(t=u.apiKey)!==null&&t!==void 0?t:null,p=(r=u.oobCode)!==null&&r!==void 0?r:null,g=vm((s=u.mode)!==null&&s!==void 0?s:null);U(d&&p&&g,"argument-error"),this.apiKey=d,this.operation=g,this.code=p,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(a=u.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const t=wm(e);try{return new Mo(t)}catch{return null}}}/**
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
 */class Mt{constructor(){this.providerId=Mt.PROVIDER_ID}static credential(e,t){return wr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Mo.parseLink(t);return U(r,"argument-error"),wr._fromEmailAndCode(e,r.code,r.tenantId)}}Mt.PROVIDER_ID="password";Mt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Mt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Iu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class kr extends Iu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class wt extends kr{constructor(){super("facebook.com")}static credential(e){return Jt._fromParams({providerId:wt.PROVIDER_ID,signInMethod:wt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return wt.credentialFromTaggedObject(e)}static credentialFromError(e){return wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return wt.credential(e.oauthAccessToken)}catch{return null}}}wt.FACEBOOK_SIGN_IN_METHOD="facebook.com";wt.PROVIDER_ID="facebook.com";/**
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
 */class Et extends kr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Jt._fromParams({providerId:Et.PROVIDER_ID,signInMethod:Et.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Et.credentialFromTaggedObject(e)}static credentialFromError(e){return Et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Et.credential(t,r)}catch{return null}}}Et.GOOGLE_SIGN_IN_METHOD="google.com";Et.PROVIDER_ID="google.com";/**
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
 */class It extends kr{constructor(){super("github.com")}static credential(e){return Jt._fromParams({providerId:It.PROVIDER_ID,signInMethod:It.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return It.credentialFromTaggedObject(e)}static credentialFromError(e){return It.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return It.credential(e.oauthAccessToken)}catch{return null}}}It.GITHUB_SIGN_IN_METHOD="github.com";It.PROVIDER_ID="github.com";/**
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
 */class Tt extends kr{constructor(){super("twitter.com")}static credential(e,t){return Jt._fromParams({providerId:Tt.PROVIDER_ID,signInMethod:Tt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Tt.credentialFromTaggedObject(e)}static credentialFromError(e){return Tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Tt.credential(t,r)}catch{return null}}}Tt.TWITTER_SIGN_IN_METHOD="twitter.com";Tt.PROVIDER_ID="twitter.com";/**
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
 */async function Em(n,e){return Cr(n,"POST","/v1/accounts:signUp",Ot(n,e))}/**
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
 */class Xt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await st._fromIdTokenResponse(e,r,s),a=zl(r);return new Xt({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=zl(r);return new Xt({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function zl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Vs extends dt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Vs.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Vs(e,t,r,s)}}function Tu(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Vs._fromErrorAndOperation(n,i,e,r):i})}async function Im(n,e,t=!1){const r=await Rn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Xt._forOperation(n,"link",r)}/**
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
 */async function bu(n,e,t=!1){const{auth:r}=n;if(He(r.app))return Promise.reject(ot(r));const s="reauthenticate";try{const i=await Rn(n,Tu(r,s,e,n),t);U(i.idToken,r,"internal-error");const a=Lo(i.idToken);U(a,r,"internal-error");const{sub:l}=a;return U(n.uid===l,r,"user-mismatch"),Xt._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&$e(r,"user-mismatch"),i}}/**
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
 */async function Au(n,e,t=!1){if(He(n.app))return Promise.reject(ot(n));const r="signIn",s=await Tu(n,r,e),i=await Xt._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function Tm(n,e){return Au(sn(n),e)}async function Ru(n,e){return bu(ne(n),e)}/**
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
 */async function Su(n){const e=sn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function bm(n,e,t){if(He(n.app))return Promise.reject(ot(n));const r=sn(n),a=await ro(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Em).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Su(n),u}),l=await Xt._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(l.user),l}function Am(n,e,t){return He(n.app)?Promise.reject(ot(n)):Tm(ne(n),Mt.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Su(n),r})}function Rm(n,e){return Sm(ne(n),null,e)}async function Sm(n,e,t){const{auth:r}=n,i={idToken:await n.getIdToken(),returnSecureToken:!0};t&&(i.password=t);const a=await Rn(n,fm(r,i));await n._updateTokensIfNecessary(a,!0)}function Pm(n,e,t,r){return ne(n).onIdTokenChanged(e,t,r)}function Cm(n,e,t){return ne(n).beforeAuthStateChanged(e,t)}function km(n,e,t,r){return ne(n).onAuthStateChanged(e,t,r)}function Dm(n){return ne(n).signOut()}async function Vm(n){return ne(n).delete()}const Ns="__sak";/**
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
 */class Pu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ns,"1"),this.storage.removeItem(Ns),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Nm=1e3,Lm=10;class Cu extends Pu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=yu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);Qp()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Lm):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Nm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Cu.type="LOCAL";const xm=Cu;/**
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
 */class ku extends Pu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ku.type="SESSION";const Du=ku;/**
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
 */function Om(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Gs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Gs(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async d=>d(t.origin,i)),u=await Om(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Gs.receivers=[];/**
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
 */function Uo(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Mm{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const d=Uo("",20);s.port1.start();const p=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(g){const T=g;if(T.data.eventId===d)switch(T.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(T.data.response);break;default:clearTimeout(p),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function Qe(){return window}function Um(n){Qe().location.href=n}/**
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
 */function Vu(){return typeof Qe().WorkerGlobalScope<"u"&&typeof Qe().importScripts=="function"}async function Fm(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Bm(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function $m(){return Vu()?self:null}/**
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
 */const Nu="firebaseLocalStorageDb",qm=1,Ls="firebaseLocalStorage",Lu="fbase_key";class Dr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Qs(n,e){return n.transaction([Ls],e?"readwrite":"readonly").objectStore(Ls)}function jm(){const n=indexedDB.deleteDatabase(Nu);return new Dr(n).toPromise()}function so(){const n=indexedDB.open(Nu,qm);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ls,{keyPath:Lu})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ls)?e(r):(r.close(),await jm(),e(await so()))})})}async function Hl(n,e,t){const r=Qs(n,!0).put({[Lu]:e,value:t});return new Dr(r).toPromise()}async function zm(n,e){const t=Qs(n,!1).get(e),r=await new Dr(t).toPromise();return r===void 0?null:r.value}function Wl(n,e){const t=Qs(n,!0).delete(e);return new Dr(t).toPromise()}const Hm=800,Wm=3;class xu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await so(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Wm)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Vu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Gs._getInstance($m()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Fm(),!this.activeServiceWorker)return;this.sender=new Mm(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Bm()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await so();return await Hl(e,Ns,"1"),await Wl(e,Ns),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Hl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>zm(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Wl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Qs(s,!1).getAll();return new Dr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Hm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}xu.type="LOCAL";const Km=xu;new Pr(3e4,6e4);/**
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
 */function Gm(n,e){return e?it(e):(U(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Fo extends Oo{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return In(e,this._buildIdpRequest())}_linkToIdToken(e,t){return In(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return In(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Qm(n){return Au(n.auth,new Fo(n),n.bypassAuthState)}function Ym(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),bu(t,new Fo(n),n.bypassAuthState)}async function Jm(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),Im(t,new Fo(n),n.bypassAuthState)}/**
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
 */class Ou{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Qm;case"linkViaPopup":case"linkViaRedirect":return Jm;case"reauthViaPopup":case"reauthViaRedirect":return Ym;default:$e(this.auth,"internal-error")}}resolve(e){ct(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ct(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Xm=new Pr(2e3,1e4);class yn extends Ou{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,yn.currentPopupAction&&yn.currentPopupAction.cancel(),yn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return U(e,this.auth,"internal-error"),e}async onExecution(){ct(this.filter.length===1,"Popup operations only handle one event");const e=Uo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ge(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ge(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,yn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ge(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Xm.get())};e()}}yn.currentPopupAction=null;/**
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
 */const Zm="pendingRedirect",ys=new Map;class eg extends Ou{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ys.get(this.auth._key());if(!e){try{const r=await tg(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ys.set(this.auth._key(),e)}return this.bypassAuthState||ys.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tg(n,e){const t=sg(e),r=rg(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function ng(n,e){ys.set(n._key(),e)}function rg(n){return it(n._redirectPersistence)}function sg(n){return _s(Zm,n.config.apiKey,n.name)}async function ig(n,e,t=!1){if(He(n.app))return Promise.reject(ot(n));const r=sn(n),s=Gm(r,e),a=await new eg(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const og=10*60*1e3;class ag{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!lg(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Mu(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ge(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=og&&this.cachedEventUids.clear(),this.cachedEventUids.has(Kl(e))}saveEventToCache(e){this.cachedEventUids.add(Kl(e)),this.lastProcessedEventTime=Date.now()}}function Kl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Mu({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function lg(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Mu(n);default:return!1}}/**
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
 */async function cg(n,e={}){return ft(n,"GET","/v1/projects",e)}/**
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
 */const ug=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,hg=/^https?/;async function dg(n){if(n.config.emulator)return;const{authorizedDomains:e}=await cg(n);for(const t of e)try{if(fg(t))return}catch{}$e(n,"unauthorized-domain")}function fg(n){const e=to(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!hg.test(t))return!1;if(ug.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const pg=new Pr(3e4,6e4);function Gl(){const n=Qe().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function mg(n){return new Promise((e,t)=>{var r,s,i;function a(){Gl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Gl(),t(Ge(n,"network-request-failed"))},timeout:pg.get()})}if(!((s=(r=Qe().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Qe().gapi)===null||i===void 0)&&i.load)a();else{const l=sm("iframefcb");return Qe()[l]=()=>{gapi.load?a():t(Ge(n,"network-request-failed"))},wu(`${rm()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw vs=null,e})}let vs=null;function gg(n){return vs=vs||mg(n),vs}/**
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
 */const _g=new Pr(5e3,15e3),yg="__/auth/iframe",vg="emulator/auth/iframe",wg={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Eg=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Ig(n){const e=n.config;U(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?No(e,vg):`https://${n.config.authDomain}/${yg}`,r={apiKey:e.apiKey,appName:n.name,v:Mn},s=Eg.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Sr(r).slice(1)}`}async function Tg(n){const e=await gg(n),t=Qe().gapi;return U(t,n,"internal-error"),e.open({where:document.body,url:Ig(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:wg,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Ge(n,"network-request-failed"),l=Qe().setTimeout(()=>{i(a)},_g.get());function u(){Qe().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const bg={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ag=500,Rg=600,Sg="_blank",Pg="http://localhost";class Ql{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Cg(n,e,t,r=Ag,s=Rg){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},bg),{width:r.toString(),height:s.toString(),top:i,left:a}),d=Se().toLowerCase();t&&(l=fu(d)?Sg:t),hu(d)&&(e=e||Pg,u.scrollbars="yes");const p=Object.entries(u).reduce((T,[w,S])=>`${T}${w}=${S},`,"");if(Gp(d)&&l!=="_self")return kg(e||"",l),new Ql(null);const g=window.open(e||"",l,p);U(g,n,"popup-blocked");try{g.focus()}catch{}return new Ql(g)}function kg(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Dg="__/auth/handler",Vg="emulator/auth/handler",Ng=encodeURIComponent("fac");async function Yl(n,e,t,r,s,i){U(n.config.authDomain,n,"auth-domain-config-required"),U(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Mn,eventId:s};if(e instanceof Iu){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",yf(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,g]of Object.entries({}))a[p]=g}if(e instanceof kr){const p=e.getScopes().filter(g=>g!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const u=await n._getAppCheckToken(),d=u?`#${Ng}=${encodeURIComponent(u)}`:"";return`${Lg(n)}?${Sr(l).slice(1)}${d}`}function Lg({config:n}){return n.emulator?No(n,Vg):`https://${n.authDomain}/${Dg}`}/**
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
 */const zi="webStorageSupport";class xg{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Du,this._completeRedirectFn=ig,this._overrideRedirectResult=ng}async _openPopup(e,t,r,s){var i;ct((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await Yl(e,t,r,to(),s);return Cg(e,a,Uo())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Yl(e,t,r,to(),s);return Um(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(ct(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Tg(e),r=new ag(e);return t.register("authEvent",s=>(U(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(zi,{type:zi},s=>{var i;const a=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[zi];a!==void 0&&t(!!a),$e(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=dg(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return yu()||du()||xo()}}const Og=xg;var Jl="@firebase/auth",Xl="1.7.9";/**
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
 */class Mg{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){U(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Ug(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Fg(n){An(new Yt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;U(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:vu(n)},d=new em(r,s,i,u);return cm(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),An(new Yt("auth-internal",e=>{const t=sn(e.getProvider("auth").getImmediate());return(r=>new Mg(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Pt(Jl,Xl,Ug(n)),Pt(Jl,Xl,"esm2017")}/**
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
 */const Bg=5*60,$g=Qc("authIdTokenMaxAge")||Bg;let Zl=null;const qg=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>$g)return;const s=t==null?void 0:t.token;Zl!==s&&(Zl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function jg(n=Zc()){const e=ko(n,"auth");if(e.isInitialized())return e.getImmediate();const t=lm(n,{popupRedirectResolver:Og,persistence:[Km,xm,Du]}),r=Qc("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=qg(i.toString());Cm(t,a,()=>a(t.currentUser)),Pm(t,l=>a(l))}}const s=Kc("auth");return s&&um(t,`http://${s}`),t}function zg(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}tm({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Ge("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",zg().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Fg("Browser");var Hg="firebase",Wg="10.14.1";/**
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
 */Pt(Hg,Wg,"app");var ec=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Gt,Uu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,m){function _(){}_.prototype=m.prototype,E.D=m.prototype,E.prototype=new _,E.prototype.constructor=E,E.C=function(v,I,A){for(var y=Array(arguments.length-2),et=2;et<arguments.length;et++)y[et-2]=arguments[et];return m.prototype[I].apply(v,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,m,_){_||(_=0);var v=Array(16);if(typeof m=="string")for(var I=0;16>I;++I)v[I]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(I=0;16>I;++I)v[I]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=E.g[0],_=E.g[1],I=E.g[2];var A=E.g[3],y=m+(A^_&(I^A))+v[0]+3614090360&4294967295;m=_+(y<<7&4294967295|y>>>25),y=A+(I^m&(_^I))+v[1]+3905402710&4294967295,A=m+(y<<12&4294967295|y>>>20),y=I+(_^A&(m^_))+v[2]+606105819&4294967295,I=A+(y<<17&4294967295|y>>>15),y=_+(m^I&(A^m))+v[3]+3250441966&4294967295,_=I+(y<<22&4294967295|y>>>10),y=m+(A^_&(I^A))+v[4]+4118548399&4294967295,m=_+(y<<7&4294967295|y>>>25),y=A+(I^m&(_^I))+v[5]+1200080426&4294967295,A=m+(y<<12&4294967295|y>>>20),y=I+(_^A&(m^_))+v[6]+2821735955&4294967295,I=A+(y<<17&4294967295|y>>>15),y=_+(m^I&(A^m))+v[7]+4249261313&4294967295,_=I+(y<<22&4294967295|y>>>10),y=m+(A^_&(I^A))+v[8]+1770035416&4294967295,m=_+(y<<7&4294967295|y>>>25),y=A+(I^m&(_^I))+v[9]+2336552879&4294967295,A=m+(y<<12&4294967295|y>>>20),y=I+(_^A&(m^_))+v[10]+4294925233&4294967295,I=A+(y<<17&4294967295|y>>>15),y=_+(m^I&(A^m))+v[11]+2304563134&4294967295,_=I+(y<<22&4294967295|y>>>10),y=m+(A^_&(I^A))+v[12]+1804603682&4294967295,m=_+(y<<7&4294967295|y>>>25),y=A+(I^m&(_^I))+v[13]+4254626195&4294967295,A=m+(y<<12&4294967295|y>>>20),y=I+(_^A&(m^_))+v[14]+2792965006&4294967295,I=A+(y<<17&4294967295|y>>>15),y=_+(m^I&(A^m))+v[15]+1236535329&4294967295,_=I+(y<<22&4294967295|y>>>10),y=m+(I^A&(_^I))+v[1]+4129170786&4294967295,m=_+(y<<5&4294967295|y>>>27),y=A+(_^I&(m^_))+v[6]+3225465664&4294967295,A=m+(y<<9&4294967295|y>>>23),y=I+(m^_&(A^m))+v[11]+643717713&4294967295,I=A+(y<<14&4294967295|y>>>18),y=_+(A^m&(I^A))+v[0]+3921069994&4294967295,_=I+(y<<20&4294967295|y>>>12),y=m+(I^A&(_^I))+v[5]+3593408605&4294967295,m=_+(y<<5&4294967295|y>>>27),y=A+(_^I&(m^_))+v[10]+38016083&4294967295,A=m+(y<<9&4294967295|y>>>23),y=I+(m^_&(A^m))+v[15]+3634488961&4294967295,I=A+(y<<14&4294967295|y>>>18),y=_+(A^m&(I^A))+v[4]+3889429448&4294967295,_=I+(y<<20&4294967295|y>>>12),y=m+(I^A&(_^I))+v[9]+568446438&4294967295,m=_+(y<<5&4294967295|y>>>27),y=A+(_^I&(m^_))+v[14]+3275163606&4294967295,A=m+(y<<9&4294967295|y>>>23),y=I+(m^_&(A^m))+v[3]+4107603335&4294967295,I=A+(y<<14&4294967295|y>>>18),y=_+(A^m&(I^A))+v[8]+1163531501&4294967295,_=I+(y<<20&4294967295|y>>>12),y=m+(I^A&(_^I))+v[13]+2850285829&4294967295,m=_+(y<<5&4294967295|y>>>27),y=A+(_^I&(m^_))+v[2]+4243563512&4294967295,A=m+(y<<9&4294967295|y>>>23),y=I+(m^_&(A^m))+v[7]+1735328473&4294967295,I=A+(y<<14&4294967295|y>>>18),y=_+(A^m&(I^A))+v[12]+2368359562&4294967295,_=I+(y<<20&4294967295|y>>>12),y=m+(_^I^A)+v[5]+4294588738&4294967295,m=_+(y<<4&4294967295|y>>>28),y=A+(m^_^I)+v[8]+2272392833&4294967295,A=m+(y<<11&4294967295|y>>>21),y=I+(A^m^_)+v[11]+1839030562&4294967295,I=A+(y<<16&4294967295|y>>>16),y=_+(I^A^m)+v[14]+4259657740&4294967295,_=I+(y<<23&4294967295|y>>>9),y=m+(_^I^A)+v[1]+2763975236&4294967295,m=_+(y<<4&4294967295|y>>>28),y=A+(m^_^I)+v[4]+1272893353&4294967295,A=m+(y<<11&4294967295|y>>>21),y=I+(A^m^_)+v[7]+4139469664&4294967295,I=A+(y<<16&4294967295|y>>>16),y=_+(I^A^m)+v[10]+3200236656&4294967295,_=I+(y<<23&4294967295|y>>>9),y=m+(_^I^A)+v[13]+681279174&4294967295,m=_+(y<<4&4294967295|y>>>28),y=A+(m^_^I)+v[0]+3936430074&4294967295,A=m+(y<<11&4294967295|y>>>21),y=I+(A^m^_)+v[3]+3572445317&4294967295,I=A+(y<<16&4294967295|y>>>16),y=_+(I^A^m)+v[6]+76029189&4294967295,_=I+(y<<23&4294967295|y>>>9),y=m+(_^I^A)+v[9]+3654602809&4294967295,m=_+(y<<4&4294967295|y>>>28),y=A+(m^_^I)+v[12]+3873151461&4294967295,A=m+(y<<11&4294967295|y>>>21),y=I+(A^m^_)+v[15]+530742520&4294967295,I=A+(y<<16&4294967295|y>>>16),y=_+(I^A^m)+v[2]+3299628645&4294967295,_=I+(y<<23&4294967295|y>>>9),y=m+(I^(_|~A))+v[0]+4096336452&4294967295,m=_+(y<<6&4294967295|y>>>26),y=A+(_^(m|~I))+v[7]+1126891415&4294967295,A=m+(y<<10&4294967295|y>>>22),y=I+(m^(A|~_))+v[14]+2878612391&4294967295,I=A+(y<<15&4294967295|y>>>17),y=_+(A^(I|~m))+v[5]+4237533241&4294967295,_=I+(y<<21&4294967295|y>>>11),y=m+(I^(_|~A))+v[12]+1700485571&4294967295,m=_+(y<<6&4294967295|y>>>26),y=A+(_^(m|~I))+v[3]+2399980690&4294967295,A=m+(y<<10&4294967295|y>>>22),y=I+(m^(A|~_))+v[10]+4293915773&4294967295,I=A+(y<<15&4294967295|y>>>17),y=_+(A^(I|~m))+v[1]+2240044497&4294967295,_=I+(y<<21&4294967295|y>>>11),y=m+(I^(_|~A))+v[8]+1873313359&4294967295,m=_+(y<<6&4294967295|y>>>26),y=A+(_^(m|~I))+v[15]+4264355552&4294967295,A=m+(y<<10&4294967295|y>>>22),y=I+(m^(A|~_))+v[6]+2734768916&4294967295,I=A+(y<<15&4294967295|y>>>17),y=_+(A^(I|~m))+v[13]+1309151649&4294967295,_=I+(y<<21&4294967295|y>>>11),y=m+(I^(_|~A))+v[4]+4149444226&4294967295,m=_+(y<<6&4294967295|y>>>26),y=A+(_^(m|~I))+v[11]+3174756917&4294967295,A=m+(y<<10&4294967295|y>>>22),y=I+(m^(A|~_))+v[2]+718787259&4294967295,I=A+(y<<15&4294967295|y>>>17),y=_+(A^(I|~m))+v[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(I+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+I&4294967295,E.g[3]=E.g[3]+A&4294967295}r.prototype.u=function(E,m){m===void 0&&(m=E.length);for(var _=m-this.blockSize,v=this.B,I=this.h,A=0;A<m;){if(I==0)for(;A<=_;)s(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<m;)if(v[I++]=E.charCodeAt(A++),I==this.blockSize){s(this,v),I=0;break}}else for(;A<m;)if(v[I++]=E[A++],I==this.blockSize){s(this,v),I=0;break}}this.h=I,this.o+=m},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;var _=8*this.o;for(m=E.length-8;m<E.length;++m)E[m]=_&255,_/=256;for(this.u(E),E=Array(16),m=_=0;4>m;++m)for(var v=0;32>v;v+=8)E[_++]=this.g[m]>>>v&255;return E};function i(E,m){var _=l;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=m(E)}function a(E,m){this.h=m;for(var _=[],v=!0,I=E.length-1;0<=I;I--){var A=E[I]|0;v&&A==m||(_[I]=A,v=!1)}this.g=_}var l={};function u(E){return-128<=E&&128>E?i(E,function(m){return new a([m|0],0>m?-1:0)}):new a([E|0],0>E?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return g;if(0>E)return k(d(-E));for(var m=[],_=1,v=0;E>=_;v++)m[v]=E/_|0,_*=4294967296;return new a(m,0)}function p(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return k(p(E.substring(1),m));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(m,8)),v=g,I=0;I<E.length;I+=8){var A=Math.min(8,E.length-I),y=parseInt(E.substring(I,I+A),m);8>A?(A=d(Math.pow(m,A)),v=v.j(A).add(d(y))):(v=v.j(_),v=v.add(d(y)))}return v}var g=u(0),T=u(1),w=u(16777216);n=a.prototype,n.m=function(){if(D(this))return-k(this).m();for(var E=0,m=1,_=0;_<this.g.length;_++){var v=this.i(_);E+=(0<=v?v:4294967296+v)*m,m*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(S(this))return"0";if(D(this))return"-"+k(this).toString(E);for(var m=d(Math.pow(E,6)),_=this,v="";;){var I=z(_,m).g;_=L(_,I.j(m));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(E);if(_=I,S(_))return A+v;for(;6>A.length;)A="0"+A;v=A+v}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function S(E){if(E.h!=0)return!1;for(var m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function D(E){return E.h==-1}n.l=function(E){return E=L(this,E),D(E)?-1:S(E)?0:1};function k(E){for(var m=E.g.length,_=[],v=0;v<m;v++)_[v]=~E.g[v];return new a(_,~E.h).add(T)}n.abs=function(){return D(this)?k(this):this},n.add=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],v=0,I=0;I<=m;I++){var A=v+(this.i(I)&65535)+(E.i(I)&65535),y=(A>>>16)+(this.i(I)>>>16)+(E.i(I)>>>16);v=y>>>16,A&=65535,y&=65535,_[I]=y<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function L(E,m){return E.add(k(m))}n.j=function(E){if(S(this)||S(E))return g;if(D(this))return D(E)?k(this).j(k(E)):k(k(this).j(E));if(D(E))return k(this.j(k(E)));if(0>this.l(w)&&0>E.l(w))return d(this.m()*E.m());for(var m=this.g.length+E.g.length,_=[],v=0;v<2*m;v++)_[v]=0;for(v=0;v<this.g.length;v++)for(var I=0;I<E.g.length;I++){var A=this.i(v)>>>16,y=this.i(v)&65535,et=E.i(I)>>>16,jn=E.i(I)&65535;_[2*v+2*I]+=y*jn,F(_,2*v+2*I),_[2*v+2*I+1]+=A*jn,F(_,2*v+2*I+1),_[2*v+2*I+1]+=y*et,F(_,2*v+2*I+1),_[2*v+2*I+2]+=A*et,F(_,2*v+2*I+2)}for(v=0;v<m;v++)_[v]=_[2*v+1]<<16|_[2*v];for(v=m;v<2*m;v++)_[v]=0;return new a(_,0)};function F(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function M(E,m){this.g=E,this.h=m}function z(E,m){if(S(m))throw Error("division by zero");if(S(E))return new M(g,g);if(D(E))return m=z(k(E),m),new M(k(m.g),k(m.h));if(D(m))return m=z(E,k(m)),new M(k(m.g),m.h);if(30<E.g.length){if(D(E)||D(m))throw Error("slowDivide_ only works with positive integers.");for(var _=T,v=m;0>=v.l(E);)_=ye(_),v=ye(v);var I=te(_,1),A=te(v,1);for(v=te(v,2),_=te(_,2);!S(v);){var y=A.add(v);0>=y.l(E)&&(I=I.add(_),A=y),v=te(v,1),_=te(_,1)}return m=L(E,I.j(m)),new M(I,m)}for(I=g;0<=E.l(m);){for(_=Math.max(1,Math.floor(E.m()/m.m())),v=Math.ceil(Math.log(_)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),A=d(_),y=A.j(m);D(y)||0<y.l(E);)_-=v,A=d(_),y=A.j(m);S(A)&&(A=T),I=I.add(A),E=L(E,y)}return new M(I,E)}n.A=function(E){return z(this,E).h},n.and=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)&E.i(v);return new a(_,this.h&E.h)},n.or=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)|E.i(v);return new a(_,this.h|E.h)},n.xor=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)^E.i(v);return new a(_,this.h^E.h)};function ye(E){for(var m=E.g.length+1,_=[],v=0;v<m;v++)_[v]=E.i(v)<<1|E.i(v-1)>>>31;return new a(_,E.h)}function te(E,m){var _=m>>5;m%=32;for(var v=E.g.length-_,I=[],A=0;A<v;A++)I[A]=0<m?E.i(A+_)>>>m|E.i(A+_+1)<<32-m:E.i(A+_);return new a(I,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Uu=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,Gt=a}).apply(typeof ec<"u"?ec:typeof self<"u"?self:typeof window<"u"?window:{});var cs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Fu,cr,Bu,ws,io,$u,qu,ju;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,h){return o==Array.prototype||o==Object.prototype||(o[c]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof cs=="object"&&cs];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var b=o[f];if(!(b in h))break e;h=h[b]}o=o[o.length-1],f=h[o],c=c(f),c!=f&&c!=null&&e(h,o,{configurable:!0,writable:!0,value:c})}}function i(o,c){o instanceof String&&(o+="");var h=0,f=!1,b={next:function(){if(!f&&h<o.length){var R=h++;return{value:c(R,o[R]),done:!1}}return f=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}s("Array.prototype.values",function(o){return o||function(){return i(this,function(c,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function d(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function p(o,c,h){return o.call.apply(o.bind,arguments)}function g(o,c,h){if(!o)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,f),o.apply(c,b)}}return function(){return o.apply(c,arguments)}}function T(o,c,h){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:g,T.apply(null,arguments)}function w(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function S(o,c){function h(){}h.prototype=c.prototype,o.aa=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(f,b,R){for(var V=Array(arguments.length-2),X=2;X<arguments.length;X++)V[X-2]=arguments[X];return c.prototype[b].apply(f,V)}}function D(o){const c=o.length;if(0<c){const h=Array(c);for(let f=0;f<c;f++)h[f]=o[f];return h}return[]}function k(o,c){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(u(f)){const b=o.length||0,R=f.length||0;o.length=b+R;for(let V=0;V<R;V++)o[b+V]=f[V]}else o.push(f)}}class L{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function F(o){return/^[\s\xa0]*$/.test(o)}function M(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function z(o){return z[" "](o),o}z[" "]=function(){};var ye=M().indexOf("Gecko")!=-1&&!(M().toLowerCase().indexOf("webkit")!=-1&&M().indexOf("Edge")==-1)&&!(M().indexOf("Trident")!=-1||M().indexOf("MSIE")!=-1)&&M().indexOf("Edge")==-1;function te(o,c,h){for(const f in o)c.call(h,o[f],f,o)}function E(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function m(o){const c={};for(const h in o)c[h]=o[h];return c}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(o,c){let h,f;for(let b=1;b<arguments.length;b++){f=arguments[b];for(h in f)o[h]=f[h];for(let R=0;R<_.length;R++)h=_[R],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function I(o){var c=1;o=o.split(":");const h=[];for(;0<c&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function A(o){l.setTimeout(()=>{throw o},0)}function y(){var o=pi;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class et{constructor(){this.h=this.g=null}add(c,h){const f=jn.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var jn=new L(()=>new dd,o=>o.reset());class dd{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let zn,Hn=!1,pi=new et,ba=()=>{const o=l.Promise.resolve(void 0);zn=()=>{o.then(fd)}};var fd=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(h){A(h)}var c=jn;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}Hn=!1};function pt(){this.s=this.s,this.C=this.C}pt.prototype.s=!1,pt.prototype.ma=function(){this.s||(this.s=!0,this.N())},pt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ve(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}ve.prototype.h=function(){this.defaultPrevented=!0};var pd=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};l.addEventListener("test",h,c),l.removeEventListener("test",h,c)}catch{}return o}();function Wn(o,c){if(ve.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(ye){e:{try{z(c.nodeName);var b=!0;break e}catch{}b=!1}b||(c=null)}}else h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement);this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:md[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Wn.aa.h.call(this)}}S(Wn,ve);var md={2:"touch",3:"pen",4:"mouse"};Wn.prototype.h=function(){Wn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var jr="closure_listenable_"+(1e6*Math.random()|0),gd=0;function _d(o,c,h,f,b){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=b,this.key=++gd,this.da=this.fa=!1}function zr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Hr(o){this.src=o,this.g={},this.h=0}Hr.prototype.add=function(o,c,h,f,b){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var V=gi(o,c,f,b);return-1<V?(c=o[V],h||(c.fa=!1)):(c=new _d(c,this.src,R,!!f,b),c.fa=h,o.push(c)),c};function mi(o,c){var h=c.type;if(h in o.g){var f=o.g[h],b=Array.prototype.indexOf.call(f,c,void 0),R;(R=0<=b)&&Array.prototype.splice.call(f,b,1),R&&(zr(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function gi(o,c,h,f){for(var b=0;b<o.length;++b){var R=o[b];if(!R.da&&R.listener==c&&R.capture==!!h&&R.ha==f)return b}return-1}var _i="closure_lm_"+(1e6*Math.random()|0),yi={};function Aa(o,c,h,f,b){if(Array.isArray(c)){for(var R=0;R<c.length;R++)Aa(o,c[R],h,f,b);return null}return h=Pa(h),o&&o[jr]?o.K(c,h,d(f)?!!f.capture:!1,b):yd(o,c,h,!1,f,b)}function yd(o,c,h,f,b,R){if(!c)throw Error("Invalid event type");var V=d(b)?!!b.capture:!!b,X=wi(o);if(X||(o[_i]=X=new Hr(o)),h=X.add(c,h,f,V,R),h.proxy)return h;if(f=vd(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)pd||(b=V),b===void 0&&(b=!1),o.addEventListener(c.toString(),f,b);else if(o.attachEvent)o.attachEvent(Sa(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function vd(){function o(h){return c.call(o.src,o.listener,h)}const c=wd;return o}function Ra(o,c,h,f,b){if(Array.isArray(c))for(var R=0;R<c.length;R++)Ra(o,c[R],h,f,b);else f=d(f)?!!f.capture:!!f,h=Pa(h),o&&o[jr]?(o=o.i,c=String(c).toString(),c in o.g&&(R=o.g[c],h=gi(R,h,f,b),-1<h&&(zr(R[h]),Array.prototype.splice.call(R,h,1),R.length==0&&(delete o.g[c],o.h--)))):o&&(o=wi(o))&&(c=o.g[c.toString()],o=-1,c&&(o=gi(c,h,f,b)),(h=-1<o?c[o]:null)&&vi(h))}function vi(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[jr])mi(c.i,o);else{var h=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(h,f,o.capture):c.detachEvent?c.detachEvent(Sa(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=wi(c))?(mi(h,o),h.h==0&&(h.src=null,c[_i]=null)):zr(o)}}}function Sa(o){return o in yi?yi[o]:yi[o]="on"+o}function wd(o,c){if(o.da)o=!0;else{c=new Wn(c,this);var h=o.listener,f=o.ha||o.src;o.fa&&vi(o),o=h.call(f,c)}return o}function wi(o){return o=o[_i],o instanceof Hr?o:null}var Ei="__closure_events_fn_"+(1e9*Math.random()>>>0);function Pa(o){return typeof o=="function"?o:(o[Ei]||(o[Ei]=function(c){return o.handleEvent(c)}),o[Ei])}function we(){pt.call(this),this.i=new Hr(this),this.M=this,this.F=null}S(we,pt),we.prototype[jr]=!0,we.prototype.removeEventListener=function(o,c,h,f){Ra(this,o,c,h,f)};function Pe(o,c){var h,f=o.F;if(f)for(h=[];f;f=f.F)h.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new ve(c,o);else if(c instanceof ve)c.target=c.target||o;else{var b=c;c=new ve(f,o),v(c,b)}if(b=!0,h)for(var R=h.length-1;0<=R;R--){var V=c.g=h[R];b=Wr(V,f,!0,c)&&b}if(V=c.g=o,b=Wr(V,f,!0,c)&&b,b=Wr(V,f,!1,c)&&b,h)for(R=0;R<h.length;R++)V=c.g=h[R],b=Wr(V,f,!1,c)&&b}we.prototype.N=function(){if(we.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var h=o.g[c],f=0;f<h.length;f++)zr(h[f]);delete o.g[c],o.h--}}this.F=null},we.prototype.K=function(o,c,h,f){return this.i.add(String(o),c,!1,h,f)},we.prototype.L=function(o,c,h,f){return this.i.add(String(o),c,!0,h,f)};function Wr(o,c,h,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var b=!0,R=0;R<c.length;++R){var V=c[R];if(V&&!V.da&&V.capture==h){var X=V.listener,de=V.ha||V.src;V.fa&&mi(o.i,V),b=X.call(de,f)!==!1&&b}}return b&&!f.defaultPrevented}function Ca(o,c,h){if(typeof o=="function")h&&(o=T(o,h));else if(o&&typeof o.handleEvent=="function")o=T(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(o,c||0)}function ka(o){o.g=Ca(()=>{o.g=null,o.i&&(o.i=!1,ka(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class Ed extends pt{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:ka(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Kn(o){pt.call(this),this.h=o,this.g={}}S(Kn,pt);var Da=[];function Va(o){te(o.g,function(c,h){this.g.hasOwnProperty(h)&&vi(c)},o),o.g={}}Kn.prototype.N=function(){Kn.aa.N.call(this),Va(this)},Kn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ii=l.JSON.stringify,Id=l.JSON.parse,Td=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function Ti(){}Ti.prototype.h=null;function Na(o){return o.h||(o.h=o.i())}function La(){}var Gn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function bi(){ve.call(this,"d")}S(bi,ve);function Ai(){ve.call(this,"c")}S(Ai,ve);var qt={},xa=null;function Kr(){return xa=xa||new we}qt.La="serverreachability";function Oa(o){ve.call(this,qt.La,o)}S(Oa,ve);function Qn(o){const c=Kr();Pe(c,new Oa(c))}qt.STAT_EVENT="statevent";function Ma(o,c){ve.call(this,qt.STAT_EVENT,o),this.stat=c}S(Ma,ve);function Ce(o){const c=Kr();Pe(c,new Ma(c,o))}qt.Ma="timingevent";function Ua(o,c){ve.call(this,qt.Ma,o),this.size=c}S(Ua,ve);function Yn(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},c)}function Jn(){this.g=!0}Jn.prototype.xa=function(){this.g=!1};function bd(o,c,h,f,b,R){o.info(function(){if(o.g)if(R)for(var V="",X=R.split("&"),de=0;de<X.length;de++){var Q=X[de].split("=");if(1<Q.length){var Ee=Q[0];Q=Q[1];var Ie=Ee.split("_");V=2<=Ie.length&&Ie[1]=="type"?V+(Ee+"="+Q+"&"):V+(Ee+"=redacted&")}}else V=null;else V=R;return"XMLHTTP REQ ("+f+") [attempt "+b+"]: "+c+`
`+h+`
`+V})}function Ad(o,c,h,f,b,R,V){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+b+"]: "+c+`
`+h+`
`+R+" "+V})}function cn(o,c,h,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Sd(o,h)+(f?" "+f:"")})}function Rd(o,c){o.info(function(){return"TIMEOUT: "+c})}Jn.prototype.info=function(){};function Sd(o,c){if(!o.g)return c;if(!c)return null;try{var h=JSON.parse(c);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var f=h[o];if(!(2>f.length)){var b=f[1];if(Array.isArray(b)&&!(1>b.length)){var R=b[0];if(R!="noop"&&R!="stop"&&R!="close")for(var V=1;V<b.length;V++)b[V]=""}}}}return Ii(h)}catch{return c}}var Gr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Fa={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ri;function Qr(){}S(Qr,Ti),Qr.prototype.g=function(){return new XMLHttpRequest},Qr.prototype.i=function(){return{}},Ri=new Qr;function mt(o,c,h,f){this.j=o,this.i=c,this.l=h,this.R=f||1,this.U=new Kn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ba}function Ba(){this.i=null,this.g="",this.h=!1}var $a={},Si={};function Pi(o,c,h){o.L=1,o.v=Zr(tt(c)),o.m=h,o.P=!0,qa(o,null)}function qa(o,c){o.F=Date.now(),Yr(o),o.A=tt(o.v);var h=o.A,f=o.R;Array.isArray(f)||(f=[String(f)]),nl(h.i,"t",f),o.C=0,h=o.j.J,o.h=new Ba,o.g=wl(o.j,h?c:null,!o.m),0<o.O&&(o.M=new Ed(T(o.Y,o,o.g),o.O)),c=o.U,h=o.g,f=o.ca;var b="readystatechange";Array.isArray(b)||(b&&(Da[0]=b.toString()),b=Da);for(var R=0;R<b.length;R++){var V=Aa(h,b[R],f||c.handleEvent,!1,c.h||c);if(!V)break;c.g[V.key]=V}c=o.H?m(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),Qn(),bd(o.i,o.u,o.A,o.l,o.R,o.m)}mt.prototype.ca=function(o){o=o.target;const c=this.M;c&&nt(o)==3?c.j():this.Y(o)},mt.prototype.Y=function(o){try{if(o==this.g)e:{const Ie=nt(this.g);var c=this.g.Ba();const dn=this.g.Z();if(!(3>Ie)&&(Ie!=3||this.g&&(this.h.h||this.g.oa()||cl(this.g)))){this.J||Ie!=4||c==7||(c==8||0>=dn?Qn(3):Qn(2)),Ci(this);var h=this.g.Z();this.X=h;t:if(ja(this)){var f=cl(this.g);o="";var b=f.length,R=nt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){jt(this),Xn(this);var V="";break t}this.h.i=new l.TextDecoder}for(c=0;c<b;c++)this.h.h=!0,o+=this.h.i.decode(f[c],{stream:!(R&&c==b-1)});f.length=0,this.h.g+=o,this.C=0,V=this.h.g}else V=this.g.oa();if(this.o=h==200,Ad(this.i,this.u,this.A,this.l,this.R,Ie,h),this.o){if(this.T&&!this.K){t:{if(this.g){var X,de=this.g;if((X=de.g?de.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!F(X)){var Q=X;break t}}Q=null}if(h=Q)cn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ki(this,h);else{this.o=!1,this.s=3,Ce(12),jt(this),Xn(this);break e}}if(this.P){h=!0;let Be;for(;!this.J&&this.C<V.length;)if(Be=Pd(this,V),Be==Si){Ie==4&&(this.s=4,Ce(14),h=!1),cn(this.i,this.l,null,"[Incomplete Response]");break}else if(Be==$a){this.s=4,Ce(15),cn(this.i,this.l,V,"[Invalid Chunk]"),h=!1;break}else cn(this.i,this.l,Be,null),ki(this,Be);if(ja(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ie!=4||V.length!=0||this.h.h||(this.s=1,Ce(16),h=!1),this.o=this.o&&h,!h)cn(this.i,this.l,V,"[Invalid Chunked Response]"),jt(this),Xn(this);else if(0<V.length&&!this.W){this.W=!0;var Ee=this.j;Ee.g==this&&Ee.ba&&!Ee.M&&(Ee.j.info("Great, no buffering proxy detected. Bytes received: "+V.length),Oi(Ee),Ee.M=!0,Ce(11))}}else cn(this.i,this.l,V,null),ki(this,V);Ie==4&&jt(this),this.o&&!this.J&&(Ie==4?gl(this.j,this):(this.o=!1,Yr(this)))}else Hd(this.g),h==400&&0<V.indexOf("Unknown SID")?(this.s=3,Ce(12)):(this.s=0,Ce(13)),jt(this),Xn(this)}}}catch{}finally{}};function ja(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Pd(o,c){var h=o.C,f=c.indexOf(`
`,h);return f==-1?Si:(h=Number(c.substring(h,f)),isNaN(h)?$a:(f+=1,f+h>c.length?Si:(c=c.slice(f,f+h),o.C=f+h,c)))}mt.prototype.cancel=function(){this.J=!0,jt(this)};function Yr(o){o.S=Date.now()+o.I,za(o,o.I)}function za(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Yn(T(o.ba,o),c)}function Ci(o){o.B&&(l.clearTimeout(o.B),o.B=null)}mt.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Rd(this.i,this.A),this.L!=2&&(Qn(),Ce(17)),jt(this),this.s=2,Xn(this)):za(this,this.S-o)};function Xn(o){o.j.G==0||o.J||gl(o.j,o)}function jt(o){Ci(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,Va(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function ki(o,c){try{var h=o.j;if(h.G!=0&&(h.g==o||Di(h.h,o))){if(!o.K&&Di(h.h,o)&&h.G==3){try{var f=h.Da.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var b=f;if(b[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)is(h),rs(h);else break e;xi(h),Ce(18)}}else h.za=b[1],0<h.za-h.T&&37500>b[2]&&h.F&&h.v==0&&!h.C&&(h.C=Yn(T(h.Za,h),6e3));if(1>=Ka(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Ht(h,11)}else if((o.K||h.g==o)&&is(h),!F(c))for(b=h.Da.g.parse(c),c=0;c<b.length;c++){let Q=b[c];if(h.T=Q[0],Q=Q[1],h.G==2)if(Q[0]=="c"){h.K=Q[1],h.ia=Q[2];const Ee=Q[3];Ee!=null&&(h.la=Ee,h.j.info("VER="+h.la));const Ie=Q[4];Ie!=null&&(h.Aa=Ie,h.j.info("SVER="+h.Aa));const dn=Q[5];dn!=null&&typeof dn=="number"&&0<dn&&(f=1.5*dn,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const Be=o.g;if(Be){const as=Be.g?Be.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(as){var R=f.h;R.g||as.indexOf("spdy")==-1&&as.indexOf("quic")==-1&&as.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Vi(R,R.h),R.h=null))}if(f.D){const Mi=Be.g?Be.g.getResponseHeader("X-HTTP-Session-Id"):null;Mi&&(f.ya=Mi,Z(f.I,f.D,Mi))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var V=o;if(f.qa=vl(f,f.J?f.ia:null,f.W),V.K){Ga(f.h,V);var X=V,de=f.L;de&&(X.I=de),X.B&&(Ci(X),Yr(X)),f.g=V}else pl(f);0<h.i.length&&ss(h)}else Q[0]!="stop"&&Q[0]!="close"||Ht(h,7);else h.G==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?Ht(h,7):Li(h):Q[0]!="noop"&&h.l&&h.l.ta(Q),h.v=0)}}Qn(4)}catch{}}var Cd=class{constructor(o,c){this.g=o,this.map=c}};function Ha(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Wa(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ka(o){return o.h?1:o.g?o.g.size:0}function Di(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Vi(o,c){o.g?o.g.add(c):o.h=c}function Ga(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Ha.prototype.cancel=function(){if(this.i=Qa(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Qa(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.D);return c}return D(o.i)}function kd(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var c=[],h=o.length,f=0;f<h;f++)c.push(o[f]);return c}c=[],h=0;for(f in o)c[h++]=o[f];return c}function Dd(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var c=[];o=o.length;for(var h=0;h<o;h++)c.push(h);return c}c=[],h=0;for(const f in o)c[h++]=f;return c}}}function Ya(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var h=Dd(o),f=kd(o),b=f.length,R=0;R<b;R++)c.call(void 0,f[R],h&&h[R],o)}var Ja=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Vd(o,c){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var f=o[h].indexOf("="),b=null;if(0<=f){var R=o[h].substring(0,f);b=o[h].substring(f+1)}else R=o[h];c(R,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function zt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof zt){this.h=o.h,Jr(this,o.j),this.o=o.o,this.g=o.g,Xr(this,o.s),this.l=o.l;var c=o.i,h=new tr;h.i=c.i,c.g&&(h.g=new Map(c.g),h.h=c.h),Xa(this,h),this.m=o.m}else o&&(c=String(o).match(Ja))?(this.h=!1,Jr(this,c[1]||"",!0),this.o=Zn(c[2]||""),this.g=Zn(c[3]||"",!0),Xr(this,c[4]),this.l=Zn(c[5]||"",!0),Xa(this,c[6]||"",!0),this.m=Zn(c[7]||"")):(this.h=!1,this.i=new tr(null,this.h))}zt.prototype.toString=function(){var o=[],c=this.j;c&&o.push(er(c,Za,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(er(c,Za,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(er(h,h.charAt(0)=="/"?xd:Ld,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",er(h,Md)),o.join("")};function tt(o){return new zt(o)}function Jr(o,c,h){o.j=h?Zn(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Xr(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function Xa(o,c,h){c instanceof tr?(o.i=c,Ud(o.i,o.h)):(h||(c=er(c,Od)),o.i=new tr(c,o.h))}function Z(o,c,h){o.i.set(c,h)}function Zr(o){return Z(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Zn(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function er(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,Nd),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Nd(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Za=/[#\/\?@]/g,Ld=/[#\?:]/g,xd=/[#\?]/g,Od=/[#\?@]/g,Md=/#/g;function tr(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function gt(o){o.g||(o.g=new Map,o.h=0,o.i&&Vd(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=tr.prototype,n.add=function(o,c){gt(this),this.i=null,o=un(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function el(o,c){gt(o),c=un(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function tl(o,c){return gt(o),c=un(o,c),o.g.has(c)}n.forEach=function(o,c){gt(this),this.g.forEach(function(h,f){h.forEach(function(b){o.call(c,b,f,this)},this)},this)},n.na=function(){gt(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),h=[];for(let f=0;f<c.length;f++){const b=o[f];for(let R=0;R<b.length;R++)h.push(c[f])}return h},n.V=function(o){gt(this);let c=[];if(typeof o=="string")tl(this,o)&&(c=c.concat(this.g.get(un(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)c=c.concat(o[h])}return c},n.set=function(o,c){return gt(this),this.i=null,o=un(this,o),tl(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function nl(o,c,h){el(o,c),0<h.length&&(o.i=null,o.g.set(un(o,c),D(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var h=0;h<c.length;h++){var f=c[h];const R=encodeURIComponent(String(f)),V=this.V(f);for(f=0;f<V.length;f++){var b=R;V[f]!==""&&(b+="="+encodeURIComponent(String(V[f]))),o.push(b)}}return this.i=o.join("&")};function un(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Ud(o,c){c&&!o.j&&(gt(o),o.i=null,o.g.forEach(function(h,f){var b=f.toLowerCase();f!=b&&(el(this,f),nl(this,b,h))},o)),o.j=c}function Fd(o,c){const h=new Jn;if(l.Image){const f=new Image;f.onload=w(_t,h,"TestLoadImage: loaded",!0,c,f),f.onerror=w(_t,h,"TestLoadImage: error",!1,c,f),f.onabort=w(_t,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=w(_t,h,"TestLoadImage: timeout",!1,c,f),l.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function Bd(o,c){const h=new Jn,f=new AbortController,b=setTimeout(()=>{f.abort(),_t(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(R=>{clearTimeout(b),R.ok?_t(h,"TestPingServer: ok",!0,c):_t(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(b),_t(h,"TestPingServer: error",!1,c)})}function _t(o,c,h,f,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),f(h)}catch{}}function $d(){this.g=new Td}function qd(o,c,h){const f=h||"";try{Ya(o,function(b,R){let V=b;d(b)&&(V=Ii(b)),c.push(f+R+"="+encodeURIComponent(V))})}catch(b){throw c.push(f+"type="+encodeURIComponent("_badmap")),b}}function es(o){this.l=o.Ub||null,this.j=o.eb||!1}S(es,Ti),es.prototype.g=function(){return new ts(this.l,this.j)},es.prototype.i=function(o){return function(){return o}}({});function ts(o,c){we.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(ts,we),n=ts.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,rr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,nr(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,rr(this)),this.g&&(this.readyState=3,rr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;rl(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function rl(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?nr(this):rr(this),this.readyState==3&&rl(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,nr(this))},n.Qa=function(o){this.g&&(this.response=o,nr(this))},n.ga=function(){this.g&&nr(this)};function nr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,rr(o)}n.setRequestHeader=function(o,c){this.u.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function rr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ts.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function sl(o){let c="";return te(o,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function Ni(o,c,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=sl(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):Z(o,c,h))}function se(o){we.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(se,we);var jd=/^https?$/i,zd=["POST","PUT"];n=se.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ri.g(),this.v=this.o?Na(this.o):Na(Ri),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(R){il(this,R);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var b in f)h.set(b,f[b]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())h.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),b=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(zd,c,void 0))||f||b||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,V]of h)this.g.setRequestHeader(R,V);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ll(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){il(this,R)}};function il(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,ol(o),ns(o)}function ol(o){o.A||(o.A=!0,Pe(o,"complete"),Pe(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Pe(this,"complete"),Pe(this,"abort"),ns(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ns(this,!0)),se.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?al(this):this.bb())},n.bb=function(){al(this)};function al(o){if(o.h&&typeof a<"u"&&(!o.v[1]||nt(o)!=4||o.Z()!=2)){if(o.u&&nt(o)==4)Ca(o.Ea,0,o);else if(Pe(o,"readystatechange"),nt(o)==4){o.h=!1;try{const V=o.Z();e:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var f;if(f=V===0){var b=String(o.D).match(Ja)[1]||null;!b&&l.self&&l.self.location&&(b=l.self.location.protocol.slice(0,-1)),f=!jd.test(b?b.toLowerCase():"")}h=f}if(h)Pe(o,"complete"),Pe(o,"success");else{o.m=6;try{var R=2<nt(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",ol(o)}}finally{ns(o)}}}}function ns(o,c){if(o.g){ll(o);const h=o.g,f=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||Pe(o,"ready");try{h.onreadystatechange=f}catch{}}}function ll(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function nt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<nt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),Id(c)}};function cl(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Hd(o){const c={};o=(o.g&&2<=nt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(F(o[f]))continue;var h=I(o[f]);const b=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=c[b]||[];c[b]=R,R.push(h)}E(c,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function sr(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function ul(o){this.Aa=0,this.i=[],this.j=new Jn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=sr("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=sr("baseRetryDelayMs",5e3,o),this.cb=sr("retryDelaySeedMs",1e4,o),this.Wa=sr("forwardChannelMaxRetries",2,o),this.wa=sr("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Ha(o&&o.concurrentRequestLimit),this.Da=new $d,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=ul.prototype,n.la=8,n.G=1,n.connect=function(o,c,h,f){Ce(0),this.W=o,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=vl(this,null,this.W),ss(this)};function Li(o){if(hl(o),o.G==3){var c=o.U++,h=tt(o.I);if(Z(h,"SID",o.K),Z(h,"RID",c),Z(h,"TYPE","terminate"),ir(o,h),c=new mt(o,o.j,c),c.L=2,c.v=Zr(tt(h)),h=!1,l.navigator&&l.navigator.sendBeacon)try{h=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!h&&l.Image&&(new Image().src=c.v,h=!0),h||(c.g=wl(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Yr(c)}yl(o)}function rs(o){o.g&&(Oi(o),o.g.cancel(),o.g=null)}function hl(o){rs(o),o.u&&(l.clearTimeout(o.u),o.u=null),is(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function ss(o){if(!Wa(o.h)&&!o.s){o.s=!0;var c=o.Ga;zn||ba(),Hn||(zn(),Hn=!0),pi.add(c,o),o.B=0}}function Wd(o,c){return Ka(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Yn(T(o.Ga,o,c),_l(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const b=new mt(this,this.j,o);let R=this.o;if(this.S&&(R?(R=m(R),v(R,this.S)):R=this.S),this.m!==null||this.O||(b.H=R,R=null),this.P)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,4096<c){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=fl(this,b,c),h=tt(this.I),Z(h,"RID",o),Z(h,"CVER",22),this.D&&Z(h,"X-HTTP-Session-Id",this.D),ir(this,h),R&&(this.O?c="headers="+encodeURIComponent(String(sl(R)))+"&"+c:this.m&&Ni(h,this.m,R)),Vi(this.h,b),this.Ua&&Z(h,"TYPE","init"),this.P?(Z(h,"$req",c),Z(h,"SID","null"),b.T=!0,Pi(b,h,null)):Pi(b,h,c),this.G=2}}else this.G==3&&(o?dl(this,o):this.i.length==0||Wa(this.h)||dl(this))};function dl(o,c){var h;c?h=c.l:h=o.U++;const f=tt(o.I);Z(f,"SID",o.K),Z(f,"RID",h),Z(f,"AID",o.T),ir(o,f),o.m&&o.o&&Ni(f,o.m,o.o),h=new mt(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),c&&(o.i=c.D.concat(o.i)),c=fl(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Vi(o.h,h),Pi(h,f,c)}function ir(o,c){o.H&&te(o.H,function(h,f){Z(c,f,h)}),o.l&&Ya({},function(h,f){Z(c,f,h)})}function fl(o,c,h){h=Math.min(o.i.length,h);var f=o.l?T(o.l.Na,o.l,o):null;e:{var b=o.i;let R=-1;for(;;){const V=["count="+h];R==-1?0<h?(R=b[0].g,V.push("ofs="+R)):R=0:V.push("ofs="+R);let X=!0;for(let de=0;de<h;de++){let Q=b[de].g;const Ee=b[de].map;if(Q-=R,0>Q)R=Math.max(0,b[de].g-100),X=!1;else try{qd(Ee,V,"req"+Q+"_")}catch{f&&f(Ee)}}if(X){f=V.join("&");break e}}}return o=o.i.splice(0,h),c.D=o,f}function pl(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;zn||ba(),Hn||(zn(),Hn=!0),pi.add(c,o),o.v=0}}function xi(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Yn(T(o.Fa,o),_l(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,ml(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Yn(T(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ce(10),rs(this),ml(this))};function Oi(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function ml(o){o.g=new mt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=tt(o.qa);Z(c,"RID","rpc"),Z(c,"SID",o.K),Z(c,"AID",o.T),Z(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&Z(c,"TO",o.ja),Z(c,"TYPE","xmlhttp"),ir(o,c),o.m&&o.o&&Ni(c,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=Zr(tt(c)),h.m=null,h.P=!0,qa(h,o)}n.Za=function(){this.C!=null&&(this.C=null,rs(this),xi(this),Ce(19))};function is(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function gl(o,c){var h=null;if(o.g==c){is(o),Oi(o),o.g=null;var f=2}else if(Di(o.h,c))h=c.D,Ga(o.h,c),f=1;else return;if(o.G!=0){if(c.o)if(f==1){h=c.m?c.m.length:0,c=Date.now()-c.F;var b=o.B;f=Kr(),Pe(f,new Ua(f,h)),ss(o)}else pl(o);else if(b=c.s,b==3||b==0&&0<c.X||!(f==1&&Wd(o,c)||f==2&&xi(o)))switch(h&&0<h.length&&(c=o.h,c.i=c.i.concat(h)),b){case 1:Ht(o,5);break;case 4:Ht(o,10);break;case 3:Ht(o,6);break;default:Ht(o,2)}}}function _l(o,c){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*c}function Ht(o,c){if(o.j.info("Error code "+c),c==2){var h=T(o.fb,o),f=o.Xa;const b=!f;f=new zt(f||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Jr(f,"https"),Zr(f),b?Fd(f.toString(),h):Bd(f.toString(),h)}else Ce(2);o.G=0,o.l&&o.l.sa(c),yl(o),hl(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Ce(2)):(this.j.info("Failed to ping google.com"),Ce(1))};function yl(o){if(o.G=0,o.ka=[],o.l){const c=Qa(o.h);(c.length!=0||o.i.length!=0)&&(k(o.ka,c),k(o.ka,o.i),o.h.i.length=0,D(o.i),o.i.length=0),o.l.ra()}}function vl(o,c,h){var f=h instanceof zt?tt(h):new zt(h);if(f.g!="")c&&(f.g=c+"."+f.g),Xr(f,f.s);else{var b=l.location;f=b.protocol,c=c?c+"."+b.hostname:b.hostname,b=+b.port;var R=new zt(null);f&&Jr(R,f),c&&(R.g=c),b&&Xr(R,b),h&&(R.l=h),f=R}return h=o.D,c=o.ya,h&&c&&Z(f,h,c),Z(f,"VER",o.la),ir(o,f),f}function wl(o,c,h){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new se(new es({eb:h})):new se(o.pa),c.Ha(o.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function El(){}n=El.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function os(){}os.prototype.g=function(o,c){return new Le(o,c)};function Le(o,c){we.call(this),this.g=new ul(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!F(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!F(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new hn(this)}S(Le,we),Le.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Le.prototype.close=function(){Li(this.g)},Le.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Ii(o),o=h);c.i.push(new Cd(c.Ya++,o)),c.G==3&&ss(c)},Le.prototype.N=function(){this.g.l=null,delete this.j,Li(this.g),delete this.g,Le.aa.N.call(this)};function Il(o){bi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const h in c){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}S(Il,bi);function Tl(){Ai.call(this),this.status=1}S(Tl,Ai);function hn(o){this.g=o}S(hn,El),hn.prototype.ua=function(){Pe(this.g,"a")},hn.prototype.ta=function(o){Pe(this.g,new Il(o))},hn.prototype.sa=function(o){Pe(this.g,new Tl)},hn.prototype.ra=function(){Pe(this.g,"b")},os.prototype.createWebChannel=os.prototype.g,Le.prototype.send=Le.prototype.o,Le.prototype.open=Le.prototype.m,Le.prototype.close=Le.prototype.close,ju=function(){return new os},qu=function(){return Kr()},$u=qt,io={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Gr.NO_ERROR=0,Gr.TIMEOUT=8,Gr.HTTP_ERROR=6,ws=Gr,Fa.COMPLETE="complete",Bu=Fa,La.EventType=Gn,Gn.OPEN="a",Gn.CLOSE="b",Gn.ERROR="c",Gn.MESSAGE="d",we.prototype.listen=we.prototype.K,cr=La,se.prototype.listenOnce=se.prototype.L,se.prototype.getLastError=se.prototype.Ka,se.prototype.getLastErrorCode=se.prototype.Ba,se.prototype.getStatus=se.prototype.Z,se.prototype.getResponseJson=se.prototype.Oa,se.prototype.getResponseText=se.prototype.oa,se.prototype.send=se.prototype.ea,se.prototype.setWithCredentials=se.prototype.Ha,Fu=se}).apply(typeof cs<"u"?cs:typeof self<"u"?self:typeof window<"u"?window:{});const tc="@firebase/firestore";/**
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
 */class be{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}be.UNAUTHENTICATED=new be(null),be.GOOGLE_CREDENTIALS=new be("google-credentials-uid"),be.FIRST_PARTY=new be("first-party-uid"),be.MOCK_USER=new be("mock-user");/**
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
 */let Un="10.14.0";/**
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
 */const Zt=new Po("@firebase/firestore");function or(){return Zt.logLevel}function x(n,...e){if(Zt.logLevel<=K.DEBUG){const t=e.map(Bo);Zt.debug(`Firestore (${Un}): ${n}`,...t)}}function ut(n,...e){if(Zt.logLevel<=K.ERROR){const t=e.map(Bo);Zt.error(`Firestore (${Un}): ${n}`,...t)}}function Sn(n,...e){if(Zt.logLevel<=K.WARN){const t=e.map(Bo);Zt.warn(`Firestore (${Un}): ${n}`,...t)}}function Bo(n){if(typeof n=="string")return n;try{/**
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
 */function B(n="Unexpected state"){const e=`FIRESTORE (${Un}) INTERNAL ASSERTION FAILED: `+n;throw ut(e),new Error(e)}function J(n,e){n||B()}function j(n,e){return n}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends dt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class at{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class zu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Kg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(be.UNAUTHENTICATED))}shutdown(){}}class Gg{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Qg{constructor(e){this.t=e,this.currentUser=be.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){J(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new at;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new at,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new at)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(J(typeof r.accessToken=="string"),new zu(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return J(e===null||typeof e=="string"),new be(e)}}class Yg{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=be.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Jg{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new Yg(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(be.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Xg{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Zg{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){J(this.o===void 0);const r=i=>{i.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,x("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(J(typeof t.token=="string"),this.R=t.token,new Xg(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function e_(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class Hu{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=e_(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%e.length))}return r}}function Y(n,e){return n<e?-1:n>e?1:0}function Pn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
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
 */class ae{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ae.fromMillis(Date.now())}static fromDate(e){return ae.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new ae(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Y(this.nanoseconds,e.nanoseconds):Y(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class ${constructor(e){this.timestamp=e}static fromTimestamp(e){return new $(e)}static min(){return new $(new ae(0,0))}static max(){return new $(new ae(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Er{constructor(e,t,r){t===void 0?t=0:t>e.length&&B(),r===void 0?r=e.length-t:r>e.length-t&&B(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Er.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Er?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=e.get(s),a=t.get(s);if(i<a)return-1;if(i>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ee extends Er{construct(e,t,r){return new ee(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new N(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new ee(t)}static emptyPath(){return new ee([])}}const t_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class pe extends Er{construct(e,t,r){return new pe(e,t,r)}static isValidIdentifier(e){return t_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),pe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new pe(["__name__"])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new N(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new N(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new N(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new pe(t)}static emptyPath(){return new pe([])}}/**
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
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(ee.fromString(e))}static fromName(e){return new O(ee.fromString(e).popFirst(5))}static empty(){return new O(ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new ee(e.slice()))}}function n_(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=$.fromTimestamp(r===1e9?new ae(t+1,0):new ae(t,r));return new Nt(s,O.empty(),e)}function r_(n){return new Nt(n.readTime,n.key,-1)}class Nt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Nt($.min(),O.empty(),-1)}static max(){return new Nt($.max(),O.empty(),-1)}}function s_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(n.documentKey,e.documentKey),t!==0?t:Y(n.largestBatchId,e.largestBatchId))}/**
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
 */const i_="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class o_{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Vr(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==i_)throw n;x("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):C.reject(t)}static resolve(e){return new C((t,r)=>{t(e)})}static reject(e){return new C((t,r)=>{r(e)})}static waitFor(e){return new C((t,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next(s=>s?C.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new C((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(p=>{a[d]=p,++l,l===i&&r(a)},p=>s(p))}})}static doWhile(e,t){return new C((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function a_(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Nr(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class $o{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}$o.oe=-1;function Ys(n){return n==null}function xs(n){return n===0&&1/n==-1/0}function l_(n){return typeof n=="number"&&Number.isInteger(n)&&!xs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */function nc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function on(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Wu(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class re{constructor(e,t){this.comparator=e,this.root=t||fe.EMPTY}insert(e,t){return new re(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,fe.BLACK,null,null))}remove(e){return new re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,fe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new us(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new us(this.root,e,this.comparator,!1)}getReverseIterator(){return new us(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new us(this.root,e,this.comparator,!0)}}class us{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class fe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??fe.RED,this.left=s??fe.EMPTY,this.right=i??fe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new fe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return fe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return fe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,fe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,fe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw B();const e=this.left.check();if(e!==this.right.check())throw B();return e+(this.isRed()?0:1)}}fe.EMPTY=null,fe.RED=!0,fe.BLACK=!1;fe.EMPTY=new class{constructor(){this.size=0}get key(){throw B()}get value(){throw B()}get color(){throw B()}get left(){throw B()}get right(){throw B()}copy(e,t,r,s,i){return this}insert(e,t,r){return new fe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ge{constructor(e){this.comparator=e,this.data=new re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new rc(this.data.getIterator())}getIteratorFrom(e){return new rc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ge)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ge(this.comparator);return t.data=e,t}}class rc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Me{constructor(e){this.fields=e,e.sort(pe.comparator)}static empty(){return new Me([])}unionWith(e){let t=new ge(pe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Me(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Pn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Ku extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class _e{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Ku("Invalid base64 string: "+i):i}}(e);return new _e(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new _e(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Y(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}_e.EMPTY_BYTE_STRING=new _e("");const c_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Lt(n){if(J(!!n),typeof n=="string"){let e=0;const t=c_.exec(n);if(J(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:oe(n.seconds),nanos:oe(n.nanos)}}function oe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function en(n){return typeof n=="string"?_e.fromBase64String(n):_e.fromUint8Array(n)}/**
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
 */function qo(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function jo(n){const e=n.mapValue.fields.__previous_value__;return qo(e)?jo(e):e}function Ir(n){const e=Lt(n.mapValue.fields.__local_write_time__.timestampValue);return new ae(e.seconds,e.nanos)}/**
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
 */class u_{constructor(e,t,r,s,i,a,l,u,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=d}}class Tr{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Tr("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Tr&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const hs={mapValue:{}};function tn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?qo(n)?4:d_(n)?9007199254740991:h_(n)?10:11:B()}function Ze(n,e){if(n===e)return!0;const t=tn(n);if(t!==tn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ir(n).isEqual(Ir(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Lt(s.timestampValue),l=Lt(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return en(s.bytesValue).isEqual(en(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return oe(s.geoPointValue.latitude)===oe(i.geoPointValue.latitude)&&oe(s.geoPointValue.longitude)===oe(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return oe(s.integerValue)===oe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=oe(s.doubleValue),l=oe(i.doubleValue);return a===l?xs(a)===xs(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return Pn(n.arrayValue.values||[],e.arrayValue.values||[],Ze);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(nc(a)!==nc(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!Ze(a[u],l[u])))return!1;return!0}(n,e);default:return B()}}function br(n,e){return(n.values||[]).find(t=>Ze(t,e))!==void 0}function Cn(n,e){if(n===e)return 0;const t=tn(n),r=tn(e);if(t!==r)return Y(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Y(n.booleanValue,e.booleanValue);case 2:return function(i,a){const l=oe(i.integerValue||i.doubleValue),u=oe(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return sc(n.timestampValue,e.timestampValue);case 4:return sc(Ir(n),Ir(e));case 5:return Y(n.stringValue,e.stringValue);case 6:return function(i,a){const l=en(i),u=en(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const l=i.split("/"),u=a.split("/");for(let d=0;d<l.length&&d<u.length;d++){const p=Y(l[d],u[d]);if(p!==0)return p}return Y(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const l=Y(oe(i.latitude),oe(a.latitude));return l!==0?l:Y(oe(i.longitude),oe(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return ic(n.arrayValue,e.arrayValue);case 10:return function(i,a){var l,u,d,p;const g=i.fields||{},T=a.fields||{},w=(l=g.value)===null||l===void 0?void 0:l.arrayValue,S=(u=T.value)===null||u===void 0?void 0:u.arrayValue,D=Y(((d=w==null?void 0:w.values)===null||d===void 0?void 0:d.length)||0,((p=S==null?void 0:S.values)===null||p===void 0?void 0:p.length)||0);return D!==0?D:ic(w,S)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===hs.mapValue&&a===hs.mapValue)return 0;if(i===hs.mapValue)return 1;if(a===hs.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),d=a.fields||{},p=Object.keys(d);u.sort(),p.sort();for(let g=0;g<u.length&&g<p.length;++g){const T=Y(u[g],p[g]);if(T!==0)return T;const w=Cn(l[u[g]],d[p[g]]);if(w!==0)return w}return Y(u.length,p.length)}(n.mapValue,e.mapValue);default:throw B()}}function sc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Y(n,e);const t=Lt(n),r=Lt(e),s=Y(t.seconds,r.seconds);return s!==0?s:Y(t.nanos,r.nanos)}function ic(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Cn(t[s],r[s]);if(i)return i}return Y(t.length,r.length)}function kn(n){return oo(n)}function oo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Lt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return en(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return O.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=oo(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${oo(t.fields[a])}`;return s+"}"}(n.mapValue):B()}function oc(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ao(n){return!!n&&"integerValue"in n}function zo(n){return!!n&&"arrayValue"in n}function ac(n){return!!n&&"nullValue"in n}function lc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Es(n){return!!n&&"mapValue"in n}function h_(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function mr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return on(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=mr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=mr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function d_(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class Ne{constructor(e){this.value=e}static empty(){return new Ne({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Es(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=mr(t)}setAll(e){let t=pe.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=mr(a):s.push(l.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Es(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ze(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Es(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){on(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Ne(mr(this.value))}}function Gu(n){const e=[];return on(n.fields,(t,r)=>{const s=new pe([t]);if(Es(r)){const i=Gu(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Me(e)}/**
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
 */class Ae{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Ae(e,0,$.min(),$.min(),$.min(),Ne.empty(),0)}static newFoundDocument(e,t,r,s){return new Ae(e,1,t,$.min(),r,s,0)}static newNoDocument(e,t){return new Ae(e,2,t,$.min(),$.min(),Ne.empty(),0)}static newUnknownDocument(e,t){return new Ae(e,3,t,$.min(),$.min(),Ne.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual($.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ne.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ne.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=$.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ae&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ae(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Os{constructor(e,t){this.position=e,this.inclusive=t}}function cc(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=O.comparator(O.fromName(a.referenceValue),t.key):r=Cn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function uc(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ze(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ar{constructor(e,t="asc"){this.field=e,this.dir=t}}function f_(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Qu{}class ce extends Qu{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new m_(e,t,r):t==="array-contains"?new y_(e,r):t==="in"?new v_(e,r):t==="not-in"?new w_(e,r):t==="array-contains-any"?new E_(e,r):new ce(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new g_(e,r):new __(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Cn(t,this.value)):t!==null&&tn(this.value)===tn(t)&&this.matchesComparison(Cn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class qe extends Qu{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new qe(e,t)}matches(e){return Yu(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Yu(n){return n.op==="and"}function Ju(n){return p_(n)&&Yu(n)}function p_(n){for(const e of n.filters)if(e instanceof qe)return!1;return!0}function lo(n){if(n instanceof ce)return n.field.canonicalString()+n.op.toString()+kn(n.value);if(Ju(n))return n.filters.map(e=>lo(e)).join(",");{const e=n.filters.map(t=>lo(t)).join(",");return`${n.op}(${e})`}}function Xu(n,e){return n instanceof ce?function(r,s){return s instanceof ce&&r.op===s.op&&r.field.isEqual(s.field)&&Ze(r.value,s.value)}(n,e):n instanceof qe?function(r,s){return s instanceof qe&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,l)=>i&&Xu(a,s.filters[l]),!0):!1}(n,e):void B()}function Zu(n){return n instanceof ce?function(t){return`${t.field.canonicalString()} ${t.op} ${kn(t.value)}`}(n):n instanceof qe?function(t){return t.op.toString()+" {"+t.getFilters().map(Zu).join(" ,")+"}"}(n):"Filter"}class m_ extends ce{constructor(e,t,r){super(e,t,r),this.key=O.fromName(r.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class g_ extends ce{constructor(e,t){super(e,"in",t),this.keys=eh("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class __ extends ce{constructor(e,t){super(e,"not-in",t),this.keys=eh("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function eh(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>O.fromName(r.referenceValue))}class y_ extends ce{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return zo(t)&&br(t.arrayValue,this.value)}}class v_ extends ce{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&br(this.value.arrayValue,t)}}class w_ extends ce{constructor(e,t){super(e,"not-in",t)}matches(e){if(br(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!br(this.value.arrayValue,t)}}class E_ extends ce{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!zo(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>br(this.value.arrayValue,r))}}/**
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
 */class I_{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.ue=null}}function hc(n,e=null,t=[],r=[],s=null,i=null,a=null){return new I_(n,e,t,r,s,i,a)}function Ho(n){const e=j(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>lo(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Ys(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>kn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>kn(r)).join(",")),e.ue=t}return e.ue}function Wo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!f_(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Xu(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!uc(n.startAt,e.startAt)&&uc(n.endAt,e.endAt)}function co(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Fn{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function T_(n,e,t,r,s,i,a,l){return new Fn(n,e,t,r,s,i,a,l)}function Ko(n){return new Fn(n)}function dc(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function th(n){return n.collectionGroup!==null}function gr(n){const e=j(n);if(e.ce===null){e.ce=[];const t=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ge(pe.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Ar(i,r))}),t.has(pe.keyField().canonicalString())||e.ce.push(new Ar(pe.keyField(),r))}return e.ce}function Ye(n){const e=j(n);return e.le||(e.le=b_(e,gr(n))),e.le}function b_(n,e){if(n.limitType==="F")return hc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ar(s.field,i)});const t=n.endAt?new Os(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Os(n.startAt.position,n.startAt.inclusive):null;return hc(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function uo(n,e){const t=n.filters.concat([e]);return new Fn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ms(n,e,t){return new Fn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Js(n,e){return Wo(Ye(n),Ye(e))&&n.limitType===e.limitType}function nh(n){return`${Ho(Ye(n))}|lt:${n.limitType}`}function fn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Zu(s)).join(", ")}]`),Ys(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>kn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>kn(s)).join(",")),`Target(${r})`}(Ye(n))}; limitType=${n.limitType})`}function Xs(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):O.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of gr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,u){const d=cc(a,l,u);return a.inclusive?d<=0:d<0}(r.startAt,gr(r),s)||r.endAt&&!function(a,l,u){const d=cc(a,l,u);return a.inclusive?d>=0:d>0}(r.endAt,gr(r),s))}(n,e)}function A_(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function rh(n){return(e,t)=>{let r=!1;for(const s of gr(n)){const i=R_(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function R_(n,e,t){const r=n.field.isKeyField()?O.comparator(e.key,t.key):function(i,a,l){const u=a.data.field(i),d=l.data.field(i);return u!==null&&d!==null?Cn(u,d):B()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return B()}}/**
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
 */class Bn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){on(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Wu(this.inner)}size(){return this.innerSize}}/**
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
 */const S_=new re(O.comparator);function ht(){return S_}const sh=new re(O.comparator);function ur(...n){let e=sh;for(const t of n)e=e.insert(t.key,t);return e}function ih(n){let e=sh;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Kt(){return _r()}function oh(){return _r()}function _r(){return new Bn(n=>n.toString(),(n,e)=>n.isEqual(e))}const P_=new re(O.comparator),C_=new ge(O.comparator);function W(...n){let e=C_;for(const t of n)e=e.add(t);return e}const k_=new ge(Y);function D_(){return k_}/**
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
 */function Go(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:xs(e)?"-0":e}}function ah(n){return{integerValue:""+n}}function V_(n,e){return l_(e)?ah(e):Go(n,e)}/**
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
 */class Zs{constructor(){this._=void 0}}function N_(n,e,t){return n instanceof Us?function(s,i){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&qo(i)&&(i=jo(i)),i&&(a.fields.__previous_value__=i),{mapValue:a}}(t,e):n instanceof Dn?ch(n,e):n instanceof Vn?uh(n,e):function(s,i){const a=lh(s,i),l=fc(a)+fc(s.Pe);return ao(a)&&ao(s.Pe)?ah(l):Go(s.serializer,l)}(n,e)}function L_(n,e,t){return n instanceof Dn?ch(n,e):n instanceof Vn?uh(n,e):t}function lh(n,e){return n instanceof Fs?function(r){return ao(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Us extends Zs{}class Dn extends Zs{constructor(e){super(),this.elements=e}}function ch(n,e){const t=hh(e);for(const r of n.elements)t.some(s=>Ze(s,r))||t.push(r);return{arrayValue:{values:t}}}class Vn extends Zs{constructor(e){super(),this.elements=e}}function uh(n,e){let t=hh(e);for(const r of n.elements)t=t.filter(s=>!Ze(s,r));return{arrayValue:{values:t}}}class Fs extends Zs{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function fc(n){return oe(n.integerValue||n.doubleValue)}function hh(n){return zo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class dh{constructor(e,t){this.field=e,this.transform=t}}function x_(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Dn&&s instanceof Dn||r instanceof Vn&&s instanceof Vn?Pn(r.elements,s.elements,Ze):r instanceof Fs&&s instanceof Fs?Ze(r.Pe,s.Pe):r instanceof Us&&s instanceof Us}(n.transform,e.transform)}class O_{constructor(e,t){this.version=e,this.transformResults=t}}class ke{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ke}static exists(e){return new ke(void 0,e)}static updateTime(e){return new ke(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Is(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ei{}function fh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ti(n.key,ke.none()):new Lr(n.key,n.data,ke.none());{const t=n.data,r=Ne.empty();let s=new ge(pe.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Ut(n.key,r,new Me(s.toArray()),ke.none())}}function M_(n,e,t){n instanceof Lr?function(s,i,a){const l=s.value.clone(),u=mc(s.fieldTransforms,i,a.transformResults);l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof Ut?function(s,i,a){if(!Is(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=mc(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(ph(s)),u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function yr(n,e,t,r){return n instanceof Lr?function(i,a,l,u){if(!Is(i.precondition,a))return l;const d=i.value.clone(),p=gc(i.fieldTransforms,u,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Ut?function(i,a,l,u){if(!Is(i.precondition,a))return l;const d=gc(i.fieldTransforms,u,a),p=a.data;return p.setAll(ph(i)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(i,a,l){return Is(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function U_(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=lh(r.transform,s||null);i!=null&&(t===null&&(t=Ne.empty()),t.set(r.field,i))}return t||null}function pc(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Pn(r,s,(i,a)=>x_(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Lr extends ei{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ut extends ei{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function ph(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function mc(n,e,t){const r=new Map;J(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,L_(a,l,t[s]))}return r}function gc(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,N_(i,a,e))}return r}class ti extends ei{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class F_ extends ei{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class B_{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&M_(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=yr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=yr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=oh();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const u=fh(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument($.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),W())}isEqual(e){return this.batchId===e.batchId&&Pn(this.mutations,e.mutations,(t,r)=>pc(t,r))&&Pn(this.baseMutations,e.baseMutations,(t,r)=>pc(t,r))}}class Qo{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){J(e.mutations.length===r.length);let s=function(){return P_}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Qo(e,t,r,s)}}/**
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
 */class $_{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class q_{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var le,G;function j_(n){switch(n){default:return B();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function mh(n){if(n===void 0)return ut("GRPC error has no .code"),P.UNKNOWN;switch(n){case le.OK:return P.OK;case le.CANCELLED:return P.CANCELLED;case le.UNKNOWN:return P.UNKNOWN;case le.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case le.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case le.INTERNAL:return P.INTERNAL;case le.UNAVAILABLE:return P.UNAVAILABLE;case le.UNAUTHENTICATED:return P.UNAUTHENTICATED;case le.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case le.NOT_FOUND:return P.NOT_FOUND;case le.ALREADY_EXISTS:return P.ALREADY_EXISTS;case le.PERMISSION_DENIED:return P.PERMISSION_DENIED;case le.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case le.ABORTED:return P.ABORTED;case le.OUT_OF_RANGE:return P.OUT_OF_RANGE;case le.UNIMPLEMENTED:return P.UNIMPLEMENTED;case le.DATA_LOSS:return P.DATA_LOSS;default:return B()}}(G=le||(le={}))[G.OK=0]="OK",G[G.CANCELLED=1]="CANCELLED",G[G.UNKNOWN=2]="UNKNOWN",G[G.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",G[G.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",G[G.NOT_FOUND=5]="NOT_FOUND",G[G.ALREADY_EXISTS=6]="ALREADY_EXISTS",G[G.PERMISSION_DENIED=7]="PERMISSION_DENIED",G[G.UNAUTHENTICATED=16]="UNAUTHENTICATED",G[G.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",G[G.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",G[G.ABORTED=10]="ABORTED",G[G.OUT_OF_RANGE=11]="OUT_OF_RANGE",G[G.UNIMPLEMENTED=12]="UNIMPLEMENTED",G[G.INTERNAL=13]="INTERNAL",G[G.UNAVAILABLE=14]="UNAVAILABLE",G[G.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function z_(){return new TextEncoder}/**
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
 */const H_=new Gt([4294967295,4294967295],0);function _c(n){const e=z_().encode(n),t=new Uu;return t.update(e),new Uint8Array(t.digest())}function yc(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Gt([t,r],0),new Gt([s,i],0)]}class Yo{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new hr(`Invalid padding: ${t}`);if(r<0)throw new hr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new hr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new hr(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Gt.fromNumber(this.Ie)}Ee(e,t,r){let s=e.add(t.multiply(Gt.fromNumber(r)));return s.compare(H_)===1&&(s=new Gt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=_c(e),[r,s]=yc(t);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);if(!this.de(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Yo(i,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.Ie===0)return;const t=_c(e),[r,s]=yc(t);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class hr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ni{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,xr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ni($.min(),s,new re(Y),ht(),W())}}class xr{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new xr(r,t,W(),W(),W())}}/**
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
 */class Ts{constructor(e,t,r,s){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=s}}class gh{constructor(e,t){this.targetId=e,this.me=t}}class _h{constructor(e,t,r=_e.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class vc{constructor(){this.fe=0,this.ge=Ec(),this.pe=_e.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=W(),t=W(),r=W();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:B()}}),new xr(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=Ec()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,J(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class W_{constructor(e){this.Le=e,this.Be=new Map,this.ke=ht(),this.qe=wc(),this.Qe=new re(Y)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:B()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,s)=>{this.ze(s)&&t(s)})}He(e){const t=e.targetId,r=e.me.count,s=this.Je(t);if(s){const i=s.target;if(co(i))if(r===0){const a=new O(i.path);this.Ue(t,a,Ae.newNoDocument(a,$.min()))}else J(r===1);else{const a=this.Ye(t);if(a!==r){const l=this.Ze(e),u=l?this.Xe(l,e,a):1;if(u!==0){this.je(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,d)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=en(r).toUint8Array()}catch(u){if(u instanceof Ku)return Sn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Yo(a,s,i)}catch(u){return Sn(u instanceof hr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(t,i,null),s++)}),s}rt(e){const t=new Map;this.Be.forEach((i,a)=>{const l=this.Je(a);if(l){if(i.current&&co(l.target)){const u=new O(l.target.path);this.ke.get(u)!==null||this.it(a,u)||this.Ue(a,u,Ae.newNoDocument(u,e))}i.be&&(t.set(a,i.ve()),i.Ce())}});let r=W();this.qe.forEach((i,a)=>{let l=!0;a.forEachWhile(u=>{const d=this.Je(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,a)=>a.setReadTime(e));const s=new ni(e,t,this.Qe,this.ke,r);return this.ke=ht(),this.qe=wc(),this.Qe=new re(Y),s}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new vc,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ge(Y),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||x("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new vc),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function wc(){return new re(O.comparator)}function Ec(){return new re(O.comparator)}const K_={asc:"ASCENDING",desc:"DESCENDING"},G_={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Q_={and:"AND",or:"OR"};class Y_{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ho(n,e){return n.useProto3Json||Ys(e)?e:{value:e}}function Bs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function yh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function J_(n,e){return Bs(n,e.toTimestamp())}function Je(n){return J(!!n),$.fromTimestamp(function(t){const r=Lt(t);return new ae(r.seconds,r.nanos)}(n))}function Jo(n,e){return fo(n,e).canonicalString()}function fo(n,e){const t=function(s){return new ee(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function vh(n){const e=ee.fromString(n);return J(bh(e)),e}function po(n,e){return Jo(n.databaseId,e.path)}function Hi(n,e){const t=vh(e);if(t.get(1)!==n.databaseId.projectId)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new O(Eh(t))}function wh(n,e){return Jo(n.databaseId,e)}function X_(n){const e=vh(n);return e.length===4?ee.emptyPath():Eh(e)}function mo(n){return new ee(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Eh(n){return J(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Ic(n,e,t){return{name:po(n,e),fields:t.value.mapValue.fields}}function Z_(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:B()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,p){return d.useProto3Json?(J(p===void 0||typeof p=="string"),_e.fromBase64String(p||"")):(J(p===void 0||p instanceof Buffer||p instanceof Uint8Array),_e.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(d){const p=d.code===void 0?P.UNKNOWN:mh(d.code);return new N(p,d.message||"")}(a);t=new _h(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Hi(n,r.document.name),i=Je(r.document.updateTime),a=r.document.createTime?Je(r.document.createTime):$.min(),l=new Ne({mapValue:{fields:r.document.fields}}),u=Ae.newFoundDocument(s,i,a,l),d=r.targetIds||[],p=r.removedTargetIds||[];t=new Ts(d,p,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Hi(n,r.document),i=r.readTime?Je(r.readTime):$.min(),a=Ae.newNoDocument(s,i),l=r.removedTargetIds||[];t=new Ts([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Hi(n,r.document),i=r.removedTargetIds||[];t=new Ts([],i,s,null)}else{if(!("filter"in e))return B();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new q_(s,i),l=r.targetId;t=new gh(l,a)}}return t}function ey(n,e){let t;if(e instanceof Lr)t={update:Ic(n,e.key,e.value)};else if(e instanceof ti)t={delete:po(n,e.key)};else if(e instanceof Ut)t={update:Ic(n,e.key,e.data),updateMask:cy(e.fieldMask)};else{if(!(e instanceof F_))return B();t={verify:po(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const l=a.transform;if(l instanceof Us)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Dn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Vn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Fs)return{fieldPath:a.field.canonicalString(),increment:l.Pe};throw B()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:J_(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:B()}(n,e.precondition)),t}function ty(n,e){return n&&n.length>0?(J(e!==void 0),n.map(t=>function(s,i){let a=s.updateTime?Je(s.updateTime):Je(i);return a.isEqual($.min())&&(a=Je(i)),new O_(a,s.transformResults||[])}(t,e))):[]}function ny(n,e){return{documents:[wh(n,e.path)]}}function ry(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=wh(n,s);const i=function(d){if(d.length!==0)return Th(qe.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(p=>function(T){return{field:pn(T.field),direction:oy(T.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=ho(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{_t:t,parent:s}}function sy(n){let e=X_(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){J(r===1);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=function(g){const T=Ih(g);return T instanceof qe&&Ju(T)?T.getFilters():[T]}(t.where));let a=[];t.orderBy&&(a=function(g){return g.map(T=>function(S){return new Ar(mn(S.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(T))}(t.orderBy));let l=null;t.limit&&(l=function(g){let T;return T=typeof g=="object"?g.value:g,Ys(T)?null:T}(t.limit));let u=null;t.startAt&&(u=function(g){const T=!!g.before,w=g.values||[];return new Os(w,T)}(t.startAt));let d=null;return t.endAt&&(d=function(g){const T=!g.before,w=g.values||[];return new Os(w,T)}(t.endAt)),T_(e,s,a,i,l,"F",u,d)}function iy(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Ih(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=mn(t.unaryFilter.field);return ce.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=mn(t.unaryFilter.field);return ce.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=mn(t.unaryFilter.field);return ce.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=mn(t.unaryFilter.field);return ce.create(a,"!=",{nullValue:"NULL_VALUE"});default:return B()}}(n):n.fieldFilter!==void 0?function(t){return ce.create(mn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return B()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return qe.create(t.compositeFilter.filters.map(r=>Ih(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return B()}}(t.compositeFilter.op))}(n):B()}function oy(n){return K_[n]}function ay(n){return G_[n]}function ly(n){return Q_[n]}function pn(n){return{fieldPath:n.canonicalString()}}function mn(n){return pe.fromServerFormat(n.fieldPath)}function Th(n){return n instanceof ce?function(t){if(t.op==="=="){if(lc(t.value))return{unaryFilter:{field:pn(t.field),op:"IS_NAN"}};if(ac(t.value))return{unaryFilter:{field:pn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(lc(t.value))return{unaryFilter:{field:pn(t.field),op:"IS_NOT_NAN"}};if(ac(t.value))return{unaryFilter:{field:pn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:pn(t.field),op:ay(t.op),value:t.value}}}(n):n instanceof qe?function(t){const r=t.getFilters().map(s=>Th(s));return r.length===1?r[0]:{compositeFilter:{op:ly(t.op),filters:r}}}(n):B()}function cy(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function bh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class bt{constructor(e,t,r,s,i=$.min(),a=$.min(),l=_e.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new bt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new bt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new bt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new bt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class uy{constructor(e){this.ct=e}}function hy(n){const e=sy({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ms(e,e.limit,"L"):e}/**
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
 */class dy{constructor(){this.un=new fy}addToCollectionParentIndex(e,t){return this.un.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(Nt.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(Nt.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class fy{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ge(ee.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ge(ee.comparator)).toArray()}}/**
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
 */class py{constructor(){this.changes=new Bn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ae.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class my{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class gy{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&yr(r.mutation,s,Me.empty(),ae.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,W()).next(()=>r))}getLocalViewOfDocuments(e,t,r=W()){const s=Kt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=ur();return i.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Kt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,W()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let i=ht();const a=_r(),l=function(){return _r()}();return t.forEach((u,d)=>{const p=r.get(d.key);s.has(d.key)&&(p===void 0||p.mutation instanceof Ut)?i=i.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),yr(p.mutation,d,p.mutation.getFieldMask(),ae.now())):a.set(d.key,Me.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>{var g;return l.set(d,new my(p,(g=a.get(d))!==null&&g!==void 0?g:null))}),l))}recalculateAndSaveOverlays(e,t){const r=_r();let s=new re((a,l)=>a-l),i=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let p=r.get(u)||Me.empty();p=l.applyToLocalView(d,p),r.set(u,p);const g=(s.get(l.batchId)||W()).add(u);s=s.insert(l.batchId,g)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),d=u.key,p=u.value,g=oh();p.forEach(T=>{if(!i.has(T)){const w=fh(t.get(T),r.get(T));w!==null&&g.set(T,w),i=i.add(T)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,g))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return O.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):th(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):C.resolve(Kt());let l=-1,u=i;return a.next(d=>C.forEach(d,(p,g)=>(l<g.largestBatchId&&(l=g.largestBatchId),i.get(p)?C.resolve():this.remoteDocumentCache.getEntry(e,p).next(T=>{u=u.insert(p,T)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,W())).next(p=>({batchId:l,changes:ih(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next(r=>{let s=ur();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=ur();return this.indexManager.getCollectionParents(e,i).next(l=>C.forEach(l,u=>{const d=function(g,T){return new Fn(T,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(p=>{p.forEach((g,T)=>{a=a.insert(g,T)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,Ae.newInvalidDocument(p)))});let l=ur();return a.forEach((u,d)=>{const p=i.get(u);p!==void 0&&yr(p.mutation,d,Me.empty(),ae.now()),Xs(t,d)&&(l=l.insert(u,d))}),l})}}/**
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
 */class _y{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return C.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Je(s.createTime)}}(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:hy(s.bundledQuery),readTime:Je(s.readTime)}}(t)),C.resolve()}}/**
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
 */class yy{constructor(){this.overlays=new re(O.comparator),this.Ir=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Kt();return C.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.ht(e,t,i)}),C.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const s=Kt(),i=t.length+1,a=new O(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return C.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new re((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=i.get(d.largestBatchId);p===null&&(p=Kt(),i=i.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const l=Kt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,p)=>l.set(d,p)),!(l.size()>=s)););return C.resolve(l)}ht(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new $_(t,r));let i=this.Ir.get(t);i===void 0&&(i=W(),this.Ir.set(t,i)),this.Ir.set(t,i.add(r.key))}}/**
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
 */class vy{constructor(){this.sessionToken=_e.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
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
 */class Xo{constructor(){this.Tr=new ge(he.Er),this.dr=new ge(he.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new he(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new he(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new O(new ee([])),r=new he(t,e),s=new he(t,e+1),i=[];return this.dr.forEachInRange([r,s],a=>{this.Vr(a),i.push(a.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new O(new ee([])),r=new he(t,e),s=new he(t,e+1);let i=W();return this.dr.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new he(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class he{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return O.comparator(e.key,t.key)||Y(e.wr,t.wr)}static Ar(e,t){return Y(e.wr,t.wr)||O.comparator(e.key,t.key)}}/**
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
 */class wy{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ge(he.Er)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new B_(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.br=this.br.add(new he(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.vr(r),i=s<0?0:s;return C.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new he(t,0),s=new he(t,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],a=>{const l=this.Dr(a.wr);i.push(l)}),C.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ge(Y);return t.forEach(s=>{const i=new he(s,0),a=new he(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,a],l=>{r=r.add(l.wr)})}),C.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;O.isDocumentKey(i)||(i=i.child(""));const a=new he(new O(i),0);let l=new ge(Y);return this.br.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(u.wr)),!0)},a),C.resolve(this.Cr(l))}Cr(e){const t=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){J(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return C.forEach(t.mutations,s=>{const i=new he(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new he(t,0),s=this.br.firstAfterOrEqual(r);return C.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Ey{constructor(e){this.Mr=e,this.docs=function(){return new re(O.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():Ae.newInvalidDocument(t))}getEntries(e,t){let r=ht();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Ae.newInvalidDocument(s))}),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=ht();const a=t.path,l=new O(a.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:d,value:{document:p}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||s_(r_(p),r)<=0||(s.has(p.key)||Xs(t,p))&&(i=i.insert(p.key,p.mutableCopy()))}return C.resolve(i)}getAllFromCollectionGroup(e,t,r,s){B()}Or(e,t){return C.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Iy(this)}getSize(e){return C.resolve(this.size)}}class Iy extends py{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),C.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
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
 */class Ty{constructor(e){this.persistence=e,this.Nr=new Bn(t=>Ho(t),Wo),this.lastRemoteSnapshotVersion=$.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Xo,this.targetCount=0,this.kr=Nn.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,s)=>t(s)),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),C.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Nn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.Kn(t),C.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Nr.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.Nr.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),C.waitFor(i).next(()=>s)}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),C.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.Br.containsKey(t))}}/**
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
 */class by{constructor(e,t){this.qr={},this.overlays={},this.Qr=new $o(0),this.Kr=!1,this.Kr=!0,this.$r=new vy,this.referenceDelegate=e(this),this.Ur=new Ty(this),this.indexManager=new dy,this.remoteDocumentCache=function(s){return new Ey(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new uy(t),this.Gr=new _y(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new yy,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new wy(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){x("MemoryPersistence","Starting transaction:",e);const s=new Ay(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,t){return C.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class Ay extends o_{constructor(e){super(),this.currentSequenceNumber=e}}class Zo{constructor(e){this.persistence=e,this.Jr=new Xo,this.Yr=null}static Zr(e){return new Zo(e)}get Xr(){if(this.Yr)return this.Yr;throw B()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),C.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.Xr,r=>{const s=O.fromPath(r);return this.ei(e,s).next(i=>{i||t.removeEntry(s,$.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return C.or([()=>C.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
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
 */class ea{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=s}static Wi(e,t){let r=W(),s=W();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ea(e,t.fromCache,r,s)}}/**
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
 */class Ry{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Sy{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return df()?8:a_(Se())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.Yi(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.Zi(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Ry;return this.Xi(e,t,a).next(l=>{if(i.result=l,this.zi)return this.es(e,t,a,l.size)})}).next(()=>i.result)}es(e,t,r,s){return r.documentReadCount<this.ji?(or()<=K.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",fn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),C.resolve()):(or()<=K.DEBUG&&x("QueryEngine","Query:",fn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(or()<=K.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",fn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ye(t))):C.resolve())}Yi(e,t){if(dc(t))return C.resolve(null);let r=Ye(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Ms(t,null,"F"),r=Ye(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=W(...i);return this.Ji.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.ts(t,l);return this.ns(t,d,a,u.readTime)?this.Yi(e,Ms(t,null,"F")):this.rs(e,d,t,u)}))})))}Zi(e,t,r,s){return dc(t)||s.isEqual($.min())?C.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const a=this.ts(t,i);return this.ns(t,a,r,s)?C.resolve(null):(or()<=K.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),fn(t)),this.rs(e,a,t,n_(s,-1)).next(l=>l))})}ts(e,t){let r=new ge(rh(e));return t.forEach((s,i)=>{Xs(e,i)&&(r=r.add(i))}),r}ns(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,t,r){return or()<=K.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",fn(t)),this.Ji.getDocumentsMatchingQuery(e,t,Nt.min(),r)}rs(e,t,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */class Py{constructor(e,t,r,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new re(Y),this._s=new Bn(i=>Ho(i),Wo),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new gy(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function Cy(n,e,t,r){return new Py(n,e,t,r)}async function Ah(n,e){const t=j(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let u=W();for(const d of s){a.push(d.batchId);for(const p of d.mutations)u=u.add(p.key)}for(const d of i){l.push(d.batchId);for(const p of d.mutations)u=u.add(p.key)}return t.localDocuments.getDocuments(r,u).next(d=>({hs:d,removedBatchIds:a,addedBatchIds:l}))})})}function ky(n,e){const t=j(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,d,p){const g=d.batch,T=g.keys();let w=C.resolve();return T.forEach(S=>{w=w.next(()=>p.getEntry(u,S)).next(D=>{const k=d.docVersions.get(S);J(k!==null),D.version.compareTo(k)<0&&(g.applyToRemoteDocument(D,d),D.isValidDocument()&&(D.setReadTime(d.commitVersion),p.addEntry(D)))})}),w.next(()=>l.mutationQueue.removeMutationBatch(u,g))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=W();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(u=u.add(l.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Rh(n){const e=j(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Dy(n,e){const t=j(n),r=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const l=[];e.targetChanges.forEach((p,g)=>{const T=s.get(g);if(!T)return;l.push(t.Ur.removeMatchingKeys(i,p.removedDocuments,g).next(()=>t.Ur.addMatchingKeys(i,p.addedDocuments,g)));let w=T.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(g)!==null?w=w.withResumeToken(_e.EMPTY_BYTE_STRING,$.min()).withLastLimboFreeSnapshotVersion($.min()):p.resumeToken.approximateByteSize()>0&&(w=w.withResumeToken(p.resumeToken,r)),s=s.insert(g,w),function(D,k,L){return D.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=3e8?!0:L.addedDocuments.size+L.modifiedDocuments.size+L.removedDocuments.size>0}(T,w,p)&&l.push(t.Ur.updateTargetData(i,w))});let u=ht(),d=W();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))}),l.push(Vy(i,a,e.documentUpdates).next(p=>{u=p.Ps,d=p.Is})),!r.isEqual($.min())){const p=t.Ur.getLastRemoteSnapshotVersion(i).next(g=>t.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(p)}return C.waitFor(l).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.os=s,i))}function Vy(n,e,t){let r=W(),s=W();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=ht();return t.forEach((l,u)=>{const d=i.get(l);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual($.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):x("LocalStore","Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",u.version)}),{Ps:a,Is:s}})}function Ny(n,e){const t=j(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Ly(n,e){const t=j(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Ur.getTargetData(r,e).next(i=>i?(s=i,C.resolve(s)):t.Ur.allocateTargetId(r).next(a=>(s=new bt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r})}async function go(n,e,t){const r=j(n),s=r.os.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Nr(a))throw a;x("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function Tc(n,e,t){const r=j(n);let s=$.min(),i=W();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,p){const g=j(u),T=g._s.get(p);return T!==void 0?C.resolve(g.os.get(T)):g.Ur.getTargetData(d,p)}(r,a,Ye(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,l.targetId).next(u=>{i=u})}).next(()=>r.ss.getDocumentsMatchingQuery(a,e,t?s:$.min(),t?i:W())).next(l=>(xy(r,A_(e),l),{documents:l,Ts:i})))}function xy(n,e,t){let r=n.us.get(e)||$.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.us.set(e,r)}class bc{constructor(){this.activeTargetIds=D_()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Oy{constructor(){this.so=new bc,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new bc,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class My{_o(e){}shutdown(){}}/**
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
 */class Ac{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){x("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){x("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let ds=null;function Wi(){return ds===null?ds=function(){return 268435456+Math.round(2147483648*Math.random())}():ds++,"0x"+ds.toString(16)}/**
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
 */const Uy={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class Fy{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const Te="WebChannelConnection";class By extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(t,r,s,i,a){const l=Wi(),u=this.xo(t,r.toUriEncodedString());x("RestConnection",`Sending RPC '${t}' ${l}:`,u,s);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,i,a),this.No(t,u,d,s).then(p=>(x("RestConnection",`Received RPC '${t}' ${l}: `,p),p),p=>{throw Sn("RestConnection",`RPC '${t}' ${l} failed with error: `,p,"url: ",u,"request:",s),p})}Lo(t,r,s,i,a,l){return this.Mo(t,r,s,i,a)}Oo(t,r,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Un}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,a)=>t[a]=i),s&&s.headers.forEach((i,a)=>t[a]=i)}xo(t,r){const s=Uy[t];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,s){const i=Wi();return new Promise((a,l)=>{const u=new Fu;u.setWithCredentials(!0),u.listenOnce(Bu.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case ws.NO_ERROR:const p=u.getResponseJson();x(Te,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(p)),a(p);break;case ws.TIMEOUT:x(Te,`RPC '${e}' ${i} timed out`),l(new N(P.DEADLINE_EXCEEDED,"Request time out"));break;case ws.HTTP_ERROR:const g=u.getStatus();if(x(Te,`RPC '${e}' ${i} failed with status:`,g,"response text:",u.getResponseText()),g>0){let T=u.getResponseJson();Array.isArray(T)&&(T=T[0]);const w=T==null?void 0:T.error;if(w&&w.status&&w.message){const S=function(k){const L=k.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(L)>=0?L:P.UNKNOWN}(w.status);l(new N(S,w.message))}else l(new N(P.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new N(P.UNAVAILABLE,"Connection failed."));break;default:B()}}finally{x(Te,`RPC '${e}' ${i} completed.`)}});const d=JSON.stringify(s);x(Te,`RPC '${e}' ${i} sending request:`,s),u.send(t,"POST",d,r,15)})}Bo(e,t,r){const s=Wi(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=ju(),l=qu(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const p=i.join("");x(Te,`Creating RPC '${e}' stream ${s}: ${p}`,u);const g=a.createWebChannel(p,u);let T=!1,w=!1;const S=new Fy({Io:k=>{w?x(Te,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(T||(x(Te,`Opening RPC '${e}' stream ${s} transport.`),g.open(),T=!0),x(Te,`RPC '${e}' stream ${s} sending:`,k),g.send(k))},To:()=>g.close()}),D=(k,L,F)=>{k.listen(L,M=>{try{F(M)}catch(z){setTimeout(()=>{throw z},0)}})};return D(g,cr.EventType.OPEN,()=>{w||(x(Te,`RPC '${e}' stream ${s} transport opened.`),S.yo())}),D(g,cr.EventType.CLOSE,()=>{w||(w=!0,x(Te,`RPC '${e}' stream ${s} transport closed`),S.So())}),D(g,cr.EventType.ERROR,k=>{w||(w=!0,Sn(Te,`RPC '${e}' stream ${s} transport errored:`,k),S.So(new N(P.UNAVAILABLE,"The operation could not be completed")))}),D(g,cr.EventType.MESSAGE,k=>{var L;if(!w){const F=k.data[0];J(!!F);const M=F,z=M.error||((L=M[0])===null||L===void 0?void 0:L.error);if(z){x(Te,`RPC '${e}' stream ${s} received error:`,z);const ye=z.status;let te=function(_){const v=le[_];if(v!==void 0)return mh(v)}(ye),E=z.message;te===void 0&&(te=P.INTERNAL,E="Unknown error status: "+ye+" with message "+z.message),w=!0,S.So(new N(te,E)),g.close()}else x(Te,`RPC '${e}' stream ${s} received:`,F),S.bo(F)}}),D(l,$u.STAT_EVENT,k=>{k.stat===io.PROXY?x(Te,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===io.NOPROXY&&x(Te,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{S.wo()},0),S}}function Ki(){return typeof document<"u"?document:null}/**
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
 */function ri(n){return new Y_(n,!0)}/**
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
 */class Sh{constructor(e,t,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-r);s>0&&x("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Ph{constructor(e,t,r,s,i,a,l,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Sh(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(ut(t.toString()),ut("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===t&&this.P_(r,s)},r=>{e(()=>{const s=new N(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return x("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(x("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class $y extends Ph{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=Z_(this.serializer,e),r=function(i){if(!("targetChange"in i))return $.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?$.min():a.readTime?Je(a.readTime):$.min()}(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=mo(this.serializer),t.addTarget=function(i,a){let l;const u=a.target;if(l=co(u)?{documents:ny(i,u)}:{query:ry(i,u)._t},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=yh(i,a.resumeToken);const d=ho(i,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo($.min())>0){l.readTime=Bs(i,a.snapshotVersion.toTimestamp());const d=ho(i,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,e);const r=iy(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=mo(this.serializer),t.removeTarget=e,this.a_(t)}}class qy extends Ph{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return J(!!e.streamToken),this.lastStreamToken=e.streamToken,J(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){J(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=ty(e.writeResults,e.commitTime),r=Je(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=mo(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ey(this.serializer,r))};this.a_(t)}}/**
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
 */class jy extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Mo(e,fo(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new N(P.UNKNOWN,i.toString())})}Lo(e,t,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Lo(e,fo(t,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new N(P.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class zy{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(ut(t),this.D_=!1):x("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class Hy{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(a=>{r.enqueueAndForget(async()=>{an(this)&&(x("RemoteStore","Restarting streams for network reachability change."),await async function(u){const d=j(u);d.L_.add(4),await Or(d),d.q_.set("Unknown"),d.L_.delete(4),await si(d)}(this))})}),this.q_=new zy(r,s)}}async function si(n){if(an(n))for(const e of n.B_)await e(!0)}async function Or(n){for(const e of n.B_)await e(!1)}function Ch(n,e){const t=j(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),sa(t)?ra(t):$n(t).r_()&&na(t,e))}function ta(n,e){const t=j(n),r=$n(t);t.N_.delete(e),r.r_()&&kh(t,e),t.N_.size===0&&(r.r_()?r.o_():an(t)&&t.q_.set("Unknown"))}function na(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo($.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}$n(n).A_(e)}function kh(n,e){n.Q_.xe(e),$n(n).R_(e)}function ra(n){n.Q_=new W_({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),$n(n).start(),n.q_.v_()}function sa(n){return an(n)&&!$n(n).n_()&&n.N_.size>0}function an(n){return j(n).L_.size===0}function Dh(n){n.Q_=void 0}async function Wy(n){n.q_.set("Online")}async function Ky(n){n.N_.forEach((e,t)=>{na(n,e)})}async function Gy(n,e){Dh(n),sa(n)?(n.q_.M_(e),ra(n)):n.q_.set("Unknown")}async function Qy(n,e,t){if(n.q_.set("Online"),e instanceof _h&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.N_.delete(l),s.Q_.removeTarget(l))}(n,e)}catch(r){x("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await $s(n,r)}else if(e instanceof Ts?n.Q_.Ke(e):e instanceof gh?n.Q_.He(e):n.Q_.We(e),!t.isEqual($.min()))try{const r=await Rh(n.localStore);t.compareTo(r)>=0&&await function(i,a){const l=i.Q_.rt(a);return l.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const p=i.N_.get(d);p&&i.N_.set(d,p.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,d)=>{const p=i.N_.get(u);if(!p)return;i.N_.set(u,p.withResumeToken(_e.EMPTY_BYTE_STRING,p.snapshotVersion)),kh(i,u);const g=new bt(p.target,u,d,p.sequenceNumber);na(i,g)}),i.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){x("RemoteStore","Failed to raise snapshot:",r),await $s(n,r)}}async function $s(n,e,t){if(!Nr(e))throw e;n.L_.add(1),await Or(n),n.q_.set("Offline"),t||(t=()=>Rh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{x("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await si(n)})}function Vh(n,e){return e().catch(t=>$s(n,t,e))}async function ii(n){const e=j(n),t=xt(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;Yy(e);)try{const s=await Ny(e.localStore,r);if(s===null){e.O_.length===0&&t.o_();break}r=s.batchId,Jy(e,s)}catch(s){await $s(e,s)}Nh(e)&&Lh(e)}function Yy(n){return an(n)&&n.O_.length<10}function Jy(n,e){n.O_.push(e);const t=xt(n);t.r_()&&t.V_&&t.m_(e.mutations)}function Nh(n){return an(n)&&!xt(n).n_()&&n.O_.length>0}function Lh(n){xt(n).start()}async function Xy(n){xt(n).p_()}async function Zy(n){const e=xt(n);for(const t of n.O_)e.m_(t.mutations)}async function ev(n,e,t){const r=n.O_.shift(),s=Qo.from(r,e,t);await Vh(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await ii(n)}async function tv(n,e){e&&xt(n).V_&&await async function(r,s){if(function(a){return j_(a)&&a!==P.ABORTED}(s.code)){const i=r.O_.shift();xt(r).s_(),await Vh(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await ii(r)}}(n,e),Nh(n)&&Lh(n)}async function Rc(n,e){const t=j(n);t.asyncQueue.verifyOperationInProgress(),x("RemoteStore","RemoteStore received new credentials");const r=an(t);t.L_.add(3),await Or(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await si(t)}async function nv(n,e){const t=j(n);e?(t.L_.delete(2),await si(t)):e||(t.L_.add(2),await Or(t),t.q_.set("Unknown"))}function $n(n){return n.K_||(n.K_=function(t,r,s){const i=j(t);return i.w_(),new $y(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Eo:Wy.bind(null,n),Ro:Ky.bind(null,n),mo:Gy.bind(null,n),d_:Qy.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),sa(n)?ra(n):n.q_.set("Unknown")):(await n.K_.stop(),Dh(n))})),n.K_}function xt(n){return n.U_||(n.U_=function(t,r,s){const i=j(t);return i.w_(),new qy(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Xy.bind(null,n),mo:tv.bind(null,n),f_:Zy.bind(null,n),g_:ev.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await ii(n)):(await n.U_.stop(),n.O_.length>0&&(x("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
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
 */class ia{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new at,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new ia(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function oa(n,e){if(ut("AsyncQueue",`${e}: ${n}`),Nr(n))return new N(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Tn{constructor(e){this.comparator=e?(t,r)=>e(t,r)||O.comparator(t.key,r.key):(t,r)=>O.comparator(t.key,r.key),this.keyedMap=ur(),this.sortedSet=new re(this.comparator)}static emptySet(e){return new Tn(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Tn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Tn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Sc{constructor(){this.W_=new re(O.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):B():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Ln{constructor(e,t,r,s,i,a,l,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new Ln(e,t,Tn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Js(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class rv{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class sv{constructor(){this.queries=Pc(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const s=j(t),i=s.queries;s.queries=Pc(),i.forEach((a,l)=>{for(const u of l.j_)u.onError(r)})})(this,new N(P.ABORTED,"Firestore shutting down"))}}function Pc(){return new Bn(n=>nh(n),Js)}async function xh(n,e){const t=j(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new rv,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await t.onListen(s,!0);break;case 1:i.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=oa(a,`Initialization of query '${fn(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.j_.push(e),e.Z_(t.onlineState),i.z_&&e.X_(i.z_)&&aa(t)}async function Oh(n,e){const t=j(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.j_.indexOf(e);a>=0&&(i.j_.splice(a,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function iv(n,e){const t=j(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.j_)l.X_(s)&&(r=!0);a.z_=s}}r&&aa(t)}function ov(n,e,t){const r=j(n),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(t);r.queries.delete(e)}function aa(n){n.Y_.forEach(e=>{e.next()})}var _o,Cc;(Cc=_o||(_o={})).ea="default",Cc.Cache="cache";class Mh{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Ln(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Ln.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==_o.Cache}}/**
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
 */class Uh{constructor(e){this.key=e}}class Fh{constructor(e){this.key=e}}class av{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=W(),this.mutatedKeys=W(),this.Aa=rh(e),this.Ra=new Tn(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new Sc,s=t?t.Ra:this.Ra;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,g)=>{const T=s.get(p),w=Xs(this.query,g)?g:null,S=!!T&&this.mutatedKeys.has(T.key),D=!!w&&(w.hasLocalMutations||this.mutatedKeys.has(w.key)&&w.hasCommittedMutations);let k=!1;T&&w?T.data.isEqual(w.data)?S!==D&&(r.track({type:3,doc:w}),k=!0):this.ga(T,w)||(r.track({type:2,doc:w}),k=!0,(u&&this.Aa(w,u)>0||d&&this.Aa(w,d)<0)&&(l=!0)):!T&&w?(r.track({type:0,doc:w}),k=!0):T&&!w&&(r.track({type:1,doc:T}),k=!0,(u||d)&&(l=!0)),k&&(w?(a=a.add(w),i=D?i.add(p):i.delete(p)):(a=a.delete(p),i=i.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{Ra:a,fa:r,ns:l,mutatedKeys:i}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((p,g)=>function(w,S){const D=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B()}};return D(w)-D(S)}(p.type,g.type)||this.Aa(p.doc,g.doc)),this.pa(r),s=s!=null&&s;const l=t&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,d=u!==this.Ea;return this.Ea=u,a.length!==0||d?{snapshot:new Ln(this.query,e.Ra,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Sc,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=W(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const t=[];return e.forEach(r=>{this.da.has(r)||t.push(new Fh(r))}),this.da.forEach(r=>{e.has(r)||t.push(new Uh(r))}),t}ba(e){this.Ta=e.Ts,this.da=W();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Ln.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class lv{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class cv{constructor(e){this.key=e,this.va=!1}}class uv{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new Bn(l=>nh(l),Js),this.Ma=new Map,this.xa=new Set,this.Oa=new re(O.comparator),this.Na=new Map,this.La=new Xo,this.Ba={},this.ka=new Map,this.qa=Nn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function hv(n,e,t=!0){const r=Hh(n);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await Bh(r,e,t,!0),s}async function dv(n,e){const t=Hh(n);await Bh(t,e,!0,!1)}async function Bh(n,e,t,r){const s=await Ly(n.localStore,Ye(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await fv(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Ch(n.remoteStore,s),l}async function fv(n,e,t,r,s){n.Ka=(g,T,w)=>async function(D,k,L,F){let M=k.view.ma(L);M.ns&&(M=await Tc(D.localStore,k.query,!1).then(({documents:E})=>k.view.ma(E,M)));const z=F&&F.targetChanges.get(k.targetId),ye=F&&F.targetMismatches.get(k.targetId)!=null,te=k.view.applyChanges(M,D.isPrimaryClient,z,ye);return Dc(D,k.targetId,te.wa),te.snapshot}(n,g,T,w);const i=await Tc(n.localStore,e,!0),a=new av(e,i.Ts),l=a.ma(i.documents),u=xr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,u);Dc(n,t,d.wa);const p=new lv(e,t,a);return n.Fa.set(e,p),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),d.snapshot}async function pv(n,e,t){const r=j(n),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(a=>!Js(a,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await go(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ta(r.remoteStore,s.targetId),yo(r,s.targetId)}).catch(Vr)):(yo(r,s.targetId),await go(r.localStore,s.targetId,!0))}async function mv(n,e){const t=j(n),r=t.Fa.get(e),s=t.Ma.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ta(t.remoteStore,r.targetId))}async function gv(n,e,t){const r=Tv(n);try{const s=await function(a,l){const u=j(a),d=ae.now(),p=l.reduce((w,S)=>w.add(S.key),W());let g,T;return u.persistence.runTransaction("Locally write mutations","readwrite",w=>{let S=ht(),D=W();return u.cs.getEntries(w,p).next(k=>{S=k,S.forEach((L,F)=>{F.isValidDocument()||(D=D.add(L))})}).next(()=>u.localDocuments.getOverlayedDocuments(w,S)).next(k=>{g=k;const L=[];for(const F of l){const M=U_(F,g.get(F.key).overlayedDocument);M!=null&&L.push(new Ut(F.key,M,Gu(M.value.mapValue),ke.exists(!0)))}return u.mutationQueue.addMutationBatch(w,d,L,l)}).next(k=>{T=k;const L=k.applyToLocalDocumentSet(g,D);return u.documentOverlayCache.saveOverlays(w,k.batchId,L)})}).then(()=>({batchId:T.batchId,changes:ih(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,u){let d=a.Ba[a.currentUser.toKey()];d||(d=new re(Y)),d=d.insert(l,u),a.Ba[a.currentUser.toKey()]=d}(r,s.batchId,t),await Mr(r,s.changes),await ii(r.remoteStore)}catch(s){const i=oa(s,"Failed to persist write");t.reject(i)}}async function $h(n,e){const t=j(n);try{const r=await Dy(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Na.get(i);a&&(J(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?J(a.va):s.removedDocuments.size>0&&(J(a.va),a.va=!1))}),await Mr(t,r,e)}catch(r){await Vr(r)}}function kc(n,e,t){const r=j(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Fa.forEach((i,a)=>{const l=a.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const u=j(a);u.onlineState=l;let d=!1;u.queries.forEach((p,g)=>{for(const T of g.j_)T.Z_(l)&&(d=!0)}),d&&aa(u)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function _v(n,e,t){const r=j(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Na.get(e),i=s&&s.key;if(i){let a=new re(O.comparator);a=a.insert(i,Ae.newNoDocument(i,$.min()));const l=W().add(i),u=new ni($.min(),new Map,new re(Y),a,l);await $h(r,u),r.Oa=r.Oa.remove(i),r.Na.delete(e),la(r)}else await go(r.localStore,e,!1).then(()=>yo(r,e,t)).catch(Vr)}async function yv(n,e){const t=j(n),r=e.batch.batchId;try{const s=await ky(t.localStore,e);jh(t,r,null),qh(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Mr(t,s)}catch(s){await Vr(s)}}async function vv(n,e,t){const r=j(n);try{const s=await function(a,l){const u=j(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return u.mutationQueue.lookupMutationBatch(d,l).next(g=>(J(g!==null),p=g.keys(),u.mutationQueue.removeMutationBatch(d,g))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,p,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>u.localDocuments.getDocuments(d,p))})}(r.localStore,e);jh(r,e,t),qh(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Mr(r,s)}catch(s){await Vr(s)}}function qh(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function jh(n,e,t){const r=j(n);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function yo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(r=>{n.La.containsKey(r)||zh(n,r)})}function zh(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(ta(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),la(n))}function Dc(n,e,t){for(const r of t)r instanceof Uh?(n.La.addReference(r.key,e),wv(n,r)):r instanceof Fh?(x("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||zh(n,r.key)):B()}function wv(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(x("SyncEngine","New document in limbo: "+t),n.xa.add(r),la(n))}function la(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new O(ee.fromString(e)),r=n.qa.next();n.Na.set(r,new cv(t)),n.Oa=n.Oa.insert(t,r),Ch(n.remoteStore,new bt(Ye(Ko(t.path)),r,"TargetPurposeLimboResolution",$o.oe))}}async function Mr(n,e,t){const r=j(n),s=[],i=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{a.push(r.Ka(u,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){const g=d?!d.fromCache:(p=t==null?void 0:t.targetChanges.get(u.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(u.targetId,g?"current":"not-current")}if(d){s.push(d);const g=ea.Wi(u.targetId,d);i.push(g)}}))}),await Promise.all(a),r.Ca.d_(s),await async function(u,d){const p=j(u);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>C.forEach(d,T=>C.forEach(T.$i,w=>p.persistence.referenceDelegate.addReference(g,T.targetId,w)).next(()=>C.forEach(T.Ui,w=>p.persistence.referenceDelegate.removeReference(g,T.targetId,w)))))}catch(g){if(!Nr(g))throw g;x("LocalStore","Failed to update sequence numbers: "+g)}for(const g of d){const T=g.targetId;if(!g.fromCache){const w=p.os.get(T),S=w.snapshotVersion,D=w.withLastLimboFreeSnapshotVersion(S);p.os=p.os.insert(T,D)}}}(r.localStore,i))}async function Ev(n,e){const t=j(n);if(!t.currentUser.isEqual(e)){x("SyncEngine","User change. New user:",e.toKey());const r=await Ah(t.localStore,e);t.currentUser=e,function(i,a){i.ka.forEach(l=>{l.forEach(u=>{u.reject(new N(P.CANCELLED,a))})}),i.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Mr(t,r.hs)}}function Iv(n,e){const t=j(n),r=t.Na.get(e);if(r&&r.va)return W().add(r.key);{let s=W();const i=t.Ma.get(e);if(!i)return s;for(const a of i){const l=t.Fa.get(a);s=s.unionWith(l.view.Va)}return s}}function Hh(n){const e=j(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=$h.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Iv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=_v.bind(null,e),e.Ca.d_=iv.bind(null,e.eventManager),e.Ca.$a=ov.bind(null,e.eventManager),e}function Tv(n){const e=j(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=yv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=vv.bind(null,e),e}class qs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ri(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Cy(this.persistence,new Sy,e.initialUser,this.serializer)}Ga(e){return new by(Zo.Zr,this.serializer)}Wa(e){return new Oy}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}qs.provider={build:()=>new qs};class vo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>kc(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Ev.bind(null,this.syncEngine),await nv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new sv}()}createDatastore(e){const t=ri(e.databaseInfo.databaseId),r=function(i){return new By(i)}(e.databaseInfo);return function(i,a,l,u){return new jy(i,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,l){return new Hy(r,s,i,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>kc(this.syncEngine,t,0),function(){return Ac.D()?new Ac:new My}())}createSyncEngine(e,t){return function(s,i,a,l,u,d,p){const g=new uv(s,i,a,l,u,d);return p&&(g.Qa=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=j(s);x("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Or(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}vo.provider={build:()=>new vo};/**
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
 */class Wh{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):ut("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class bv{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=be.UNAUTHENTICATED,this.clientId=Hu.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{x("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(x("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new at;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=oa(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Gi(n,e){n.asyncQueue.verifyOperationInProgress(),x("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Ah(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Vc(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Av(n);x("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Rc(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Rc(e.remoteStore,s)),n._onlineComponents=e}async function Av(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){x("FirestoreClient","Using user provided OfflineComponentProvider");try{await Gi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Sn("Error using user provided cache. Falling back to memory cache: "+t),await Gi(n,new qs)}}else x("FirestoreClient","Using default OfflineComponentProvider"),await Gi(n,new qs);return n._offlineComponents}async function Kh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(x("FirestoreClient","Using user provided OnlineComponentProvider"),await Vc(n,n._uninitializedComponentsProvider._online)):(x("FirestoreClient","Using default OnlineComponentProvider"),await Vc(n,new vo))),n._onlineComponents}function Rv(n){return Kh(n).then(e=>e.syncEngine)}async function Gh(n){const e=await Kh(n),t=e.eventManager;return t.onListen=hv.bind(null,e.syncEngine),t.onUnlisten=pv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=dv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=mv.bind(null,e.syncEngine),t}function Sv(n,e,t={}){const r=new at;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,d){const p=new Wh({next:T=>{p.Za(),a.enqueueAndForget(()=>Oh(i,g));const w=T.docs.has(l);!w&&T.fromCache?d.reject(new N(P.UNAVAILABLE,"Failed to get document because the client is offline.")):w&&T.fromCache&&u&&u.source==="server"?d.reject(new N(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(T)},error:T=>d.reject(T)}),g=new Mh(Ko(l.path),p,{includeMetadataChanges:!0,_a:!0});return xh(i,g)}(await Gh(n),n.asyncQueue,e,t,r)),r.promise}function Pv(n,e,t={}){const r=new at;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,d){const p=new Wh({next:T=>{p.Za(),a.enqueueAndForget(()=>Oh(i,g)),T.fromCache&&u.source==="server"?d.reject(new N(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(T)},error:T=>d.reject(T)}),g=new Mh(l,p,{includeMetadataChanges:!0,_a:!0});return xh(i,g)}(await Gh(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function Qh(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */function Yh(n,e,t){if(!t)throw new N(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Cv(n,e,t,r){if(e===!0&&r===!0)throw new N(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Lc(n){if(!O.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function xc(n){if(O.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function oi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":B()}function Fe(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new N(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=oi(n);throw new N(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */class Oc{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new N(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Cv("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Qh((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ai{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Oc({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Oc(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Kg;switch(r.type){case"firstParty":return new Jg(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Nc.get(t);r&&(x("ComponentProvider","Removing Datastore"),Nc.delete(t),r.terminate())}(this),Promise.resolve()}}function kv(n,e,t,r={}){var s;const i=(n=Fe(n,ai))._getSettings(),a=`${e}:${t}`;if(i.host!=="firestore.googleapis.com"&&i.host!==a&&Sn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},i),{host:a,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=be.MOCK_USER;else{l=sf(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new N(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new be(d)}n._authCredentials=new Gg(new zu(l,u))}}/**
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
 */class Ft{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ft(this.firestore,e,this._query)}}class De{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ct(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new De(this.firestore,e,this._key)}}class Ct extends Ft{constructor(e,t,r){super(e,t,Ko(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new De(this.firestore,null,new O(e))}withConverter(e){return new Ct(this.firestore,e,this._path)}}function Oe(n,e,...t){if(n=ne(n),Yh("collection","path",e),n instanceof ai){const r=ee.fromString(e,...t);return xc(r),new Ct(n,null,r)}{if(!(n instanceof De||n instanceof Ct))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ee.fromString(e,...t));return xc(r),new Ct(n.firestore,null,r)}}function ie(n,e,...t){if(n=ne(n),arguments.length===1&&(e=Hu.newId()),Yh("doc","path",e),n instanceof ai){const r=ee.fromString(e,...t);return Lc(r),new De(n,null,new O(r))}{if(!(n instanceof De||n instanceof Ct))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ee.fromString(e,...t));return Lc(r),new De(n.firestore,n instanceof Ct?n.converter:null,new O(r))}}/**
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
 */class Mc{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Sh(this,"async_queue_retry"),this.Vu=()=>{const r=Ki();r&&x("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=Ki();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Ki();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new at;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Nr(e))throw e;x("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l}(r);throw ut("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=ia.createAndSchedule(this,e,t,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&B()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class Bt extends ai{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Mc,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Mc(e),this._firestoreClient=void 0,await e}}}function Dv(n,e){const t=typeof n=="object"?n:Zc(),r=typeof n=="string"?n:"(default)",s=ko(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=nf("firestore");i&&kv(s,...i)}return s}function li(n){if(n._terminated)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Vv(n),n._firestoreClient}function Vv(n){var e,t,r;const s=n._freezeSettings(),i=function(l,u,d,p){return new u_(l,u,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Qh(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new bv(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(n._componentsProvider))}/**
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
 */class xn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new xn(_e.fromBase64String(e))}catch(t){throw new N(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new xn(_e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Ur{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Fr{constructor(e){this._methodName=e}}/**
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
 */class ca{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Y(this._lat,e._lat)||Y(this._long,e._long)}}/**
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
 */class ua{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
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
 */const Nv=/^__.*__$/;class Lv{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ut(e,this.data,this.fieldMask,t,this.fieldTransforms):new Lr(e,this.data,t,this.fieldTransforms)}}class Jh{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Ut(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Xh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B()}}class ci{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new ci(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return js(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Xh(this.Cu)&&Nv.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class xv{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ri(e)}Qu(e,t,r,s=!1){return new ci({Cu:e,methodName:t,qu:r,path:pe.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Br(n){const e=n._freezeSettings(),t=ri(n._databaseId);return new xv(n._databaseId,!!e.ignoreUndefinedProperties,t)}function ha(n,e,t,r,s,i={}){const a=n.Qu(i.merge||i.mergeFields?2:0,e,t,s);pa("Data must be an object, but it was:",a,r);const l=nd(r,a);let u,d;if(i.merge)u=new Me(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const p=[];for(const g of i.mergeFields){const T=wo(e,g,t);if(!a.contains(T))throw new N(P.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);sd(p,T)||p.push(T)}u=new Me(p),d=a.fieldTransforms.filter(g=>u.covers(g.field))}else u=null,d=a.fieldTransforms;return new Lv(new Ne(l),u,d)}class ui extends Fr{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ui}}function Zh(n,e,t){return new ci({Cu:3,qu:e.settings.qu,methodName:n._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class da extends Fr{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Zh(this,e,!0),r=this.Ku.map(i=>ln(i,t)),s=new Dn(r);return new dh(e.path,s)}isEqual(e){return e instanceof da&&bn(this.Ku,e.Ku)}}class fa extends Fr{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Zh(this,e,!0),r=this.Ku.map(i=>ln(i,t)),s=new Vn(r);return new dh(e.path,s)}isEqual(e){return e instanceof fa&&bn(this.Ku,e.Ku)}}function ed(n,e,t,r){const s=n.Qu(1,e,t);pa("Data must be an object, but it was:",s,r);const i=[],a=Ne.empty();on(r,(u,d)=>{const p=ma(e,u,t);d=ne(d);const g=s.Nu(p);if(d instanceof ui)i.push(p);else{const T=ln(d,g);T!=null&&(i.push(p),a.set(p,T))}});const l=new Me(i);return new Jh(a,l,s.fieldTransforms)}function td(n,e,t,r,s,i){const a=n.Qu(1,e,t),l=[wo(e,r,t)],u=[s];if(i.length%2!=0)throw new N(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<i.length;T+=2)l.push(wo(e,i[T])),u.push(i[T+1]);const d=[],p=Ne.empty();for(let T=l.length-1;T>=0;--T)if(!sd(d,l[T])){const w=l[T];let S=u[T];S=ne(S);const D=a.Nu(w);if(S instanceof ui)d.push(w);else{const k=ln(S,D);k!=null&&(d.push(w),p.set(w,k))}}const g=new Me(d);return new Jh(p,g,a.fieldTransforms)}function Ov(n,e,t,r=!1){return ln(t,n.Qu(r?4:3,e))}function ln(n,e){if(rd(n=ne(n)))return pa("Unsupported field value:",e,n),nd(n,e);if(n instanceof Fr)return function(r,s){if(!Xh(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const l of r){let u=ln(l,s.Lu(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=ne(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return V_(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ae.fromDate(r);return{timestampValue:Bs(s.serializer,i)}}if(r instanceof ae){const i=new ae(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Bs(s.serializer,i)}}if(r instanceof ca)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof xn)return{bytesValue:yh(s.serializer,r._byteString)};if(r instanceof De){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Jo(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ua)return function(a,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return Go(l.serializer,u)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${oi(r)}`)}(n,e)}function nd(n,e){const t={};return Wu(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):on(n,(r,s)=>{const i=ln(s,e.Mu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function rd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ae||n instanceof ca||n instanceof xn||n instanceof De||n instanceof Fr||n instanceof ua)}function pa(n,e,t){if(!rd(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=oi(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function wo(n,e,t){if((e=ne(e))instanceof Ur)return e._internalPath;if(typeof e=="string")return ma(n,e);throw js("Field path arguments must be of type string or ",n,!1,void 0,t)}const Mv=new RegExp("[~\\*/\\[\\]]");function ma(n,e,t){if(e.search(Mv)>=0)throw js(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ur(...e.split("."))._internalPath}catch{throw js(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function js(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new N(P.INVALID_ARGUMENT,l+n+u)}function sd(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class id{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new De(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Uv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(hi("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Uv extends id{data(){return super.data()}}function hi(n,e){return typeof e=="string"?ma(n,e):e instanceof Ur?e._internalPath:e._delegate._internalPath}/**
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
 */function Fv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ga{}class _a extends ga{}function kt(n,e,...t){let r=[];e instanceof ga&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof ya).length,l=i.filter(u=>u instanceof di).length;if(a>1||a>0&&l>0)throw new N(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class di extends _a{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new di(e,t,r)}_apply(e){const t=this._parse(e);return od(e._query,t),new Ft(e.firestore,e.converter,uo(e._query,t))}_parse(e){const t=Br(e.firestore);return function(i,a,l,u,d,p,g){let T;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new N(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Fc(g,p);const w=[];for(const S of g)w.push(Uc(u,i,S));T={arrayValue:{values:w}}}else T=Uc(u,i,g)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Fc(g,p),T=Ov(l,a,g,p==="in"||p==="not-in");return ce.create(d,p,T)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function je(n,e,t){const r=e,s=hi("where",n);return di._create(s,r,t)}class ya extends ga{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ya(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:qe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const l=i.getFlattenedFilters();for(const u of l)od(a,u),a=uo(a,u)}(e._query,t),new Ft(e.firestore,e.converter,uo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class va extends _a{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new va(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new N(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new N(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ar(i,a)}(e._query,this._field,this._direction);return new Ft(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new Fn(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function Bv(n,e="asc"){const t=e,r=hi("orderBy",n);return va._create(r,t)}class wa extends _a{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new wa(e,t,r)}_apply(e){return new Ft(e.firestore,e.converter,Ms(e._query,this._limit,this._limitType))}}function $v(n){return wa._create("limit",n,"F")}function Uc(n,e,t){if(typeof(t=ne(t))=="string"){if(t==="")throw new N(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!th(e)&&t.indexOf("/")!==-1)throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ee.fromString(t));if(!O.isDocumentKey(r))throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return oc(n,new O(r))}if(t instanceof De)return oc(n,t._key);throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${oi(t)}.`)}function Fc(n,e){if(!Array.isArray(n)||n.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function od(n,e){const t=function(s,i){for(const a of s)for(const l of a.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class qv{convertValue(e,t="none"){switch(tn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(en(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return on(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>oe(a.doubleValue));return new ua(i)}convertGeoPoint(e){return new ca(oe(e.latitude),oe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=jo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Ir(e));default:return null}}convertTimestamp(e){const t=Lt(e);return new ae(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ee.fromString(e);J(bh(r));const s=new Tr(r.get(1),r.get(3)),i=new O(r.popFirst(5));return s.isEqual(t)||ut(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function Ea(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
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
 */class dr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ad extends id{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new bs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(hi("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class bs extends ad{data(e={}){return super.data(e)}}class jv{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new dr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new bs(this._firestore,this._userDataWriter,r.key,r,new dr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const u=new bs(s._firestore,s._userDataWriter,l.doc.key,l.doc,new dr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new bs(s._firestore,s._userDataWriter,l.doc.key,l.doc,new dr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,p=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),p=a.indexOf(l.doc.key)),{type:zv(l.type),doc:u,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function zv(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B()}}/**
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
 */function Xe(n){n=Fe(n,De);const e=Fe(n.firestore,Bt);return Sv(li(e),n._key).then(t=>Hv(e,n,t))}class ld extends qv{constructor(e){super(),this.firestore=e}convertBytes(e){return new xn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new De(this.firestore,null,t)}}function We(n){n=Fe(n,Ft);const e=Fe(n.firestore,Bt),t=li(e),r=new ld(e);return Fv(n._query),Pv(t,n._query).then(s=>new jv(e,r,n,s))}function zs(n,e,t){n=Fe(n,De);const r=Fe(n.firestore,Bt),s=Ea(n.converter,e,t);return qr(r,[ha(Br(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,ke.none())])}function ze(n,e,t,...r){n=Fe(n,De);const s=Fe(n.firestore,Bt),i=Br(s);let a;return a=typeof(e=ne(e))=="string"||e instanceof Ur?td(i,"updateDoc",n._key,e,t,r):ed(i,"updateDoc",n._key,e),qr(s,[a.toMutation(n._key,ke.exists(!0))])}function $r(n){return qr(Fe(n.firestore,Bt),[new ti(n._key,ke.none())])}function Ia(n,e){const t=Fe(n.firestore,Bt),r=ie(n),s=Ea(n.converter,e);return qr(t,[ha(Br(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,ke.exists(!1))]).then(()=>r)}function qr(n,e){return function(r,s){const i=new at;return r.asyncQueue.enqueueAndForget(async()=>gv(await Rv(r),s,i)),i.promise}(li(n),e)}function Hv(n,e,t){const r=t.docs.get(e._key),s=new ld(n);return new ad(n,s,e._key,r,new dr(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */class Wv{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Br(e)}set(e,t,r){this._verifyNotCommitted();const s=Qi(e,this._firestore),i=Ea(s.converter,t,r),a=ha(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(a.toMutation(s._key,ke.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=Qi(e,this._firestore);let a;return a=typeof(t=ne(t))=="string"||t instanceof Ur?td(this._dataReader,"WriteBatch.update",i._key,t,r,s):ed(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(a.toMutation(i._key,ke.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Qi(e,this._firestore);return this._mutations=this._mutations.concat(new ti(t._key,ke.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new N(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Qi(n,e){if((n=ne(n)).firestore!==e)throw new N(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function Hs(...n){return new da("arrayUnion",n)}function At(...n){return new fa("arrayRemove",n)}/**
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
 */function cd(n){return li(n=Fe(n,Bt)),new Wv(n,e=>qr(n,e))}(function(e,t=!0){(function(s){Un=s})(Mn),An(new Yt("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new Bt(new Qg(r.getProvider("auth-internal")),new Zg(r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new N(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Tr(d.options.projectId,p)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),Pt(tc,"4.7.3",e),Pt(tc,"4.7.3","esm2017")})();const Kv={apiKey:"AIzaSyCSdbVzlGYazn9zJH8ee55jJwNAioZg7m8",authDomain:"manhwadb-9319f.firebaseapp.com",projectId:"manhwadb-9319f",storageBucket:"manhwadb-9319f.firebasestorage.app",messagingSenderId:"647854568421",appId:"1:647854568421:web:802c4cf20e69264e9b350c"},ud=Xc(Kv),$t=jg(ud),H=Dv(ud);function Gv(n){return n?n instanceof ae?n.toDate().toISOString():n!=null&&n.seconds?new Date(n.seconds*1e3).toISOString():n:null}function fi(n){if(!n.exists())return null;const e=n.data();return Object.keys(e).forEach(t=>{var r;(e[t]instanceof ae||(r=e[t])!=null&&r.seconds)&&(e[t]=Gv(e[t]))}),{id:n.id,...e}}function Dt(n){return n.docs.map(e=>fi(e))}let As=null;const Re={get:()=>{var n;return((n=$t.currentUser)==null?void 0:n.uid)||null},currentUser:()=>As,setProfile:n=>{As=n},clear:()=>{As=null}},ue={byId:async n=>{if(!n)return null;const e=await Xe(ie(H,"users",n));return fi(e)},byUsername:async n=>{const e=await Xe(ie(H,"usernames",n.toLowerCase()));if(!e.exists())return null;const{uid:t}=e.data();return ue.byId(t)},save:async n=>{var r;const{id:e,...t}=n;await zs(ie(H,"users",e),t,{merge:!0}),((r=$t.currentUser)==null?void 0:r.uid)===e&&Re.setProfile({...As||{},...t,id:e})},delete:async n=>{await $r(ie(H,"users",n))}},Ue={all:async()=>{const n=await We(Oe(H,"reviews"));return Dt(n).sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt))},byId:async n=>{const e=await Xe(ie(H,"reviews",n));return fi(e)},byUser:async n=>{const e=kt(Oe(H,"reviews"),je("userId","==",n)),t=await We(e);return Dt(t).sort((r,s)=>new Date(s.createdAt)-new Date(r.createdAt))},topRated:async(n=10)=>{const e=await We(kt(Oe(H,"reviews"),Bv("createdAt","desc"),$v(200)));return Dt(e).sort((t,r)=>r.rating-t.rating).slice(0,n)},create:async(n,e)=>{const t=Re.currentUser();return{id:(await Ia(Oe(H,"reviews"),{userId:n,username:(t==null?void 0:t.username)||"Unknown",title:e.title||"",coverBase64:e.coverBase64||"",text:e.text||"",rating:e.rating??0,status:e.status||"done",tags:e.tags||[],date:e.date||"",likes:[],dislikes:[],createdAt:new Date().toISOString(),updatedAt:null})).id,userId:n,...e}},update:async(n,e)=>(await ze(ie(H,"reviews",n),{...e,updatedAt:new Date().toISOString()}),{id:n,...e}),delete:async n=>{await $r(ie(H,"reviews",n));const e=await We(kt(Oe(H,"comments"),je("reviewId","==",n))),t=cd(H);e.docs.forEach(r=>t.delete(r.ref)),await t.commit()},toggleLike:async(n,e)=>{const t=ie(H,"reviews",n),r=await Xe(t);if(!r.exists())return;const{likes:s=[],dislikes:i=[]}=r.data();s.includes(e)?await ze(t,{likes:At(e)}):await ze(t,{likes:Hs(e),dislikes:At(e)})},toggleDislike:async(n,e)=>{const t=ie(H,"reviews",n),r=await Xe(t);if(!r.exists())return;const{likes:s=[],dislikes:i=[]}=r.data();i.includes(e)?await ze(t,{dislikes:At(e)}):await ze(t,{dislikes:Hs(e),likes:At(e)})}},gn={byReview:async n=>{const e=kt(Oe(H,"comments"),je("reviewId","==",n)),t=await We(e);return Dt(t).sort((r,s)=>new Date(r.createdAt)-new Date(s.createdAt))},create:async(n,e,t,r=null)=>{const s=Re.currentUser();return{id:(await Ia(Oe(H,"comments"),{reviewId:n,userId:e,username:(s==null?void 0:s.username)||"Unknown",avatarBase64:(s==null?void 0:s.avatarBase64)||"",text:t,parentId:r,likes:[],dislikes:[],createdAt:new Date().toISOString(),updatedAt:null})).id,reviewId:n,userId:e,text:t,parentId:r}},delete:async n=>{await $r(ie(H,"comments",n));const e=await We(kt(Oe(H,"comments"),je("parentId","==",n))),t=cd(H);e.docs.forEach(r=>t.delete(r.ref)),await t.commit()},toggleLike:async(n,e)=>{var s;const t=ie(H,"comments",n),r=await Xe(t);r.exists()&&((s=r.data().likes)!=null&&s.includes(e)?await ze(t,{likes:At(e)}):await ze(t,{likes:Hs(e),dislikes:At(e)}))},toggleDislike:async(n,e)=>{var s;const t=ie(H,"comments",n),r=await Xe(t);r.exists()&&((s=r.data().dislikes)!=null&&s.includes(e)?await ze(t,{dislikes:At(e)}):await ze(t,{dislikes:Hs(e),likes:At(e)}))}};function fs(n,e){return[n,e].sort().join("_")}const xe={between:async(n,e)=>{const t=await Xe(ie(H,"friends",fs(n,e)));return fi(t)},ofUser:async n=>{const e=kt(Oe(H,"friends"),je("users","array-contains",n),je("status","==","accepted")),t=await We(e);return Dt(t)},pendingFor:async n=>{const e=kt(Oe(H,"friends"),je("receiverId","==",n),je("status","==","pending")),t=await We(e);return Dt(t)},sentBy:async n=>{const e=kt(Oe(H,"friends"),je("requesterId","==",n),je("status","==","pending")),t=await We(e);return Dt(t)},send:async(n,e)=>{if(await xe.between(n,e))return!1;const r=fs(n,e);return await zs(ie(H,"friends",r),{users:[n,e],requesterId:n,receiverId:e,status:"pending",createdAt:new Date().toISOString()}),!0},accept:async(n,e)=>{await ze(ie(H,"friends",fs(n,e)),{status:"accepted"})},remove:async(n,e)=>{await $r(ie(H,"friends",fs(n,e)))}},nn={recent:async(n=40)=>{const e=await We(Oe(H,"news"));return Dt(e).sort((t,r)=>new Date(r.createdAt)-new Date(t.createdAt)).slice(0,n)},add:async(n,e,t=null,r={})=>{await Ia(Oe(H,"news"),{type:n,userId:e,targetId:t,createdAt:new Date().toISOString(),...r})}},Bc=[{name:"Toongod",url:"https://www.toongod.org/",desc:"18+"},{name:"Hentai20",url:"https://hentai20.io/",desc:"18+"},{name:"AllHen",url:"https://20.allhen.online/",desc:"18+"},{name:"Desu",url:"https://desu.uno/",desc:"18+"},{name:"HentaiChan",url:"https://hentaichan.live/",desc:"18+"},{name:"imhentai",url:"https://imhentai.xxx/",desc:"18+"}],Qv={all:()=>{try{const n=JSON.parse(localStorage.getItem("mdb_top_sites_v2"));return n!=null&&n.length?n:Bc}catch{return Bc}},save:n=>localStorage.setItem("mdb_top_sites_v2",JSON.stringify(n))},fr={};let Eo=null;function vt(n,e){fr[n]=e}function me(n){window.location.hash=n}function Yv(n){Eo=n}function Jv(){function n(){const e=window.location.hash.replace("#","")||"home";Eo&&Eo(e);let t=!1;for(const r of Object.keys(fr)){const s=[],i=r.replace(/:([^/]+)/g,(u,d)=>(s.push(d),"([^/]+)")),a=new RegExp(`^${i}$`),l=e.match(a);if(l){const u={};s.forEach((d,p)=>{u[d]=decodeURIComponent(l[p+1])}),fr[r](u),t=!0;break}}!t&&fr.home&&fr.home({})}window.addEventListener("hashchange",n),n()}function Xv(n){return`${n.toLowerCase().replace(/[^a-z0-9]/g,"_")}@manhwadb.app`}async function Zv(n,e,t=""){if(!n||n.trim().length<3)return{error:"Ім'я користувача має бути мінімум 3 символи"};if(!/^[a-zA-Z0-9_а-яА-ЯіІїЇєЄ]+$/.test(n))return{error:"Логін може містити лише літери, цифри та _"};if(!e||e.length<6)return{error:"Пароль має бути мінімум 6 символів"};if((await Xe(ie(H,"usernames",n.toLowerCase()))).exists())return{error:"Такий логін вже зайнятий. Оберіть інший."};const s=Xv(n);let i;try{i=await bm($t,s,e)}catch(u){return u.code==="auth/email-already-in-use"?{error:"Такий логін вже зайнятий."}:{error:u.message}}const a=i.user.uid,l=new Date().toISOString();return await zs(ie(H,"users",a),{username:n.trim(),email:t||"",bio:"",avatarBase64:"",top4:[null,null,null,null],createdAt:l}),await zs(ie(H,"usernames",n.toLowerCase()),{uid:a,internalEmail:s}),{user:{id:a,username:n.trim()}}}async function ew(n,e){if(!n||!e)return{error:"Заповніть всі поля"};const t=await Xe(ie(H,"usernames",n.toLowerCase()));if(!t.exists())return{error:"Користувача не знайдено"};const{internalEmail:r}=t.data();try{return{user:(await Am($t,r,e)).user}}catch(s){return s.code==="auth/wrong-password"||s.code==="auth/invalid-credential"?{error:"Невірний пароль"}:{error:s.message}}}async function tw(){await Dm($t)}async function nw(n,e,t){const r=$t.currentUser;if(!r)return{error:"Не авторизовано"};if(t.length<6)return{error:"Новий пароль має бути мінімум 6 символів"};try{const s=Mt.credential(r.email,e);return await Ru(r,s),await Rm(r,t),{ok:!0}}catch(s){return s.code==="auth/wrong-password"||s.code==="auth/invalid-credential"?{error:"Старий пароль невірний"}:{error:s.message}}}async function rw(n){const e=$t.currentUser;if(!e)return{error:"Не авторизовано"};try{const t=Mt.credential(e.email,n);return await Ru(e,t),await Vm(e),{ok:!0}}catch(t){return t.code==="auth/wrong-password"||t.code==="auth/invalid-credential"?{error:"Невірний пароль"}:{error:t.message}}}function rn(n){if(!n)return"";const e=Date.now(),t=new Date(n).getTime(),r=Math.floor((e-t)/1e3);return r<60?"щойно":r<3600?`${Math.floor(r/60)} хв тому`:r<86400?`${Math.floor(r/3600)} год тому`:r<86400*30?`${Math.floor(r/86400)} д тому`:new Date(n).toLocaleDateString("uk-UA",{day:"numeric",month:"short",year:"numeric"})}function Ta(n){return n?new Date(n).toLocaleDateString("uk-UA",{day:"numeric",month:"long",year:"numeric"}):""}function q(n){return(n||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Io(n,e=700,t=.65){return new Promise((r,s)=>{const i=new FileReader;i.onload=a=>{const l=new Image;l.onload=()=>{const u=document.createElement("canvas");let d=l.width,p=l.height;d>e&&(p=Math.round(p*e/d),d=e),u.width=d,u.height=p,u.getContext("2d").drawImage(l,0,0,d,p),r(u.toDataURL("image/jpeg",t))},l.onerror=s,l.src=a.target.result},i.onerror=s,i.readAsDataURL(n)})}function sw(n){return Io(n,200,.7)}function Vt(n,e=!1){if(e)return`<div class="crosses-display">${Array(10).fill('<span class="cross-mark">✕</span>').join("")}</div>`;const t=Math.floor(n),r=n%1>=.5,s=10-t-(r?1:0);let i='<div class="stars-display">';for(let a=0;a<t;a++)i+='<span class="star full"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>';r&&(i+='<span class="star half"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>');for(let a=0;a<s;a++)i+='<span class="star"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>';return i+="</div>",i}function Ke(n,e="md"){if(n&&n.avatarBase64)return`<img class="avatar avatar-${e}" src="${n.avatarBase64}" alt="${q(n.username)}">`;const t=n?(n.username||"?").charAt(0).toUpperCase():"?";return`<div class="avatar avatar-${e}">${t}</div>`}function Ve(n,e="info"){let t=document.querySelector(".toast-container");t||(t=document.createElement("div"),t.className="toast-container",document.body.appendChild(t));const r=document.createElement("div");r.className=`toast toast-${e}`;const s={success:"✅",error:"❌",info:"ℹ️"};r.innerHTML=`<span>${s[e]||""}</span><span>${q(n)}</span>`,t.appendChild(r),setTimeout(()=>{r.style.opacity="0",r.style.transition="opacity 0.3s",setTimeout(()=>r.remove(),300)},3500)}function qn(n){n.innerHTML='<div style="display:flex;justify-content:center;padding:80px"><div class="loader-spinner"></div></div>'}let Rs=null;function To(n="login"){Qt();const e=document.createElement("div");e.className="modal-backdrop",e.id="auth-modal",e.innerHTML=`
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
    </div>`,document.body.appendChild(e),Rs=e,$c(e,n),e.querySelectorAll(".modal-tab").forEach(t=>{t.addEventListener("click",()=>{e.querySelectorAll(".modal-tab").forEach(r=>r.classList.remove("active")),t.classList.add("active"),$c(e,t.dataset.tab)})}),document.getElementById("auth-modal-close").addEventListener("click",Qt),e.addEventListener("click",t=>{t.target===e&&Qt()}),document.addEventListener("keydown",hd)}function hd(n){n.key==="Escape"&&Qt()}function Qt(){Rs&&(Rs.remove(),Rs=null),document.removeEventListener("keydown",hd)}function ps(n,e){n.disabled=e,n.textContent=e?"Зачекайте...":n.dataset.label}function $c(n,e){const t=n.querySelector("#auth-tab-content");if(e==="login"){t.innerHTML=`
      <div class="form-group" style="margin-bottom:16px">
        <label class="form-label">Логін</label>
        <input class="input" type="text" id="auth-username" placeholder="Ваш логін" autocomplete="username">
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Пароль</label>
        <input class="input" type="password" id="auth-password" placeholder="Ваш пароль" autocomplete="current-password">
      </div>
      <div id="auth-error" class="form-error" style="display:none;margin-bottom:12px"></div>
      <button class="btn btn-primary" style="width:100%" id="auth-submit" data-label="Увійти">Увійти</button>`;const r=async()=>{const s=t.querySelector("#auth-username").value.trim(),i=t.querySelector("#auth-password").value,a=t.querySelector("#auth-error"),l=t.querySelector("#auth-submit");ps(l,!0);const u=await ew(s,i);u.error?(a.textContent=u.error,a.style.display="block",ps(l,!1)):(Qt(),Ve("Вітаємо! 👋","success"),setTimeout(()=>window.location.reload(),300))};t.querySelector("#auth-submit").addEventListener("click",r),t.querySelectorAll("input").forEach(s=>s.addEventListener("keydown",i=>{i.key==="Enter"&&r()}))}else{t.innerHTML=`
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
      <button class="btn btn-primary" style="width:100%" id="auth-submit" data-label="Створити акаунт">Створити акаунт</button>`;const r=async()=>{const s=t.querySelector("#auth-username").value.trim(),i=t.querySelector("#auth-email").value.trim(),a=t.querySelector("#auth-password").value,l=t.querySelector("#auth-error"),u=t.querySelector("#auth-submit");ps(u,!0);const d=await Zv(s,a,i);d.error?(l.textContent=d.error,l.style.display="block",ps(u,!1)):(nn.add("joined",d.user.id,null,{username:d.user.username}).catch(()=>{}),Qt(),Ve(`Ласкаво просимо, ${d.user.username}! 🎉`,"success"),setTimeout(()=>window.location.reload(),500))};t.querySelector("#auth-submit").addEventListener("click",r),t.querySelectorAll("input").forEach(s=>s.addEventListener("keydown",i=>{i.key==="Enter"&&r()}))}setTimeout(()=>{var r;return(r=t.querySelector("input"))==null?void 0:r.focus()},50)}const Ss=Object.freeze(Object.defineProperty({__proto__:null,closeAuthModal:Qt,showAuthModal:To},Symbol.toStringTag,{value:"Module"}));function bo(){var i,a,l;const n=Re.currentUser(),e=document.getElementById("app");let t=document.getElementById("site-header");t&&t.remove(),t=document.createElement("header"),t.id="site-header",t.className="site-header";const s=(window.location.hash.replace("#","")||"home").split("/")[0];t.innerHTML=`
    <a class="header-logo" href="#home">ManhwaDB</a>
    <nav class="header-nav">
      <button class="nav-link ${s==="home"||s===""?"active":""}" data-hash="home">🏠 Головна</button>
      ${n?`<button class="nav-link ${s==="new-review"?"active":""}" data-hash="new-review">✍️ Нова рецензія</button>`:""}
      ${n?`<button class="nav-link ${s==="friends"?"active":""}" data-hash="friends">👥 Друзі</button>`:""}
      ${n?`<button class="nav-link ${s==="account"?"active":""}" data-hash="account">👤 Мій акаунт</button>`:""}
    </nav>
    <div class="header-auth">
      ${n?`<span style="color:var(--text-secondary);font-size:0.85rem;margin-right:8px">Вітаємо, <strong style="color:var(--text-primary)">${n.username}</strong></span>
           <button class="btn btn-secondary btn-sm" id="logout-btn">Вийти</button>`:`<button class="btn btn-ghost btn-sm" id="login-btn">Увійти</button>
           <button class="btn btn-primary btn-sm" id="register-btn">Реєстрація</button>`}
    </div>`,e.insertBefore(t,e.firstChild),t.querySelectorAll("[data-hash]").forEach(u=>{u.addEventListener("click",()=>me(u.dataset.hash))}),(i=document.getElementById("logout-btn"))==null||i.addEventListener("click",async()=>{await tw(),Ve("Ви вийшли з акаунту","info"),window.location.hash="home",window.location.reload()}),(a=document.getElementById("login-btn"))==null||a.addEventListener("click",()=>To("login")),(l=document.getElementById("register-btn"))==null||l.addEventListener("click",()=>To("register"))}async function iw(){const n=document.getElementById("page-root");qn(n);const e=Qv.all(),[t,r]=await Promise.all([Ue.all(),nn.recent(50)]),s=[...t].sort((d,p)=>p.rating-d.rating).slice(0,10);n.innerHTML=`
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
                ${e.map((d,p)=>`
                  <a class="top-site-item" href="${q(d.url)}" target="_blank" rel="noopener">
                    <span class="top-site-rank">${p+1}</span>
                    <div>
                      <div style="font-weight:600">${q(d.name)}</div>
                      <div style="font-size:0.75rem;color:var(--text-muted)">${q(d.desc)}</div>
                    </div>
                    <span style="margin-left:auto;color:var(--text-muted);font-size:12px">↗</span>
                  </a>`).join("")}
              </div>
            </div>

            <!-- Top Popular -->
            <div>
              <div class="section-title">🔥 Топ популярних</div>
              ${s.length===0?'<div class="empty-state"><div class="empty-icon">📖</div><h3>Ще немає рецензій</h3></div>':s.map((d,p)=>`
                    <div class="review-card" style="margin-bottom:10px;cursor:pointer" data-review-id="${d.id}">
                      <div class="review-cover">
                        ${d.coverBase64?`<img src="${d.coverBase64}" alt="">`:'<div class="review-cover-placeholder">📖</div>'}
                      </div>
                      <div class="review-body">
                        <div style="font-size:0.75rem;color:var(--accent2);font-weight:700;margin-bottom:2px">#${p+1}</div>
                        <div class="review-title">${q(d.title)}</div>
                        <div style="margin:4px 0">${Vt(d.rating,d.status==="dropped")}</div>
                        <div style="font-size:0.78rem;color:var(--text-muted)">— ${q(d.username||"")}</div>
                      </div>
                    </div>`).join("")}
            </div>
          </div>
        </div>

        <!-- RIGHT: News Feed -->
        <div>
          <div class="section-title">📡 Стрічка новин</div>
          <div class="news-feed">
            ${r.length===0?'<div class="empty-state"><div class="empty-icon">📭</div><h3>Тут поки тихо</h3><p>Реєструйтесь та діліться рецензіями!</p></div>':r.map(ow).join("")}
          </div>
        </div>
      </div>
    </div>`,n.querySelectorAll("[data-review-id]").forEach(d=>{d.addEventListener("click",()=>me(`review/${d.dataset.reviewId}`))});const i=document.getElementById("home-search"),a=document.getElementById("home-search-btn"),l=document.getElementById("search-results");function u(){const d=i.value.trim().toLowerCase();if(!d){l.style.display="none";return}const p=t.filter(g=>g.title.toLowerCase().includes(d));if(p.length===0){l.style.display="block",l.innerHTML='<div class="empty-state" style="padding:20px"><h3>Нічого не знайдено</h3></div>';return}l.style.display="block",l.innerHTML=p.slice(0,12).map(g=>`
      <div class="review-card" style="margin-bottom:8px;cursor:pointer" data-review-id="${g.id}">
        <div class="review-cover" style="width:50px">
          ${g.coverBase64?`<img src="${g.coverBase64}" alt="">`:'<div class="review-cover-placeholder" style="font-size:14px">📖</div>'}
        </div>
        <div class="review-body">
          <div class="review-title">${q(g.title)}</div>
          <div style="margin:4px 0">${Vt(g.rating,g.status==="dropped")}</div>
          <div style="font-size:0.78rem;color:var(--text-muted)">${q(g.username||"")}</div>
        </div>
      </div>`).join(""),l.querySelectorAll("[data-review-id]").forEach(g=>{g.addEventListener("click",()=>me(`review/${g.dataset.reviewId}`))})}a.addEventListener("click",u),i.addEventListener("keydown",d=>{d.key==="Enter"&&u()}),i.addEventListener("input",()=>{i.value.trim()||(l.style.display="none")})}function ow(n){const e=n.username?`<strong>${q(n.username)}</strong>`:"Хтось";let t="📢",r="";return n.type==="joined"?(t="🎉",r=`${e} приєднався до ManhwaDB`):n.type==="review"?(t="📝",r=`${e} залишив рецензію на <strong>${q(n.extra||"манхву")}</strong>`):n.type==="friend"?(t="🤝",r=`${e} та <strong>${q(n.friendName||"Хтось")}</strong> тепер друзі!`):(t="📢",r=`${e} щось зробив`),`<div class="news-item"><span class="news-icon">${t}</span><div><div class="news-text">${r}</div><div class="news-ts">${rn(n.createdAt)}</div></div></div>`}async function qc(n=null){var k;const e=Re.currentUser();if(!e){me("home");return}const t=document.getElementById("page-root");let r=null;n&&(qn(t),r=await Ue.byId(n));let s=(r==null?void 0:r.coverBase64)||"",i=(r==null?void 0:r.rating)??5,a=(r==null?void 0:r.status)||"done";t.innerHTML=`
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
          <input class="input" type="text" id="review-title" placeholder="Назва..." value="${q((r==null?void 0:r.title)||"")}">
        </div>

        <!-- Date -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Дата прочитання (необов'язково)</label>
          <input class="input" type="date" id="review-date" value="${(r==null?void 0:r.date)||""}">
        </div>

        <!-- Tags -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Теги (через кому)</label>
          <input class="input" type="text" id="review-tags" placeholder="екшн, романтика, фентезі..." value="${((k=r==null?void 0:r.tags)==null?void 0:k.join(", "))||""}">
        </div>

        <!-- Status -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Статус <span style="color:var(--accent)">*</span></label>
          <select class="select" id="review-status">
            <option value="done" ${a==="done"?"selected":""}>✅ Завершено</option>
            <option value="reading" ${a==="reading"?"selected":""}>📖 Читаю</option>
            <option value="planned" ${a==="planned"?"selected":""}>⏳ В планах (Прочитати потім)</option>
            <option value="dropped" ${a==="dropped"?"selected":""}>❌ Кинув</option>
          </select>
        </div>

        <!-- Rating -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Оцінка <span style="color:var(--accent)">*</span></label>
          <div class="star-slider-wrap">
            <div class="star-slider-preview">
              <div id="stars-preview">${a==="planned"?'<span style="color:var(--text-muted);font-size:0.9rem">Ще не оцінено</span>':Vt(i,a==="dropped")}</div>
              <span class="star-slider-label" id="rating-label">${a==="dropped"?"Кинута":a==="planned"?"-":i+"/10"}</span>
            </div>
            <input type="range" class="star-slider" id="rating-slider" min="0" max="10" step="0.5" value="${i}" ${a==="dropped"||a==="planned"?"disabled":""}>
          </div>
        </div>

        <!-- Text -->
        <div class="form-group" style="margin-bottom:24px">
          <label class="form-label">Текст рецензії (необов'язково)</label>
          <textarea class="textarea" id="review-text" placeholder="Ваші враження про манхву..." style="min-height:160px">${q((r==null?void 0:r.text)||"")}</textarea>
        </div>

        <div id="review-form-error" class="form-error" style="display:none;margin-bottom:12px"></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" id="save-review-btn" style="flex:1;min-width:180px" data-label="${r?"Зберегти зміни":"Опублікувати рецензію"}">
            ${r?"💾 Зберегти зміни":"📝 Опублікувати рецензію"}
          </button>
          <button class="btn btn-secondary" id="cancel-review-btn">Скасувати</button>
        </div>
      </div>
    </div>`,document.getElementById("back-btn").addEventListener("click",()=>history.back()),document.getElementById("cancel-review-btn").addEventListener("click",()=>history.back());const l=document.getElementById("cover-upload-area"),u=document.getElementById("cover-file"),d=document.getElementById("cover-actions");function p(){const L=l.querySelector("#cover-preview-img"),F=l.querySelectorAll("span:not(.upload-overlay span)");if(s){if(L)L.src=s;else{const M=document.createElement("img");M.id="cover-preview-img",M.src=s;const z=l.querySelector(".upload-overlay");l.insertBefore(M,z)}F.forEach(M=>M.remove()),d.style.display="flex"}else if(L&&L.remove(),d.style.display="none",!l.querySelector("span:not(.upload-overlay span)")){const M=document.createElement("span");M.style.fontSize="32px",M.textContent="🖼️";const z=document.createElement("span");z.textContent="Натисніть або перетягніть файл",l.appendChild(M),l.appendChild(z)}}l.addEventListener("click",()=>u.click()),u.addEventListener("change",async()=>{const L=u.files[0];L&&(s=await Io(L,700,.65),p())}),document.getElementById("remove-cover-btn").addEventListener("click",L=>{L.stopPropagation(),s="",p()}),l.addEventListener("dragover",L=>{L.preventDefault(),l.style.borderColor="var(--accent)"}),l.addEventListener("dragleave",()=>{l.style.borderColor=""}),l.addEventListener("drop",async L=>{L.preventDefault(),l.style.borderColor="";const F=L.dataTransfer.files[0];F!=null&&F.type.startsWith("image/")&&(s=await Io(F,700,.65),p())});const g=document.getElementById("review-status"),T=document.getElementById("rating-slider"),w=document.getElementById("stars-preview"),S=document.getElementById("rating-label");g.addEventListener("change",()=>{a=g.value;const L=a==="dropped",F=a==="planned";T.disabled=L||F,F?(w.innerHTML='<span style="color:var(--text-muted);font-size:0.9rem">Ще не оцінено</span>',S.textContent="-"):(w.innerHTML=Vt(L?0:i,L),S.textContent=L?"Кинута":i+"/10")}),T.addEventListener("input",()=>{i=parseFloat(T.value),w.innerHTML=Vt(i,!1),S.textContent=i+"/10"});const D=document.getElementById("save-review-btn");D.addEventListener("click",async()=>{const L=document.getElementById("review-title").value.trim(),F=document.getElementById("review-date").value,M=document.getElementById("review-tags").value,z=document.getElementById("review-text").value.trim(),ye=g.value,te=ye==="dropped"||ye==="planned"?0:i,E=M.split(",").map(v=>v.trim()).filter(Boolean),m=document.getElementById("review-form-error");if(!L){m.textContent="Назва обов'язкова",m.style.display="block";return}D.disabled=!0,D.textContent="Збереження...";const _={title:L,coverBase64:s,text:z,rating:te,status:ye,tags:E,date:F};try{let v;r?(v=await Ue.update(n,_),Ve("Рецензію оновлено ✅","success")):(v=await Ue.create(e.id,_),await nn.add("review",e.id,v.id,{username:e.username,extra:L}),Ve("Рецензію опубліковано! 📝","success")),me(`review/${v.id}`)}catch(v){m.textContent="Помилка: "+v.message,m.style.display="block",D.disabled=!1,D.textContent=D.dataset.label}})}async function _n(){const n=Re.currentUser();if(!n){me("home");return}const e=document.getElementById("page-root");qn(e);const[t,r,s]=await Promise.all([xe.ofUser(n.id),xe.pendingFor(n.id),xe.sentBy(n.id)]),i=async w=>{const S=w.requesterId===n.id?w.receiverId:w.requesterId,D=await ue.byId(S);return{...w,otherUser:D,otherId:S}},[a,l,u]=await Promise.all([Promise.all(t.map(i)),Promise.all(r.map(async w=>{const S=await ue.byId(w.requesterId);return{...w,otherUser:S}})),Promise.all(s.map(async w=>{const S=await ue.byId(w.receiverId);return{...w,otherUser:S}}))]);e.innerHTML=`
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
            ${l.map(w=>{var S;return`
              <div class="friend-item">
                ${Ke(w.otherUser,"sm")}
                <div class="friend-info">
                  <div class="friend-name" data-profile="${w.requesterId}" style="cursor:pointer">${q(((S=w.otherUser)==null?void 0:S.username)||"Невідомий")}</div>
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
            ${u.map(w=>{var S;return`
              <div class="friend-item">
                ${Ke(w.otherUser,"sm")}
                <div class="friend-info">
                  <div class="friend-name" data-profile="${w.receiverId}" style="cursor:pointer">${q(((S=w.otherUser)==null?void 0:S.username)||"Невідомий")}</div>
                </div>
                <span class="friend-status friend-pending">Очікує</span>
                <button class="btn btn-ghost btn-xs" data-cancel="${w.receiverId}">✕</button>
              </div>`}).join("")}
          </div>
        </div>`:""}

      <!-- Friends list -->
      <div class="section-title" style="font-size:1rem;margin-bottom:12px">✅ Друзі (${a.length})</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${a.length===0?'<div class="empty-state"><div class="empty-icon">🤝</div><h3>У вас ще немає друзів</h3><p>Знайдіть їх за логіном вище!</p></div>':a.map(w=>{var S;return`
              <div class="friend-item">
                ${Ke(w.otherUser,"md")}
                <div class="friend-info">
                  <div class="friend-name" data-profile="${w.otherId}" style="cursor:pointer">${q(((S=w.otherUser)==null?void 0:S.username)||"Невідомий")}</div>
                </div>
                <span class="friend-status friend-accepted">Друг</span>
                <button class="btn btn-secondary btn-xs" data-view-profile="${w.otherId}">Профіль</button>
                <button class="btn btn-danger btn-xs" data-remove="${w.otherId}">Видалити</button>
              </div>`}).join("")}
      </div>
    </div>`;const d=document.getElementById("friend-search-btn"),p=document.getElementById("friend-search-input"),g=document.getElementById("friend-search-result"),T=async()=>{var L;const w=p.value.trim();if(!w)return;d.disabled=!0,d.textContent="...";const S=await ue.byUsername(w);if(d.disabled=!1,d.textContent="Знайти",!S||S.id===n.id){g.innerHTML='<div style="color:var(--text-muted);font-size:0.875rem">Користувача не знайдено</div>';return}const D=await xe.between(n.id,S.id);let k="";D?D.status==="pending"?k='<span class="friend-status friend-pending">Запит надіслано</span>':k='<span class="friend-status friend-accepted">Вже друзі ✅</span>':k=`<button class="btn btn-primary btn-sm" id="add-friend-btn" data-uid="${S.id}">➕ Надіслати запит</button>`,g.innerHTML=`<div class="friend-item">
      ${Ke(S,"sm")}
      <div class="friend-info"><div class="friend-name">${q(S.username)}</div></div>
      ${k}
    </div>`,(L=document.getElementById("add-friend-btn"))==null||L.addEventListener("click",async()=>{await xe.send(n.id,S.id),await nn.add("friend",n.id,S.id,{username:n.username}),Ve(`Запит надіслано ${S.username}`,"success"),await _n()})};d.addEventListener("click",T),p.addEventListener("keydown",w=>{w.key==="Enter"&&T()}),e.querySelectorAll("[data-accept]").forEach(w=>{w.addEventListener("click",async()=>{const S=w.dataset.accept;await xe.accept(S,n.id);const D=await ue.byId(S);await nn.add("friend",n.id,S,{username:n.username,friendName:(D==null?void 0:D.username)||"Unknown"}).catch(console.error),Ve("Запит прийнято ✅","success"),await _n()})}),e.querySelectorAll("[data-decline]").forEach(w=>{w.addEventListener("click",async()=>{await xe.remove(w.dataset.decline,n.id),await _n()})}),e.querySelectorAll("[data-cancel]").forEach(w=>{w.addEventListener("click",async()=>{await xe.remove(n.id,w.dataset.cancel),await _n()})}),e.querySelectorAll("[data-remove]").forEach(w=>{w.addEventListener("click",async()=>{window.confirm("Видалити зі списку друзів?")&&(await xe.remove(n.id,w.dataset.remove),Ve("Видалено зі списку друзів","info"),await _n())})}),e.querySelectorAll("[data-profile], [data-view-profile]").forEach(w=>{w.addEventListener("click",()=>me(`profile/${w.dataset.profile||w.dataset.viewProfile}`))})}async function aw(){const n=Re.currentUser();if(!n){me("home");return}await On(n.id,!0)}async function On(n,e=!1){var l,u,d,p;const t=document.getElementById("page-root");qn(t);const[r,s]=await Promise.all([ue.byId(n),Ue.byUser(n)]);if(!r){t.innerHTML='<div class="page-container"><div class="empty-state"><div class="empty-icon">😕</div><h3>Користувача не знайдено</h3></div></div>';return}const i=r.top4||[null,null,null,null],a=await Promise.all(i.map(g=>g?Ue.byId(g):Promise.resolve(null)));if(t.innerHTML=`
    <div class="page-container">
      <!-- Profile Header -->
      <div class="profile-header">
        <div id="avatar-wrap" style="cursor:${e?"pointer":"default"};position:relative">
          ${Ke(r,"xl")}
          ${e?'<div style="position:absolute;bottom:4px;right:4px;background:var(--accent);border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px">📷</div>':""}
        </div>
        ${e?'<input type="file" id="avatar-file" accept="image/*" style="display:none">':""}
        <div class="profile-info">
          <div class="profile-name">${q(r.username)}</div>
          ${r.bio?`<div class="profile-bio">${q(r.bio)}</div>`:e?'<div class="profile-bio" style="color:var(--text-muted);font-style:italic">Додайте опис в налаштуваннях</div>':""}
          <div class="profile-stats">
            <div class="profile-stat"><div class="stat-value">${s.length}</div><div class="stat-label">Рецензій</div></div>
            <div class="profile-stat"><div class="stat-value">${s.filter(g=>g.status==="done").length}</div><div class="stat-label">Завершено</div></div>
            <div class="profile-stat"><div class="stat-value">${s.filter(g=>g.status==="reading").length}</div><div class="stat-label">Читаю</div></div>
            <div class="profile-stat"><div class="stat-value">${s.filter(g=>g.status==="planned").length}</div><div class="stat-label">В планах</div></div>
            <div class="profile-stat"><div class="stat-value">${s.filter(g=>g.status==="dropped").length}</div><div class="stat-label">Кинуто</div></div>
          </div>
          ${e?'<div style="margin-top:16px"><button class="btn btn-secondary btn-sm" id="edit-account-btn">⚙️ Налаштування</button></div>':""}
          <div id="friend-btn-area"></div>
        </div>
      </div>

      <!-- Top 4 -->
      <div style="margin-bottom:32px">
        <div class="section-title">⭐ Топ 4 манхви</div>
        <div class="top4-grid">
          ${a.map((g,T)=>`
            <div class="top4-slot${e?"":" no-hover"}" data-slot="${T}">
              ${g!=null&&g.coverBase64?`<img src="${g.coverBase64}" alt="${q((g==null?void 0:g.title)||"")}">`:e?"+":"?"}
              ${g&&e?`<button class="top4-slot-remove" data-remove-slot="${T}">✕</button>`:""}
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
              ${s.slice(0,6).map(g=>`
                <div class="manhwa-thumb" data-review-id="${g.id}" title="${q(g.title)}">
                  ${g.coverBase64?`<img src="${g.coverBase64}" alt="${q(g.title)}">`:'<div class="manhwa-thumb-placeholder">📖</div>'}
                </div>`).join("")}
            </div>`}
      </div>

      <!-- All reviews list -->
      ${s.length>0?`
        <div>
          <div class="section-title">🗒️ Всі рецензії</div>
          <div>${s.slice(0,5).map(g=>lw(g)).join("")}</div>
          ${s.length>5?`<div style="text-align:center;margin-top:16px"><span class="see-all-link" id="see-all-btn2">Показати всі ${s.length} →</span></div>`:""}
        </div>`:""}
    </div>
    <div id="edit-modal-placeholder"></div>
    <div id="top4-modal-placeholder"></div>`,t.querySelectorAll("[data-review-id]").forEach(g=>{g.addEventListener("click",()=>me(`review/${g.dataset.reviewId}`))}),(l=document.getElementById("see-all-btn"))==null||l.addEventListener("click",()=>me(`all-reviews/${n}`)),(u=document.getElementById("see-all-btn2"))==null||u.addEventListener("click",()=>me(`all-reviews/${n}`)),(d=document.getElementById("add-first-review"))==null||d.addEventListener("click",()=>me("new-review")),e){const g=document.getElementById("avatar-wrap"),T=document.getElementById("avatar-file");g==null||g.addEventListener("click",()=>T.click()),T==null||T.addEventListener("change",async()=>{const w=T.files[0];if(!w)return;const S=await sw(w),D=Re.currentUser();await ue.save({...D,avatarBase64:S}),Ve("Аватар оновлено ✅","success"),await On(n,e)}),(p=document.getElementById("edit-account-btn"))==null||p.addEventListener("click",()=>cw(r)),t.querySelectorAll("[data-slot]").forEach(w=>{w.addEventListener("click",S=>{S.target.dataset.removeSlot===void 0&&hw(n,parseInt(w.dataset.slot),s)})}),t.querySelectorAll("[data-remove-slot]").forEach(w=>{w.addEventListener("click",async S=>{S.stopPropagation();const D=parseInt(w.dataset.removeSlot),k=await ue.byId(n),L=[...k.top4||[null,null,null,null]];L[D]=null,await ue.save({...k,top4:L}),await On(n,e)})})}}function lw(n){var r;const e=n.status==="dropped"||n.status==="planned",t=(r=n.tags)!=null&&r.length?n.tags.map(s=>`<span class="tag">${q(s)}</span>`).join(""):"";return`<div class="review-card" style="margin-bottom:10px;cursor:pointer" data-review-id="${n.id}">
    <div class="review-cover">
      ${n.coverBase64?`<img src="${n.coverBase64}" alt="">`:'<div class="review-cover-placeholder">📖</div>'}
    </div>
    <div class="review-body">
      <div class="review-date">${n.date?Ta(n.date):rn(n.createdAt)}</div>
      <div class="review-title">${q(n.title)}</div>
      <div style="margin:4px 0">${n.status==="planned"?'<span style="color:var(--text-muted);font-size:0.8rem">Ще не оцінено</span>':Vt(n.rating,e)}</div>
      ${t?`<div class="review-tags" style="margin:4px 0">${t}</div>`:""}
      ${n.text?`<div class="review-text-preview">${q(n.text)}</div>`:""}
    </div>
  </div>`}function cw(n){const e=document.getElementById("edit-modal-placeholder");e.innerHTML=`
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
            <textarea class="textarea" id="edit-bio" style="min-height:80px">${q(n.bio||"")}</textarea>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Email</label>
            <input class="input" type="email" id="edit-email" value="${q(n.email||"")}">
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
            <button class="btn btn-primary" id="save-edit-btn" style="flex:1">💾 Зберегти</button>
            <button class="btn btn-secondary" id="edit-modal-close2">Скасувати</button>
          </div>
          <div class="divider"></div>
          <button class="btn btn-danger" style="width:100%" id="delete-account-btn">🗑️ Видалити акаунт</button>
        </div>
      </div>
    </div>`;const t=()=>e.innerHTML="";document.getElementById("edit-modal-close").addEventListener("click",t),document.getElementById("edit-modal-close2").addEventListener("click",t),document.getElementById("edit-modal").addEventListener("click",r=>{r.target.id==="edit-modal"&&t()}),document.getElementById("save-edit-btn").addEventListener("click",async()=>{const r=document.getElementById("edit-bio").value.trim(),s=document.getElementById("edit-email").value.trim(),i=document.getElementById("edit-old-password").value,a=document.getElementById("edit-new-password").value,l=document.getElementById("edit-theme").value,u=document.getElementById("edit-push").checked,d=document.getElementById("edit-error"),p=document.getElementById("save-edit-btn");if(p.disabled=!0,p.textContent="Збереження...",localStorage.setItem("theme",l),document.documentElement.setAttribute("data-theme",l),localStorage.setItem("push_enabled",u),i||a){const g=await nw(n.id,i,a);if(g.error){d.textContent=g.error,d.style.display="block",p.disabled=!1,p.textContent="💾 Зберегти";return}}await ue.save({...await ue.byId(n.id),bio:r,email:s}),t(),Ve("Акаунт оновлено ✅","success"),await On(n.id,!0)}),document.getElementById("delete-account-btn").addEventListener("click",()=>{uw(n)})}function uw(n){const e=document.getElementById("edit-modal-placeholder");e.innerHTML=`
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
    </div>`;const t=()=>e.innerHTML="";document.getElementById("del-modal-close").addEventListener("click",t),document.getElementById("del-modal-close2").addEventListener("click",t),document.getElementById("confirm-delete-btn").addEventListener("click",async()=>{const r=document.getElementById("delete-confirm-password").value,s=document.getElementById("del-error"),i=document.getElementById("confirm-delete-btn");i.disabled=!0,i.textContent="Видалення...";try{const a=await Ue.byUser(n.id);for(const u of a)await Ue.delete(u.id);await ue.delete(n.id),await $r(ie(H,"usernames",n.username.toLowerCase()));const l=await rw(r);if(l.error){s.textContent=l.error,s.style.display="block",i.disabled=!1,i.textContent="🗑️ Так, видалити акаунт";return}Ve("Акаунт видалено. До побачення!","info"),setTimeout(()=>{window.location.hash="home",window.location.reload()},800)}catch(a){s.textContent=a.message,s.style.display="block",i.disabled=!1,i.textContent="🗑️ Так, видалити акаунт"}})}function hw(n,e,t){const r=document.getElementById("top4-modal-placeholder");r.innerHTML=`
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
                <div class="manhwa-thumb" data-pick-review="${i.id}" title="${q(i.title)}">
                  ${i.coverBase64?`<img src="${i.coverBase64}" alt="">`:`<div class="manhwa-thumb-placeholder" style="font-size:11px;padding:4px;text-align:center;word-break:break-word">${q(i.title)}</div>`}
                </div>`).join("")}
          </div>
        </div>
      </div>
    </div>`;const s=()=>r.innerHTML="";document.getElementById("top4-modal-close").addEventListener("click",s),document.getElementById("top4-modal").addEventListener("click",i=>{i.target.id==="top4-modal"&&s()}),document.getElementById("top4-search").addEventListener("input",i=>{const a=i.target.value.toLowerCase();r.querySelectorAll("[data-pick-review]").forEach(l=>{l.style.display=!a||l.title.toLowerCase().includes(a)?"":"none"})}),r.querySelectorAll("[data-pick-review]").forEach(i=>{i.addEventListener("click",async()=>{const a=await ue.byId(n),l=[...a.top4||[null,null,null,null]];l[e]=i.dataset.pickReview,await ue.save({...a,top4:l}),s(),await On(n,!0)})})}async function Ao({id:n}){var t,r;const e=Re.currentUser();if(e&&e.id===n){me("account");return}if(await On(n,!1),e&&document.querySelector(".profile-info")){const i=await xe.between(e.id,n);let a="";i?i.status==="pending"?i.requesterId===e.id?a='<button class="btn btn-secondary btn-sm" disabled>⏳ Запит надіслано</button>':a='<button class="btn btn-primary btn-sm" id="accept-friend-profile-btn">✅ Прийняти запит</button>':a='<button class="btn btn-secondary btn-sm" disabled>✅ Друзі</button>':a='<button class="btn btn-primary btn-sm" id="add-friend-profile-btn">➕ Додати в друзі</button>';const l=document.getElementById("friend-btn-area");l&&(l.style.marginTop="12px",l.innerHTML=a),(t=document.getElementById("add-friend-profile-btn"))==null||t.addEventListener("click",async()=>{await xe.send(e.id,n),await nn.add("friend",e.id,n,{username:e.username}),Ve("Запит надіслано!","success"),await Ao({id:n})}),(r=document.getElementById("accept-friend-profile-btn"))==null||r.addEventListener("click",async()=>{await xe.accept(n,e.id);const u=await ue.byId(n);await nn.add("friend",e.id,n,{username:e.username,friendName:(u==null?void 0:u.username)||"Unknown"}).catch(console.error),Ve("Тепер ви друзі ✅","success"),await Ao({id:n})})}}async function Ro({id:n}){var S,D,k,L,F;const e=document.getElementById("page-root");qn(e);const[t,r]=await Promise.all([Ue.byId(n),Promise.resolve(Re.currentUser())]);if(!t){e.innerHTML='<div class="page-container"><div class="empty-state"><div class="empty-icon">😕</div><h3>Рецензія не знайдена</h3></div></div>';return}const s=await ue.byId(t.userId),i=r&&r.id===t.userId,a=t.status==="dropped",l=t.status==="planned",u={done:"✅ Завершено",reading:"📖 Читаю",planned:"⏳ В планах",dropped:"❌ Кинув"},d={done:"status-done",reading:"status-reading",planned:"status-planned",dropped:"status-dropped"},p=t.likes||[],g=t.dislikes||[],T=r&&p.includes(r.id),w=r&&g.includes(r.id);e.innerHTML=`
    <div class="page-container" style="max-width:860px">
      <button class="btn btn-ghost btn-sm" id="back-btn" style="margin-bottom:20px">← Назад</button>

      <div class="review-full-layout">
        <div class="review-full-cover">
          ${t.coverBase64?`<img src="${t.coverBase64}" alt="${q(t.title)}">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:48px;background:var(--bg-surface)">📖</div>'}
        </div>
        <div class="review-full-body">
          <div class="review-full-title">${q(t.title)}</div>
          <div class="review-full-author">
            ${Ke(s,"sm")}
            <a href="#" data-profile="${t.userId}" style="color:var(--accent3);font-weight:600;text-decoration:none;font-size:0.9rem">${q((s==null?void 0:s.username)||t.username||"Невідомий")}</a>
          </div>
          <div class="review-full-meta">
            <span class="status-badge ${d[t.status]||""}">${u[t.status]||""}</span>
            ${t.date?`<span style="color:var(--text-muted);font-size:0.85rem">📅 ${Ta(t.date)}</span>`:""}
            <span style="color:var(--text-muted);font-size:0.85rem">🕐 ${rn(t.createdAt)}</span>
          </div>
          <div style="margin-bottom:12px">
            ${l?'<span style="color:var(--text-muted);font-size:0.9rem">Ще не оцінено</span>':Vt(t.rating,a)}
            ${l?"":`<span style="color:var(--text-muted);font-size:0.85rem;margin-left:8px">${a?"Кинуто":`${t.rating}/10`}</span>`}
          </div>
          ${(S=t.tags)!=null&&S.length?`<div class="review-tags">${t.tags.map(M=>`<span class="tag">${q(M)}</span>`).join("")}</div>`:""}
          ${t.updatedAt?`<span class="edited-badge">Редаговано ${rn(t.updatedAt)}</span>`:""}

          <!-- Reactions -->
          <div class="review-action-bar" style="margin-top:16px">
            <button class="reaction-btn ${T?"liked":""}" id="rv-like-btn" data-id="${n}">👍 ${p.length}</button>
            <button class="reaction-btn ${w?"disliked":""}" id="rv-dislike-btn" data-id="${n}">👎 ${g.length}</button>
          </div>

          ${i?`
            <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
              <button class="btn btn-secondary btn-sm" id="edit-review-btn">✏️ Редагувати</button>
              <button class="btn btn-danger btn-sm" id="delete-review-btn">🗑️ Видалити</button>
            </div>`:""}
        </div>
      </div>

      ${t.text?`<div class="card card-padding" style="margin-bottom:24px"><div class="review-full-text">${q(t.text)}</div></div>`:""}

      <!-- Comments -->
      <div class="comments-section">
        <div class="section-title">💬 Коментарі</div>
        <div id="comments-list"><div style="display:flex;justify-content:center;padding:24px"><div class="loader-spinner"></div></div></div>
        ${r?`
          <div style="display:flex;gap:12px;margin-top:20px;align-items:flex-start">
            ${Ke(r,"sm")}
            <div style="flex:1">
              <textarea class="textarea" id="new-comment-text" placeholder="Залиште коментар..." style="min-height:80px"></textarea>
              <button class="btn btn-primary btn-sm" id="post-comment-btn" style="margin-top:8px">Надіслати</button>
            </div>
          </div>`:'<p style="color:var(--text-muted);font-size:0.875rem;margin-top:16px"><a href="#" id="login-to-comment" style="color:var(--accent)">Увійдіть</a>, щоб залишити коментар</p>'}
      </div>
    </div>`,document.getElementById("back-btn").addEventListener("click",()=>history.back()),e.querySelectorAll("[data-profile]").forEach(M=>{M.addEventListener("click",z=>{z.preventDefault(),me(`profile/${M.dataset.profile}`)})}),r&&((D=document.getElementById("rv-like-btn"))==null||D.addEventListener("click",async()=>{await Ue.toggleLike(n,r.id),Ro({id:n})}),(k=document.getElementById("rv-dislike-btn"))==null||k.addEventListener("click",async()=>{await Ue.toggleDislike(n,r.id),Ro({id:n})})),i&&(document.getElementById("edit-review-btn").addEventListener("click",()=>me(`edit-review/${n}`)),document.getElementById("delete-review-btn").addEventListener("click",async()=>{window.confirm("Видалити цю рецензію? Це неможливо скасувати.")&&(await Ue.delete(n),Ve("Рецензію видалено","info"),me("account"))})),(L=document.getElementById("login-to-comment"))==null||L.addEventListener("click",M=>{M.preventDefault(),ms(()=>Promise.resolve().then(()=>Ss),void 0,import.meta.url).then(z=>z.showAuthModal("login"))}),(F=document.getElementById("post-comment-btn"))==null||F.addEventListener("click",async()=>{const M=document.getElementById("new-comment-text").value.trim();if(!M)return;const z=document.getElementById("post-comment-btn");z.disabled=!0,z.textContent="...",await gn.create(n,r.id,M),document.getElementById("new-comment-text").value="",z.disabled=!1,z.textContent="Надіслати",await vn(n,r),Ve("Коментар додано","success")}),await vn(n,r)}async function vn(n,e){const t=document.getElementById("comments-list");if(!t)return;const r=await gn.byReview(n),s=r.filter(a=>!a.parentId),i=r.filter(a=>a.parentId);if(s.length===0){t.innerHTML='<div class="empty-state" style="padding:24px"><div class="empty-icon">💬</div><h3>Коментарів поки немає</h3></div>';return}t.innerHTML=s.map(a=>dw(a,i,e)).join(""),t.querySelectorAll("[data-comment-like]").forEach(a=>{a.addEventListener("click",async()=>{e&&(await gn.toggleLike(a.dataset.commentLike,e.id),await vn(n,e))})}),t.querySelectorAll("[data-comment-dislike]").forEach(a=>{a.addEventListener("click",async()=>{e&&(await gn.toggleDislike(a.dataset.commentDislike,e.id),await vn(n,e))})}),t.querySelectorAll("[data-reply-btn]").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.replyBtn,u=document.getElementById(`reply-form-${l}`);if(u){u.remove();return}const d=document.createElement("div");d.id=`reply-form-${l}`,d.className="comment-item reply",d.style.borderBottom="none",d.innerHTML=`<div style="flex:1;display:flex;gap:8px;align-items:flex-start">
        <div style="flex:1">
          <textarea class="textarea" placeholder="Ваша відповідь..." style="min-height:60px;font-size:0.85rem"></textarea>
          <div style="display:flex;gap:8px;margin-top:6px">
            <button class="btn btn-primary btn-xs reply-submit-btn">Відповісти</button>
            <button class="btn btn-ghost btn-xs reply-cancel-btn">Скасувати</button>
          </div>
        </div>
      </div>`,a.closest(".comment-item").after(d),d.querySelector(".reply-cancel-btn").addEventListener("click",()=>d.remove()),d.querySelector(".reply-submit-btn").addEventListener("click",async()=>{const p=d.querySelector("textarea").value.trim();!p||!e||(d.querySelector(".reply-submit-btn").disabled=!0,await gn.create(n,e.id,p,l),await vn(n,e))})})}),t.querySelectorAll("[data-delete-comment]").forEach(a=>{a.addEventListener("click",async()=>{window.confirm("Видалити коментар?")&&(await gn.delete(a.dataset.deleteComment),await vn(n,e))})})}function dw(n,e,t){const r=e.filter(u=>u.parentId===n.id),s=t&&t.id===n.userId,i=n.likes||[],a=n.dislikes||[],l={username:n.username,avatarBase64:n.avatarBase64};return`<div class="comment-item">
    ${Ke(l,"sm")}
    <div class="comment-body">
      <div class="comment-header">
        <span class="comment-author" data-profile="${n.userId}" style="cursor:pointer">${q(n.username||"Незнайомець")}</span>
        <span class="comment-ts">${rn(n.createdAt)}</span>
      </div>
      <div class="comment-text">${q(n.text)}</div>
      <div class="comment-actions">
        <button class="reaction-btn ${t&&i.includes(t.id)?"liked":""}" data-comment-like="${n.id}">👍 ${i.length}</button>
        <button class="reaction-btn ${t&&a.includes(t.id)?"disliked":""}" data-comment-dislike="${n.id}">👎 ${a.length}</button>
        ${t?`<button class="btn btn-ghost btn-xs" data-reply-btn="${n.id}">💬 Відповісти</button>`:""}
        ${s?`<button class="btn btn-danger btn-xs" data-delete-comment="${n.id}">🗑</button>`:""}
      </div>
    </div>
  </div>
  ${r.map(u=>{const d=u.likes||[],p=u.dislikes||[],g={username:u.username,avatarBase64:u.avatarBase64};return`<div class="comment-item reply">
      ${Ke(g,"sm")}
      <div class="comment-body">
        <div class="comment-header">
          <span class="comment-author">${q(u.username||"Незнайомець")}</span>
          <span class="comment-ts">${rn(u.createdAt)}</span>
        </div>
        <div class="comment-text">${q(u.text)}</div>
        <div class="comment-actions">
          <button class="reaction-btn ${t&&d.includes(t.id)?"liked":""}" data-comment-like="${u.id}">👍 ${d.length}</button>
          <button class="reaction-btn ${t&&p.includes(t.id)?"disliked":""}" data-comment-dislike="${u.id}">👎 ${p.length}</button>
          ${(t==null?void 0:t.id)===u.userId?`<button class="btn btn-danger btn-xs" data-delete-comment="${u.id}">🗑</button>`:""}
        </div>
      </div>
    </div>`}).join("")}`}async function fw({userId:n}){const e=document.getElementById("page-root");qn(e);const[t,r]=await Promise.all([ue.byId(n),Ue.byUser(n)]);if(!t){e.innerHTML='<div class="page-container"><div class="empty-state"><h3>Користувача не знайдено</h3></div></div>';return}e.innerHTML=`
    <div class="page-container">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;flex-wrap:wrap">
        <button class="btn btn-ghost btn-sm" id="back-btn">← Назад</button>
        ${Ke(t,"sm")}
        <div>
          <div style="font-family:var(--font-display);font-weight:700;font-size:1.1rem">${q(t.username)}</div>
          <div style="color:var(--text-muted);font-size:0.8rem">Всі рецензії — ${r.length} шт.</div>
        </div>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
        <button class="btn btn-secondary btn-sm filter-btn active" data-filter="all">Всі</button>
        <button class="btn btn-secondary btn-sm filter-btn" data-filter="done">✅ Завершені</button>
        <button class="btn btn-secondary btn-sm filter-btn" data-filter="reading">📖 Читаю</button>
        <button class="btn btn-secondary btn-sm filter-btn" data-filter="planned">⏳ В планах</button>
        <button class="btn btn-secondary btn-sm filter-btn" data-filter="dropped">❌ Кинуті</button>
        <input class="input" id="all-reviews-search" placeholder="🔍 Пошук..." style="max-width:220px;margin-left:auto">
      </div>

      <div id="all-reviews-grid" style="display:flex;flex-direction:column;gap:10px">
        ${jc(r)}
      </div>
    </div>`,document.getElementById("back-btn").addEventListener("click",()=>history.back());const s=()=>{e.querySelectorAll("[data-review-id]").forEach(d=>{d.addEventListener("click",()=>me(`review/${d.dataset.reviewId}`))})};s();let i="all",a="";const l=document.getElementById("all-reviews-grid"),u=()=>{let d=r;i!=="all"&&(d=d.filter(p=>p.status===i)),a&&(d=d.filter(p=>p.title.toLowerCase().includes(a))),l.innerHTML=jc(d),s()};e.querySelectorAll(".filter-btn").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".filter-btn").forEach(p=>p.classList.remove("active")),d.classList.add("active"),i=d.dataset.filter,u()})}),document.getElementById("all-reviews-search").addEventListener("input",d=>{a=d.target.value.toLowerCase(),u()})}function jc(n){if(n.length===0)return'<div class="empty-state"><div class="empty-icon">📭</div><h3>Нічого не знайдено</h3></div>';const e={done:"✅ Завершено",reading:"📖 Читаю",planned:"⏳ В планах",dropped:"❌ Кинув"},t={done:"status-done",reading:"status-reading",planned:"status-planned",dropped:"status-dropped"};return n.map(r=>{var i;const s=r.status==="dropped"||r.status==="planned";return`<div class="review-card" style="cursor:pointer" data-review-id="${r.id}">
      <div class="review-cover" style="width:80px">
        ${r.coverBase64?`<img src="${r.coverBase64}" alt="${q(r.title)}">`:'<div class="review-cover-placeholder">📖</div>'}
      </div>
      <div class="review-body">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
          <div class="review-date">${r.date?Ta(r.date):rn(r.createdAt)}</div>
          <span class="status-badge ${t[r.status]||""}" style="font-size:0.7rem">${e[r.status]||""}</span>
        </div>
        <div class="review-title">${q(r.title)}</div>
        <div style="margin:6px 0">${r.status==="planned"?'<span style="color:var(--text-muted);font-size:0.8rem">Ще не оцінено</span>':Vt(r.rating,s)}</div>
        ${(i=r.tags)!=null&&i.length?`<div class="review-tags">${r.tags.map(a=>`<span class="tag">${q(a)}</span>`).join("")}</div>`:""}
        ${r.text?`<div class="review-text-preview" style="margin-top:6px">${q(r.text)} <span style="color:var(--accent)">...</span></div>`:""}
      </div>
    </div>`}).join("")}let So=!1;function pw(){document.addEventListener("keydown",t=>{t.key==="Escape"&&document.querySelectorAll(".modal-backdrop").forEach(r=>{const s=r.querySelector(".modal-close, #edit-modal-close2, #del-modal-close2");s?s.click():r.remove()})});const n=document.getElementById("app");n.innerHTML="";const e=document.createElement("div");e.id="page-root",n.appendChild(e),Yv(()=>{bo(),window.scrollTo({top:0,behavior:"smooth"})}),vt("home",()=>iw()),vt("new-review",()=>{if(!Re.currentUser()){ms(()=>Promise.resolve().then(()=>Ss),void 0,import.meta.url).then(t=>t.showAuthModal("login")),window.location.hash="home";return}qc(null)}),vt("edit-review/:id",({id:t})=>{if(!Re.currentUser()){window.location.hash="home";return}qc(t)}),vt("friends",()=>{if(!Re.currentUser()){ms(()=>Promise.resolve().then(()=>Ss),void 0,import.meta.url).then(t=>t.showAuthModal("login")),window.location.hash="home";return}_n()}),vt("account",()=>{if(!Re.currentUser()){ms(()=>Promise.resolve().then(()=>Ss),void 0,import.meta.url).then(t=>t.showAuthModal("login")),window.location.hash="home";return}aw()}),vt("profile/:id",({id:t})=>Ao({id:t})),vt("review/:id",({id:t})=>Ro({id:t})),vt("all-reviews/:userId",({userId:t})=>fw({userId:t})),bo(),So||(Jv(),So=!0)}km($t,async n=>{if(n){const e=await ue.byId(n.uid);Re.setProfile(e?{...e,id:n.uid}:{id:n.uid,username:n.displayName||"User"})}else Re.setProfile(null);So?bo():pw()});
