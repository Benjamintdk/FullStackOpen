(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(14),c=t.n(r),a=t(3),o=t(1),u=t(4),s=t.n(u),i="/api/persons",d={getAll:function(){return s.a.get(i).then((function(e){return e.data}))},createEntry:function(e){return s.a.post(i,e).then((function(e){return e.data}))},updateEntry:function(e,n){return s.a.put("".concat(i,"/").concat(e),n).then((function(e){return e.data}))},deleteEntry:function(e){return s.a.delete("".concat(i,"/").concat(e))}},l=t(0),h=function(e){var n=e.person,t=e.deleteRecord;return Object(l.jsxs)("div",{children:[n.name," ",n.number,Object(l.jsx)("button",{onClick:t,children:"delete"})]})},j=function(e){var n=e.value,t=e.handleSearchChange,r=e.filteredPersons;return Object(l.jsxs)("div",{children:["filter shown with ",Object(l.jsx)("input",{value:n,onChange:t}),Object(l.jsx)("ul",{children:r.map((function(e){return Object(l.jsx)("div",{children:e.name},e.name)}))})]})},b=function(e){var n=e.message;return null===n?null:"success"===n.type?Object(l.jsx)("div",{className:"success",children:n.notif}):Object(l.jsx)("div",{className:"error",children:n.notif})},f=function(e){var n=e.newName,t=e.newNumber,r=e.addName,c=e.handleNameChange,a=e.handleNumberChange;return Object(l.jsxs)("form",{onSubmit:r,children:[Object(l.jsxs)("div",{children:["name: ",Object(l.jsx)("input",{value:n,onChange:c})]}),Object(l.jsxs)("div",{children:["number: ",Object(l.jsx)("input",{value:t,onChange:a})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"add"})})]})},m=function(){var e=Object(o.useState)([]),n=Object(a.a)(e,2),t=n[0],r=n[1],c=Object(o.useState)([]),u=Object(a.a)(c,2),s=u[0],i=u[1],m=Object(o.useState)(""),O=Object(a.a)(m,2),p=O[0],v=O[1],x=Object(o.useState)(""),g=Object(a.a)(x,2),w=g[0],C=g[1],N=Object(o.useState)(" "),y=Object(a.a)(N,2),S=y[0],E=y[1],k=Object(o.useState)(null),L=Object(a.a)(k,2),P=L[0],A=L[1],D=function(e,n){A({notif:e,type:n}),setTimeout((function(){return A(null)}),3e3)};Object(o.useEffect)((function(){d.getAll().then((function(e){return r(e)}))}),[]);return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Phonebook"}),Object(l.jsx)(b,{message:P}),Object(l.jsx)(j,{value:S,handleSearchChange:function(e){E(e.target.value),""===e.target.value?i([]):i(t.filter((function(e){return e.name.toLowerCase().match(S.toLowerCase())})))},filteredPersons:s}),Object(l.jsx)("h2",{children:"add a new"}),Object(l.jsx)(f,{newName:p,newNumber:w,addName:function(e){e.preventDefault();var n={name:p,number:w},c=t.find((function(e){return e.name.toLowerCase()===p.toLowerCase()}));void 0!==c?window.confirm("".concat(p," has already been added to phonebook, replace the old number with a new one?"))&&d.updateEntry(c.id,n).then((function(e){D("".concat(e.name,"'s number has been updated"),"success"),r(t.map((function(n){return n.name.toLowerCase()!==p.toLowerCase()?n:e}))),v(""),C("")})).catch((function(e){console.log(e.response.data),D(e.response.data.error,"error")})):d.createEntry(n).then((function(e){D("".concat(e.name," has been added"),"success"),r(t.concat(e)),v(""),C("")})).catch((function(e){console.log(e.response.data),D(e.response.data.error,"error")}))},handleNameChange:function(e){return v(e.target.value)},handleNumberChange:function(e){return C(e.target.value)}}),Object(l.jsx)("h2",{children:"Numbers"}),Object(l.jsx)("ul",{children:t.map((function(e){return Object(l.jsx)(h,{person:e,deleteRecord:function(){return function(e,n){if(window.confirm("Delete ".concat(n,"?"))){var c=t.filter((function(n){return n.id!==e}));d.deleteEntry(e).then((function(){return r(c)})).catch((function(e){D("Information of ".concat(n," has already been removed from server"),"error")}))}}(e.id,e.name)}},e.name)}))})]})};t(38);c.a.render(Object(l.jsx)(m,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.eab6edf0.chunk.js.map