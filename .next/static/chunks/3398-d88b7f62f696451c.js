"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3398],{1437:(e,a,t)=>{t.d(a,{o:()=>i});let s=e=>String(e??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),l=e=>Number(e||0).toLocaleString("en-MY",{minimumFractionDigits:2});function i(e,a){let t,i=e.company||{},n=new Date,d=a?a(n,!0):`${n.toLocaleDateString("en-GB")}, ${n.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}`,r=[];r.push(`<tr><td>Gaji Asas / Basic Salary</td><td class="r">${l(e.basic_salary)}</td></tr>`),Number(e.allowances)>0&&r.push(`<tr><td>Elaun / Allowances</td><td class="r">${l(e.allowances)}</td></tr>`),Number(e.bonus)>0&&r.push(`<tr><td>Bonus</td><td class="r">${l(e.bonus)}</td></tr>`),Number(e.commission)>0&&r.push(`<tr><td>Komisen / Commission</td><td class="r">${l(e.commission)}</td></tr>`),Number(e.overtime)>0&&r.push(`<tr><td>Kerja Lebih Masa / Overtime</td><td class="r">${l(e.overtime)}</td></tr>`),Number(e.claims)>0&&r.push(`<tr><td>Tuntutan / Claims</td><td class="r">${l(e.claims)}</td></tr>`);let o=[];o.push(`<tr><td>KWSP Pekerja / EPF Employee</td><td class="r">${l(e.epf_employee)}</td></tr>`),o.push(`<tr><td>PERKESO Pekerja / SOCSO Employee</td><td class="r">${l(e.socso_employee)}</td></tr>`),o.push(`<tr><td>SIP / EIS</td><td class="r">${l(e.eis_employee)}</td></tr>`),Number(e.loan_deduction)>0&&o.push(`<tr><td>Pinjaman / Loan</td><td class="r">${l(e.loan_deduction)}</td></tr>`),Number(e.advance_deduction)>0&&o.push(`<tr><td>Pendahuluan / Advance</td><td class="r">${l(e.advance_deduction)}</td></tr>`);let c=Math.max(r.length,o.length);for(;r.length<c;)r.push('<tr><td>&nbsp;</td><td class="r"></td></tr>');for(;o.length<c;)o.push('<tr><td>&nbsp;</td><td class="r"></td></tr>');let p=i.logo?`<img src="${s(i.logo)}" alt="logo" style="max-height:54px;max-width:160px;object-fit:contain;" />`:`<div style="font-size:18px;font-weight:600;color:#1e3a8a;">${s(i.name)}</div>`,m=`<!doctype html><html><head><meta charset="utf-8" />
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
      <div class="co-name">${s(i.name)}</div>
      <div>${s(i.address)}</div>
      <div>Tel: ${s(i.phone)} | Email: ${s(i.email)}</div>
      ${i.reg_no?`<div>SSM: ${s(i.reg_no)}</div>`:""}
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
      <td class="lbl">Tarikh Bayaran / Payment Date:</td><td class="val">${(t=e.period_pay_date,a?a(t):function(e){if(!e)return"—";let a=new Date(e);return isNaN(a.getTime())?String(e):a.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"})}(t))}</td>
    </tr>
    <tr>
      <td class="lbl">No. Slip Gaji / Payslip No:</td><td class="val">${s(e.payslip_no)}</td>
      <td class="lbl">Bank / Akaun:</td><td class="val">${s(e.bank_name||"—")}${e.bank_account_no?` (${s(e.bank_account_no)})`:""}</td>
    </tr>
  </table>

  <div class="grid">
    <div class="col">
      <div class="col-head"><span>PEROLEHAN / EARNINGS</span><span>RM</span></div>
      <table class="lines"><tbody>${r.join("")}</tbody></table>
      <table class="lines"><tbody><tr class="subtotal"><td>Jumlah Perolehan Kasar / Gross Salary</td><td class="r">${l(e.gross_salary)}</td></tr></tbody></table>
    </div>
    <div class="col">
      <div class="col-head"><span>POTONGAN / DEDUCTIONS</span><span>RM</span></div>
      <table class="lines"><tbody>${o.join("")}</tbody></table>
      <table class="lines"><tbody><tr class="subtotal"><td>Jumlah Potongan / Total Deductions</td><td class="r">${l(e.total_deductions)}</td></tr></tbody></table>
    </div>
  </div>

  <div class="net-bar"><span>GAJI BERSIH / NET SALARY</span><span>RM ${l(e.net_salary)}</span></div>

  <div class="emp-ref">
    <strong>CARUMAN MAJIKAN / EMPLOYER CONTRIBUTIONS (Untuk Rujukan / For Reference)</strong><br/>
    KWSP Majikan / EPF Employer: RM ${l(e.epf_employer)} &nbsp;&nbsp;|&nbsp;&nbsp;
    PERKESO Majikan / SOCSO Employer: RM ${l(e.socso_employer)} &nbsp;&nbsp;|&nbsp;&nbsp;
    SIP / EIS Employer: RM ${l(e.eis_employer)}
  </div>

  <div class="foot">
    <span>* Slip gaji ini dijana secara automatik dan tidak memerlukan tandatangan.</span>
    <span>* This payslip is computer-generated and does not require a signature.</span>
  </div>
  <div class="printed">Dicetak pada / Printed on: ${d}</div>
</div>
</body></html>`,u=window.open("","_blank","width=900,height=650");u?(u.document.open(),u.document.write(m),u.document.close()):alert("Please allow pop-ups to print the payslip.")}},1440:(e,a,t)=>{t.d(a,{N:()=>o});var s=t(4232);let l={dateFormat:"DD MMM YYYY",timeFormat:"12h",timezone:"Asia/Kuala_Lumpur"},i=null,n=null;async function d(){return i||n||(n=fetch("/api/config/date-format").then(e=>e.json()).then(e=>(i=e.success?e.data:l,n=null,i)).catch(()=>(n=null,l)))}let r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function o(){let[e,a]=(0,s.useState)(l);return(0,s.useEffect)(()=>{d().then(a)},[]),{fmt:(0,s.useCallback)((a,t=!1)=>(function(e,a,t){if(!e)return"—";let s="string"==typeof e?new Date(e):e;if(isNaN(s.getTime()))return"—";let l=String(s.getDate()).padStart(2,"0"),i=s.getMonth(),n=s.getFullYear(),d="";switch(a.dateFormat){case"DD MMM YYYY":default:d=`${l} ${r[i]} ${n}`;break;case"DD/MM/YYYY":d=`${l}/${String(i+1).padStart(2,"0")}/${n}`;break;case"YYYY-MM-DD":d=`${n}-${String(i+1).padStart(2,"0")}-${l}`;break;case"MM/DD/YYYY":d=`${String(i+1).padStart(2,"0")}/${l}/${n}`}if(!t)return d;let o=s.getHours(),c=String(s.getMinutes()).padStart(2,"0"),p="";return p="24h"===a.timeFormat?`${String(o).padStart(2,"0")}:${c}`:`${o%12||12}:${c} ${o<12?"am":"pm"}`,`${d}, ${p}`})(a,e,t),[e]),fmtTime:(0,s.useCallback)(a=>{if(!a)return"—";let t="string"==typeof a?new Date(a):a;if(isNaN(t.getTime()))return"—";let s=t.getHours(),l=String(t.getMinutes()).padStart(2,"0");return"24h"===e.timeFormat?`${String(s).padStart(2,"0")}:${l}`:`${s%12||12}:${l} ${s<12?"am":"pm"}`},[e]),config:e}}},3398:(e,a,t)=>{t.d(a,{A:()=>r});var s=t(7876),l=t(4232),i=t(1437),n=t(1440);let d={Draft:"badge-status pr-badge-draft",Approved:"badge-approved",Paid:"badge-status pr-badge-paid"};function r({id:e,onClose:a}){let{fmt:t}=(0,n.N)(),[o,c]=(0,l.useState)(null),[p,m]=(0,l.useState)(!0),[u,h]=(0,l.useState)("");(0,l.useEffect)(()=>{fetch(`/api/hr/payroll/payslips/${e}`).then(e=>e.json()).then(e=>{e.success?c(e.data):h(e.message||"Not found.")}).catch(()=>h("Failed to load.")).finally(()=>m(!1))},[e]);let x=e=>`RM ${Number(e||0).toLocaleString("en-MY",{minimumFractionDigits:2})}`;return(0,s.jsx)("div",{className:"usr-modal-overlay",children:(0,s.jsxs)("div",{className:"usr-modal",style:{maxWidth:640},children:[(0,s.jsxs)("div",{className:"usr-modal-header",children:[(0,s.jsx)("div",{children:(0,s.jsxs)("p",{className:"usr-modal-title",children:[(0,s.jsx)("i",{className:"bi bi-file-earmark-text",style:{marginRight:8}}),"Payslip Details"]})}),(0,s.jsx)("button",{className:"usr-modal-close",onClick:a,children:(0,s.jsx)("i",{className:"bi bi-x-lg"})})]}),(0,s.jsx)("div",{className:"usr-modal-body",children:p?(0,s.jsxs)("div",{style:{textAlign:"center",padding:"40px 0",color:"#9ca3af"},children:[(0,s.jsx)("div",{className:"spinner-border spinner-border-sm text-secondary me-2"})," Loading…"]}):u?(0,s.jsx)("div",{className:"alert alert-danger",style:{fontSize:13},children:u}):o&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"d-flex flex-wrap gap-4 mb-3",children:[(0,s.jsxs)("div",{style:{flex:"1 1 200px"},children:[(0,s.jsx)("div",{className:"pr-meta-label",children:"Payslip Number"}),(0,s.jsx)("div",{className:"pr-meta-value",style:{fontFamily:"monospace"},children:o.payslip_no})]}),(0,s.jsxs)("div",{style:{flex:"1 1 120px"},children:[(0,s.jsx)("div",{className:"pr-meta-label",children:"Status"}),(0,s.jsx)("span",{className:d[o.status]||"badge-pending",children:o.status})]})]}),(0,s.jsxs)("div",{className:"d-flex flex-wrap gap-4 mb-3",children:[(0,s.jsxs)("div",{style:{flex:"1 1 200px"},children:[(0,s.jsx)("div",{className:"pr-meta-label",children:"Employee"}),(0,s.jsx)("div",{className:"pr-meta-value",children:o.employee_name}),(0,s.jsx)("div",{style:{fontSize:12,color:"#9ca3af"},children:o.department_name||"—"})]}),(0,s.jsxs)("div",{style:{flex:"1 1 120px"},children:[(0,s.jsx)("div",{className:"pr-meta-label",children:"Period"}),(0,s.jsx)("div",{className:"pr-meta-value",children:o.period_name})]})]}),(0,s.jsx)("div",{className:"pr-sec-title",children:"Earnings"}),(0,s.jsxs)("div",{className:"pr-line",children:[(0,s.jsx)("span",{children:"Basic Salary"}),(0,s.jsx)("span",{children:x(o.basic_salary)})]}),(0,s.jsxs)("div",{className:"pr-line",children:[(0,s.jsx)("span",{children:"Allowances"}),(0,s.jsx)("span",{children:x(o.allowances)})]}),Number(o.bonus)>0&&(0,s.jsxs)("div",{className:"pr-line",children:[(0,s.jsx)("span",{children:"Bonus"}),(0,s.jsx)("span",{children:x(o.bonus)})]}),Number(o.commission)>0&&(0,s.jsxs)("div",{className:"pr-line",children:[(0,s.jsx)("span",{children:"Commission"}),(0,s.jsx)("span",{children:x(o.commission)})]}),Number(o.overtime)>0&&(0,s.jsxs)("div",{className:"pr-line",children:[(0,s.jsx)("span",{children:"Overtime"}),(0,s.jsx)("span",{children:x(o.overtime)})]}),Number(o.claims)>0&&(0,s.jsxs)("div",{className:"pr-line",children:[(0,s.jsx)("span",{children:"Claims Reimbursement"}),(0,s.jsx)("span",{children:x(o.claims)})]}),(0,s.jsxs)("div",{className:"pr-line pr-line-total",children:[(0,s.jsx)("span",{children:"Gross Salary"}),(0,s.jsx)("span",{style:{color:"#16a34a"},children:x(o.gross_salary)})]}),(0,s.jsx)("div",{className:"pr-sec-title",style:{marginTop:18},children:"Deductions"}),(0,s.jsxs)("div",{className:"pr-line",children:[(0,s.jsx)("span",{children:"EPF (Employee)"}),(0,s.jsxs)("span",{style:{color:"#dc2626"},children:["- ",x(o.epf_employee)]})]}),(0,s.jsxs)("div",{className:"pr-line",children:[(0,s.jsx)("span",{children:"SOCSO (Employee)"}),(0,s.jsxs)("span",{style:{color:"#dc2626"},children:["- ",x(o.socso_employee)]})]}),(0,s.jsxs)("div",{className:"pr-line",children:[(0,s.jsx)("span",{children:"EIS (Employee)"}),(0,s.jsxs)("span",{style:{color:"#dc2626"},children:["- ",x(o.eis_employee)]})]}),Number(o.loan_deduction)>0&&(0,s.jsxs)("div",{className:"pr-line",children:[(0,s.jsx)("span",{children:"Loan Deduction"}),(0,s.jsxs)("span",{style:{color:"#dc2626"},children:["- ",x(o.loan_deduction)]})]}),Number(o.advance_deduction)>0&&(0,s.jsxs)("div",{className:"pr-line",children:[(0,s.jsx)("span",{children:"Salary Advance"}),(0,s.jsxs)("span",{style:{color:"#dc2626"},children:["- ",x(o.advance_deduction)]})]}),(0,s.jsxs)("div",{className:"pr-line pr-line-total",children:[(0,s.jsx)("span",{children:"Total Deductions"}),(0,s.jsxs)("span",{style:{color:"#dc2626"},children:["- ",x(o.total_deductions)]})]}),(0,s.jsxs)("div",{className:"pr-net-box",children:[(0,s.jsx)("div",{className:"pr-net-label",children:"Net Salary (Take Home)"}),(0,s.jsxs)("div",{className:"pr-net-value",children:["RM ",Number(o.net_salary||0).toLocaleString("en-MY",{minimumFractionDigits:2})]})]})]})}),(0,s.jsxs)("div",{className:"usr-modal-footer",children:[(0,s.jsx)("button",{className:"rm-btn-outline",onClick:a,children:"Close"}),(0,s.jsxs)("button",{className:"rm-btn-primary",disabled:!o,onClick:()=>o&&(0,i.o)(o,t),children:[(0,s.jsx)("i",{className:"bi bi-printer-fill"})," Print Payslip"]})]})]})})}}}]);