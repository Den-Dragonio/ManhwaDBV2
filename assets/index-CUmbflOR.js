(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const Jg="modulepreload",Yg=function(r,e){return new URL(r,e).href},Zu={},Rn=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));s=Promise.allSettled(t.map(u=>{if(u=Yg(u,n),u in Zu)return;Zu[u]=!0;const h=u.endsWith(".css"),p=h?'[rel="stylesheet"]':"";if(!!n)for(let b=o.length-1;b>=0;b--){const R=o[b];if(R.href===u&&(!h||R.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${p}`))return;const y=document.createElement("link");if(y.rel=h?"stylesheet":Jg,h||(y.as="script"),y.crossOrigin="",y.href=u,l&&y.setAttribute("nonce",l),document.head.appendChild(y),h)return new Promise((b,R)=>{y.addEventListener("load",b),y.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return s.then(o=>{for(const c of o||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})};var ed={};/**
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
 */const Kh=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Xg=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],c=r[t++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(l>>10)),e[n++]=String.fromCharCode(56320+(l&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Hh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,c=o?r[s+1]:0,l=s+2<r.length,u=l?r[s+2]:0,h=i>>2,p=(i&3)<<4|c>>4;let m=(c&15)<<2|u>>6,y=u&63;l||(y=64,o||(m=64)),n.push(t[h],t[p],t[m],t[y])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Kh(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Xg(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],c=s<r.length?t[r.charAt(s)]:0;++s;const u=s<r.length?t[r.charAt(s)]:64;++s;const p=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||c==null||u==null||p==null)throw new Zg;const m=i<<2|c>>4;if(n.push(m),u!==64){const y=c<<4&240|u>>2;if(n.push(y),p!==64){const b=u<<6&192|p;n.push(b)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Zg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ey=function(r){const e=Kh(r);return Hh.encodeByteArray(e,!0)},Lo=function(r){return ey(r).replace(/\./g,"")},Wh=function(r){try{return Hh.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function ty(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const ny=()=>ty().__FIREBASE_DEFAULTS__,ry=()=>{if(typeof process>"u"||typeof ed>"u")return;const r=ed.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},sy=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Wh(r[1]);return e&&JSON.parse(e)},na=()=>{try{return ny()||ry()||sy()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Qh=r=>{var e,t;return(t=(e=na())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},iy=r=>{const e=Qh(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Jh=()=>{var r;return(r=na())===null||r===void 0?void 0:r.config},Yh=r=>{var e;return(e=na())===null||e===void 0?void 0:e[`_${r}`]};/**
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
 */class oy{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
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
 */function ay(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},r);return[Lo(JSON.stringify(t)),Lo(JSON.stringify(o)),""].join(".")}/**
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
 */function Be(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function cy(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Be())}function ly(){var r;const e=(r=na())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function uy(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function dy(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function hy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function fy(){const r=Be();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Xh(){return!ly()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Zh(){try{return typeof indexedDB=="object"}catch{return!1}}function py(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const my="FirebaseError";class rn extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=my,Object.setPrototypeOf(this,rn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Si.prototype.create)}}class Si{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?gy(i,n):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new rn(s,c,n)}}function gy(r,e){return r.replace(yy,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const yy=/\{\$([^}]+)}/g;function _y(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function Dn(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(td(i)&&td(o)){if(!Dn(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function td(r){return r!==null&&typeof r=="object"}/**
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
 */function Ri(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Xs(r){const e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[s,i]=n.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Zs(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function vy(r,e){const t=new wy(r,e);return t.subscribe.bind(t)}class wy{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");Iy(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=Wa),s.error===void 0&&(s.error=Wa),s.complete===void 0&&(s.complete=Wa);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Iy(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Wa(){}/**
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
 */function ue(r){return r&&r._delegate?r._delegate:r}class yr{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const ar="[DEFAULT]";/**
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
 */class Ey{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new oy;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ty(e))try{this.getOrInitializeService({instanceIdentifier:ar})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=ar){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ar){return this.instances.has(e)}getOptions(e=ar){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&o.resolve(s)}return s}onInit(e,t){var n;const s=this.normalizeInstanceIdentifier(t),i=(n=this.onInitCallbacks.get(s))!==null&&n!==void 0?n:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:by(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=ar){return this.component?this.component.multipleInstances?e:ar:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function by(r){return r===ar?void 0:r}function Ty(r){return r.instantiationMode==="EAGER"}/**
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
 */class Ay{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ey(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var te;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(te||(te={}));const Sy={debug:te.DEBUG,verbose:te.VERBOSE,info:te.INFO,warn:te.WARN,error:te.ERROR,silent:te.SILENT},Ry=te.INFO,Py={[te.DEBUG]:"log",[te.VERBOSE]:"log",[te.INFO]:"info",[te.WARN]:"warn",[te.ERROR]:"error"},xy=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=Py[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class zc{constructor(e){this.name=e,this._logLevel=Ry,this._logHandler=xy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in te))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Sy[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,te.DEBUG,...e),this._logHandler(this,te.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,te.VERBOSE,...e),this._logHandler(this,te.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,te.INFO,...e),this._logHandler(this,te.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,te.WARN,...e),this._logHandler(this,te.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,te.ERROR,...e),this._logHandler(this,te.ERROR,...e)}}const Cy=(r,e)=>e.some(t=>r instanceof t);let nd,rd;function ky(){return nd||(nd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Vy(){return rd||(rd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ef=new WeakMap,cc=new WeakMap,tf=new WeakMap,Qa=new WeakMap,Gc=new WeakMap;function Dy(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(Cn(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&ef.set(t,r)}).catch(()=>{}),Gc.set(e,r),e}function Ny(r){if(cc.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});cc.set(r,e)}let lc={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return cc.get(r);if(e==="objectStoreNames")return r.objectStoreNames||tf.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Cn(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Ly(r){lc=r(lc)}function Oy(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(Ja(this),e,...t);return tf.set(n,e.sort?e.sort():[e]),Cn(n)}:Vy().includes(r)?function(...e){return r.apply(Ja(this),e),Cn(ef.get(this))}:function(...e){return Cn(r.apply(Ja(this),e))}}function My(r){return typeof r=="function"?Oy(r):(r instanceof IDBTransaction&&Ny(r),Cy(r,ky())?new Proxy(r,lc):r)}function Cn(r){if(r instanceof IDBRequest)return Dy(r);if(Qa.has(r))return Qa.get(r);const e=My(r);return e!==r&&(Qa.set(r,e),Gc.set(e,r)),e}const Ja=r=>Gc.get(r);function Fy(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),c=Cn(o);return n&&o.addEventListener("upgradeneeded",l=>{n(Cn(o.result),l.oldVersion,l.newVersion,Cn(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),c}const By=["get","getKey","getAll","getAllKeys","count"],$y=["put","add","delete","clear"],Ya=new Map;function sd(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Ya.get(e))return Ya.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=$y.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||By.includes(t)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let u=l.store;return n&&(u=u.index(c.shift())),(await Promise.all([u[t](...c),s&&l.done]))[0]};return Ya.set(e,i),i}Ly(r=>({...r,get:(e,t,n)=>sd(e,t)||r.get(e,t,n),has:(e,t)=>!!sd(e,t)||r.has(e,t)}));/**
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
 */class Uy{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(qy(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function qy(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const uc="@firebase/app",id="0.10.13";/**
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
 */const Zt=new zc("@firebase/app"),jy="@firebase/app-compat",zy="@firebase/analytics-compat",Gy="@firebase/analytics",Ky="@firebase/app-check-compat",Hy="@firebase/app-check",Wy="@firebase/auth",Qy="@firebase/auth-compat",Jy="@firebase/database",Yy="@firebase/data-connect",Xy="@firebase/database-compat",Zy="@firebase/functions",e_="@firebase/functions-compat",t_="@firebase/installations",n_="@firebase/installations-compat",r_="@firebase/messaging",s_="@firebase/messaging-compat",i_="@firebase/performance",o_="@firebase/performance-compat",a_="@firebase/remote-config",c_="@firebase/remote-config-compat",l_="@firebase/storage",u_="@firebase/storage-compat",d_="@firebase/firestore",h_="@firebase/vertexai-preview",f_="@firebase/firestore-compat",p_="firebase",m_="10.14.1";/**
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
 */const Oo="[DEFAULT]",g_={[uc]:"fire-core",[jy]:"fire-core-compat",[Gy]:"fire-analytics",[zy]:"fire-analytics-compat",[Hy]:"fire-app-check",[Ky]:"fire-app-check-compat",[Wy]:"fire-auth",[Qy]:"fire-auth-compat",[Jy]:"fire-rtdb",[Yy]:"fire-data-connect",[Xy]:"fire-rtdb-compat",[Zy]:"fire-fn",[e_]:"fire-fn-compat",[t_]:"fire-iid",[n_]:"fire-iid-compat",[r_]:"fire-fcm",[s_]:"fire-fcm-compat",[i_]:"fire-perf",[o_]:"fire-perf-compat",[a_]:"fire-rc",[c_]:"fire-rc-compat",[l_]:"fire-gcs",[u_]:"fire-gcs-compat",[d_]:"fire-fst",[f_]:"fire-fst-compat",[h_]:"fire-vertex","fire-js":"fire-js",[p_]:"fire-js-all"};/**
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
 */const Mo=new Map,y_=new Map,dc=new Map;function od(r,e){try{r.container.addComponent(e)}catch(t){Zt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function es(r){const e=r.name;if(dc.has(e))return Zt.debug(`There were multiple attempts to register component ${e}.`),!1;dc.set(e,r);for(const t of Mo.values())od(t,r);for(const t of y_.values())od(t,r);return!0}function Pi(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function __(r,e,t=Oo){Pi(r,e).clearInstance(t)}function Nt(r){return r.settings!==void 0}/**
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
 */const v_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},kn=new Si("app","Firebase",v_);/**
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
 */class w_{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new yr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw kn.create("app-deleted",{appName:this._name})}}/**
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
 */const Is=m_;function nf(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n=Object.assign({name:Oo,automaticDataCollectionEnabled:!1},e),s=n.name;if(typeof s!="string"||!s)throw kn.create("bad-app-name",{appName:String(s)});if(t||(t=Jh()),!t)throw kn.create("no-options");const i=Mo.get(s);if(i){if(Dn(t,i.options)&&Dn(n,i.config))return i;throw kn.create("duplicate-app",{appName:s})}const o=new Ay(s);for(const l of dc.values())o.addComponent(l);const c=new w_(t,n,o);return Mo.set(s,c),c}function rf(r=Oo){const e=Mo.get(r);if(!e&&r===Oo&&Jh())return nf();if(!e)throw kn.create("no-app",{appName:r});return e}function Vn(r,e,t){var n;let s=(n=g_[r])!==null&&n!==void 0?n:r;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Zt.warn(c.join(" "));return}es(new yr(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const I_="firebase-heartbeat-database",E_=1,pi="firebase-heartbeat-store";let Xa=null;function sf(){return Xa||(Xa=Fy(I_,E_,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(pi)}catch(t){console.warn(t)}}}}).catch(r=>{throw kn.create("idb-open",{originalErrorMessage:r.message})})),Xa}async function b_(r){try{const t=(await sf()).transaction(pi),n=await t.objectStore(pi).get(of(r));return await t.done,n}catch(e){if(e instanceof rn)Zt.warn(e.message);else{const t=kn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Zt.warn(t.message)}}}async function ad(r,e){try{const n=(await sf()).transaction(pi,"readwrite");await n.objectStore(pi).put(e,of(r)),await n.done}catch(t){if(t instanceof rn)Zt.warn(t.message);else{const n=kn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Zt.warn(n.message)}}}function of(r){return`${r.name}!${r.options.appId}`}/**
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
 */const T_=1024,A_=30*24*60*60*1e3;class S_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new P_(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=cd();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const c=new Date(o.date).valueOf();return Date.now()-c<=A_}),this._storage.overwrite(this._heartbeatsCache))}catch(n){Zt.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=cd(),{heartbeatsToSend:n,unsentEntries:s}=R_(this._heartbeatsCache.heartbeats),i=Lo(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Zt.warn(t),""}}}function cd(){return new Date().toISOString().substring(0,10)}function R_(r,e=T_){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),ld(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ld(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class P_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Zh()?py().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await b_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return ad(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return ad(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ld(r){return Lo(JSON.stringify({version:2,heartbeats:r})).length}/**
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
 */function x_(r){es(new yr("platform-logger",e=>new Uy(e),"PRIVATE")),es(new yr("heartbeat",e=>new S_(e),"PRIVATE")),Vn(uc,id,r),Vn(uc,id,"esm2017"),Vn("fire-js","")}x_("");function Kc(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(t[n[s]]=r[n[s]]);return t}function af(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const C_=af,cf=new Si("auth","Firebase",af());/**
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
 */const Fo=new zc("@firebase/auth");function k_(r,...e){Fo.logLevel<=te.WARN&&Fo.warn(`Auth (${Is}): ${r}`,...e)}function Eo(r,...e){Fo.logLevel<=te.ERROR&&Fo.error(`Auth (${Is}): ${r}`,...e)}/**
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
 */function kt(r,...e){throw Hc(r,...e)}function Bt(r,...e){return Hc(r,...e)}function lf(r,e,t){const n=Object.assign(Object.assign({},C_()),{[e]:t});return new Si("auth","Firebase",n).create(e,{appName:r.name})}function Yt(r){return lf(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Hc(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return cf.create(r,...e)}function Q(r,e,...t){if(!r)throw Hc(e,...t)}function Ht(r){const e="INTERNAL ASSERTION FAILED: "+r;throw Eo(e),new Error(e)}function en(r,e){r||Ht(e)}/**
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
 */function hc(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function V_(){return ud()==="http:"||ud()==="https:"}function ud(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
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
 */function D_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(V_()||dy()||"connection"in navigator)?navigator.onLine:!0}function N_(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
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
 */class xi{constructor(e,t){this.shortDelay=e,this.longDelay=t,en(t>e,"Short delay should be less than long delay!"),this.isMobile=cy()||hy()}get(){return D_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Wc(r,e){en(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class uf{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ht("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ht("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ht("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const L_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const O_=new xi(3e4,6e4);function Gn(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function sn(r,e,t,n,s={}){return df(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const c=Ri(Object.assign({key:r.config.apiKey},o)).slice(1),l=await r._getAdditionalHeaders();l["Content-Type"]="application/json",r.languageCode&&(l["X-Firebase-Locale"]=r.languageCode);const u=Object.assign({method:e,headers:l},i);return uy()||(u.referrerPolicy="no-referrer"),uf.fetch()(hf(r,r.config.apiHost,t,c),u)})}async function df(r,e,t){r._canInitEmulator=!1;const n=Object.assign(Object.assign({},L_),e);try{const s=new F_(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw fo(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,u]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw fo(r,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw fo(r,"email-already-in-use",o);if(l==="USER_DISABLED")throw fo(r,"user-disabled",o);const h=n[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw lf(r,h,u);kt(r,h)}}catch(s){if(s instanceof rn)throw s;kt(r,"network-request-failed",{message:String(s)})}}async function Ci(r,e,t,n,s={}){const i=await sn(r,e,t,n,s);return"mfaPendingCredential"in i&&kt(r,"multi-factor-auth-required",{_serverResponse:i}),i}function hf(r,e,t,n){const s=`${e}${t}?${n}`;return r.config.emulator?Wc(r.config,s):`${r.config.apiScheme}://${s}`}function M_(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class F_{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(Bt(this.auth,"network-request-failed")),O_.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function fo(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=Bt(r,e,n);return s.customData._tokenResponse=t,s}function dd(r){return r!==void 0&&r.enterprise!==void 0}class B_{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return M_(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function $_(r,e){return sn(r,"GET","/v2/recaptchaConfig",Gn(r,e))}/**
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
 */async function U_(r,e){return sn(r,"POST","/v1/accounts:delete",e)}async function ff(r,e){return sn(r,"POST","/v1/accounts:lookup",e)}/**
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
 */function ai(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function q_(r,e=!1){const t=ue(r),n=await t.getIdToken(e),s=Qc(n);Q(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:n,authTime:ai(Za(s.auth_time)),issuedAtTime:ai(Za(s.iat)),expirationTime:ai(Za(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Za(r){return Number(r)*1e3}function Qc(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return Eo("JWT malformed, contained fewer than 3 sections"),null;try{const s=Wh(t);return s?JSON.parse(s):(Eo("Failed to decode base64 JWT payload"),null)}catch(s){return Eo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function hd(r){const e=Qc(r);return Q(e,"internal-error"),Q(typeof e.exp<"u","internal-error"),Q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ts(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof rn&&j_(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function j_({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
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
 */class z_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class fc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ai(this.lastLoginAt),this.creationTime=ai(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Bo(r){var e;const t=r.auth,n=await r.getIdToken(),s=await ts(r,ff(t,{idToken:n}));Q(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];r._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?pf(i.providerUserInfo):[],c=K_(r.providerData,o),l=r.isAnonymous,u=!(r.email&&i.passwordHash)&&!(c!=null&&c.length),h=l?u:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new fc(i.createdAt,i.lastLoginAt),isAnonymous:h};Object.assign(r,p)}async function G_(r){const e=ue(r);await Bo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function K_(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function pf(r){return r.map(e=>{var{providerId:t}=e,n=Kc(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
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
 */async function H_(r,e){const t=await df(r,{},async()=>{const n=Ri({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=hf(r,s,"/v1/token",`key=${i}`),c=await r._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",uf.fetch()(o,{method:"POST",headers:c,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function W_(r,e){return sn(r,"POST","/v2/accounts:revokeToken",Gn(r,e))}/**
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
 */class Qr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Q(e.idToken,"internal-error"),Q(typeof e.idToken<"u","internal-error"),Q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):hd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Q(e.length!==0,"internal-error");const t=hd(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await H_(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new Qr;return n&&(Q(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(Q(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(Q(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Qr,this.toJSON())}_performRefresh(){return Ht("not implemented")}}/**
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
 */function pn(r,e){Q(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class Wt{constructor(e){var{uid:t,auth:n,stsTokenManager:s}=e,i=Kc(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new z_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new fc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await ts(this,this.stsTokenManager.getToken(this.auth,e));return Q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return q_(this,e)}reload(){return G_(this)}_assign(e){this!==e&&(Q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Wt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Bo(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Nt(this.auth.app))return Promise.reject(Yt(this.auth));const e=await this.getIdToken();return await ts(this,U_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,s,i,o,c,l,u,h;const p=(n=t.displayName)!==null&&n!==void 0?n:void 0,m=(s=t.email)!==null&&s!==void 0?s:void 0,y=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,b=(o=t.photoURL)!==null&&o!==void 0?o:void 0,R=(c=t.tenantId)!==null&&c!==void 0?c:void 0,A=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,k=(u=t.createdAt)!==null&&u!==void 0?u:void 0,D=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:N,emailVerified:z,isAnonymous:M,providerData:U,stsTokenManager:E}=t;Q(N&&E,e,"internal-error");const _=Qr.fromJSON(this.name,E);Q(typeof N=="string",e,"internal-error"),pn(p,e.name),pn(m,e.name),Q(typeof z=="boolean",e,"internal-error"),Q(typeof M=="boolean",e,"internal-error"),pn(y,e.name),pn(b,e.name),pn(R,e.name),pn(A,e.name),pn(k,e.name),pn(D,e.name);const w=new Wt({uid:N,auth:e,email:m,emailVerified:z,displayName:p,isAnonymous:M,photoURL:b,phoneNumber:y,tenantId:R,stsTokenManager:_,createdAt:k,lastLoginAt:D});return U&&Array.isArray(U)&&(w.providerData=U.map(T=>Object.assign({},T))),A&&(w._redirectEventId=A),w}static async _fromIdTokenResponse(e,t,n=!1){const s=new Qr;s.updateFromServerResponse(t);const i=new Wt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Bo(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];Q(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?pf(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Qr;c.updateFromIdToken(n);const l=new Wt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new fc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,u),l}}/**
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
 */const fd=new Map;function Qt(r){en(r instanceof Function,"Expected a class definition");let e=fd.get(r);return e?(en(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,fd.set(r,e),e)}/**
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
 */class mf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}mf.type="NONE";const pd=mf;/**
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
 */function bo(r,e,t){return`firebase:${r}:${e}:${t}`}class Jr{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=bo(this.userKey,s.apiKey,i),this.fullPersistenceKey=bo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Wt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Jr(Qt(pd),e,n);const s=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||Qt(pd);const o=bo(n,e.config.apiKey,e.name);let c=null;for(const u of t)try{const h=await u._get(o);if(h){const p=Wt._fromJSON(e,h);u!==i&&(c=p),i=u;break}}catch{}const l=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Jr(i,e,n):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new Jr(i,e,n))}}/**
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
 */function md(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(vf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(gf(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(If(e))return"Blackberry";if(Ef(e))return"Webos";if(yf(e))return"Safari";if((e.includes("chrome/")||_f(e))&&!e.includes("edge/"))return"Chrome";if(wf(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function gf(r=Be()){return/firefox\//i.test(r)}function yf(r=Be()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function _f(r=Be()){return/crios\//i.test(r)}function vf(r=Be()){return/iemobile/i.test(r)}function wf(r=Be()){return/android/i.test(r)}function If(r=Be()){return/blackberry/i.test(r)}function Ef(r=Be()){return/webos/i.test(r)}function Jc(r=Be()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function Q_(r=Be()){var e;return Jc(r)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function J_(){return fy()&&document.documentMode===10}function bf(r=Be()){return Jc(r)||wf(r)||Ef(r)||If(r)||/windows phone/i.test(r)||vf(r)}/**
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
 */function Tf(r,e=[]){let t;switch(r){case"Browser":t=md(Be());break;case"Worker":t=`${md(Be())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Is}/${n}`}/**
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
 */class Y_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
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
 */async function X_(r,e={}){return sn(r,"GET","/v2/passwordPolicy",Gn(r,e))}/**
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
 */const Z_=6;class ev{constructor(e){var t,n,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Z_,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,s,i,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(n=l.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class tv{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new gd(this),this.idTokenSubscription=new gd(this),this.beforeStateQueue=new Y_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=cf,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Qt(t)),this._initializationPromise=this.queue(async()=>{var n,s;if(!this._deleted&&(this.persistenceManager=await Jr.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ff(this,{idToken:e}),n=await Wt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Nt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&(l!=null&&l.user)&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Bo(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=N_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Nt(this.app))return Promise.reject(Yt(this));const t=e?ue(e):null;return t&&Q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Nt(this.app)?Promise.reject(Yt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Nt(this.app)?Promise.reject(Yt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Qt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await X_(this),t=new ev(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Si("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await W_(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Qt(e)||this._popupRedirectResolver;Q(t,this,"argument-error"),this.redirectPersistenceManager=await Jr.create(this,[Qt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,n,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Tf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&k_(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Cr(r){return ue(r)}class gd{constructor(e){this.auth=e,this.observer=null,this.addObserver=vy(t=>this.observer=t)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ra={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function nv(r){ra=r}function Af(r){return ra.loadJS(r)}function rv(){return ra.recaptchaEnterpriseScript}function sv(){return ra.gapiScript}function iv(r){return`__${r}${Math.floor(Math.random()*1e6)}`}const ov="recaptcha-enterprise",av="NO_RECAPTCHA";class cv{constructor(e){this.type=ov,this.auth=Cr(e)}async verify(e="verify",t=!1){async function n(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{$_(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const u=new B_(l);return i.tenantId==null?i._agentRecaptchaConfig=u:i._tenantRecaptchaConfigs[i.tenantId]=u,o(u.siteKey)}}).catch(l=>{c(l)})})}function s(i,o,c){const l=window.grecaptcha;dd(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(u=>{o(u)}).catch(()=>{o(av)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{n(this.auth).then(c=>{if(!t&&dd(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=rv();l.length!==0&&(l+=c),Af(l).then(()=>{s(c,i,o)}).catch(u=>{o(u)})}}).catch(c=>{o(c)})})}}async function yd(r,e,t,n=!1){const s=new cv(r);let i;try{i=await s.verify(t)}catch{i=await s.verify(t,!0)}const o=Object.assign({},e);return n?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function pc(r,e,t,n){var s;if(!((s=r._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await yd(r,e,t,t==="getOobCode");return n(r,i)}else return n(r,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await yd(r,e,t,t==="getOobCode");return n(r,o)}else return Promise.reject(i)})}/**
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
 */function lv(r,e){const t=Pi(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Dn(i,e??{}))return s;kt(s,"already-initialized")}return t.initialize({options:e})}function uv(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(Qt);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function dv(r,e,t){const n=Cr(r);Q(n._canInitEmulator,n,"emulator-config-failed"),Q(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=Sf(e),{host:o,port:c}=hv(e),l=c===null?"":`:${c}`;n.config.emulator={url:`${i}//${o}${l}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),fv()}function Sf(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function hv(r){const e=Sf(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:_d(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:_d(o)}}}function _d(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function fv(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
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
 */class Yc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ht("not implemented")}_getIdTokenResponse(e){return Ht("not implemented")}_linkToIdToken(e,t){return Ht("not implemented")}_getReauthenticationResolver(e){return Ht("not implemented")}}async function pv(r,e){return sn(r,"POST","/v1/accounts:update",e)}async function mv(r,e){return sn(r,"POST","/v1/accounts:signUp",e)}/**
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
 */async function gv(r,e){return Ci(r,"POST","/v1/accounts:signInWithPassword",Gn(r,e))}/**
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
 */async function yv(r,e){return Ci(r,"POST","/v1/accounts:signInWithEmailLink",Gn(r,e))}async function _v(r,e){return Ci(r,"POST","/v1/accounts:signInWithEmailLink",Gn(r,e))}/**
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
 */class mi extends Yc{constructor(e,t,n,s=null){super("password",n),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new mi(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new mi(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return pc(e,t,"signInWithPassword",gv);case"emailLink":return yv(e,{email:this._email,oobCode:this._password});default:kt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return pc(e,n,"signUpPassword",mv);case"emailLink":return _v(e,{idToken:t,email:this._email,oobCode:this._password});default:kt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Yr(r,e){return Ci(r,"POST","/v1/accounts:signInWithIdp",Gn(r,e))}/**
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
 */const vv="http://localhost";class _r extends Yc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new _r(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):kt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s}=t,i=Kc(t,["providerId","signInMethod"]);if(!n||!s)return null;const o=new _r(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Yr(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Yr(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Yr(e,t)}buildRequest(){const e={requestUri:vv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ri(t)}return e}}/**
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
 */function wv(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Iv(r){const e=Xs(Zs(r)).link,t=e?Xs(Zs(e)).deep_link_id:null,n=Xs(Zs(r)).deep_link_id;return(n?Xs(Zs(n)).link:null)||n||t||e||r}class Xc{constructor(e){var t,n,s,i,o,c;const l=Xs(Zs(e)),u=(t=l.apiKey)!==null&&t!==void 0?t:null,h=(n=l.oobCode)!==null&&n!==void 0?n:null,p=wv((s=l.mode)!==null&&s!==void 0?s:null);Q(u&&h&&p,"argument-error"),this.apiKey=u,this.operation=p,this.code=h,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Iv(e);try{return new Xc(t)}catch{return null}}}/**
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
 */class Kn{constructor(){this.providerId=Kn.PROVIDER_ID}static credential(e,t){return mi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Xc.parseLink(t);return Q(n,"argument-error"),mi._fromEmailAndCode(e,n.code,n.tenantId)}}Kn.PROVIDER_ID="password";Kn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Kn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Rf{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ki extends Rf{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class wn extends ki{constructor(){super("facebook.com")}static credential(e){return _r._fromParams({providerId:wn.PROVIDER_ID,signInMethod:wn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return wn.credentialFromTaggedObject(e)}static credentialFromError(e){return wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return wn.credential(e.oauthAccessToken)}catch{return null}}}wn.FACEBOOK_SIGN_IN_METHOD="facebook.com";wn.PROVIDER_ID="facebook.com";/**
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
 */class In extends ki{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return _r._fromParams({providerId:In.PROVIDER_ID,signInMethod:In.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return In.credentialFromTaggedObject(e)}static credentialFromError(e){return In.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return In.credential(t,n)}catch{return null}}}In.GOOGLE_SIGN_IN_METHOD="google.com";In.PROVIDER_ID="google.com";/**
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
 */class En extends ki{constructor(){super("github.com")}static credential(e){return _r._fromParams({providerId:En.PROVIDER_ID,signInMethod:En.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return En.credentialFromTaggedObject(e)}static credentialFromError(e){return En.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return En.credential(e.oauthAccessToken)}catch{return null}}}En.GITHUB_SIGN_IN_METHOD="github.com";En.PROVIDER_ID="github.com";/**
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
 */class bn extends ki{constructor(){super("twitter.com")}static credential(e,t){return _r._fromParams({providerId:bn.PROVIDER_ID,signInMethod:bn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return bn.credentialFromTaggedObject(e)}static credentialFromError(e){return bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return bn.credential(t,n)}catch{return null}}}bn.TWITTER_SIGN_IN_METHOD="twitter.com";bn.PROVIDER_ID="twitter.com";/**
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
 */async function Ev(r,e){return Ci(r,"POST","/v1/accounts:signUp",Gn(r,e))}/**
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
 */class vr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await Wt._fromIdTokenResponse(e,n,s),o=vd(n);return new vr({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=vd(n);return new vr({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function vd(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
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
 */class $o extends rn{constructor(e,t,n,s){var i;super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,$o.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new $o(e,t,n,s)}}function Pf(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?$o._fromErrorAndOperation(r,i,e,n):i})}async function bv(r,e,t=!1){const n=await ts(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return vr._forOperation(r,"link",n)}/**
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
 */async function xf(r,e,t=!1){const{auth:n}=r;if(Nt(n.app))return Promise.reject(Yt(n));const s="reauthenticate";try{const i=await ts(r,Pf(n,s,e,r),t);Q(i.idToken,n,"internal-error");const o=Qc(i.idToken);Q(o,n,"internal-error");const{sub:c}=o;return Q(r.uid===c,n,"user-mismatch"),vr._forOperation(r,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&kt(n,"user-mismatch"),i}}/**
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
 */async function Cf(r,e,t=!1){if(Nt(r.app))return Promise.reject(Yt(r));const n="signIn",s=await Pf(r,n,e),i=await vr._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}async function Tv(r,e){return Cf(Cr(r),e)}async function kf(r,e){return xf(ue(r),e)}/**
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
 */async function Vf(r){const e=Cr(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Av(r,e,t){if(Nt(r.app))return Promise.reject(Yt(r));const n=Cr(r),o=await pc(n,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Ev).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&Vf(r),l}),c=await vr._fromIdTokenResponse(n,"signIn",o);return await n._updateCurrentUser(c.user),c}function Sv(r,e,t){return Nt(r.app)?Promise.reject(Yt(r)):Tv(ue(r),Kn.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&Vf(r),n})}function Rv(r,e){return Pv(ue(r),null,e)}async function Pv(r,e,t){const{auth:n}=r,i={idToken:await r.getIdToken(),returnSecureToken:!0};t&&(i.password=t);const o=await ts(r,pv(n,i));await r._updateTokensIfNecessary(o,!0)}function xv(r,e,t,n){return ue(r).onIdTokenChanged(e,t,n)}function Cv(r,e,t){return ue(r).beforeAuthStateChanged(e,t)}function kv(r,e,t,n){return ue(r).onAuthStateChanged(e,t,n)}function Vv(r){return ue(r).signOut()}async function mc(r){return ue(r).delete()}const Uo="__sak";/**
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
 */class Df{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Uo,"1"),this.storage.removeItem(Uo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Dv=1e3,Nv=10;class Nf extends Df{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=bf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);J_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Nv):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},Dv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Nf.type="LOCAL";const Lv=Nf;/**
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
 */class Lf extends Df{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Lf.type="SESSION";const Of=Lf;/**
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
 */function Ov(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class sa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new sa(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(o).map(async u=>u(t.origin,i)),l=await Ov(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}sa.receivers=[];/**
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
 */function Zc(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
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
 */class Mv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const u=Zc("",20);s.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===u)switch(m.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(m.data.response);break;default:clearTimeout(h),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function $t(){return window}function Fv(r){$t().location.href=r}/**
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
 */function Mf(){return typeof $t().WorkerGlobalScope<"u"&&typeof $t().importScripts=="function"}async function Bv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $v(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function Uv(){return Mf()?self:null}/**
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
 */const Ff="firebaseLocalStorageDb",qv=1,qo="firebaseLocalStorage",Bf="fbase_key";class Vi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ia(r,e){return r.transaction([qo],e?"readwrite":"readonly").objectStore(qo)}function jv(){const r=indexedDB.deleteDatabase(Ff);return new Vi(r).toPromise()}function gc(){const r=indexedDB.open(Ff,qv);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(qo,{keyPath:Bf})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(qo)?e(n):(n.close(),await jv(),e(await gc()))})})}async function wd(r,e,t){const n=ia(r,!0).put({[Bf]:e,value:t});return new Vi(n).toPromise()}async function zv(r,e){const t=ia(r,!1).get(e),n=await new Vi(t).toPromise();return n===void 0?null:n.value}function Id(r,e){const t=ia(r,!0).delete(e);return new Vi(t).toPromise()}const Gv=800,Kv=3;class $f{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await gc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>Kv)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Mf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=sa._getInstance(Uv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Bv(),!this.activeServiceWorker)return;this.sender=new Mv(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((t=n[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$v()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await gc();return await wd(e,Uo,"1"),await Id(e,Uo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>wd(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>zv(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Id(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ia(s,!1).getAll();return new Vi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Gv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}$f.type="LOCAL";const Hv=$f;new xi(3e4,6e4);/**
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
 */function Wv(r,e){return e?Qt(e):(Q(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
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
 */class el extends Yc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Yr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Yr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Yr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Qv(r){return Cf(r.auth,new el(r),r.bypassAuthState)}function Jv(r){const{auth:e,user:t}=r;return Q(t,e,"internal-error"),xf(t,new el(r),r.bypassAuthState)}async function Yv(r){const{auth:e,user:t}=r;return Q(t,e,"internal-error"),bv(t,new el(r),r.bypassAuthState)}/**
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
 */class Uf{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Qv;case"linkViaPopup":case"linkViaRedirect":return Yv;case"reauthViaPopup":case"reauthViaRedirect":return Jv;default:kt(this.auth,"internal-error")}}resolve(e){en(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){en(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Xv=new xi(2e3,1e4);class Wr extends Uf{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,Wr.currentPopupAction&&Wr.currentPopupAction.cancel(),Wr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Q(e,this.auth,"internal-error"),e}async onExecution(){en(this.filter.length===1,"Popup operations only handle one event");const e=Zc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Bt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Bt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Wr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Bt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Xv.get())};e()}}Wr.currentPopupAction=null;/**
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
 */const Zv="pendingRedirect",To=new Map;class ew extends Uf{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=To.get(this.auth._key());if(!e){try{const n=await tw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}To.set(this.auth._key(),e)}return this.bypassAuthState||To.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tw(r,e){const t=sw(e),n=rw(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function nw(r,e){To.set(r._key(),e)}function rw(r){return Qt(r._redirectPersistence)}function sw(r){return bo(Zv,r.config.apiKey,r.name)}async function iw(r,e,t=!1){if(Nt(r.app))return Promise.reject(Yt(r));const n=Cr(r),s=Wv(n,e),o=await new ew(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
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
 */const ow=10*60*1e3;class aw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!qf(e)){const s=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";t.onError(Bt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ow&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ed(e))}saveEventToCache(e){this.cachedEventUids.add(Ed(e)),this.lastProcessedEventTime=Date.now()}}function Ed(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function qf({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function cw(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return qf(r);default:return!1}}/**
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
 */async function lw(r,e={}){return sn(r,"GET","/v1/projects",e)}/**
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
 */const uw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,dw=/^https?/;async function hw(r){if(r.config.emulator)return;const{authorizedDomains:e}=await lw(r);for(const t of e)try{if(fw(t))return}catch{}kt(r,"unauthorized-domain")}function fw(r){const e=hc(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!dw.test(t))return!1;if(uw.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
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
 */const pw=new xi(3e4,6e4);function bd(){const r=$t().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function mw(r){return new Promise((e,t)=>{var n,s,i;function o(){bd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{bd(),t(Bt(r,"network-request-failed"))},timeout:pw.get()})}if(!((s=(n=$t().gapi)===null||n===void 0?void 0:n.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=$t().gapi)===null||i===void 0)&&i.load)o();else{const c=iv("iframefcb");return $t()[c]=()=>{gapi.load?o():t(Bt(r,"network-request-failed"))},Af(`${sv()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Ao=null,e})}let Ao=null;function gw(r){return Ao=Ao||mw(r),Ao}/**
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
 */const yw=new xi(5e3,15e3),_w="__/auth/iframe",vw="emulator/auth/iframe",ww={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Iw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Ew(r){const e=r.config;Q(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?Wc(e,vw):`https://${r.config.authDomain}/${_w}`,n={apiKey:e.apiKey,appName:r.name,v:Is},s=Iw.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${Ri(n).slice(1)}`}async function bw(r){const e=await gw(r),t=$t().gapi;return Q(t,r,"internal-error"),e.open({where:document.body,url:Ew(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ww,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=Bt(r,"network-request-failed"),c=$t().setTimeout(()=>{i(o)},yw.get());function l(){$t().clearTimeout(c),s(n)}n.ping(l).then(l,()=>{i(o)})}))}/**
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
 */const Tw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Aw=500,Sw=600,Rw="_blank",Pw="http://localhost";class Td{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function xw(r,e,t,n=Aw,s=Sw){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const l=Object.assign(Object.assign({},Tw),{width:n.toString(),height:s.toString(),top:i,left:o}),u=Be().toLowerCase();t&&(c=_f(u)?Rw:t),gf(u)&&(e=e||Pw,l.scrollbars="yes");const h=Object.entries(l).reduce((m,[y,b])=>`${m}${y}=${b},`,"");if(Q_(u)&&c!=="_self")return Cw(e||"",c),new Td(null);const p=window.open(e||"",c,h);Q(p,r,"popup-blocked");try{p.focus()}catch{}return new Td(p)}function Cw(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
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
 */const kw="__/auth/handler",Vw="emulator/auth/handler",Dw=encodeURIComponent("fac");async function Ad(r,e,t,n,s,i){Q(r.config.authDomain,r,"auth-domain-config-required"),Q(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Is,eventId:s};if(e instanceof Rf){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",_y(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,p]of Object.entries({}))o[h]=p}if(e instanceof ki){const h=e.getScopes().filter(p=>p!=="");h.length>0&&(o.scopes=h.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const h of Object.keys(c))c[h]===void 0&&delete c[h];const l=await r._getAppCheckToken(),u=l?`#${Dw}=${encodeURIComponent(l)}`:"";return`${Nw(r)}?${Ri(c).slice(1)}${u}`}function Nw({config:r}){return r.emulator?Wc(r,Vw):`https://${r.authDomain}/${kw}`}/**
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
 */const ec="webStorageSupport";class Lw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Of,this._completeRedirectFn=iw,this._overrideRedirectResult=nw}async _openPopup(e,t,n,s){var i;en((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Ad(e,t,n,hc(),s);return xw(e,o,Zc())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await Ad(e,t,n,hc(),s);return Fv(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(en(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await bw(e),n=new aw(e);return t.register("authEvent",s=>(Q(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ec,{type:ec},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[ec];o!==void 0&&t(!!o),kt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return bf()||yf()||Jc()}}const Ow=Lw;var Sd="@firebase/auth",Rd="1.7.9";/**
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
 */class Mw{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Fw(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Bw(r){es(new yr("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;Q(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const l={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Tf(r)},u=new tv(n,s,i,l);return uv(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),es(new yr("auth-internal",e=>{const t=Cr(e.getProvider("auth").getImmediate());return(n=>new Mw(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Vn(Sd,Rd,Fw(r)),Vn(Sd,Rd,"esm2017")}/**
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
 */const $w=5*60,Uw=Yh("authIdTokenMaxAge")||$w;let Pd=null;const qw=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>Uw)return;const s=t==null?void 0:t.token;Pd!==s&&(Pd=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function jw(r=rf()){const e=Pi(r,"auth");if(e.isInitialized())return e.getImmediate();const t=lv(r,{popupRedirectResolver:Ow,persistence:[Hv,Lv,Of]}),n=Yh("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=qw(i.toString());Cv(t,o,()=>o(t.currentUser)),xv(t,c=>o(c))}}const s=Qh("auth");return s&&dv(t,`http://${s}`),t}function zw(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}nv({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=Bt("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",zw().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Bw("Browser");var xd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var pr,jf;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function w(){}w.prototype=_.prototype,E.D=_.prototype,E.prototype=new w,E.prototype.constructor=E,E.C=function(T,S,I){for(var v=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)v[Y-2]=arguments[Y];return _.prototype[S].apply(T,v)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,_,w){w||(w=0);var T=Array(16);if(typeof _=="string")for(var S=0;16>S;++S)T[S]=_.charCodeAt(w++)|_.charCodeAt(w++)<<8|_.charCodeAt(w++)<<16|_.charCodeAt(w++)<<24;else for(S=0;16>S;++S)T[S]=_[w++]|_[w++]<<8|_[w++]<<16|_[w++]<<24;_=E.g[0],w=E.g[1],S=E.g[2];var I=E.g[3],v=_+(I^w&(S^I))+T[0]+3614090360&4294967295;_=w+(v<<7&4294967295|v>>>25),v=I+(S^_&(w^S))+T[1]+3905402710&4294967295,I=_+(v<<12&4294967295|v>>>20),v=S+(w^I&(_^w))+T[2]+606105819&4294967295,S=I+(v<<17&4294967295|v>>>15),v=w+(_^S&(I^_))+T[3]+3250441966&4294967295,w=S+(v<<22&4294967295|v>>>10),v=_+(I^w&(S^I))+T[4]+4118548399&4294967295,_=w+(v<<7&4294967295|v>>>25),v=I+(S^_&(w^S))+T[5]+1200080426&4294967295,I=_+(v<<12&4294967295|v>>>20),v=S+(w^I&(_^w))+T[6]+2821735955&4294967295,S=I+(v<<17&4294967295|v>>>15),v=w+(_^S&(I^_))+T[7]+4249261313&4294967295,w=S+(v<<22&4294967295|v>>>10),v=_+(I^w&(S^I))+T[8]+1770035416&4294967295,_=w+(v<<7&4294967295|v>>>25),v=I+(S^_&(w^S))+T[9]+2336552879&4294967295,I=_+(v<<12&4294967295|v>>>20),v=S+(w^I&(_^w))+T[10]+4294925233&4294967295,S=I+(v<<17&4294967295|v>>>15),v=w+(_^S&(I^_))+T[11]+2304563134&4294967295,w=S+(v<<22&4294967295|v>>>10),v=_+(I^w&(S^I))+T[12]+1804603682&4294967295,_=w+(v<<7&4294967295|v>>>25),v=I+(S^_&(w^S))+T[13]+4254626195&4294967295,I=_+(v<<12&4294967295|v>>>20),v=S+(w^I&(_^w))+T[14]+2792965006&4294967295,S=I+(v<<17&4294967295|v>>>15),v=w+(_^S&(I^_))+T[15]+1236535329&4294967295,w=S+(v<<22&4294967295|v>>>10),v=_+(S^I&(w^S))+T[1]+4129170786&4294967295,_=w+(v<<5&4294967295|v>>>27),v=I+(w^S&(_^w))+T[6]+3225465664&4294967295,I=_+(v<<9&4294967295|v>>>23),v=S+(_^w&(I^_))+T[11]+643717713&4294967295,S=I+(v<<14&4294967295|v>>>18),v=w+(I^_&(S^I))+T[0]+3921069994&4294967295,w=S+(v<<20&4294967295|v>>>12),v=_+(S^I&(w^S))+T[5]+3593408605&4294967295,_=w+(v<<5&4294967295|v>>>27),v=I+(w^S&(_^w))+T[10]+38016083&4294967295,I=_+(v<<9&4294967295|v>>>23),v=S+(_^w&(I^_))+T[15]+3634488961&4294967295,S=I+(v<<14&4294967295|v>>>18),v=w+(I^_&(S^I))+T[4]+3889429448&4294967295,w=S+(v<<20&4294967295|v>>>12),v=_+(S^I&(w^S))+T[9]+568446438&4294967295,_=w+(v<<5&4294967295|v>>>27),v=I+(w^S&(_^w))+T[14]+3275163606&4294967295,I=_+(v<<9&4294967295|v>>>23),v=S+(_^w&(I^_))+T[3]+4107603335&4294967295,S=I+(v<<14&4294967295|v>>>18),v=w+(I^_&(S^I))+T[8]+1163531501&4294967295,w=S+(v<<20&4294967295|v>>>12),v=_+(S^I&(w^S))+T[13]+2850285829&4294967295,_=w+(v<<5&4294967295|v>>>27),v=I+(w^S&(_^w))+T[2]+4243563512&4294967295,I=_+(v<<9&4294967295|v>>>23),v=S+(_^w&(I^_))+T[7]+1735328473&4294967295,S=I+(v<<14&4294967295|v>>>18),v=w+(I^_&(S^I))+T[12]+2368359562&4294967295,w=S+(v<<20&4294967295|v>>>12),v=_+(w^S^I)+T[5]+4294588738&4294967295,_=w+(v<<4&4294967295|v>>>28),v=I+(_^w^S)+T[8]+2272392833&4294967295,I=_+(v<<11&4294967295|v>>>21),v=S+(I^_^w)+T[11]+1839030562&4294967295,S=I+(v<<16&4294967295|v>>>16),v=w+(S^I^_)+T[14]+4259657740&4294967295,w=S+(v<<23&4294967295|v>>>9),v=_+(w^S^I)+T[1]+2763975236&4294967295,_=w+(v<<4&4294967295|v>>>28),v=I+(_^w^S)+T[4]+1272893353&4294967295,I=_+(v<<11&4294967295|v>>>21),v=S+(I^_^w)+T[7]+4139469664&4294967295,S=I+(v<<16&4294967295|v>>>16),v=w+(S^I^_)+T[10]+3200236656&4294967295,w=S+(v<<23&4294967295|v>>>9),v=_+(w^S^I)+T[13]+681279174&4294967295,_=w+(v<<4&4294967295|v>>>28),v=I+(_^w^S)+T[0]+3936430074&4294967295,I=_+(v<<11&4294967295|v>>>21),v=S+(I^_^w)+T[3]+3572445317&4294967295,S=I+(v<<16&4294967295|v>>>16),v=w+(S^I^_)+T[6]+76029189&4294967295,w=S+(v<<23&4294967295|v>>>9),v=_+(w^S^I)+T[9]+3654602809&4294967295,_=w+(v<<4&4294967295|v>>>28),v=I+(_^w^S)+T[12]+3873151461&4294967295,I=_+(v<<11&4294967295|v>>>21),v=S+(I^_^w)+T[15]+530742520&4294967295,S=I+(v<<16&4294967295|v>>>16),v=w+(S^I^_)+T[2]+3299628645&4294967295,w=S+(v<<23&4294967295|v>>>9),v=_+(S^(w|~I))+T[0]+4096336452&4294967295,_=w+(v<<6&4294967295|v>>>26),v=I+(w^(_|~S))+T[7]+1126891415&4294967295,I=_+(v<<10&4294967295|v>>>22),v=S+(_^(I|~w))+T[14]+2878612391&4294967295,S=I+(v<<15&4294967295|v>>>17),v=w+(I^(S|~_))+T[5]+4237533241&4294967295,w=S+(v<<21&4294967295|v>>>11),v=_+(S^(w|~I))+T[12]+1700485571&4294967295,_=w+(v<<6&4294967295|v>>>26),v=I+(w^(_|~S))+T[3]+2399980690&4294967295,I=_+(v<<10&4294967295|v>>>22),v=S+(_^(I|~w))+T[10]+4293915773&4294967295,S=I+(v<<15&4294967295|v>>>17),v=w+(I^(S|~_))+T[1]+2240044497&4294967295,w=S+(v<<21&4294967295|v>>>11),v=_+(S^(w|~I))+T[8]+1873313359&4294967295,_=w+(v<<6&4294967295|v>>>26),v=I+(w^(_|~S))+T[15]+4264355552&4294967295,I=_+(v<<10&4294967295|v>>>22),v=S+(_^(I|~w))+T[6]+2734768916&4294967295,S=I+(v<<15&4294967295|v>>>17),v=w+(I^(S|~_))+T[13]+1309151649&4294967295,w=S+(v<<21&4294967295|v>>>11),v=_+(S^(w|~I))+T[4]+4149444226&4294967295,_=w+(v<<6&4294967295|v>>>26),v=I+(w^(_|~S))+T[11]+3174756917&4294967295,I=_+(v<<10&4294967295|v>>>22),v=S+(_^(I|~w))+T[2]+718787259&4294967295,S=I+(v<<15&4294967295|v>>>17),v=w+(I^(S|~_))+T[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(S+(v<<21&4294967295|v>>>11))&4294967295,E.g[2]=E.g[2]+S&4294967295,E.g[3]=E.g[3]+I&4294967295}n.prototype.u=function(E,_){_===void 0&&(_=E.length);for(var w=_-this.blockSize,T=this.B,S=this.h,I=0;I<_;){if(S==0)for(;I<=w;)s(this,E,I),I+=this.blockSize;if(typeof E=="string"){for(;I<_;)if(T[S++]=E.charCodeAt(I++),S==this.blockSize){s(this,T),S=0;break}}else for(;I<_;)if(T[S++]=E[I++],S==this.blockSize){s(this,T),S=0;break}}this.h=S,this.o+=_},n.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;var w=8*this.o;for(_=E.length-8;_<E.length;++_)E[_]=w&255,w/=256;for(this.u(E),E=Array(16),_=w=0;4>_;++_)for(var T=0;32>T;T+=8)E[w++]=this.g[_]>>>T&255;return E};function i(E,_){var w=c;return Object.prototype.hasOwnProperty.call(w,E)?w[E]:w[E]=_(E)}function o(E,_){this.h=_;for(var w=[],T=!0,S=E.length-1;0<=S;S--){var I=E[S]|0;T&&I==_||(w[S]=I,T=!1)}this.g=w}var c={};function l(E){return-128<=E&&128>E?i(E,function(_){return new o([_|0],0>_?-1:0)}):new o([E|0],0>E?-1:0)}function u(E){if(isNaN(E)||!isFinite(E))return p;if(0>E)return A(u(-E));for(var _=[],w=1,T=0;E>=w;T++)_[T]=E/w|0,w*=4294967296;return new o(_,0)}function h(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return A(h(E.substring(1),_));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=u(Math.pow(_,8)),T=p,S=0;S<E.length;S+=8){var I=Math.min(8,E.length-S),v=parseInt(E.substring(S,S+I),_);8>I?(I=u(Math.pow(_,I)),T=T.j(I).add(u(v))):(T=T.j(w),T=T.add(u(v)))}return T}var p=l(0),m=l(1),y=l(16777216);r=o.prototype,r.m=function(){if(R(this))return-A(this).m();for(var E=0,_=1,w=0;w<this.g.length;w++){var T=this.i(w);E+=(0<=T?T:4294967296+T)*_,_*=4294967296}return E},r.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(b(this))return"0";if(R(this))return"-"+A(this).toString(E);for(var _=u(Math.pow(E,6)),w=this,T="";;){var S=z(w,_).g;w=k(w,S.j(_));var I=((0<w.g.length?w.g[0]:w.h)>>>0).toString(E);if(w=S,b(w))return I+T;for(;6>I.length;)I="0"+I;T=I+T}},r.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function b(E){if(E.h!=0)return!1;for(var _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function R(E){return E.h==-1}r.l=function(E){return E=k(this,E),R(E)?-1:b(E)?0:1};function A(E){for(var _=E.g.length,w=[],T=0;T<_;T++)w[T]=~E.g[T];return new o(w,~E.h).add(m)}r.abs=function(){return R(this)?A(this):this},r.add=function(E){for(var _=Math.max(this.g.length,E.g.length),w=[],T=0,S=0;S<=_;S++){var I=T+(this.i(S)&65535)+(E.i(S)&65535),v=(I>>>16)+(this.i(S)>>>16)+(E.i(S)>>>16);T=v>>>16,I&=65535,v&=65535,w[S]=v<<16|I}return new o(w,w[w.length-1]&-2147483648?-1:0)};function k(E,_){return E.add(A(_))}r.j=function(E){if(b(this)||b(E))return p;if(R(this))return R(E)?A(this).j(A(E)):A(A(this).j(E));if(R(E))return A(this.j(A(E)));if(0>this.l(y)&&0>E.l(y))return u(this.m()*E.m());for(var _=this.g.length+E.g.length,w=[],T=0;T<2*_;T++)w[T]=0;for(T=0;T<this.g.length;T++)for(var S=0;S<E.g.length;S++){var I=this.i(T)>>>16,v=this.i(T)&65535,Y=E.i(S)>>>16,ee=E.i(S)&65535;w[2*T+2*S]+=v*ee,D(w,2*T+2*S),w[2*T+2*S+1]+=I*ee,D(w,2*T+2*S+1),w[2*T+2*S+1]+=v*Y,D(w,2*T+2*S+1),w[2*T+2*S+2]+=I*Y,D(w,2*T+2*S+2)}for(T=0;T<_;T++)w[T]=w[2*T+1]<<16|w[2*T];for(T=_;T<2*_;T++)w[T]=0;return new o(w,0)};function D(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function N(E,_){this.g=E,this.h=_}function z(E,_){if(b(_))throw Error("division by zero");if(b(E))return new N(p,p);if(R(E))return _=z(A(E),_),new N(A(_.g),A(_.h));if(R(_))return _=z(E,A(_)),new N(A(_.g),_.h);if(30<E.g.length){if(R(E)||R(_))throw Error("slowDivide_ only works with positive integers.");for(var w=m,T=_;0>=T.l(E);)w=M(w),T=M(T);var S=U(w,1),I=U(T,1);for(T=U(T,2),w=U(w,2);!b(T);){var v=I.add(T);0>=v.l(E)&&(S=S.add(w),I=v),T=U(T,1),w=U(w,1)}return _=k(E,S.j(_)),new N(S,_)}for(S=p;0<=E.l(_);){for(w=Math.max(1,Math.floor(E.m()/_.m())),T=Math.ceil(Math.log(w)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),I=u(w),v=I.j(_);R(v)||0<v.l(E);)w-=T,I=u(w),v=I.j(_);b(I)&&(I=m),S=S.add(I),E=k(E,v)}return new N(S,E)}r.A=function(E){return z(this,E).h},r.and=function(E){for(var _=Math.max(this.g.length,E.g.length),w=[],T=0;T<_;T++)w[T]=this.i(T)&E.i(T);return new o(w,this.h&E.h)},r.or=function(E){for(var _=Math.max(this.g.length,E.g.length),w=[],T=0;T<_;T++)w[T]=this.i(T)|E.i(T);return new o(w,this.h|E.h)},r.xor=function(E){for(var _=Math.max(this.g.length,E.g.length),w=[],T=0;T<_;T++)w[T]=this.i(T)^E.i(T);return new o(w,this.h^E.h)};function M(E){for(var _=E.g.length+1,w=[],T=0;T<_;T++)w[T]=E.i(T)<<1|E.i(T-1)>>>31;return new o(w,E.h)}function U(E,_){var w=_>>5;_%=32;for(var T=E.g.length-w,S=[],I=0;I<T;I++)S[I]=0<_?E.i(I+w)>>>_|E.i(I+w+1)<<32-_:E.i(I+w);return new o(S,E.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,jf=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=h,pr=o}).apply(typeof xd<"u"?xd:typeof self<"u"?self:typeof window<"u"?window:{});var po=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zf,ei,Gf,So,yc,Kf,Hf,Wf;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,f){return a==Array.prototype||a==Object.prototype||(a[d]=f.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof po=="object"&&po];for(var d=0;d<a.length;++d){var f=a[d];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var n=t(this);function s(a,d){if(d)e:{var f=n;a=a.split(".");for(var g=0;g<a.length-1;g++){var x=a[g];if(!(x in f))break e;f=f[x]}a=a[a.length-1],g=f[a],d=d(g),d!=g&&d!=null&&e(f,a,{configurable:!0,writable:!0,value:d})}}function i(a,d){a instanceof String&&(a+="");var f=0,g=!1,x={next:function(){if(!g&&f<a.length){var V=f++;return{value:d(V,a[V]),done:!1}}return g=!0,{done:!0,value:void 0}}};return x[Symbol.iterator]=function(){return x},x}s("Array.prototype.values",function(a){return a||function(){return i(this,function(d,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function u(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function h(a,d,f){return a.call.apply(a.bind,arguments)}function p(a,d,f){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var x=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(x,g),a.apply(d,x)}}return function(){return a.apply(d,arguments)}}function m(a,d,f){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:p,m.apply(null,arguments)}function y(a,d){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function b(a,d){function f(){}f.prototype=d.prototype,a.aa=d.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(g,x,V){for(var B=Array(arguments.length-2),ye=2;ye<arguments.length;ye++)B[ye-2]=arguments[ye];return d.prototype[x].apply(g,B)}}function R(a){const d=a.length;if(0<d){const f=Array(d);for(let g=0;g<d;g++)f[g]=a[g];return f}return[]}function A(a,d){for(let f=1;f<arguments.length;f++){const g=arguments[f];if(l(g)){const x=a.length||0,V=g.length||0;a.length=x+V;for(let B=0;B<V;B++)a[x+B]=g[B]}else a.push(g)}}class k{constructor(d,f){this.i=d,this.j=f,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function D(a){return/^[\s\xa0]*$/.test(a)}function N(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function z(a){return z[" "](a),a}z[" "]=function(){};var M=N().indexOf("Gecko")!=-1&&!(N().toLowerCase().indexOf("webkit")!=-1&&N().indexOf("Edge")==-1)&&!(N().indexOf("Trident")!=-1||N().indexOf("MSIE")!=-1)&&N().indexOf("Edge")==-1;function U(a,d,f){for(const g in a)d.call(f,a[g],g,a)}function E(a,d){for(const f in a)d.call(void 0,a[f],f,a)}function _(a){const d={};for(const f in a)d[f]=a[f];return d}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(a,d){let f,g;for(let x=1;x<arguments.length;x++){g=arguments[x];for(f in g)a[f]=g[f];for(let V=0;V<w.length;V++)f=w[V],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function S(a){var d=1;a=a.split(":");const f=[];for(;0<d&&a.length;)f.push(a.shift()),d--;return a.length&&f.push(a.join(":")),f}function I(a){c.setTimeout(()=>{throw a},0)}function v(){var a=bt;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class Y{constructor(){this.h=this.g=null}add(d,f){const g=ee.get();g.set(d,f),this.h?this.h.next=g:this.g=g,this.h=g}}var ee=new k(()=>new Ne,a=>a.reset());class Ne{constructor(){this.next=this.g=this.h=null}set(d,f){this.h=d,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let we,ae=!1,bt=new Y,_t=()=>{const a=c.Promise.resolve(void 0);we=()=>{a.then(Le)}};var Le=()=>{for(var a;a=v();){try{a.h.call(a.g)}catch(f){I(f)}var d=ee;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}ae=!1};function fe(){this.s=this.s,this.C=this.C}fe.prototype.s=!1,fe.prototype.ma=function(){this.s||(this.s=!0,this.N())},fe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ce(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}ce.prototype.h=function(){this.defaultPrevented=!0};var He=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};c.addEventListener("test",f,d),c.removeEventListener("test",f,d)}catch{}return a}();function Vt(a,d){if(ce.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(M){e:{try{z(d.nodeName);var x=!0;break e}catch{}x=!1}x||(d=null)}}else f=="mouseover"?d=a.fromElement:f=="mouseout"&&(d=a.toElement);this.relatedTarget=d,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:j[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Vt.aa.h.call(this)}}b(Vt,ce);var j={2:"touch",3:"pen",4:"mouse"};Vt.prototype.h=function(){Vt.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Ce="closure_listenable_"+(1e6*Math.random()|0),de=0;function ft(a,d,f,g,x){this.listener=a,this.proxy=null,this.src=d,this.type=f,this.capture=!!g,this.ha=x,this.key=++de,this.da=this.fa=!1}function Ye(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function it(a){this.src=a,this.g={},this.h=0}it.prototype.add=function(a,d,f,g,x){var V=a.toString();a=this.g[V],a||(a=this.g[V]=[],this.h++);var B=St(a,d,g,x);return-1<B?(d=a[B],f||(d.fa=!1)):(d=new ft(d,this.src,V,!!g,x),d.fa=f,a.push(d)),d};function Tt(a,d){var f=d.type;if(f in a.g){var g=a.g[f],x=Array.prototype.indexOf.call(g,d,void 0),V;(V=0<=x)&&Array.prototype.splice.call(g,x,1),V&&(Ye(d),a.g[f].length==0&&(delete a.g[f],a.h--))}}function St(a,d,f,g){for(var x=0;x<a.length;++x){var V=a[x];if(!V.da&&V.listener==d&&V.capture==!!f&&V.ha==g)return x}return-1}var At="closure_lm_"+(1e6*Math.random()|0),zt={};function ot(a,d,f,g,x){if(Array.isArray(d)){for(var V=0;V<d.length;V++)ot(a,d[V],f,g,x);return null}return f=ru(f),a&&a[Ce]?a.K(d,f,u(g)?!!g.capture:!1,x):Dt(a,d,f,!1,g,x)}function Dt(a,d,f,g,x,V){if(!d)throw Error("Invalid event type");var B=u(x)?!!x.capture:!!x,ye=Ca(a);if(ye||(a[At]=ye=new it(a)),f=ye.add(d,f,g,B,V),f.proxy)return f;if(g=Lr(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)He||(x=B),x===void 0&&(x=!1),a.addEventListener(d.toString(),g,x);else if(a.attachEvent)a.attachEvent(Qi(d.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Lr(){function a(f){return d.call(a.src,a.listener,f)}const d=xa;return a}function er(a,d,f,g,x){if(Array.isArray(d))for(var V=0;V<d.length;V++)er(a,d[V],f,g,x);else g=u(g)?!!g.capture:!!g,f=ru(f),a&&a[Ce]?(a=a.i,d=String(d).toString(),d in a.g&&(V=a.g[d],f=St(V,f,g,x),-1<f&&(Ye(V[f]),Array.prototype.splice.call(V,f,1),V.length==0&&(delete a.g[d],a.h--)))):a&&(a=Ca(a))&&(d=a.g[d.toString()],a=-1,d&&(a=St(d,f,g,x)),(f=-1<a?d[a]:null)&&tr(f))}function tr(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[Ce])Tt(d.i,a);else{var f=a.type,g=a.proxy;d.removeEventListener?d.removeEventListener(f,g,a.capture):d.detachEvent?d.detachEvent(Qi(f),g):d.addListener&&d.removeListener&&d.removeListener(g),(f=Ca(d))?(Tt(f,a),f.h==0&&(f.src=null,d[At]=null)):Ye(a)}}}function Qi(a){return a in zt?zt[a]:zt[a]="on"+a}function xa(a,d){if(a.da)a=!0;else{d=new Vt(d,this);var f=a.listener,g=a.ha||a.src;a.fa&&tr(a),a=f.call(g,d)}return a}function Ca(a){return a=a[At],a instanceof it?a:null}var ka="__closure_events_fn_"+(1e9*Math.random()>>>0);function ru(a){return typeof a=="function"?a:(a[ka]||(a[ka]=function(d){return a.handleEvent(d)}),a[ka])}function Xe(){fe.call(this),this.i=new it(this),this.M=this,this.F=null}b(Xe,fe),Xe.prototype[Ce]=!0,Xe.prototype.removeEventListener=function(a,d,f,g){er(this,a,d,f,g)};function at(a,d){var f,g=a.F;if(g)for(f=[];g;g=g.F)f.push(g);if(a=a.M,g=d.type||d,typeof d=="string")d=new ce(d,a);else if(d instanceof ce)d.target=d.target||a;else{var x=d;d=new ce(g,a),T(d,x)}if(x=!0,f)for(var V=f.length-1;0<=V;V--){var B=d.g=f[V];x=Ji(B,g,!0,d)&&x}if(B=d.g=a,x=Ji(B,g,!0,d)&&x,x=Ji(B,g,!1,d)&&x,f)for(V=0;V<f.length;V++)B=d.g=f[V],x=Ji(B,g,!1,d)&&x}Xe.prototype.N=function(){if(Xe.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var f=a.g[d],g=0;g<f.length;g++)Ye(f[g]);delete a.g[d],a.h--}}this.F=null},Xe.prototype.K=function(a,d,f,g){return this.i.add(String(a),d,!1,f,g)},Xe.prototype.L=function(a,d,f,g){return this.i.add(String(a),d,!0,f,g)};function Ji(a,d,f,g){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var x=!0,V=0;V<d.length;++V){var B=d[V];if(B&&!B.da&&B.capture==f){var ye=B.listener,We=B.ha||B.src;B.fa&&Tt(a.i,B),x=ye.call(We,g)!==!1&&x}}return x&&!g.defaultPrevented}function su(a,d,f){if(typeof a=="function")f&&(a=m(a,f));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:c.setTimeout(a,d||0)}function iu(a){a.g=su(()=>{a.g=null,a.i&&(a.i=!1,iu(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class Tg extends fe{constructor(d,f){super(),this.m=d,this.l=f,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:iu(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ns(a){fe.call(this),this.h=a,this.g={}}b(Ns,fe);var ou=[];function au(a){U(a.g,function(d,f){this.g.hasOwnProperty(f)&&tr(d)},a),a.g={}}Ns.prototype.N=function(){Ns.aa.N.call(this),au(this)},Ns.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Va=c.JSON.stringify,Ag=c.JSON.parse,Sg=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Da(){}Da.prototype.h=null;function cu(a){return a.h||(a.h=a.i())}function lu(){}var Ls={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Na(){ce.call(this,"d")}b(Na,ce);function La(){ce.call(this,"c")}b(La,ce);var nr={},uu=null;function Yi(){return uu=uu||new Xe}nr.La="serverreachability";function du(a){ce.call(this,nr.La,a)}b(du,ce);function Os(a){const d=Yi();at(d,new du(d))}nr.STAT_EVENT="statevent";function hu(a,d){ce.call(this,nr.STAT_EVENT,a),this.stat=d}b(hu,ce);function ct(a){const d=Yi();at(d,new hu(d,a))}nr.Ma="timingevent";function fu(a,d){ce.call(this,nr.Ma,a),this.size=d}b(fu,ce);function Ms(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},d)}function Fs(){this.g=!0}Fs.prototype.xa=function(){this.g=!1};function Rg(a,d,f,g,x,V){a.info(function(){if(a.g)if(V)for(var B="",ye=V.split("&"),We=0;We<ye.length;We++){var oe=ye[We].split("=");if(1<oe.length){var Ze=oe[0];oe=oe[1];var et=Ze.split("_");B=2<=et.length&&et[1]=="type"?B+(Ze+"="+oe+"&"):B+(Ze+"=redacted&")}}else B=null;else B=V;return"XMLHTTP REQ ("+g+") [attempt "+x+"]: "+d+`
`+f+`
`+B})}function Pg(a,d,f,g,x,V,B){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+x+"]: "+d+`
`+f+`
`+V+" "+B})}function Or(a,d,f,g){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+Cg(a,f)+(g?" "+g:"")})}function xg(a,d){a.info(function(){return"TIMEOUT: "+d})}Fs.prototype.info=function(){};function Cg(a,d){if(!a.g)return d;if(!d)return null;try{var f=JSON.parse(d);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var g=f[a];if(!(2>g.length)){var x=g[1];if(Array.isArray(x)&&!(1>x.length)){var V=x[0];if(V!="noop"&&V!="stop"&&V!="close")for(var B=1;B<x.length;B++)x[B]=""}}}}return Va(f)}catch{return d}}var Xi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},pu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Oa;function Zi(){}b(Zi,Da),Zi.prototype.g=function(){return new XMLHttpRequest},Zi.prototype.i=function(){return{}},Oa=new Zi;function dn(a,d,f,g){this.j=a,this.i=d,this.l=f,this.R=g||1,this.U=new Ns(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new mu}function mu(){this.i=null,this.g="",this.h=!1}var gu={},Ma={};function Fa(a,d,f){a.L=1,a.v=ro(Gt(d)),a.m=f,a.P=!0,yu(a,null)}function yu(a,d){a.F=Date.now(),eo(a),a.A=Gt(a.v);var f=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),ku(f.i,"t",g),a.C=0,f=a.j.J,a.h=new mu,a.g=Qu(a.j,f?d:null,!a.m),0<a.O&&(a.M=new Tg(m(a.Y,a,a.g),a.O)),d=a.U,f=a.g,g=a.ca;var x="readystatechange";Array.isArray(x)||(x&&(ou[0]=x.toString()),x=ou);for(var V=0;V<x.length;V++){var B=ot(f,x[V],g||d.handleEvent,!1,d.h||d);if(!B)break;d.g[B.key]=B}d=a.H?_(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),Os(),Rg(a.i,a.u,a.A,a.l,a.R,a.m)}dn.prototype.ca=function(a){a=a.target;const d=this.M;d&&Kt(a)==3?d.j():this.Y(a)},dn.prototype.Y=function(a){try{if(a==this.g)e:{const et=Kt(this.g);var d=this.g.Ba();const Br=this.g.Z();if(!(3>et)&&(et!=3||this.g&&(this.h.h||this.g.oa()||Fu(this.g)))){this.J||et!=4||d==7||(d==8||0>=Br?Os(3):Os(2)),Ba(this);var f=this.g.Z();this.X=f;t:if(_u(this)){var g=Fu(this.g);a="";var x=g.length,V=Kt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){rr(this),Bs(this);var B="";break t}this.h.i=new c.TextDecoder}for(d=0;d<x;d++)this.h.h=!0,a+=this.h.i.decode(g[d],{stream:!(V&&d==x-1)});g.length=0,this.h.g+=a,this.C=0,B=this.h.g}else B=this.g.oa();if(this.o=f==200,Pg(this.i,this.u,this.A,this.l,this.R,et,f),this.o){if(this.T&&!this.K){t:{if(this.g){var ye,We=this.g;if((ye=We.g?We.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!D(ye)){var oe=ye;break t}}oe=null}if(f=oe)Or(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,$a(this,f);else{this.o=!1,this.s=3,ct(12),rr(this),Bs(this);break e}}if(this.P){f=!0;let Rt;for(;!this.J&&this.C<B.length;)if(Rt=kg(this,B),Rt==Ma){et==4&&(this.s=4,ct(14),f=!1),Or(this.i,this.l,null,"[Incomplete Response]");break}else if(Rt==gu){this.s=4,ct(15),Or(this.i,this.l,B,"[Invalid Chunk]"),f=!1;break}else Or(this.i,this.l,Rt,null),$a(this,Rt);if(_u(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),et!=4||B.length!=0||this.h.h||(this.s=1,ct(16),f=!1),this.o=this.o&&f,!f)Or(this.i,this.l,B,"[Invalid Chunked Response]"),rr(this),Bs(this);else if(0<B.length&&!this.W){this.W=!0;var Ze=this.j;Ze.g==this&&Ze.ba&&!Ze.M&&(Ze.j.info("Great, no buffering proxy detected. Bytes received: "+B.length),Ka(Ze),Ze.M=!0,ct(11))}}else Or(this.i,this.l,B,null),$a(this,B);et==4&&rr(this),this.o&&!this.J&&(et==4?Gu(this.j,this):(this.o=!1,eo(this)))}else Wg(this.g),f==400&&0<B.indexOf("Unknown SID")?(this.s=3,ct(12)):(this.s=0,ct(13)),rr(this),Bs(this)}}}catch{}finally{}};function _u(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function kg(a,d){var f=a.C,g=d.indexOf(`
`,f);return g==-1?Ma:(f=Number(d.substring(f,g)),isNaN(f)?gu:(g+=1,g+f>d.length?Ma:(d=d.slice(g,g+f),a.C=g+f,d)))}dn.prototype.cancel=function(){this.J=!0,rr(this)};function eo(a){a.S=Date.now()+a.I,vu(a,a.I)}function vu(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ms(m(a.ba,a),d)}function Ba(a){a.B&&(c.clearTimeout(a.B),a.B=null)}dn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(xg(this.i,this.A),this.L!=2&&(Os(),ct(17)),rr(this),this.s=2,Bs(this)):vu(this,this.S-a)};function Bs(a){a.j.G==0||a.J||Gu(a.j,a)}function rr(a){Ba(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,au(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function $a(a,d){try{var f=a.j;if(f.G!=0&&(f.g==a||Ua(f.h,a))){if(!a.K&&Ua(f.h,a)&&f.G==3){try{var g=f.Da.g.parse(d)}catch{g=null}if(Array.isArray(g)&&g.length==3){var x=g;if(x[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)lo(f),ao(f);else break e;Ga(f),ct(18)}}else f.za=x[1],0<f.za-f.T&&37500>x[2]&&f.F&&f.v==0&&!f.C&&(f.C=Ms(m(f.Za,f),6e3));if(1>=Eu(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else ir(f,11)}else if((a.K||f.g==a)&&lo(f),!D(d))for(x=f.Da.g.parse(d),d=0;d<x.length;d++){let oe=x[d];if(f.T=oe[0],oe=oe[1],f.G==2)if(oe[0]=="c"){f.K=oe[1],f.ia=oe[2];const Ze=oe[3];Ze!=null&&(f.la=Ze,f.j.info("VER="+f.la));const et=oe[4];et!=null&&(f.Aa=et,f.j.info("SVER="+f.Aa));const Br=oe[5];Br!=null&&typeof Br=="number"&&0<Br&&(g=1.5*Br,f.L=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const Rt=a.g;if(Rt){const ho=Rt.g?Rt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ho){var V=g.h;V.g||ho.indexOf("spdy")==-1&&ho.indexOf("quic")==-1&&ho.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(qa(V,V.h),V.h=null))}if(g.D){const Ha=Rt.g?Rt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ha&&(g.ya=Ha,Ie(g.I,g.D,Ha))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),g=f;var B=a;if(g.qa=Wu(g,g.J?g.ia:null,g.W),B.K){bu(g.h,B);var ye=B,We=g.L;We&&(ye.I=We),ye.B&&(Ba(ye),eo(ye)),g.g=B}else ju(g);0<f.i.length&&co(f)}else oe[0]!="stop"&&oe[0]!="close"||ir(f,7);else f.G==3&&(oe[0]=="stop"||oe[0]=="close"?oe[0]=="stop"?ir(f,7):za(f):oe[0]!="noop"&&f.l&&f.l.ta(oe),f.v=0)}}Os(4)}catch{}}var Vg=class{constructor(a,d){this.g=a,this.map=d}};function wu(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Iu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Eu(a){return a.h?1:a.g?a.g.size:0}function Ua(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function qa(a,d){a.g?a.g.add(d):a.h=d}function bu(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}wu.prototype.cancel=function(){if(this.i=Tu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Tu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const f of a.g.values())d=d.concat(f.D);return d}return R(a.i)}function Dg(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var d=[],f=a.length,g=0;g<f;g++)d.push(a[g]);return d}d=[],f=0;for(g in a)d[f++]=a[g];return d}function Ng(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var d=[];a=a.length;for(var f=0;f<a;f++)d.push(f);return d}d=[],f=0;for(const g in a)d[f++]=g;return d}}}function Au(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var f=Ng(a),g=Dg(a),x=g.length,V=0;V<x;V++)d.call(void 0,g[V],f&&f[V],a)}var Su=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Lg(a,d){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var g=a[f].indexOf("="),x=null;if(0<=g){var V=a[f].substring(0,g);x=a[f].substring(g+1)}else V=a[f];d(V,x?decodeURIComponent(x.replace(/\+/g," ")):"")}}}function sr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof sr){this.h=a.h,to(this,a.j),this.o=a.o,this.g=a.g,no(this,a.s),this.l=a.l;var d=a.i,f=new qs;f.i=d.i,d.g&&(f.g=new Map(d.g),f.h=d.h),Ru(this,f),this.m=a.m}else a&&(d=String(a).match(Su))?(this.h=!1,to(this,d[1]||"",!0),this.o=$s(d[2]||""),this.g=$s(d[3]||"",!0),no(this,d[4]),this.l=$s(d[5]||"",!0),Ru(this,d[6]||"",!0),this.m=$s(d[7]||"")):(this.h=!1,this.i=new qs(null,this.h))}sr.prototype.toString=function(){var a=[],d=this.j;d&&a.push(Us(d,Pu,!0),":");var f=this.g;return(f||d=="file")&&(a.push("//"),(d=this.o)&&a.push(Us(d,Pu,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Us(f,f.charAt(0)=="/"?Fg:Mg,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Us(f,$g)),a.join("")};function Gt(a){return new sr(a)}function to(a,d,f){a.j=f?$s(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function no(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function Ru(a,d,f){d instanceof qs?(a.i=d,Ug(a.i,a.h)):(f||(d=Us(d,Bg)),a.i=new qs(d,a.h))}function Ie(a,d,f){a.i.set(d,f)}function ro(a){return Ie(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function $s(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Us(a,d,f){return typeof a=="string"?(a=encodeURI(a).replace(d,Og),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Og(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Pu=/[#\/\?@]/g,Mg=/[#\?:]/g,Fg=/[#\?]/g,Bg=/[#\?@]/g,$g=/#/g;function qs(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function hn(a){a.g||(a.g=new Map,a.h=0,a.i&&Lg(a.i,function(d,f){a.add(decodeURIComponent(d.replace(/\+/g," ")),f)}))}r=qs.prototype,r.add=function(a,d){hn(this),this.i=null,a=Mr(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(d),this.h+=1,this};function xu(a,d){hn(a),d=Mr(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function Cu(a,d){return hn(a),d=Mr(a,d),a.g.has(d)}r.forEach=function(a,d){hn(this),this.g.forEach(function(f,g){f.forEach(function(x){a.call(d,x,g,this)},this)},this)},r.na=function(){hn(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),f=[];for(let g=0;g<d.length;g++){const x=a[g];for(let V=0;V<x.length;V++)f.push(d[g])}return f},r.V=function(a){hn(this);let d=[];if(typeof a=="string")Cu(this,a)&&(d=d.concat(this.g.get(Mr(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)d=d.concat(a[f])}return d},r.set=function(a,d){return hn(this),this.i=null,a=Mr(this,a),Cu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},r.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function ku(a,d,f){xu(a,d),0<f.length&&(a.i=null,a.g.set(Mr(a,d),R(f)),a.h+=f.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var f=0;f<d.length;f++){var g=d[f];const V=encodeURIComponent(String(g)),B=this.V(g);for(g=0;g<B.length;g++){var x=V;B[g]!==""&&(x+="="+encodeURIComponent(String(B[g]))),a.push(x)}}return this.i=a.join("&")};function Mr(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function Ug(a,d){d&&!a.j&&(hn(a),a.i=null,a.g.forEach(function(f,g){var x=g.toLowerCase();g!=x&&(xu(this,g),ku(this,x,f))},a)),a.j=d}function qg(a,d){const f=new Fs;if(c.Image){const g=new Image;g.onload=y(fn,f,"TestLoadImage: loaded",!0,d,g),g.onerror=y(fn,f,"TestLoadImage: error",!1,d,g),g.onabort=y(fn,f,"TestLoadImage: abort",!1,d,g),g.ontimeout=y(fn,f,"TestLoadImage: timeout",!1,d,g),c.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else d(!1)}function jg(a,d){const f=new Fs,g=new AbortController,x=setTimeout(()=>{g.abort(),fn(f,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:g.signal}).then(V=>{clearTimeout(x),V.ok?fn(f,"TestPingServer: ok",!0,d):fn(f,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(x),fn(f,"TestPingServer: error",!1,d)})}function fn(a,d,f,g,x){try{x&&(x.onload=null,x.onerror=null,x.onabort=null,x.ontimeout=null),g(f)}catch{}}function zg(){this.g=new Sg}function Gg(a,d,f){const g=f||"";try{Au(a,function(x,V){let B=x;u(x)&&(B=Va(x)),d.push(g+V+"="+encodeURIComponent(B))})}catch(x){throw d.push(g+"type="+encodeURIComponent("_badmap")),x}}function so(a){this.l=a.Ub||null,this.j=a.eb||!1}b(so,Da),so.prototype.g=function(){return new io(this.l,this.j)},so.prototype.i=function(a){return function(){return a}}({});function io(a,d){Xe.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(io,Xe),r=io.prototype,r.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,zs(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||c).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,js(this)),this.readyState=0},r.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,zs(this)),this.g&&(this.readyState=3,zs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Vu(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Vu(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}r.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?js(this):zs(this),this.readyState==3&&Vu(this)}},r.Ra=function(a){this.g&&(this.response=this.responseText=a,js(this))},r.Qa=function(a){this.g&&(this.response=a,js(this))},r.ga=function(){this.g&&js(this)};function js(a){a.readyState=4,a.l=null,a.j=null,a.v=null,zs(a)}r.setRequestHeader=function(a,d){this.u.append(a,d)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var f=d.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=d.next();return a.join(`\r
`)};function zs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(io.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Du(a){let d="";return U(a,function(f,g){d+=g,d+=":",d+=f,d+=`\r
`}),d}function ja(a,d,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=Du(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):Ie(a,d,f))}function Pe(a){Xe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(Pe,Xe);var Kg=/^https?$/i,Hg=["POST","PUT"];r=Pe.prototype,r.Ha=function(a){this.J=a},r.ea=function(a,d,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Oa.g(),this.v=this.o?cu(this.o):cu(Oa),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(V){Nu(this,V);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var x in g)f.set(x,g[x]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const V of g.keys())f.set(V,g.get(V));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(V=>V.toLowerCase()=="content-type"),x=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Hg,d,void 0))||g||x||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,B]of f)this.g.setRequestHeader(V,B);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Mu(this),this.u=!0,this.g.send(a),this.u=!1}catch(V){Nu(this,V)}};function Nu(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,Lu(a),oo(a)}function Lu(a){a.A||(a.A=!0,at(a,"complete"),at(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,at(this,"complete"),at(this,"abort"),oo(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),oo(this,!0)),Pe.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Ou(this):this.bb())},r.bb=function(){Ou(this)};function Ou(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Kt(a)!=4||a.Z()!=2)){if(a.u&&Kt(a)==4)su(a.Ea,0,a);else if(at(a,"readystatechange"),Kt(a)==4){a.h=!1;try{const B=a.Z();e:switch(B){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var f;if(!(f=d)){var g;if(g=B===0){var x=String(a.D).match(Su)[1]||null;!x&&c.self&&c.self.location&&(x=c.self.location.protocol.slice(0,-1)),g=!Kg.test(x?x.toLowerCase():"")}f=g}if(f)at(a,"complete"),at(a,"success");else{a.m=6;try{var V=2<Kt(a)?a.g.statusText:""}catch{V=""}a.l=V+" ["+a.Z()+"]",Lu(a)}}finally{oo(a)}}}}function oo(a,d){if(a.g){Mu(a);const f=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||at(a,"ready");try{f.onreadystatechange=g}catch{}}}function Mu(a){a.I&&(c.clearTimeout(a.I),a.I=null)}r.isActive=function(){return!!this.g};function Kt(a){return a.g?a.g.readyState:0}r.Z=function(){try{return 2<Kt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),Ag(d)}};function Fu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Wg(a){const d={};a=(a.g&&2<=Kt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(D(a[g]))continue;var f=S(a[g]);const x=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const V=d[x]||[];d[x]=V,V.push(f)}E(d,function(g){return g.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Gs(a,d,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||d}function Bu(a){this.Aa=0,this.i=[],this.j=new Fs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Gs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Gs("baseRetryDelayMs",5e3,a),this.cb=Gs("retryDelaySeedMs",1e4,a),this.Wa=Gs("forwardChannelMaxRetries",2,a),this.wa=Gs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new wu(a&&a.concurrentRequestLimit),this.Da=new zg,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Bu.prototype,r.la=8,r.G=1,r.connect=function(a,d,f,g){ct(0),this.W=a,this.H=d||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.I=Wu(this,null,this.W),co(this)};function za(a){if($u(a),a.G==3){var d=a.U++,f=Gt(a.I);if(Ie(f,"SID",a.K),Ie(f,"RID",d),Ie(f,"TYPE","terminate"),Ks(a,f),d=new dn(a,a.j,d),d.L=2,d.v=ro(Gt(f)),f=!1,c.navigator&&c.navigator.sendBeacon)try{f=c.navigator.sendBeacon(d.v.toString(),"")}catch{}!f&&c.Image&&(new Image().src=d.v,f=!0),f||(d.g=Qu(d.j,null),d.g.ea(d.v)),d.F=Date.now(),eo(d)}Hu(a)}function ao(a){a.g&&(Ka(a),a.g.cancel(),a.g=null)}function $u(a){ao(a),a.u&&(c.clearTimeout(a.u),a.u=null),lo(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function co(a){if(!Iu(a.h)&&!a.s){a.s=!0;var d=a.Ga;we||_t(),ae||(we(),ae=!0),bt.add(d,a),a.B=0}}function Qg(a,d){return Eu(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ms(m(a.Ga,a,d),Ku(a,a.B)),a.B++,!0)}r.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const x=new dn(this,this.j,a);let V=this.o;if(this.S&&(V?(V=_(V),T(V,this.S)):V=this.S),this.m!==null||this.O||(x.H=V,V=null),this.P)e:{for(var d=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(d+=g,4096<d){d=f;break e}if(d===4096||f===this.i.length-1){d=f+1;break e}}d=1e3}else d=1e3;d=qu(this,x,d),f=Gt(this.I),Ie(f,"RID",a),Ie(f,"CVER",22),this.D&&Ie(f,"X-HTTP-Session-Id",this.D),Ks(this,f),V&&(this.O?d="headers="+encodeURIComponent(String(Du(V)))+"&"+d:this.m&&ja(f,this.m,V)),qa(this.h,x),this.Ua&&Ie(f,"TYPE","init"),this.P?(Ie(f,"$req",d),Ie(f,"SID","null"),x.T=!0,Fa(x,f,null)):Fa(x,f,d),this.G=2}}else this.G==3&&(a?Uu(this,a):this.i.length==0||Iu(this.h)||Uu(this))};function Uu(a,d){var f;d?f=d.l:f=a.U++;const g=Gt(a.I);Ie(g,"SID",a.K),Ie(g,"RID",f),Ie(g,"AID",a.T),Ks(a,g),a.m&&a.o&&ja(g,a.m,a.o),f=new dn(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),d&&(a.i=d.D.concat(a.i)),d=qu(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),qa(a.h,f),Fa(f,g,d)}function Ks(a,d){a.H&&U(a.H,function(f,g){Ie(d,g,f)}),a.l&&Au({},function(f,g){Ie(d,g,f)})}function qu(a,d,f){f=Math.min(a.i.length,f);var g=a.l?m(a.l.Na,a.l,a):null;e:{var x=a.i;let V=-1;for(;;){const B=["count="+f];V==-1?0<f?(V=x[0].g,B.push("ofs="+V)):V=0:B.push("ofs="+V);let ye=!0;for(let We=0;We<f;We++){let oe=x[We].g;const Ze=x[We].map;if(oe-=V,0>oe)V=Math.max(0,x[We].g-100),ye=!1;else try{Gg(Ze,B,"req"+oe+"_")}catch{g&&g(Ze)}}if(ye){g=B.join("&");break e}}}return a=a.i.splice(0,f),d.D=a,g}function ju(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;we||_t(),ae||(we(),ae=!0),bt.add(d,a),a.v=0}}function Ga(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ms(m(a.Fa,a),Ku(a,a.v)),a.v++,!0)}r.Fa=function(){if(this.u=null,zu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ms(m(this.ab,this),a)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ct(10),ao(this),zu(this))};function Ka(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function zu(a){a.g=new dn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=Gt(a.qa);Ie(d,"RID","rpc"),Ie(d,"SID",a.K),Ie(d,"AID",a.T),Ie(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&Ie(d,"TO",a.ja),Ie(d,"TYPE","xmlhttp"),Ks(a,d),a.m&&a.o&&ja(d,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=ro(Gt(d)),f.m=null,f.P=!0,yu(f,a)}r.Za=function(){this.C!=null&&(this.C=null,ao(this),Ga(this),ct(19))};function lo(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Gu(a,d){var f=null;if(a.g==d){lo(a),Ka(a),a.g=null;var g=2}else if(Ua(a.h,d))f=d.D,bu(a.h,d),g=1;else return;if(a.G!=0){if(d.o)if(g==1){f=d.m?d.m.length:0,d=Date.now()-d.F;var x=a.B;g=Yi(),at(g,new fu(g,f)),co(a)}else ju(a);else if(x=d.s,x==3||x==0&&0<d.X||!(g==1&&Qg(a,d)||g==2&&Ga(a)))switch(f&&0<f.length&&(d=a.h,d.i=d.i.concat(f)),x){case 1:ir(a,5);break;case 4:ir(a,10);break;case 3:ir(a,6);break;default:ir(a,2)}}}function Ku(a,d){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*d}function ir(a,d){if(a.j.info("Error code "+d),d==2){var f=m(a.fb,a),g=a.Xa;const x=!g;g=new sr(g||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||to(g,"https"),ro(g),x?qg(g.toString(),f):jg(g.toString(),f)}else ct(2);a.G=0,a.l&&a.l.sa(d),Hu(a),$u(a)}r.fb=function(a){a?(this.j.info("Successfully pinged google.com"),ct(2)):(this.j.info("Failed to ping google.com"),ct(1))};function Hu(a){if(a.G=0,a.ka=[],a.l){const d=Tu(a.h);(d.length!=0||a.i.length!=0)&&(A(a.ka,d),A(a.ka,a.i),a.h.i.length=0,R(a.i),a.i.length=0),a.l.ra()}}function Wu(a,d,f){var g=f instanceof sr?Gt(f):new sr(f);if(g.g!="")d&&(g.g=d+"."+g.g),no(g,g.s);else{var x=c.location;g=x.protocol,d=d?d+"."+x.hostname:x.hostname,x=+x.port;var V=new sr(null);g&&to(V,g),d&&(V.g=d),x&&no(V,x),f&&(V.l=f),g=V}return f=a.D,d=a.ya,f&&d&&Ie(g,f,d),Ie(g,"VER",a.la),Ks(a,g),g}function Qu(a,d,f){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new Pe(new so({eb:f})):new Pe(a.pa),d.Ha(a.J),d}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ju(){}r=Ju.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function uo(){}uo.prototype.g=function(a,d){return new vt(a,d)};function vt(a,d){Xe.call(this),this.g=new Bu(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!D(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!D(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new Fr(this)}b(vt,Xe),vt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},vt.prototype.close=function(){za(this.g)},vt.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=Va(a),a=f);d.i.push(new Vg(d.Ya++,a)),d.G==3&&co(d)},vt.prototype.N=function(){this.g.l=null,delete this.j,za(this.g),delete this.g,vt.aa.N.call(this)};function Yu(a){Na.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const f in d){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}b(Yu,Na);function Xu(){La.call(this),this.status=1}b(Xu,La);function Fr(a){this.g=a}b(Fr,Ju),Fr.prototype.ua=function(){at(this.g,"a")},Fr.prototype.ta=function(a){at(this.g,new Yu(a))},Fr.prototype.sa=function(a){at(this.g,new Xu)},Fr.prototype.ra=function(){at(this.g,"b")},uo.prototype.createWebChannel=uo.prototype.g,vt.prototype.send=vt.prototype.o,vt.prototype.open=vt.prototype.m,vt.prototype.close=vt.prototype.close,Wf=function(){return new uo},Hf=function(){return Yi()},Kf=nr,yc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Xi.NO_ERROR=0,Xi.TIMEOUT=8,Xi.HTTP_ERROR=6,So=Xi,pu.COMPLETE="complete",Gf=pu,lu.EventType=Ls,Ls.OPEN="a",Ls.CLOSE="b",Ls.ERROR="c",Ls.MESSAGE="d",Xe.prototype.listen=Xe.prototype.K,ei=lu,Pe.prototype.listenOnce=Pe.prototype.L,Pe.prototype.getLastError=Pe.prototype.Ka,Pe.prototype.getLastErrorCode=Pe.prototype.Ba,Pe.prototype.getStatus=Pe.prototype.Z,Pe.prototype.getResponseJson=Pe.prototype.Oa,Pe.prototype.getResponseText=Pe.prototype.oa,Pe.prototype.send=Pe.prototype.ea,Pe.prototype.setWithCredentials=Pe.prototype.Ha,zf=Pe}).apply(typeof po<"u"?po:typeof self<"u"?self:typeof window<"u"?window:{});const Cd="@firebase/firestore";/**
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
 */class qe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}qe.UNAUTHENTICATED=new qe(null),qe.GOOGLE_CREDENTIALS=new qe("google-credentials-uid"),qe.FIRST_PARTY=new qe("first-party-uid"),qe.MOCK_USER=new qe("mock-user");/**
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
 */let Es="10.14.0";/**
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
 */const Nn=new zc("@firebase/firestore");function zr(){return Nn.logLevel}function Gw(r){Nn.setLogLevel(r)}function O(r,...e){if(Nn.logLevel<=te.DEBUG){const t=e.map(tl);Nn.debug(`Firestore (${Es}): ${r}`,...t)}}function ke(r,...e){if(Nn.logLevel<=te.ERROR){const t=e.map(tl);Nn.error(`Firestore (${Es}): ${r}`,...t)}}function It(r,...e){if(Nn.logLevel<=te.WARN){const t=e.map(tl);Nn.warn(`Firestore (${Es}): ${r}`,...t)}}function tl(r){if(typeof r=="string")return r;try{/**
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
*/return function(t){return JSON.stringify(t)}(r)}catch{return r}}/**
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
 */function q(r="Unexpected state"){const e=`FIRESTORE (${Es}) INTERNAL ASSERTION FAILED: `+r;throw ke(e),new Error(e)}function G(r,e){r||q()}function Kw(r,e){r||q()}function F(r,e){return r}/**
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
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class L extends rn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Ge{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Qf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Jf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(qe.UNAUTHENTICATED))}shutdown(){}}class Hw{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Ww{constructor(e){this.t=e,this.currentUser=qe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){G(this.o===void 0);let n=this.i;const s=l=>this.i!==n?(n=this.i,t(l)):Promise.resolve();let i=new Ge;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ge,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ge)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(G(typeof n.accessToken=="string"),new Qf(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return G(e===null||typeof e=="string"),new qe(e)}}class Qw{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=qe.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Jw{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new Qw(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(qe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Yf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Yw{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){G(this.o===void 0);const n=i=>{i.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,O("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>n(i))};const s=i=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(G(typeof t.token=="string"),this.R=t.token,new Yf(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class Xw{getToken(){return Promise.resolve(new Yf(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
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
 */function Zw(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
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
 */class nl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const s=Zw(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%e.length))}return n}}function J(r,e){return r<e?-1:r>e?1:0}function ns(r,e,t){return r.length===e.length&&r.every((n,s)=>t(n,e[s]))}function Xf(r){return r+"\0"}/**
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
 */class _e{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new L(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new L(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new L(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new L(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return _e.fromMillis(Date.now())}static fromDate(e){return _e.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new _e(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class H{constructor(e){this.timestamp=e}static fromTimestamp(e){return new H(e)}static min(){return new H(new _e(0,0))}static max(){return new H(new _e(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class gi{constructor(e,t,n){t===void 0?t=0:t>e.length&&q(),n===void 0?n=e.length-t:n>e.length-t&&q(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return gi.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof gi?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=e.get(s),o=t.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ne extends gi{construct(e,t,n){return new ne(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new L(C.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(s=>s.length>0))}return new ne(t)}static emptyPath(){return new ne([])}}const eI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class be extends gi{construct(e,t,n){return new be(e,t,n)}static isValidIdentifier(e){return eI.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),be.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new be(["__name__"])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new L(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new L(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new L(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(n+=c,s++):(i(),s++)}if(i(),o)throw new L(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new be(t)}static emptyPath(){return new be([])}}/**
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
 */class ${constructor(e){this.path=e}static fromPath(e){return new $(ne.fromString(e))}static fromName(e){return new $(ne.fromString(e).popFirst(5))}static empty(){return new $(ne.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ne.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ne.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new $(new ne(e.slice()))}}/**
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
 */class rs{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function _c(r){return r.fields.find(e=>e.kind===2)}function cr(r){return r.fields.filter(e=>e.kind!==2)}function tI(r,e){let t=J(r.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let n=0;n<Math.min(r.fields.length,e.fields.length);++n)if(t=nI(r.fields[n],e.fields[n]),t!==0)return t;return J(r.fields.length,e.fields.length)}rs.UNKNOWN_ID=-1;class mr{constructor(e,t){this.fieldPath=e,this.kind=t}}function nI(r,e){const t=be.comparator(r.fieldPath,e.fieldPath);return t!==0?t:J(r.kind,e.kind)}class ss{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ss(0,Et.min())}}function Zf(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=H.fromTimestamp(n===1e9?new _e(t+1,0):new _e(t,n));return new Et(s,$.empty(),e)}function ep(r){return new Et(r.readTime,r.key,-1)}class Et{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Et(H.min(),$.empty(),-1)}static max(){return new Et(H.max(),$.empty(),-1)}}function rl(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=$.comparator(r.documentKey,e.documentKey),t!==0?t:J(r.largestBatchId,e.largestBatchId))}/**
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
 */const tp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class np{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Hn(r){if(r.code!==C.FAILED_PRECONDITION||r.message!==tp)throw r;O("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&q(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,n)=>{t(e)})}static reject(e){return new P((t,n)=>{n(e)})}static waitFor(e){return new P((t,n)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&t()},l=>n(l))}),o=!0,i===s&&t()})}static or(e){let t=P.resolve(!1);for(const n of e)t=t.next(s=>s?P.resolve(s):n());return t}static forEach(e,t){const n=[];return e.forEach((s,i)=>{n.push(t.call(this,s,i))}),this.waitFor(n)}static mapArray(e,t){return new P((n,s)=>{const i=e.length,o=new Array(i);let c=0;for(let l=0;l<i;l++){const u=l;t(e[u]).next(h=>{o[u]=h,++c,c===i&&n(o)},h=>s(h))}})}static doWhile(e,t){return new P((n,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):n()};i()})}}/**
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
 */class oa{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new Ge,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new ci(e,t.error)):this.V.resolve()},this.transaction.onerror=n=>{const s=sl(n.target.error);this.V.reject(new ci(e,s))}}static open(e,t,n,s){try{return new oa(t,e.transaction(s,n))}catch(i){throw new ci(t,i)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(O("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new sI(t)}}class Ut{constructor(e,t,n){this.name=e,this.version=t,this.p=n,Ut.S(Be())===12.2&&ke("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return O("SimpleDb","Removing database:",e),lr(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Zh())return!1;if(Ut.v())return!0;const e=Be(),t=Ut.S(e),n=0<t&&t<10,s=rp(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}async M(e){return this.db||(O("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new ci(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new L(C.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new L(C.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new ci(e,o))},s.onupgradeneeded=i=>{O("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.p.O(o,s.transaction,i.oldVersion,this.version).next(()=>{O("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const c=oa.open(this.db,e,i?"readonly":"readwrite",n),l=s(c).next(u=>(c.g(),u)).catch(u=>(c.abort(u),P.reject(u))).toPromise();return l.catch(()=>{}),await c.m,l}catch(c){const l=c,u=l.name!=="FirebaseError"&&o<3;if(O("SimpleDb","Transaction failed with error:",l.message,"Retrying:",u),this.close(),!u)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function rp(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class rI{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return lr(this.B.delete())}}class ci extends L{constructor(e,t){super(C.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Wn(r){return r.name==="IndexedDbTransactionError"}class sI{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(O("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(O("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),lr(n)}add(e){return O("SimpleDb","ADD",this.store.name,e,e),lr(this.store.add(e))}get(e){return lr(this.store.get(e)).next(t=>(t===void 0&&(t=null),O("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return O("SimpleDb","DELETE",this.store.name,e),lr(this.store.delete(e))}count(){return O("SimpleDb","COUNT",this.store.name),lr(this.store.count())}U(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new P((o,c)=>{i.onerror=l=>{c(l.target.error)},i.onsuccess=l=>{o(l.target.result)}})}{const i=this.cursor(n),o=[];return this.W(i,(c,l)=>{o.push(l)}).next(()=>o)}}G(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new P((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}})}j(e,t){O("SimpleDb","DELETE ALL",this.store.name);const n=this.options(e,t);n.H=!1;const s=this.cursor(n);return this.W(s,(i,o,c)=>c.delete())}J(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.W(s,t)}Y(e){const t=this.cursor({});return new P((n,s)=>{t.onerror=i=>{const o=sl(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():n()}):n()}})}W(e,t){const n=[];return new P((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const l=new rI(c),u=t(c.primaryKey,c.value,l);if(u instanceof P){const h=u.catch(p=>(l.done(),P.reject(p)));n.push(h)}l.isDone?s():l.K===null?c.continue():c.continue(l.K)}}).next(()=>P.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function lr(r){return new P((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=sl(n.target.error);t(s)}})}let kd=!1;function sl(r){const e=Ut.S(Be());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new L("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return kd||(kd=!0,setTimeout(()=>{throw n},0)),n}}return r}class iI{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){O("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{O("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){Wn(t)?O("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await Hn(t)}await this.X(6e4)})}}class oI{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){const n=new Set;let s=t,i=!0;return P.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return O("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,s).next(c=>{s-=c,n.add(o)});i=!1})).next(()=>t-s)}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(s,i)).next(c=>(O("IndexBackfiller",`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}re(e,t){let n=e;return t.changes.forEach((s,i)=>{const o=ep(i);rl(o,n)>0&&(n=o)}),new Et(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class mt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ie(n),this.se=n=>t.writeSequenceNumber(n))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}mt.oe=-1;function Di(r){return r==null}function yi(r){return r===0&&1/r==-1/0}function sp(r){return typeof r=="number"&&Number.isInteger(r)&&!yi(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */function rt(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Vd(e)),e=aI(r.get(t),e);return Vd(e)}function aI(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case"":t+="";break;default:t+=i}}return t}function Vd(r){return r+""}function Lt(r){const e=r.length;if(G(e>=2),e===2)return G(r.charAt(0)===""&&r.charAt(1)===""),ne.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf("",i);switch((o<0||o>t)&&q(),r.charAt(o+1)){case"":const c=r.substring(i,o);let l;s.length===0?l=c:(s+=c,l=s,s=""),n.push(l);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:q()}i=o+2}return new ne(n)}/**
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
 */const Dd=["userId","batchId"];/**
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
 */function Ro(r,e){return[r,rt(e)]}function ip(r,e,t){return[r,rt(e),t]}const cI={},lI=["prefixPath","collectionGroup","readTime","documentId"],uI=["prefixPath","collectionGroup","documentId"],dI=["collectionGroup","readTime","prefixPath","documentId"],hI=["canonicalId","targetId"],fI=["targetId","path"],pI=["path","targetId"],mI=["collectionId","parent"],gI=["indexId","uid"],yI=["uid","sequenceNumber"],_I=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],vI=["indexId","uid","orderedDocumentKey"],wI=["userId","collectionPath","documentId"],II=["userId","collectionPath","largestBatchId"],EI=["userId","collectionGroup","largestBatchId"],op=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],bI=[...op,"documentOverlays"],ap=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],cp=ap,il=[...cp,"indexConfiguration","indexState","indexEntries"],TI=il,AI=[...il,"globals"];/**
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
 */class vc extends np{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function $e(r,e){const t=F(r);return Ut.F(t._e,e)}/**
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
 */function Nd(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function Qn(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function lp(r,e){const t=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function up(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
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
 */class ve{constructor(e,t){this.comparator=e,this.root=t||Qe.EMPTY}insert(e,t){return new ve(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Qe.BLACK,null,null))}remove(e){return new ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Qe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new mo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new mo(this.root,e,this.comparator,!1)}getReverseIterator(){return new mo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new mo(this.root,e,this.comparator,!0)}}class mo{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Qe{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??Qe.RED,this.left=s??Qe.EMPTY,this.right=i??Qe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new Qe(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Qe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Qe.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Qe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Qe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw q();const e=this.left.check();if(e!==this.right.check())throw q();return e+(this.isRed()?0:1)}}Qe.EMPTY=null,Qe.RED=!0,Qe.BLACK=!1;Qe.EMPTY=new class{constructor(){this.size=0}get key(){throw q()}get value(){throw q()}get color(){throw q()}get left(){throw q()}get right(){throw q()}copy(e,t,n,s,i){return this}insert(e,t,n){return new Qe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class me{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ld(this.data.getIterator())}getIteratorFrom(e){return new Ld(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof me)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new me(this.comparator);return t.data=e,t}}class Ld{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function $r(r){return r.hasNext()?r.getNext():void 0}/**
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
 */class gt{constructor(e){this.fields=e,e.sort(be.comparator)}static empty(){return new gt([])}unionWith(e){let t=new me(be.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new gt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ns(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
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
 */class dp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */function SI(){return typeof atob<"u"}/**
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
 */class Re{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new dp("Invalid base64 string: "+i):i}}(e);return new Re(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new Re(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Re.EMPTY_BYTE_STRING=new Re("");const RI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function tn(r){if(G(!!r),typeof r=="string"){let e=0;const t=RI.exec(r);if(G(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:Te(r.seconds),nanos:Te(r.nanos)}}function Te(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function nn(r){return typeof r=="string"?Re.fromBase64String(r):Re.fromUint8Array(r)}/**
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
 */function aa(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function ca(r){const e=r.mapValue.fields.__previous_value__;return aa(e)?ca(e):e}function _i(r){const e=tn(r.mapValue.fields.__local_write_time__.timestampValue);return new _e(e.seconds,e.nanos)}/**
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
 */class PI{constructor(e,t,n,s,i,o,c,l,u){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=u}}class Ln{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Ln("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ln&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Pn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},Po={nullValue:"NULL_VALUE"};function On(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?aa(r)?4:hp(r)?9007199254740991:la(r)?10:11:q()}function jt(r,e){if(r===e)return!0;const t=On(r);if(t!==On(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return _i(r).isEqual(_i(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=tn(s.timestampValue),c=tn(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(s,i){return nn(s.bytesValue).isEqual(nn(i.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(s,i){return Te(s.geoPointValue.latitude)===Te(i.geoPointValue.latitude)&&Te(s.geoPointValue.longitude)===Te(i.geoPointValue.longitude)}(r,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Te(s.integerValue)===Te(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Te(s.doubleValue),c=Te(i.doubleValue);return o===c?yi(o)===yi(c):isNaN(o)&&isNaN(c)}return!1}(r,e);case 9:return ns(r.arrayValue.values||[],e.arrayValue.values||[],jt);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Nd(o)!==Nd(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!jt(o[l],c[l])))return!1;return!0}(r,e);default:return q()}}function vi(r,e){return(r.values||[]).find(t=>jt(t,e))!==void 0}function Mn(r,e){if(r===e)return 0;const t=On(r),n=On(e);if(t!==n)return J(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(r.booleanValue,e.booleanValue);case 2:return function(i,o){const c=Te(i.integerValue||i.doubleValue),l=Te(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(r,e);case 3:return Od(r.timestampValue,e.timestampValue);case 4:return Od(_i(r),_i(e));case 5:return J(r.stringValue,e.stringValue);case 6:return function(i,o){const c=nn(i),l=nn(o);return c.compareTo(l)}(r.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),l=o.split("/");for(let u=0;u<c.length&&u<l.length;u++){const h=J(c[u],l[u]);if(h!==0)return h}return J(c.length,l.length)}(r.referenceValue,e.referenceValue);case 8:return function(i,o){const c=J(Te(i.latitude),Te(o.latitude));return c!==0?c:J(Te(i.longitude),Te(o.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return Md(r.arrayValue,e.arrayValue);case 10:return function(i,o){var c,l,u,h;const p=i.fields||{},m=o.fields||{},y=(c=p.value)===null||c===void 0?void 0:c.arrayValue,b=(l=m.value)===null||l===void 0?void 0:l.arrayValue,R=J(((u=y==null?void 0:y.values)===null||u===void 0?void 0:u.length)||0,((h=b==null?void 0:b.values)===null||h===void 0?void 0:h.length)||0);return R!==0?R:Md(y,b)}(r.mapValue,e.mapValue);case 11:return function(i,o){if(i===Pn.mapValue&&o===Pn.mapValue)return 0;if(i===Pn.mapValue)return 1;if(o===Pn.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),u=o.fields||{},h=Object.keys(u);l.sort(),h.sort();for(let p=0;p<l.length&&p<h.length;++p){const m=J(l[p],h[p]);if(m!==0)return m;const y=Mn(c[l[p]],u[h[p]]);if(y!==0)return y}return J(l.length,h.length)}(r.mapValue,e.mapValue);default:throw q()}}function Od(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return J(r,e);const t=tn(r),n=tn(e),s=J(t.seconds,n.seconds);return s!==0?s:J(t.nanos,n.nanos)}function Md(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=Mn(t[s],n[s]);if(i)return i}return J(t.length,n.length)}function is(r){return wc(r)}function wc(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){const n=tn(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return nn(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return $.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=wc(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${wc(t.fields[o])}`;return s+"}"}(r.mapValue):q()}function xo(r){switch(On(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ca(r);return e?16+xo(e):16;case 5:return 2*r.stringValue.length;case 6:return nn(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+xo(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return Qn(n.fields,(i,o)=>{s+=i.length+xo(o)}),s}(r.mapValue);default:throw q()}}function wr(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Ic(r){return!!r&&"integerValue"in r}function wi(r){return!!r&&"arrayValue"in r}function Fd(r){return!!r&&"nullValue"in r}function Bd(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Co(r){return!!r&&"mapValue"in r}function la(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function li(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const e={mapValue:{fields:{}}};return Qn(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=li(n)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=li(r.arrayValue.values[t]);return e}return Object.assign({},r)}function hp(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const fp={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function xI(r){return"nullValue"in r?Po:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?wr(Ln.empty(),$.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?la(r)?fp:{mapValue:{}}:q()}function CI(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?wr(Ln.empty(),$.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?fp:"mapValue"in r?la(r)?{mapValue:{}}:Pn:q()}function $d(r,e){const t=Mn(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function Ud(r,e){const t=Mn(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
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
 */class Je{constructor(e){this.value=e}static empty(){return new Je({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Co(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=li(t)}setAll(e){let t=be.emptyPath(),n={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,n,s),n={},s=[],t=c.popLast()}o?n[c.lastSegment()]=li(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());Co(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return jt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Co(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){Qn(t,(s,i)=>e[s]=i);for(const s of n)delete e[s]}clone(){return new Je(li(this.value))}}function pp(r){const e=[];return Qn(r.fields,(t,n)=>{const s=new be([t]);if(Co(n)){const i=pp(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new gt(e)}/**
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
 */class Ee{constructor(e,t,n,s,i,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Ee(e,0,H.min(),H.min(),H.min(),Je.empty(),0)}static newFoundDocument(e,t,n,s){return new Ee(e,1,t,H.min(),n,s,0)}static newNoDocument(e,t){return new Ee(e,2,t,H.min(),H.min(),Je.empty(),0)}static newUnknownDocument(e,t){return new Ee(e,3,t,H.min(),H.min(),Je.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(H.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Je.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Je.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=H.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ee&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ee(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Fn{constructor(e,t){this.position=e,this.inclusive=t}}function qd(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=$.comparator($.fromName(o.referenceValue),t.key):n=Mn(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function jd(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!jt(r.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ii{constructor(e,t="asc"){this.field=e,this.dir=t}}function kI(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
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
 */class mp{}class re extends mp{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new VI(e,t,n):t==="array-contains"?new LI(e,n):t==="in"?new Ip(e,n):t==="not-in"?new OI(e,n):t==="array-contains-any"?new MI(e,n):new re(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new DI(e,n):new NI(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Mn(t,this.value)):t!==null&&On(this.value)===On(t)&&this.matchesComparison(Mn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return q()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class he extends mp{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new he(e,t)}matches(e){return os(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function os(r){return r.op==="and"}function Ec(r){return r.op==="or"}function ol(r){return gp(r)&&os(r)}function gp(r){for(const e of r.filters)if(e instanceof he)return!1;return!0}function bc(r){if(r instanceof re)return r.field.canonicalString()+r.op.toString()+is(r.value);if(ol(r))return r.filters.map(e=>bc(e)).join(",");{const e=r.filters.map(t=>bc(t)).join(",");return`${r.op}(${e})`}}function yp(r,e){return r instanceof re?function(n,s){return s instanceof re&&n.op===s.op&&n.field.isEqual(s.field)&&jt(n.value,s.value)}(r,e):r instanceof he?function(n,s){return s instanceof he&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,o,c)=>i&&yp(o,s.filters[c]),!0):!1}(r,e):void q()}function _p(r,e){const t=r.filters.concat(e);return he.create(t,r.op)}function vp(r){return r instanceof re?function(t){return`${t.field.canonicalString()} ${t.op} ${is(t.value)}`}(r):r instanceof he?function(t){return t.op.toString()+" {"+t.getFilters().map(vp).join(" ,")+"}"}(r):"Filter"}class VI extends re{constructor(e,t,n){super(e,t,n),this.key=$.fromName(n.referenceValue)}matches(e){const t=$.comparator(e.key,this.key);return this.matchesComparison(t)}}class DI extends re{constructor(e,t){super(e,"in",t),this.keys=wp("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class NI extends re{constructor(e,t){super(e,"not-in",t),this.keys=wp("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function wp(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(n=>$.fromName(n.referenceValue))}class LI extends re{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return wi(t)&&vi(t.arrayValue,this.value)}}class Ip extends re{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&vi(this.value.arrayValue,t)}}class OI extends re{constructor(e,t){super(e,"not-in",t)}matches(e){if(vi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!vi(this.value.arrayValue,t)}}class MI extends re{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!wi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>vi(this.value.arrayValue,n))}}/**
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
 */class FI{constructor(e,t=null,n=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.ue=null}}function Tc(r,e=null,t=[],n=[],s=null,i=null,o=null){return new FI(r,e,t,n,s,i,o)}function Ir(r){const e=F(r);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>bc(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),Di(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>is(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>is(n)).join(",")),e.ue=t}return e.ue}function Ni(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!kI(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!yp(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!jd(r.startAt,e.startAt)&&jd(r.endAt,e.endAt)}function jo(r){return $.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function zo(r,e){return r.filters.filter(t=>t instanceof re&&t.field.isEqual(e))}function zd(r,e,t){let n=Po,s=!0;for(const i of zo(r,e)){let o=Po,c=!0;switch(i.op){case"<":case"<=":o=xI(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Po}$d({value:n,inclusive:s},{value:o,inclusive:c})<0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];$d({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function Gd(r,e,t){let n=Pn,s=!0;for(const i of zo(r,e)){let o=Pn,c=!0;switch(i.op){case">=":case">":o=CI(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=Pn}Ud({value:n,inclusive:s},{value:o,inclusive:c})>0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Ud({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
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
 */class on{constructor(e,t=null,n=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Ep(r,e,t,n,s,i,o,c){return new on(r,e,t,n,s,i,o,c)}function bs(r){return new on(r)}function Kd(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function al(r){return r.collectionGroup!==null}function Xr(r){const e=F(r);if(e.ce===null){e.ce=[];const t=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new me(be.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(u=>{u.isInequality()&&(c=c.add(u.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Ii(i,n))}),t.has(be.keyField().canonicalString())||e.ce.push(new Ii(be.keyField(),n))}return e.ce}function st(r){const e=F(r);return e.le||(e.le=Tp(e,Xr(r))),e.le}function bp(r){const e=F(r);return e.he||(e.he=Tp(e,r.explicitOrderBy)),e.he}function Tp(r,e){if(r.limitType==="F")return Tc(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ii(s.field,i)});const t=r.endAt?new Fn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Fn(r.startAt.position,r.startAt.inclusive):null;return Tc(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function Ac(r,e){const t=r.filters.concat([e]);return new on(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function Go(r,e,t){return new on(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function Li(r,e){return Ni(st(r),st(e))&&r.limitType===e.limitType}function Ap(r){return`${Ir(st(r))}|lt:${r.limitType}`}function Gr(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(s=>vp(s)).join(", ")}]`),Di(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(s=>is(s)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(s=>is(s)).join(",")),`Target(${n})`}(st(r))}; limitType=${r.limitType})`}function Oi(r,e){return e.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):$.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,e)&&function(n,s){for(const i of Xr(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,e)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,e)&&function(n,s){return!(n.startAt&&!function(o,c,l){const u=qd(o,c,l);return o.inclusive?u<=0:u<0}(n.startAt,Xr(n),s)||n.endAt&&!function(o,c,l){const u=qd(o,c,l);return o.inclusive?u>=0:u>0}(n.endAt,Xr(n),s))}(r,e)}function Sp(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Rp(r){return(e,t)=>{let n=!1;for(const s of Xr(r)){const i=BI(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function BI(r,e,t){const n=r.field.isKeyField()?$.comparator(e.key,t.key):function(i,o,c){const l=o.data.field(i),u=c.data.field(i);return l!==null&&u!==null?Mn(l,u):q()}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return q()}}/**
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
 */class an{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Qn(this.inner,(t,n)=>{for(const[s,i]of n)e(s,i)})}isEmpty(){return up(this.inner)}size(){return this.innerSize}}/**
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
 */const $I=new ve($.comparator);function yt(){return $I}const Pp=new ve($.comparator);function ti(...r){let e=Pp;for(const t of r)e=e.insert(t.key,t);return e}function xp(r){let e=Pp;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function Ot(){return ui()}function Cp(){return ui()}function ui(){return new an(r=>r.toString(),(r,e)=>r.isEqual(e))}const UI=new ve($.comparator),qI=new me($.comparator);function X(...r){let e=qI;for(const t of r)e=e.add(t);return e}const jI=new me(J);function cl(){return jI}/**
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
 */function ll(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:yi(e)?"-0":e}}function kp(r){return{integerValue:""+r}}function Vp(r,e){return sp(e)?kp(e):ll(r,e)}/**
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
 */class ua{constructor(){this._=void 0}}function zI(r,e,t){return r instanceof as?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&aa(i)&&(i=ca(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(t,e):r instanceof Er?Np(r,e):r instanceof br?Lp(r,e):function(s,i){const o=Dp(s,i),c=Hd(o)+Hd(s.Pe);return Ic(o)&&Ic(s.Pe)?kp(c):ll(s.serializer,c)}(r,e)}function GI(r,e,t){return r instanceof Er?Np(r,e):r instanceof br?Lp(r,e):t}function Dp(r,e){return r instanceof cs?function(n){return Ic(n)||function(i){return!!i&&"doubleValue"in i}(n)}(e)?e:{integerValue:0}:null}class as extends ua{}class Er extends ua{constructor(e){super(),this.elements=e}}function Np(r,e){const t=Op(e);for(const n of r.elements)t.some(s=>jt(s,n))||t.push(n);return{arrayValue:{values:t}}}class br extends ua{constructor(e){super(),this.elements=e}}function Lp(r,e){let t=Op(e);for(const n of r.elements)t=t.filter(s=>!jt(s,n));return{arrayValue:{values:t}}}class cs extends ua{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Hd(r){return Te(r.integerValue||r.doubleValue)}function Op(r){return wi(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
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
 */class Mi{constructor(e,t){this.field=e,this.transform=t}}function KI(r,e){return r.field.isEqual(e.field)&&function(n,s){return n instanceof Er&&s instanceof Er||n instanceof br&&s instanceof br?ns(n.elements,s.elements,jt):n instanceof cs&&s instanceof cs?jt(n.Pe,s.Pe):n instanceof as&&s instanceof as}(r.transform,e.transform)}class HI{constructor(e,t){this.version=e,this.transformResults=t}}class Ae{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ae}static exists(e){return new Ae(void 0,e)}static updateTime(e){return new Ae(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ko(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class da{}function Mp(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new As(r.key,Ae.none()):new Ts(r.key,r.data,Ae.none());{const t=r.data,n=Je.empty();let s=new me(be.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new cn(r.key,n,new gt(s.toArray()),Ae.none())}}function WI(r,e,t){r instanceof Ts?function(s,i,o){const c=s.value.clone(),l=Qd(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(r,e,t):r instanceof cn?function(s,i,o){if(!ko(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Qd(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(Fp(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(r,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function di(r,e,t,n){return r instanceof Ts?function(i,o,c,l){if(!ko(i.precondition,o))return c;const u=i.value.clone(),h=Jd(i.fieldTransforms,l,o);return u.setAll(h),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(r,e,t,n):r instanceof cn?function(i,o,c,l){if(!ko(i.precondition,o))return c;const u=Jd(i.fieldTransforms,l,o),h=o.data;return h.setAll(Fp(i)),h.setAll(u),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(r,e,t,n):function(i,o,c){return ko(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(r,e,t)}function QI(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=Dp(n.transform,s||null);i!=null&&(t===null&&(t=Je.empty()),t.set(n.field,i))}return t||null}function Wd(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&ns(n,s,(i,o)=>KI(i,o))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class Ts extends da{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class cn extends da{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Fp(r){const e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}}),e}function Qd(r,e,t){const n=new Map;G(r.length===t.length);for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,c=e.data.field(i.field);n.set(i.field,GI(o,c,t[s]))}return n}function Jd(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,zI(i,o,e))}return n}class As extends da{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ul extends da{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class dl{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&WI(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=di(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=di(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Cp();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const l=Mp(o,c);l!==null&&n.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(H.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),X())}isEqual(e){return this.batchId===e.batchId&&ns(this.mutations,e.mutations,(t,n)=>Wd(t,n))&&ns(this.baseMutations,e.baseMutations,(t,n)=>Wd(t,n))}}class hl{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){G(e.mutations.length===n.length);let s=function(){return UI}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new hl(e,t,n,s)}}/**
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
 */class fl{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
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
 */class Bp{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}/**
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
 */class JI{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Oe,se;function $p(r){switch(r){default:return q();case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0}}function Up(r){if(r===void 0)return ke("GRPC error has no .code"),C.UNKNOWN;switch(r){case Oe.OK:return C.OK;case Oe.CANCELLED:return C.CANCELLED;case Oe.UNKNOWN:return C.UNKNOWN;case Oe.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case Oe.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case Oe.INTERNAL:return C.INTERNAL;case Oe.UNAVAILABLE:return C.UNAVAILABLE;case Oe.UNAUTHENTICATED:return C.UNAUTHENTICATED;case Oe.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case Oe.NOT_FOUND:return C.NOT_FOUND;case Oe.ALREADY_EXISTS:return C.ALREADY_EXISTS;case Oe.PERMISSION_DENIED:return C.PERMISSION_DENIED;case Oe.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case Oe.ABORTED:return C.ABORTED;case Oe.OUT_OF_RANGE:return C.OUT_OF_RANGE;case Oe.UNIMPLEMENTED:return C.UNIMPLEMENTED;case Oe.DATA_LOSS:return C.DATA_LOSS;default:return q()}}(se=Oe||(Oe={}))[se.OK=0]="OK",se[se.CANCELLED=1]="CANCELLED",se[se.UNKNOWN=2]="UNKNOWN",se[se.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",se[se.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",se[se.NOT_FOUND=5]="NOT_FOUND",se[se.ALREADY_EXISTS=6]="ALREADY_EXISTS",se[se.PERMISSION_DENIED=7]="PERMISSION_DENIED",se[se.UNAUTHENTICATED=16]="UNAUTHENTICATED",se[se.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",se[se.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",se[se.ABORTED=10]="ABORTED",se[se.OUT_OF_RANGE=11]="OUT_OF_RANGE",se[se.UNIMPLEMENTED=12]="UNIMPLEMENTED",se[se.INTERNAL=13]="INTERNAL",se[se.UNAVAILABLE=14]="UNAVAILABLE",se[se.DATA_LOSS=15]="DATA_LOSS";/**
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
 */let Ko=null;/**
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
 */function qp(){return new TextEncoder}/**
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
 */const YI=new pr([4294967295,4294967295],0);function Yd(r){const e=qp().encode(r),t=new jf;return t.update(e),new Uint8Array(t.digest())}function Xd(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new pr([t,n],0),new pr([s,i],0)]}class pl{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new ni(`Invalid padding: ${t}`);if(n<0)throw new ni(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new ni(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new ni(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=pr.fromNumber(this.Ie)}Ee(e,t,n){let s=e.add(t.multiply(pr.fromNumber(n)));return s.compare(YI)===1&&(s=new pr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=Yd(e),[n,s]=Xd(t);for(let i=0;i<this.hashCount;i++){const o=this.Ee(n,s,i);if(!this.de(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new pl(i,s,t);return n.forEach(c=>o.insert(c)),o}insert(e){if(this.Ie===0)return;const t=Yd(e),[n,s]=Xd(t);for(let i=0;i<this.hashCount;i++){const o=this.Ee(n,s,i);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class ni extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Fi{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Bi.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Fi(H.min(),s,new ve(J),yt(),X())}}class Bi{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Bi(n,t,X(),X(),X())}}/**
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
 */class Vo{constructor(e,t,n,s){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=s}}class jp{constructor(e,t){this.targetId=e,this.me=t}}class zp{constructor(e,t,n=Re.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class Zd{constructor(){this.fe=0,this.ge=th(),this.pe=Re.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=X(),t=X(),n=X();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:q()}}),new Bi(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=th()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,G(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class XI{constructor(e){this.Le=e,this.Be=new Map,this.ke=yt(),this.qe=eh(),this.Qe=new ve(J)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:q()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((n,s)=>{this.ze(s)&&t(s)})}He(e){const t=e.targetId,n=e.me.count,s=this.Je(t);if(s){const i=s.target;if(jo(i))if(n===0){const o=new $(i.path);this.Ue(t,o,Ee.newNoDocument(o,H.min()))}else G(n===1);else{const o=this.Ye(t);if(o!==n){const c=this.Ze(e),l=c?this.Xe(c,e,o):1;if(l!==0){this.je(t);const u=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,u)}Ko==null||Ko.et(function(h,p,m,y,b){var R,A,k,D,N,z;const M={localCacheCount:h,existenceFilterCount:p.count,databaseId:m.database,projectId:m.projectId},U=p.unchangedNames;return U&&(M.bloomFilter={applied:b===0,hashCount:(R=U==null?void 0:U.hashCount)!==null&&R!==void 0?R:0,bitmapLength:(D=(k=(A=U==null?void 0:U.bits)===null||A===void 0?void 0:A.bitmap)===null||k===void 0?void 0:k.length)!==null&&D!==void 0?D:0,padding:(z=(N=U==null?void 0:U.bits)===null||N===void 0?void 0:N.padding)!==null&&z!==void 0?z:0,mightContain:E=>{var _;return(_=y==null?void 0:y.mightContain(E))!==null&&_!==void 0&&_}}),M}(o,e.me,this.Le.tt(),c,l))}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=nn(n).toUint8Array()}catch(l){if(l instanceof dp)return It("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new pl(o,s,i)}catch(l){return It(l instanceof ni?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ie===0?null:c}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){const n=this.Le.getRemoteKeysForTarget(t);let s=0;return n.forEach(i=>{const o=this.Le.tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,i,null),s++)}),s}rt(e){const t=new Map;this.Be.forEach((i,o)=>{const c=this.Je(o);if(c){if(i.current&&jo(c.target)){const l=new $(c.target.path);this.ke.get(l)!==null||this.it(o,l)||this.Ue(o,l,Ee.newNoDocument(l,e))}i.be&&(t.set(o,i.ve()),i.Ce())}});let n=X();this.qe.forEach((i,o)=>{let c=!0;o.forEachWhile(l=>{const u=this.Je(l);return!u||u.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(n=n.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new Fi(e,t,this.Qe,this.ke,n);return this.ke=yt(),this.qe=eh(),this.Qe=new ve(J),s}$e(e,t){if(!this.ze(e))return;const n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Zd,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new me(J),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Zd),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function eh(){return new ve($.comparator)}function th(){return new ve($.comparator)}const ZI={asc:"ASCENDING",desc:"DESCENDING"},eE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},tE={and:"AND",or:"OR"};class nE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Sc(r,e){return r.useProto3Json||Di(e)?e:{value:e}}function ls(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Gp(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function rE(r,e){return ls(r,e.toTimestamp())}function Ve(r){return G(!!r),H.fromTimestamp(function(t){const n=tn(t);return new _e(n.seconds,n.nanos)}(r))}function ml(r,e){return Rc(r,e).canonicalString()}function Rc(r,e){const t=function(s){return new ne(["projects",s.projectId,"databases",s.database])}(r).child("documents");return e===void 0?t:t.child(e)}function Kp(r){const e=ne.fromString(r);return G(nm(e)),e}function Ei(r,e){return ml(r.databaseId,e.path)}function qt(r,e){const t=Kp(e);if(t.get(1)!==r.databaseId.projectId)throw new L(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new L(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new $(Qp(t))}function Hp(r,e){return ml(r.databaseId,e)}function Wp(r){const e=Kp(r);return e.length===4?ne.emptyPath():Qp(e)}function Pc(r){return new ne(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Qp(r){return G(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function nh(r,e,t){return{name:Ei(r,e),fields:t.value.mapValue.fields}}function Jp(r,e,t){const n=qt(r,e.name),s=Ve(e.updateTime),i=e.createTime?Ve(e.createTime):H.min(),o=new Je({mapValue:{fields:e.fields}}),c=Ee.newFoundDocument(n,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function sE(r,e){return"found"in e?function(n,s){G(!!s.found),s.found.name,s.found.updateTime;const i=qt(n,s.found.name),o=Ve(s.found.updateTime),c=s.found.createTime?Ve(s.found.createTime):H.min(),l=new Je({mapValue:{fields:s.found.fields}});return Ee.newFoundDocument(i,o,c,l)}(r,e):"missing"in e?function(n,s){G(!!s.missing),G(!!s.readTime);const i=qt(n,s.missing),o=Ve(s.readTime);return Ee.newNoDocument(i,o)}(r,e):q()}function iE(r,e){let t;if("targetChange"in e){e.targetChange;const n=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:q()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(u,h){return u.useProto3Json?(G(h===void 0||typeof h=="string"),Re.fromBase64String(h||"")):(G(h===void 0||h instanceof Buffer||h instanceof Uint8Array),Re.fromUint8Array(h||new Uint8Array))}(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(u){const h=u.code===void 0?C.UNKNOWN:Up(u.code);return new L(h,u.message||"")}(o);t=new zp(n,s,i,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=qt(r,n.document.name),i=Ve(n.document.updateTime),o=n.document.createTime?Ve(n.document.createTime):H.min(),c=new Je({mapValue:{fields:n.document.fields}}),l=Ee.newFoundDocument(s,i,o,c),u=n.targetIds||[],h=n.removedTargetIds||[];t=new Vo(u,h,l.key,l)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=qt(r,n.document),i=n.readTime?Ve(n.readTime):H.min(),o=Ee.newNoDocument(s,i),c=n.removedTargetIds||[];t=new Vo([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=qt(r,n.document),i=n.removedTargetIds||[];t=new Vo([],i,s,null)}else{if(!("filter"in e))return q();{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new JI(s,i),c=n.targetId;t=new jp(c,o)}}return t}function bi(r,e){let t;if(e instanceof Ts)t={update:nh(r,e.key,e.value)};else if(e instanceof As)t={delete:Ei(r,e.key)};else if(e instanceof cn)t={update:nh(r,e.key,e.data),updateMask:dE(e.fieldMask)};else{if(!(e instanceof ul))return q();t={verify:Ei(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(i,o){const c=o.transform;if(c instanceof as)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Er)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof br)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof cs)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw q()}(0,n))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:rE(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:q()}(r,e.precondition)),t}function xc(r,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?Ae.updateTime(Ve(i.updateTime)):i.exists!==void 0?Ae.exists(i.exists):Ae.none()}(e.currentDocument):Ae.none(),n=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let l=null;if("setToServerValue"in c)G(c.setToServerValue==="REQUEST_TIME"),l=new as;else if("appendMissingElements"in c){const h=c.appendMissingElements.values||[];l=new Er(h)}else if("removeAllFromArray"in c){const h=c.removeAllFromArray.values||[];l=new br(h)}else"increment"in c?l=new cs(o,c.increment):q();const u=be.fromServerFormat(c.fieldPath);return new Mi(u,l)}(r,s)):[];if(e.update){e.update.name;const s=qt(r,e.update.name),i=new Je({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const u=l.fieldPaths||[];return new gt(u.map(h=>be.fromServerFormat(h)))}(e.updateMask);return new cn(s,i,o,t,n)}return new Ts(s,i,t,n)}if(e.delete){const s=qt(r,e.delete);return new As(s,t)}if(e.verify){const s=qt(r,e.verify);return new ul(s,t)}return q()}function oE(r,e){return r&&r.length>0?(G(e!==void 0),r.map(t=>function(s,i){let o=s.updateTime?Ve(s.updateTime):Ve(i);return o.isEqual(H.min())&&(o=Ve(i)),new HI(o,s.transformResults||[])}(t,e))):[]}function Yp(r,e){return{documents:[Hp(r,e.path)]}}function ha(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Hp(r,s);const i=function(u){if(u.length!==0)return tm(he.create(u,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(u){if(u.length!==0)return u.map(h=>function(m){return{field:Tn(m.field),direction:cE(m.dir)}}(h))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Sc(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{_t:t,parent:s}}function Xp(r,e,t,n){const{_t:s,parent:i}=ha(r,e),o={},c=[];let l=0;return t.forEach(u=>{const h=n?u.alias:"aggregate_"+l++;o[h]=u.alias,u.aggregateType==="count"?c.push({alias:h,count:{}}):u.aggregateType==="avg"?c.push({alias:h,avg:{field:Tn(u.fieldPath)}}):u.aggregateType==="sum"&&c.push({alias:h,sum:{field:Tn(u.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:s.structuredQuery},parent:s.parent},ut:o,parent:i}}function Zp(r){let e=Wp(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){G(n===1);const h=t.from[0];h.allDescendants?s=h.collectionId:e=e.child(h.collectionId)}let i=[];t.where&&(i=function(p){const m=em(p);return m instanceof he&&ol(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(m=>function(b){return new Ii(Kr(b.field),function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(m))}(t.orderBy));let c=null;t.limit&&(c=function(p){let m;return m=typeof p=="object"?p.value:p,Di(m)?null:m}(t.limit));let l=null;t.startAt&&(l=function(p){const m=!!p.before,y=p.values||[];return new Fn(y,m)}(t.startAt));let u=null;return t.endAt&&(u=function(p){const m=!p.before,y=p.values||[];return new Fn(y,m)}(t.endAt)),Ep(e,s,o,i,c,"F",l,u)}function aE(r,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return q()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function em(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Kr(t.unaryFilter.field);return re.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Kr(t.unaryFilter.field);return re.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Kr(t.unaryFilter.field);return re.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Kr(t.unaryFilter.field);return re.create(o,"!=",{nullValue:"NULL_VALUE"});default:return q()}}(r):r.fieldFilter!==void 0?function(t){return re.create(Kr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return q()}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return he.create(t.compositeFilter.filters.map(n=>em(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return q()}}(t.compositeFilter.op))}(r):q()}function cE(r){return ZI[r]}function lE(r){return eE[r]}function uE(r){return tE[r]}function Tn(r){return{fieldPath:r.canonicalString()}}function Kr(r){return be.fromServerFormat(r.fieldPath)}function tm(r){return r instanceof re?function(t){if(t.op==="=="){if(Bd(t.value))return{unaryFilter:{field:Tn(t.field),op:"IS_NAN"}};if(Fd(t.value))return{unaryFilter:{field:Tn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Bd(t.value))return{unaryFilter:{field:Tn(t.field),op:"IS_NOT_NAN"}};if(Fd(t.value))return{unaryFilter:{field:Tn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Tn(t.field),op:lE(t.op),value:t.value}}}(r):r instanceof he?function(t){const n=t.getFilters().map(s=>tm(s));return n.length===1?n[0]:{compositeFilter:{op:uE(t.op),filters:n}}}(r):q()}function dE(r){const e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function nm(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
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
 */class Jt{constructor(e,t,n,s,i=H.min(),o=H.min(),c=Re.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Jt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class rm{constructor(e){this.ct=e}}function hE(r,e){let t;if(e.document)t=Jp(r.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=$.fromSegments(e.noDocument.path),s=Ar(e.noDocument.readTime);t=Ee.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return q();{const n=$.fromSegments(e.unknownDocument.path),s=Ar(e.unknownDocument.version);t=Ee.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime(function(s){const i=new _e(s[0],s[1]);return H.fromTimestamp(i)}(e.readTime)),t}function rh(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Ho(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(i,o){return{name:Ei(i,o.key),fields:o.data.value.mapValue.fields,updateTime:ls(i,o.version.toTimestamp()),createTime:ls(i,o.createTime.toTimestamp())}}(r.ct,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Tr(e.version)};else{if(!e.isUnknownDocument())return q();n.unknownDocument={path:t.path.toArray(),version:Tr(e.version)}}return n}function Ho(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function Tr(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Ar(r){const e=new _e(r.seconds,r.nanoseconds);return H.fromTimestamp(e)}function ur(r,e){const t=(e.baseMutations||[]).map(i=>xc(r.ct,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map(i=>xc(r.ct,i)),s=_e.fromMillis(e.localWriteTimeMs);return new dl(e.batchId,s,t,n)}function ri(r){const e=Ar(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?Ar(r.lastLimboFreeSnapshotVersion):H.min();let n;return n=function(i){return i.documents!==void 0}(r.query)?function(i){return G(i.documents.length===1),st(bs(Wp(i.documents[0])))}(r.query):function(i){return st(Zp(i))}(r.query),new Jt(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,Re.fromBase64String(r.resumeToken))}function sm(r,e){const t=Tr(e.snapshotVersion),n=Tr(e.lastLimboFreeSnapshotVersion);let s;s=jo(e.target)?Yp(r.ct,e.target):ha(r.ct,e.target)._t;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Ir(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function gl(r){const e=Zp({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Go(e,e.limit,"L"):e}function tc(r,e){return new fl(e.largestBatchId,xc(r.ct,e.overlayMutation))}function sh(r,e){const t=e.path.lastSegment();return[r,rt(e.path.popLast()),t]}function ih(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:Tr(n.readTime),documentKey:rt(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class fE{getBundleMetadata(e,t){return oh(e).get(t).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:Ar(i.createTime),version:i.version}}(n)})}saveBundleMetadata(e,t){return oh(e).put(function(s){return{bundleId:s.id,createTime:Tr(Ve(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return ah(e).get(t).next(n=>{if(n)return function(i){return{name:i.name,query:gl(i.bundledQuery),readTime:Ar(i.readTime)}}(n)})}saveNamedQuery(e,t){return ah(e).put(function(s){return{name:s.name,readTime:Tr(Ve(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function oh(r){return $e(r,"bundles")}function ah(r){return $e(r,"namedQueries")}/**
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
 */class fa{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const n=t.uid||"";return new fa(e,n)}getOverlay(e,t){return Hs(e).get(sh(this.userId,t)).next(n=>n?tc(this.serializer,n):null)}getOverlays(e,t){const n=Ot();return P.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(e,t,n){const s=[];return n.forEach((i,o)=>{const c=new fl(t,o);s.push(this.ht(e,c))}),P.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach(o=>s.add(rt(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(Hs(e).j("collectionPathOverlayIndex",c))}),P.waitFor(i)}getOverlaysForCollection(e,t,n){const s=Ot(),i=rt(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Hs(e).U("collectionPathOverlayIndex",o).next(c=>{for(const l of c){const u=tc(this.serializer,l);s.set(u.getKey(),u)}return s})}getOverlaysForCollectionGroup(e,t,n,s){const i=Ot();let o;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Hs(e).J({index:"collectionGroupOverlayIndex",range:c},(l,u,h)=>{const p=tc(this.serializer,u);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):h.done()}).next(()=>i)}ht(e,t){return Hs(e).put(function(s,i,o){const[c,l,u]=sh(i,o.mutation.key);return{userId:i,collectionPath:l,documentId:u,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:bi(s.ct,o.mutation)}}(this.serializer,this.userId,t))}}function Hs(r){return $e(r,"documentOverlays")}/**
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
 */class pE{Pt(e){return $e(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(t=>{const n=t==null?void 0:t.value;return n?Re.fromUint8Array(n):Re.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class dr{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(Te(e.integerValue));else if("doubleValue"in e){const n=Te(e.doubleValue);isNaN(n)?this.dt(t,13):(this.dt(t,15),yi(n)?t.At(0):t.At(n))}else if("timestampValue"in e){let n=e.timestampValue;this.dt(t,20),typeof n=="string"&&(n=tn(n)),t.Rt(`${n.seconds||""}`),t.At(n.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(nn(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.dt(t,45),t.At(n.latitude||0),t.At(n.longitude||0)}else"mapValue"in e?hp(e)?this.dt(t,Number.MAX_SAFE_INTEGER):la(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):q()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const n=e.fields||{};this.dt(t,55);for(const s of Object.keys(n))this.Vt(s,t),this.Tt(n[s],t)}wt(e,t){var n,s;const i=e.fields||{};this.dt(t,53);const o="value",c=((s=(n=i[o].arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.length)||0;this.dt(t,15),t.At(Te(c)),this.Vt(o,t),this.Tt(i[o],t)}bt(e,t){const n=e.values||[];this.dt(t,50);for(const s of n)this.Tt(s,t)}yt(e,t){this.dt(t,37),$.fromName(e).path.forEach(n=>{this.dt(t,60),this.Dt(n,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}dr.vt=new dr;function mE(r){if(r===0)return 8;let e=0;return!(r>>4)&&(e+=4,r<<=4),!(r>>6)&&(e+=2,r<<=2),!(r>>7)&&(e+=1),e}function ch(r){const e=64-function(n){let s=0;for(let i=0;i<8;++i){const o=mE(255&n[i]);if(s+=o,o!==8)break}return s}(r);return Math.ceil(e/8)}class gE{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ft(n.value),n=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ot(n.value),n=t.next();this.Nt()}Lt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ft(n);else if(n<2048)this.Ft(960|n>>>6),this.Ft(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|n>>>12),this.Ft(128|63&n>>>6),this.Ft(128|63&n);else{const s=t.codePointAt(0);this.Ft(240|s>>>18),this.Ft(128|63&s>>>12),this.Ft(128|63&s>>>6),this.Ft(128|63&s)}}this.Mt()}Bt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ot(n);else if(n<2048)this.Ot(960|n>>>6),this.Ot(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|n>>>12),this.Ot(128|63&n>>>6),this.Ot(128|63&n);else{const s=t.codePointAt(0);this.Ot(240|s>>>18),this.Ot(128|63&s>>>12),this.Ot(128|63&s>>>6),this.Ot(128|63&s)}}this.Nt()}kt(e){const t=this.qt(e),n=ch(t);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Kt(e){const t=this.qt(e),n=ch(t);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),n=(128&t[0])!=0;t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class yE{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class _E{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class Ws{constructor(){this.jt=new gE,this.Ht=new yE(this.jt),this.Jt=new _E(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
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
 */class hr{constructor(e,t,n,s){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=s}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new hr(this.indexId,this.documentKey,this.arrayValue,n)}}function mn(r,e){let t=r.indexId-e.indexId;return t!==0?t:(t=lh(r.arrayValue,e.arrayValue),t!==0?t:(t=lh(r.directionalValue,e.directionalValue),t!==0?t:$.comparator(r.documentKey,e.documentKey)))}function lh(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}/**
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
 */class uh{constructor(e){this.Xt=new me((t,n)=>be.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Xt=this.Xt.add(n):this.tn.push(n)}}get nn(){return this.Xt.size>1}rn(e){if(G(e.collectionGroup===this.collectionId),this.nn)return!1;const t=_c(e);if(t!==void 0&&!this.sn(t))return!1;const n=cr(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.sn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Xt.size>0){const c=this.Xt.getIterator().getNext();if(!s.has(c.field.canonicalString())){const l=n[i];if(!this.on(c,l)||!this._n(this.en[o++],l))return!1}++i}for(;i<n.length;++i){const c=n[i];if(o>=this.en.length||!this._n(this.en[o++],c))return!1}return!0}an(){if(this.nn)return null;let e=new me(be.comparator);const t=[];for(const n of this.tn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new mr(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new mr(n.field,0))}for(const n of this.en)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new mr(n.field,n.dir==="asc"?0:1)));return new rs(rs.UNKNOWN_ID,this.collectionId,t,ss.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function im(r){var e,t;if(G(r instanceof re||r instanceof he),r instanceof re){if(r instanceof Ip){const s=((t=(e=r.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(i=>re.create(r.field,"==",i)))||[];return he.create(s,"or")}return r}const n=r.filters.map(s=>im(s));return he.create(n,r.op)}function vE(r){if(r.getFilters().length===0)return[];const e=Vc(im(r));return G(om(e)),Cc(e)||kc(e)?[e]:e.getFilters()}function Cc(r){return r instanceof re}function kc(r){return r instanceof he&&ol(r)}function om(r){return Cc(r)||kc(r)||function(t){if(t instanceof he&&Ec(t)){for(const n of t.getFilters())if(!Cc(n)&&!kc(n))return!1;return!0}return!1}(r)}function Vc(r){if(G(r instanceof re||r instanceof he),r instanceof re)return r;if(r.filters.length===1)return Vc(r.filters[0]);const e=r.filters.map(n=>Vc(n));let t=he.create(e,r.op);return t=Wo(t),om(t)?t:(G(t instanceof he),G(os(t)),G(t.filters.length>1),t.filters.reduce((n,s)=>yl(n,s)))}function yl(r,e){let t;return G(r instanceof re||r instanceof he),G(e instanceof re||e instanceof he),t=r instanceof re?e instanceof re?function(s,i){return he.create([s,i],"and")}(r,e):dh(r,e):e instanceof re?dh(e,r):function(s,i){if(G(s.filters.length>0&&i.filters.length>0),os(s)&&os(i))return _p(s,i.getFilters());const o=Ec(s)?s:i,c=Ec(s)?i:s,l=o.filters.map(u=>yl(u,c));return he.create(l,"or")}(r,e),Wo(t)}function dh(r,e){if(os(e))return _p(e,r.getFilters());{const t=e.filters.map(n=>yl(r,n));return he.create(t,"or")}}function Wo(r){if(G(r instanceof re||r instanceof he),r instanceof re)return r;const e=r.getFilters();if(e.length===1)return Wo(e[0]);if(gp(r))return r;const t=e.map(s=>Wo(s)),n=[];return t.forEach(s=>{s instanceof re?n.push(s):s instanceof he&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:he.create(n,r.op)}/**
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
 */class wE{constructor(){this.un=new _l}addToCollectionParentIndex(e,t){return this.un.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(Et.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(Et.min())}updateCollectionGroup(e,t,n){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class _l{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new me(ne.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new me(ne.comparator)).toArray()}}/**
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
 */const go=new Uint8Array(0);class IE{constructor(e,t){this.databaseId=t,this.cn=new _l,this.ln=new an(n=>Ir(n),(n,s)=>Ni(n,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.cn.add(t)});const i={collectionId:n,parent:rt(s)};return hh(e).put(i)}return P.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[Xf(t),""],!1,!0);return hh(e).U(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;n.push(Lt(o.parent))}return n})}addFieldIndex(e,t){const n=Qs(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=qr(e);return i.next(c=>{o.put(ih(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const n=Qs(e),s=qr(e),i=Ur(e);return n.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Qs(e),n=Ur(e),s=qr(e);return t.j().next(()=>n.j()).next(()=>s.j())}createTargetIndexes(e,t){return P.forEach(this.hn(t),n=>this.getIndexType(e,n).next(s=>{if(s===0||s===1){const i=new uh(n).an();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const n=Ur(e);let s=!0;const i=new Map;return P.forEach(this.hn(t),o=>this.Pn(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=X();const c=[];return P.forEach(i,(l,u)=>{O("IndexedDbIndexManager",`Using index ${function(N){return`id=${N.indexId}|cg=${N.collectionGroup}|f=${N.fields.map(z=>`${z.fieldPath}:${z.kind}`).join(",")}`}(l)} to execute ${Ir(t)}`);const h=function(N,z){const M=_c(z);if(M===void 0)return null;for(const U of zo(N,M.fieldPath))switch(U.op){case"array-contains-any":return U.value.arrayValue.values||[];case"array-contains":return[U.value]}return null}(u,l),p=function(N,z){const M=new Map;for(const U of cr(z))for(const E of zo(N,U.fieldPath))switch(E.op){case"==":case"in":M.set(U.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return M.set(U.fieldPath.canonicalString(),E.value),Array.from(M.values())}return null}(u,l),m=function(N,z){const M=[];let U=!0;for(const E of cr(z)){const _=E.kind===0?zd(N,E.fieldPath,N.startAt):Gd(N,E.fieldPath,N.startAt);M.push(_.value),U&&(U=_.inclusive)}return new Fn(M,U)}(u,l),y=function(N,z){const M=[];let U=!0;for(const E of cr(z)){const _=E.kind===0?Gd(N,E.fieldPath,N.endAt):zd(N,E.fieldPath,N.endAt);M.push(_.value),U&&(U=_.inclusive)}return new Fn(M,U)}(u,l),b=this.In(l,u,m),R=this.In(l,u,y),A=this.Tn(l,u,p),k=this.En(l.indexId,h,b,m.inclusive,R,y.inclusive,A);return P.forEach(k,D=>n.G(D,t.limit).next(N=>{N.forEach(z=>{const M=$.fromSegments(z.documentKey);o.has(M)||(o=o.add(M),c.push(M))})}))}).next(()=>c)}return P.resolve(null)})}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=vE(he.create(e.filters,"and")).map(n=>Tc(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,t),t)}En(e,t,n,s,i,o,c){const l=(t!=null?t.length:1)*Math.max(n.length,i.length),u=l/(t!=null?t.length:1),h=[];for(let p=0;p<l;++p){const m=t?this.dn(t[p/u]):go,y=this.An(e,m,n[p%u],s),b=this.Rn(e,m,i[p%u],o),R=c.map(A=>this.An(e,m,A,!0));h.push(...this.createRange(y,b,R))}return h}An(e,t,n,s){const i=new hr(e,$.empty(),t,n);return s?i:i.Zt()}Rn(e,t,n,s){const i=new hr(e,$.empty(),t,n);return s?i.Zt():i}Pn(e,t){const n=new uh(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)n.rn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let n=2;const s=this.hn(t);return P.forEach(s,i=>this.Pn(e,i).next(o=>{o?n!==0&&o.fields.length<function(l){let u=new me(be.comparator),h=!1;for(const p of l.filters)for(const m of p.getFlattenedFilters())m.field.isKeyField()||(m.op==="array-contains"||m.op==="array-contains-any"?h=!0:u=u.add(m.field));for(const p of l.orderBy)p.field.isKeyField()||(u=u.add(p.field));return u.size+(h?1:0)}(i)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&n===2?1:n)}Vn(e,t){const n=new Ws;for(const s of cr(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.Yt(s.kind);dr.vt.It(i,o)}return n.zt()}dn(e){const t=new Ws;return dr.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const n=new Ws;return dr.vt.It(wr(this.databaseId,t),n.Yt(function(i){const o=cr(i);return o.length===0?0:o[o.length-1].kind}(e))),n.zt()}Tn(e,t,n){if(n===null)return[];let s=[];s.push(new Ws);let i=0;for(const o of cr(e)){const c=n[i++];for(const l of s)if(this.fn(t,o.fieldPath)&&wi(c))s=this.gn(s,o,c);else{const u=l.Yt(o.kind);dr.vt.It(c,u)}}return this.pn(s)}In(e,t,n){return this.Tn(e,t,n.position)}pn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].zt();return t}gn(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const c of s){const l=new Ws;l.seed(c.zt()),dr.vt.It(o,l.Yt(t.kind)),i.push(l)}return i}fn(e,t){return!!e.filters.find(n=>n instanceof re&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=Qs(e),s=qr(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next(i=>{const o=[];return P.forEach(i,c=>s.get([c.indexId,this.uid]).next(l=>{o.push(function(h,p){const m=p?new ss(p.sequenceNumber,new Et(Ar(p.readTime),new $(Lt(p.documentKey)),p.largestBatchId)):ss.empty(),y=h.fields.map(([b,R])=>new mr(be.fromServerFormat(b),R));return new rs(h.indexId,h.collectionGroup,y,m)}(c,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:J(n.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const s=Qs(e),i=qr(e);return this.yn(e).next(o=>s.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(c=>P.forEach(c,l=>i.put(ih(l.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){const n=new Map;return P.forEach(t,(s,i)=>{const o=n.get(s.collectionGroup);return(o?P.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(n.set(s.collectionGroup,c),P.forEach(c,l=>this.wn(e,s,l).next(u=>{const h=this.Sn(i,l);return u.isEqual(h)?P.resolve():this.bn(e,i,l,u,h)}))))})}Dn(e,t,n,s){return Ur(e).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.mn(n,t.key),documentKey:t.key.path.toArray()})}vn(e,t,n,s){return Ur(e).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.mn(n,t.key),t.key.path.toArray()])}wn(e,t,n){const s=Ur(e);let i=new me(mn);return s.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,t)])},(o,c)=>{i=i.add(new hr(n.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>i)}Sn(e,t){let n=new me(mn);const s=this.Vn(t,e);if(s==null)return n;const i=_c(t);if(i!=null){const o=e.data.field(i.fieldPath);if(wi(o))for(const c of o.arrayValue.values||[])n=n.add(new hr(t.indexId,e.key,this.dn(c),s))}else n=n.add(new hr(t.indexId,e.key,go,s));return n}bn(e,t,n,s,i){O("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return function(l,u,h,p,m){const y=l.getIterator(),b=u.getIterator();let R=$r(y),A=$r(b);for(;R||A;){let k=!1,D=!1;if(R&&A){const N=h(R,A);N<0?D=!0:N>0&&(k=!0)}else R!=null?D=!0:k=!0;k?(p(A),A=$r(b)):D?(m(R),R=$r(y)):(R=$r(y),A=$r(b))}}(s,i,mn,c=>{o.push(this.Dn(e,t,n,c))},c=>{o.push(this.vn(e,t,n,c))}),P.waitFor(o)}yn(e){let t=1;return qr(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,c)=>mn(o,c)).filter((o,c,l)=>!c||mn(o,l[c-1])!==0);const s=[];s.push(e);for(const o of n){const c=mn(o,e),l=mn(o,t);if(c===0)s[0]=e.Zt();else if(c>0&&l<0)s.push(o),s.push(o.Zt());else if(l>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Cn(s[o],s[o+1]))return[];const c=[s[o].indexId,this.uid,s[o].arrayValue,s[o].directionalValue,go,[]],l=[s[o+1].indexId,this.uid,s[o+1].arrayValue,s[o+1].directionalValue,go,[]];i.push(IDBKeyRange.bound(c,l))}return i}Cn(e,t){return mn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(fh)}getMinOffset(e,t){return P.mapArray(this.hn(t),n=>this.Pn(e,n).next(s=>s||q())).next(fh)}}function hh(r){return $e(r,"collectionParents")}function Ur(r){return $e(r,"indexEntries")}function Qs(r){return $e(r,"indexConfiguration")}function qr(r){return $e(r,"indexState")}function fh(r){G(r.length!==0);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;rl(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new Et(e.readTime,e.documentKey,t)}/**
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
 */const ph={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class nt{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new nt(e,nt.DEFAULT_COLLECTION_PERCENTILE,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
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
 */function am(r,e,t){const n=r.store("mutations"),s=r.store("documentMutations"),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const l=n.J({range:o},(h,p,m)=>(c++,m.delete()));i.push(l.next(()=>{G(c===1)}));const u=[];for(const h of t.mutations){const p=ip(e,h.key.path,t.batchId);i.push(s.delete(p)),u.push(h.key)}return P.waitFor(i).next(()=>u)}function Qo(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw q();e=r.noDocument}return JSON.stringify(e).length}/**
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
 */nt.DEFAULT_COLLECTION_PERCENTILE=10,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,nt.DEFAULT=new nt(41943040,nt.DEFAULT_COLLECTION_PERCENTILE,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),nt.DISABLED=new nt(-1,0,0);class pa{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Fn={}}static lt(e,t,n,s){G(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new pa(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return gn(e).J({index:"userMutationsIndex",range:n},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,s){const i=Hr(e),o=gn(e);return o.add({}).next(c=>{G(typeof c=="number");const l=new dl(c,t,n,s),u=function(y,b,R){const A=R.baseMutations.map(D=>bi(y.ct,D)),k=R.mutations.map(D=>bi(y.ct,D));return{userId:b,batchId:R.batchId,localWriteTimeMs:R.localWriteTime.toMillis(),baseMutations:A,mutations:k}}(this.serializer,this.userId,l),h=[];let p=new me((m,y)=>J(m.canonicalString(),y.canonicalString()));for(const m of s){const y=ip(this.userId,m.key.path,c);p=p.add(m.key.path.popLast()),h.push(o.put(u)),h.push(i.put(y,cI))}return p.forEach(m=>{h.push(this.indexManager.addToCollectionParentIndex(e,m))}),e.addOnCommittedListener(()=>{this.Fn[c]=l.keys()}),P.waitFor(h).next(()=>l)})}lookupMutationBatch(e,t){return gn(e).get(t).next(n=>n?(G(n.userId===this.userId),ur(this.serializer,n)):null)}Mn(e,t){return this.Fn[t]?P.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const s=n.keys();return this.Fn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return gn(e).J({index:"userMutationsIndex",range:s},(o,c,l)=>{c.userId===this.userId&&(G(c.batchId>=n),i=ur(this.serializer,c)),l.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return gn(e).J({index:"userMutationsIndex",range:t,reverse:!0},(s,i,o)=>{n=i.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return gn(e).U("userMutationsIndex",t).next(n=>n.map(s=>ur(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=Ro(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return Hr(e).J({range:s},(o,c,l)=>{const[u,h,p]=o,m=Lt(h);if(u===this.userId&&t.path.isEqual(m))return gn(e).get(p).next(y=>{if(!y)throw q();G(y.userId===this.userId),i.push(ur(this.serializer,y))});l.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new me(J);const s=[];return t.forEach(i=>{const o=Ro(this.userId,i.path),c=IDBKeyRange.lowerBound(o),l=Hr(e).J({range:c},(u,h,p)=>{const[m,y,b]=u,R=Lt(y);m===this.userId&&i.path.isEqual(R)?n=n.add(b):p.done()});s.push(l)}),P.waitFor(s).next(()=>this.xn(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=Ro(this.userId,n),o=IDBKeyRange.lowerBound(i);let c=new me(J);return Hr(e).J({range:o},(l,u,h)=>{const[p,m,y]=l,b=Lt(m);p===this.userId&&n.isPrefixOf(b)?b.length===s&&(c=c.add(y)):h.done()}).next(()=>this.xn(e,c))}xn(e,t){const n=[],s=[];return t.forEach(i=>{s.push(gn(e).get(i).next(o=>{if(o===null)throw q();G(o.userId===this.userId),n.push(ur(this.serializer,o))}))}),P.waitFor(s).next(()=>n)}removeMutationBatch(e,t){return am(e._e,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.On(t.batchId)}),P.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return P.resolve();const n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return Hr(e).J({range:n},(i,o,c)=>{if(i[0]===this.userId){const l=Lt(i[1]);s.push(l)}else c.done()}).next(()=>{G(s.length===0)})})}containsKey(e,t){return cm(e,this.userId,t)}Nn(e){return lm(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function cm(r,e,t){const n=Ro(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return Hr(r).J({range:i,H:!0},(c,l,u)=>{const[h,p,m]=c;h===e&&p===s&&(o=!0),u.done()}).next(()=>o)}function gn(r){return $e(r,"mutations")}function Hr(r){return $e(r,"documentMutations")}function lm(r){return $e(r,"mutationQueues")}/**
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
 */class Sr{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Sr(0)}static kn(){return new Sr(-1)}}/**
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
 */class EE{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next(t=>{const n=new Sr(t.highestTargetId);return t.highestTargetId=n.next(),this.Qn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(t=>H.fromTimestamp(new _e(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.qn(e).next(s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Qn(e,s)))}addTargetData(e,t){return this.Kn(e,t).next(()=>this.qn(e).next(n=>(n.targetCount+=1,this.$n(t,n),this.Qn(e,n))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>jr(e).delete(t.targetId)).next(()=>this.qn(e)).next(n=>(G(n.targetCount>0),n.targetCount-=1,this.Qn(e,n)))}removeTargets(e,t,n){let s=0;const i=[];return jr(e).J((o,c)=>{const l=ri(c);l.sequenceNumber<=t&&n.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(e,l)))}).next(()=>P.waitFor(i)).next(()=>s)}forEachTarget(e,t){return jr(e).J((n,s)=>{const i=ri(s);t(i)})}qn(e){return mh(e).get("targetGlobalKey").next(t=>(G(t!==null),t))}Qn(e,t){return mh(e).put("targetGlobalKey",t)}Kn(e,t){return jr(e).put(sm(this.serializer,t))}$n(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.qn(e).next(t=>t.targetCount)}getTargetData(e,t){const n=Ir(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return jr(e).J({range:s,index:"queryTargetsIndex"},(o,c,l)=>{const u=ri(c);Ni(t,u.target)&&(i=u,l.done())}).next(()=>i)}addMatchingKeys(e,t,n){const s=[],i=An(e);return t.forEach(o=>{const c=rt(o.path);s.push(i.put({targetId:n,path:c})),s.push(this.referenceDelegate.addReference(e,n,o))}),P.waitFor(s)}removeMatchingKeys(e,t,n){const s=An(e);return P.forEach(t,i=>{const o=rt(i.path);return P.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])})}removeMatchingKeysForTargetId(e,t){const n=An(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=An(e);let i=X();return s.J({range:n,H:!0},(o,c,l)=>{const u=Lt(o[1]),h=new $(u);i=i.add(h)}).next(()=>i)}containsKey(e,t){const n=rt(t.path),s=IDBKeyRange.bound([n],[Xf(n)],!1,!0);let i=0;return An(e).J({index:"documentTargetsIndex",H:!0,range:s},([o,c],l,u)=>{o!==0&&(i++,u.done())}).next(()=>i>0)}ot(e,t){return jr(e).get(t).next(n=>n?ri(n):null)}}function jr(r){return $e(r,"targets")}function mh(r){return $e(r,"targetGlobal")}function An(r){return $e(r,"targetDocuments")}/**
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
 */function gh([r,e],[t,n]){const s=J(r,t);return s===0?J(e,n):s}class bE{constructor(e){this.Un=e,this.buffer=new me(gh),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();gh(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class um{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){O("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Wn(t)?O("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Hn(t)}await this.Hn(3e5)})}}class TE{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return P.resolve(mt.oe);const n=new bE(t);return this.Jn.forEachTarget(e,s=>n.zn(s.sequenceNumber)).next(()=>this.Jn.Zn(e,s=>n.zn(s))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Jn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(ph)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ph):this.Xn(e,t))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let n,s,i,o,c,l,u;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(n=p,c=Date.now(),this.removeTargets(e,n,t))).next(p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(e,n))).next(p=>(u=Date.now(),zr()<=te.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(u-l)+`ms
Total Duration: ${u-h}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function dm(r,e){return new TE(r,e)}/**
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
 */class AE{constructor(e,t){this.db=e,this.garbageCollector=dm(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}er(e){let t=0;return this.Zn(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,(n,s)=>t(s))}addReference(e,t,n){return yo(e,n)}removeReference(e,t,n){return yo(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return yo(e,t)}nr(e,t){return function(s,i){let o=!1;return lm(s).Y(c=>cm(s,c,i).next(l=>(l&&(o=!0),P.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.tr(e,(o,c)=>{if(c<=t){const l=this.nr(e,o).next(u=>{if(!u)return i++,n.getEntry(e,o).next(()=>(n.removeEntry(o,H.min()),An(e).delete(function(p){return[0,rt(p.path)]}(o))))});s.push(l)}}).next(()=>P.waitFor(s)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return yo(e,t)}tr(e,t){const n=An(e);let s,i=mt.oe;return n.J({index:"documentTargetsIndex"},([o,c],{path:l,sequenceNumber:u})=>{o===0?(i!==mt.oe&&t(new $(Lt(s)),i),i=u,s=l):i=mt.oe}).next(()=>{i!==mt.oe&&t(new $(Lt(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function yo(r,e){return An(r).put(function(n,s){return{targetId:0,path:rt(n.path),sequenceNumber:s}}(e,r.currentSequenceNumber))}/**
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
 */class hm{constructor(){this.changes=new an(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ee.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?P.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class SE{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return or(e).put(n)}removeEntry(e,t,n){return or(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Ho(o),c[c.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.rr(e,n)))}getEntry(e,t){let n=Ee.newInvalidDocument(t);return or(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Js(t))},(s,i)=>{n=this.ir(t,i)}).next(()=>n)}sr(e,t){let n={size:0,document:Ee.newInvalidDocument(t)};return or(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Js(t))},(s,i)=>{n={document:this.ir(t,i),size:Qo(i)}}).next(()=>n)}getEntries(e,t){let n=yt();return this._r(e,t,(s,i)=>{const o=this.ir(s,i);n=n.insert(s,o)}).next(()=>n)}ar(e,t){let n=yt(),s=new ve($.comparator);return this._r(e,t,(i,o)=>{const c=this.ir(i,o);n=n.insert(i,c),s=s.insert(i,Qo(o))}).next(()=>({documents:n,ur:s}))}_r(e,t,n){if(t.isEmpty())return P.resolve();let s=new me(vh);t.forEach(l=>s=s.add(l));const i=IDBKeyRange.bound(Js(s.first()),Js(s.last())),o=s.getIterator();let c=o.getNext();return or(e).J({index:"documentKeyIndex",range:i},(l,u,h)=>{const p=$.fromSegments([...u.prefixPath,u.collectionGroup,u.documentId]);for(;c&&vh(c,p)<0;)n(c,null),c=o.getNext();c&&c.isEqual(p)&&(n(c,u),c=o.hasNext()?o.getNext():null),c?h.$(Js(c)):h.done()}).next(()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Ho(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return or(e).U(IDBKeyRange.bound(c,l,!0)).next(u=>{i==null||i.incrementDocumentReadCount(u.length);let h=yt();for(const p of u){const m=this.ir($.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);m.isFoundDocument()&&(Oi(t,m)||s.has(m.key))&&(h=h.insert(m.key,m))}return h})}getAllFromCollectionGroup(e,t,n,s){let i=yt();const o=_h(t,n),c=_h(t,Et.max());return or(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,c,!0)},(l,u,h)=>{const p=this.ir($.fromSegments(u.prefixPath.concat(u.collectionGroup,u.documentId)),u);i=i.insert(p.key,p),i.size===s&&h.done()}).next(()=>i)}newChangeBuffer(e){return new RE(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return yh(e).get("remoteDocumentGlobalKey").next(t=>(G(!!t),t))}rr(e,t){return yh(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const n=hE(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(H.min())))return n}return Ee.newInvalidDocument(e)}}function fm(r){return new SE(r)}class RE extends hm{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new an(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(e){const t=[];let n=0,s=new me((i,o)=>J(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.lr.get(i);if(t.push(this.cr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const l=rh(this.cr.serializer,o);s=s.add(i.path.popLast());const u=Qo(l);n+=u-c.size,t.push(this.cr.addEntry(e,i,l))}else if(n-=c.size,this.trackRemovals){const l=rh(this.cr.serializer,o.convertToNoDocument(H.min()));t.push(this.cr.addEntry(e,i,l))}}),s.forEach(i=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.cr.updateMetadata(e,n)),P.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next(n=>(this.lr.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.cr.ar(e,t).next(({documents:n,ur:s})=>(s.forEach((i,o)=>{this.lr.set(i,{size:o,readTime:n.get(i).readTime})}),n))}}function yh(r){return $e(r,"remoteDocumentGlobal")}function or(r){return $e(r,"remoteDocumentsV14")}function Js(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function _h(r,e){const t=e.documentKey.path.toArray();return[r,Ho(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function vh(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=J(t[i],n[i]),s)return s;return s=J(t.length,n.length),s||(s=J(t[t.length-2],n[n.length-2]),s||J(t[t.length-1],n[n.length-1]))}/**
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
 */class PE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class pm{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(n=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(n!==null&&di(n.mutation,s,gt.empty(),_e.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,X()).next(()=>n))}getLocalViewOfDocuments(e,t,n=X()){const s=Ot();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,n).next(i=>{let o=ti();return i.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const n=Ot();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,X()))}populateOverlays(e,t,n){const s=[];return n.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,n,s){let i=yt();const o=ui(),c=function(){return ui()}();return t.forEach((l,u)=>{const h=n.get(u.key);s.has(u.key)&&(h===void 0||h.mutation instanceof cn)?i=i.insert(u.key,u):h!==void 0?(o.set(u.key,h.mutation.getFieldMask()),di(h.mutation,u,h.mutation.getFieldMask(),_e.now())):o.set(u.key,gt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((u,h)=>o.set(u,h)),t.forEach((u,h)=>{var p;return c.set(u,new PE(h,(p=o.get(u))!==null&&p!==void 0?p:null))}),c))}recalculateAndSaveOverlays(e,t){const n=ui();let s=new ve((o,c)=>o-c),i=X();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const u=t.get(l);if(u===null)return;let h=n.get(l)||gt.empty();h=c.applyToLocalView(u,h),n.set(l,h);const p=(s.get(c.batchId)||X()).add(l);s=s.insert(c.batchId,p)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),u=l.key,h=l.value,p=Cp();h.forEach(m=>{if(!i.has(m)){const y=Mp(t.get(m),n.get(m));y!==null&&p.set(m,y),i=i.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,p))}return P.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,s){return function(o){return $.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):al(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):P.resolve(Ot());let c=-1,l=i;return o.next(u=>P.forEach(u,(h,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(h)?P.resolve():this.remoteDocumentCache.getEntry(e,h).next(m=>{l=l.insert(h,m)}))).next(()=>this.populateOverlays(e,u,i)).next(()=>this.computeViews(e,l,u,X())).next(h=>({batchId:c,changes:xp(h)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new $(t)).next(n=>{let s=ti();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=ti();return this.indexManager.getCollectionParents(e,i).next(c=>P.forEach(c,l=>{const u=function(p,m){return new on(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,n,s).next(h=>{h.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s))).next(o=>{i.forEach((l,u)=>{const h=u.getKey();o.get(h)===null&&(o=o.insert(h,Ee.newInvalidDocument(h)))});let c=ti();return o.forEach((l,u)=>{const h=i.get(l);h!==void 0&&di(h.mutation,u,gt.empty(),_e.now()),Oi(t,u)&&(c=c.insert(l,u))}),c})}}/**
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
 */class xE{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return P.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Ve(s.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:gl(s.bundledQuery),readTime:Ve(s.readTime)}}(t)),P.resolve()}}/**
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
 */class CE{constructor(){this.overlays=new ve($.comparator),this.Ir=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Ot();return P.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((s,i)=>{this.ht(e,t,i)}),P.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Ir.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(n)),P.resolve()}getOverlaysForCollection(e,t,n){const s=Ot(),i=t.length+1,o=new $(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,u=l.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===i&&l.largestBatchId>n&&s.set(l.getKey(),l)}return P.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new ve((u,h)=>u-h);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>n){let h=i.get(u.largestBatchId);h===null&&(h=Ot(),i=i.insert(u.largestBatchId,h)),h.set(u.getKey(),u)}}const c=Ot(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((u,h)=>c.set(u,h)),!(c.size()>=s)););return P.resolve(c)}ht(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(n.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new fl(t,n));let i=this.Ir.get(t);i===void 0&&(i=X(),this.Ir.set(t,i)),this.Ir.set(t,i.add(n.key))}}/**
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
 */class kE{constructor(){this.sessionToken=Re.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
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
 */class vl{constructor(){this.Tr=new me(Ue.Er),this.dr=new me(Ue.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const n=new Ue(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Vr(new Ue(e,t))}mr(e,t){e.forEach(n=>this.removeReference(n,t))}gr(e){const t=new $(new ne([])),n=new Ue(t,e),s=new Ue(t,e+1),i=[];return this.dr.forEachInRange([n,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new $(new ne([])),n=new Ue(t,e),s=new Ue(t,e+1);let i=X();return this.dr.forEachInRange([n,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Ue(e,0),n=this.Tr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Ue{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return $.comparator(e.key,t.key)||J(e.wr,t.wr)}static Ar(e,t){return J(e.wr,t.wr)||$.comparator(e.key,t.key)}}/**
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
 */class VE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new me(Ue.Er)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new dl(i,t,n,s);this.mutationQueue.push(o);for(const c of s)this.br=this.br.add(new Ue(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return P.resolve(o)}lookupMutationBatch(e,t){return P.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.vr(n),i=s<0?0:s;return P.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Ue(t,0),s=new Ue(t,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([n,s],o=>{const c=this.Dr(o.wr);i.push(c)}),P.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new me(J);return t.forEach(s=>{const i=new Ue(s,0),o=new Ue(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],c=>{n=n.add(c.wr)})}),P.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;$.isDocumentKey(i)||(i=i.child(""));const o=new Ue(new $(i),0);let c=new me(J);return this.br.forEachWhile(l=>{const u=l.key.path;return!!n.isPrefixOf(u)&&(u.length===s&&(c=c.add(l.wr)),!0)},o),P.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach(n=>{const s=this.Dr(n);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){G(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return P.forEach(t.mutations,s=>{const i=new Ue(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=n})}On(e){}containsKey(e,t){const n=new Ue(t,0),s=this.br.firstAfterOrEqual(n);return P.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class DE{constructor(e){this.Mr=e,this.docs=function(){return new ve($.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return P.resolve(n?n.document.mutableCopy():Ee.newInvalidDocument(t))}getEntries(e,t){let n=yt();return t.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():Ee.newInvalidDocument(s))}),P.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=yt();const o=t.path,c=new $(o.child("")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:u,value:{document:h}}=l.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||rl(ep(h),n)<=0||(s.has(h.key)||Oi(t,h))&&(i=i.insert(h.key,h.mutableCopy()))}return P.resolve(i)}getAllFromCollectionGroup(e,t,n,s){q()}Or(e,t){return P.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new NE(this)}getSize(e){return P.resolve(this.size)}}class NE extends hm{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(n)}),P.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
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
 */class LE{constructor(e){this.persistence=e,this.Nr=new an(t=>Ir(t),Ni),this.lastRemoteSnapshotVersion=H.min(),this.highestTargetId=0,this.Lr=0,this.Br=new vl,this.targetCount=0,this.kr=Sr.Bn()}forEachTarget(e,t){return this.Nr.forEach((n,s)=>t(s)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),P.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Sr(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Kn(t),P.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.Nr.forEach((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),P.waitFor(i).next(()=>s)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const n=this.Nr.get(t)||null;return P.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),P.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),P.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Br.yr(t);return P.resolve(n)}containsKey(e,t){return P.resolve(this.Br.containsKey(t))}}/**
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
 */class wl{constructor(e,t){this.qr={},this.overlays={},this.Qr=new mt(0),this.Kr=!1,this.Kr=!0,this.$r=new kE,this.referenceDelegate=e(this),this.Ur=new LE(this),this.indexManager=new wE,this.remoteDocumentCache=function(s){return new DE(s)}(n=>this.referenceDelegate.Wr(n)),this.serializer=new rm(t),this.Gr=new xE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new CE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new VE(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){O("MemoryPersistence","Starting transaction:",e);const s=new OE(this.Qr.next());return this.referenceDelegate.zr(),n(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,t){return P.or(Object.values(this.qr).map(n=>()=>n.containsKey(e,t)))}}class OE extends np{constructor(e){super(),this.currentSequenceNumber=e}}class ma{constructor(e){this.persistence=e,this.Jr=new vl,this.Yr=null}static Zr(e){return new ma(e)}get Xr(){if(this.Yr)return this.Yr;throw q()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),P.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),P.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>n.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.Xr,n=>{const s=$.fromPath(n);return this.ei(e,s).next(i=>{i||t.removeEntry(s,H.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(n=>{n?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return P.or([()=>P.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}class Jo{constructor(e,t){this.persistence=e,this.ti=new an(n=>rt(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=dm(this,t)}static Zr(e,t){return new Jo(e,t)}zr(){}jr(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Yn(e){const t=this.er(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}er(e){let t=0;return this.Zn(e,n=>{t++}).next(()=>t)}Zn(e,t){return P.forEach(this.ti,(n,s)=>this.nr(e,n,s).next(i=>i?P.resolve():t(s)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.Or(e,o=>this.nr(e,o,t).next(c=>{c||(n++,i.removeEntry(o,H.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.ti.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.ti.set(n,e.currentSequenceNumber),P.resolve()}removeReference(e,t,n){return this.ti.set(n,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.ti.set(t,e.currentSequenceNumber),P.resolve()}Wr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=xo(e.data.value)),t}nr(e,t,n){return P.or([()=>this.persistence.Hr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.ti.get(t);return P.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class ME{constructor(e){this.serializer=e}O(e,t,n,s){const i=new oa("createOrUpgrade",t);n<1&&s>=1&&(function(l){l.createObjectStore("owner")}(e),function(l){l.createObjectStore("mutationQueues",{keyPath:"userId"}),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Dd,{unique:!0}),l.createObjectStore("documentMutations")}(e),wh(e),function(l){l.createObjectStore("remoteDocuments")}(e));let o=P.resolve();return n<3&&s>=3&&(n!==0&&(function(l){l.deleteObjectStore("targetDocuments"),l.deleteObjectStore("targets"),l.deleteObjectStore("targetGlobal")}(e),wh(e)),o=o.next(()=>function(l){const u=l.store("targetGlobal"),h={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:H.min().toTimestamp(),targetCount:0};return u.put("targetGlobalKey",h)}(i))),n<4&&s>=4&&(n!==0&&(o=o.next(()=>function(l,u){return u.store("mutations").U().next(h=>{l.deleteObjectStore("mutations"),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Dd,{unique:!0});const p=u.store("mutations"),m=h.map(y=>p.put(y));return P.waitFor(m)})}(e,i))),o=o.next(()=>{(function(l){l.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),n<5&&s>=5&&(o=o.next(()=>this.ni(i))),n<6&&s>=6&&(o=o.next(()=>(function(l){l.createObjectStore("remoteDocumentGlobal")}(e),this.ri(i)))),n<7&&s>=7&&(o=o.next(()=>this.ii(i))),n<8&&s>=8&&(o=o.next(()=>this.si(e,i))),n<9&&s>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&s>=10&&(o=o.next(()=>this.oi(i))),n<11&&s>=11&&(o=o.next(()=>{(function(l){l.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(l){l.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),n<12&&s>=12&&(o=o.next(()=>{(function(l){const u=l.createObjectStore("documentOverlays",{keyPath:wI});u.createIndex("collectionPathOverlayIndex",II,{unique:!1}),u.createIndex("collectionGroupOverlayIndex",EI,{unique:!1})})(e)})),n<13&&s>=13&&(o=o.next(()=>function(l){const u=l.createObjectStore("remoteDocumentsV14",{keyPath:lI});u.createIndex("documentKeyIndex",uI),u.createIndex("collectionGroupIndex",dI)}(e)).next(()=>this._i(e,i)).next(()=>e.deleteObjectStore("remoteDocuments"))),n<14&&s>=14&&(o=o.next(()=>this.ai(e,i))),n<15&&s>=15&&(o=o.next(()=>function(l){l.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),l.createObjectStore("indexState",{keyPath:gI}).createIndex("sequenceNumberIndex",yI,{unique:!1}),l.createObjectStore("indexEntries",{keyPath:_I}).createIndex("documentKeyIndex",vI,{unique:!1})}(e))),n<16&&s>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),n<17&&s>=17&&(o=o.next(()=>{(function(l){l.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let t=0;return e.store("remoteDocuments").J((n,s)=>{t+=Qo(s)}).next(()=>{const n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}ni(e){const t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next(s=>P.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,-1],[i.userId,i.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",o).next(c=>P.forEach(c,l=>{G(l.userId===i.userId);const u=ur(this.serializer,l);return am(e,i.userId,u).next(()=>{})}))}))}ii(e){const t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(s=>{const i=[];return n.J((o,c)=>{const l=new ne(o),u=function(p){return[0,rt(p)]}(l);i.push(t.get(u).next(h=>h?P.resolve():(p=>t.put({targetId:0,path:rt(p),sequenceNumber:s.highestListenSequenceNumber}))(l)))}).next(()=>P.waitFor(i))})}si(e,t){e.createObjectStore("collectionParents",{keyPath:mI});const n=t.store("collectionParents"),s=new _l,i=o=>{if(s.add(o)){const c=o.lastSegment(),l=o.popLast();return n.put({collectionId:c,parent:rt(l)})}};return t.store("remoteDocuments").J({H:!0},(o,c)=>{const l=new ne(o);return i(l.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,c,l],u)=>{const h=Lt(c);return i(h.popLast())}))}oi(e){const t=e.store("targets");return t.J((n,s)=>{const i=ri(s),o=sm(this.serializer,i);return t.put(o)})}_i(e,t){const n=t.store("remoteDocuments"),s=[];return n.J((i,o)=>{const c=t.store("remoteDocumentsV14"),l=function(p){return p.document?new $(ne.fromString(p.document.name).popFirst(5)):p.noDocument?$.fromSegments(p.noDocument.path):p.unknownDocument?$.fromSegments(p.unknownDocument.path):q()}(o).path.toArray(),u={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(u))}).next(()=>P.waitFor(s))}ai(e,t){const n=t.store("mutations"),s=fm(this.serializer),i=new wl(ma.Zr,this.serializer.ct);return n.U().next(o=>{const c=new Map;return o.forEach(l=>{var u;let h=(u=c.get(l.userId))!==null&&u!==void 0?u:X();ur(this.serializer,l).keys().forEach(p=>h=h.add(p)),c.set(l.userId,h)}),P.forEach(c,(l,u)=>{const h=new qe(u),p=fa.lt(this.serializer,h),m=i.getIndexManager(h),y=pa.lt(h,this.serializer,m,i.referenceDelegate);return new pm(s,y,p,m).recalculateAndSaveOverlaysForDocumentKeys(new vc(t,mt.oe),l).next()})})}}function wh(r){r.createObjectStore("targetDocuments",{keyPath:fI}).createIndex("documentTargetsIndex",pI,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",hI,{unique:!0}),r.createObjectStore("targetGlobal")}const nc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Il{constructor(e,t,n,s,i,o,c,l,u,h,p=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.ui=i,this.window=o,this.document=c,this.ci=u,this.li=h,this.hi=p,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=m=>Promise.resolve(),!Il.D())throw new L(C.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new AE(this,s),this.Ai=t+"main",this.serializer=new rm(l),this.Ri=new Ut(this.Ai,this.hi,new ME(this.serializer)),this.$r=new pE,this.Ur=new EE(this.referenceDelegate,this.serializer),this.remoteDocumentCache=fm(this.serializer),this.Gr=new fE,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,h===!1&&ke("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new L(C.FAILED_PRECONDITION,nc);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new mt(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>_o(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(t=>this.isPrimary&&!t?this.bi(e).next(()=>!1):!!t&&this.Di(e).next(()=>!0))).catch(e=>{if(Wn(e))return O("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return O("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return Ys(e).get("owner").next(t=>P.resolve(this.vi(t)))}Ci(e){return _o(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=$e(t,"clientMetadata");return n.U().next(s=>{const i=this.xi(s,18e5),o=s.filter(c=>i.indexOf(c)===-1);return P.forEach(o,c=>n.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?P.resolve(!0):Ys(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new L(C.FAILED_PRECONDITION,nc);return!1}}return!(!this.networkEnabled||!this.inForeground)||_o(e).U().next(n=>this.xi(n,5e3).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&O("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new vc(e,mt.oe);return this.bi(t).next(()=>this.Ci(t))}),this.Ri.close(),this.qi()}xi(e,t){return e.filter(n=>this.Mi(n.updateTimeMs,t)&&!this.Ni(n.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>_o(e).U().next(t=>this.xi(t,18e5).map(n=>n.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return pa.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new IE(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return fa.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,n){O("IndexedDbPersistence","Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(l){return l===17?AI:l===16?TI:l===15?il:l===14?cp:l===13?ap:l===12?bI:l===11?op:void q()}(this.hi);let o;return this.Ri.runTransaction(e,s,i,c=>(o=new vc(c,this.Qr?this.Qr.next():mt.oe),t==="readwrite-primary"?this.wi(o).next(l=>!!l||this.Si(o)).next(l=>{if(!l)throw ke(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new L(C.FAILED_PRECONDITION,tp);return n(o)}).next(l=>this.Di(o).next(()=>l)):this.Ki(o).next(()=>n(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}Ki(e){return Ys(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new L(C.FAILED_PRECONDITION,nc)})}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Ys(e).put("owner",t)}static D(){return Ut.D()}bi(e){const t=Ys(e);return t.get("owner").next(n=>this.vi(n)?(O("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):P.resolve())}Mi(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(ke(`Detected an update time that is in the future: ${e} > ${n}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;Xh()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const n=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return O("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return ke("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){ke("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Ys(r){return $e(r,"owner")}function _o(r){return $e(r,"clientMetadata")}function El(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class bl{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=s}static Wi(e,t){let n=X(),s=X();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new bl(e,t.fromCache,n,s)}}/**
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
 */class FE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class mm{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return Xh()?8:rp(Be())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.Yi(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,t,s,n).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new FE;return this.Xi(e,t,o).next(c=>{if(i.result=c,this.zi)return this.es(e,t,o,c.size)})}).next(()=>i.result)}es(e,t,n,s){return n.documentReadCount<this.ji?(zr()<=te.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",Gr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),P.resolve()):(zr()<=te.DEBUG&&O("QueryEngine","Query:",Gr(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Hi*s?(zr()<=te.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",Gr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,st(t))):P.resolve())}Yi(e,t){if(Kd(t))return P.resolve(null);let n=st(t);return this.indexManager.getIndexType(e,n).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Go(t,null,"F"),n=st(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(i=>{const o=X(...i);return this.Ji.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,n).next(l=>{const u=this.ts(t,c);return this.ns(t,u,o,l.readTime)?this.Yi(e,Go(t,null,"F")):this.rs(e,u,t,l)}))})))}Zi(e,t,n,s){return Kd(t)||s.isEqual(H.min())?P.resolve(null):this.Ji.getDocuments(e,n).next(i=>{const o=this.ts(t,i);return this.ns(t,o,n,s)?P.resolve(null):(zr()<=te.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Gr(t)),this.rs(e,o,t,Zf(s,-1)).next(c=>c))})}ts(e,t){let n=new me(Rp(e));return t.forEach((s,i)=>{Oi(e,i)&&(n=n.add(i))}),n}ns(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,t,n){return zr()<=te.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",Gr(t)),this.Ji.getDocumentsMatchingQuery(e,t,Et.min(),n)}rs(e,t,n,s){return this.Ji.getDocumentsMatchingQuery(e,n,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */class BE{constructor(e,t,n,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new ve(J),this._s=new an(i=>Ir(i),Ni),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new pm(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function gm(r,e,t,n){return new BE(r,e,t,n)}async function ym(r,e){const t=F(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,t.ls(e),t.mutationQueue.getAllMutationBatches(n))).next(i=>{const o=[],c=[];let l=X();for(const u of s){o.push(u.batchId);for(const h of u.mutations)l=l.add(h.key)}for(const u of i){c.push(u.batchId);for(const h of u.mutations)l=l.add(h.key)}return t.localDocuments.getDocuments(n,l).next(u=>({hs:u,removedBatchIds:o,addedBatchIds:c}))})})}function $E(r,e){const t=F(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=e.batch.keys(),i=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,l,u,h){const p=u.batch,m=p.keys();let y=P.resolve();return m.forEach(b=>{y=y.next(()=>h.getEntry(l,b)).next(R=>{const A=u.docVersions.get(b);G(A!==null),R.version.compareTo(A)<0&&(p.applyToRemoteDocument(R,u),R.isValidDocument()&&(R.setReadTime(u.commitVersion),h.addEntry(R)))})}),y.next(()=>c.mutationQueue.removeMutationBatch(l,p))}(t,n,e,i).next(()=>i.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(c){let l=X();for(let u=0;u<c.mutationResults.length;++u)c.mutationResults[u].transformResults.length>0&&(l=l.add(c.batch.mutations[u].key));return l}(e))).next(()=>t.localDocuments.getDocuments(n,s))})}function _m(r){const e=F(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function UE(r,e){const t=F(r),n=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const c=[];e.targetChanges.forEach((h,p)=>{const m=s.get(p);if(!m)return;c.push(t.Ur.removeMatchingKeys(i,h.removedDocuments,p).next(()=>t.Ur.addMatchingKeys(i,h.addedDocuments,p)));let y=m.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?y=y.withResumeToken(Re.EMPTY_BYTE_STRING,H.min()).withLastLimboFreeSnapshotVersion(H.min()):h.resumeToken.approximateByteSize()>0&&(y=y.withResumeToken(h.resumeToken,n)),s=s.insert(p,y),function(R,A,k){return R.resumeToken.approximateByteSize()===0||A.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=3e8?!0:k.addedDocuments.size+k.modifiedDocuments.size+k.removedDocuments.size>0}(m,y,h)&&c.push(t.Ur.updateTargetData(i,y))});let l=yt(),u=X();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,h))}),c.push(vm(i,o,e.documentUpdates).next(h=>{l=h.Ps,u=h.Is})),!n.isEqual(H.min())){const h=t.Ur.getLastRemoteSnapshotVersion(i).next(p=>t.Ur.setTargetsMetadata(i,i.currentSequenceNumber,n));c.push(h)}return P.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,l,u)).next(()=>l)}).then(i=>(t.os=s,i))}function vm(r,e,t){let n=X(),s=X();return t.forEach(i=>n=n.add(i)),e.getEntries(r,n).next(i=>{let o=yt();return t.forEach((c,l)=>{const u=i.get(c);l.isFoundDocument()!==u.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(H.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!u.isValidDocument()||l.version.compareTo(u.version)>0||l.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):O("LocalStore","Ignoring outdated watch update for ",c,". Current version:",u.version," Watch version:",l.version)}),{Ps:o,Is:s}})}function qE(r,e){const t=F(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function us(r,e){const t=F(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return t.Ur.getTargetData(n,e).next(i=>i?(s=i,P.resolve(s)):t.Ur.allocateTargetId(n).next(o=>(s=new Jt(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.Ur.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=t.os.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(n.targetId,n),t._s.set(e,n.targetId)),n})}async function ds(r,e,t){const n=F(r),s=n.os.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,o=>n.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Wn(o))throw o;O("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}n.os=n.os.remove(e),n._s.delete(s.target)}function Yo(r,e,t){const n=F(r);let s=H.min(),i=X();return n.persistence.runTransaction("Execute query","readwrite",o=>function(l,u,h){const p=F(l),m=p._s.get(h);return m!==void 0?P.resolve(p.os.get(m)):p.Ur.getTargetData(u,h)}(n,o,st(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(o,c.targetId).next(l=>{i=l})}).next(()=>n.ss.getDocumentsMatchingQuery(o,e,t?s:H.min(),t?i:X())).next(c=>(Em(n,Sp(e),c),{documents:c,Ts:i})))}function wm(r,e){const t=F(r),n=F(t.Ur),s=t.os.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",i=>n.ot(i,e).next(o=>o?o.target:null))}function Im(r,e){const t=F(r),n=t.us.get(e)||H.min();return t.persistence.runTransaction("Get new document changes","readonly",s=>t.cs.getAllFromCollectionGroup(s,e,Zf(n,-1),Number.MAX_SAFE_INTEGER)).then(s=>(Em(t,e,s),s))}function Em(r,e,t){let n=r.us.get(e)||H.min();t.forEach((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)}),r.us.set(e,n)}async function jE(r,e,t,n){const s=F(r);let i=X(),o=yt();for(const u of t){const h=e.Es(u.metadata.name);u.document&&(i=i.add(h));const p=e.ds(u);p.setReadTime(e.As(u.metadata.readTime)),o=o.insert(h,p)}const c=s.cs.newChangeBuffer({trackRemovals:!0}),l=await us(s,function(h){return st(bs(ne.fromString(`__bundle__/docs/${h}`)))}(n));return s.persistence.runTransaction("Apply bundle documents","readwrite",u=>vm(u,c,o).next(h=>(c.apply(u),h)).next(h=>s.Ur.removeMatchingKeysForTargetId(u,l.targetId).next(()=>s.Ur.addMatchingKeys(u,i,l.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(u,h.Ps,h.Is)).next(()=>h.Ps)))}async function zE(r,e,t=X()){const n=await us(r,st(gl(e.bundledQuery))),s=F(r);return s.persistence.runTransaction("Save named query","readwrite",i=>{const o=Ve(e.readTime);if(n.snapshotVersion.compareTo(o)>=0)return s.Gr.saveNamedQuery(i,e);const c=n.withResumeToken(Re.EMPTY_BYTE_STRING,o);return s.os=s.os.insert(c.targetId,c),s.Ur.updateTargetData(i,c).next(()=>s.Ur.removeMatchingKeysForTargetId(i,n.targetId)).next(()=>s.Ur.addMatchingKeys(i,t,n.targetId)).next(()=>s.Gr.saveNamedQuery(i,e))})}function Ih(r,e){return`firestore_clients_${r}_${e}`}function Eh(r,e,t){let n=`firestore_mutations_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}function rc(r,e){return`firestore_targets_${r}_${e}`}class Xo{constructor(e,t,n,s){this.user=e,this.batchId=t,this.state=n,this.error=s}static Rs(e,t,n){const s=JSON.parse(n);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new L(s.error.code,s.error.message))),o?new Xo(e,t,s.state,i):(ke("SharedClientState",`Failed to parse mutation state for ID '${t}': ${n}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class hi{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Rs(e,t){const n=JSON.parse(t);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new L(n.error.code,n.error.message))),i?new hi(e,n.state,s):(ke("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Zo{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const n=JSON.parse(t);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=cl();for(let o=0;s&&o<n.activeTargetIds.length;++o)s=sp(n.activeTargetIds[o]),i=i.add(n.activeTargetIds[o]);return s?new Zo(e,i):(ke("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class Tl{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Tl(t.clientId,t.onlineState):(ke("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Dc{constructor(){this.activeTargetIds=cl()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class sc{constructor(e,t,n,s,i){this.window=e,this.ui=t,this.persistenceKey=n,this.ps=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new ve(J),this.started=!1,this.bs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Ds=Ih(this.persistenceKey,this.ps),this.vs=function(l){return`firestore_sequence_number_${l}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Dc),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=function(l){return`firestore_online_state_${l}`}(this.persistenceKey),this.Os=function(l){return`firestore_bundle_loaded_v2_${l}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const n of e){if(n===this.ps)continue;const s=this.getItem(Ih(this.persistenceKey,n));if(s){const i=Zo.Rs(n,s);i&&(this.Ss=this.Ss.insert(i.clientId,i))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const n=this.Ls(t);n&&this.Bs(n)}for(const n of this.bs)this.ws(n);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach((n,s)=>{s.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,n){this.qs(e,t,n),this.Qs(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(rc(this.persistenceKey,e));if(s){const i=hi.Rs(e,s);i&&(n=i.state)}}return t&&this.Ks.fs(e),this.Ns(),n}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(rc(this.persistenceKey,e))}updateQueryState(e,t,n){this.$s(e,t,n)}handleUserChange(e,t,n){t.forEach(s=>{this.Qs(s)}),this.currentUser=e,n.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return O("SharedClientState","READ",e,t),t}setItem(e,t){O("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){O("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if(O("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void ke("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const n=this.Gs(t.key);return this.zs(n,null)}{const n=this.js(t.key,t.newValue);if(n)return this.zs(n.clientId,n)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const n=this.Hs(t.key,t.newValue);if(n)return this.Js(n)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const n=this.Ys(t.key,t.newValue);if(n)return this.Zs(n)}}else if(t.key===this.xs){if(t.newValue!==null){const n=this.Ls(t.newValue);if(n)return this.Bs(n)}}else if(t.key===this.vs){const n=function(i){let o=mt.oe;if(i!=null)try{const c=JSON.parse(i);G(typeof c=="number"),o=c}catch(c){ke("SharedClientState","Failed to read sequence number from WebStorage",c)}return o}(t.newValue);n!==mt.oe&&this.sequenceNumberHandler(n)}else if(t.key===this.Os){const n=this.Xs(t.newValue);await Promise.all(n.map(s=>this.syncEngine.eo(s)))}}}else this.bs.push(t)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,n){const s=new Xo(this.currentUser,e,t,n),i=Eh(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Vs())}Qs(e){const t=Eh(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,n){const s=rc(this.persistenceKey,e),i=new hi(e,t,n);this.setItem(s,i.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const n=this.Gs(e);return Zo.Rs(n,t)}Hs(e,t){const n=this.Fs.exec(e),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return Xo.Rs(new qe(i),s,t)}Ys(e,t){const n=this.Ms.exec(e),s=Number(n[1]);return hi.Rs(s,t)}Ls(e){return Tl.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);O("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const n=t?this.Ss.insert(e,t):this.Ss.remove(e),s=this.ks(this.Ss),i=this.ks(n),o=[],c=[];return i.forEach(l=>{s.has(l)||o.push(l)}),s.forEach(l=>{i.has(l)||c.push(l)}),this.syncEngine.io(o,c).then(()=>{this.Ss=n})}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=cl();return e.forEach((n,s)=>{t=t.unionWith(s.activeTargetIds)}),t}}class bm{constructor(){this.so=new Dc,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Dc,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class GE{_o(e){}shutdown(){}}/**
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
 */class bh{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){O("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){O("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let vo=null;function ic(){return vo===null?vo=function(){return 268435456+Math.round(2147483648*Math.random())}():vo++,"0x"+vo.toString(16)}/**
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
 */const KE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class HE{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const tt="WebChannelConnection";class WE extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const n=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+t.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(t,n,s,i,o){const c=ic(),l=this.xo(t,n.toUriEncodedString());O("RestConnection",`Sending RPC '${t}' ${c}:`,l,s);const u={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(u,i,o),this.No(t,l,u,s).then(h=>(O("RestConnection",`Received RPC '${t}' ${c}: `,h),h),h=>{throw It("RestConnection",`RPC '${t}' ${c} failed with error: `,h,"url: ",l,"request:",s),h})}Lo(t,n,s,i,o,c){return this.Mo(t,n,s,i,o)}Oo(t,n,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Es}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((i,o)=>t[o]=i),s&&s.headers.forEach((i,o)=>t[o]=i)}xo(t,n){const s=KE[t];return`${this.Do}/v1/${n}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,s){const i=ic();return new Promise((o,c)=>{const l=new zf;l.setWithCredentials(!0),l.listenOnce(Gf.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case So.NO_ERROR:const h=l.getResponseJson();O(tt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(h)),o(h);break;case So.TIMEOUT:O(tt,`RPC '${e}' ${i} timed out`),c(new L(C.DEADLINE_EXCEEDED,"Request time out"));break;case So.HTTP_ERROR:const p=l.getStatus();if(O(tt,`RPC '${e}' ${i} failed with status:`,p,"response text:",l.getResponseText()),p>0){let m=l.getResponseJson();Array.isArray(m)&&(m=m[0]);const y=m==null?void 0:m.error;if(y&&y.status&&y.message){const b=function(A){const k=A.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(k)>=0?k:C.UNKNOWN}(y.status);c(new L(b,y.message))}else c(new L(C.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new L(C.UNAVAILABLE,"Connection failed."));break;default:q()}}finally{O(tt,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(s);O(tt,`RPC '${e}' ${i} sending request:`,s),l.send(t,"POST",u,n,15)})}Bo(e,t,n){const s=ic(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Wf(),c=Hf(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,t,n),l.encodeInitMessageHeaders=!0;const h=i.join("");O(tt,`Creating RPC '${e}' stream ${s}: ${h}`,l);const p=o.createWebChannel(h,l);let m=!1,y=!1;const b=new HE({Io:A=>{y?O(tt,`Not sending because RPC '${e}' stream ${s} is closed:`,A):(m||(O(tt,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),O(tt,`RPC '${e}' stream ${s} sending:`,A),p.send(A))},To:()=>p.close()}),R=(A,k,D)=>{A.listen(k,N=>{try{D(N)}catch(z){setTimeout(()=>{throw z},0)}})};return R(p,ei.EventType.OPEN,()=>{y||(O(tt,`RPC '${e}' stream ${s} transport opened.`),b.yo())}),R(p,ei.EventType.CLOSE,()=>{y||(y=!0,O(tt,`RPC '${e}' stream ${s} transport closed`),b.So())}),R(p,ei.EventType.ERROR,A=>{y||(y=!0,It(tt,`RPC '${e}' stream ${s} transport errored:`,A),b.So(new L(C.UNAVAILABLE,"The operation could not be completed")))}),R(p,ei.EventType.MESSAGE,A=>{var k;if(!y){const D=A.data[0];G(!!D);const N=D,z=N.error||((k=N[0])===null||k===void 0?void 0:k.error);if(z){O(tt,`RPC '${e}' stream ${s} received error:`,z);const M=z.status;let U=function(w){const T=Oe[w];if(T!==void 0)return Up(T)}(M),E=z.message;U===void 0&&(U=C.INTERNAL,E="Unknown error status: "+M+" with message "+z.message),y=!0,b.So(new L(U,E)),p.close()}else O(tt,`RPC '${e}' stream ${s} received:`,D),b.bo(D)}}),R(c,Kf.STAT_EVENT,A=>{A.stat===yc.PROXY?O(tt,`RPC '${e}' stream ${s} detected buffering proxy`):A.stat===yc.NOPROXY&&O(tt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{b.wo()},0),b}}/**
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
 */function Tm(){return typeof window<"u"?window:null}function Do(){return typeof document<"u"?document:null}/**
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
 */function $i(r){return new nE(r,!0)}/**
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
 */class Al{constructor(e,t,n=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-n);s>0&&O("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Am{constructor(e,t,n,s,i,o,c,l){this.ui=e,this.Ho=n,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Al(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(ke(t.toString()),ke("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.Yo===t&&this.P_(n,s)},n=>{e(()=>{const s=new L(C.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(s)})})}P_(e,t){const n=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{n(()=>this.listener.Eo())}),this.stream.Ro(()=>{n(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{n(()=>this.I_(s))}),this.stream.onMessage(s=>{n(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return O("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(O("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class QE extends Am{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=iE(this.serializer,e),n=function(i){if(!("targetChange"in i))return H.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?H.min():o.readTime?Ve(o.readTime):H.min()}(e);return this.listener.d_(t,n)}A_(e){const t={};t.database=Pc(this.serializer),t.addTarget=function(i,o){let c;const l=o.target;if(c=jo(l)?{documents:Yp(i,l)}:{query:ha(i,l)._t},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Gp(i,o.resumeToken);const u=Sc(i,o.expectedCount);u!==null&&(c.expectedCount=u)}else if(o.snapshotVersion.compareTo(H.min())>0){c.readTime=ls(i,o.snapshotVersion.toTimestamp());const u=Sc(i,o.expectedCount);u!==null&&(c.expectedCount=u)}return c}(this.serializer,e);const n=aE(this.serializer,e);n&&(t.labels=n),this.a_(t)}R_(e){const t={};t.database=Pc(this.serializer),t.removeTarget=e,this.a_(t)}}class JE extends Am{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return G(!!e.streamToken),this.lastStreamToken=e.streamToken,G(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){G(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=oE(e.writeResults,e.commitTime),n=Ve(e.commitTime);return this.listener.g_(n,t)}p_(){const e={};e.database=Pc(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>bi(this.serializer,n))};this.a_(t)}}/**
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
 */class YE extends class{}{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new L(C.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,Rc(t,n),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new L(C.UNKNOWN,i.toString())})}Lo(e,t,n,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Lo(e,Rc(t,n),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new L(C.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class XE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(ke(t),this.D_=!1):O("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class ZE{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{n.enqueueAndForget(async()=>{Jn(this)&&(O("RemoteStore","Restarting streams for network reachability change."),await async function(l){const u=F(l);u.L_.add(4),await Ss(u),u.q_.set("Unknown"),u.L_.delete(4),await Ui(u)}(this))})}),this.q_=new XE(n,s)}}async function Ui(r){if(Jn(r))for(const e of r.B_)await e(!0)}async function Ss(r){for(const e of r.B_)await e(!1)}function ga(r,e){const t=F(r);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Pl(t)?Rl(t):Ps(t).r_()&&Sl(t,e))}function hs(r,e){const t=F(r),n=Ps(t);t.N_.delete(e),n.r_()&&Sm(t,e),t.N_.size===0&&(n.r_()?n.o_():Jn(t)&&t.q_.set("Unknown"))}function Sl(r,e){if(r.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(H.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ps(r).A_(e)}function Sm(r,e){r.Q_.xe(e),Ps(r).R_(e)}function Rl(r){r.Q_=new XI({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>r.N_.get(e)||null,tt:()=>r.datastore.serializer.databaseId}),Ps(r).start(),r.q_.v_()}function Pl(r){return Jn(r)&&!Ps(r).n_()&&r.N_.size>0}function Jn(r){return F(r).L_.size===0}function Rm(r){r.Q_=void 0}async function eb(r){r.q_.set("Online")}async function tb(r){r.N_.forEach((e,t)=>{Sl(r,e)})}async function nb(r,e){Rm(r),Pl(r)?(r.q_.M_(e),Rl(r)):r.q_.set("Unknown")}async function rb(r,e,t){if(r.q_.set("Online"),e instanceof zp&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.N_.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.N_.delete(c),s.Q_.removeTarget(c))}(r,e)}catch(n){O("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await ea(r,n)}else if(e instanceof Vo?r.Q_.Ke(e):e instanceof jp?r.Q_.He(e):r.Q_.We(e),!t.isEqual(H.min()))try{const n=await _m(r.localStore);t.compareTo(n)>=0&&await function(i,o){const c=i.Q_.rt(o);return c.targetChanges.forEach((l,u)=>{if(l.resumeToken.approximateByteSize()>0){const h=i.N_.get(u);h&&i.N_.set(u,h.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,u)=>{const h=i.N_.get(l);if(!h)return;i.N_.set(l,h.withResumeToken(Re.EMPTY_BYTE_STRING,h.snapshotVersion)),Sm(i,l);const p=new Jt(h.target,l,u,h.sequenceNumber);Sl(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(r,t)}catch(n){O("RemoteStore","Failed to raise snapshot:",n),await ea(r,n)}}async function ea(r,e,t){if(!Wn(e))throw e;r.L_.add(1),await Ss(r),r.q_.set("Offline"),t||(t=()=>_m(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{O("RemoteStore","Retrying IndexedDB access"),await t(),r.L_.delete(1),await Ui(r)})}function Pm(r,e){return e().catch(t=>ea(r,t,e))}async function Rs(r){const e=F(r),t=Bn(e);let n=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;sb(e);)try{const s=await qE(e.localStore,n);if(s===null){e.O_.length===0&&t.o_();break}n=s.batchId,ib(e,s)}catch(s){await ea(e,s)}xm(e)&&Cm(e)}function sb(r){return Jn(r)&&r.O_.length<10}function ib(r,e){r.O_.push(e);const t=Bn(r);t.r_()&&t.V_&&t.m_(e.mutations)}function xm(r){return Jn(r)&&!Bn(r).n_()&&r.O_.length>0}function Cm(r){Bn(r).start()}async function ob(r){Bn(r).p_()}async function ab(r){const e=Bn(r);for(const t of r.O_)e.m_(t.mutations)}async function cb(r,e,t){const n=r.O_.shift(),s=hl.from(n,e,t);await Pm(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await Rs(r)}async function lb(r,e){e&&Bn(r).V_&&await async function(n,s){if(function(o){return $p(o)&&o!==C.ABORTED}(s.code)){const i=n.O_.shift();Bn(n).s_(),await Pm(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Rs(n)}}(r,e),xm(r)&&Cm(r)}async function Th(r,e){const t=F(r);t.asyncQueue.verifyOperationInProgress(),O("RemoteStore","RemoteStore received new credentials");const n=Jn(t);t.L_.add(3),await Ss(t),n&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Ui(t)}async function Nc(r,e){const t=F(r);e?(t.L_.delete(2),await Ui(t)):e||(t.L_.add(2),await Ss(t),t.q_.set("Unknown"))}function Ps(r){return r.K_||(r.K_=function(t,n,s){const i=F(t);return i.w_(),new QE(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Eo:eb.bind(null,r),Ro:tb.bind(null,r),mo:nb.bind(null,r),d_:rb.bind(null,r)}),r.B_.push(async e=>{e?(r.K_.s_(),Pl(r)?Rl(r):r.q_.set("Unknown")):(await r.K_.stop(),Rm(r))})),r.K_}function Bn(r){return r.U_||(r.U_=function(t,n,s){const i=F(t);return i.w_(),new JE(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:ob.bind(null,r),mo:lb.bind(null,r),f_:ab.bind(null,r),g_:cb.bind(null,r)}),r.B_.push(async e=>{e?(r.U_.s_(),await Rs(r)):(await r.U_.stop(),r.O_.length>0&&(O("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))})),r.U_}/**
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
 */class xl{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Ge,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,c=new xl(e,t,o,s,i);return c.start(n),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new L(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function xs(r,e){if(ke("AsyncQueue",`${e}: ${r}`),Wn(r))return new L(C.UNAVAILABLE,`${e}: ${r}`);throw r}/**
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
 */class Zr{constructor(e){this.comparator=e?(t,n)=>e(t,n)||$.comparator(t.key,n.key):(t,n)=>$.comparator(t.key,n.key),this.keyedMap=ti(),this.sortedSet=new ve(this.comparator)}static emptySet(e){return new Zr(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Zr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new Zr;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
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
 */class Ah{constructor(){this.W_=new ve($.comparator)}track(e){const t=e.doc.key,n=this.W_.get(t);n?e.type!==0&&n.type===3?this.W_=this.W_.insert(t,e):e.type===3&&n.type!==1?this.W_=this.W_.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.W_=this.W_.remove(t):e.type===1&&n.type===2?this.W_=this.W_.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):q():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,n)=>{e.push(n)}),e}}class fs{constructor(e,t,n,s,i,o,c,l,u){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=u}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new fs(e,t,Zr.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Li(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
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
 */class ub{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class db{constructor(){this.queries=Sh(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,n){const s=F(t),i=s.queries;s.queries=Sh(),i.forEach((o,c)=>{for(const l of c.j_)l.onError(n)})})(this,new L(C.ABORTED,"Firestore shutting down"))}}function Sh(){return new an(r=>Ap(r),Li)}async function Cl(r,e){const t=F(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.H_()&&e.J_()&&(n=2):(i=new ub,n=e.J_()?0:1);try{switch(n){case 0:i.z_=await t.onListen(s,!0);break;case 1:i.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=xs(o,`Initialization of query '${Gr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.j_.push(e),e.Z_(t.onlineState),i.z_&&e.X_(i.z_)&&Vl(t)}async function kl(r,e){const t=F(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function hb(r,e){const t=F(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.j_)c.X_(s)&&(n=!0);o.z_=s}}n&&Vl(t)}function fb(r,e,t){const n=F(r),s=n.queries.get(e);if(s)for(const i of s.j_)i.onError(t);n.queries.delete(e)}function Vl(r){r.Y_.forEach(e=>{e.next()})}var Lc,Rh;(Rh=Lc||(Lc={})).ea="default",Rh.Cache="cache";class Dl{constructor(e,t,n){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new fs(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const n=t!=="Offline";return(!this.options._a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=fs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Lc.Cache}}/**
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
 */class pb{constructor(e,t){this.aa=e,this.byteLength=t}ua(){return"metadata"in this.aa}}/**
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
 */class Ph{constructor(e){this.serializer=e}Es(e){return qt(this.serializer,e)}ds(e){return e.metadata.exists?Jp(this.serializer,e.document,!1):Ee.newNoDocument(this.Es(e.metadata.name),this.As(e.metadata.readTime))}As(e){return Ve(e)}}class mb{constructor(e,t,n){this.ca=e,this.localStore=t,this.serializer=n,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=km(e)}la(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.aa.namedQuery)this.queries.push(e.aa.namedQuery);else if(e.aa.documentMetadata){this.documents.push({metadata:e.aa.documentMetadata}),e.aa.documentMetadata.exists||++t;const n=ne.fromString(e.aa.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.aa.document&&(this.documents[this.documents.length-1].document=e.aa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}ha(e){const t=new Map,n=new Ph(this.serializer);for(const s of e)if(s.metadata.queries){const i=n.Es(s.metadata.name);for(const o of s.metadata.queries){const c=(t.get(o)||X()).add(i);t.set(o,c)}}return t}async complete(){const e=await jE(this.localStore,new Ph(this.serializer),this.documents,this.ca.id),t=this.ha(this.documents);for(const n of this.queries)await zE(this.localStore,n,t.get(n.name));return this.progress.taskState="Success",{progress:this.progress,Pa:this.collectionGroups,Ia:e}}}function km(r){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}}/**
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
 */class Vm{constructor(e){this.key=e}}class Dm{constructor(e){this.key=e}}class Nm{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=X(),this.mutatedKeys=X(),this.Aa=Rp(e),this.Ra=new Zr(this.Aa)}get Va(){return this.Ta}ma(e,t){const n=t?t.fa:new Ah,s=t?t.Ra:this.Ra;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,u=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((h,p)=>{const m=s.get(h),y=Oi(this.query,p)?p:null,b=!!m&&this.mutatedKeys.has(m.key),R=!!y&&(y.hasLocalMutations||this.mutatedKeys.has(y.key)&&y.hasCommittedMutations);let A=!1;m&&y?m.data.isEqual(y.data)?b!==R&&(n.track({type:3,doc:y}),A=!0):this.ga(m,y)||(n.track({type:2,doc:y}),A=!0,(l&&this.Aa(y,l)>0||u&&this.Aa(y,u)<0)&&(c=!0)):!m&&y?(n.track({type:0,doc:y}),A=!0):m&&!y&&(n.track({type:1,doc:m}),A=!0,(l||u)&&(c=!0)),A&&(y?(o=o.add(y),i=R?i.add(h):i.delete(h)):(o=o.delete(h),i=i.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),i=i.delete(h.key),n.track({type:1,doc:h})}return{Ra:o,fa:n,ns:c,mutatedKeys:i}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((h,p)=>function(y,b){const R=A=>{switch(A){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return q()}};return R(y)-R(b)}(h.type,p.type)||this.Aa(h.doc,p.doc)),this.pa(n),s=s!=null&&s;const c=t&&!s?this.ya():[],l=this.da.size===0&&this.current&&!s?1:0,u=l!==this.Ea;return this.Ea=l,o.length!==0||u?{snapshot:new fs(this.query,e.Ra,i,o,e.mutatedKeys,l===0,u,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Ah,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=X(),this.Ra.forEach(n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))});const t=[];return e.forEach(n=>{this.da.has(n)||t.push(new Dm(n))}),this.da.forEach(n=>{e.has(n)||t.push(new Vm(n))}),t}ba(e){this.Ta=e.Ts,this.da=X();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return fs.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class gb{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class yb{constructor(e){this.key=e,this.va=!1}}class _b{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new an(c=>Ap(c),Li),this.Ma=new Map,this.xa=new Set,this.Oa=new ve($.comparator),this.Na=new Map,this.La=new vl,this.Ba={},this.ka=new Map,this.qa=Sr.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function vb(r,e,t=!0){const n=ya(r);let s;const i=n.Fa.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await Lm(n,e,t,!0),s}async function wb(r,e){const t=ya(r);await Lm(t,e,!0,!1)}async function Lm(r,e,t,n){const s=await us(r.localStore,st(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let c;return n&&(c=await Nl(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&ga(r.remoteStore,s),c}async function Nl(r,e,t,n,s){r.Ka=(p,m,y)=>async function(R,A,k,D){let N=A.view.ma(k);N.ns&&(N=await Yo(R.localStore,A.query,!1).then(({documents:E})=>A.view.ma(E,N)));const z=D&&D.targetChanges.get(A.targetId),M=D&&D.targetMismatches.get(A.targetId)!=null,U=A.view.applyChanges(N,R.isPrimaryClient,z,M);return Oc(R,A.targetId,U.wa),U.snapshot}(r,p,m,y);const i=await Yo(r.localStore,e,!0),o=new Nm(e,i.Ts),c=o.ma(i.documents),l=Bi.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),u=o.applyChanges(c,r.isPrimaryClient,l);Oc(r,t,u.wa);const h=new gb(e,t,o);return r.Fa.set(e,h),r.Ma.has(t)?r.Ma.get(t).push(e):r.Ma.set(t,[e]),u.snapshot}async function Ib(r,e,t){const n=F(r),s=n.Fa.get(e),i=n.Ma.get(s.targetId);if(i.length>1)return n.Ma.set(s.targetId,i.filter(o=>!Li(o,e))),void n.Fa.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await ds(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),t&&hs(n.remoteStore,s.targetId),ps(n,s.targetId)}).catch(Hn)):(ps(n,s.targetId),await ds(n.localStore,s.targetId,!0))}async function Eb(r,e){const t=F(r),n=t.Fa.get(e),s=t.Ma.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),hs(t.remoteStore,n.targetId))}async function bb(r,e,t){const n=Fl(r);try{const s=await function(o,c){const l=F(o),u=_e.now(),h=c.reduce((y,b)=>y.add(b.key),X());let p,m;return l.persistence.runTransaction("Locally write mutations","readwrite",y=>{let b=yt(),R=X();return l.cs.getEntries(y,h).next(A=>{b=A,b.forEach((k,D)=>{D.isValidDocument()||(R=R.add(k))})}).next(()=>l.localDocuments.getOverlayedDocuments(y,b)).next(A=>{p=A;const k=[];for(const D of c){const N=QI(D,p.get(D.key).overlayedDocument);N!=null&&k.push(new cn(D.key,N,pp(N.value.mapValue),Ae.exists(!0)))}return l.mutationQueue.addMutationBatch(y,u,k,c)}).next(A=>{m=A;const k=A.applyToLocalDocumentSet(p,R);return l.documentOverlayCache.saveOverlays(y,A.batchId,k)})}).then(()=>({batchId:m.batchId,changes:xp(p)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),function(o,c,l){let u=o.Ba[o.currentUser.toKey()];u||(u=new ve(J)),u=u.insert(c,l),o.Ba[o.currentUser.toKey()]=u}(n,s.batchId,t),await ln(n,s.changes),await Rs(n.remoteStore)}catch(s){const i=xs(s,"Failed to persist write");t.reject(i)}}async function Om(r,e){const t=F(r);try{const n=await UE(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Na.get(i);o&&(G(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?G(o.va):s.removedDocuments.size>0&&(G(o.va),o.va=!1))}),await ln(t,n,e)}catch(n){await Hn(n)}}function xh(r,e,t){const n=F(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Fa.forEach((i,o)=>{const c=o.view.Z_(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const l=F(o);l.onlineState=c;let u=!1;l.queries.forEach((h,p)=>{for(const m of p.j_)m.Z_(c)&&(u=!0)}),u&&Vl(l)}(n.eventManager,e),s.length&&n.Ca.d_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function Tb(r,e,t){const n=F(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Na.get(e),i=s&&s.key;if(i){let o=new ve($.comparator);o=o.insert(i,Ee.newNoDocument(i,H.min()));const c=X().add(i),l=new Fi(H.min(),new Map,new ve(J),o,c);await Om(n,l),n.Oa=n.Oa.remove(i),n.Na.delete(e),Ml(n)}else await ds(n.localStore,e,!1).then(()=>ps(n,e,t)).catch(Hn)}async function Ab(r,e){const t=F(r),n=e.batch.batchId;try{const s=await $E(t.localStore,e);Ol(t,n,null),Ll(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await ln(t,s)}catch(s){await Hn(s)}}async function Sb(r,e,t){const n=F(r);try{const s=await function(o,c){const l=F(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let h;return l.mutationQueue.lookupMutationBatch(u,c).next(p=>(G(p!==null),h=p.keys(),l.mutationQueue.removeMutationBatch(u,p))).next(()=>l.mutationQueue.performConsistencyCheck(u)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(u,h,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,h)).next(()=>l.localDocuments.getDocuments(u,h))})}(n.localStore,e);Ol(n,e,t),Ll(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await ln(n,s)}catch(s){await Hn(s)}}async function Rb(r,e){const t=F(r);Jn(t.remoteStore)||O("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const n=await function(o){const c=F(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",l=>c.mutationQueue.getHighestUnacknowledgedBatchId(l))}(t.localStore);if(n===-1)return void e.resolve();const s=t.ka.get(n)||[];s.push(e),t.ka.set(n,s)}catch(n){const s=xs(n,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function Ll(r,e){(r.ka.get(e)||[]).forEach(t=>{t.resolve()}),r.ka.delete(e)}function Ol(r,e,t){const n=F(r);let s=n.Ba[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.Ba[n.currentUser.toKey()]=s}}function ps(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Ma.get(e))r.Fa.delete(n),t&&r.Ca.$a(n,t);r.Ma.delete(e),r.isPrimaryClient&&r.La.gr(e).forEach(n=>{r.La.containsKey(n)||Mm(r,n)})}function Mm(r,e){r.xa.delete(e.path.canonicalString());const t=r.Oa.get(e);t!==null&&(hs(r.remoteStore,t),r.Oa=r.Oa.remove(e),r.Na.delete(t),Ml(r))}function Oc(r,e,t){for(const n of t)n instanceof Vm?(r.La.addReference(n.key,e),Pb(r,n)):n instanceof Dm?(O("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,e),r.La.containsKey(n.key)||Mm(r,n.key)):q()}function Pb(r,e){const t=e.key,n=t.path.canonicalString();r.Oa.get(t)||r.xa.has(n)||(O("SyncEngine","New document in limbo: "+t),r.xa.add(n),Ml(r))}function Ml(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const e=r.xa.values().next().value;r.xa.delete(e);const t=new $(ne.fromString(e)),n=r.qa.next();r.Na.set(n,new yb(t)),r.Oa=r.Oa.insert(t,n),ga(r.remoteStore,new Jt(st(bs(t.path)),n,"TargetPurposeLimboResolution",mt.oe))}}async function ln(r,e,t){const n=F(r),s=[],i=[],o=[];n.Fa.isEmpty()||(n.Fa.forEach((c,l)=>{o.push(n.Ka(l,e,t).then(u=>{var h;if((u||t)&&n.isPrimaryClient){const p=u?!u.fromCache:(h=t==null?void 0:t.targetChanges.get(l.targetId))===null||h===void 0?void 0:h.current;n.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(u){s.push(u);const p=bl.Wi(l.targetId,u);i.push(p)}}))}),await Promise.all(o),n.Ca.d_(s),await async function(l,u){const h=F(l);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>P.forEach(u,m=>P.forEach(m.$i,y=>h.persistence.referenceDelegate.addReference(p,m.targetId,y)).next(()=>P.forEach(m.Ui,y=>h.persistence.referenceDelegate.removeReference(p,m.targetId,y)))))}catch(p){if(!Wn(p))throw p;O("LocalStore","Failed to update sequence numbers: "+p)}for(const p of u){const m=p.targetId;if(!p.fromCache){const y=h.os.get(m),b=y.snapshotVersion,R=y.withLastLimboFreeSnapshotVersion(b);h.os=h.os.insert(m,R)}}}(n.localStore,i))}async function xb(r,e){const t=F(r);if(!t.currentUser.isEqual(e)){O("SyncEngine","User change. New user:",e.toKey());const n=await ym(t.localStore,e);t.currentUser=e,function(i,o){i.ka.forEach(c=>{c.forEach(l=>{l.reject(new L(C.CANCELLED,o))})}),i.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await ln(t,n.hs)}}function Cb(r,e){const t=F(r),n=t.Na.get(e);if(n&&n.va)return X().add(n.key);{let s=X();const i=t.Ma.get(e);if(!i)return s;for(const o of i){const c=t.Fa.get(o);s=s.unionWith(c.view.Va)}return s}}async function kb(r,e){const t=F(r),n=await Yo(t.localStore,e.query,!0),s=e.view.ba(n);return t.isPrimaryClient&&Oc(t,e.targetId,s.wa),s}async function Vb(r,e){const t=F(r);return Im(t.localStore,e).then(n=>ln(t,n))}async function Db(r,e,t,n){const s=F(r),i=await function(c,l){const u=F(c),h=F(u.mutationQueue);return u.persistence.runTransaction("Lookup mutation documents","readonly",p=>h.Mn(p,l).next(m=>m?u.localDocuments.getDocuments(p,m):P.resolve(null)))}(s.localStore,e);i!==null?(t==="pending"?await Rs(s.remoteStore):t==="acknowledged"||t==="rejected"?(Ol(s,e,n||null),Ll(s,e),function(c,l){F(F(c).mutationQueue).On(l)}(s.localStore,e)):q(),await ln(s,i)):O("SyncEngine","Cannot apply mutation batch with id: "+e)}async function Nb(r,e){const t=F(r);if(ya(t),Fl(t),e===!0&&t.Qa!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),s=await Ch(t,n.toArray());t.Qa=!0,await Nc(t.remoteStore,!0);for(const i of s)ga(t.remoteStore,i)}else if(e===!1&&t.Qa!==!1){const n=[];let s=Promise.resolve();t.Ma.forEach((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):s=s.then(()=>(ps(t,o),ds(t.localStore,o,!0))),hs(t.remoteStore,o)}),await s,await Ch(t,n),function(o){const c=F(o);c.Na.forEach((l,u)=>{hs(c.remoteStore,u)}),c.La.pr(),c.Na=new Map,c.Oa=new ve($.comparator)}(t),t.Qa=!1,await Nc(t.remoteStore,!1)}}async function Ch(r,e,t){const n=F(r),s=[],i=[];for(const o of e){let c;const l=n.Ma.get(o);if(l&&l.length!==0){c=await us(n.localStore,st(l[0]));for(const u of l){const h=n.Fa.get(u),p=await kb(n,h);p.snapshot&&i.push(p.snapshot)}}else{const u=await wm(n.localStore,o);c=await us(n.localStore,u),await Nl(n,Fm(u),o,!1,c.resumeToken)}s.push(c)}return n.Ca.d_(i),s}function Fm(r){return Ep(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function Lb(r){return function(t){return F(F(t).persistence).Qi()}(F(r).localStore)}async function Ob(r,e,t,n){const s=F(r);if(s.Qa)return void O("SyncEngine","Ignoring unexpected query state notification.");const i=s.Ma.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await Im(s.localStore,Sp(i[0])),c=Fi.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Re.EMPTY_BYTE_STRING);await ln(s,o,c);break}case"rejected":await ds(s.localStore,e,!0),ps(s,e,n);break;default:q()}}async function Mb(r,e,t){const n=ya(r);if(n.Qa){for(const s of e){if(n.Ma.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){O("SyncEngine","Adding an already active target "+s);continue}const i=await wm(n.localStore,s),o=await us(n.localStore,i);await Nl(n,Fm(i),o.targetId,!1,o.resumeToken),ga(n.remoteStore,o)}for(const s of t)n.Ma.has(s)&&await ds(n.localStore,s,!1).then(()=>{hs(n.remoteStore,s),ps(n,s)}).catch(Hn)}}function ya(r){const e=F(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Om.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Cb.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Tb.bind(null,e),e.Ca.d_=hb.bind(null,e.eventManager),e.Ca.$a=fb.bind(null,e.eventManager),e}function Fl(r){const e=F(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Ab.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Sb.bind(null,e),e}function Fb(r,e,t){const n=F(r);(async function(i,o,c){try{const l=await o.getMetadata();if(await function(y,b){const R=F(y),A=Ve(b.createTime);return R.persistence.runTransaction("hasNewerBundle","readonly",k=>R.Gr.getBundleMetadata(k,b.id)).then(k=>!!k&&k.createTime.compareTo(A)>=0)}(i.localStore,l))return await o.close(),c._completeWith(function(y){return{taskState:"Success",documentsLoaded:y.totalDocuments,bytesLoaded:y.totalBytes,totalDocuments:y.totalDocuments,totalBytes:y.totalBytes}}(l)),Promise.resolve(new Set);c._updateProgress(km(l));const u=new mb(l,i.localStore,o.serializer);let h=await o.Ua();for(;h;){const m=await u.la(h);m&&c._updateProgress(m),h=await o.Ua()}const p=await u.complete();return await ln(i,p.Ia,void 0),await function(y,b){const R=F(y);return R.persistence.runTransaction("Save bundle","readwrite",A=>R.Gr.saveBundleMetadata(A,b))}(i.localStore,l),c._completeWith(p.progress),Promise.resolve(p.Pa)}catch(l){return It("SyncEngine",`Loading bundle failed with ${l}`),c._failWith(l),Promise.resolve(new Set)}})(n,e,t).then(s=>{n.sharedClientState.notifyBundleLoaded(s)})}class $n{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=$i(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return gm(this.persistence,new mm,e.initialUser,this.serializer)}Ga(e){return new wl(ma.Zr,this.serializer)}Wa(e){return new bm}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}$n.provider={build:()=>new $n};class Bb extends $n{constructor(e){super(),this.cacheSizeBytes=e}ja(e,t){G(this.persistence.referenceDelegate instanceof Jo);const n=this.persistence.referenceDelegate.garbageCollector;return new um(n,e.asyncQueue,t)}Ga(e){const t=this.cacheSizeBytes!==void 0?nt.withCacheSize(this.cacheSizeBytes):nt.DEFAULT;return new wl(n=>Jo.Zr(n,t),this.serializer)}}class Bl extends $n{constructor(e,t,n){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await Fl(this.Ja.syncEngine),await Rs(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return gm(this.persistence,new mm,e.initialUser,this.serializer)}ja(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new um(n,e.asyncQueue,t)}Ha(e,t){const n=new oI(t,this.persistence);return new iI(e.asyncQueue,n)}Ga(e){const t=El(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?nt.withCacheSize(this.cacheSizeBytes):nt.DEFAULT;return new Il(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Tm(),Do(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new bm}}class Bm extends Bl{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof sc&&(this.sharedClientState.syncEngine={no:Db.bind(null,t),ro:Ob.bind(null,t),io:Mb.bind(null,t),Qi:Lb.bind(null,t),eo:Vb.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi(async n=>{await Nb(this.Ja.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}Wa(e){const t=Tm();if(!sc.D(t))throw new L(C.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=El(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new sc(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class Un{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>xh(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=xb.bind(null,this.syncEngine),await Nc(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new db}()}createDatastore(e){const t=$i(e.databaseInfo.databaseId),n=function(i){return new WE(i)}(e.databaseInfo);return function(i,o,c,l){return new YE(i,o,c,l)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,s,i,o,c){return new ZE(n,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>xh(this.syncEngine,t,0),function(){return bh.D()?new bh:new GE}())}createSyncEngine(e,t){return function(s,i,o,c,l,u,h){const p=new _b(s,i,o,c,l,u);return h&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=F(s);O("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Ss(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Un.provider={build:()=>new Un};function kh(r,e=10240){let t=0;return{async read(){if(t<r.byteLength){const n={value:r.slice(t,t+e),done:!1};return t+=e,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
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
 */class _a{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):ke("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class $b{constructor(e,t){this.Xa=e,this.serializer=t,this.metadata=new Ge,this.buffer=new Uint8Array,this.eu=function(){return new TextDecoder("utf-8")}(),this.tu().then(n=>{n&&n.ua()?this.metadata.resolve(n.aa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(n==null?void 0:n.aa)}`))},n=>this.metadata.reject(n))}close(){return this.Xa.cancel()}async getMetadata(){return this.metadata.promise}async Ua(){return await this.getMetadata(),this.tu()}async tu(){const e=await this.nu();if(e===null)return null;const t=this.eu.decode(e),n=Number(t);isNaN(n)&&this.ru(`length string (${t}) is not valid number`);const s=await this.iu(n);return new pb(JSON.parse(s),e.length+n)}su(){return this.buffer.findIndex(e=>e===123)}async nu(){for(;this.su()<0&&!await this.ou(););if(this.buffer.length===0)return null;const e=this.su();e<0&&this.ru("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async iu(e){for(;this.buffer.length<e;)await this.ou()&&this.ru("Reached the end of bundle when more is expected.");const t=this.eu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}ru(e){throw this.Xa.cancel(),new Error(`Invalid bundle format: ${e}`)}async ou(){const e=await this.Xa.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
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
 */class Ub{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new L(C.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(s,i){const o=F(s),c={documents:i.map(p=>Ei(o.serializer,p))},l=await o.Lo("BatchGetDocuments",o.serializer.databaseId,ne.emptyPath(),c,i.length),u=new Map;l.forEach(p=>{const m=sE(o.serializer,p);u.set(m.key.toString(),m)});const h=[];return i.forEach(p=>{const m=u.get(p.toString());G(!!m),h.push(m)}),h}(this.datastore,e);return t.forEach(n=>this.recordVersion(n)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new As(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,n)=>{const s=$.fromPath(n);this.mutations.push(new ul(s,this.precondition(s)))}),await async function(n,s){const i=F(n),o={writes:s.map(c=>bi(i.serializer,c))};await i.Mo("Commit",i.serializer.databaseId,ne.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw q();t=H.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new L(C.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(H.min())?Ae.exists(!1):Ae.updateTime(t):Ae.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(H.min()))throw new L(C.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ae.updateTime(t)}return Ae.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
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
 */class qb{constructor(e,t,n,s,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=s,this.deferred=i,this._u=n.maxAttempts,this.t_=new Al(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const e=new Ub(this.datastore),t=this.cu(e);t&&t.then(n=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(n)}).catch(s=>{this.lu(s)}))}).catch(n=>{this.lu(n)})})}cu(e){try{const t=this.updateFunction(e);return!Di(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!$p(t)}return!1}}/**
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
 */class jb{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=s,this.user=qe.UNAUTHENTICATED,this.clientId=nl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async o=>{O("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(O("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ge;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=xs(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function oc(r,e){r.asyncQueue.verifyOperationInProgress(),O("FirestoreClient","Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await ym(e.localStore,s),n=s)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function Vh(r,e){r.asyncQueue.verifyOperationInProgress();const t=await $l(r);O("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>Th(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>Th(e.remoteStore,s)),r._onlineComponents=e}async function $l(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){O("FirestoreClient","Using user provided OfflineComponentProvider");try{await oc(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;It("Error using user provided cache. Falling back to memory cache: "+t),await oc(r,new $n)}}else O("FirestoreClient","Using default OfflineComponentProvider"),await oc(r,new $n);return r._offlineComponents}async function va(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(O("FirestoreClient","Using user provided OnlineComponentProvider"),await Vh(r,r._uninitializedComponentsProvider._online)):(O("FirestoreClient","Using default OnlineComponentProvider"),await Vh(r,new Un))),r._onlineComponents}function $m(r){return $l(r).then(e=>e.persistence)}function Cs(r){return $l(r).then(e=>e.localStore)}function Um(r){return va(r).then(e=>e.remoteStore)}function Ul(r){return va(r).then(e=>e.syncEngine)}function qm(r){return va(r).then(e=>e.datastore)}async function ms(r){const e=await va(r),t=e.eventManager;return t.onListen=vb.bind(null,e.syncEngine),t.onUnlisten=Ib.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=wb.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Eb.bind(null,e.syncEngine),t}function zb(r){return r.asyncQueue.enqueue(async()=>{const e=await $m(r),t=await Um(r);return e.setNetworkEnabled(!0),function(s){const i=F(s);return i.L_.delete(0),Ui(i)}(t)})}function Gb(r){return r.asyncQueue.enqueue(async()=>{const e=await $m(r),t=await Um(r);return e.setNetworkEnabled(!1),async function(s){const i=F(s);i.L_.add(0),await Ss(i),i.q_.set("Offline")}(t)})}function Kb(r,e){const t=new Ge;return r.asyncQueue.enqueueAndForget(async()=>async function(s,i,o){try{const c=await function(u,h){const p=F(u);return p.persistence.runTransaction("read document","readonly",m=>p.localDocuments.getDocument(m,h))}(s,i);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new L(C.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const l=xs(c,`Failed to get document '${i} from cache`);o.reject(l)}}(await Cs(r),e,t)),t.promise}function jm(r,e,t={}){const n=new Ge;return r.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,u){const h=new _a({next:m=>{h.Za(),o.enqueueAndForget(()=>kl(i,p));const y=m.docs.has(c);!y&&m.fromCache?u.reject(new L(C.UNAVAILABLE,"Failed to get document because the client is offline.")):y&&m.fromCache&&l&&l.source==="server"?u.reject(new L(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(m)},error:m=>u.reject(m)}),p=new Dl(bs(c.path),h,{includeMetadataChanges:!0,_a:!0});return Cl(i,p)}(await ms(r),r.asyncQueue,e,t,n)),n.promise}function Hb(r,e){const t=new Ge;return r.asyncQueue.enqueueAndForget(async()=>async function(s,i,o){try{const c=await Yo(s,i,!0),l=new Nm(i,c.Ts),u=l.ma(c.documents),h=l.applyChanges(u,!1);o.resolve(h.snapshot)}catch(c){const l=xs(c,`Failed to execute query '${i} against cache`);o.reject(l)}}(await Cs(r),e,t)),t.promise}function zm(r,e,t={}){const n=new Ge;return r.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,u){const h=new _a({next:m=>{h.Za(),o.enqueueAndForget(()=>kl(i,p)),m.fromCache&&l.source==="server"?u.reject(new L(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(m)},error:m=>u.reject(m)}),p=new Dl(c,h,{includeMetadataChanges:!0,_a:!0});return Cl(i,p)}(await ms(r),r.asyncQueue,e,t,n)),n.promise}function Wb(r,e,t){const n=new Ge;return r.asyncQueue.enqueueAndForget(async()=>{try{const s=await qm(r);n.resolve(async function(o,c,l){var u;const h=F(o),{request:p,ut:m,parent:y}=Xp(h.serializer,bp(c),l);h.connection.Fo||delete p.parent;const b=(await h.Lo("RunAggregationQuery",h.serializer.databaseId,y,p,1)).filter(A=>!!A.result);G(b.length===1);const R=(u=b[0].result)===null||u===void 0?void 0:u.aggregateFields;return Object.keys(R).reduce((A,k)=>(A[m[k]]=R[k],A),{})}(s,e,t))}catch(s){n.reject(s)}}),n.promise}function Qb(r,e){const t=new _a(e);return r.asyncQueue.enqueueAndForget(async()=>function(s,i){F(s).Y_.add(i),i.next()}(await ms(r),t)),()=>{t.Za(),r.asyncQueue.enqueueAndForget(async()=>function(s,i){F(s).Y_.delete(i)}(await ms(r),t))}}function Jb(r,e,t,n){const s=function(o,c){let l;return l=typeof o=="string"?qp().encode(o):o,function(h,p){return new $b(h,p)}(function(h,p){if(h instanceof Uint8Array)return kh(h,p);if(h instanceof ArrayBuffer)return kh(new Uint8Array(h),p);if(h instanceof ReadableStream)return h.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(l),c)}(t,$i(e));r.asyncQueue.enqueueAndForget(async()=>{Fb(await Ul(r),s,n)})}function Yb(r,e){return r.asyncQueue.enqueue(async()=>function(n,s){const i=F(n);return i.persistence.runTransaction("Get named query","readonly",o=>i.Gr.getNamedQuery(o,s))}(await Cs(r),e))}function Xb(r,e){return r.asyncQueue.enqueue(async()=>async function(n,s){const i=F(n),o=i.indexManager,c=[];return i.persistence.runTransaction("Configure indexes","readwrite",l=>o.getFieldIndexes(l).next(u=>function(p,m,y,b,R){p=[...p],m=[...m],p.sort(y),m.sort(y);const A=p.length,k=m.length;let D=0,N=0;for(;D<k&&N<A;){const z=y(p[N],m[D]);z<0?R(p[N++]):z>0?b(m[D++]):(D++,N++)}for(;D<k;)b(m[D++]);for(;N<A;)R(p[N++])}(u,s,tI,h=>{c.push(o.addFieldIndex(l,h))},h=>{c.push(o.deleteFieldIndex(l,h))})).next(()=>P.waitFor(c)))}(await Cs(r),e))}function Zb(r,e){return r.asyncQueue.enqueue(async()=>function(n,s){F(n).ss.zi=s}(await Cs(r),e))}function eT(r){return r.asyncQueue.enqueue(async()=>function(t){const n=F(t),s=n.indexManager;return n.persistence.runTransaction("Delete All Indexes","readwrite",i=>s.deleteAllFieldIndexes(i))}(await Cs(r)))}/**
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
 */function Gm(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
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
 */const Dh=new Map;/**
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
 */function ql(r,e,t){if(!t)throw new L(C.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function Km(r,e,t,n){if(e===!0&&n===!0)throw new L(C.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Nh(r){if(!$.isDocumentKey(r))throw new L(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Lh(r){if($.isDocumentKey(r))throw new L(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function wa(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":q()}function Z(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new L(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=wa(r);throw new L(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}function Hm(r,e){if(e<=0)throw new L(C.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${e}.`)}/**
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
 */class Oh{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new L(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new L(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Km("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Gm((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new L(C.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new L(C.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new L(C.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class qi{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Oh({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new L(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new L(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Oh(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Jf;switch(n.type){case"firstParty":return new Jw(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new L(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=Dh.get(t);n&&(O("ComponentProvider","Removing Datastore"),Dh.delete(t),n.terminate())}(this),Promise.resolve()}}function Wm(r,e,t,n={}){var s;const i=(r=Z(r,qi))._getSettings(),o=`${e}:${t}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&It("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),n.mockUserToken){let c,l;if(typeof n.mockUserToken=="string")c=n.mockUserToken,l=qe.MOCK_USER;else{c=ay(n.mockUserToken,(s=r._app)===null||s===void 0?void 0:s.options.projectId);const u=n.mockUserToken.sub||n.mockUserToken.user_id;if(!u)throw new L(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new qe(u)}r._authCredentials=new Hw(new Qf(c,l))}}/**
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
 */class Ke{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Ke(this.firestore,e,this._query)}}class xe{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ct(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new xe(this.firestore,e,this._key)}}class Ct extends Ke{constructor(e,t,n){super(e,t,bs(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new xe(this.firestore,null,new $(e))}withConverter(e){return new Ct(this.firestore,e,this._path)}}function Fe(r,e,...t){if(r=ue(r),ql("collection","path",e),r instanceof qi){const n=ne.fromString(e,...t);return Lh(n),new Ct(r,null,n)}{if(!(r instanceof xe||r instanceof Ct))throw new L(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(ne.fromString(e,...t));return Lh(n),new Ct(r.firestore,null,n)}}function tT(r,e){if(r=Z(r,qi),ql("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new L(C.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Ke(r,null,function(n){return new on(ne.emptyPath(),n)}(e))}function ie(r,e,...t){if(r=ue(r),arguments.length===1&&(e=nl.newId()),ql("doc","path",e),r instanceof qi){const n=ne.fromString(e,...t);return Nh(n),new xe(r,null,new $(n))}{if(!(r instanceof xe||r instanceof Ct))throw new L(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(ne.fromString(e,...t));return Nh(n),new xe(r.firestore,r instanceof Ct?r.converter:null,new $(n))}}function nT(r,e){return r=ue(r),e=ue(e),(r instanceof xe||r instanceof Ct)&&(e instanceof xe||e instanceof Ct)&&r.firestore===e.firestore&&r.path===e.path&&r.converter===e.converter}function jl(r,e){return r=ue(r),e=ue(e),r instanceof Ke&&e instanceof Ke&&r.firestore===e.firestore&&Li(r._query,e._query)&&r.converter===e.converter}/**
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
 */class Mh{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Al(this,"async_queue_retry"),this.Vu=()=>{const n=Do();n&&O("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=e;const t=Do();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Do();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new Ge;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Wn(e))throw e;O("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(n=>{this.Eu=n,this.du=!1;const s=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(n);throw ke("INTERNAL UNHANDLED ERROR: ",s),n}).then(n=>(this.du=!1,n))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=xl.createAndSchedule(this,e,t,n,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&q()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function Mc(r){return function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1}(r,["next","error","complete"])}class Qm{constructor(){this._progressObserver={},this._taskCompletionResolver=new Ge,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
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
 */const rT=-1;class ge extends qi{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new Mh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Mh(e),this._firestoreClient=void 0,await e}}}function sT(r,e,t){t||(t="(default)");const n=Pi(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if(Dn(i,e))return s;throw new L(C.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new L(C.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new L(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:e,instanceIdentifier:t})}function Jm(r,e){const t=typeof r=="object"?r:rf(),n=typeof r=="string"?r:e||"(default)",s=Pi(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=iy("firestore");i&&Wm(s,...i)}return s}function Se(r){if(r._terminated)throw new L(C.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Ym(r),r._firestoreClient}function Ym(r){var e,t,n;const s=r._freezeSettings(),i=function(c,l,u,h){return new PI(c,l,u,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,Gm(h.experimentalLongPollingOptions),h.useFetchStreams)}(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,s);r._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=s.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),r._firestoreClient=new jb(r._authCredentials,r._appCheckCredentials,r._queue,i,r._componentsProvider&&function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}}(r._componentsProvider))}function iT(r,e){It("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();return Xm(r,Un.provider,{build:n=>new Bl(n,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function oT(r){It("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();Xm(r,Un.provider,{build:t=>new Bm(t,e.cacheSizeBytes)})}function Xm(r,e,t){if((r=Z(r,ge))._firestoreClient||r._terminated)throw new L(C.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new L(C.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:e,_offline:t},Ym(r)}function aT(r){if(r._initialized&&!r._terminated)throw new L(C.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Ge;return r._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(n){if(!Ut.D())return Promise.resolve();const s=n+"main";await Ut.delete(s)}(El(r._databaseId,r._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function cT(r){return function(t){const n=new Ge;return t.asyncQueue.enqueueAndForget(async()=>Rb(await Ul(t),n)),n.promise}(Se(r=Z(r,ge)))}function lT(r){return zb(Se(r=Z(r,ge)))}function uT(r){return Gb(Se(r=Z(r,ge)))}function dT(r){return __(r.app,"firestore",r._databaseId.database),r._delete()}function hT(r,e){const t=Se(r=Z(r,ge)),n=new Qm;return Jb(t,r._databaseId,e,n),n}function fT(r,e){return Yb(Se(r=Z(r,ge)),e).then(t=>t?new Ke(r,null,t.query):null)}/**
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
 */class gs{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class Zm{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
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
 */class qn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new qn(Re.fromBase64String(e))}catch(t){throw new L(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new qn(Re.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Yn{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new L(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new be(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function pT(){return new Yn("__name__")}/**
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
 */class Xn{constructor(e){this._methodName=e}}/**
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
 */class Ia{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new L(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new L(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}}/**
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
 */class ji{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
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
 */const mT=/^__.*__$/;class gT{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new cn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ts(e,this.data,t,this.fieldTransforms)}}class eg{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new cn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function tg(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw q()}}class Ea{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Ea(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:n,xu:!1});return s.Ou(e),s}Nu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:n,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return ta(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(tg(this.Cu)&&mT.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class yT{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||$i(e)}Qu(e,t,n,s=!1){return new Ea({Cu:e,methodName:t,qu:n,path:be.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function kr(r){const e=r._freezeSettings(),t=$i(r._databaseId);return new yT(r._databaseId,!!e.ignoreUndefinedProperties,t)}function ba(r,e,t,n,s,i={}){const o=r.Qu(i.merge||i.mergeFields?2:0,e,t,s);Jl("Data must be an object, but it was:",o,n);const c=sg(n,o);let l,u;if(i.merge)l=new gt(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const h=[];for(const p of i.mergeFields){const m=Ti(e,p,t);if(!o.contains(m))throw new L(C.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);og(h,m)||h.push(m)}l=new gt(h),u=o.fieldTransforms.filter(p=>l.covers(p.field))}else l=null,u=o.fieldTransforms;return new gT(new Je(c),l,u)}class zi extends Xn{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof zi}}function ng(r,e,t){return new Ea({Cu:3,qu:e.settings.qu,methodName:r._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class zl extends Xn{_toFieldTransform(e){return new Mi(e.path,new as)}isEqual(e){return e instanceof zl}}class Gl extends Xn{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=ng(this,e,!0),n=this.Ku.map(i=>Vr(i,t)),s=new Er(n);return new Mi(e.path,s)}isEqual(e){return e instanceof Gl&&Dn(this.Ku,e.Ku)}}class Kl extends Xn{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=ng(this,e,!0),n=this.Ku.map(i=>Vr(i,t)),s=new br(n);return new Mi(e.path,s)}isEqual(e){return e instanceof Kl&&Dn(this.Ku,e.Ku)}}class Hl extends Xn{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new cs(e.serializer,Vp(e.serializer,this.$u));return new Mi(e.path,t)}isEqual(e){return e instanceof Hl&&this.$u===e.$u}}function Wl(r,e,t,n){const s=r.Qu(1,e,t);Jl("Data must be an object, but it was:",s,n);const i=[],o=Je.empty();Qn(n,(l,u)=>{const h=Ta(e,l,t);u=ue(u);const p=s.Nu(h);if(u instanceof zi)i.push(h);else{const m=Vr(u,p);m!=null&&(i.push(h),o.set(h,m))}});const c=new gt(i);return new eg(o,c,s.fieldTransforms)}function Ql(r,e,t,n,s,i){const o=r.Qu(1,e,t),c=[Ti(e,n,t)],l=[s];if(i.length%2!=0)throw new L(C.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<i.length;m+=2)c.push(Ti(e,i[m])),l.push(i[m+1]);const u=[],h=Je.empty();for(let m=c.length-1;m>=0;--m)if(!og(u,c[m])){const y=c[m];let b=l[m];b=ue(b);const R=o.Nu(y);if(b instanceof zi)u.push(y);else{const A=Vr(b,R);A!=null&&(u.push(y),h.set(y,A))}}const p=new gt(u);return new eg(h,p,o.fieldTransforms)}function rg(r,e,t,n=!1){return Vr(t,r.Qu(n?4:3,e))}function Vr(r,e){if(ig(r=ue(r)))return Jl("Unsupported field value:",e,r),sg(r,e);if(r instanceof Xn)return function(n,s){if(!tg(s.Cu))throw s.Bu(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(n,s){const i=[];let o=0;for(const c of n){let l=Vr(c,s.Lu(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}}(r,e)}return function(n,s){if((n=ue(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Vp(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=_e.fromDate(n);return{timestampValue:ls(s.serializer,i)}}if(n instanceof _e){const i=new _e(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:ls(s.serializer,i)}}if(n instanceof Ia)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof qn)return{bytesValue:Gp(s.serializer,n._byteString)};if(n instanceof xe){const i=s.databaseId,o=n.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ml(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof ji)return function(o,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(l=>{if(typeof l!="number")throw c.Bu("VectorValues must only contain numeric values.");return ll(c.serializer,l)})}}}}}}(n,s);throw s.Bu(`Unsupported field value: ${wa(n)}`)}(r,e)}function sg(r,e){const t={};return up(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Qn(r,(n,s)=>{const i=Vr(s,e.Mu(n));i!=null&&(t[n]=i)}),{mapValue:{fields:t}}}function ig(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof _e||r instanceof Ia||r instanceof qn||r instanceof xe||r instanceof Xn||r instanceof ji)}function Jl(r,e,t){if(!ig(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const n=wa(t);throw n==="an object"?e.Bu(r+" a custom object"):e.Bu(r+" "+n)}}function Ti(r,e,t){if((e=ue(e))instanceof Yn)return e._internalPath;if(typeof e=="string")return Ta(r,e);throw ta("Field path arguments must be of type string or ",r,!1,void 0,t)}const _T=new RegExp("[~\\*/\\[\\]]");function Ta(r,e,t){if(e.search(_T)>=0)throw ta(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Yn(...e.split("."))._internalPath}catch{throw ta(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function ta(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${n}`),o&&(l+=` in document ${s}`),l+=")"),new L(C.INVALID_ARGUMENT,c+r+l)}function og(r,e){return r.some(t=>t.isEqual(e))}/**
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
 */class Ai{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new xe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new vT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Aa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class vT extends Ai{data(){return super.data()}}function Aa(r,e){return typeof e=="string"?Ta(r,e):e instanceof Yn?e._internalPath:e._delegate._internalPath}/**
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
 */function ag(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new L(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Yl{}class ks extends Yl{}function wt(r,e,...t){let n=[];e instanceof Yl&&n.push(e),n=n.concat(t),function(i){const o=i.filter(l=>l instanceof Dr).length,c=i.filter(l=>l instanceof Vs).length;if(o>1||o>0&&c>0)throw new L(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class Vs extends ks{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Vs(e,t,n)}_apply(e){const t=this._parse(e);return dg(e._query,t),new Ke(e.firestore,e.converter,Ac(e._query,t))}_parse(e){const t=kr(e.firestore);return function(i,o,c,l,u,h,p){let m;if(u.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new L(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){Bh(p,h);const y=[];for(const b of p)y.push(Fh(l,i,b));m={arrayValue:{values:y}}}else m=Fh(l,i,p)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||Bh(p,h),m=rg(c,o,p,h==="in"||h==="not-in");return re.create(u,h,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function je(r,e,t){const n=e,s=Aa("where",r);return Vs._create(s,n,t)}class Dr extends Yl{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Dr(e,t)}_parse(e){const t=this._queryConstraints.map(n=>n._parse(e)).filter(n=>n.getFilters().length>0);return t.length===1?t[0]:he.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const l of c)dg(o,l),o=Ac(o,l)}(e._query,t),new Ke(e.firestore,e.converter,Ac(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function wT(...r){return r.forEach(e=>hg("or",e)),Dr._create("or",r)}function IT(...r){return r.forEach(e=>hg("and",e)),Dr._create("and",r)}class Sa extends ks{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Sa(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new L(C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new L(C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ii(i,o)}(e._query,this._field,this._direction);return new Ke(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new on(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function cg(r,e="asc"){const t=e,n=Aa("orderBy",r);return Sa._create(n,t)}class Gi extends ks{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new Gi(e,t,n)}_apply(e){return new Ke(e.firestore,e.converter,Go(e._query,this._limit,this._limitType))}}function lg(r){return Hm("limit",r),Gi._create("limit",r,"F")}function ET(r){return Hm("limitToLast",r),Gi._create("limitToLast",r,"L")}class Ki extends ks{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new Ki(e,t,n)}_apply(e){const t=ug(e,this.type,this._docOrFields,this._inclusive);return new Ke(e.firestore,e.converter,function(s,i){return new on(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)}(e._query,t))}}function bT(...r){return Ki._create("startAt",r,!0)}function TT(...r){return Ki._create("startAfter",r,!1)}class Hi extends ks{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new Hi(e,t,n)}_apply(e){const t=ug(e,this.type,this._docOrFields,this._inclusive);return new Ke(e.firestore,e.converter,function(s,i){return new on(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,s.startAt,i)}(e._query,t))}}function AT(...r){return Hi._create("endBefore",r,!1)}function ST(...r){return Hi._create("endAt",r,!0)}function ug(r,e,t,n){if(t[0]=ue(t[0]),t[0]instanceof Ai)return function(i,o,c,l,u){if(!l)throw new L(C.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const h=[];for(const p of Xr(i))if(p.field.isKeyField())h.push(wr(o,l.key));else{const m=l.data.field(p.field);if(aa(m))throw new L(C.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(m===null){const y=p.field.canonicalString();throw new L(C.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${y}' (used as the orderBy) does not exist.`)}h.push(m)}return new Fn(h,u)}(r._query,r.firestore._databaseId,e,t[0]._document,n);{const s=kr(r.firestore);return function(o,c,l,u,h,p){const m=o.explicitOrderBy;if(h.length>m.length)throw new L(C.INVALID_ARGUMENT,`Too many arguments provided to ${u}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const y=[];for(let b=0;b<h.length;b++){const R=h[b];if(m[b].field.isKeyField()){if(typeof R!="string")throw new L(C.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${u}(), but got a ${typeof R}`);if(!al(o)&&R.indexOf("/")!==-1)throw new L(C.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${u}() must be a plain document ID, but '${R}' contains a slash.`);const A=o.path.child(ne.fromString(R));if(!$.isDocumentKey(A))throw new L(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${u}() must result in a valid document path, but '${A}' is not because it contains an odd number of segments.`);const k=new $(A);y.push(wr(c,k))}else{const A=rg(l,u,R);y.push(A)}}return new Fn(y,p)}(r._query,r.firestore._databaseId,s,e,t,n)}}function Fh(r,e,t){if(typeof(t=ue(t))=="string"){if(t==="")throw new L(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!al(e)&&t.indexOf("/")!==-1)throw new L(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(ne.fromString(t));if(!$.isDocumentKey(n))throw new L(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return wr(r,new $(n))}if(t instanceof xe)return wr(r,t._key);throw new L(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${wa(t)}.`)}function Bh(r,e){if(!Array.isArray(r)||r.length===0)throw new L(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function dg(r,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new L(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new L(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function hg(r,e){if(!(e instanceof Vs||e instanceof Dr))throw new L(C.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class Xl{convertValue(e,t="none"){switch(On(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Te(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(nn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw q()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Qn(e,(s,i)=>{n[s]=this.convertValue(i,t)}),n}convertVectorValue(e){var t,n,s;const i=(s=(n=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.map(o=>Te(o.doubleValue));return new ji(i)}convertGeoPoint(e){return new Ia(Te(e.latitude),Te(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=ca(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(_i(e));default:return null}}convertTimestamp(e){const t=tn(e);return new _e(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=ne.fromString(e);G(nm(n));const s=new Ln(n.get(1),n.get(3)),i=new $(n.popFirst(5));return s.isEqual(t)||ke(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function Ra(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class RT extends Xl{constructor(e){super(),this.firestore=e}convertBytes(e){return new qn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new xe(this.firestore,null,t)}}/**
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
 */function PT(r){return new gs("sum",Ti("sum",r))}function xT(r){return new gs("avg",Ti("average",r))}function fg(){return new gs("count")}function CT(r,e){var t,n;return r instanceof gs&&e instanceof gs&&r.aggregateType===e.aggregateType&&((t=r._internalFieldPath)===null||t===void 0?void 0:t.canonicalString())===((n=e._internalFieldPath)===null||n===void 0?void 0:n.canonicalString())}function kT(r,e){return jl(r.query,e.query)&&Dn(r.data(),e.data())}/**
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
 */class xn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Rr extends Ai{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new fi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Aa("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class fi extends Rr{data(e={}){return super.data(e)}}class Pr{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new xn(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new fi(this._firestore,this._userDataWriter,n.key,n,new xn(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new L(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const l=new fi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new xn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new fi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new xn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let u=-1,h=-1;return c.type!==0&&(u=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),h=o.indexOf(c.doc.key)),{type:VT(c.type),doc:l,oldIndex:u,newIndex:h}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function VT(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return q()}}function DT(r,e){return r instanceof Rr&&e instanceof Rr?r._firestore===e._firestore&&r._key.isEqual(e._key)&&(r._document===null?e._document===null:r._document.isEqual(e._document))&&r._converter===e._converter:r instanceof Pr&&e instanceof Pr&&r._firestore===e._firestore&&jl(r.query,e.query)&&r.metadata.isEqual(e.metadata)&&r._snapshot.isEqual(e._snapshot)}/**
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
 */function ht(r){r=Z(r,xe);const e=Z(r.firestore,ge);return jm(Se(e),r._key).then(t=>Zl(e,r,t))}class Zn extends Xl{constructor(e){super(),this.firestore=e}convertBytes(e){return new qn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new xe(this.firestore,null,t)}}function NT(r){r=Z(r,xe);const e=Z(r.firestore,ge),t=Se(e),n=new Zn(e);return Kb(t,r._key).then(s=>new Rr(e,n,r._key,s,new xn(s!==null&&s.hasLocalMutations,!0),r.converter))}function LT(r){r=Z(r,xe);const e=Z(r.firestore,ge);return jm(Se(e),r._key,{source:"server"}).then(t=>Zl(e,r,t))}function dt(r){r=Z(r,Ke);const e=Z(r.firestore,ge),t=Se(e),n=new Zn(e);return ag(r._query),zm(t,r._query).then(s=>new Pr(e,n,r,s))}function OT(r){r=Z(r,Ke);const e=Z(r.firestore,ge),t=Se(e),n=new Zn(e);return Hb(t,r._query).then(s=>new Pr(e,n,r,s))}function MT(r){r=Z(r,Ke);const e=Z(r.firestore,ge),t=Se(e),n=new Zn(e);return zm(t,r._query,{source:"server"}).then(s=>new Pr(e,n,r,s))}function ys(r,e,t){r=Z(r,xe);const n=Z(r.firestore,ge),s=Ra(r.converter,e,t);return Ds(n,[ba(kr(n),"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,Ae.none())])}function pt(r,e,t,...n){r=Z(r,xe);const s=Z(r.firestore,ge),i=kr(s);let o;return o=typeof(e=ue(e))=="string"||e instanceof Yn?Ql(i,"updateDoc",r._key,e,t,n):Wl(i,"updateDoc",r._key,e),Ds(s,[o.toMutation(r._key,Ae.exists(!0))])}function Xt(r){return Ds(Z(r.firestore,ge),[new As(r._key,Ae.none())])}function Wi(r,e){const t=Z(r.firestore,ge),n=ie(r),s=Ra(r.converter,e);return Ds(t,[ba(kr(r.firestore),"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,Ae.exists(!1))]).then(()=>n)}function FT(r,...e){var t,n,s;r=ue(r);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Mc(e[o])||(i=e[o],o++);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Mc(e[o])){const p=e[o];e[o]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[o+1]=(n=p.error)===null||n===void 0?void 0:n.bind(p),e[o+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let l,u,h;if(r instanceof xe)u=Z(r.firestore,ge),h=bs(r._key.path),l={next:p=>{e[o]&&e[o](Zl(u,r,p))},error:e[o+1],complete:e[o+2]};else{const p=Z(r,Ke);u=Z(p.firestore,ge),h=p._query;const m=new Zn(u);l={next:y=>{e[o]&&e[o](new Pr(u,m,p,y))},error:e[o+1],complete:e[o+2]},ag(r._query)}return function(m,y,b,R){const A=new _a(R),k=new Dl(y,A,b);return m.asyncQueue.enqueueAndForget(async()=>Cl(await ms(m),k)),()=>{A.Za(),m.asyncQueue.enqueueAndForget(async()=>kl(await ms(m),k))}}(Se(u),h,c,l)}function BT(r,e){return Qb(Se(r=Z(r,ge)),Mc(e)?e:{next:e})}function Ds(r,e){return function(n,s){const i=new Ge;return n.asyncQueue.enqueueAndForget(async()=>bb(await Ul(n),s,i)),i.promise}(Se(r),e)}function Zl(r,e,t){const n=t.docs.get(e._key),s=new Zn(r);return new Rr(r,s,e._key,n,new xn(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */function $T(r){return pg(r,{count:fg()})}function pg(r,e){const t=Z(r.firestore,ge),n=Se(t),s=lp(e,(i,o)=>new Bp(o,i.aggregateType,i._internalFieldPath));return Wb(n,r._query,s).then(i=>function(c,l,u){const h=new Zn(c);return new Zm(l,h,u)}(t,r,i))}class UT{constructor(e){this.kind="memory",this._onlineComponentProvider=Un.provider,e!=null&&e.garbageCollector?this._offlineComponentProvider=e.garbageCollector._offlineComponentProvider:this._offlineComponentProvider=$n.provider}toJSON(){return{kind:this.kind}}}class qT{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=mg(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class jT{constructor(){this.kind="memoryEager",this._offlineComponentProvider=$n.provider}toJSON(){return{kind:this.kind}}}class zT{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new Bb(e)}}toJSON(){return{kind:this.kind}}}function GT(){return new jT}function KT(r){return new zT(r==null?void 0:r.cacheSizeBytes)}function HT(r){return new UT(r)}function WT(r){return new qT(r)}class QT{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Un.provider,this._offlineComponentProvider={build:t=>new Bl(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class JT{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Un.provider,this._offlineComponentProvider={build:t=>new Bm(t,e==null?void 0:e.cacheSizeBytes)}}}function mg(r){return new QT(r==null?void 0:r.forceOwnership)}function YT(){return new JT}/**
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
 */const XT={maxAttempts:5};/**
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
 */class gg{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=kr(e)}set(e,t,n){this._verifyNotCommitted();const s=Sn(e,this._firestore),i=Ra(s.converter,t,n),o=ba(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(o.toMutation(s._key,Ae.none())),this}update(e,t,n,...s){this._verifyNotCommitted();const i=Sn(e,this._firestore);let o;return o=typeof(t=ue(t))=="string"||t instanceof Yn?Ql(this._dataReader,"WriteBatch.update",i._key,t,n,s):Wl(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,Ae.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Sn(e,this._firestore);return this._mutations=this._mutations.concat(new As(t._key,Ae.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new L(C.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Sn(r,e){if((r=ue(r)).firestore!==e)throw new L(C.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
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
 */class yg extends class{constructor(t,n){this._firestore=t,this._transaction=n,this._dataReader=kr(t)}get(t){const n=Sn(t,this._firestore),s=new RT(this._firestore);return this._transaction.lookup([n._key]).then(i=>{if(!i||i.length!==1)return q();const o=i[0];if(o.isFoundDocument())return new Ai(this._firestore,s,o.key,o,n.converter);if(o.isNoDocument())return new Ai(this._firestore,s,n._key,null,n.converter);throw q()})}set(t,n,s){const i=Sn(t,this._firestore),o=Ra(i.converter,n,s),c=ba(this._dataReader,"Transaction.set",i._key,o,i.converter!==null,s);return this._transaction.set(i._key,c),this}update(t,n,s,...i){const o=Sn(t,this._firestore);let c;return c=typeof(n=ue(n))=="string"||n instanceof Yn?Ql(this._dataReader,"Transaction.update",o._key,n,s,i):Wl(this._dataReader,"Transaction.update",o._key,n),this._transaction.update(o._key,c),this}delete(t){const n=Sn(t,this._firestore);return this._transaction.delete(n._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Sn(e,this._firestore),n=new Zn(this._firestore);return super.get(e).then(s=>new Rr(this._firestore,n,t._key,s._document,new xn(!1,!1),t.converter))}}function ZT(r,e,t){r=Z(r,ge);const n=Object.assign(Object.assign({},XT),t);return function(i){if(i.maxAttempts<1)throw new L(C.INVALID_ARGUMENT,"Max attempts must be at least 1")}(n),function(i,o,c){const l=new Ge;return i.asyncQueue.enqueueAndForget(async()=>{const u=await qm(i);new qb(i.asyncQueue,u,c,o,l).au()}),l.promise}(Se(r),s=>e(new yg(r,s)),n)}/**
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
 */function eA(){return new zi("deleteField")}function tA(){return new zl("serverTimestamp")}function _s(...r){return new Gl("arrayUnion",r)}function Mt(...r){return new Kl("arrayRemove",r)}function nA(r){return new Hl("increment",r)}function rA(r){return new ji(r)}/**
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
 */function eu(r){return Se(r=Z(r,ge)),new gg(r,e=>Ds(r,e))}/**
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
 */function sA(r,e){const t=Se(r=Z(r,ge));if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return It("Cannot enable indexes when persistence is disabled"),Promise.resolve();const n=function(i){const o=typeof i=="string"?function(u){try{return JSON.parse(u)}catch(h){throw new L(C.INVALID_ARGUMENT,"Failed to parse JSON: "+(h==null?void 0:h.message))}}(i):i,c=[];if(Array.isArray(o.indexes))for(const l of o.indexes){const u=$h(l,"collectionGroup"),h=[];if(Array.isArray(l.fields))for(const p of l.fields){const m=Ta("setIndexConfiguration",$h(p,"fieldPath"));p.arrayConfig==="CONTAINS"?h.push(new mr(m,2)):p.order==="ASCENDING"?h.push(new mr(m,0)):p.order==="DESCENDING"&&h.push(new mr(m,1))}c.push(new rs(rs.UNKNOWN_ID,u,h,ss.empty()))}return c}(e);return Xb(t,n)}function $h(r,e){if(typeof r[e]!="string")throw new L(C.INVALID_ARGUMENT,"Missing string value for: "+e);return r[e]}/**
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
 */class _g{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function iA(r){var e;r=Z(r,ge);const t=Uh.get(r);if(t)return t;if(((e=Se(r)._uninitializedComponentsProvider)===null||e===void 0?void 0:e._offline.kind)!=="persistent")return null;const n=new _g(r);return Uh.set(r,n),n}function oA(r){vg(r,!0)}function aA(r){vg(r,!1)}function cA(r){eT(Se(r._firestore)).then(e=>O("deleting all persistent cache indexes succeeded")).catch(e=>It("deleting all persistent cache indexes failed",e))}function vg(r,e){Zb(Se(r._firestore),e).then(t=>O(`setting persistent cache index auto creation isEnabled=${e} succeeded`)).catch(t=>It(`setting persistent cache index auto creation isEnabled=${e} failed`,t))}const Uh=new WeakMap;/**
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
 */function lA(r){var e;const t=(e=Se(Z(r.firestore,ge))._onlineComponents)===null||e===void 0?void 0:e.datastore.serializer;return t===void 0?null:ha(t,st(r._query))._t}function uA(r,e){var t;const n=lp(e,(i,o)=>new Bp(o,i.aggregateType,i._internalFieldPath)),s=(t=Se(Z(r.firestore,ge))._onlineComponents)===null||t===void 0?void 0:t.datastore.serializer;return s===void 0?null:Xp(s,bp(r._query),n,!0).request}/**
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
 */class dA{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return tu.instance.onExistenceFilterMismatch(e)}}class tu{constructor(){this.Uu=new Map}static get instance(){return wo||(wo=new tu,function(t){if(Ko)throw new Error("a TestingHooksSpi instance is already set");Ko=t}(wo)),wo}et(e){this.Uu.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.Uu;return n.set(t,e),()=>n.delete(t)}}let wo=null;(function(e,t=!0){(function(s){Es=s})(Is),es(new yr("firestore",(n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),c=new ge(new Ww(n.getProvider("auth-internal")),new Yw(n.getProvider("app-check-internal")),function(u,h){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new L(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ln(u.options.projectId,h)}(o,s),o);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),Vn(Cd,"4.7.3",e),Vn(Cd,"4.7.3","esm2017")})();const hA=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Xl,AggregateField:gs,AggregateQuerySnapshot:Zm,Bytes:qn,CACHE_SIZE_UNLIMITED:rT,CollectionReference:Ct,DocumentReference:xe,DocumentSnapshot:Rr,FieldPath:Yn,FieldValue:Xn,Firestore:ge,FirestoreError:L,GeoPoint:Ia,LoadBundleTask:Qm,PersistentCacheIndexManager:_g,Query:Ke,QueryCompositeFilterConstraint:Dr,QueryConstraint:ks,QueryDocumentSnapshot:fi,QueryEndAtConstraint:Hi,QueryFieldFilterConstraint:Vs,QueryLimitConstraint:Gi,QueryOrderByConstraint:Sa,QuerySnapshot:Pr,QueryStartAtConstraint:Ki,SnapshotMetadata:xn,Timestamp:_e,Transaction:yg,VectorValue:ji,WriteBatch:gg,_AutoId:nl,_ByteString:Re,_DatabaseId:Ln,_DocumentKey:$,_EmptyAppCheckTokenProvider:Xw,_EmptyAuthCredentialsProvider:Jf,_FieldPath:be,_TestingHooks:dA,_cast:Z,_debugAssert:Kw,_internalAggregationQueryToProtoRunAggregationQueryRequest:uA,_internalQueryToProtoQueryTarget:lA,_isBase64Available:SI,_logWarn:It,_validateIsNotUsedTogether:Km,addDoc:Wi,aggregateFieldEqual:CT,aggregateQuerySnapshotEqual:kT,and:IT,arrayRemove:Mt,arrayUnion:_s,average:xT,clearIndexedDbPersistence:aT,collection:Fe,collectionGroup:tT,connectFirestoreEmulator:Wm,count:fg,deleteAllPersistentCacheIndexes:cA,deleteDoc:Xt,deleteField:eA,disableNetwork:uT,disablePersistentCacheIndexAutoCreation:aA,doc:ie,documentId:pT,enableIndexedDbPersistence:iT,enableMultiTabIndexedDbPersistence:oT,enableNetwork:lT,enablePersistentCacheIndexAutoCreation:oA,endAt:ST,endBefore:AT,ensureFirestoreConfigured:Se,executeWrite:Ds,getAggregateFromServer:pg,getCountFromServer:$T,getDoc:ht,getDocFromCache:NT,getDocFromServer:LT,getDocs:dt,getDocsFromCache:OT,getDocsFromServer:MT,getFirestore:Jm,getPersistentCacheIndexManager:iA,increment:nA,initializeFirestore:sT,limit:lg,limitToLast:ET,loadBundle:hT,memoryEagerGarbageCollector:GT,memoryLocalCache:HT,memoryLruGarbageCollector:KT,namedQuery:fT,onSnapshot:FT,onSnapshotsInSync:BT,or:wT,orderBy:cg,persistentLocalCache:WT,persistentMultipleTabManager:YT,persistentSingleTabManager:mg,query:wt,queryEqual:jl,refEqual:nT,runTransaction:ZT,serverTimestamp:tA,setDoc:ys,setIndexConfiguration:sA,setLogLevel:Gw,snapshotEqual:DT,startAfter:TT,startAt:bT,sum:PT,terminate:dT,updateDoc:pt,vector:rA,waitForPendingWrites:cT,where:je,writeBatch:eu},Symbol.toStringTag,{value:"Module"}));var fA="firebase",pA="10.14.1";/**
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
 */Vn(fA,pA,"app");const mA={apiKey:"AIzaSyCSdbVzlGYazn9zJH8ee55jJwNAioZg7m8",authDomain:"manhwadb-9319f.firebaseapp.com",projectId:"manhwadb-9319f",storageBucket:"manhwadb-9319f.firebasestorage.app",messagingSenderId:"647854568421",appId:"1:647854568421:web:802c4cf20e69264e9b350c"},wg=nf(mA),un=jw(wg),W=Jm(wg),gA=Object.freeze(Object.defineProperty({__proto__:null,auth:un,db:W},Symbol.toStringTag,{value:"Module"}));function yA(r){return r?r instanceof _e?r.toDate().toISOString():r!=null&&r.seconds?new Date(r.seconds*1e3).toISOString():r:null}function vs(r){if(!r.exists())return null;const e=r.data();return Object.keys(e).forEach(t=>{var n;(e[t]instanceof _e||(n=e[t])!=null&&n.seconds)&&(e[t]=yA(e[t]))}),{id:r.id,...e}}function Ft(r){return r.docs.map(e=>vs(e))}let lt=null;const Me={get:()=>{var r;return((r=un.currentUser)==null?void 0:r.uid)||null},currentUser:()=>lt,setProfile:r=>{lt=r},clear:()=>{lt=null}},pe={byId:async r=>{if(!r)return null;const e=await ht(ie(W,"users",r));return vs(e)},byUsername:async r=>{const e=await ht(ie(W,"usernames",r.toLowerCase()));if(!e.exists())return null;const{uid:t}=e.data();return pe.byId(t)},save:async r=>{var n;const{id:e,...t}=r;await ys(ie(W,"users",e),t,{merge:!0}),((n=un.currentUser)==null?void 0:n.uid)===e&&Me.setProfile({...lt||{},...t,id:e})},delete:async r=>{await Xt(ie(W,"users",r))},block:async(r,e)=>{await pt(ie(W,"users",r),{blockedUsers:_s(e)}),lt&&lt.id===r&&(lt.blockedUsers=[...lt.blockedUsers||[],e])},unblock:async(r,e)=>{await pt(ie(W,"users",r),{blockedUsers:Mt(e)}),lt&&lt.id===r&&(lt.blockedUsers=(lt.blockedUsers||[]).filter(t=>t!==e))},isBlocked:r=>((lt==null?void 0:lt.blockedUsers)||[]).includes(r),isBlockedBy:async(r,e)=>{const t=await pe.byId(r);return((t==null?void 0:t.blockedUsers)||[]).includes(e)}},ze={all:async()=>{const r=await dt(Fe(W,"reviews"));return Ft(r).sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt))},byId:async r=>{const e=await ht(ie(W,"reviews",r));return vs(e)},byUser:async r=>{const e=wt(Fe(W,"reviews"),je("userId","==",r)),t=await dt(e);return Ft(t).sort((n,s)=>new Date(s.createdAt)-new Date(n.createdAt))},topRated:async(r=10)=>{const e=await dt(wt(Fe(W,"reviews"),cg("createdAt","desc"),lg(500))),t=Ft(e),n={};return t.forEach(s=>{const i=s.titleId||`manual_${s.title.toLowerCase().replace(/\s+/g,"_")}`;n[i]||(n[i]={...s,titleId:i,totalRating:0,count:0}),n[i].totalRating+=s.rating,n[i].count+=1}),Object.values(n).map(s=>({...s,avgRating:s.totalRating/s.count})).sort((s,i)=>i.avgRating-s.avgRating).slice(0,r)},byTitle:async r=>{const e=wt(Fe(W,"reviews"),je("titleId","==",r)),t=await dt(e);return Ft(t).sort((n,s)=>new Date(s.createdAt)-new Date(n.createdAt))},exists:async(r,e)=>{const t=wt(Fe(W,"reviews"),je("userId","==",r),je("titleId","==",e));return!(await dt(t)).empty},create:async(r,e)=>{const t=Me.currentUser(),n=e.titleId||`manual_${e.title.toLowerCase().replace(/\s+/g,"_")}`;return{id:(await Wi(Fe(W,"reviews"),{userId:r,username:(t==null?void 0:t.username)||"Unknown",title:e.title||"",titleId:n,coverBase64:e.coverBase64||"",text:e.text||"",rating:e.rating??0,chapters:e.chapters||0,status:e.status||"done",tags:e.tags||[],date:e.date||"",likes:[],dislikes:[],createdAt:new Date().toISOString(),updatedAt:null})).id,userId:r,titleId:n,...e}},update:async(r,e)=>(await pt(ie(W,"reviews",r),{...e,updatedAt:new Date().toISOString()}),{id:r,...e}),delete:async r=>{await Xt(ie(W,"reviews",r));const e=await dt(wt(Fe(W,"comments"),je("reviewId","==",r))),t=eu(W);e.docs.forEach(n=>t.delete(n.ref)),await t.commit()},toggleLike:async(r,e)=>{const t=ie(W,"reviews",r),n=await ht(t);if(!n.exists())return;const{likes:s=[],dislikes:i=[]}=n.data();s.includes(e)?await pt(t,{likes:Mt(e)}):await pt(t,{likes:_s(e),dislikes:Mt(e)})},toggleDislike:async(r,e)=>{const t=ie(W,"reviews",r),n=await ht(t);if(!n.exists())return;const{likes:s=[],dislikes:i=[]}=n.data();i.includes(e)?await pt(t,{dislikes:Mt(e)}):await pt(t,{dislikes:_s(e),likes:Mt(e)})}},fr={byReview:async r=>{const e=wt(Fe(W,"comments"),je("reviewId","==",r)),t=await dt(e);return Ft(t).sort((n,s)=>new Date(n.createdAt)-new Date(s.createdAt))},create:async(r,e,t,n=null)=>{const s=Me.currentUser();return{id:(await Wi(Fe(W,"comments"),{reviewId:r,userId:e,username:(s==null?void 0:s.username)||"Unknown",avatarBase64:(s==null?void 0:s.avatarBase64)||"",text:t,parentId:n,likes:[],dislikes:[],createdAt:new Date().toISOString(),updatedAt:null})).id,reviewId:r,userId:e,text:t,parentId:n}},delete:async r=>{await Xt(ie(W,"comments",r));const e=await dt(wt(Fe(W,"comments"),je("parentId","==",r))),t=eu(W);e.docs.forEach(n=>t.delete(n.ref)),await t.commit()},toggleLike:async(r,e)=>{var s;const t=ie(W,"comments",r),n=await ht(t);n.exists()&&((s=n.data().likes)!=null&&s.includes(e)?await pt(t,{likes:Mt(e)}):await pt(t,{likes:_s(e),dislikes:Mt(e)}))},toggleDislike:async(r,e)=>{var s;const t=ie(W,"comments",r),n=await ht(t);n.exists()&&((s=n.data().dislikes)!=null&&s.includes(e)?await pt(t,{dislikes:Mt(e)}):await pt(t,{dislikes:_s(e),likes:Mt(e)}))}};function yn(r,e){return[r,e].sort().join("_")}const ut={between:async(r,e)=>{const t=await ht(ie(W,"friends",yn(r,e)));return vs(t)},ofUser:async r=>{const e=wt(Fe(W,"friends"),je("users","array-contains",r),je("status","==","accepted")),t=await dt(e);return Ft(t)},pendingFor:async r=>{const e=wt(Fe(W,"friends"),je("receiverId","==",r),je("status","==","pending")),t=await dt(e);return Ft(t)},sentBy:async r=>{const e=wt(Fe(W,"friends"),je("requesterId","==",r),je("status","==","pending")),t=await dt(e);return Ft(t)},send:async(r,e)=>{if(await pe.isBlockedBy(e,r))return"blocked";if(await ut.between(r,e))return!1;const s=yn(r,e);return await ys(ie(W,"friends",s),{users:[r,e],requesterId:r,receiverId:e,status:"pending",createdAt:new Date().toISOString()}),!0},accept:async(r,e)=>{await pt(ie(W,"friends",yn(r,e)),{status:"accepted"});try{await Xt(ie(W,"rejections",yn(r,e)))}catch{}},decline:async(r,e)=>{await Xt(ie(W,"friends",yn(r,e)));const t=yn(r,e),n=ie(W,"rejections",t),s=await ht(n);let i=1;return s.exists()&&(i=(s.data().count||0)+1),await ys(n,{users:[r,e],count:i,lastDeclinedBy:e,updatedAt:new Date().toISOString()}),i},getDeclineCount:async(r,e)=>{const t=await ht(ie(W,"rejections",yn(r,e)));return t.exists()&&t.data().count||0},remove:async(r,e)=>{await Xt(ie(W,"friends",yn(r,e)))}},jn={recent:async(r=40)=>{const e=await dt(Fe(W,"news"));return Ft(e).sort((t,n)=>new Date(n.createdAt)-new Date(t.createdAt)).slice(0,r)},add:async(r,e,t=null,n={})=>{await Wi(Fe(W,"news"),{type:r,userId:e,targetId:t,createdAt:new Date().toISOString(),...n})}},qh=[{name:"Toongod",url:"https://www.toongod.org/",desc:"18+"},{name:"Hentai20",url:"https://hentai20.io/",desc:"18+"},{name:"AllHen",url:"https://20.allhen.online/",desc:"18+"},{name:"Desu",url:"https://desu.uno/",desc:"18+"},{name:"HentaiChan",url:"https://hentaichan.live/",desc:"18+"},{name:"imhentai",url:"https://imhentai.xxx/",desc:"18+"}],Ig={all:()=>{try{const r=JSON.parse(localStorage.getItem("mdb_top_sites_v2"));return r!=null&&r.length?r:qh}catch{return qh}},save:r=>localStorage.setItem("mdb_top_sites_v2",JSON.stringify(r))},Pa={byUser:async r=>{try{const e=wt(Fe(W,"playlists"),je("userId","==",r)),t=await dt(e);return Ft(t).sort((n,s)=>new Date(s.createdAt)-new Date(n.createdAt))}catch(e){return console.error("Playlists error (likely missing Firestore rules):",e),[]}},create:async(r,e,t=[])=>({id:(await Wi(Fe(W,"playlists"),{userId:r,name:e,reviewIds:t,createdAt:new Date().toISOString()})).id,userId:r,name:e,reviewIds:t}),delete:async r=>{await Xt(ie(W,"playlists",r))}},Fc={byId:async r=>{if(!r)return null;const e=await ht(ie(W,"manga_metadata",r));return vs(e)},byTitle:async r=>{if(!r)return null;let e=r.toLowerCase().trim().replace(/\s+/g,"_");e=e.replace(/[^a-z0-9_]/gi,"");const t=`manual_${e}`,n=await ht(ie(W,"manga_metadata",t));return vs(n)}},_A=Object.freeze(Object.defineProperty({__proto__:null,Comments:fr,Friends:ut,MangaMetadata:Fc,News:jn,Playlists:Pa,Reviews:ze,Session:Me,TopSites:Ig,Users:pe},Symbol.toStringTag,{value:"Module"})),si={};let Bc=null;function Pt(r,e){si[r]=e}function De(r){window.location.hash=r}function vA(r){Bc=r}function wA(){function r(){const e=window.location.hash.replace("#","")||"home";Bc&&Bc(e);let t=!1;for(const n of Object.keys(si)){const s=[],i=n.replace(/:([^/]+)/g,(l,u)=>(s.push(u),"([^/]+)")),o=new RegExp(`^${i}$`),c=e.match(o);if(c){const l={};s.forEach((u,h)=>{l[u]=decodeURIComponent(c[h+1])}),si[n](l),t=!0;break}}!t&&si.home&&si.home({})}window.addEventListener("hashchange",r),r()}function IA(r){return`${r.toLowerCase().replace(/[^a-z0-9]/g,"_")}@manhwadb.app`}async function EA(r,e,t=""){if(!r||r.trim().length<3)return{error:"Ім'я користувача має бути мінімум 3 символи"};if(!/^[a-zA-Z0-9_а-яА-ЯіІїЇєЄ]+$/.test(r))return{error:"Логін може містити лише літери, цифри та _"};if(!e||e.length<6)return{error:"Пароль має бути мінімум 6 символів"};try{if((await ht(ie(W,"usernames",r.toLowerCase()))).exists())return{error:"Такий логін вже зайнятий. Оберіть інший."}}catch(h){return{error:"Помилка з'єднання або доступу (Rules): "+h.message}}const n=IA(r);let s;try{s=await Av(un,n,e)}catch(h){return h.code==="auth/email-already-in-use"?{error:"Такий логін вже зайнятий."}:{error:h.message}}const i=s.user.uid,o=new Date().toISOString();try{await s.user.getIdToken(!0)}catch{}await new Promise(h=>setTimeout(h,1500));const c=async(h,p=3)=>{for(let m=0;m<p;m++)try{return await h(),null}catch(y){if(m===p-1)return y;await new Promise(b=>setTimeout(b,800*(m+1)))}},l=await c(()=>ys(ie(W,"users",i),{username:r.trim(),email:t||"",bio:"",avatarBase64:"",top4:[null,null,null,null],createdAt:o}));if(l){console.error("Registration DB Write Error (users):",l);try{await mc(s.user)}catch{}return{error:"Помилка запису профілю (users): "+l.message}}const u=await c(()=>ys(ie(W,"usernames",r.toLowerCase()),{uid:i,internalEmail:n}));if(u){console.error("Registration DB Write Error (usernames):",u);try{await mc(s.user)}catch{}return{error:"Помилка реєстрації логіну (usernames): "+u.message}}return{user:{id:i,username:r.trim()}}}async function bA(r,e){if(!r||!e)return{error:"Заповніть всі поля"};const t=await ht(ie(W,"usernames",r.toLowerCase()));if(!t.exists())return{error:"Користувача не знайдено"};const{internalEmail:n}=t.data();try{return{user:(await Sv(un,n,e)).user}}catch(s){return s.code==="auth/wrong-password"||s.code==="auth/invalid-credential"?{error:"Невірний пароль"}:{error:s.message}}}async function TA(){await Vv(un)}async function AA(r,e,t){const n=un.currentUser;if(!n)return{error:"Не авторизовано"};if(t.length<6)return{error:"Новий пароль має бути мінімум 6 символів"};try{const s=Kn.credential(n.email,e);return await kf(n,s),await Rv(n,t),{ok:!0}}catch(s){return s.code==="auth/wrong-password"||s.code==="auth/invalid-credential"?{error:"Старий пароль невірний"}:{error:s.message}}}async function SA(r){const e=un.currentUser;if(!e)return{error:"Не авторизовано"};try{const t=Kn.credential(e.email,r);return await kf(e,t),await mc(e),{ok:!0}}catch(t){return t.code==="auth/wrong-password"||t.code==="auth/invalid-credential"?{error:"Невірний пароль"}:{error:t.message}}}function xr(r){if(!r)return"";const e=Date.now(),t=new Date(r).getTime(),n=Math.floor((e-t)/1e3);return n<60?"щойно":n<3600?`${Math.floor(n/60)} хв тому`:n<86400?`${Math.floor(n/3600)} год тому`:n<86400*30?`${Math.floor(n/86400)} д тому`:new Date(r).toLocaleDateString("uk-UA",{day:"numeric",month:"short",year:"numeric"})}function Eg(r){return r?new Date(r).toLocaleDateString("uk-UA",{day:"numeric",month:"long",year:"numeric"}):""}function K(r){return(r||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function jh(r,e=700,t=.65){return new Promise((n,s)=>{const i=new FileReader;i.onload=o=>{const c=new Image;c.onload=()=>{const l=document.createElement("canvas");let u=c.width,h=c.height;u>e&&(h=Math.round(h*e/u),u=e),l.width=u,l.height=h,l.getContext("2d").drawImage(c,0,0,u,h),n(l.toDataURL("image/jpeg",t))},c.onerror=s,c.src=o.target.result},i.onerror=s,i.readAsDataURL(r)})}function ws(r,e=!1){if(e)return`<div class="crosses-display">${Array(10).fill('<span class="cross-mark">✕</span>').join("")}</div>`;const t="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";let n=Number(r);Number.isFinite(n)||(n=0),n=Math.max(0,Math.min(10,Math.round(n*2)/2));let s='<div class="stars-display">';for(let i=1;i<=10;i++){const o=n>=i,c=!o&&n>=i-.5;o?s+=`<span class="star full"><svg viewBox="0 0 24 24"><path d="${t}"/></svg></span>`:c?s+=`
        <span class="star half">
          <svg viewBox="0 0 24 24"><path d="${t}"/></svg>
          <span class="star-half-fill"><svg viewBox="0 0 24 24"><path d="${t}"/></svg></span>
        </span>`:s+=`<span class="star"><svg viewBox="0 0 24 24"><path d="${t}"/></svg></span>`}return s+="</div>",s}function nu(r){if(!r)return"";let e=r.trim();if(e==="fapped")return"fapped 🍆💦";if(e.endsWith("+")){const t=["😍","❤️","🌟","✨","💎","🔥"],n=Math.abs(e.length)%t.length;return e.slice(0,-1).trim()+" "+t[n]}if(e.endsWith("-")){const t=["🗑️","💩","🤮","📉","👎","🧊"],n=Math.abs(e.length)%t.length;return e.slice(0,-1).trim()+" "+t[n]}return e}async function RA(r){try{const t=await(await fetch("https://x9.h-chan.me/engine/ajax/search.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({query:r.trim()})})).text(),n=[],s=/href="([^"]*\/manga\/(\d+)-([^"]+)\.html)".*?<span class="searchdesc">([^<]+)<\/span>/gi;let i;for(;(i=s.exec(t))!==null;)n.push({id:i[2],url:i[1].startsWith("http")?i[1]:"https://x9.h-chan.me"+i[1],title:i[3].replace(/-/g," "),desc:i[4],source:"h-chan"});return n}catch(e){return console.warn("H-Chan search failed:",e),[]}}async function PA(r){var n;const e=(r||"").trim();if(!e)return null;const t=typeof window<"u"?window.__x9QualityCache||(window.__x9QualityCache=new Map):null;if(t!=null&&t.has(e))return t.get(e);try{const i=await(await fetch("https://x9.h-chan.me/engine/ajax/search.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({query:e})})).text(),o=i.match(/href=["']([^"']*\/manga\/\d+-[^"']+\.html[^"']*)["']/i);let c=(o==null?void 0:o[1])||null;if(!c){const R=(n=i.match(/(\/manga\/\d+-[^"' >]+\.html)/i))==null?void 0:n[1];R&&(c="https://x9.h-chan.me"+R)}if(!c)return null;c.startsWith("//")&&(c="https:"+c),c.startsWith("http")||(c="https://x9.h-chan.me"+(c.startsWith("/")?c:"/"+c));const u=await(await fetch(c)).text(),h=parseInt((u.match(/Плюсиков:[^0-9]*([0-9]+)/i)||[])[1],10),p=parseInt((u.match(/Лайков:[^0-9]*([0-9]+)/i)||[])[1],10),m=Number.isFinite(p)?p:h,y=Number.isFinite(h)?h:p;if(!Number.isFinite(m)||!Number.isFinite(y))return null;const b={score:Math.max(1,m),votes:Math.max(1,y)};return t==null||t.set(e,b),b}catch{return null}}function xt(r,e="md"){if(r&&r.avatarBase64)return`<img class="avatar avatar-${e}" src="${r.avatarBase64}" alt="${K(r.username)}">`;const t=r?(r.username||"?").charAt(0).toUpperCase():"?";return`<div class="avatar avatar-${e}">${t}</div>`}function le(r,e="info",t={}){let n=document.querySelector(".toast-container");n||(n=document.createElement("div"),n.className="toast-container",document.body.appendChild(n));const s=document.createElement("div");s.className=`toast toast-${e}`;const i={success:"✅",error:"❌",info:"ℹ️",warning:"🚫"};s.innerHTML=`<span>${i[e]||""}</span><span style="flex:1">${K(r)}</span>${t.persistent?'<button class="toast-close">✕</button>':""}`,n.appendChild(s),t.persistent?s.querySelector(".toast-close").addEventListener("click",()=>{s.style.opacity="0",s.style.transition="opacity 0.3s",setTimeout(()=>s.remove(),300)}):setTimeout(()=>{s.style.opacity="0",s.style.transition="opacity 0.3s",setTimeout(()=>s.remove(),300)},3500)}function Nr(r){r.innerHTML='<div style="display:flex;justify-content:center;padding:80px"><div class="loader-spinner"></div></div>'}let No=null;function $c(r="login"){gr();const e=document.createElement("div");e.className="modal-backdrop",e.id="auth-modal",e.innerHTML=`
    <div class="modal-box">
      <div class="modal-header">
        <span class="modal-title">ManhwaDB</span>
        <button class="modal-close" id="auth-modal-close">✕</button>
      </div>
      <div class="modal-body">
        <div class="modal-tabs">
          <button class="modal-tab ${r==="login"?"active":""}" data-tab="login">Увійти</button>
          <button class="modal-tab ${r==="register"?"active":""}" data-tab="register">Зареєструватися</button>
        </div>
        <div id="auth-tab-content"></div>
      </div>
    </div>`,document.body.appendChild(e),No=e,zh(e,r),e.querySelectorAll(".modal-tab").forEach(t=>{t.addEventListener("click",()=>{e.querySelectorAll(".modal-tab").forEach(n=>n.classList.remove("active")),t.classList.add("active"),zh(e,t.dataset.tab)})}),document.getElementById("auth-modal-close").addEventListener("click",gr),e.addEventListener("click",t=>{t.target===e&&gr()}),document.addEventListener("keydown",bg)}function bg(r){r.key==="Escape"&&gr()}function gr(){No&&(No.remove(),No=null),document.removeEventListener("keydown",bg)}function Io(r,e){r.disabled=e,r.textContent=e?"Зачекайте...":r.dataset.label}function zh(r,e){const t=r.querySelector("#auth-tab-content");if(e==="login"){t.innerHTML=`
      <div class="form-group" style="margin-bottom:16px">
        <label class="form-label">Логін</label>
        <input class="input" type="text" id="auth-username" placeholder="Ваш логін" autocomplete="username">
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Пароль</label>
        <input class="input" type="password" id="auth-password" placeholder="Ваш пароль" autocomplete="current-password">
      </div>
      <div id="auth-error" class="form-error" style="display:none;margin-bottom:12px"></div>
      <button class="btn btn-primary" style="width:100%" id="auth-submit" data-label="Увійти">Увійти</button>`;const n=async()=>{const s=t.querySelector("#auth-username").value.trim(),i=t.querySelector("#auth-password").value,o=t.querySelector("#auth-error"),c=t.querySelector("#auth-submit");Io(c,!0);const l=await bA(s,i);l.error?(o.textContent=l.error,o.style.display="block",Io(c,!1)):(gr(),le("Вітаємо! 👋","success"),setTimeout(()=>window.location.reload(),300))};t.querySelector("#auth-submit").addEventListener("click",n),t.querySelectorAll("input").forEach(s=>s.addEventListener("keydown",i=>{i.key==="Enter"&&n()}))}else{t.innerHTML=`
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
      <button class="btn btn-primary" style="width:100%" id="auth-submit" data-label="Створити акаунт">Створити акаунт</button>`;const n=async()=>{const s=t.querySelector("#auth-username").value.trim(),i=t.querySelector("#auth-email").value.trim(),o=t.querySelector("#auth-password").value,c=t.querySelector("#auth-error"),l=t.querySelector("#auth-submit");Io(l,!0);const u=await EA(s,o,i);u.error?(c.textContent=u.error,c.style.display="block",Io(l,!1)):(jn.add("joined",u.user.id,null,{username:u.user.username}).catch(()=>{}),gr(),le(`Ласкаво просимо, ${u.user.username}! 🎉`,"success"),setTimeout(()=>window.location.reload(),500))};t.querySelector("#auth-submit").addEventListener("click",n),t.querySelectorAll("input").forEach(s=>s.addEventListener("keydown",i=>{i.key==="Enter"&&n()}))}setTimeout(()=>{var n;return(n=t.querySelector("input"))==null?void 0:n.focus()},50)}const ii=Object.freeze(Object.defineProperty({__proto__:null,closeAuthModal:gr,showAuthModal:$c},Symbol.toStringTag,{value:"Module"}));function Uc(){var o,c,l;const r=Me.currentUser(),e=document.getElementById("app");let t=document.getElementById("site-header");t&&t.remove(),t=document.createElement("header"),t.id="site-header",t.className="site-header";const s=(window.location.hash.replace("#","")||"home").split("/")[0];t.innerHTML=`
    <a href="#home" class="header-logo">ManhwaDB</a>
    <nav class="header-nav">
      <button class="nav-link ${s==="home"||s===""?"active":""}" data-hash="home">🏠 Головна</button>
      <button class="nav-link ${s==="faq"?"active":""}" data-hash="faq">❔ FAQ</button>
      ${r?`<button class="nav-link ${s==="new-review"?"active":""}" data-hash="new-review">✍️ Написати</button>`:""}
      ${r?`<button class="nav-link ${s==="friends"?"active":""}" data-hash="friends">👥 Друзі</button>`:""}
      ${r?`<button class="nav-link ${s==="account"?"active":""}" data-hash="account">👤 Мій акаунт</button>`:""}
    </nav>
    <div class="header-auth">
      ${r?`<span>Вітаємо, <strong>${r.username}</strong></span>
           <button class="btn btn-secondary btn-xs" id="logout-btn">Вийти</button>`:`<button class="btn btn-ghost btn-xs" id="login-btn">Увійти</button>
           <button class="btn btn-primary btn-xs" id="register-btn">Реєстрація</button>`}
    </div>`,e.insertBefore(t,e.firstChild);let i=document.getElementById("mobile-nav");i&&i.remove(),r&&(i=document.createElement("nav"),i.id="mobile-nav",i.className="mobile-nav",i.innerHTML=`
      <button class="mobile-nav-item ${s==="home"||s===""?"active":""}" data-hash="home">
        <span class="mobile-nav-icon">🏠</span>
        <span>Головна</span>
      </button>
      <button class="mobile-nav-item ${s==="new-review"?"active":""}" data-hash="new-review">
        <span class="mobile-nav-icon">✍️</span>
        <span>Написати</span>
      </button>
      <button class="mobile-nav-item ${s==="friends"?"active":""}" data-hash="friends">
        <span class="mobile-nav-icon">👥</span>
        <span>Друзі</span>
      </button>
      <button class="mobile-nav-item ${s==="account"?"active":""}" data-hash="account">
        <span class="mobile-nav-icon">👤</span>
        <span>Профіль</span>
      </button>
    `,e.appendChild(i)),document.querySelectorAll("[data-hash]").forEach(u=>{u.addEventListener("click",()=>De(u.dataset.hash))}),(o=document.getElementById("logout-btn"))==null||o.addEventListener("click",async()=>{confirm("Вийти з акаунту?")&&(await TA(),le("Ви вийшли з акаунту","info"),window.location.hash="home",window.location.reload())}),(c=document.getElementById("login-btn"))==null||c.addEventListener("click",()=>$c("login")),(l=document.getElementById("register-btn"))==null||l.addEventListener("click",()=>$c("register"))}async function xA(){const r=document.getElementById("page-root");Nr(r);const e=Ig.all(),[t,n,s]=await Promise.all([ze.all(),ze.topRated(10),jn.recent(50)]);r.innerHTML=`
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
                ${e.map((u,h)=>`
                  <a class="top-site-item" href="${K(u.url)}" target="_blank" rel="noopener">
                    <span class="top-site-rank">${h+1}</span>
                    <div>
                      <div style="font-weight:600">${K(u.name)}</div>
                      <div style="font-size:0.75rem;color:var(--text-muted)">${K(u.desc)}</div>
                    </div>
                    <span style="margin-left:auto;color:var(--text-muted);font-size:12px">↗</span>
                  </a>`).join("")}
              </div>
            </div>

            <div>
              <div class="section-title">🔥 Топ популярних</div>
              <div class="scrollable-feed">
                ${n.length===0?'<div class="empty-state"><div class="empty-icon">📖</div><h3>Ще немає рецензій</h3></div>':n.map((u,h)=>`
                      <div class="review-card" style="margin-bottom:10px;cursor:pointer" data-title-id="${u.titleId}">
                        <div class="review-cover">
                          ${u.coverBase64?`<img src="${u.coverBase64}" alt="">`:'<div class="review-cover-placeholder">📖</div>'}
                        </div>
                        <div class="review-body">
                          <div style="font-size:0.75rem;color:var(--accent2);font-weight:700;margin-bottom:2px">#${h+1}</div>
                          <div class="review-title">${K(u.title)}</div>
                          <div style="display:flex;align-items:center;gap:6px;margin:4px 0">
                            ${ws(u.avgRating)}
                            <span style="font-size:0.75rem;color:var(--text-muted);font-weight:600">(${u.count})</span>
                          </div>
                          <div style="font-size:0.78rem;color:var(--text-muted)">Остання від ${K(u.username||"")}</div>
                        </div>
                      </div>`).join("")}
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: News Feed -->
        <div>
          <div class="section-title">📡 Стрічка новин</div>
          <div class="scrollable-feed">
            <div class="news-feed">
              ${s.length===0?'<div class="empty-state"><div class="empty-icon">📭</div><h3>Тут поки тихо</h3><p>Реєструйтесь та діліться рецензіями!</p></div>':s.map(CA).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>`,r.querySelectorAll("[data-review-id]").forEach(u=>{u.addEventListener("click",()=>De(`review/${u.dataset.reviewId}`))}),r.querySelectorAll("[data-title-id]").forEach(u=>{u.addEventListener("click",()=>De(`title/${u.dataset.titleId}`))});const i=document.getElementById("home-search"),o=document.getElementById("home-search-btn"),c=document.getElementById("search-results");function l(){const u=i.value.trim().toLowerCase();if(!u){c.style.display="none";return}const h={};t.forEach(m=>{if((m.title||"").toLowerCase().includes(u)){const b=m.titleId||`manual_${(m.title||"").toLowerCase().replace(/\s+/g,"_")}`;h[b]||(h[b]={...m,titleId:b,totalRating:0,count:0}),h[b].totalRating+=m.rating,h[b].count+=1}});const p=Object.values(h).map(m=>({...m,avgRating:m.totalRating/m.count}));if(p.length===0){c.style.display="block",c.innerHTML='<div class="empty-state" style="padding:20px"><h3>Нічого не знайдено</h3></div>';return}c.style.display="block",c.innerHTML=p.slice(0,12).map(m=>`
      <div class="review-card" style="margin-bottom:8px;cursor:pointer" data-title-id="${m.titleId}">
        <div class="review-cover" style="width:50px">
          ${m.coverBase64?`<img src="${m.coverBase64}" alt="">`:'<div class="review-cover-placeholder" style="font-size:14px">📖</div>'}
        </div>
        <div class="review-body">
          <div class="review-title">${K(m.title)}</div>
          <div style="display:flex;align-items:center;gap:6px;margin:4px 0">
            ${ws(m.avgRating)}
            <span style="font-size:0.75rem;color:var(--text-muted);font-weight:600">(${m.count})</span>
          </div>
        </div>
      </div>`).join(""),c.querySelectorAll("[data-title-id]").forEach(m=>{m.addEventListener("click",()=>De(`title/${m.dataset.titleId}`))})}o.addEventListener("click",l),i.addEventListener("keydown",u=>{u.key==="Enter"&&l()}),i.addEventListener("input",()=>{i.value.trim()||(c.style.display="none")})}function CA(r){const e=r.username?`<strong>${K(r.username)}</strong>`:"Хтось";let t="📢",n="";return r.type==="joined"?(t="🎉",n=`${e} приєднався до ManhwaDB`):r.type==="review"?(t="📝",n=`${e} залишив рецензію на <strong>${K(r.extra||"манхву")}</strong>`):r.type==="friend"?(t="🤝",n=`${e} та <strong>${K(r.friendName||"Хтось")}</strong> тепер друзі!`):(t="📢",n=`${e} щось зробив`),`<div class="news-item"><span class="news-icon">${t}</span><div><div class="news-text">${n}</div><div class="news-ts">${xr(r.createdAt)}</div></div></div>`}function kA(){const r=document.getElementById("page-root");r.innerHTML=`
    <div class="page-container" style="max-width:900px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px">
        <button class="btn btn-ghost btn-sm" id="back-btn">← Назад</button>
        <h1 class="section-title" style="margin:0;font-size:2.2rem">📜 Регламент та Кодекс Спільноти ManhwaDB</h1>
      </div>
      
      <div class="card card-padding" style="line-height:1.8;font-size:1.05rem">
        <p style="margin-bottom:20px;color:var(--text-muted);font-style:italic;text-align:center">
          "Повага до творчості та свободи самовираження — наріжний камінь нашої інтелектуальної екосистеми."
        </p>

        <div style="margin-bottom:32px">
          <h2 style="color:var(--accent);margin-bottom:12px;font-size:1.4rem">I. Принципи Лібертаріанства та Цензурна Політика</h2>
          <p>
            На просторах ManhwaDB ми сповідуємо доктрину безумовної свободи слова. Концептуально, <strong>коментарі, рецензії, а також візуальні артефакти (обкладинки) не підлягають превентивній цензурі</strong>. Ми виходимо з презумпції зрілості нашої аудиторії та поваги до автентичного авторського бачення. Ніяких обмежень на 18+ контент чи пікантні ілюстрації — ваша творча експресія є пріоритетом.
          </p>
        </div>

        <div style="margin-bottom:32px">
          <h2 style="color:var(--accent);margin-bottom:12px;font-size:1.4rem">II. Методологія Складання Рецензій</h2>
          <p>
            Задля оптимізації загальнодоступного пошуку та покращення юзабіліті, ми наполегливо апелюємо до конвенції використання <strong>англійських назв</strong> творів під час дескрипції. Інтегрований алгоритм автоматичного доповнення AniList & H-Chan забезпечує релевантність даних та естетичну цілісність вашої бібліотеки. Вибір твору з випадаючого списку є імперативом для коректної індексації.
          </p>
        </div>

        <div style="margin-bottom:32px">
          <h2 style="color:var(--accent);margin-bottom:12px;font-size:1.4rem">III. Прерогатива Приватності та Цифрова Гігієна</h2>
          <p>
            Адміністрація застерігає користувачів від нерозсудливого розголошення персональних ідентифікаторів чи конфіденційних відомостей у публічних дискурсах. Храніть свою цифрову ідентичність з належною пильністю. Поки ми перебуваємо у стадії експансії, прив'язка до електронної пошти є факультативною, проте може стати обов'язковою у разі ескалації спам-активності.
          </p>
        </div>

        <div style="margin-bottom:32px">
          <h2 style="color:var(--accent);margin-bottom:12px;font-size:1.4rem">IV. Тематична Спрямованість</h2>
          <p>
            ManhwaDB спеціалізується виключно на графічній новелістиці: Манхва, Манга, Маньхуа. Будь-які спроби перетворення платформи на універсальний агрегатор оцінок (кінематограф, література, музика) вважатимуться деструктивними. Єдиним винятком є <strong>Хентай-аніме</strong>, яке інтегроване в наш культурний контекст.
          </p>
        </div>

        <div style="margin-bottom:32px">
          <h2 style="color:var(--accent);margin-bottom:12px;font-size:1.4rem">V. Координація та Зворотний Зв'язок</h2>
          <p>
            У разі виникнення дефіциту розуміння функціоналу, деструктивних аномалій або за наявності конструктивних ініціатив — ласкаво просимо звертатися до офіційної кореспонденції за адресою: <br>
            <strong style="color:var(--accent2)">Trahalich.Boomer@gmail.com</strong>
          </p>
        </div>

        <div style="text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid var(--border)">
          <button class="btn btn-primary" onclick="history.back()">Усвідомлено та прийнято</button>
        </div>
      </div>
    </div>
  `,document.getElementById("back-btn").addEventListener("click",()=>history.back())}async function ac(r=null,e=null){var S;const t=Me.currentUser();if(!t){De("home");return}const n=document.getElementById("page-root"),s=new Date().toISOString().split("T")[0];let i=null;r&&(Nr(n),i=await ze.byId(r));let o=(i==null?void 0:i.coverBase64)||"",c=(i==null?void 0:i.rating)??5,l=(i==null?void 0:i.chapters)||"",u=(i==null?void 0:i.status)||"done",h=(i==null?void 0:i.titleId)||e||null;n.innerHTML=`
    <div class="page-container" style="max-width:720px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px">
        <button class="btn btn-ghost btn-sm" id="back-btn">← Назад</button>
        <h1 class="section-title" style="margin:0">${i?"✏️ Редагувати рецензію":"✍️ Нова рецензія"}</h1>
      </div>
      <div class="card card-padding">
        <!-- Cover -->
        <div class="form-group" style="margin-bottom:20px">
          <label class="form-label">Обкладинка манхви (необов'язково)</label>
          <div class="cover-upload-area" id="cover-upload-area">
            ${o?`<img src="${o}" id="cover-preview-img">`:""}
            <div class="upload-overlay">
              <span style="font-size:28px">🖼️</span>
              <span>${o?"Змінити обкладинку":"Натисніть або перетягніть"}</span>
            </div>
            ${o?"":'<span style="font-size:32px">🖼️</span><span>Натисніть або перетягніть файл</span>'}
          </div>
          <input type="file" id="cover-file" accept="image/*" style="display:none">
          <div id="cover-actions" style="margin-top:8px;display:${o?"flex":"none"};gap:8px">
            <button class="btn btn-danger btn-sm" id="remove-cover-btn">🗑 Видалити обкладинку</button>
          </div>
        </div>

        <!-- Title -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Назва манхви <span style="color:var(--accent)">*</span></label>
          <div style="position:relative">
            <input class="input" type="text" id="review-title" placeholder="Введіть назву (пошук в базі)..." value="${K((i==null?void 0:i.title)||"")}" autocomplete="off">
            <div id="autocomplete-results" style="display:none;position:absolute;top:100%;left:0;right:0;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);box-shadow:var(--shadow-float);z-index:100;max-height:300px;overflow-y:auto;margin-top:4px">
            </div>
          </div>
        </div>

        <!-- Chapters -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Кількість глав <span style="color:var(--accent)">*</span></label>
          <input class="input" type="number" id="review-chapters" placeholder="0" min="0" value="${l}">
        </div>

        <!-- Date -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Дата прочитання (необов'язково)</label>
          <input class="input" type="date" id="review-date" min="2000-01-01" max="${s}" value="${(i==null?void 0:i.date)||""}">
        </div>

        <!-- Tags -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Теги (через кому)</label>
          <input class="input" type="text" id="review-tags" placeholder="екшн, романтика, фентезі..." value="${((S=i==null?void 0:i.tags)==null?void 0:S.join(", "))||""}">
          <div class="preset-tags-wrap" id="preset-tags-wrap" style="margin-top:10px">
            <!-- 1. Special -->
            <button type="button" class="preset-tag preset-tag-fapped" data-tag="fapped">fapped 🍆💦</button>

            <!-- 2. Types -->
            <button type="button" class="preset-tag" data-tag="Манхва">Манхва</button>
            <button type="button" class="preset-tag" data-tag="Манга">Манга</button>

            <!-- 3. Genres -->
            <button type="button" class="preset-tag preset-tag-fire" style="background:rgba(255,105,180,0.1);color:#ff69b4;border-color:rgba(255,105,180,0.3)" data-tag="Романтика">Романтика 😍</button>
            <button type="button" class="preset-tag preset-tag-fire" style="background:rgba(100,149,237,0.1);color:#6495ed;border-color:rgba(100,149,237,0.3)" data-tag="Драма">Драма 🎭</button>
            <button type="button" class="preset-tag preset-tag-fire" style="background:rgba(255,165,0,0.1);color:#ffa500;border-color:rgba(255,165,0,0.3)" data-tag="Комедія">Комедія 😂</button>
            <button type="button" class="preset-tag preset-tag-fire" style="background:rgba(128,128,128,0.1);color:#808080;border-color:rgba(128,128,128,0.3)" data-tag="Кримінальний">Кримінальний 🔫</button>
            
            <button type="button" class="preset-tag" data-tag="Тройничок">Тройничок 👨‍👩‍👧</button>
            <button type="button" class="preset-tag" data-tag="Гарем">Гарем 👯‍♀️</button>
            <button type="button" class="preset-tag" data-tag="Таймскип">Таймскип ⏳</button>
            <button type="button" class="preset-tag" data-tag="Принуждение">Принуждение 😈</button>
            
            <button type="button" class="preset-tag" data-tag="рентген">Рентген 🩻</button>
            <button type="button" class="preset-tag" data-tag="ахегао">Ахегао 🤤</button>
            <button type="button" class="preset-tag" data-tag="🔥🔞сцены">🔥🔞 Сцени</button>
            <button type="button" class="preset-tag" data-tag="nrt">NTR 💔</button>
            <button type="button" class="preset-tag" data-tag="animated">Animated 🎬</button>
            <button type="button" class="preset-tag" data-tag="футфетиш">Футфетиш 👣</button>
            <button type="button" class="preset-tag" data-tag="бдсм">БДСМ ⛓️</button>

            <!-- 4. Community Stats -->
            <button type="button" class="preset-tag preset-tag-fire" data-tag="Сюжет +">Сюжет 😍</button>
            <button type="button" class="preset-tag preset-tag-fire" data-tag="Графіка +">Графіка ❤️</button>
            <button type="button" class="preset-tag preset-tag-fire" data-tag="Герої +">Герої 😍</button>
            <button type="button" class="preset-tag preset-tag-vomit" data-tag="Сюжет -">Сюжет 💩</button>
            <button type="button" class="preset-tag preset-tag-vomit" data-tag="Графіка -">Графіка 🤮</button>
            <button type="button" class="preset-tag preset-tag-vomit" data-tag="Герої -">Герої 👎</button>
          </div>
        </div>

        <!-- Status -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Статус <span style="color:var(--accent)">*</span></label>
          <select class="select" id="review-status">
            <option value="done" ${u==="done"?"selected":""}>✅ Прочитано</option>
            <option value="reading" ${u==="reading"?"selected":""}>📖 Читаю</option>
            <option value="planned" ${u==="planned"?"selected":""}>⏳ В планах (Прочитати потім)</option>
            <option value="dropped" ${u==="dropped"?"selected":""}>❌ Кинув</option>
          </select>
        </div>

        <!-- Rating -->
        <div class="form-group" style="margin-bottom:24px;text-align:center">
          <label class="form-label" style="display:block;margin-bottom:12px">Оцінка <span style="color:var(--accent)">*</span></label>
          <div style="display:flex;justify-content:center">
            <div id="interactive-stars-wrap" class="rating-stars-wrapper" style="cursor:pointer;user-select:none">
               <!-- Rendered dynamically -->
            </div>
          </div>
          <div id="rating-label" style="font-size:1.6rem;font-weight:900;color:var(--accent2);margin-top:12px;font-family:var(--font-display)">
            ${u==="dropped"?"Кинута":u==="planned"?"-":c+"/10"}
          </div>
        </div>

        <!-- Text -->
        <div class="form-group" style="margin-bottom:24px">
          <label class="form-label">Текст рецензії (необов'язково)</label>
          <textarea class="textarea" id="review-text" placeholder="Ваші враження про манхву..." style="min-height:160px">${K((i==null?void 0:i.text)||"")}</textarea>
        </div>

        <div id="review-form-error" class="form-error" style="display:none;margin-bottom:12px"></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" id="save-review-btn" style="flex:1;min-width:180px" data-label="${i?"Зберегти зміни":"Опублікувати рецензію"}">
            ${i?"💾 Зберегти зміни":"📝 Опублікувати рецензію"}
          </button>
          <button class="btn btn-secondary" id="cancel-review-btn">Скасувати</button>
        </div>
      </div>
    </div>`;const p=document.getElementById("review-date");p.addEventListener("blur",()=>{const I=p.value;if(!I)return;const v=I.split("-");let Y=parseInt(v[0],10);Y>0&&Y<100&&(Y+=2e3,p.value=`${Y}-${v[1]}-${v[2]}`)}),document.getElementById("back-btn").addEventListener("click",()=>history.back()),document.getElementById("cancel-review-btn").addEventListener("click",()=>history.back());const m=document.getElementById("cover-upload-area"),y=document.getElementById("cover-file"),b=document.getElementById("cover-actions");function R(){const I=m.querySelector("#cover-preview-img"),v=m.querySelectorAll("span:not(.upload-overlay span)");if(o){if(I)I.src=o;else{const Y=document.createElement("img");Y.id="cover-preview-img",Y.src=o;const ee=m.querySelector(".upload-overlay");m.insertBefore(Y,ee)}v.forEach(Y=>Y.remove()),b.style.display="flex"}else if(I&&I.remove(),b.style.display="none",!m.querySelector("span:not(.upload-overlay span)")){const Y=document.createElement("span");Y.style.fontSize="32px",Y.textContent="🖼️";const ee=document.createElement("span");ee.textContent="Натисніть або перетягніть файл",m.appendChild(Y),m.appendChild(ee)}}m.addEventListener("click",()=>y.click()),y.addEventListener("change",async()=>{const I=y.files[0];I&&(o=await jh(I,700,.65),R())}),document.getElementById("remove-cover-btn").addEventListener("click",I=>{I.stopPropagation(),o="",R()}),m.addEventListener("dragover",I=>{I.preventDefault(),m.style.borderColor="var(--accent)"}),m.addEventListener("dragleave",()=>{m.style.borderColor=""}),m.addEventListener("drop",async I=>{I.preventDefault(),m.style.borderColor="";const v=I.dataTransfer.files[0];v!=null&&v.type.startsWith("image/")&&(o=await jh(v,700,.65),R())});let A=[];try{A=await ze.byUser(t.id)}catch(I){console.warn("Could not fetch user reviews",I)}const k=document.getElementById("review-title"),D=document.getElementById("autocomplete-results");let N=null;k.addEventListener("input",()=>{const I=k.value.trim();if(I.length<2){D.style.display="none";return}clearTimeout(N),N=setTimeout(async()=>{var v,Y,ee,Ne,we;try{D.style.display="block",D.innerHTML='<div style="padding:12px;text-align:center;color:var(--text-muted)">Шукаємо в базі та мережі...</div>';const ae=j=>(j||"").toLowerCase().replace(/[^a-z0-9]/g,"").trim(),[bt,_t,Le]=await Promise.all([(async()=>{try{const{query:j,collection:Ce,orderBy:de,startAt:ft,endAt:Ye,limit:it,getDocs:Tt}=await Rn(async()=>{const{query:ot,collection:Dt,orderBy:Lr,startAt:er,endAt:tr,limit:Qi,getDocs:xa}=await Promise.resolve().then(()=>hA);return{query:ot,collection:Dt,orderBy:Lr,startAt:er,endAt:tr,limit:Qi,getDocs:xa}},void 0,import.meta.url),{db:St}=await Rn(async()=>{const{db:ot}=await Promise.resolve().then(()=>gA);return{db:ot}},void 0,import.meta.url),At=j(Ce(St,"manga_metadata"),de("title"),ft(I),Ye(I+""),it(15));return(await Tt(At)).docs.map(ot=>({id:ot.id,...ot.data()}))}catch{return[]}})(),fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:"query ($search: String) { Page(page: 1, perPage: 8) { media(search: $search, type: MANGA) { id title { romaji english } coverImage { extraLarge } chapters } } }",variables:{search:I}})}).then(j=>j.json()).catch(()=>({data:{Page:{media:[]}}})),RA(I).catch(()=>[])]),fe=new Set,ce=[];if(A.forEach(j=>{if(j.title.toLowerCase().includes(I.toLowerCase())){const Ce=ae(j.title);if(fe.has(Ce))return;fe.add(Ce);const de=j.coverBase64||"";ce.push(`
               <div class="ac-item" style="display:flex;align-items:center;gap:12px;padding:8px;cursor:pointer;border-bottom:1px solid var(--border);background:var(--bg-card);border-left:4px solid var(--accent)" 
                    data-title="${K(j.title)}" data-cover="${de}" data-chapters="${j.chapters||0}" data-tid="${j.titleId}" data-editid="${j.id}">
                 ${de?`<img src="${de}" style="width:32px;height:45px;object-fit:cover;border-radius:4px">`:'<div style="width:32px;height:45px;background:var(--bg-hover);border-radius:4px"></div>'}
                 <div style="flex:1">
                   <div style="font-weight:600;font-size:0.9rem;color:var(--accent)">${K(j.title)}</div>
                   <div style="font-size:0.75rem;font-weight:600;color:var(--accent)">✏️ Ви вже писали (Натисніть щоб редагувати)</div>
                 </div>
               </div>`)}}),(bt||[]).forEach(j=>{var it,Tt,St,At,zt,ot,Dt;const Ce=j.title||((it=j.anilist)==null?void 0:it.title)||((Tt=j.toongod)==null?void 0:Tt.title)||"Unknown",de=ae(Ce);if(fe.has(de))return;fe.add(de);const ft=((At=(St=j.anilist)==null?void 0:St.coverImage)==null?void 0:At.large)||((zt=j.toongod)==null?void 0:zt.cover)||"",Ye=((ot=j.anilist)==null?void 0:ot.chapters)||((Dt=j.toongod)==null?void 0:Dt.chapters)||j.chapters||0;ce.push(`
            <div class="ac-item db-match" style="display:flex;align-items:center;gap:12px;padding:8px;cursor:pointer;border-bottom:1px solid var(--border);background:rgba(var(--accent-rgb), 0.05)" 
                 data-title="${K(Ce)}" data-cover="${ft}" data-chapters="${Ye}" data-tid="${j.id}">
              ${ft?`<img src="${ft}" style="width:32px;height:45px;object-fit:cover;border-radius:4px">`:'<div style="width:32px;height:45px;background:var(--bg-hover);border-radius:4px"></div>'}
              <div style="flex:1">
                <div style="font-weight:600;font-size:0.9rem">${K(Ce)}</div>
                <div style="font-size:0.7rem;color:var(--accent2)">У базі ManhwaDB ${Ye?`• ${Ye} глав`:""}</div>
              </div>
            </div>`)}),(((Y=(v=_t.data)==null?void 0:v.Page)==null?void 0:Y.media)||[]).forEach(j=>{var it;const Ce=j.title.english||j.title.romaji,de=ae(Ce);if(fe.has(de))return;fe.add(de);const ft=((it=j.coverImage)==null?void 0:it.extraLarge)||"",Ye=`ani_${j.id}`;ce.push(`
            <div class="ac-item" style="display:flex;align-items:center;gap:12px;padding:8px;cursor:pointer;border-bottom:1px solid var(--border);transition:0.1s" 
                 data-title="${K(Ce)}" data-cover="${ft}" data-chapters="${j.chapters||0}" data-tid="${Ye}">
              ${ft?`<img src="${ft}" style="width:32px;height:45px;object-fit:cover;border-radius:4px">`:'<div style="width:32px;height:45px;background:var(--bg-hover);border-radius:4px"></div>'}
              <div style="flex:1">
                <div style="font-weight:500;font-size:0.9rem">${K(Ce)}</div>
                <div style="font-size:0.7rem;color:var(--accent2)">AniList ${j.chapters?`• ${j.chapters} глав`:""}</div>
              </div>
            </div>`)}),_t.errors||ce.length<5)try{const j=["safe","suggestive","erotica","pornographic"].map(de=>`contentRating[]=${de}`).join("&");((await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(I)}&limit=10&includes[]=cover_art&${j}`).then(de=>de.json())).data||[]).forEach(de=>{var Lr,er;const ft=de.attributes.title,Ye=ft.en||Object.values(ft)[0],it=ae(Ye);if(fe.has(it))return;fe.add(it);const Tt=de.relationships.find(tr=>tr.type==="cover_art"),St=(Lr=Tt==null?void 0:Tt.attributes)==null?void 0:Lr.fileName,At=St?`https://uploads.mangadex.org/covers/${de.id}/${St}.256.jpg`:"",zt=(er=de.attributes.links)!=null&&er.al?`ani_${de.attributes.links.al}`:`mdex_${de.id}`,ot=de.attributes.contentRating==="pornographic"||de.attributes.contentRating==="erotica",Dt=de.attributes.lastChapter||0;ce.push(`
                 <div class="ac-item" style="display:flex;align-items:center;gap:12px;padding:8px;cursor:pointer;border-bottom:1px solid var(--border);transition:0.1s" 
                      data-title="${K(Ye)}" data-cover="${At}" data-chapters="${Dt}" data-tid="${zt}">
                   ${At?`<img src="${At}" style="width:32px;height:45px;object-fit:cover;border-radius:4px">`:'<div style="width:32px;height:45px;background:var(--bg-hover);border-radius:4px"></div>'}
                   <div style="flex:1">
                     <div style="font-weight:500;font-size:0.9rem">${K(Ye)} ${ot?"🔞":""}</div>
                     <div style="font-size:0.7rem;color:var(--accent3)">MangaDex ${ot?"(18+)":""} ${Dt?`• ${Dt} глав`:""}</div>
                   </div>
                 </div>`)})}catch{}(Le||[]).forEach(j=>{const Ce=ae(j.title);if(fe.has(Ce))return;fe.add(Ce);const de=`hchan_${btoa(j.url).substring(0,16)}`;ce.push(`
            <div class="ac-item" style="display:flex;align-items:center;gap:12px;padding:8px;cursor:pointer;border-bottom:1px solid var(--border);transition:0.1s" 
                 data-title="${K(j.title)}" data-url="${j.url}" data-tid="${de}">
              <div style="width:32px;height:45px;background:var(--accent-soft);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:20px">🔞</div>
              <div style="flex:1">
                <div style="font-weight:500;font-size:0.9rem">${K(j.title)}</div>
                <div style="font-size:0.7rem;color:#ff69b4">H-Chan 18+</div>
              </div>
            </div>`)});let Vt="";_t.errors&&(((ee=_t.errors[0])==null?void 0:ee.status)===403||(we=(Ne=_t.errors[0])==null?void 0:Ne.message)!=null&&we.includes("disabled"))&&(Vt='<div style="padding:6px 12px; font-size:0.7rem; background:rgba(255,0,0,0.05); color:#e63946; border-bottom:1px solid var(--border)">⚠️ AniList API лежить. Шукаємо в MangaDex та базі.</div>'),ce.length===0?D.innerHTML='<div style="padding:12px;text-align:center;color:var(--text-muted)">Нічого не знайдено</div>':D.innerHTML=Vt+ce.join(""),D.querySelectorAll(".ac-item").forEach(j=>{j.addEventListener("mouseenter",()=>j.style.background="var(--bg-hover)"),j.addEventListener("mouseleave",()=>{j.classList.contains("db-match")?j.style.background="rgba(var(--accent-rgb), 0.05)":j.dataset.editid?j.style.background="var(--bg-card)":j.style.background=""}),j.addEventListener("click",()=>{if(j.dataset.url&&!j.dataset.tid){window.open(j.dataset.url,"_blank");return}if(j.dataset.editid&&!i){De(`review-edit/${j.dataset.editid}`),le("Редирект на редагування вашої рецензії...","info");return}k.value=j.dataset.title,h=j.dataset.tid,document.getElementById("review-chapters").value=j.dataset.chapters,j.dataset.cover&&(o=j.dataset.cover,R()),le("Дані завантажено!","info"),D.style.display="none"})})}catch(ae){console.error(ae),D.innerHTML='<div style="padding:12px;text-align:center;color:var(--accent)">Помилка пошуку</div>'}},150)}),document.addEventListener("click",I=>{!k.contains(I.target)&&!D.contains(I.target)&&(D.style.display="none")}),e&&!i&&(async()=>{try{const{Reviews:I}=await Rn(async()=>{const{Reviews:Y}=await Promise.resolve().then(()=>_A);return{Reviews:Y}},void 0,import.meta.url),v=await I.byTitle(e);if(v.length>0){const Y=v[0];k.value=Y.title,k.readOnly=!0,k.style.background="var(--bg-hover)",h=e,document.getElementById("review-chapters").value=Y.chapters||0,Y.coverBase64&&(o=Y.coverBase64,R());const ee=document.createElement("button");ee.className="btn btn-ghost btn-xs",ee.textContent="🔄 Змінити тайтл",ee.style.marginTop="4px",ee.style.display="block",ee.onclick=()=>{k.readOnly=!1,k.value="",k.style.background="",h=null,ee.remove()},k.parentNode.appendChild(ee)}}catch(I){console.error("Error pre-filling title:",I)}})();const z=document.getElementById("review-status"),M=document.getElementById("interactive-stars-wrap"),U=document.getElementById("rating-label");function E(I=null){const v=u==="dropped",Y=u==="planned";if(v||Y){M.innerHTML='<span style="color:var(--text-muted);font-size:1rem;padding:8px">'+(Y?"Ще не оцінено":"Оцінка недоступна")+"</span>",M.style.pointerEvents="none";return}M.style.pointerEvents="auto",M.innerHTML="";const ee=I!==null?I:c,Ne="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";for(let we=1;we<=10;we++){const ae=document.createElement("span");ae.className="star star-lg";const bt=ee>=we,_t=!bt&&ee>=we-.5;bt?ae.classList.add("full"):_t&&ae.classList.add("half"),ae.innerHTML=`
        <svg viewBox="0 0 24 24"><path d="${Ne}"/></svg>
        ${_t?`<span class="star-half-fill"><svg viewBox="0 0 24 24"><path d="${Ne}"/></svg></span>`:""}
      `,ae.addEventListener("pointermove",Le=>{const fe=ae.getBoundingClientRect(),He=Le.clientX-fe.left<fe.width/2?we-.5:we;E(He)}),ae.addEventListener("pointerdown",Le=>{const fe=ae.getBoundingClientRect();c=Le.clientX-fe.left<fe.width/2?we-.5:we,c<1&&(c=1),E(),U.textContent=c+"/10"}),M.appendChild(ae)}}M.addEventListener("mouseleave",()=>{u!=="dropped"&&u!=="planned"&&E()}),z.addEventListener("change",()=>{u=z.value;const I=u==="dropped";u==="planned"?U.textContent="-":U.textContent=I?"Кинута":c+"/10",E()}),E();const _=document.getElementById("review-tags"),w=document.getElementById("preset-tags-wrap");if(_&&w){let I=function(ee){return(ee||"").split(",").map(Ne=>Ne.trim()).filter(Boolean)},v=function(){const ee=new Set(I(_.value).map(Ne=>Ne.toLowerCase()));w.querySelectorAll(".preset-tag[data-tag]").forEach(Ne=>{const we=(Ne.dataset.tag||"").trim(),ae=ee.has(we.toLowerCase());Ne.classList.toggle("active",ae)})},Y=function(ee){const Ne=(ee||"").trim();if(!Ne)return;const we=I(_.value);we.some(bt=>bt.toLowerCase()===Ne.toLowerCase())||(we.push(Ne),_.value=we.join(", "),v())};w.querySelectorAll(".preset-tag[data-tag]").forEach(ee=>{ee.addEventListener("click",()=>Y(ee.dataset.tag))}),v(),_.addEventListener("input",v)}const T=document.getElementById("save-review-btn");T.addEventListener("click",async()=>{const I=document.getElementById("review-title").value.trim(),v=document.getElementById("review-chapters").value,Y=parseInt(v,10),ee=document.getElementById("review-date").value,Ne=document.getElementById("review-tags").value,we=document.getElementById("review-text").value.trim(),ae=z.value,bt=ae==="dropped"||ae==="planned"?0:c,_t=Ne.split(",").map(He=>He.trim()).filter(Boolean),Le=document.getElementById("review-form-error");if(!I){Le.textContent="Назва обов'язкова",Le.style.display="block";return}if(!v||isNaN(Y)||Y<=0){Le.textContent="Кількість глав обов'язкова (більше 0)",Le.style.display="block";return}if(ee){const He=new Date(ee),Vt=new Date,j=He.getFullYear();if(He>Vt){Le.textContent="Дата прочитання не може бути в майбутньому",Le.style.display="block";return}if(j>2100||j<2e3){Le.textContent="Будь ласка, вкажіть коректний рік (2000-2100)",Le.style.display="block";return}}T.disabled=!0,T.textContent="Збереження...";const fe=h||`manual_${I.toLowerCase().replace(/\s+/g,"_")}`;if(!i&&await ze.exists(t.id,fe)){Le.textContent="Ви вже залишили рецензію на цей тайтл!",Le.style.display="block",T.disabled=!1,T.textContent=T.dataset.label;return}const ce={title:I,titleId:fe,coverBase64:o,text:we,rating:bt,chapters:Y,status:ae,tags:_t,date:ee};try{let He;i?(He=await ze.update(r,ce),le("Рецензію оновлено ✅","success")):(He=await ze.create(t.id,ce),await jn.add("review",t.id,He.id,{username:t.username,extra:I}),le("Рецензію опубліковано! 📝","success")),De(`review/${He.id}`)}catch(He){Le.textContent="Помилка: "+He.message,Le.style.display="block",T.disabled=!1,T.textContent=T.dataset.label}})}async function _n(){const r=Me.currentUser();if(!r){De("home");return}const e=document.getElementById("page-root");Nr(e);const[t,n,s]=await Promise.all([ut.ofUser(r.id),ut.pendingFor(r.id),ut.sentBy(r.id)]),i=async y=>{const b=y.requesterId===r.id?y.receiverId:y.requesterId,R=await pe.byId(b);return{...y,otherUser:R,otherId:b}},[o,c,l]=await Promise.all([Promise.all(t.map(i)),Promise.all(n.map(async y=>{const b=await pe.byId(y.requesterId),R=await ut.getDeclineCount(y.requesterId,r.id);return{...y,otherUser:b,declineCount:R}})),Promise.all(s.map(async y=>{const b=await pe.byId(y.receiverId);return{...y,otherUser:b}}))]);e.innerHTML=`
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
      ${c.length?`
        <div style="margin-bottom:24px">
          <div class="section-title" style="font-size:1rem;margin-bottom:12px">📩 Вхідні запити (${c.length})</div>
          <div style="display:flex;flex-direction:column;gap:8px" id="pending-list">
            ${c.map(y=>{var b;return`
              <div class="friend-item">
                <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:0">
                  ${xt(y.otherUser,"sm")}
                  <div class="friend-info" style="min-width:0">
                    <div class="friend-name" data-profile="${y.requesterId}" style="cursor:pointer; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${K(((b=y.otherUser)==null?void 0:b.username)||"Невідомий")}</div>
                  </div>
                </div>
                <div class="friend-actions" style="display:flex; gap:8px; align-items:center; flex-wrap:wrap">
                  <button class="btn btn-primary btn-sm" data-accept="${y.requesterId}">✅ Прийняти</button>
                  <button class="btn btn-danger btn-sm" data-decline="${y.requesterId}">❌</button>
                  ${y.declineCount>=2?`<button class="btn btn-sm" data-block="${y.requesterId}" style="background:#5a1a1a;border:1px solid #e63946;color:#ff6b6b">🔒 Блок</button>`:""}
                </div>
              </div>`}).join("")}
          </div>
        </div>`:""}

      <!-- Sent requests -->
      ${l.length?`
        <div style="margin-bottom:24px">
          <div class="section-title" style="font-size:1rem;margin-bottom:12px">📤 Надіслані запити (${l.length})</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${l.map(y=>{var b;return`
              <div class="friend-item">
                <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:0">
                  ${xt(y.otherUser,"sm")}
                  <div class="friend-info" style="min-width:0">
                    <div class="friend-name" data-profile="${y.receiverId}" style="cursor:pointer; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${K(((b=y.otherUser)==null?void 0:b.username)||"Невідомий")}</div>
                  </div>
                </div>
                <div class="friend-actions" style="display:flex; gap:8px; align-items:center; flex-wrap:wrap">
                  <span class="friend-status friend-pending">Очікує</span>
                  <button class="btn btn-ghost btn-xs" data-cancel="${y.receiverId}">✕</button>
                </div>
              </div>`}).join("")}
          </div>
        </div>`:""}

      <!-- Friends list -->
      <div class="section-title" style="font-size:1rem;margin-bottom:12px">✅ Друзі (${o.length})</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${o.length===0?'<div class="empty-state"><div class="empty-icon">🤝</div><h3>У вас ще немає друзів</h3><p>Знайдіть їх за логіном вище!</p></div>':o.map(y=>{var b;return`
              <div class="friend-item">
                <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:0">
                  ${xt(y.otherUser,"md")}
                  <div class="friend-info" style="min-width:0">
                    <div class="friend-name" data-profile="${y.otherId}" style="cursor:pointer; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${K(((b=y.otherUser)==null?void 0:b.username)||"Невідомий")}</div>
                  </div>
                </div>
                <div class="friend-actions" style="display:flex; gap:6px; align-items:center; flex-wrap:wrap">
                  <span class="friend-status friend-accepted">Друг</span>
                  <button class="btn btn-secondary btn-xs" data-view-profile="${y.otherId}">Профіль</button>
                  <button class="btn btn-danger btn-xs" data-remove="${y.otherId}">Видалити</button>
                </div>
              </div>`}).join("")}
      </div>
    </div>`;const u=document.getElementById("friend-search-btn"),h=document.getElementById("friend-search-input"),p=document.getElementById("friend-search-result"),m=async()=>{var D,N;const y=h.value.trim();if(!y)return;u.disabled=!0,u.textContent="...";const b=await pe.byUsername(y);if(u.disabled=!1,u.textContent="Знайти",!b||b.id===r.id){p.innerHTML='<div style="color:var(--text-muted);font-size:0.875rem">Користувача не знайдено</div>';return}const R=await ut.between(r.id,b.id),A=pe.isBlocked(b.id);let k="";A?k=`<button class="btn btn-sm" id="unblock-btn" data-uid="${b.id}" style="background:#5a1a1a;border:1px solid #e63946;color:#ff6b6b">🔓 Розблокувати</button>`:R?R.status==="pending"?k='<span class="friend-status friend-pending">Запит надіслано</span>':k='<span class="friend-status friend-accepted">Вже друзі ✅</span>':k=`<button class="btn btn-primary btn-sm" id="add-friend-btn" data-uid="${b.id}">➕ Надіслати запит</button>`,p.innerHTML=`<div class="friend-item">
      <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:0">
        ${xt(b,"sm")}
        <div class="friend-info" style="min-width:0"><div class="friend-name" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${K(b.username)}</div></div>
      </div>
      <div class="friend-actions" style="display:flex; gap:8px; align-items:center; flex-wrap:wrap">
        ${k}
      </div>
    </div>`,(D=document.getElementById("add-friend-btn"))==null||D.addEventListener("click",async()=>{if(await ut.send(r.id,b.id)==="blocked"){le("Цей користувач вас заблокував","warning");return}le(`Запит надіслано ${b.username}`,"success"),await _n()}),(N=document.getElementById("unblock-btn"))==null||N.addEventListener("click",async()=>{await pe.unblock(r.id,b.id),le(`${b.username} розблоковано`,"success"),await _n()})};u.addEventListener("click",m),h.addEventListener("keydown",y=>{y.key==="Enter"&&m()}),e.querySelectorAll("[data-accept]").forEach(y=>{y.addEventListener("click",async()=>{const b=y.dataset.accept;await ut.accept(b,r.id);const R=await pe.byId(b);await jn.add("friend",r.id,b,{username:r.username,friendName:(R==null?void 0:R.username)||"Unknown"}).catch(console.error),le("Запит прийнято ✅","success"),await _n()})}),e.querySelectorAll("[data-decline]").forEach(y=>{y.addEventListener("click",async()=>{const b=y.dataset.decline;await ut.decline(b,r.id)>=2?le("Запит відхилено. Ви можете заблокувати цього користувача.","warning"):le("Запит відхилено","info"),await _n()})}),e.querySelectorAll("[data-block]").forEach(y=>{y.addEventListener("click",async()=>{const b=y.dataset.block;window.confirm("Заблокувати цього користувача? Він не зможе надсилати вам запити, коментувати та ставити лайки.")&&(await pe.block(r.id,b),le("Користувача заблоковано 🔒","warning"),await _n())})}),e.querySelectorAll("[data-cancel]").forEach(y=>{y.addEventListener("click",async()=>{await ut.remove(r.id,y.dataset.cancel),await _n()})}),e.querySelectorAll("[data-remove]").forEach(y=>{y.addEventListener("click",async()=>{window.confirm("Видалити зі списку друзів?")&&(await ut.remove(r.id,y.dataset.remove),le("Видалено зі списку друзів","info"),await _n())})}),e.querySelectorAll("[data-profile], [data-view-profile]").forEach(y=>{y.addEventListener("click",()=>De(`profile/${y.dataset.profile||y.dataset.viewProfile}`))})}async function VA(){const r=Me.currentUser();if(!r){De("home");return}await zn(r.id,!0)}async function zn(r,e=!1){var l,u,h,p;const t=document.getElementById("page-root");Nr(t);const[n,s,i]=await Promise.all([pe.byId(r),ze.byUser(r),Pa.byUser(r)]);if(!n){t.innerHTML='<div class="page-container"><div class="empty-state"><div class="empty-icon">😕</div><h3>Користувача не знайдено</h3></div></div>';return}const o=n.top4||[null,null,null,null],c=await Promise.all(o.map(m=>m?ze.byId(m):Promise.resolve(null)));if(t.innerHTML=`
    <div class="page-container">
      <!-- Profile Header -->
      <div class="profile-header">
        <div id="avatar-wrap" style="cursor:${e?"pointer":"default"};position:relative">
          ${xt(n,"xl")}
          ${e?'<div style="position:absolute;bottom:4px;right:4px;background:var(--accent);border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px">📷</div>':""}
        </div>
        ${e?'<input type="file" id="avatar-file" accept="image/*" style="display:none">':""}
        <div class="profile-info">
          <div class="profile-name">${K(n.username)}</div>
          ${n.bio?`<div class="profile-bio">${K(n.bio)}</div>`:e?'<div class="profile-bio" style="color:var(--text-muted);font-style:italic">Додайте опис в налаштуваннях</div>':""}
          <div class="profile-stats">
            <div class="profile-stat"><div class="stat-value">${s.length}</div><div class="stat-label">Рецензій</div></div>
            <div class="profile-stat"><div class="stat-value">${s.filter(m=>m.status==="done").length}</div><div class="stat-label">Прочитано</div></div>
            <div class="profile-stat"><div class="stat-value">${s.filter(m=>m.status==="reading").length}</div><div class="stat-label">Читаю</div></div>
            <div class="profile-stat"><div class="stat-value">${s.filter(m=>m.status==="planned").length}</div><div class="stat-label">В планах</div></div>
            <div class="profile-stat"><div class="stat-value">${s.filter(m=>m.status==="dropped").length}</div><div class="stat-label">Кинуто</div></div>
          </div>
          ${e?'<div style="margin-top:16px"><button class="btn btn-secondary btn-sm" id="edit-account-btn">⚙️ Налаштування</button></div>':""}
          <div id="friend-btn-area"></div>
        </div>
      </div>

      <!-- Top 4 -->
      <div style="margin-bottom:32px">
        <div class="section-title">⭐ Топ 4 манхви</div>
        <div class="top4-grid">
          ${c.map((m,y)=>`
            <div class="top4-slot-wrap">
              <div class="top4-slot${e?"":" no-hover"}" data-slot="${y}">
                ${m!=null&&m.coverBase64?`<img src="${m.coverBase64}" alt="${K((m==null?void 0:m.title)||"")}">`:e?"+":"?"}
                ${m&&e?`<button class="top4-slot-remove" data-remove-slot="${y}">✕</button>`:""}
              </div>
              ${m?`<a href="#review/${m.id}" class="top4-slot-title">${K(m.title)}</a>`:""}
            </div>`).join("")}
        </div>
        ${e?'<p style="color:var(--text-muted);font-size:0.78rem;margin-top:8px">Натисніть на слот, щоб обрати манхву</p>':""}
      </div>

      <!-- Recent Reviews -->
      <div style="margin-bottom:32px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <div class="section-title" style="margin:0">📚 Останні рецензії</div>
        </div>
        ${s.length===0?`<div class="empty-state"><div class="empty-icon">📖</div><h3>Ще немає рецензій</h3>${e?'<p><button class="btn btn-primary btn-sm" id="add-first-review">✍️ Написати першу</button></p>':""}</div>`:`<div class="manhwa-grid recent-grid">
              ${s.slice(0,10).map(m=>`
                <div class="manhwa-thumb-wrap" style="display:flex;flex-direction:column;align-items:center;cursor:pointer" data-review-id="${m.id}" title="${K(m.title)}">
                  <div class="manhwa-thumb">
                    ${m.coverBase64?`<img src="${m.coverBase64}" alt="${K(m.title)}">`:'<div class="manhwa-thumb-placeholder">📖</div>'}
                  </div>
                  <div style="font-size:0.75rem;font-weight:600;margin-top:6px;text-align:center;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;width:100%">${K(m.title)}</div>
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
              ${i.map(m=>`
                <div class="playlist-card" data-playlist-id="${m.id}" style="background:var(--bg-surface);padding:16px;border-radius:var(--radius-md);border:1px solid var(--border);cursor:pointer;text-align:center;display:flex;flex-direction:column;justify-content:center;min-height:120px;transition:0.2s">
                  <div style="font-size:2rem;margin-bottom:8px">📑</div>
                  <div style="font-weight:600;font-size:0.9rem;line-height:1.2;margin-bottom:4px">${K(m.name)}</div>
                  <div style="font-size:0.75rem;color:var(--text-muted)">${m.reviewIds.length} манхв</div>
                </div>`).join("")}
             </div>`}
      </div>
    </div>
    <div id="edit-modal-placeholder"></div>
    <div id="top4-modal-placeholder"></div>
    <div id="playlist-modal-placeholder"></div>`,t.querySelectorAll("[data-review-id]").forEach(m=>{m.addEventListener("click",()=>De(`review/${m.dataset.reviewId}`))}),(l=document.getElementById("library-btn"))==null||l.addEventListener("click",()=>De(`all-reviews/${r}`)),(u=document.getElementById("add-first-review"))==null||u.addEventListener("click",()=>De("new-review")),t.querySelectorAll("[data-playlist-id]").forEach(m=>{m.addEventListener("click",()=>{const y=i.find(b=>b.id===m.dataset.playlistId);y&&NA(y,s,r,e)})}),e){const m=document.getElementById("avatar-wrap"),y=document.getElementById("avatar-file");m==null||m.addEventListener("click",()=>y.click()),y==null||y.addEventListener("change",async()=>{const b=y.files[0];b&&FA(b,async R=>{const A=Me.currentUser();await pe.save({...A,avatarBase64:R}),le("Аватар оновлено ✅","success"),await zn(r,e)})}),(h=document.getElementById("edit-account-btn"))==null||h.addEventListener("click",()=>LA(n)),t.querySelectorAll("[data-slot]").forEach(b=>{b.addEventListener("click",R=>{R.target.dataset.removeSlot===void 0&&MA(r,parseInt(b.dataset.slot),s)})}),t.querySelectorAll("[data-remove-slot]").forEach(b=>{b.addEventListener("click",async R=>{R.stopPropagation();const A=parseInt(b.dataset.removeSlot),k=await pe.byId(r),D=[...k.top4||[null,null,null,null]];D[A]=null,await pe.save({...k,top4:D}),await zn(r,e)})}),(p=document.getElementById("create-playlist-btn"))==null||p.addEventListener("click",()=>DA(r,s))}}function DA(r,e){const t=document.getElementById("playlist-modal-placeholder");t.innerHTML=`
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
                      <div style="flex:1;font-weight:500;font-size:0.9rem">${K(i.title)}</div>
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
    </div>`;const n=()=>{t.innerHTML=""};document.getElementById("pc-close").addEventListener("click",n),document.getElementById("pc-close2").addEventListener("click",n);const s=document.getElementById("pc-save-btn");s.addEventListener("click",async()=>{const i=document.getElementById("pc-name").value.trim();if(!i){const c=document.getElementById("pc-error");c.textContent="Назва обов'язкова",c.style.display="block";return}const o=Array.from(document.querySelectorAll(".pc-review-cb:checked")).map(c=>c.value);s.disabled=!0,s.textContent="...",await Pa.create(r,i,o),le("Плейліст створено!","success"),n(),await zn(r,!0)})}function NA(r,e,t,n){const s=document.getElementById("playlist-modal-placeholder"),i=r.reviewIds.map(c=>e.find(l=>l.id===c)).filter(Boolean);s.innerHTML=`
    <div class="modal-backdrop" id="playlist-view-modal">
      <div class="modal-box modal-box-lg">
        <div class="modal-header">
          <span class="modal-title">📑 ${K(r.name)}</span>
          <button class="modal-close" id="pv-close">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-body-scroll" style="max-height:450px;overflow-y:auto;padding-right:8px">
            ${i.length===0?'<div class="empty-state"><h3>Плейліст порожній</h3></div>':i.map(c=>`
                <div class="review-card" style="margin-bottom:10px;cursor:pointer" data-pv-review="${c.id}">
                  <div class="review-cover" style="width:60px">
                    ${c.coverBase64?`<img src="${c.coverBase64}" alt="">`:'<div class="review-cover-placeholder">📖</div>'}
                  </div>
                  <div class="review-body">
                    <div class="review-title">${K(c.title)}</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px">📚 ${c.chapters||0} глав | Оцінка: ${c.status==="planned"?"-":c.status==="dropped"?"Кинуто":c.rating}</div>
                  </div>
                </div>
              `).join("")}
          </div>
          ${n?`
            <div style="margin-top:20px;border-top:1px solid var(--border);padding-top:16px">
              <button class="btn btn-danger btn-sm" id="pv-del-btn">🗑 Видалити плейліст</button>
            </div>
          `:""}
        </div>
      </div>
    </div>`;const o=()=>{s.innerHTML=""};document.getElementById("pv-close").addEventListener("click",o),s.querySelectorAll("[data-pv-review]").forEach(c=>{c.addEventListener("click",()=>{o(),De(`review/${c.dataset.pvReview}`)})}),n&&document.getElementById("pv-del-btn").addEventListener("click",async()=>{window.confirm("Дійсно видалити цей плейліст?")&&(document.getElementById("pv-del-btn").disabled=!0,await Pa.delete(r.id),le("Плейліст видалено","info"),o(),await zn(t,n))})}function LA(r){const e=document.getElementById("edit-modal-placeholder");e.innerHTML=`
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
            <textarea class="textarea" id="edit-bio" style="min-height:80px">${K(r.bio||"")}</textarea>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Email</label>
            <input class="input" type="email" id="edit-email" value="${K(r.email||"")}">
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
    </div>`;const t=()=>e.innerHTML="";document.getElementById("edit-modal-close").addEventListener("click",t),document.getElementById("edit-modal-close2").addEventListener("click",t),document.getElementById("edit-modal").addEventListener("click",i=>{i.target.id==="edit-modal"&&t()});const n=document.getElementById("save-edit-btn"),s=()=>{n.disabled=!1,n.classList.remove("btn-secondary"),n.classList.add("btn-active-green")};e.querySelectorAll("#edit-old-password, #edit-new-password, #edit-bio").forEach(i=>i.addEventListener("input",s)),e.querySelectorAll("#edit-theme, #edit-push").forEach(i=>i.addEventListener("change",s)),n.addEventListener("click",async()=>{const i=document.getElementById("edit-bio").value.trim(),o=document.getElementById("edit-email").value.trim(),c=document.getElementById("edit-old-password").value,l=document.getElementById("edit-new-password").value,u=document.getElementById("edit-theme").value,h=document.getElementById("edit-push").checked,p=document.getElementById("edit-error"),m=document.getElementById("save-edit-btn");if(m.disabled=!0,m.textContent="Збереження...",localStorage.setItem("theme",u),document.documentElement.setAttribute("data-theme",u),localStorage.setItem("push_enabled",h),c||l){const y=await AA(r.id,c,l);if(y.error){p.textContent=y.error,p.style.display="block",m.disabled=!1,m.textContent="💾 Зберегти";return}}await pe.save({...await pe.byId(r.id),bio:i,email:o}),t(),le("Акаунт оновлено ✅","success"),await zn(r.id,!0)}),document.getElementById("delete-account-btn").addEventListener("click",()=>{OA(r)})}function OA(r){const e=document.getElementById("edit-modal-placeholder");e.innerHTML=`
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
    </div>`;const t=()=>e.innerHTML="";document.getElementById("del-modal-close").addEventListener("click",t),document.getElementById("del-modal-close2").addEventListener("click",t),document.getElementById("confirm-delete-btn").addEventListener("click",async()=>{const n=document.getElementById("delete-confirm-password").value,s=document.getElementById("del-error"),i=document.getElementById("confirm-delete-btn");i.disabled=!0,i.textContent="Видалення...";try{const o=await ze.byUser(r.id);for(const l of o)await ze.delete(l.id);await pe.delete(r.id),await Xt(ie(W,"usernames",r.username.toLowerCase()));const c=await SA(n);if(c.error){s.textContent=c.error,s.style.display="block",i.disabled=!1,i.textContent="🗑️ Так, видалити акаунт";return}le("Акаунт видалено. До побачення!","info"),setTimeout(()=>{window.location.hash="home",window.location.reload()},800)}catch(o){s.textContent=o.message,s.style.display="block",i.disabled=!1,i.textContent="🗑️ Так, видалити акаунт"}})}function MA(r,e,t){const n=document.getElementById("top4-modal-placeholder");n.innerHTML=`
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
                <div class="manhwa-thumb-wrap" data-pick-review="${i.id}" title="${K(i.title)}" style="cursor:pointer">
                  <div class="manhwa-thumb">
                    ${i.coverBase64?`<img src="${i.coverBase64}" alt="">`:`<div class="manhwa-thumb-placeholder" style="font-size:11px;padding:4px;text-align:center;word-break:break-word">${K(i.title)}</div>`}
                  </div>
                  <div style="font-size:0.75rem;font-weight:600;margin-top:6px;text-align:center;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;width:100%">${K(i.title)}</div>
                </div>`).join("")}
          </div>
        </div>
      </div>
    </div>`;const s=()=>n.innerHTML="";document.getElementById("top4-modal-close").addEventListener("click",s),document.getElementById("top4-modal").addEventListener("click",i=>{i.target.id==="top4-modal"&&s()}),document.getElementById("top4-search").addEventListener("input",i=>{const o=i.target.value.toLowerCase();n.querySelectorAll("[data-pick-review]").forEach(c=>{c.style.display=!o||c.title.toLowerCase().includes(o)?"":"none"})}),n.querySelectorAll("[data-pick-review]").forEach(i=>{i.addEventListener("click",async()=>{const o=await pe.byId(r),c=[...o.top4||[null,null,null,null]];c[e]=i.dataset.pickReview,await pe.save({...o,top4:c}),s(),await zn(r,!0)})})}function FA(r,e){const t=document.getElementById("edit-modal-placeholder")||document.getElementById("top4-modal-placeholder"),n=new FileReader;n.onload=()=>{const s=n.result;t.innerHTML=`
      <div class="modal-backdrop" id="avatar-crop-modal">
        <div class="modal-box" style="max-width:420px">
          <div class="modal-header">
            <span class="modal-title">✂️ Центрувати аватар</span>
            <button class="modal-close" id="crop-close">✕</button>
          </div>
          <div class="modal-body" style="display:flex;flex-direction:column;align-items:center;gap:16px">
            <div id="crop-area" style="width:220px;height:220px;border-radius:50%;overflow:hidden;position:relative;border:3px solid var(--accent);background:var(--bg-surface);cursor:grab;touch-action:none">
              <img id="crop-img" src="${s}" style="position:absolute;top:0;left:0;transform-origin:0 0;pointer-events:none;max-width:none">
            </div>
            <div style="width:100%;display:flex;align-items:center;gap:10px">
              <span style="font-size:0.8rem;color:var(--text-muted)">🔍</span>
              <input type="range" id="crop-zoom" min="100" max="400" value="100" style="flex:1;accent-color:var(--accent)">
              <span id="crop-zoom-label" style="font-size:0.75rem;color:var(--text-muted);min-width:40px;text-align:right">100%</span>
            </div>
            <div style="display:flex;gap:8px;width:100%">
              <button class="btn btn-primary" id="crop-save" style="flex:1">✅ Зберегти</button>
              <button class="btn btn-secondary" id="crop-cancel">Скасувати</button>
            </div>
          </div>
        </div>
      </div>`;const i=()=>{t.innerHTML=""};document.getElementById("crop-close").addEventListener("click",i),document.getElementById("crop-cancel").addEventListener("click",i),document.getElementById("avatar-crop-modal").addEventListener("click",N=>{N.target.id==="avatar-crop-modal"&&i()});const o=document.getElementById("crop-area"),c=document.getElementById("crop-img"),l=document.getElementById("crop-zoom"),u=document.getElementById("crop-zoom-label");let h=1,p=0,m=0,y=!1,b=0,R=0;const A=new Image;A.onload=()=>{h=220/Math.min(A.width,A.height),l.min=Math.round(h*100),l.max=Math.round(h*400),l.value=Math.round(h*100),p=-(A.width*h-220)/2,m=-(A.height*h-220)/2,k()},A.src=s;function k(){c.style.width=`${A.width*h}px`,c.style.height=`${A.height*h}px`,c.style.left=`${p}px`,c.style.top=`${m}px`,u.textContent=Math.round(h*100/(220/Math.min(A.width,A.height)))+"%"}function D(){const z=A.width*h,M=A.height*h;p=Math.min(0,Math.max(220-z,p)),m=Math.min(0,Math.max(220-M,m))}l.addEventListener("input",()=>{const N={x:(110-p)/h,y:(110-m)/h};h=parseInt(l.value)/100,p=110-N.x*h,m=110-N.y*h,D(),k()}),o.addEventListener("pointerdown",N=>{y=!0,b=N.clientX-p,R=N.clientY-m,o.style.cursor="grabbing",o.setPointerCapture(N.pointerId)}),o.addEventListener("pointermove",N=>{y&&(p=N.clientX-b,m=N.clientY-R,D(),k())}),o.addEventListener("pointerup",()=>{y=!1,o.style.cursor="grab"}),document.getElementById("crop-save").addEventListener("click",()=>{const N=document.createElement("canvas"),z=200;N.width=z,N.height=z;const M=N.getContext("2d");M.beginPath(),M.arc(z/2,z/2,z/2,0,Math.PI*2),M.closePath(),M.clip();const U=z/220;M.drawImage(A,p*U,m*U,A.width*h*U,A.height*h*U);const E=N.toDataURL("image/webp",.8);i(),e(E)})},n.readAsDataURL(r)}async function qc({id:r}){var t,n;const e=Me.currentUser();if(e&&e.id===r){De("account");return}if(await zn(r,!1),e&&document.querySelector(".profile-info")){const i=await ut.between(e.id,r);let o="";i?i.status==="pending"?i.requesterId===e.id?o='<button class="btn btn-secondary btn-sm" disabled>⏳ Запит надіслано</button>':o='<button class="btn btn-primary btn-sm" id="accept-friend-profile-btn">✅ Прийняти запит</button>':o='<button class="btn btn-secondary btn-sm" disabled>✅ Друзі</button>':o='<button class="btn btn-primary btn-sm" id="add-friend-profile-btn">➕ Додати в друзі</button>';const c=document.getElementById("friend-btn-area");c&&(c.style.marginTop="12px",c.innerHTML=o),(t=document.getElementById("add-friend-profile-btn"))==null||t.addEventListener("click",async()=>{await ut.send(e.id,r),await jn.add("friend",e.id,r,{username:e.username}),le("Запит надіслано!","success"),await qc({id:r})}),(n=document.getElementById("accept-friend-profile-btn"))==null||n.addEventListener("click",async()=>{await ut.accept(r,e.id);const l=await pe.byId(r);await jn.add("friend",e.id,r,{username:e.username,friendName:(l==null?void 0:l.username)||"Unknown"}).catch(console.error),le("Тепер ви друзі ✅","success"),await qc({id:r})})}}async function oi({id:r}){var t,n,s;const e=document.getElementById("page-root");Nr(e);try{const[i,o]=await Promise.all([ze.byId(r),Promise.resolve(Me.currentUser())]);if(!i){e.innerHTML='<div class="page-container"><div class="empty-state"><div class="empty-icon">😕</div><h3>Рецензія не знайдена</h3></div></div>';return}const c=await pe.byId(i.userId),l=o&&o.id===i.userId,u=i.status==="dropped",h=i.status==="planned",p={done:"✅ Прочитано",reading:"📖 Читаю",planned:"⏳ В планах",dropped:"❌ Кинув"},m={done:"status-done",reading:"status-reading",planned:"status-planned",dropped:"status-dropped"},y=i.likes||[],b=i.dislikes||[],R=o&&y.includes(o.id),A=o&&b.includes(o.id);if(e.innerHTML=`
    <div class="page-container" style="max-width:860px">
      <button class="btn btn-ghost btn-sm" id="back-btn" style="margin-bottom:20px">← Назад</button>

      <div class="review-full-layout">
        <div class="review-full-cover">
          ${i.coverBase64?`<img src="${i.coverBase64}" alt="${K(i.title)}">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:48px;background:var(--bg-surface)">📖</div>'}
        </div>
        <div class="review-full-body">
          <div class="review-full-title">${K(i.title)}</div>
          <div class="review-full-author">
            ${xt(c,"sm")}
            <a href="#" data-profile="${i.userId}" style="color:var(--accent3);font-weight:600;text-decoration:none;font-size:0.9rem">${K((c==null?void 0:c.username)||i.username||"Невідомий")}</a>
          </div>
          <div class="review-full-meta">
            <span class="status-badge ${m[i.status]||""}">${p[i.status]||""}</span>
            <span style="color:var(--text-muted);font-size:0.85rem">📚 ${i.chapters||0} глав</span>
            ${i.date?`<span style="color:var(--text-muted);font-size:0.85rem">📅 ${Eg(i.date)}</span>`:""}
            <span style="color:var(--text-muted);font-size:0.85rem">🕐 ${xr(i.createdAt)}</span>
          </div>
          <div class="review-rating-block" style="margin-bottom:12px">
            <div class="review-rating-left">
              <div class="review-rating-left-top">
                ${h?'<span style="color:var(--text-muted);font-size:0.9rem">Ще не оцінено</span>':ws(i.rating,u)}
                ${h?"":'<span class="x9-quality-tag" id="x9-quality-tag" style="display:none">🏷 Знак качества x9</span>'}
              </div>
              ${h?"":`<div class="review-user-rating-text" style="margin-top:6px;color:var(--text-muted);font-size:0.85rem">${u?"Кинуто":`${i.rating}/10`}</div>`}
            </div>
            ${h?"":`<div class="x9-rating-widget" id="x9-rating-widget" style="display:none">
              <div class="x9-quality-score" id="x9-rating-score">-</div>
              <div class="x9-quality-votes" id="x9-rating-votes">-</div>
            </div>`}
          </div>
          ${(t=i.tags)!=null&&t.length?`<div class="review-tags">${i.tags.map(k=>`<span class="tag">${K(nu(k))}</span>`).join("")}</div>`:""}
          ${i.updatedAt?`<span class="edited-badge">Редаговано ${xr(i.updatedAt)}</span>`:""}

          <!-- Reactions -->
          <div class="review-action-bar" style="margin-top:16px">
            <button class="reaction-btn ${R?"liked":""}" id="rv-like-btn" data-id="${r}">👍 ${y.length}</button>
            <button class="reaction-btn ${A?"disliked":""}" id="rv-dislike-btn" data-id="${r}">👎 ${b.length}</button>
          </div>

          ${l?`
            <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
              <button class="btn btn-secondary btn-sm" id="edit-review-btn">✏️ Редагувати</button>
              <button class="btn btn-danger btn-sm" id="delete-review-btn">🗑️ Видалити</button>
            </div>`:""}
        </div>
      </div>

      ${i.text?`<div class="card card-padding" style="margin-bottom:24px"><div class="review-full-text">${K(i.text)}</div></div>`:""}

      <!-- Comments -->
      <div class="comments-section">
        <div class="section-title">💬 Коментарі</div>
        <div id="comments-list"><div style="display:flex;justify-content:center;padding:24px"><div class="loader-spinner"></div></div></div>
        ${o?`
          <div style="display:flex;gap:12px;margin-top:20px;align-items:flex-start">
            ${xt(o,"sm")}
            <div style="flex:1">
              <textarea class="textarea" id="new-comment-text" placeholder="Залиште коментар..." style="min-height:80px"></textarea>
              <button class="btn btn-primary btn-sm" id="post-comment-btn" style="margin-top:8px">Надіслати</button>
            </div>
          </div>`:'<p style="color:var(--text-muted);font-size:0.875rem;margin-top:16px"><a href="#" id="login-to-comment" style="color:var(--accent)">Увійдіть</a>, щоб залишити коментар</p>'}
      </div>
    </div>`,document.getElementById("back-btn").addEventListener("click",()=>history.back()),h||(async()=>{try{const k=await PA(i.title);if(!k)return;const D=document.getElementById("x9-quality-tag"),N=document.getElementById("x9-rating-widget");if(!D||!N)return;D.style.display="inline-flex",N.style.display="block",document.getElementById("x9-rating-score").textContent=String(k.score),document.getElementById("x9-rating-votes").textContent=`${k.votes} голосов`}catch{}})(),e.querySelectorAll("[data-profile]").forEach(k=>{k.addEventListener("click",D=>{D.preventDefault(),De(`profile/${k.dataset.profile}`)})}),o){const k=document.getElementById("rv-like-btn"),D=document.getElementById("rv-dislike-btn");k&&D&&(k.addEventListener("click",async()=>{if(await pe.isBlockedBy(i.userId,o.id)){le("Ви заблоковані цим користувачем","warning");return}const z=k.classList.contains("liked"),M=D.classList.contains("disliked");z?(k.classList.remove("liked"),k.textContent=`👍 ${Math.max(0,y.length-1)}`):(k.classList.add("liked"),k.textContent=`👍 ${y.length+1}`,M&&(D.classList.remove("disliked"),D.textContent=`👎 ${Math.max(0,b.length-1)}`));try{await ze.toggleLike(r,o.id),oi({id:r})}catch(U){console.error("Like error:",U),le("Помилка синхронізації","error"),oi({id:r})}}),D.addEventListener("click",async()=>{if(await pe.isBlockedBy(i.userId,o.id)){le("Ви заблоковані цим користувачем","warning");return}const z=k.classList.contains("liked");D.classList.contains("disliked")?(D.classList.remove("disliked"),D.textContent=`👎 ${Math.max(0,b.length-1)}`):(D.classList.add("disliked"),D.textContent=`👎 ${b.length+1}`,z&&(k.classList.remove("liked"),k.textContent=`👍 ${Math.max(0,y.length-1)}`));try{await ze.toggleDislike(r,o.id),oi({id:r})}catch(U){console.error("Dislike error:",U),le("Помилка синхронізації","error"),oi({id:r})}}))}l&&(document.getElementById("edit-review-btn").addEventListener("click",()=>De(`edit-review/${r}`)),document.getElementById("delete-review-btn").addEventListener("click",async()=>{window.confirm("Видалити цю рецензію? Це неможливо скасувати.")&&(await ze.delete(r),le("Рецензію видалено","info"),De("account"))})),(n=document.getElementById("login-to-comment"))==null||n.addEventListener("click",k=>{k.preventDefault(),Rn(()=>Promise.resolve().then(()=>ii),void 0,import.meta.url).then(D=>D.showAuthModal("login"))}),(s=document.getElementById("post-comment-btn"))==null||s.addEventListener("click",async()=>{const k=document.getElementById("new-comment-text").value.trim();if(!k)return;if(await pe.isBlockedBy(i.userId,o.id)){le("Ви заблоковані цим користувачем","warning");return}const N=document.getElementById("post-comment-btn");N.disabled=!0,N.textContent="...",await fr.create(r,o.id,k),i.userId!==o.id&&await jn.add("new_comment",o.id,i.userId,{reviewId:r,reviewTitle:i.title,commenterName:o.username,read:!1}).catch(console.error),document.getElementById("new-comment-text").value="",N.disabled=!1,N.textContent="Надіслати",await vn(r,o),le("Коментар додано","success")}),await vn(r,o)}catch(i){console.error("Review render error:",i),e.innerHTML=`<div class="page-container"><div class="empty-state"><div class="empty-icon">⚠️</div><h3>Помилка завантаження</h3><p>${i.message}</p></div></div>`}}async function vn(r,e){const t=document.getElementById("comments-list");if(!t)return;const n=await fr.byReview(r),s=n.filter(o=>!o.parentId),i=n.filter(o=>o.parentId);if(s.length===0){t.innerHTML='<div class="empty-state" style="padding:24px"><div class="empty-icon">💬</div><h3>Коментарів поки немає</h3></div>';return}t.innerHTML=s.map(o=>BA(o,i,e)).join(""),t.querySelectorAll(".reaction-btn[data-comment-like]").forEach(o=>{o.addEventListener("click",async()=>{if(!e)return;const c=o.dataset.commentLike,l=t.querySelector(`.reaction-btn[data-comment-dislike="${c}"]`),u=o.classList.contains("liked"),h=l==null?void 0:l.classList.contains("disliked"),p=o;let m=parseInt(p.textContent.split(" ")[1])||0;if(u)o.classList.remove("liked"),p.textContent=`👍 ${Math.max(0,m-1)}`;else if(o.classList.add("liked"),p.textContent=`👍 ${m+1}`,h&&l){l.classList.remove("disliked");let y=parseInt(l.textContent.split(" ")[1])||0;l.textContent=`👎 ${Math.max(0,y-1)}`}try{await fr.toggleLike(c,e.id),await vn(r,e)}catch(y){console.error("Comment like error:",y),await vn(r,e)}})}),t.querySelectorAll(".reaction-btn[data-comment-dislike]").forEach(o=>{o.addEventListener("click",async()=>{if(!e)return;const c=o.dataset.commentDislike,l=t.querySelector(`.reaction-btn[data-comment-like="${c}"]`),u=l==null?void 0:l.classList.contains("liked"),h=o.classList.contains("disliked");let p=parseInt(o.textContent.split(" ")[1])||0;if(h)o.classList.remove("disliked"),o.textContent=`👎 ${Math.max(0,p-1)}`;else if(o.classList.add("disliked"),o.textContent=`👎 ${p+1}`,u&&l){l.classList.remove("liked");let m=parseInt(l.textContent.split(" ")[1])||0;l.textContent=`👍 ${Math.max(0,m-1)}`}try{await fr.toggleDislike(c,e.id),await vn(r,e)}catch(m){console.error("Comment dislike error:",m),await vn(r,e)}})}),t.querySelectorAll("[data-reply-btn]").forEach(o=>{o.addEventListener("click",()=>{const c=o.dataset.replyBtn,l=document.getElementById(`reply-form-${c}`);if(l){l.remove();return}const u=document.createElement("div");u.id=`reply-form-${c}`,u.className="comment-item reply",u.style.borderBottom="none",u.innerHTML=`<div style="flex:1;display:flex;gap:8px;align-items:flex-start">
        <div style="flex:1">
          <textarea class="textarea" placeholder="Ваша відповідь..." style="min-height:60px;font-size:0.85rem"></textarea>
          <div style="display:flex;gap:8px;margin-top:6px">
            <button class="btn btn-primary btn-xs reply-submit-btn">Відповісти</button>
            <button class="btn btn-ghost btn-xs reply-cancel-btn">Скасувати</button>
          </div>
        </div>
      </div>`,o.closest(".comment-item").after(u),u.querySelector(".reply-cancel-btn").addEventListener("click",()=>u.remove()),u.querySelector(".reply-submit-btn").addEventListener("click",async()=>{const h=u.querySelector("textarea").value.trim();!h||!e||(u.querySelector(".reply-submit-btn").disabled=!0,await fr.create(r,e.id,h,c),await vn(r,e))})})}),t.querySelectorAll("[data-delete-comment]").forEach(o=>{o.addEventListener("click",async()=>{window.confirm("Видалити коментар?")&&(await fr.delete(o.dataset.deleteComment),await vn(r,e))})})}function BA(r,e,t){const n=e.filter(l=>l.parentId===r.id),s=t&&t.id===r.userId,i=r.likes||[],o=r.dislikes||[],c={username:r.username,avatarBase64:r.avatarBase64};return`<div class="comment-item">
    ${xt(c,"sm")}
    <div class="comment-body">
      <div class="comment-header">
        <span class="comment-author" data-profile="${r.userId}" style="cursor:pointer">${K(r.username||"Незнайомець")}</span>
        <span class="comment-ts">${xr(r.createdAt)}</span>
      </div>
      <div class="comment-text">${K(r.text)}</div>
      <div class="comment-actions">
        <button class="reaction-btn ${t&&i.includes(t.id)?"liked":""}" data-comment-like="${r.id}">👍 ${i.length}</button>
        <button class="reaction-btn ${t&&o.includes(t.id)?"disliked":""}" data-comment-dislike="${r.id}">👎 ${o.length}</button>
        ${t?`<button class="btn btn-ghost btn-xs" data-reply-btn="${r.id}">💬 Відповісти</button>`:""}
        ${s?`<button class="btn btn-danger btn-xs" data-delete-comment="${r.id}">🗑</button>`:""}
      </div>
    </div>
  </div>
  ${n.map(l=>{const u=l.likes||[],h=l.dislikes||[],p={username:l.username,avatarBase64:l.avatarBase64};return`<div class="comment-item reply">
      ${xt(p,"sm")}
      <div class="comment-body">
        <div class="comment-header">
          <span class="comment-author">${K(l.username||"Незнайомець")}</span>
          <span class="comment-ts">${xr(l.createdAt)}</span>
        </div>
        <div class="comment-text">${K(l.text)}</div>
        <div class="comment-actions">
          <button class="reaction-btn ${t&&u.includes(t.id)?"liked":""}" data-comment-like="${l.id}">👍 ${u.length}</button>
          <button class="reaction-btn ${t&&h.includes(t.id)?"disliked":""}" data-comment-dislike="${l.id}">👎 ${h.length}</button>
          ${(t==null?void 0:t.id)===l.userId?`<button class="btn btn-danger btn-xs" data-delete-comment="${l.id}">🗑</button>`:""}
        </div>
      </div>
    </div>`}).join("")}`}async function $A({userId:r}){const e=document.getElementById("page-root");Nr(e);const[t,n]=await Promise.all([pe.byId(r),ze.byUser(r)]);if(!t){e.innerHTML='<div class="page-container"><div class="empty-state"><h3>Користувача не знайдено</h3></div></div>';return}e.innerHTML=`
    <div class="page-container">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;flex-wrap:wrap">
        <button class="btn btn-ghost btn-sm" id="back-btn">← Назад</button>
        ${xt(t,"sm")}
        <div>
      <div style="font-family:var(--font-display);font-weight:700;font-size:1.1rem">Бібліотека: ${K(t.username)}</div>
          <div style="color:var(--text-muted);font-size:0.8rem">Всього збережено — ${n.length} манхв</div>
        </div>
      </div>

      <!-- Sorting Bar -->
      <div class="all-reviews-controls" id="sort-controls">
        <div style="font-size:0.85rem;color:var(--text-muted);width:100%">Сортувати:</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn btn-secondary btn-sm sort-btn active" data-sort="rating" data-dir="desc">⭐ Оцінка ⬇️</button>
          <button class="btn btn-secondary btn-sm sort-btn" data-sort="date" data-dir="desc">📅 Дата ⬇️</button>
          <button class="btn btn-secondary btn-sm sort-btn" data-sort="status" data-dir="desc">📌 Статус ⬇️</button>
          <button class="btn btn-secondary btn-sm sort-btn" data-sort="chapters" data-dir="desc">📚 Глави ⬇️</button>
        </div>
        <input class="input" id="all-reviews-search" placeholder="🔍 Пошук..." style="width:100%; margin-bottom: 8px;">
        <div id="tag-filter-wrap" style="display:flex;flex-wrap:wrap;gap:6px;width:100%">
          <!-- Tag buttons injected dynamically -->
        </div>
      </div>

      <div id="all-reviews-grid" style="display:flex;flex-direction:column;gap:10px">
        ${Gh(n)}
      </div>
    </div>`,document.getElementById("back-btn").addEventListener("click",()=>history.back());const s=()=>{e.querySelectorAll("[data-review-id]").forEach(A=>{A.addEventListener("click",()=>De(`review/${A.dataset.reviewId}`))})};let i="rating",o="desc",c="",l=new Set;const u=document.getElementById("all-reviews-grid"),h=document.getElementById("tag-filter-wrap"),p={};n.forEach(A=>{(A.tags||[]).forEach(k=>{const D=k.trim().toLowerCase();D&&(p[D]||(p[D]={name:k.trim(),count:0}),p[D].count++)})});const m=Object.values(p).sort((A,k)=>k.count-A.count);let y="";m.forEach(A=>{y+=`<button class="preset-tag filter-tag-btn" data-tag="${K(A.name.toLowerCase())}">${nu(A.name)} <span style="opacity:0.6;font-size:0.8em">(${A.count})</span></button>`}),h.innerHTML=y,h.querySelectorAll(".filter-tag-btn").forEach(A=>{A.addEventListener("click",()=>{const k=A.dataset.tag;l.has(k)?(l.delete(k),A.classList.remove("active"),A.style.borderColor="",A.style.background=""):(l.add(k),A.classList.add("active"),A.style.borderColor="var(--accent)",A.style.background="rgba(var(--accent-rgb), 0.1)"),R()})});const b=(A,k)=>k==="rating"?Number(A.rating)||0:k==="chapters"?Number(A.chapters)||0:k==="date"?A.date?new Date(A.date).getTime():0:k==="status"&&{done:4,reading:3,planned:2,dropped:1}[A.status]||0,R=()=>{let A=[...n];c&&(A=A.filter(k=>k.title.toLowerCase().includes(c))),l.size>0&&(A=A.filter(k=>{const D=(k.tags||[]).map(N=>N.trim().toLowerCase());return Array.from(l).every(N=>D.includes(N))})),A.sort((k,D)=>{let N=b(k,i),z=b(D,i),M=N>z?1:N<z?-1:0;return M===0&&i!=="date"?(M=new Date(D.createdAt).getTime()-new Date(k.createdAt).getTime(),o==="desc"?M:-M):o==="desc"?-M:M}),u.innerHTML=Gh(A),s()};e.querySelectorAll(".sort-btn").forEach(A=>{A.addEventListener("click",()=>{const k=A.dataset.sort;i===k?(o=o==="desc"?"asc":"desc",A.dataset.dir=o):(e.querySelectorAll(".sort-btn").forEach(N=>{N.classList.remove("active"),N!==A&&(N.dataset.dir="desc",N.innerHTML=N.innerHTML.replace("⬆️","⬇️"))}),A.classList.add("active"),i=k,o="desc",A.dataset.dir="desc");const D=o==="desc"?"⬇️":"⬆️";A.innerHTML=A.innerHTML.replace(/⬇️|⬆️/,D),R()})}),document.getElementById("all-reviews-search").addEventListener("input",A=>{c=A.target.value.toLowerCase().trim(),R()}),R()}function Gh(r){if(r.length===0)return'<div class="empty-state"><div class="empty-icon">📭</div><h3>Нічого не знайдено</h3></div>';const e={done:"✅ Прочитано",reading:"📖 Читаю",planned:"⏳ В планах",dropped:"❌ Кинув"},t={done:"status-done",reading:"status-reading",planned:"status-planned",dropped:"status-dropped"};return r.map(n=>{var s;return n.status==="dropped"||n.status,`<div class="review-card all-reviews-card" style="cursor:pointer" data-review-id="${n.id}">
      <div class="review-cover">
        ${n.coverBase64?`<img src="${n.coverBase64}" alt="${K(n.title)}">`:'<div class="review-cover-placeholder">📖</div>'}
      </div>
      <div class="review-body">
        <div class="review-title">${K(n.title)}</div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px">
          <div class="review-date">${n.date?Eg(n.date):xr(n.createdAt)}</div>
          <span class="status-badge ${t[n.status]||""}" style="font-size:0.7rem">${e[n.status]||""}</span>
          <span style="color:var(--text-muted);font-size:0.75rem">📚 ${n.chapters||0} глав</span>
        </div>
        <div style="margin:6px 0">${n.status==="planned"?'<span style="color:var(--text-muted);font-size:0.8rem">Ще не оцінено</span>':ws(n.rating,n.status==="dropped")}</div>
        ${(s=n.tags)!=null&&s.length?`<div class="review-tags">${n.tags.map(i=>`<span class="tag">${K(nu(i))}</span>`).join("")}</div>`:""}
        ${n.text?`<div class="review-text-preview" style="margin-top:6px">${K(n.text)} <span style="color:var(--accent)">...</span></div>`:""}
      </div>
    </div>`}).join("")}async function UA({id:r}){var t,n;const e=document.getElementById("page-root");Nr(e);try{let[s,i]=await Promise.all([ze.byTitle(r),Fc.byId(r)]);!i&&s.length>0&&(i=await Fc.byTitle(s[0].title));let o=Me.currentUser();if(s.length===0){e.innerHTML='<div class="page-container"><div class="empty-state"><div class="empty-icon">❓</div><h3>Тайтл не знайдено</h3></div></div>';return}const c=s[0],l=c.title,u=c.coverBase64,h=s.length,p=s.reduce((M,U)=>M+U.rating,0)/h,m=new Array(11).fill(0);s.forEach(M=>{const U=Math.round(M.rating);m[U]++});const y=Math.max(...m)||1;let b="";const R=i==null?void 0:i.anilist,A=R==null?void 0:R.status;if(A){const U={FINISHED:"Завершено",RELEASING:"Онгоінг",NOT_YET_RELEASED:"Анонс",CANCELLED:"Скасовано",HIATUS:"Пауза"}[A]||A;b=`<span class="meta-status-subtle ${A==="FINISHED"?"status-done":"status-ongoing"}">${U}</span>`}else if(i&&i.status){const U=i.status.toLowerCase()==="completed";b=`<span class="meta-status-subtle ${U?"status-done":"status-ongoing"}">${U?"Завершено":"Онгоінг"}</span>`}let k="";if(i){const M=i.author||(R==null?void 0:R.author),U=i.artist||(R==null?void 0:R.artist);M&&U&&M.toLowerCase()===U.toLowerCase()?k=`<div><span style="color:var(--accent3)">Автор та художник:</span> ${M}</div>`:(M&&(k+=`<div><span style="color:var(--accent3)">Автор:</span> ${M}</div>`),U&&(k+=`<div><span style="color:var(--accent3)">Художник:</span> ${U}</div>`))}let D=[];(t=i==null?void 0:i.genres)!=null&&t.length&&D.push(...i.genres),(n=R==null?void 0:R.genres)!=null&&n.length&&R.genres.forEach(M=>{D.some(U=>U.toLowerCase()===M.toLowerCase())||D.push(M)});const N=D.length?`<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">${D.map(M=>`<span style="font-size:0.72rem;padding:3px 10px;border-radius:20px;background:var(--surface2);color:var(--text-muted);border:1px solid var(--border)">${M}</span>`).join("")}</div>`:"";e.innerHTML=`
      <div class="page-container" style="max-width:940px">
        <button class="btn btn-ghost btn-sm" id="back-btn" style="margin-bottom:24px">← Назад</button>

        <div class="title-header-layout">
          <div class="title-cover">
            ${u?`<img src="${u}" alt="${K(l)}">`:'<div class="title-cover-placeholder">📖</div>'}
          </div>
          <div class="title-info">
            <h1 class="title-name">${K(l)}</h1>
            
            ${i?`
            <div class="official-metadata-row">
              ${i.official_rating?`
                <div class="tg-badge" title="Офіційний рейтинг ToonGod">
                  <div style="line-height:1.2">TG ${i.official_rating}</div>
                </div>`:""}
              ${R!=null&&R.score?`
                <div class="al-badge" title="Рейтинг AniList">
                  <div style="line-height:1.2">AL ${R.score}</div>
                </div>`:""}
              <div class="meta-badge" title="Рік випуску">📅 <span>Рік:</span> <strong>${i.release_year||(R==null?void 0:R.year)||"N/A"}</strong></div>
              ${R!=null&&R.popularity?`<div class="meta-badge meta-badge-popularity" title="Популярність на AniList">🔥 <span>Популярність:</span> <strong>${R.popularity.toLocaleString()}</strong></div>`:i.bookmarks?`<div class="meta-badge meta-badge-popularity" title="Популярність на ToonGod">🔥 <span>Популярність:</span> <strong>${i.bookmarks}</strong></div>`:""}
            </div>
            <div style="margin-bottom:12px; font-size:0.85rem; color:var(--text-muted); display:flex; flex-wrap:wrap; gap:16px; align-items:center">
                ${b}
                ${k}
            </div>
            ${N}
          `:""}

          <div class="title-meta-pills" style="display:flex;flex-wrap:wrap;gap:8px">
              <span class="pill">📚 ${c.chapters||0} глав</span>
              <span class="pill">📈 ${h} відгуків</span>
            </div>
            <button class="btn btn-primary" id="write-review-btn" style="width:100%;margin-top:16px;box-shadow:var(--shadow-float)">✍️ Написати рецензію</button>
            
            <div class="title-rating-section">
              <div class="title-rating-main">
                <div class="title-rating-value">${p.toFixed(1)}</div>
                <div class="title-rating-stars">${ws(p)}</div>
              </div>
              
              <div class="rating-distribution">
                ${[10,9,8,7,6,5,4,3,2,1].map(M=>`
                  <div class="dist-row">
                    <span class="dist-label">${M}</span>
                    <div class="dist-bar-wrap">
                      <div class="dist-bar-fill" style="width:${m[M]/y*100}%"></div>
                    </div>
                    <span class="dist-count">${m[M]}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>

        <div class="title-reviews-section">
          <div class="section-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
            <h2 class="section-title" style="margin:0">💬 Рецензії користувачів</h2>
          </div>
          <div class="reviews-grid-list">
            ${s.map(M=>`
              <div class="review-card-item card" data-id="${M.id}">
                <div class="review-card-header">
                  ${xt({username:M.username,avatarBase64:M.avatarBase64},"sm")}
                  <div class="review-card-user">
                    <div class="user-name">${K(M.username)}</div>
                    <div class="review-ts">${xr(M.createdAt)}</div>
                  </div>
                  <div class="review-card-rating">
                     ${ws(M.rating)}
                  </div>
                </div>
                <div class="review-card-text-preview">
                  ${M.text?K(M.text.substring(0,180))+(M.text.length>180?"...":""):'<i style="color:var(--text-muted)">Без тексту</i>'}
                </div>
                <div class="review-card-footer">
                  <button class="btn btn-ghost btn-xs">Читати повністю →</button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `,document.getElementById("back-btn").addEventListener("click",()=>history.back());const z=document.getElementById("write-review-btn");z&&z.addEventListener("click",()=>De(`new-review/${r}`)),e.querySelectorAll(".review-card-item").forEach(M=>{M.addEventListener("click",()=>De(`review/${M.dataset.id}`))})}catch(s){console.error("Title render error:",s),e.innerHTML=`<div class="page-container"><div class="empty-state"><div class="empty-icon">⚠️</div><h3>Помилка завантаження</h3><p>${s.message}</p></div></div>`}}let jc=!1;function qA(){document.addEventListener("keydown",t=>{t.key==="Escape"&&document.querySelectorAll(".modal-backdrop").forEach(n=>{const s=n.querySelector(".modal-close, #edit-modal-close2, #del-modal-close2");s?s.click():n.remove()})});const r=document.getElementById("app");r.innerHTML="";const e=document.createElement("div");e.id="page-root",r.appendChild(e),vA(()=>{Uc(),window.scrollTo({top:0,behavior:"smooth"})}),Pt("home",()=>xA()),Pt("faq",()=>kA()),Pt("new-review",()=>{if(!Me.currentUser()){Rn(()=>Promise.resolve().then(()=>ii),void 0,import.meta.url).then(t=>t.showAuthModal("login")),window.location.hash="home";return}ac(null)}),Pt("new-review/:titleId",({titleId:t})=>{if(!Me.currentUser()){Rn(()=>Promise.resolve().then(()=>ii),void 0,import.meta.url).then(n=>n.showAuthModal("login")),window.location.hash="home";return}ac(null,t)}),Pt("edit-review/:id",({id:t})=>{if(!Me.currentUser()){window.location.hash="home";return}ac(t)}),Pt("friends",()=>{if(!Me.currentUser()){Rn(()=>Promise.resolve().then(()=>ii),void 0,import.meta.url).then(t=>t.showAuthModal("login")),window.location.hash="home";return}_n()}),Pt("account",()=>{if(!Me.currentUser()){Rn(()=>Promise.resolve().then(()=>ii),void 0,import.meta.url).then(t=>t.showAuthModal("login")),window.location.hash="home";return}VA()}),Pt("profile/:id",({id:t})=>qc({id:t})),Pt("review/:id",({id:t})=>oi({id:t})),Pt("title/:id",({id:t})=>UA({id:t})),Pt("all-reviews/:userId",({userId:t})=>$A({userId:t})),Uc(),jc||(wA(),jc=!0)}kv(un,async r=>{if(r)try{const e=await pe.byId(r.uid);Me.setProfile(e?{...e,id:r.uid}:{id:r.uid,username:r.displayName||"User"})}catch(e){console.warn("Could not fetch user profile on load (Firebase Rules or Network):",e),Me.setProfile({id:r.uid,username:r.displayName||"User"})}else Me.setProfile(null);jc?Uc():qA(),r&&jA(r.uid).catch(console.error)});async function jA(r){try{const e=wt(Fe(W,"news"),je("type","==","new_comment"),je("targetId","==",r),je("read","==",!1));(await dt(e)).docs.forEach(n=>{const s=n.data();le(`💬 ${s.commenterName||"Хтось"} прокоментував вашу рецензію "${s.reviewTitle||"..."}"`,"info",{persistent:!0}),pt(ie(W,"news",n.id),{read:!0}).catch(console.error)})}catch(e){console.warn("Could not check comment notifications:",e)}}
