import{b as p,r as h,j as s,c as v,a as N,g as E,_ as S,M as g}from"./index-f346f1a1.js";const F="/S7venSurvivors-Wallet/assets/pen-e154585a.svg",n={};let j=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce((a,t)=>(t&=63,t<36?a+=t.toString(36):t<62?a+=(t-26).toString(36).toUpperCase():t>62?a+="-":a+="_",a),"");const M=({type:e,onClose:a,id:t,updateDashboard:x})=>{const o=p(),[r,l]=h.useState(),i=c=>{const d=c.target.value.toString(),u=d.substr(8,2),b=d.substr(5,2),C=d.substr(0,4);l({...r,date:{day:u,month:b,year:C},id:t})},m=c=>{c.preventDefault();const d=r.id;o(v({id:d,body:r})),x(r),a()};return s.jsxs("div",{className:n.modalWrapper,children:[s.jsxs("section",{className:n.wrapper,children:[s.jsx("h2",{className:n.header,children:"Edit transaction"}),s.jsxs("div",{className:n.sliderContainer,children:[e==="+"?s.jsx("span",{className:n.greenText,children:"Income"}):s.jsx("span",{className:n.greyText,children:"Income"}),s.jsx("span",{className:n.greyText,children:"/"}),e==="+"?s.jsx("span",{className:n.greyText,children:"Expense"}):s.jsx("span",{className:n.redText,children:"Expense"})]}),s.jsx("form",{onSubmit:m,className:n.Form,children:s.jsx("section",{className:n.modalForm,children:s.jsxs("label",{name:"addTransForm",children:[e==="+"?s.jsx(s.Fragment,{}):s.jsx(SelectMenuModal,{onClick:c=>l({...r,category:c,id:t}),placeholder:"Select a category"}),s.jsxs("div",{className:n.formWrapper,children:[s.jsx("input",{type:"number",name:"sum",onChange:c=>l({...r,sum:c.target.value,id:t}),placeholder:"0.00",className:n.formValue}),s.jsx("input",{type:"date",name:"date",onChange:i,className:n.formDate})]}),s.jsx("input",{type:"text",placeholder:"Comment",name:"comment",onChange:c=>l({...r,comment:c.target.value,id:t}),className:n.formComment}),s.jsx("ul",{className:n.modalList,children:s.jsx("li",{children:s.jsx("button",{className:n.closeButton,onClick:a})})})]})})})]}),s.jsx("div",{className:n.shadow,onClick:a})]})},f=({id:e,type:a,updateDashboard:t})=>{const[x,o]=h.useState(!1),r=()=>{o(!0)},l=i=>{i&&i.preventDefault(),o(!1)};return s.jsxs(s.Fragment,{children:[s.jsx("img",{className:styles.ico,src:F,alt:"edit",onClick:r}),x&&s.jsx(M,{type:a,id:e,onClose:l,updateDashboard:t})]})},T=e=>{const a=parseInt(e.day);return a<10?`0${a}`:a},y=e=>{const a=parseInt(e.month);return a<10?`0${a}`:a},D=e=>e.year.substr(2,2),w=()=>{const{transactions:e,isTransactionsLoading:a}=N(),[t,x]=h.useState([]),o=p();h.useEffect(()=>{o(E())},[o]),h.useEffect(()=>{x(e)},[e]);const r=l=>{x(l)};return s.jsx(s.Fragment,{children:t.length?s.jsx(s.Fragment,{children:s.jsxs("table",{className:styles.dashboardClass,children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Date"}),s.jsx("th",{children:"Type"}),s.jsx("th",{children:"Category"}),s.jsx("th",{children:"Comment"}),s.jsx("th",{children:"Sum"}),s.jsx("th",{})]})}),s.jsx("tbody",{className:styles.dashboardClassBody,children:t.map(({_id:l,date:i,type:m,category:c,comment:d,sum:u})=>s.jsxs("tr",{children:[s.jsxs("td",{children:[T(i),".",y(i),".",D(i)]}),s.jsx("td",{children:m}),s.jsx("td",{children:c}),s.jsx("td",{children:d}),m=="+"?s.jsx("td",{className:styles.green,children:u}):s.jsx("td",{className:styles.red,children:u}),s.jsx("td",{children:s.jsx("span",{className:styles.buttonContainer,children:s.jsx(f,{id:l,type:m,updateDashboard:r})})})]},l??j()))})]})}):a?null:s.jsx("h2",{children:"There are no transactions"})})},I=()=>{const{transactions:e,isTransactionsLoading:a}=N(),[t,x]=h.useState([]),o=p();h.useEffect(()=>{o(E())},[o]),h.useEffect(()=>{x(e)},[e]);const r=l=>{x(l)};return s.jsx(s.Fragment,{children:t.length?s.jsx("div",{className:css.wrapper,children:t.map(({_id:l,date:i,type:m,category:c,comment:d,sum:u})=>s.jsx(s.Fragment,{children:s.jsx("div",{className:css.element,children:s.jsxs("ul",{className:m==="+"?css.greenElementList:css.redElementList,children:[s.jsxs("li",{className:css.listElement,children:[s.jsx("span",{className:css.listElementTitle,children:"Date"}),s.jsxs("span",{children:[T(i),".",y(i),".",D(i)]})]},j()),s.jsxs("li",{className:css.listElement,children:[s.jsx("span",{className:css.listElementTitle,children:"Type"}),s.jsx("span",{children:m})]},j()),s.jsxs("li",{className:css.listElement,children:[s.jsx("span",{className:css.listElementTitle,children:"Category"}),s.jsx("span",{children:c})]},j()),s.jsxs("li",{className:css.listElement,children:[s.jsx("span",{className:css.listElementTitle,children:"Comment"}),s.jsx("span",{children:d.length>15?d.substr(0,15)+"...":d})]},j()),s.jsxs("li",{className:css.listElement,children:[s.jsx("span",{className:css.listElementTitle,children:"Sum"}),s.jsx("span",{className:m==="+"?css.green:css.red,children:u})]},j()),s.jsx("li",{className:css.listElement,children:s.jsxs("ul",{className:css.editList,children:[s.jsx("li",{children:s.jsx(f,{id:l,type:m,updateDashboard:r})}),s.jsx("li",{children:s.jsx("span",{children:"Edit"})})]})},j())]})},l??j())}))}):a?null:s.jsx("h2",{children:"There are no transactions"})})},L=h.lazy(()=>S(()=>import("./Currency-4ed993c7.js"),[])),k=()=>s.jsxs(s.Fragment,{children:[s.jsx(g,{queries:{medium:"(min-width: 769px)"},children:e=>e.medium&&s.jsx(L,{})}),s.jsx(g,{queries:{small:"(max-width: 768px)",medium:"(min-width: 769px)"},children:e=>s.jsxs(h.Fragment,{children:[e.small&&s.jsx(I,{}),e.medium&&s.jsx(w,{})]})})]});export{k as default};
