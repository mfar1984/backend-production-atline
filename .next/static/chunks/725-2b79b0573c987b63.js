"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[725],{6808:(e,i,t)=>{t.d(i,{CH:()=>r,IO:()=>l,OG:()=>d,OT:()=>o,Yt:()=>p,_X:()=>n,f:()=>s,yS:()=>c});let s={work_order:["Draft","Assigned","In Progress","Completed","Approved","Fully Completed","Rejected","Cancelled"],service_case:["Open","Assigned","In Progress","Completed","Approved","Fully Completed","Rejected","Cancelled"]},n={work_order:"Draft",service_case:"Open"},a=["Completed"],l={work_order:["Draft","Assigned","In Progress","Completed","Cancelled"],service_case:["Open","Assigned","In Progress","Completed","Cancelled"]},r=["Approved","Fully Completed","Rejected"];function o(e){return"service_case"===e?"Service Case":"Work Order"}function d(e){return a.includes(e)}function p(e){return"Approved"===e}function c(e){return"Approved"===e||"Fully Completed"===e}},7032:(e,i,t)=>{t.d(i,{A:()=>r});var s=t(7876),n=t(4232),a=t(8477);function l({value:e}){let i=e.lastIndexOf("-");return i<0?(0,s.jsx)("span",{className:"fp-runno",children:e}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{className:"fp-refs-value",children:e.slice(0,i+1)}),(0,s.jsx)("span",{className:"fp-runno",children:e.slice(i+1)})]})}function r({data:e,onClose:i}){var t;let o,p,c,h,[m,f]=(0,n.useState)(null),[x,g]=(0,n.useState)(!1);(0,n.useEffect)(()=>{g(!0)},[]),(0,n.useEffect)(()=>{fetch("/api/operations/field/letterhead").then(e=>e.json()).then(e=>{e.success&&f(e.data)}).catch(()=>{})},[]),(0,n.useEffect)(()=>{let e=e=>{"Escape"===e.key&&i()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[i]);let b=!!e.filled,u=e.filled?.office,j=e.filled?.engineer,v=e.filled?.customer,w=e.form_no||(t=e.job_type,p=String((o=new Date).getFullYear()).slice(-2),c=String(o.getMonth()+1).padStart(2,"0"),h=String(o.getDate()).padStart(2,"0"),`${"service_case"===t?"SC":"WO"}-${p}${c}${h}-001`),y=e.contract_ref||"QT240000000024647",k=0,N=[];for(let i of e.items)N.push({item:i,no:++k});for(let i of e.groups)for(let e of i.items)N.push({item:e,no:++k,group:i.name});return x?(0,a.createPortal)((0,s.jsx)("div",{className:"fp-portal",children:(0,s.jsxs)("div",{className:"fp-overlay",onMouseDown:e=>{e.target===e.currentTarget&&i()},children:[(0,s.jsx)("style",{children:d}),(0,s.jsxs)("div",{className:"fp-shell",children:[(0,s.jsxs)("div",{className:"fp-toolbar",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{style:{fontSize:14},children:e.form_title}),(0,s.jsx)("span",{style:{fontSize:12,color:"#9ca3af",marginLeft:8},children:b?"Completed sheet":"Blank form preview — A4"})]}),(0,s.jsxs)("div",{className:"d-flex gap-2 align-items-center",children:[(0,s.jsxs)("button",{className:"rm-btn-outline",onClick:()=>window.print(),children:[(0,s.jsx)("i",{className:"bi bi-printer-fill"})," Print / Save as PDF"]}),(0,s.jsx)("button",{className:"usr-modal-close",onClick:i,"aria-label":"Close",children:(0,s.jsx)("i",{className:"bi bi-x-lg"})})]})]}),m?.incomplete?.length>0&&(0,s.jsxs)("div",{className:"fp-warn",children:[(0,s.jsx)("i",{className:"bi bi-exclamation-triangle-fill"}),(0,s.jsxs)("span",{children:["The company letterhead is incomplete or still contains placeholders (",m.incomplete.join(", "),"). Fix it under ",(0,s.jsx)("strong",{children:"Settings › Global Config › General"})," before sending this form to a customer."]})]}),(0,s.jsx)("div",{className:"fp-scroll",children:(0,s.jsxs)("div",{className:"fp-page",id:"fp-print-area",children:[(0,s.jsxs)("div",{className:"fp-refs",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"fp-refs-label",children:"Form No.:"})," ",(0,s.jsx)(l,{value:w})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"fp-refs-label",children:"Contract / Reference No.:"})," ",(0,s.jsx)("span",{className:"fp-refs-value",children:y})]})]}),(0,s.jsxs)("div",{className:"fp-head",children:[(0,s.jsx)("div",{className:"fp-logo",children:m?.logo?(0,s.jsx)("img",{src:m.logo,alt:m.company_name||"Company logo"}):(0,s.jsx)("div",{className:"fp-logo-fallback",children:m?.company_name||""})}),(0,s.jsxs)("div",{className:"fp-company",children:[(0,s.jsxs)("div",{className:"fp-company-name",children:[m?.company_name||"—",m?.reg_no?` (${m.reg_no})`:""]}),m?.address&&(0,s.jsx)("div",{children:m.address}),(0,s.jsxs)("div",{children:[m?.phone?`Tel: ${m.phone}`:"",m?.email?`  Email: ${m.email}`:""]}),m?.website&&(0,s.jsxs)("div",{children:["Website: ",m.website]})]})]}),(0,s.jsx)("div",{className:"fp-rule"}),(0,s.jsx)("div",{className:"fp-title",children:e.form_title}),(0,s.jsx)("div",{className:"fp-rule-thin"}),(0,s.jsx)("div",{className:"fp-section",children:"Customer's Information"}),(0,s.jsx)("table",{className:"fp-box",children:(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsxs)("td",{style:{width:"58%"},children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("b",{children:"Organization Name:"})," ",e.filled?.customer_name||""]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("b",{children:"Contact Person:"})," ",e.filled?.contact_name||""]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("b",{children:"Department:"})," ",e.filled?.contact_department||""]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("b",{children:"Tel. No.:"})," ",e.filled?.contact_phone||""]})]}),(0,s.jsxs)("td",{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("b",{children:"Service Date:"})," ",e.filled?.service_date||""]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("b",{children:"Commence time:"})," ",e.filled?.commence_at||""]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("b",{children:"Completed time:"})," ",e.filled?.completed_at||""]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("b",{children:"Attended by :"})," ",e.filled?.attended_by||""]})]})]})})}),(0,s.jsx)("div",{className:"fp-section",children:"Device Information"}),(0,s.jsxs)("div",{className:"fp-devgrid",children:[0===e.fields.length&&(0,s.jsx)("div",{className:"fp-empty",children:"No Device Information fields defined on this template."}),e.fields.map(e=>(0,s.jsxs)("div",{className:"fp-devrow",children:[(0,s.jsxs)("div",{className:"fp-devlabel",children:[e.label,":",e.is_required?(0,s.jsx)("span",{className:"fp-req",children:"*"}):null]}),(0,s.jsx)("div",{className:`fp-devbox${"textarea"===e.input_type?" fp-devbox-tall":""}`,children:e.value||""})]},e.field_key))]}),(0,s.jsx)("div",{className:"fp-section",children:"Details of the job performed:"}),(0,s.jsxs)("table",{className:"fp-table",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{style:{width:34},children:"No."}),(0,s.jsx)("th",{children:"Item"}),(0,s.jsx)("th",{style:{width:62},children:"Check"}),(0,s.jsx)("th",{style:{width:170},children:"Comment"})]})}),(0,s.jsxs)("tbody",{children:[N.map(({item:e,no:i,group:t},a)=>{let l=N[a-1],r=t&&(!l||l.group!==t);return(0,s.jsxs)(n.Fragment,{children:[r&&(0,s.jsx)("tr",{className:"fp-grouprow",children:(0,s.jsx)("td",{colSpan:4,children:t})}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{className:"fp-center",children:i}),(0,s.jsxs)("td",{children:[e.item,e.is_required?(0,s.jsx)("span",{className:"fp-req",children:" *"}):null]}),(0,s.jsx)("td",{className:"fp-center",children:e.is_done?"✓":""}),(0,s.jsx)("td",{children:e.remarks||""})]})]},`r-${i}`)}),Array.from({length:3}).map((e,i)=>(0,s.jsxs)("tr",{className:"fp-blank",children:[(0,s.jsx)("td",{children:"\xa0"}),(0,s.jsx)("td",{}),(0,s.jsx)("td",{}),(0,s.jsx)("td",{})]},`b-${i}`))]})]}),(0,s.jsx)("div",{className:"fp-section",children:"Customer Remarks:"}),e.filled?.customer_remarks?(0,s.jsx)("div",{className:"fp-remarks fp-fill",children:e.filled.customer_remarks}):(0,s.jsx)("div",{className:"fp-spacer"}),(0,s.jsxs)("table",{className:"fp-ack",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{style:{width:"34%"},children:"For Office Use Only"}),(0,s.jsx)("th",{style:{width:"33%"},children:"Engineer Acknowledgement"}),(0,s.jsx)("th",{children:"Customer Acknowledgement"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsxs)("td",{children:[(0,s.jsxs)("div",{children:["Invoice No: ",u?.invoice_no||""]}),(0,s.jsxs)("div",{children:["Hours Logged: ",u?.hours_logged||""]}),(0,s.jsxs)("div",{children:["Traveling: ",u?.traveling||""]}),(0,s.jsxs)("div",{children:["Parking: ",u?.parking||""]}),(0,s.jsxs)("div",{children:["Check by: ",u?.checked_by||""]}),(0,s.jsx)("div",{className:"fp-sigline"}),(0,s.jsxs)("div",{children:["Manager",u?.manager?`: ${u.manager}`:""]})]}),(0,s.jsxs)("td",{children:[(0,s.jsx)("div",{className:"fp-sigspace",children:j?.image&&(0,s.jsx)("img",{className:"fp-sigimg",src:j.image,alt:""})}),(0,s.jsx)("div",{className:"fp-sigline"}),(0,s.jsxs)("div",{children:["Name: ",j?.name||""]}),(0,s.jsxs)("div",{children:["Designation: ",j?.designation||""]}),(0,s.jsxs)("div",{children:["Date: ",j?.date||""]})]}),(0,s.jsxs)("td",{children:[(0,s.jsx)("div",{className:"fp-sigspace",children:v?.image&&(0,s.jsx)("img",{className:"fp-sigimg",src:v.image,alt:""})}),(0,s.jsx)("div",{className:"fp-sigline"}),(0,s.jsxs)("div",{children:["Name: ",v?.name||""]}),(0,s.jsxs)("div",{children:["Designation: ",v?.designation||""]}),(0,s.jsxs)("div",{children:["Date: ",v?.date||""]}),(0,s.jsxs)("div",{className:"fp-stampcell",children:["Company Stamp:",v?.stamp&&(0,s.jsx)("img",{className:"fp-stampimg",src:v.stamp,alt:""})]})]})]})})]})]})})]})]})}),document.body):null}let o="25.4mm",d=`
.fp-overlay{position:fixed;inset:0;z-index:10000;background:rgba(15,23,42,.55);backdrop-filter:blur(3px);
  display:flex;align-items:center;justify-content:center;padding:16px;}
