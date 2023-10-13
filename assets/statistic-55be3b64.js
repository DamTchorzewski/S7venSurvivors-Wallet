import{t as S,r as p,u as M,v as D,j as e}from"./index-ac148e25.js";import{n as u}from"./index.browser-7e542916.js";const I="_container_1hv2z_10",z="_expensesList_1hv2z_15",T="_expensesListColumnName_1hv2z_26",k="_transactionList_1hv2z_35",F="_transactionListElement_1hv2z_38",w="_sum_1hv2z_47",B="_category_1hv2z_50",A="_totalList_1hv2z_56",Y="_totalListElement_1hv2z_62",J="_totalListElementText_1hv2z_66",O="_totalListElementExpenses_1hv2z_72",P="_totalListElementIncome_1hv2z_79",s={container:I,expensesList:z,expensesListColumnName:T,transactionList:k,transactionListElement:F,sum:w,category:B,totalList:A,totalListElement:Y,totalListElementText:J,totalListElementExpenses:O,totalListElementIncome:P},V="_wrapper_1a5br_1",U="_selectBtn_1a5br_20",$="_selectBtnActive_1a5br_21",q="_optionsContainer_1a5br_59",H="_options_1a5br_59",R="_option_1a5br_59",G="_backdrop_1a5br_103",o={wrapper:V,selectBtn:U,selectBtnActive:$,optionsContainer:q,options:H,option:R,backdrop:G},f=({placeholder:_,type:b,setDate:L})=>{const{transactions:r}=S(),[g,l]=p.useState([]),[m,y]=p.useState(!1),[C,v]=p.useState(`${_}`),c=M();p.useEffect(()=>{c(D())},[c]),p.useEffect(()=>{l(r)},[r]);const i=()=>{const a=[];g.map(({date:h})=>{a.push(h.year)});const n=[...new Set(a)].sort(),d=[];return n.map(h=>{d.push({date:`${h}`})}),d},j=()=>{const a=[];g.map(({date:h})=>{a.push(h.month)});const n=[...new Set(a)].sort(),d=[];return n.map(h=>{d.push({date:`${h}`})}),d},N=i(),x=j(),E=()=>{y(!m)},t=a=>{const n=a.innerText;v(n),L(n),y(!m)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:o.wrapper,children:[e.jsx("div",{onClick:E,className:m===!1?o.selectBtn:o.selectBtnActive,children:e.jsx("span",{children:C})}),m&&e.jsx("div",{className:o.optionsContainer,children:e.jsx("ul",{className:o.options,children:b==="year"&&N.length>0?N.map(({date:a})=>e.jsx("li",{onClick:n=>t(n.target),className:o.option,children:e.jsx("span",{children:a})},u())):b==="month"&&x.length>0?x.map(({date:a})=>{const n=new Array("0","January","February","March","April","May","June","July","August","September","October","November","December");return e.jsx("li",{onClick:d=>t(d.target),className:o.option,children:e.jsx("span",{children:n[parseInt(a)]})},u())}):x==[]?e.jsx("li",{className:o.option,children:e.jsx("span",{className:o.nodata,children:"No data."})},u()):N==[]?e.jsx("li",{className:o.option,children:e.jsx("span",{className:o.nodata,children:"No data."})},u()):e.jsx("li",{className:o.option,children:e.jsx("span",{className:o.nodata,children:"No data."})},u())})})]}),m&&e.jsx("div",{className:o.backdrop,onClick:E})]})},K=({transactions:_})=>{const b={"Main expenses":"rgba(254, 208, 87, 1)",Products:"rgba(255, 216, 208, 1)",Car:"rgba(253, 148, 152, 1)","Self care":"rgba(197, 186, 255, 1)","Child care":"rgba(110, 120, 232, 1)","Household products":"rgba(74, 86, 226, 1)",Education:"rgba(129, 225, 255, 1)",Leisure:"rgba(36, 204, 167, 1)","Other expenses":"rgba(0, 173, 132, 1)",Entertainment:"rgba(203, 242, 111, 1)"},L=t=>({January:"01",February:"02",March:"03",April:"04",May:"05",June:"06",July:"07",August:"08",September:"09",October:"10",November:"11",December:"12"})[t],[r,g]=p.useState(""),[l,m]=p.useState(""),y=t=>{const a=L(t);g(a)},C=t=>{m(t)},v=_.filter(t=>r&&l?t.date.month===r&&t.date.year===l:t),c={};let i=0;v.forEach(t=>{const a=t.category,n=parseFloat(t.sum);a!=="Income"&&(isNaN(n)||(c[a]?c[a]+=n:c[a]=n)),a==="Income"&&(!r&&!l&&(i+=n),t.date.month===r&&t.date.year===l&&(i+=n),t.date.month===r&&!l&&(i+=n),t.date.year===l&&!r&&(i+=n))});let j=0;for(const t in c)c.hasOwnProperty(t)&&(j+=c[t]);const N=[...new Set(v.filter(t=>t.category!=="Income").map(t=>t.category))],x=(i-parseFloat(j)).toFixed(2),E=x<0?"red":"black";return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:s.titleChartContainer,children:[e.jsx("h2",{className:s.titleStatistics,children:"Statistics"}),e.jsxs("div",{className:s.chartContainer,children:[Object.keys(c).length!==0?e.jsx(ChartComponent,{categorySums:c}):e.jsx("h2",{className:s.noDataInformation,children:"There are no expenses"}),Object.keys(c).length!==0?e.jsxs("span",{className:s.balanceValue,style:{color:E},children:["PLN ",x]}):e.jsx("p",{className:s.selectDataInformation,children:"Please select another date to see your expenses"})]})]}),e.jsxs("div",{className:s.tableDateContainer,children:[e.jsxs("div",{className:s.dateContainer,children:[e.jsx(f,{placeholder:"Month",type:"month",setDate:y}),e.jsx(f,{placeholder:"Year",type:"year",setDate:C})]}),e.jsxs("div",{className:s.tableContainer,children:[e.jsxs("table",{children:[e.jsx("thead",{className:s.theadStatistics,children:e.jsxs("tr",{children:[e.jsx("th",{children:"Category"}),e.jsx("th",{}),e.jsx("th",{children:"Sum"})]})}),e.jsx("tbody",{className:s.bodyStatisticsTable,children:N.map(t=>e.jsxs("tr",{children:[e.jsx("td",{className:s.categorySquare,style:{"--category-color":b[t]}}),e.jsx("td",{className:s.tableBodyCategory,children:t}),e.jsx("td",{className:s.tableBodySum,children:c[t].toFixed(2)})]},u()))})]}),e.jsxs("div",{className:s.sumUp,children:[e.jsxs("div",{className:s.containerExpensesIncome,children:[e.jsx("strong",{className:s.sumUpExpenses,children:"Expenses:"}),e.jsx("span",{className:s.expensesValue,children:j.toFixed(2)})]}),e.jsxs("div",{className:s.containerExpensesIncome,children:[e.jsx("strong",{className:s.sumUpIncome,children:"Income:"}),e.jsx("span",{className:s.IncomeValue,children:i.toFixed(2)})]})]})]})]})]})},X=()=>{const{transactions:_}=S();return e.jsx(e.Fragment,{children:e.jsx("div",{className:s.containerStatistics,children:e.jsx("div",{className:s.tabContainer,children:e.jsx(K,{transactions:_,className:s.DiagramTabContainer})})})})};export{X as default};