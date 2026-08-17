(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2341],{557:(e,t,a)=>{"use strict";a.d(t,{A:()=>p});var s=a(7876),i=a(4232),l=a(9099),r=a(8230),n=a.n(r),d=a(4844);let o=[{label:"Dashboard",icon:"bi-speedometer2",href:"/ess/dashboard"},{label:"My Leave",icon:"bi-calendar-check",href:"/ess/leave"},{label:"My Claims",icon:"bi-receipt",href:"/ess/claims"},{label:"My Overtime",icon:"bi-clock-history",href:"/ess/overtime"},{label:"My Expenses",icon:"bi-wallet2",href:"/ess/expenses"},{label:"My Payslips",icon:"bi-file-earmark-text",href:"/ess/payslips"},{label:"My KPIs",icon:"bi-bar-chart-line",href:"/ess/kpi"},{label:"My Profile",icon:"bi-person-circle",href:"/ess/profile"}];function c(){let e=(0,l.useRouter)(),t=(0,d.Z)();return(0,s.jsxs)("aside",{className:"sidebar",children:[(0,s.jsx)("div",{className:"sidebar-brand",children:t.sidebar_logo?(0,s.jsx)("img",{src:t.sidebar_logo,alt:"ATLINE",style:{maxHeight:38,maxWidth:"100%",objectFit:"contain"}}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"sidebar-brand-icon",children:(0,s.jsx)("i",{className:"bi bi-person-badge-fill"})}),(0,s.jsxs)("div",{className:"sidebar-brand-text",children:[(0,s.jsx)("strong",{children:"ATLINE"})," ",(0,s.jsx)("span",{style:{fontSize:11,color:"#9ca3af",display:"block",fontWeight:400},children:"Self-Service"})]})]})}),(0,s.jsx)("nav",{className:"sidebar-nav",children:(0,s.jsx)("div",{children:o.map(t=>{let a=e.pathname===t.href||e.pathname.startsWith(t.href+"/");return(0,s.jsx)(n(),{href:t.href,children:(0,s.jsxs)("div",{className:`nav-item ${a?"active":""}`,children:[(0,s.jsx)("i",{className:`bi ${t.icon} nav-item-icon`}),(0,s.jsx)("span",{children:t.label})]})},t.label)})})})]})}function p({children:e,breadcrumb:t=[]}){let a=(0,l.useRouter)(),[r,n]=(0,i.useState)(null),[d,o]=(0,i.useState)(!1),[m,h]=(0,i.useState)(!1);(0,i.useEffect)(()=>{fetch("/api/auth/me").then(e=>e.json()).then(e=>{e.success?"administrator"===e.user.user_type?a.replace("/dashboard"):n(e.user):a.replace("/login")}).catch(()=>a.replace("/login"))},[a]);let b=async()=>{o(!0);try{await fetch("/api/auth/logout",{method:"POST"})}catch{}a.replace("/login")},u=r?.name?.charAt(0).toUpperCase()??"S";return(0,s.jsxs)("div",{className:"admin-layout",children:[(0,s.jsx)(c,{}),(0,s.jsxs)("div",{className:"admin-main",children:[(0,s.jsxs)("header",{className:"admin-topbar",children:[(0,s.jsxs)("div",{className:"topbar-breadcrumb",children:[(0,s.jsx)("span",{children:"Employee Self-Service"}),t.map((e,t)=>(0,s.jsxs)("span",{children:[(0,s.jsx)("i",{className:"bi bi-chevron-right",style:{fontSize:10,margin:"0 2px"}}),(0,s.jsx)("span",{children:e})]},t))]}),(0,s.jsx)("div",{className:"topbar-actions",children:(0,s.jsxs)("div",{className:"topbar-user",children:[(0,s.jsx)("div",{className:"topbar-avatar",children:u}),(0,s.jsxs)("div",{className:"topbar-user-info",children:[(0,s.jsx)("strong",{children:r?.name??"—"}),(0,s.jsx)("span",{children:"Staff"})]}),(0,s.jsx)("button",{className:"topbar-logout",title:"Sign out",onClick:()=>h(!0),disabled:d,children:(0,s.jsx)("i",{className:"bi bi-box-arrow-right"})})]})})]}),(0,s.jsx)("main",{className:"admin-content",children:r?e:(0,s.jsxs)("div",{style:{textAlign:"center",padding:"64px 0",color:"#9ca3af",fontSize:13},children:[(0,s.jsx)("div",{className:"spinner-border spinner-border-sm text-secondary me-2"})," Loading…"]})})]}),m&&(0,s.jsx)("div",{className:"rm-modal-overlay",children:(0,s.jsxs)("div",{className:"rm-modal",onClick:e=>e.stopPropagation(),children:[(0,s.jsx)("div",{className:"rm-modal-icon",style:{background:"#fef3c7"},children:(0,s.jsx)("i",{className:"bi bi-box-arrow-right",style:{color:"#d97706"}})}),(0,s.jsx)("h3",{children:"Sign Out?"}),(0,s.jsx)("p",{children:"You will be redirected to the login page."}),(0,s.jsxs)("div",{className:"rm-modal-actions",children:[(0,s.jsx)("button",{className:"rm-btn-outline",onClick:()=>h(!1),disabled:d,children:"Cancel"}),(0,s.jsx)("button",{className:"rm-btn-primary",onClick:b,disabled:d,style:{background:"#d97706",borderColor:"#d97706"},children:d?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{className:"spinner-border spinner-border-sm me-1"})," Signing out..."]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("i",{className:"bi bi-box-arrow-right"})," Sign Out"]})})]})]})})]})}},1437:(e,t,a)=>{"use strict";a.d(t,{o:()=>l});let s=e=>String(e??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),i=e=>Number(e||0).toLocaleString("en-MY",{minimumFractionDigits:2});function l(e,t){let a,l=e.company||{},r=new Date,n=t?t(r,!0):`${r.toLocaleDateString("en-GB")}, ${r.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}`,d=[];d.push(`<tr><td>Gaji Asas / Basic Salary</td><td class="r">${i(e.basic_salary)}</td></tr>`),Number(e.allowances)>0&&d.push(`<tr><td>Elaun / Allowances</td><td class="r">${i(e.allowances)}</td></tr>`),Number(e.bonus)>0&&d.push(`<tr><td>Bonus</td><td class="r">${i(e.bonus)}</td></tr>`),Number(e.commission)>0&&d.push(`<tr><td>Komisen / Commission</td><td class="r">${i(e.commission)}</td></tr>`),Number(e.overtime)>0&&d.push(`<tr><td>Kerja Lebih Masa / Overtime</td><td class="r">${i(e.overtime)}</td></tr>`),Number(e.claims)>0&&d.push(`<tr><td>Tuntutan / Claims</td><td class="r">${i(e.claims)}</td></tr>`);let o=[];o.push(`<tr><td>KWSP Pekerja / EPF Employee</td><td class="r">${i(e.epf_employee)}</td></tr>`),o.push(`<tr><td>PERKESO Pekerja / SOCSO Employee</td><td class="r">${i(e.socso_employee)}</td></tr>`),o.push(`<tr><td>SIP / EIS</td><td class="r">${i(e.eis_employee)}</td></tr>`),Number(e.loan_deduction)>0&&o.push(`<tr><td>Pinjaman / Loan</td><td class="r">${i(e.loan_deduction)}</td></tr>`),Number(e.advance_deduction)>0&&o.push(`<tr><td>Pendahuluan / Advance</td><td class="r">${i(e.advance_deduction)}</td></tr>`);let c=Math.max(d.length,o.length);for(;d.length<c;)d.push('<tr><td>&nbsp;</td><td class="r"></td></tr>');for(;o.length<c;)o.push('<tr><td>&nbsp;</td><td class="r"></td></tr>');let p=l.logo?`<img src="${s(l.logo)}" alt="logo" style="max-height:54px;max-width:160px;object-fit:contain;" />`:`<div style="font-size:18px;font-weight:600;color:#1e3a8a;">${s(l.name)}</div>`,m=`<!doctype html><html><head><meta charset="utf-8" />
<title>Payslip ${s(e.payslip_no)}</title>
<style>
  @page { size: A5 landscape; margin: 8mm; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  html, body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  body { font-family: Arial, Helvetica, sans-serif; color: #1f2937; margin: 0; font-size: 10px; }
  .sheet { width: 100%; }
  .top { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #1e3a8a; padding-bottom: 8px; margin-bottom: 8px; }
  .co-right { text-align: right; font-size: 9px; color: #374151; line-height: 1.5; }
  .co-name { font-size: 13px; font-weight: 700; color: #111827; }
  .title-bar { background: #1e3a8a; color: #fff; text-align: center; font-weight: 600; padding: 6px; letter-spacing: 1px; font-size: 11px; margin-bottom: 8px; }
  table { width: 100%; border-collapse: collapse; }
  .info td { padding: 3px 6px; font-size: 9.5px; vertical-align: top; }
  .info .lbl { color: #6b7280; width: 22%; }
  .info .val { color: #111827; width: 28%; }
  .grid { display: flex; gap: 0; margin-top: 8px; border: 1px solid #c7d2fe; }
  .col { width: 50%; }
  .col + .col { border-left: 1px solid #c7d2fe; }
  .col-head { background: #1e3a8a; color: #fff; font-weight: 600; padding: 5px 8px; font-size: 10px; display: flex; justify-content: space-between; }
  .lines td { padding: 4px 8px; font-size: 9.5px; border-bottom: 1px solid #eef2ff; }
  .lines td.r { text-align: right; }
  .subtotal { background: #eef2ff; font-weight: 600; }
  .subtotal td { padding: 5px 8px; font-size: 10px; }
  .net-bar { background: #15803d; color: #fff; display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; margin-top: 8px; font-weight: 700; font-size: 13px; }
  .emp-ref { background: #eef2ff; border: 1px solid #c7d2fe; margin-top: 8px; padding: 6px 10px; font-size: 8.5px; color: #1e3a8a; text-align: center; line-height: 1.6; }
  .foot { display: flex; justify-content: space-between; margin-top: 6px; font-size: 7.5px; color: #6b7280; }
  .printed { text-align: center; font-size: 7.5px; color: #9ca3af; margin-top: 4px; }
</style></head><body onload="window.print()">
<div class="sheet">
  <div class="top">
    <div>${p}</div>
    <div class="co-right">
      <div class="co-name">${s(l.name)}</div>
      <div>${s(l.address)}</div>
      <div>Tel: ${s(l.phone)} | Email: ${s(l.email)}</div>
      ${l.reg_no?`<div>SSM: ${s(l.reg_no)}</div>`:""}
    </div>
  </div>

  <div class="title-bar">SLIP GAJI / PAY SLIP</div>

  <table class="info">
    <tr>
      <td class="lbl">Nama / Name:</td><td class="val">${s(e.employee_name)}</td>
      <td class="lbl">Jabatan / Department:</td><td class="val">${s(e.department_name||"—")}</td>
    </tr>
    <tr>
      <td class="lbl">No. K/P / IC No:</td><td class="val">${s(e.nric_passport||"—")}</td>
      <td class="lbl">Tempoh Gaji / Pay Period:</td><td class="val">${s(e.period_name)}</td>
    </tr>
    <tr>
      <td class="lbl">No. Pekerja / Employee No:</td><td class="val">${s(e.employee_code||"—")}</td>
      <td class="lbl">Tarikh Bayaran / Payment Date:</td><td class="val">${(a=e.period_pay_date,t?t(a):function(e){if(!e)return"—";let t=new Date(e);return isNaN(t.getTime())?String(e):t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"})}(a))}</td>
    </tr>
    <tr>
      <td class="lbl">No. Slip Gaji / Payslip No:</td><td class="val">${s(e.payslip_no)}</td>
      <td class="lbl">Bank / Akaun:</td><td class="val">${s(e.bank_name||"—")}${e.bank_account_no?` (${s(e.bank_account_no)})`:""}</td>
    </tr>
  </table>

  <div class="grid">
    <div class="col">
      <div class="col-head"><span>PEROLEHAN / EARNINGS</span><span>RM</span></div>
      <table class="lines"><tbody>${d.join("")}</tbody></table>
      <table class="lines"><tbody><tr class="subtotal"><td>Jumlah Perolehan Kasar / Gross Salary</td><td class="r">${i(e.gross_salary)}</td></tr></tbody></table>
    </div>
    <div class="col">
      <div class="col-head"><span>POTONGAN / DEDUCTIONS</span><span>RM</span></div>
      <table class="lines"><tbody>${o.join("")}</tbody></table>
      <table class="lines"><tbody><tr class="subtotal"><td>Jumlah Potongan / Total Deductions</td><td class="r">${i(e.total_deductions)}</td></tr></tbody></table>
    </div>
  </div>

  <div class="net-bar"><span>GAJI BERSIH / NET SALARY</span><span>RM ${i(e.net_salary)}</span></div>

  <div class="emp-ref">
    <strong>CARUMAN MAJIKAN / EMPLOYER CONTRIBUTIONS (Untuk Rujukan / For Reference)</strong><br/>
    KWSP Majikan / EPF Employer: RM ${i(e.epf_employer)} &nbsp;&nbsp;|&nbsp;&nbsp;
    PERKESO Majikan / SOCSO Employer: RM ${i(e.socso_employer)} &nbsp;&nbsp;|&nbsp;&nbsp;
    SIP / EIS Employer: RM ${i(e.eis_employer)}
  </div>

  <div class="foot">
    <span>* Slip gaji ini dijana secara automatik dan tidak memerlukan tandatangan.</span>
    <span>* This payslip is computer-generated and does not require a signature.</span>
  </div>
  <div class="printed">Dicetak pada / Printed on: ${n}</div>
</div>
</body></html>`,h=window.open("","_blank","width=900,height=650");h?(h.document.open(),h.document.write(m),h.document.close()):alert("Please allow pop-ups to print the payslip.")}},1440:(e,t,a)=>{"use strict";a.d(t,{N:()=>o});var s=a(4232);let i={dateFormat:"DD MMM YYYY",timeFormat:"12h",timezone:"Asia/Kuala_Lumpur"},l=null,r=null;async function n(){return l||r||(r=fetch("/api/config/date-format").then(e=>e.json()).then(e=>(l=e.success?e.data:i,r=null,l)).catch(()=>(r=null,i)))}let d=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function o(){let[e,t]=(0,s.useState)(i);return(0,s.useEffect)(()=>{n().then(t)},[]),{fmt:(0,s.useCallback)((t,a=!1)=>(function(e,t,a){if(!e)return"—";let s="string"==typeof e?new Date(e):e;if(isNaN(s.getTime()))return"—";let i=String(s.getDate()).padStart(2,"0"),l=s.getMonth(),r=s.getFullYear(),n="";switch(t.dateFormat){case"DD MMM YYYY":default:n=`${i} ${d[l]} ${r}`;break;case"DD/MM/YYYY":n=`${i}/${String(l+1).padStart(2,"0")}/${r}`;break;case"YYYY-MM-DD":n=`${r}-${String(l+1).padStart(2,"0")}-${i}`;break;case"MM/DD/YYYY":n=`${String(l+1).padStart(2,"0")}/${i}/${r}`}if(!a)return n;let o=s.getHours(),c=String(s.getMinutes()).padStart(2,"0"),p="";return p="24h"===t.timeFormat?`${String(o).padStart(2,"0")}:${c}`:`${o%12||12}:${c} ${o<12?"am":"pm"}`,`${n}, ${p}`})(t,e,a),[e]),fmtTime:(0,s.useCallback)(t=>{if(!t)return"—";let a="string"==typeof t?new Date(t):t;if(isNaN(a.getTime()))return"—";let s=a.getHours(),i=String(a.getMinutes()).padStart(2,"0");return"24h"===e.timeFormat?`${String(s).padStart(2,"0")}:${i}`:`${s%12||12}:${i} ${s<12?"am":"pm"}`},[e]),config:e}}},4674:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/ess/payslips",function(){return a(6936)}])},6936:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>p});var s=a(7876),i=a(4232),l=a(7328),r=a.n(l),n=a(557),d=a(1437),o=a(1440);let c={Draft:"badge-status pr-badge-draft",Approved:"badge-approved",Paid:"badge-status pr-badge-paid"};function p(){let{fmt:e}=(0,o.N)(),[t,a]=(0,i.useState)([]),[l,p]=(0,i.useState)(!0),m=(0,i.useCallback)(async()=>{p(!0);try{let e=await (await fetch("/api/ess/payslips")).json();e.success&&a(e.data)}catch{}finally{p(!1)}},[]);(0,i.useEffect)(()=>{m()},[m]);let h=e=>Number(e||0).toLocaleString("en-MY",{minimumFractionDigits:2}),b=async t=>{let a=await (await fetch(`/api/ess/payslips?id=${t}`)).json();a.success?(0,d.o)(a.data,e):alert(a.message||"Failed to load payslip.")};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r(),{children:(0,s.jsx)("title",{children:"My Payslips | ATLINE Self-Service"})}),(0,s.jsx)(n.A,{breadcrumb:["My Payslips"],children:(0,s.jsx)("div",{className:"card border-0 shadow-sm",style:{borderRadius:12},children:(0,s.jsxs)("div",{className:"card-body",style:{padding:24},children:[(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsx)("h1",{className:"page-title",children:"My Payslips"}),(0,s.jsx)("p",{className:"page-subtitle",children:"View and print your monthly payslips."})]}),(0,s.jsx)("div",{className:"rm-table-wrap",children:(0,s.jsxs)("table",{className:"rm-table",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"rm-th-module",children:"Payslip No."}),(0,s.jsx)("th",{className:"rm-th-module",children:"Period"}),(0,s.jsx)("th",{className:"rm-th-perm",children:"Gross (RM)"}),(0,s.jsx)("th",{className:"rm-th-perm",children:"Deductions (RM)"}),(0,s.jsx)("th",{className:"rm-th-perm",children:"Net (RM)"}),(0,s.jsx)("th",{className:"rm-th-perm",children:"Status"}),(0,s.jsx)("th",{className:"rm-th-perm",children:"Actions"})]})}),(0,s.jsx)("tbody",{children:l?(0,s.jsx)("tr",{children:(0,s.jsxs)("td",{colSpan:7,style:{textAlign:"center",padding:32,color:"#9ca3af",fontSize:13},children:[(0,s.jsx)("div",{className:"spinner-border spinner-border-sm text-secondary me-2"})," Loading..."]})}):0===t.length?(0,s.jsx)("tr",{children:(0,s.jsxs)("td",{colSpan:7,style:{textAlign:"center",padding:40,color:"#9ca3af",fontSize:13},children:[(0,s.jsx)("i",{className:"bi bi-file-earmark-text",style:{fontSize:28,display:"block",marginBottom:8}}),"No payslips available yet."]})}):t.map(e=>(0,s.jsxs)("tr",{className:"rm-data-row",children:[(0,s.jsx)("td",{className:"rm-td-module",style:{fontFamily:"monospace",fontSize:12,color:"#6b7280"},children:e.payslip_no}),(0,s.jsx)("td",{className:"rm-td-module",style:{color:"#1f2937"},children:e.period_name}),(0,s.jsx)("td",{className:"rm-td-perm",style:{textAlign:"right",fontSize:13,color:"#1f2937"},children:h(e.gross_salary)}),(0,s.jsx)("td",{className:"rm-td-perm",style:{textAlign:"right",fontSize:13,color:"#dc2626"},children:h(e.total_deductions)}),(0,s.jsx)("td",{className:"rm-td-perm",style:{textAlign:"right",fontSize:13,color:"#16a34a"},children:h(e.net_salary)}),(0,s.jsx)("td",{className:"rm-td-perm",style:{textAlign:"center"},children:(0,s.jsx)("span",{className:c[e.status]||"badge-pending",children:e.status})}),(0,s.jsx)("td",{className:"rm-td-perm",children:(0,s.jsx)("div",{className:"d-flex gap-2 justify-content-center",children:(0,s.jsx)("button",{className:"rm-action-btn rm-action-view",title:"Print A5",onClick:()=>b(e.id),children:(0,s.jsx)("i",{className:"bi bi-printer-fill"})})})})]},e.id))})]})})]})})})]})}}},e=>{e.O(0,[8230,636,6593,8792],()=>e(e.s=4674)),_N_E=e.O()}]);