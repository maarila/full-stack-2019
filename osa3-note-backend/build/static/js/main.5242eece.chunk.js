(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(t,e,n){t.exports=n(39)},38:function(t,e,n){},39:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(11),c=n.n(o),u=n(12),i=n(3),l=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return r.a.createElement("li",{className:"note"},e.content,r.a.createElement("button",{onClick:n},a))},m=n(2),f=n.n(m),p=function(){return f.a.get("/api/notes").then(function(t){return t.data})},s=function(t){return f.a.post("/api/notes",t).then(function(t){return t.data})},d=function(t,e){return f.a.put("".concat("/api/notes","/").concat(t),e).then(function(t){return t.data})},E=function(t){var e=t.message;return null===e?null:r.a.createElement("div",{className:"error"},e)},b=function(){var t=Object(a.useState)([]),e=Object(i.a)(t,2),n=e[0],o=e[1],c=Object(a.useState)("uusi muistiinpano..."),m=Object(i.a)(c,2),f=m[0],b=m[1],v=Object(a.useState)(!0),g=Object(i.a)(v,2),h=g[0],k=g[1],O=Object(a.useState)(null),j=Object(i.a)(O,2),S=j[0],w=j[1];Object(a.useEffect)(function(){p().then(function(t){o(t)})},[]);var y=h?n:n.filter(function(t){return t.important});return r.a.createElement("div",null,r.a.createElement("h1",null,"Muistiinpanot"),r.a.createElement(E,{message:S}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return k(!h)}},"n\xe4yt\xe4 ",h?"vain t\xe4rke\xe4t":"kaikki")),r.a.createElement("ul",null,y.map(function(t){return r.a.createElement(l,{key:t.id,note:t,toggleImportance:function(){return function(t){var e=n.find(function(e){return e.id===t}),a=Object(u.a)({},e,{important:!e.important});d(t,a).then(function(e){o(n.map(function(n){return n.id!==t?n:e}))}).catch(function(a){w("muistiinpano '".concat(e.content," poistettu palvelimelta")),setTimeout(function(){w(null)},5e3),o(n.filter(function(e){return e.id!==t}))})}(t.id)}})})),r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:f,date:(new Date).toISOString(),important:Math.random()>.5};s(e).then(function(t){o(n.concat(t)),b("")})}},r.a.createElement("input",{value:f,onChange:function(t){b(t.target.value)}}),r.a.createElement("button",{type:"submit"},"tallenna")),r.a.createElement(function(){return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,"Note app, Department of Computer Science 2019"))},null))};n(38);c.a.render(r.a.createElement(b,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.5242eece.chunk.js.map