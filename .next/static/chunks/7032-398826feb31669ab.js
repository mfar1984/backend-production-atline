"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7032],{7032:(e,a,t)=>{t.d(a,{A:()=>l});var i=t(7876),s=t(4232),n=t(8477);function l({data:e,onClose:a}){var t,r,d;let p,c,m,f,[h,x]=(0,s.useState)(null),[g,b]=(0,s.useState)(!1);(0,s.useEffect)(()=>{b(!0)},[]),(0,s.useEffect)(()=>{fetch("/api/operations/field/letterhead").then(e=>e.json()).then(e=>{e.success&&x(e.data)}).catch(()=>{})},[]),(0,s.useEffect)(()=>{let e=e=>{"Escape"===e.key&&a()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[a]);let j=!!e.filled,u=e.filled?.engineer,v=e.filled?.customer,w=e.form_no||(t=e.job_type,c=String((p=new Date).getFullYear()).slice(-2),m=String(p.getMonth()+1).padStart(2,"0"),f=String(p.getDate()).padStart(2,"0"),`${"service_case"===t?"SC":"WO"}-${c}${m}${f}-001`),k=e.contract_ref||"QT240000000024647",N=0,y=[];for(let a of e.items)y.push({item:a,no:++N});for(let a of e.groups)for(let e of a.items)y.push({item:e,no:++N,group:a.name});let E=function(e){let a=[],t=[];for(let i of e){if("textarea"===i.input_type){t.length&&(a.push(t),t=[]),a.push([i]);continue}t.push(i),2===t.length&&(a.push(t),t=[])}return t.length&&a.push(t),a}(e.fields),_=(r=y.length)<=6?3:r<=10?2:+(r<=12);return g?(0,n.createPortal)((0,i.jsx)("div",{className:"fp-portal",children:(0,i.jsxs)("div",{className:"fp-overlay",onMouseDown:e=>{e.target===e.currentTarget&&a()},children:[(0,i.jsx)("style",{children:o}),(0,i.jsxs)("div",{className:"fp-shell",children:[(0,i.jsxs)("div",{className:"fp-toolbar",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("strong",{style:{fontSize:14},children:e.form_title}),(0,i.jsx)("span",{style:{fontSize:12,color:"#9ca3af",marginLeft:8},children:j?"Completed sheet":"Blank form preview — A4"})]}),(0,i.jsxs)("div",{className:"d-flex gap-2 align-items-center",children:[(0,i.jsxs)("button",{className:"rm-btn-outline",onClick:()=>window.print(),children:[(0,i.jsx)("i",{className:"bi bi-printer-fill"})," Print / Save as PDF"]}),(0,i.jsx)("button",{className:"usr-modal-close",onClick:a,"aria-label":"Close",children:(0,i.jsx)("i",{className:"bi bi-x-lg"})})]})]}),h?.incomplete?.length>0&&(0,i.jsxs)("div",{className:"fp-warn",children:[(0,i.jsx)("i",{className:"bi bi-exclamation-triangle-fill"}),(0,i.jsxs)("span",{children:["The company letterhead is incomplete or still contains placeholders (",h.incomplete.join(", "),"). Fix it under ",(0,i.jsx)("strong",{children:"Settings › Global Config › General"})," before sending this form to a customer."]})]}),(0,i.jsx)("div",{className:"fp-scroll",children:(0,i.jsxs)("div",{className:"fp-page",id:"fp-print-area",children:[(0,i.jsxs)("div",{className:"fp-lh",children:[(0,i.jsx)("div",{className:"fp-lh-logo",children:h?.logo?(0,i.jsx)("img",{src:h.logo,alt:h.company_name||"Company logo"}):(0,i.jsx)("div",{className:"fp-lh-fallback",children:h?.company_name||""})}),(0,i.jsxs)("div",{className:"fp-lh-co",children:[(0,i.jsxs)("div",{className:"fp-lh-name",children:[h?.company_name||"—",h?.reg_no?` (${h.reg_no})`:""]}),h?.address&&(0,i.jsx)("div",{children:h.address}),(0,i.jsx)("div",{children:[h?.phone,h?.email,h?.website].filter(Boolean).join("  \xb7  ")})]})]}),(0,i.jsxs)("div",{className:"fp-band",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("h1",{children:(d=e.form_title).replace(/\s*service\s+form\s*$/i,"").trim()||d}),(0,i.jsx)("div",{className:"fp-band-sub",children:"SERVICE FORM"})]}),(0,i.jsxs)("div",{className:"fp-band-refs",children:[(0,i.jsxs)("div",{children:["Form No. ",(0,i.jsx)("b",{children:w})]}),(0,i.jsxs)("div",{children:["Contract Ref. ",(0,i.jsx)("b",{children:k})]})]})]}),(0,i.jsx)("div",{className:"fp-sec",children:"CUSTOMER’S INFORMATION"}),(0,i.jsx)("table",{className:"fp-kv",children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"fp-k",children:"Organization Name"}),(0,i.jsx)("td",{className:"fp-v",children:e.filled?.customer_name||""}),(0,i.jsx)("td",{className:"fp-k",children:"Service Date"}),(0,i.jsx)("td",{className:"fp-v",children:e.filled?.service_date||""})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"fp-k",children:"Contact Person"}),(0,i.jsx)("td",{className:"fp-v",children:e.filled?.contact_name||""}),(0,i.jsx)("td",{className:"fp-k",children:"Commence Time"}),(0,i.jsx)("td",{className:"fp-v",children:e.filled?.commence_at||""})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"fp-k",children:"Department"}),(0,i.jsx)("td",{className:"fp-v",children:e.filled?.contact_department||""}),(0,i.jsx)("td",{className:"fp-k",children:"Completed Time"}),(0,i.jsx)("td",{className:"fp-v",children:e.filled?.completed_at||""})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"fp-k",children:"Tel. No."}),(0,i.jsx)("td",{className:"fp-v",children:e.filled?.contact_phone||""}),(0,i.jsx)("td",{className:"fp-k",children:"Attended By"}),(0,i.jsx)("td",{className:"fp-v",children:e.filled?.attended_by||""})]})]})}),(0,i.jsx)("div",{className:"fp-sec",children:"DEVICE INFORMATION"}),0===e.fields.length?(0,i.jsx)("div",{className:"fp-empty",children:"No Device Information fields defined on this template."}):(0,i.jsx)("table",{className:"fp-kv",children:(0,i.jsx)("tbody",{children:E.map((e,a)=>(0,i.jsx)("tr",{children:e.map(a=>(0,i.jsxs)(s.Fragment,{children:[(0,i.jsxs)("td",{className:"fp-k",children:[a.label,a.is_required?(0,i.jsx)("span",{className:"fp-req",children:"*"}):null]}),(0,i.jsx)("td",{className:"fp-v",colSpan:1===e.length?3:1,children:a.value||""})]},a.field_key))},`d-${a}`))})}),(0,i.jsx)("div",{className:"fp-sec",children:"DETAILS OF THE JOB PERFORMED"}),(0,i.jsxs)("table",{className:"fp-jobs",children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{className:"fp-c-no",children:"NO."}),(0,i.jsx)("th",{children:"ITEM"}),(0,i.jsx)("th",{className:"fp-c-chk",children:"CHECK"}),(0,i.jsx)("th",{className:"fp-c-com",children:"COMMENT"})]})}),(0,i.jsxs)("tbody",{children:[y.map(({item:e,no:a,group:t},n)=>{let l=y[n-1],r=t&&(!l||l.group!==t);return(0,i.jsxs)(s.Fragment,{children:[r&&(0,i.jsx)("tr",{className:"fp-grouprow",children:(0,i.jsx)("td",{colSpan:4,children:t})}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"fp-c-no",children:a}),(0,i.jsxs)("td",{className:"fp-c-item",children:[e.item,e.is_required?(0,i.jsx)("span",{className:"fp-req",children:" *"}):null]}),(0,i.jsx)("td",{className:"fp-c-chk",children:e.is_done?"✓":""}),(0,i.jsx)("td",{className:"fp-c-com",children:e.remarks||""})]})]},`r-${a}`)}),Array.from({length:_}).map((e,a)=>(0,i.jsxs)("tr",{className:"fp-blank",children:[(0,i.jsx)("td",{}),(0,i.jsx)("td",{}),(0,i.jsx)("td",{}),(0,i.jsx)("td",{})]},`b-${a}`))]})]}),(0,i.jsx)("div",{className:"fp-sec",children:"CUSTOMER REMARKS"}),(0,i.jsx)("div",{className:"fp-remarks",children:e.filled?.customer_remarks||""}),(0,i.jsxs)("table",{className:"fp-ack",children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{children:"ENGINEER ACKNOWLEDGEMENT"}),(0,i.jsx)("th",{children:"CUSTOMER ACKNOWLEDGEMENT"})]})}),(0,i.jsx)("tbody",{children:(0,i.jsxs)("tr",{children:[(0,i.jsxs)("td",{children:[(0,i.jsx)("div",{className:"fp-sig",children:u?.image&&(0,i.jsx)("img",{src:u.image,alt:""})}),(0,i.jsx)("div",{className:"fp-ack-line"}),(0,i.jsxs)("div",{className:"fp-ack-row",children:[(0,i.jsx)("span",{className:"fp-lab",children:"Name"}),(0,i.jsx)("span",{className:"fp-val",children:u?.name||""})]}),(0,i.jsxs)("div",{className:"fp-ack-row",children:[(0,i.jsx)("span",{className:"fp-lab",children:"Designation"}),(0,i.jsx)("span",{className:"fp-val",children:u?.designation||""})]}),(0,i.jsxs)("div",{className:"fp-ack-row",children:[(0,i.jsx)("span",{className:"fp-lab",children:"Date"}),(0,i.jsx)("span",{className:"fp-val",children:u?.date||""})]})]}),(0,i.jsxs)("td",{children:[(0,i.jsx)("div",{className:"fp-sig",children:v?.image&&(0,i.jsx)("img",{src:v.image,alt:""})}),(0,i.jsx)("div",{className:"fp-ack-line"}),(0,i.jsxs)("div",{className:"fp-ack-foot",children:[(0,i.jsxs)("div",{className:"fp-ack-names",children:[(0,i.jsxs)("div",{className:"fp-ack-row",children:[(0,i.jsx)("span",{className:"fp-lab",children:"Name"}),(0,i.jsx)("span",{className:"fp-val",children:v?.name||""})]}),(0,i.jsxs)("div",{className:"fp-ack-row",children:[(0,i.jsx)("span",{className:"fp-lab",children:"Desig."}),(0,i.jsx)("span",{className:"fp-val",children:v?.designation||""})]}),(0,i.jsxs)("div",{className:"fp-ack-row",children:[(0,i.jsx)("span",{className:"fp-lab",children:"Date"}),(0,i.jsx)("span",{className:"fp-val",children:v?.date||""})]})]}),(0,i.jsxs)("div",{className:"fp-stamp",children:[(0,i.jsx)("div",{className:"fp-stamp-lab",children:"Company Stamp"}),(0,i.jsx)("div",{className:"fp-stamp-box",children:v?.stamp&&(0,i.jsx)("img",{src:v.stamp,alt:""})})]})]})]})]})})]}),(0,i.jsxs)("div",{className:"fp-foot",children:[(0,i.jsxs)("span",{children:[h?.company_name||"ATLINE SDN BHD"," \xa0\xb7\xa0 ICT Infrastructure Engineering & Consulting"]}),(0,i.jsx)("span",{children:w})]})]})})]})]})}),document.body):null}let r="11mm",o=`
.fp-overlay{position:fixed;inset:0;z-index:10000;background:rgba(15,23,42,.55);backdrop-filter:blur(3px);
  display:flex;align-items:center;justify-content:center;padding:16px;}
