import{r as p,j as e,u as f,o as w,q as b,t as D,v as L,M as $,B as I}from"./index-4991924c.js";const y={},B="/S7venSurvivors-Wallet/assets/pen-e154585a.svg",x={},C={};let g=(s=21)=>crypto.getRandomValues(new Uint8Array(s)).reduce((a,r)=>(r&=63,r<36?a+=r.toString(36):r<62?a+=(r-26).toString(36).toUpperCase():r>62?a+="-":a+="_",a),"");const _=({placeholder:s,onClick:a})=>{const u=[{category:"Main expenses"},{category:"Products"},{category:"Car"},{category:"Self care"},{category:"Child care"},{category:"Household products"},{category:"Education"},{category:"Leisure"},{category:"Entertainment"},{category:"Other expenses"}],[c,n]=p.useState(!1),[o,l]=p.useState(`${s}`),i=()=>{n(!c)},t=d=>{const j=d.innerText;return l(j),n(!c),a(j),j};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:C.wrapper,children:[e.jsx("div",{onClick:i,className:C.selectBtn,children:e.jsx("span",{children:o})}),c&&e.jsx("div",{className:C.optionsContainer,children:e.jsx("ul",{className:C.options,children:u.map(({category:d})=>e.jsx("li",{onClick:j=>t(j.target),className:C.option,children:e.jsx("span",{children:d})},g()))})})]}),c&&e.jsx("div",{className:C.backdrop,onClick:i,children:"a"})]})},V=({type:s,onClose:a,id:r,updateDashboard:u})=>{const c=f(),[n,o]=p.useState(),l=t=>{const d=t.target.value.toString(),j=d.substr(8,2),h=d.substr(5,2),N=d.substr(0,4);o({...n,date:{day:j,month:h,year:N},id:r})},i=t=>{t.preventDefault();const d=n.id;c(w({id:d,body:n})),u(n),a()};return e.jsxs("div",{className:x.modalWrapper,children:[e.jsxs("section",{className:x.wrapper,children:[e.jsx("h2",{className:x.header,children:"Edit transaction"}),e.jsxs("div",{className:x.sliderContainer,children:[s==="+"?e.jsx("span",{className:x.greenText,children:"Income"}):e.jsx("span",{className:x.greyText,children:"Income"}),e.jsx("span",{className:x.greyText,children:"/"}),s==="+"?e.jsx("span",{className:x.greyText,children:"Expense"}):e.jsx("span",{className:x.redText,children:"Expense"})]}),e.jsx("form",{onSubmit:i,className:x.Form,children:e.jsx("section",{className:x.modalForm,children:e.jsxs("label",{name:"addTransForm",children:[s==="+"?e.jsx(e.Fragment,{}):e.jsx(SelectMenuModal,{onClick:t=>o({...n,category:t,id:r}),placeholder:"Select a category"}),e.jsxs("div",{className:x.formWrapper,children:[e.jsx("input",{type:"number",name:"sum",onChange:t=>o({...n,sum:t.target.value,id:r}),placeholder:"0.00",className:x.formValue}),e.jsx("input",{type:"date",name:"date",onChange:l,className:x.formDate})]}),e.jsx("input",{type:"text",placeholder:"Comment",name:"comment",onChange:t=>o({...n,comment:t.target.value,id:r}),className:x.formComment}),e.jsx("ul",{className:x.modalList,children:e.jsx("li",{children:e.jsx("button",{className:x.closeButton,onClick:a})})})]})})})]}),e.jsx("div",{className:x.shadow,onClick:a})]})},v=({id:s,type:a,updateDashboard:r})=>{const[u,c]=p.useState(!1),n=()=>{c(!0)},o=l=>{l&&l.preventDefault(),c(!1)};return e.jsxs(e.Fragment,{children:[e.jsx("img",{className:styles.ico,src:B,alt:"edit",onClick:n}),u&&e.jsx(V,{type:a,id:s,onClose:o,updateDashboard:r})]})},P=()=>{const s=new Date().getDate();return s<10?`0${s}`:s},W=()=>{const s=new Date().getMonth()+1;return s<10?`0${s}`:s},T=s=>{const a=parseInt(s.day);return a<10?`0${a}`:a},E=s=>{const a=parseInt(s.month);return a<10?`0${a}`:a},S=s=>s.year.substr(2,2),A=()=>{const s=new Date().getFullYear();return console.log(s),s},Y=()=>{const{transactions:s,isTransactionsLoading:a}=b(),[r,u]=p.useState([]),c=f();p.useEffect(()=>{c(D())},[c]),p.useEffect(()=>{u(s)},[s]);const n=l=>{u(l)},o=l=>{const i=parseFloat(l),t={useGrouping:!0,minimumFractionDigits:2,maximumFractionDigits:2};return i.toLocaleString("pl-PL",t).replace(/,/g,".")};return e.jsx(e.Fragment,{children:r.length?e.jsx(e.Fragment,{children:e.jsxs("table",{className:y.dashboardClass,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Category"}),e.jsx("th",{children:"Comment"}),e.jsx("th",{children:"Sum"}),e.jsx("th",{})]})}),e.jsx("tbody",{className:y.dashboardClassBody,children:r.map(({_id:l,date:i,type:t,category:d,comment:j,sum:h})=>e.jsxs("tr",{children:[e.jsxs("td",{children:[T(i),".",E(i),".",S(i)]}),e.jsx("td",{children:t}),e.jsx("td",{children:d}),e.jsx("td",{children:j}),t=="+"?e.jsx("td",{className:y.green,children:o(h)}):e.jsx("td",{className:y.red,children:o(h)}),e.jsx("td",{children:e.jsx("span",{className:y.buttonContainer,children:e.jsx(v,{id:l,type:t,updateDashboard:n})})})]},l??g()))})]})}):a?null:e.jsx("div",{className:y.dashboardClass,children:e.jsx("h2",{children:"There are no transactions"})})})},q=()=>{const{transactions:s,isTransactionsLoading:a}=b(),[r,u]=p.useState([]),c=f();p.useEffect(()=>{c(D())},[c]),p.useEffect(()=>{u(s)},[s]);const n=o=>{u(o)};return e.jsx(e.Fragment,{children:r.length?e.jsx("div",{className:css.wrapper,children:r.map(({_id:o,date:l,type:i,category:t,comment:d,sum:j})=>e.jsx(e.Fragment,{children:e.jsx("div",{className:css.element,children:e.jsxs("ul",{className:i==="+"?css.greenElementList:css.redElementList,children:[e.jsxs("li",{className:css.listElement,children:[e.jsx("span",{className:css.listElementTitle,children:"Date"}),e.jsxs("span",{children:[T(l),".",E(l),".",S(l)]})]},g()),e.jsxs("li",{className:css.listElement,children:[e.jsx("span",{className:css.listElementTitle,children:"Type"}),e.jsx("span",{children:i})]},g()),e.jsxs("li",{className:css.listElement,children:[e.jsx("span",{className:css.listElementTitle,children:"Category"}),e.jsx("span",{children:t})]},g()),e.jsxs("li",{className:css.listElement,children:[e.jsx("span",{className:css.listElementTitle,children:"Comment"}),e.jsx("span",{children:d.length>15?d.substr(0,15)+"...":d})]},g()),e.jsxs("li",{className:css.listElement,children:[e.jsx("span",{className:css.listElementTitle,children:"Sum"}),e.jsx("span",{className:i==="+"?css.green:css.red,children:j})]},g()),e.jsx("li",{className:css.listElement,children:e.jsxs("ul",{className:css.editList,children:[e.jsx("li",{children:e.jsx(v,{id:o,type:i,updateDashboard:n})}),e.jsx("li",{children:e.jsx("span",{children:"Edit"})})]})},g())]})},o??g())}))}):a?null:e.jsx("h2",{children:"There are no transactions"})})},H="_homeContainer_3vnju_1",O={homeContainer:H},R="_buttonDiv_8lyt6_1",U="_btn_8lyt6_17",G={buttonDiv:R,btn:U},m={},z=({onCancel:s,onClose:a,onSubmit:r,onChangeValue:u,onChangeDate:c,onChangeComment:n,onChangeCategory:o,onChangeSliderPlus:l,onChangeSliderMinus:i})=>{const[t,d]=p.useState(!0),j=N=>d(!t),h=N=>{o(N)};return e.jsxs("div",{className:m.modalWrapper,children:[e.jsxs("section",{className:m.wrapper,children:[e.jsx("h2",{className:m.header,children:"Add transaction"}),e.jsxs("div",{className:m.sliderContainer,children:[t?e.jsx("span",{className:m.greyText,children:"Income"}):e.jsx("span",{className:m.greenText,children:"Income"}),e.jsxs("label",{className:m.switch,children:[e.jsx("input",{type:"checkbox",className:m.checkbox,name:"slider",value:t?"-":"+",onChange:t?l:i,onClick:j}),e.jsx("span",{className:m.slider})]}),t?e.jsx("span",{className:m.redText,children:"Expense"}):e.jsx("span",{className:m.greyText,children:"Expense"})]}),e.jsx("section",{className:m.modalForm,children:e.jsxs("form",{onSubmit:r,className:m.Form,children:[t?e.jsx(_,{onClick:h,placeholder:"Select a category"}):e.jsx(e.Fragment,{}),e.jsxs("div",{className:m.formWrapper,children:[e.jsx("input",{type:"number",name:"number",onChange:u,placeholder:"0.00",className:m.formValue}),e.jsx("input",{type:"date",name:"date",onChange:c,className:m.formDate})]}),e.jsx("textarea",{type:"textarea",maxLength:"100",name:"comment",onChange:n,placeholder:"Comment",className:m.formComment}),e.jsx("ul",{className:m.modalList,children:e.jsx("li",{children:e.jsx("button",{className:m.closeButton,onClick:a})})})]})})]}),e.jsx("div",{className:m.shadow,onClick:a})]})},J=({addDashboard:s})=>{const a=f(),[r,u]=p.useState(!1),[c,n]=p.useState(),o=h=>{const N=h.target.value.toString(),M=N.substr(8,2),F=N.substr(5,2),k=N.substr(0,4);n({...c,date:{day:M,month:F,year:k}})},l=()=>{n({type:"-",category:"Other expenses",date:{day:P(),month:W(),year:A()}}),u(!0)},i=h=>{h&&h.preventDefault(),n({}),u(!1)},t=()=>n({...c,type:"+",category:"Income"}),d=()=>n({...c,type:"-"}),j=h=>{h.preventDefault(),a(L(c)),s(c),u(!r)};return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,className:G.addButton}),r&&e.jsx(z,{onSubmit:j,onCancel:i,onClose:i,onChangeSliderPlus:t,onChangeSliderMinus:d,onChangeValue:h=>n({...c,sum:h.target.value}),onChangeDate:o,onChangeComment:h=>n({...c,comment:h.target.value}),onChangeCategory:h=>n({...c,category:h})})]})},Q=()=>e.jsxs("div",{className:O.homeContainer,children:[e.jsx($,{queries:{small:"(max-width: 767px)",medium:"(min-width: 768px)"},children:s=>e.jsxs(p.Fragment,{children:[s.small&&e.jsx(I,{}),s.small&&e.jsx(q,{}),s.medium&&e.jsx(Y,{})]})}),e.jsx(J,{})]});export{Q as default};