.fp-shell{background:#fff;border-radius:12px;width:100%;max-width:900px;max-height:95vh;
  display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.3);}
.fp-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:12px 18px;border-bottom:1px solid #e5e7eb;background:#f9fafb;flex-shrink:0;}
.fp-warn{display:flex;gap:8px;align-items:flex-start;background:#fffbeb;border-bottom:1px solid #fde68a;
  color:#92400e;padding:9px 18px;font-size:12px;line-height:1.6;}
.fp-scroll{flex:1;overflow:auto;background:#e5e7eb;padding:18px;display:flex;justify-content:center;}

/* On screen the sheet mirrors the printed page exactly — A4 with the same 1in
   margins as padding — so the preview is what comes out of the printer.

   A fixed height (not min-height) plus a flex column is what lets the
   acknowledgement block sit on the footer: the remarks area between takes up
   the slack. */
.fp-page{width:210mm;height:297mm;background:#fff;padding:${o};
  box-shadow:0 2px 12px rgba(0,0,0,.15);font-family:Arial,Helvetica,sans-serif;
  color:#000;font-size:8pt;line-height:1.3;box-sizing:border-box;
  display:flex;flex-direction:column;}
/* Tables inside a flex column would otherwise be squashed by flex-shrink. */
.fp-page>*{flex:0 0 auto;}

.fp-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;}
.fp-logo img{max-height:46px;max-width:165px;object-fit:contain;}
.fp-logo-fallback{font-weight:700;font-size:13pt;letter-spacing:.5px;}
.fp-company{text-align:right;font-size:7pt;line-height:1.45;}
.fp-company-name{font-weight:700;font-size:8.5pt;}
.fp-rule{border-top:1.4px solid #000;margin:6px 0 0;}
.fp-rule-thin{border-top:1px solid #000;margin:0 0 5px;}

.fp-title{text-align:center;font-weight:700;font-size:11pt;padding:5px 0 4px;}

/* Reference numbers sit above the letterhead, right aligned. No underline —
   these are printed values, not blanks to write on. */
.fp-refs{text-align:right;font-size:8pt;line-height:1.6;margin-bottom:2px;}
.fp-refs-label{font-weight:700;}
.fp-refs-value{font-weight:700;}
/* The running number, in receipt red. Colour is forced to print because a
   number that only shows on screen is worse than no colour at all. */
.fp-runno{font-weight:700;color:#c00000;letter-spacing:.3px;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;}

.fp-section{font-weight:700;font-size:8.5pt;text-decoration:underline;margin:7px 0 3px;}

.fp-box{width:100%;border-collapse:collapse;font-size:8pt;}
.fp-box td{border:1px solid #000;padding:3px 5px;vertical-align:top;line-height:1.5;}

.fp-devgrid{display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;margin:4px 0 2px;}
.fp-devrow{display:flex;align-items:flex-start;gap:6px;font-size:8pt;}
.fp-devlabel{width:88px;flex-shrink:0;font-weight:700;padding-top:2px;}
.fp-devbox{flex:1;border:1px solid #000;min-height:16px;padding:1px 4px;font-size:8pt;}
.fp-devbox-tall{min-height:36px;}
.fp-empty{grid-column:1/-1;font-style:italic;color:#666;font-size:8pt;}
.fp-req{color:#b91c1c;font-weight:700;}

.fp-table{width:100%;border-collapse:collapse;font-size:8pt;}
.fp-table th{border:1px solid #000;background:#d9d9d9;padding:2px 4px;font-weight:700;text-align:center;}
.fp-table td{border:1px solid #000;padding:2px 4px;height:14px;vertical-align:top;}
.fp-center{text-align:center;}
.fp-grouprow td{background:#f0f0f0;font-weight:700;}
.fp-blank td{height:14px;}

.fp-remarks{border:1px solid #000;padding:4px 5px;min-height:36px;font-size:8pt;margin:3px 0 7px;}

/* The Customer Remarks area is the sheet's shock absorber: it takes up whatever
   height is left over, which is what holds the acknowledgement block down on the
   footer.

   No writing lines. Remarks are typed by the technician in the Android app, so
   ruled lines would be decoration nobody writes on. They were also actively
   harmful: with a fixed minimum height per line they could not shrink far
   enough on a long form like the 14-item Server sheet, so they overflowed and
   struck through the "For Office Use Only" heading below.

   min-height is 0 for the same reason — this element must always be able to
   collapse completely rather than push into the block beneath it.

   Declared AFTER .fp-page>* so it wins the equal-specificity tie and is allowed
   to flex. */
.fp-spacer{flex:1 1 0;min-height:0;}
.fp-fill{flex:1 1 0;min-height:0;}

.fp-ack{width:100%;border-collapse:collapse;font-size:8pt;margin-top:5px;}
.fp-ack th{border:1px solid #000;padding:2px 5px;font-weight:700;text-align:center;}
.fp-ack td{border:1px solid #000;padding:4px 5px;vertical-align:top;line-height:1.6;}
.fp-sigspace{height:26px;display:flex;align-items:flex-end;overflow:hidden;}
.fp-sigline{border-bottom:1px solid #000;margin:2px 0 3px;width:82%;}

/* The captured PNG has a white background and a wide aspect ratio, so it is
   fitted to the box by height and left-aligned to sit on the rule, the way a pen
   signature does. mix-blend-mode drops the white so it does not print as a grey
   patch over the line. */
.fp-sigimg{max-height:26px;max-width:100%;object-fit:contain;mix-blend-mode:multiply;}
.fp-stampcell{display:flex;align-items:flex-end;gap:4px;}
.fp-stampimg{max-height:34px;max-width:52%;object-fit:contain;mix-blend-mode:multiply;}

/* Keep the acknowledgement block and the customer information box whole. If
   a long form does spill, it should spill as a unit rather than tearing a
   signature box across two pages. */
.fp-ack,.fp-box{page-break-inside:avoid;break-inside:avoid;}
.fp-table thead{display:table-header-group;}
.fp-table tr{page-break-inside:avoid;break-inside:avoid;}

/* ── Print ──
   Everything except the portalled sheet is removed with display:none, not
   visibility:hidden. visibility leaves the element's box in place, so the
   hidden admin shell still occupied a full page and pushed the form down.

   GEOMETRY: @page margin is ZERO and the sheet keeps its own 210x297mm box with
   1in padding — the identical rule the on-screen preview uses. Earlier this
   relied on the @page margin instead, which made the sheet's containing block
   depend on how each browser sizes the root element when printing; the content
   ended up wider than the printable area and the right-hand table border was
   sheared off the page. One inset, defined in one place, cannot drift.

   Height is 296mm rather than 297mm so sub-pixel rounding can never tip the
   sheet over the page boundary and emit a blank second page. */
@media print{
  html,body{background:#fff !important;margin:0 !important;padding:0 !important;}
  body>*:not(.fp-portal){display:none !important;}
  .fp-portal{display:block !important;}
  .fp-overlay{position:static !important;inset:auto !important;background:none !important;
    backdrop-filter:none !important;padding:0 !important;display:block !important;z-index:auto !important;}
  .fp-shell{max-width:none !important;max-height:none !important;width:auto !important;
    background:none !important;box-shadow:none !important;border-radius:0 !important;
    display:block !important;overflow:visible !important;}
  .fp-toolbar,.fp-warn{display:none !important;}
  .fp-scroll{overflow:visible !important;background:#fff !important;padding:0 !important;
    display:block !important;}
  .fp-page{width:210mm !important;height:296mm !important;padding:${o} !important;
    margin:0 !important;box-shadow:none !important;}
  /* Ask for the table header shading to survive; the browser's own
     "Background graphics" toggle still has the final say. */
  .fp-table th,.fp-grouprow td{-webkit-print-color-adjust:exact;print-color-adjust:exact;}

  @page{size:A4 portrait;margin:0;}
}
`},8293:(e,i,t)=>{t.d(i,{A:()=>a});var s=t(7876),n=t(5769);function a({moduleKey:e,children:i}){let t=(0,n.S)();return t.loaded?t.isSuperAdmin||!e||t.canRead(e)?(0,s.jsx)(s.Fragment,{children:i}):(0,s.jsx)("div",{className:"card border-0 shadow-sm",style:{borderRadius:12},children:(0,s.jsxs)("div",{className:"card-body",style:{padding:48,textAlign:"center"},children:[(0,s.jsx)("i",{className:"bi bi-shield-lock",style:{fontSize:42,color:"#ef4444",display:"block",marginBottom:14}}),(0,s.jsx)("h2",{style:{fontSize:18,color:"#1f2937",marginBottom:8},children:"Access Denied"}),(0,s.jsx)("p",{style:{fontSize:13.5,color:"#6b7280",margin:0},children:"You don't have permission to view this page. Contact your administrator if you believe this is a mistake."})]})}):(0,s.jsx)("div",{className:"card border-0 shadow-sm",style:{borderRadius:12},children:(0,s.jsxs)("div",{className:"card-body",style:{padding:48,textAlign:"center",color:"#9ca3af",fontSize:13},children:[(0,s.jsx)("div",{className:"spinner-border spinner-border-sm text-secondary me-2"})," Loading…"]})})}}}]);