.fp-shell{background:#fff;border-radius:12px;width:100%;max-width:900px;max-height:95vh;
  display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.3);}
.fp-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:12px 18px;border-bottom:1px solid #e5e7eb;background:#f9fafb;flex-shrink:0;}
.fp-warn{display:flex;gap:8px;align-items:flex-start;background:#fffbeb;border-bottom:1px solid #fde68a;
  color:#92400e;padding:9px 18px;font-size:12px;line-height:1.6;}
.fp-scroll{flex:1;overflow:auto;background:#e5e7eb;padding:18px;display:flex;justify-content:center;}

/* On screen the sheet mirrors the printed page exactly — A4 with the same
   padding as the inset — so the preview is what comes out of the printer.

   min-height plus a flex column is what lets the acknowledgement block sit on
   the footer: the remarks area between takes up the slack. 296mm, not 297:
   rounding on a full-height box tips it over the page boundary and emits a
   blank page after every sheet.

   MIN-height, not height, and overflow VISIBLE. The prototype used a fixed
   height with overflow:hidden to guarantee one page, and measured against the
   real templates that guarantee is a lie: the 14-item Server form with a
   one-line comment on every row needs 318mm, so 45mm of checklist — real
   findings a technician typed — was being sliced off the bottom and never
   printed. Clipping a signed maintenance record is worse than spilling onto a
   second page. So the sheet grows instead, and the break-inside rules below
   decide where it tears. */
.fp-page{--fp-purple:#6a2c91;--fp-purple-ink:#4a1d6e;--fp-tint:#f3eaf8;--fp-tint-line:#ddd0e8;
  --fp-zebra:#faf6fc;--fp-muted:#6b7280;--fp-rule:#c9c9c9;
  --fp-gap-sec:1.6mm;--fp-pad-bar:0.9mm;--fp-pad-cell:0.9mm;--fp-pad-row:0.8mm;
  width:210mm;min-height:296mm;background:#fff;padding:${r};
  box-shadow:0 2px 12px rgba(0,0,0,.15);font-family:Arial,Helvetica,sans-serif;
  color:#111;font-size:8pt;line-height:1.32;box-sizing:border-box;
  display:flex;flex-direction:column;}
/* Tables inside a flex column would otherwise be squashed by flex-shrink. */
.fp-page>*{flex:0 0 auto;}

/* ── Letterhead ── */
.fp-lh{display:flex;justify-content:space-between;align-items:flex-start;gap:8mm;}
.fp-lh-logo img{height:11mm;max-width:60mm;object-fit:contain;display:block;}
.fp-lh-fallback{font-weight:700;font-size:13pt;letter-spacing:.5px;}
.fp-lh-co{text-align:right;font-size:6.8pt;line-height:1.45;}
.fp-lh-name{font-weight:700;font-size:8pt;}

/* ── Title band ── */
.fp-band{margin-top:3mm;background:var(--fp-purple);color:#fff;padding:2.4mm 3.4mm;
  display:flex;justify-content:space-between;align-items:center;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;}
.fp-band h1{margin:0;font-size:11.5pt;font-weight:700;}
.fp-band-sub{font-size:7pt;letter-spacing:2.2px;opacity:.92;margin-top:.6mm;}
.fp-band-refs{text-align:right;font-size:7.2pt;line-height:1.6;}

/* ── Section bar ── */
.fp-sec{margin-top:var(--fp-gap-sec);background:var(--fp-tint);color:var(--fp-purple-ink);
  font-weight:700;font-size:7.6pt;letter-spacing:1px;padding:var(--fp-pad-bar) 3mm;
  border:.3mm solid var(--fp-tint-line);border-bottom:none;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;}

/* ── Key / value grid ── */
.fp-kv{width:100%;border-collapse:collapse;}
.fp-kv td{border:.3mm solid var(--fp-tint-line);padding:var(--fp-pad-cell) 3mm;}
.fp-kv td.fp-k{width:23%;color:var(--fp-muted);}
.fp-kv td.fp-v{width:27%;font-weight:700;}
.fp-empty{border:.3mm solid var(--fp-tint-line);padding:var(--fp-pad-cell) 3mm;
  font-style:italic;color:#666;}
.fp-req{color:#b91c1c;font-weight:700;}

/* ── Checklist ── */
.fp-jobs{width:100%;border-collapse:collapse;}
.fp-jobs thead th{background:var(--fp-purple);color:#fff;font-size:7.2pt;font-weight:700;
  letter-spacing:.6px;padding:var(--fp-pad-bar) 3mm;text-align:left;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;}
.fp-jobs td{border:.3mm solid var(--fp-tint-line);padding:var(--fp-pad-row) 3mm;vertical-align:top;}
.fp-jobs tbody tr:nth-child(even){background:var(--fp-zebra);
  -webkit-print-color-adjust:exact;print-color-adjust:exact;}
.fp-c-no{width:8mm;text-align:center;color:var(--fp-muted);}
.fp-c-chk{width:14mm;text-align:center;font-weight:700;}
.fp-c-com{width:56mm;}
/* Justified: a ragged right edge on a long item or comment is what made the old
   sheet look untidy. */
.fp-c-item,.fp-c-com{text-align:justify;text-justify:inter-word;}
.fp-grouprow td{background:var(--fp-tint);color:var(--fp-purple-ink);font-weight:700;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;}
.fp-blank td{height:4.4mm;}

/* ── Remarks: the sheet's shock absorber ──
   Takes the leftover height so the acknowledgement block sits on the footer.
   min-height is a floor, not a target: without it flex:1 shrinks the box below
   its own text and clips the paragraph. Declared after .fp-page>* so it wins
   the equal-specificity tie and is allowed to flex. */
.fp-remarks{border:.3mm solid var(--fp-tint-line);padding:1.6mm 3mm;
  text-align:justify;text-justify:inter-word;flex:1 1 auto;min-height:10mm;}

/* ── Acknowledgement ── */
.fp-ack{width:100%;border-collapse:collapse;margin-top:var(--fp-gap-sec);}
.fp-ack th{background:var(--fp-tint);color:var(--fp-purple-ink);font-size:7.2pt;font-weight:700;
  letter-spacing:.8px;padding:var(--fp-pad-bar) 3mm;border:.3mm solid var(--fp-tint-line);
  -webkit-print-color-adjust:exact;print-color-adjust:exact;}
/* Two columns, not three — see the note on filled.office above. */
.fp-ack td{border:.3mm solid var(--fp-tint-line);padding:1.3mm 3mm;vertical-align:top;width:50%;}
.fp-ack-line{border-bottom:.3mm solid #555;margin:.8mm 0 1mm;}
.fp-ack-row{display:flex;gap:2mm;margin-bottom:.6mm;}
.fp-ack-row .fp-lab{color:var(--fp-muted);min-width:17mm;}
.fp-ack-row .fp-val{flex:1;border-bottom:.2mm dotted #bbb;font-weight:700;}
/* The captured PNG is wide on a white background: fitted by height and
   left-aligned so it sits on the rule the way a pen signature does, and
   multiplied so the white does not print as a grey patch over the line. */
.fp-sig{height:8.5mm;display:flex;align-items:flex-end;overflow:hidden;}
.fp-sig img{height:8.5mm;max-width:100%;object-fit:contain;mix-blend-mode:multiply;}
.fp-ack-foot{display:flex;gap:2.5mm;align-items:flex-start;}
.fp-ack-names{flex:1;min-width:0;}
.fp-stamp{flex:0 0 23mm;}
.fp-stamp-lab{color:var(--fp-muted);font-size:6.4pt;}
.fp-stamp-box{height:10mm;width:23mm;border:.3mm dashed #b9a7c8;border-radius:1mm;margin-top:.4mm;}
.fp-stamp-box img{width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply;}

/* ── Footer ── */
.fp-foot{margin-top:2.2mm;padding-top:1.2mm;border-top:.3mm solid var(--fp-rule);
  display:flex;justify-content:space-between;font-size:6.4pt;color:var(--fp-muted);}

/* Where a long sheet is allowed to tear.
   Not inside a key/value block or the acknowledgement — a signature box split
   across two pages is unusable. Not immediately after a section bar either, or
   a page ends on a purple heading with nothing under it. The checklist is the
   one block that may break, and it repeats its header when it does. */
.fp-ack,.fp-kv,.fp-remarks,.fp-foot{page-break-inside:avoid;break-inside:avoid;}
.fp-sec{page-break-after:avoid;break-after:avoid;}
.fp-jobs thead{display:table-header-group;}
.fp-jobs tr{page-break-inside:avoid;break-inside:avoid;}
.fp-grouprow{page-break-after:avoid;break-after:avoid;}

/* ── Print ──
   Everything except the portalled sheet is removed with display:none, not
   visibility:hidden. visibility leaves the element's box in place, so the
   hidden admin shell still occupied a full page and pushed the form down.

   GEOMETRY: @page margin is ZERO and the sheet keeps its own 210x297mm box with
   its own padding — the identical rule the on-screen preview uses. Earlier this
   relied on the @page margin instead, which made the sheet's containing block
   depend on how each browser sizes the root element when printing; the content
   ended up wider than the printable area and the right-hand table border was
   sheared off the page. One inset, defined in one place, cannot drift. */
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
  .fp-page{width:210mm !important;min-height:296mm !important;padding:${r} !important;
    margin:0 !important;box-shadow:none !important;}

  @page{size:A4 portrait;margin:0;}
}
`}}]);