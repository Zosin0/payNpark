(()=>{"use strict";var e={4534:(e,t,r)=>{r.r(t);var a=r(8303),o=r(467),n=r(296),l=r(8381),i=r(861),s=r(6772),f=r(4518),d=r(6814),u=r(6553),c=i.default.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"space-between"},title:{fontSize:24,margin:50},navBar:{height:60,backgroundColor:"#eee",width:"100%",borderTopWidth:1,borderColor:"#ccc",flexDirection:"row",justifyContent:"space-around",alignItems:"center"},apiTitle:{fontSize:20,fontWeight:"bold"},apiData:{fontSize:16,color:"blue"},loadingText:{fontSize:16,fontStyle:"italic"}});const p=function(){var e=(0,l.useState)(null),t=(0,n.default)(e,2),r=t[0],a=t[1];(0,l.useEffect)((function(){i()}),[]);var i=function(){var e=(0,o.default)((function*(){try{var e=yield fetch("https://parknpay.zoser.me/api/exemplo"),t=yield e.json();a(t)}catch(r){console.error("Erro ao buscar dados:",r)}}));return function(){return e.apply(this,arguments)}}();return(0,u.jsxs)(s.default,{style:c.container,children:[(0,u.jsx)(f.default,{style:c.title,children:"Fast Ticket"}),(0,u.jsx)(d.default,{title:"Pagar Ticket",onPress:function(){return alert("Bot\xe3o pressionado!")}}),(0,u.jsx)(s.default,{style:c.navBar}),(0,u.jsx)(f.default,{style:c.apiTitle,children:"Dados da API Flask:"}),r?(0,u.jsx)(f.default,{style:c.apiData,children:r.mensagem}):(0,u.jsx)(f.default,{style:c.loadingText,children:"Carregando..."}),(0,u.jsx)(d.default,{title:"Recarregar Dados",onPress:i})]})};(0,a.default)(p)}},t={};function r(a){var o=t[a];if(void 0!==o)return o.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,r),n.exports}r.m=e,(()=>{var e=[];r.O=(t,a,o,n)=>{if(!a){var l=1/0;for(d=0;d<e.length;d++){for(var[a,o,n]=e[d],i=!0,s=0;s<a.length;s++)(!1&n||l>=n)&&Object.keys(r.O).every((e=>r.O[e](a[s])))?a.splice(s--,1):(i=!1,n<l&&(l=n));if(i){e.splice(d--,1);var f=o();void 0!==f&&(t=f)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[a,o,n]}})(),r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={792:0};r.O.j=t=>0===e[t];var t=(t,a)=>{var o,n,[l,i,s]=a,f=0;if(l.some((t=>0!==e[t]))){for(o in i)r.o(i,o)&&(r.m[o]=i[o]);if(s)var d=s(r)}for(t&&t(a);f<l.length;f++)n=l[f],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(d)},a=self.webpackChunkweb=self.webpackChunkweb||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var a=r.O(void 0,[259],(()=>r(4534)));a=r.O(a)})();
//# sourceMappingURL=main.528ee1fa.js.map