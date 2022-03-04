'use strict';(function(d,m){"object"===typeof exports&&"undefined"!==typeof module?m(exports,require("react"),require("history"),require("react-router")):"function"===typeof define&&define.amd?define(["exports","react","history","react-router"],m):(d=d||self,m(d.ReactRouterDOM={},d.React,d.HistoryLibrary,d.ReactRouter))})(this,function(d,m,x,k){function y(){y=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b],l;for(l in c)Object.prototype.hasOwnProperty.call(c,l)&&(a[l]=
c[l])}return a};return y.apply(this,arguments)}function M(a,b){if(null==a)return{};var c={},l=Object.keys(a),e;for(e=0;e<l.length;e++){var g=l[e];0<=b.indexOf(g)||(c[g]=a[g])}return c}function S(a,b){if(a){if("string"===typeof a)return N(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);"Object"===c&&a.constructor&&(c=a.constructor.name);if("Map"===c||"Set"===c)return Array.from(c);if("Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c))return N(a,b)}}function N(a,b){if(null==
b||b>a.length)b=a.length;for(var c=0,l=Array(b);c<b;c++)l[c]=a[c];return l}function T(a){var b=0;if("undefined"===typeof Symbol||null==a[Symbol.iterator]){if(Array.isArray(a)||(a=S(a)))return function(){return b>=a.length?{done:!0}:{done:!1,value:a[b++]}};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}b=a[Symbol.iterator]();return b.next.bind(b)}function E(a,b){return b={exports:{}},a(b,
b.exports),b.exports}function F(a,b,c,l,e){for(var g in a)if(U(a,g)){try{if("function"!==typeof a[g]){var d=Error((l||"React class")+": "+c+" type `"+g+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[g]+"`.");d.name="Invariant Violation";throw d;}var q=a[g](b,g,l,c,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(v){q=v}!q||q instanceof Error||G((l||"React class")+": type specification of "+c+" `"+g+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+
typeof q+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).");if(q instanceof Error&&!(q.message in H)){H[q.message]=!0;var k=e?e():"";G("Failed "+c+" type: "+q.message+(null!=k?k:""))}}}function z(){return null}function V(a,b){if(!a){"undefined"!==typeof console&&console.warn(b);try{throw Error(b);}catch(c){}}}function I(a){var b=a.children;a=a.window;var c=m.useRef();null==c.current&&(c.current=
x.createBrowserHistory({window:a}));var l=c.current;a=m.useReducer(function(a,b){return b},{action:l.action,location:l.location});c=a[0];var e=a[1];m.useLayoutEffect(function(){return l.listen(e)},[l]);return m.createElement(k.Router,{children:b,action:c.action,location:c.location,navigator:l})}function J(a){var b=a.children;a=a.window;var c=m.useRef();null==c.current&&(c.current=x.createHashHistory({window:a}));var l=c.current;a=m.useReducer(function(a,b){return b},{action:l.action,location:l.location});
c=a[0];var e=a[1];m.useLayoutEffect(function(){return l.listen(e)},[l]);return m.createElement(k.Router,{children:b,action:c.action,location:c.location,navigator:l})}function K(a){O(a.message,a.when);return null}function O(a,b){void 0===b&&(b=!0);var c=m.useCallback(function(b){window.confirm(a)&&b.retry()},[a]);k.useBlocker(c,b)}function A(a){void 0===a&&(a="");return new URLSearchParams("string"===typeof a||Array.isArray(a)||a instanceof URLSearchParams?a:Object.keys(a).reduce(function(b,c){var l=
a[c];return b.concat(Array.isArray(l)?l.map(function(a){return[c,a]}):[[c,l]])},[]))}var aa=E(function(a,b){(function(){function a(a){if("object"===typeof a&&null!==a){var b=a.$$typeof;switch(b){case g:switch(a=a.type,a){case f:case u:case k:case m:case h:case B:return a;default:switch(a=a&&a.$$typeof,a){case n:case r:case C:case D:case p:return a;default:return b}}case d:return b}}}function l(f){return a(f)===u}var e="function"===typeof Symbol&&Symbol.for,g=e?Symbol.for("react.element"):60103,d=
e?Symbol.for("react.portal"):60106,k=e?Symbol.for("react.fragment"):60107,h=e?Symbol.for("react.strict_mode"):60108,m=e?Symbol.for("react.profiler"):60114,p=e?Symbol.for("react.provider"):60109,n=e?Symbol.for("react.context"):60110,f=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,r=e?Symbol.for("react.forward_ref"):60112,B=e?Symbol.for("react.suspense"):60113,W=e?Symbol.for("react.suspense_list"):60120,D=e?Symbol.for("react.memo"):60115,C=e?Symbol.for("react.lazy"):
60116,X=e?Symbol.for("react.block"):60121,Y=e?Symbol.for("react.fundamental"):60117,t=e?Symbol.for("react.responder"):60118,Z=e?Symbol.for("react.scope"):60119,P=!1;b.AsyncMode=f;b.ConcurrentMode=u;b.ContextConsumer=n;b.ContextProvider=p;b.Element=g;b.ForwardRef=r;b.Fragment=k;b.Lazy=C;b.Memo=D;b.Portal=d;b.Profiler=m;b.StrictMode=h;b.Suspense=B;b.isAsyncMode=function(b){P||(P=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API."));
return l(b)||a(b)===f};b.isConcurrentMode=l;b.isContextConsumer=function(f){return a(f)===n};b.isContextProvider=function(f){return a(f)===p};b.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===g};b.isForwardRef=function(f){return a(f)===r};b.isFragment=function(f){return a(f)===k};b.isLazy=function(f){return a(f)===C};b.isMemo=function(f){return a(f)===D};b.isPortal=function(f){return a(f)===d};b.isProfiler=function(f){return a(f)===m};b.isStrictMode=function(f){return a(f)===
h};b.isSuspense=function(f){return a(f)===B};b.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===k||a===u||a===m||a===h||a===B||a===W||"object"===typeof a&&null!==a&&(a.$$typeof===C||a.$$typeof===D||a.$$typeof===p||a.$$typeof===n||a.$$typeof===r||a.$$typeof===Y||a.$$typeof===t||a.$$typeof===Z||a.$$typeof===X)};b.typeOf=a})()}),Q=E(function(a){a.exports=aa}),R=Object.getOwnPropertySymbols,ba=Object.prototype.hasOwnProperty,ca=Object.prototype.propertyIsEnumerable,
da=function(){try{if(!Object.assign)return!1;var a=new String("abc");a[5]="de";if("5"===Object.getOwnPropertyNames(a)[0])return!1;var b={};for(a=0;10>a;a++)b["_"+String.fromCharCode(a)]=a;if("0123456789"!==Object.getOwnPropertyNames(b).map(function(a){return b[a]}).join(""))return!1;var c={};"abcdefghijklmnopqrst".split("").forEach(function(a){c[a]=a});return"abcdefghijklmnopqrst"!==Object.keys(Object.assign({},c)).join("")?!1:!0}catch(l){return!1}}()?Object.assign:function(a,b){if(null===a||void 0===
a)throw new TypeError("Object.assign cannot be called with null or undefined");var c=Object(a);for(var l,e=1;e<arguments.length;e++){var g=Object(arguments[e]);for(var d in g)ba.call(g,d)&&(c[d]=g[d]);if(R){l=R(g);for(var k=0;k<l.length;k++)ca.call(g,l[k])&&(c[l[k]]=g[l[k]])}}return c},G=function(){},H={},U=Function.call.bind(Object.prototype.hasOwnProperty);G=function(a){a="Warning: "+a;"undefined"!==typeof console&&console.error(a);try{throw Error(a);}catch(b){}};F.resetWarningCache=function(){H=
{}};var ea=Function.call.bind(Object.prototype.hasOwnProperty),t=function(){};t=function(a){a="Warning: "+a;"undefined"!==typeof console&&console.error(a);try{throw Error(a);}catch(b){}};var fa=function(a,b){function c(a,b){return a===b?0!==a||1/a===1/b:a!==a&&b!==b}function l(a){this.message=a;this.stack=""}function e(a){function f(f,u,e,r,d,g,h){r=r||"<<anonymous>>";g=g||e;if("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"!==h){if(b)throw f=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"),
f.name="Invariant Violation",f;"undefined"!==typeof console&&(h=r+":"+e,!c[h]&&3>k&&(t("You are manually calling a React.PropTypes validation function for the `"+g+"` prop on `"+r+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),c[h]=!0,k++))}return null==u[e]?f?null===u[e]?new l("The "+d+" `"+g+"` is marked as required in `"+(r+"`, but its value is `null`.")):
new l("The "+d+" `"+g+"` is marked as required in `"+(r+"`, but its value is `undefined`.")):null:a(u,e,r,d,g)}var c={},k=0,e=f.bind(null,!1);e.isRequired=f.bind(null,!0);return e}function g(a){return e(function(f,b,c,e,d,g){f=f[b];return k(f)!==a?(f=h(f),new l("Invalid "+e+" `"+d+"` of type `"+(f+"` supplied to `"+c+"`, expected `")+(a+"`."))):null})}function d(f){switch(typeof f){case "number":case "string":case "undefined":return!0;case "boolean":return!f;case "object":if(Array.isArray(f))return f.every(d);
if(null===f||a(f))return!0;var b=f&&(p&&f[p]||f["@@iterator"]);var c="function"===typeof b?b:void 0;if(c)if(b=c.call(f),c!==f.entries)for(;!(f=b.next()).done;){if(!d(f.value))return!1}else for(;!(f=b.next()).done;){if((f=f.value)&&!d(f[1]))return!1}else return!1;return!0;default:return!1}}function k(a){var f=typeof a;return Array.isArray(a)?"array":a instanceof RegExp?"object":"symbol"===f||a&&("Symbol"===a["@@toStringTag"]||"function"===typeof Symbol&&a instanceof Symbol)?"symbol":f}function h(a){if("undefined"===
typeof a||null===a)return""+a;var b=k(a);if("object"===b){if(a instanceof Date)return"date";if(a instanceof RegExp)return"regexp"}return b}function m(a){a=h(a);switch(a){case "array":case "object":return"an "+a;case "boolean":case "date":case "regexp":return"a "+a;default:return a}}var p="function"===typeof Symbol&&Symbol.iterator,n={array:g("array"),bool:g("boolean"),func:g("function"),number:g("number"),object:g("object"),string:g("string"),symbol:g("symbol"),any:e(z),arrayOf:function(a){return e(function(b,
f,c,e,d){if("function"!==typeof a)return new l("Property `"+d+"` of component `"+c+"` has invalid PropType notation inside arrayOf.");b=b[f];if(!Array.isArray(b))return b=k(b),new l("Invalid "+e+" `"+d+"` of type `"+(b+"` supplied to `"+c+"`, expected an array."));for(f=0;f<b.length;f++){var g=a(b,f,c,e,d+"["+f+"]","SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");if(g instanceof Error)return g}return null})},element:function(){return e(function(b,c,e,d,g){b=b[c];return a(b)?null:(b=k(b),new l("Invalid "+
d+" `"+g+"` of type `"+(b+"` supplied to `"+e+"`, expected a single ReactElement.")))})}(),elementType:function(){return e(function(a,b,c,e,d){a=a[b];return Q.isValidElementType(a)?null:(a=k(a),new l("Invalid "+e+" `"+d+"` of type `"+(a+"` supplied to `"+c+"`, expected a single ReactElement type.")))})}(),instanceOf:function(a){return e(function(b,f,c,e,d){if(!(b[f]instanceof a)){var g=a.name||"<<anonymous>>";b=b[f];b=b.constructor&&b.constructor.name?b.constructor.name:"<<anonymous>>";return new l("Invalid "+
e+" `"+d+"` of type `"+(b+"` supplied to `"+c+"`, expected instance of `")+(g+"`."))}return null})},node:function(){return e(function(a,b,c,e,g){return d(a[b])?null:new l("Invalid "+e+" `"+g+"` supplied to `"+(c+"`, expected a ReactNode."))})}(),objectOf:function(a){return e(function(b,c,f,e,d){if("function"!==typeof a)return new l("Property `"+d+"` of component `"+f+"` has invalid PropType notation inside objectOf.");b=b[c];c=k(b);if("object"!==c)return new l("Invalid "+e+" `"+d+"` of type `"+(c+
"` supplied to `"+f+"`, expected an object."));for(var g in b)if(ea(b,g)&&(c=a(b,g,f,e,d+"."+g,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"),c instanceof Error))return c;return null})},oneOf:function(a){return Array.isArray(a)?e(function(b,f,e,d,g){b=b[f];for(f=0;f<a.length;f++)if(c(b,a[f]))return null;f=JSON.stringify(a,function(a,b){return"symbol"===h(b)?String(b):b});return new l("Invalid "+d+" `"+g+"` of value `"+String(b)+"` supplied to `"+(e+"`, expected one of "+f+"."))}):(1<arguments.length?
t("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):t("Invalid argument supplied to oneOf, expected an array."),z)},oneOfType:function(a){if(!Array.isArray(a))return t("Invalid argument supplied to oneOfType, expected an instance of array."),z;for(var b=0;b<a.length;b++){var c=a[b];if("function"!==typeof c)return t("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+
m(c)+" at index "+b+"."),z}return e(function(b,c,f,e,d){for(var g=0;g<a.length;g++)if(null==(0,a[g])(b,c,f,e,d,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"))return null;return new l("Invalid "+e+" `"+d+"` supplied to `"+(f+"`."))})},shape:function(a){return e(function(b,c,f,e,d){b=b[c];c=k(b);if("object"!==c)return new l("Invalid "+e+" `"+d+"` of type `"+c+"` supplied to `"+(f+"`, expected `object`."));for(var g in a)if(c=a[g])if(c=c(b,g,f,e,d+"."+g,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"))return c;
return null})},exact:function(a){return e(function(b,c,f,e,d){var g=b[c],h=k(g);if("object"!==h)return new l("Invalid "+e+" `"+d+"` of type `"+h+"` supplied to `"+(f+"`, expected `object`."));h=da({},b[c],a);for(var m in h){h=a[m];if(!h)return new l("Invalid "+e+" `"+d+"` key `"+m+"` supplied to `"+f+"`.\nBad object: "+JSON.stringify(b[c],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(a),null,"  "));if(h=h(g,m,f,e,d+"."+m,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"))return h}return null})}};
l.prototype=Error.prototype;n.checkPropTypes=F;n.resetWarningCache=F.resetWarningCache;return n.PropTypes=n},h=E(function(a){a.exports=fa(Q.isElement,!0)});I.displayName="BrowserRouter";I.propTypes={children:h.node,window:h.object};J.displayName="HashRouter";J.propTypes={children:h.node,window:h.object};var w=m.forwardRef(function(a,b){var c=a.onClick,d=a.replace,e=void 0===d?!1:d,g=a.state,h=a.target,q=a.to;a=M(a,["onClick","replace","state","target","to"]);d=k.useHref(q);var t=k.useNavigate(),v=
k.useLocation(),p=k.useResolvedPath(q);return m.createElement("a",Object.assign({},a,{href:d,onClick:function(a){c&&c(a);a.defaultPrevented||0!==a.button||h&&"_self"!==h||a.metaKey||a.altKey||a.ctrlKey||a.shiftKey||(a.preventDefault(),a=!!e||x.createPath(v)===x.createPath(p),t(q,{replace:a,state:g}))},ref:b,target:h}))});w.displayName="Link";w.propTypes={onClick:h.func,replace:h.bool,state:h.object,target:h.string,to:h.oneOfType([h.string,h.shape({pathname:h.string,search:h.string,hash:h.string})]).isRequired};
var L=m.forwardRef(function(a,b){var c=a["aria-current"],d=void 0===c?"page":c;c=a.activeClassName;var e=void 0===c?"active":c;c=a.activeStyle;var g=a.caseSensitive,h=void 0===g?!1:g;g=a.className;var q=void 0===g?"":g;g=a.end;var t=void 0===g?!1:g,v=a.style;g=a.to;a=M(a,"aria-current activeClassName activeStyle caseSensitive className end style to".split(" "));var p=k.useLocation(),n=k.useResolvedPath(g);p=p.pathname;n=n.pathname;h||(p=p.toLowerCase(),n=n.toLowerCase());d=(h=t?p===n:p.startsWith(n))?
d:void 0;e=[q,h?e:null].filter(Boolean).join(" ");c=y({},v,{},h?c:null);return m.createElement(w,Object.assign({},a,{"aria-current":d,className:e,ref:b,style:c,to:g}))});L.displayName="NavLink";L.propTypes=y({},w.propTypes,{"aria-current":h.oneOf("page step location date time true".split(" ")),activeClassName:h.string,activeStyle:h.object,className:h.string,style:h.object,to:h.oneOfType([h.string,h.shape({pathname:h.string,search:h.string,hash:h.string})]).isRequired});K.displayName="Prompt";K.propTypes=
{message:h.string,when:h.bool};Object.defineProperty(d,"MemoryRouter",{enumerable:!0,get:function(){return k.MemoryRouter}});Object.defineProperty(d,"Navigate",{enumerable:!0,get:function(){return k.Navigate}});Object.defineProperty(d,"Outlet",{enumerable:!0,get:function(){return k.Outlet}});Object.defineProperty(d,"Route",{enumerable:!0,get:function(){return k.Route}});Object.defineProperty(d,"Router",{enumerable:!0,get:function(){return k.Router}});Object.defineProperty(d,"Routes",{enumerable:!0,
get:function(){return k.Routes}});Object.defineProperty(d,"createRoutesFromArray",{enumerable:!0,get:function(){return k.createRoutesFromArray}});Object.defineProperty(d,"createRoutesFromChildren",{enumerable:!0,get:function(){return k.createRoutesFromChildren}});Object.defineProperty(d,"generatePath",{enumerable:!0,get:function(){return k.generatePath}});Object.defineProperty(d,"matchPath",{enumerable:!0,get:function(){return k.matchPath}});Object.defineProperty(d,"matchRoutes",{enumerable:!0,get:function(){return k.matchRoutes}});
Object.defineProperty(d,"resolvePath",{enumerable:!0,get:function(){return k.resolvePath}});Object.defineProperty(d,"useBlocker",{enumerable:!0,get:function(){return k.useBlocker}});Object.defineProperty(d,"useHref",{enumerable:!0,get:function(){return k.useHref}});Object.defineProperty(d,"useInRouterContext",{enumerable:!0,get:function(){return k.useInRouterContext}});Object.defineProperty(d,"useLocation",{enumerable:!0,get:function(){return k.useLocation}});Object.defineProperty(d,"useMatch",{enumerable:!0,
get:function(){return k.useMatch}});Object.defineProperty(d,"useNavigate",{enumerable:!0,get:function(){return k.useNavigate}});Object.defineProperty(d,"useOutlet",{enumerable:!0,get:function(){return k.useOutlet}});Object.defineProperty(d,"useParams",{enumerable:!0,get:function(){return k.useParams}});Object.defineProperty(d,"useResolvedPath",{enumerable:!0,get:function(){return k.useResolvedPath}});Object.defineProperty(d,"useRoutes",{enumerable:!0,get:function(){return k.useRoutes}});d.BrowserRouter=
I;d.HashRouter=J;d.Link=w;d.NavLink=L;d.Prompt=K;d.createSearchParams=A;d.usePrompt=O;d.useSearchParams=function(a){V("undefined"!==typeof URLSearchParams,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
var b=m.useRef(A(a)),c=k.useLocation();a=m.useMemo(function(){for(var a=A(c.search),d=function(){var c=h.value;a.has(c)||b.current.getAll(c).forEach(function(b){a.append(c,b)})},e=T(b.current.keys()),h;!(h=e()).done;)d();return a},[c.search]);var d=k.useNavigate(),e=m.useCallback(function(a,b){d("?"+A(a),b)},[d]);return[a,e]};Object.defineProperty(d,"__esModule",{value:!0})});
//# sourceMappingURL=react-router-dom.development.js.map
