"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7032],{7032:(e,a,s)=>{s.d(a,{Ay:()=>d,Yx:()=>o,ek:()=>c});var t=s(7876),i=s(4232),n=s(8477);function r(e){return String(e).padStart(2,"0")}function l(e){if(!e)return"";let a=new Date(e);if(Number.isNaN(a.getTime()))return"";let s=a.toLocaleDateString("en-MY",{day:"numeric",month:"short",year:"numeric"}),t=a.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1});return`${s} \u00b7 ${t}`}function o({data:e,head:a,pageId:s}){var n,d,p;let c,f,m,h,g=e.filled?.engineer,x=e.filled?.customer,b=e.form_no||(n=e.job_type,f=String((c=new Date).getFullYear()).slice(-2),m=String(c.getMonth()+1).padStart(2,"0"),h=String(c.getDate()).padStart(2,"0"),`${"service_case"===n?"SC":"WO"}-${f}${m}${h}-001`),j=e.contract_ref||"QT240000000024647",v=0,u=[];for(let a of e.items)u.push({item:a,no:++v});for(let a of e.groups)for(let e of a.items)u.push({item:e,no:++v,group:a.name});let N=function(e){let a=[],s=[];for(let t of e){if("textarea"===t.input_type){s.length&&(a.push(s),s=[]),a.push([t]);continue}s.push(t),2===s.length&&(a.push(s),s=[])}return s.length&&a.push(s),a}(e.fields),w=(d=u.length)<=6?3:d<=10?2:+(d<=12),k=e.filled?.photos??[],y=k.filter(e=>"before"===e.kind),E=k.filter(e=>"after"===e.kind),T=e.filled?.equipment,_=k.map(e=>l(e.taken_at)).filter(Boolean),C=_.length?_.length>1?`${_[0]} \u2013 ${_[_.length-1]}`:_[0]:"",A=k.some(e=>null!=e.gps_lat&&null!=e.gps_lng),S=`${y.length} before \u00b7 ${E.length} after${A?" \xb7 GPS recorded":""}`;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"fp-page",id:s,children:[(0,t.jsxs)("div",{className:"fp-lh",children:[(0,t.jsx)("div",{className:"fp-lh-logo",children:a?.logo?(0,t.jsx)("img",{src:a.logo,alt:a.company_name||"Company logo"}):(0,t.jsx)("div",{className:"fp-lh-fallback",children:a?.company_name||""})}),(0,t.jsxs)("div",{className:"fp-lh-co",children:[(0,t.jsxs)("div",{className:"fp-lh-name",children:[a?.company_name||"—",a?.reg_no?` (${a.reg_no})`:""]}),a?.address&&(0,t.jsx)("div",{children:a.address}),(0,t.jsx)("div",{children:[a?.phone,a?.email,a?.website].filter(Boolean).join("  \xb7  ")})]})]}),(0,t.jsxs)("div",{className:"fp-band",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{children:(p=e.form_title).replace(/\s*service\s+form\s*$/i,"").trim()||p}),(0,t.jsx)("div",{className:"fp-band-sub",children:"SERVICE FORM"})]}),(0,t.jsxs)("div",{className:"fp-band-refs",children:[(0,t.jsxs)("div",{children:["Form No. ",(0,t.jsx)("b",{children:b})]}),(0,t.jsxs)("div",{children:["Contract Ref. ",(0,t.jsx)("b",{children:j})]})]})]}),(0,t.jsx)("div",{className:"fp-sec",children:"CUSTOMER’S INFORMATION"}),(0,t.jsx)("table",{className:"fp-kv",children:(0,t.jsxs)("tbody",{children:[(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"fp-k",children:"Organization Name"}),(0,t.jsx)("td",{className:"fp-v",children:e.filled?.customer_name||""}),(0,t.jsx)("td",{className:"fp-k",children:"Service Date"}),(0,t.jsx)("td",{className:"fp-v",children:e.filled?.service_date||""})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"fp-k",children:"Contact Person"}),(0,t.jsx)("td",{className:"fp-v",children:e.filled?.contact_name||""}),(0,t.jsx)("td",{className:"fp-k",children:"Commence Time"}),(0,t.jsx)("td",{className:"fp-v",children:e.filled?.commence_at||""})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"fp-k",children:"Department"}),(0,t.jsx)("td",{className:"fp-v",children:e.filled?.contact_department||""}),(0,t.jsx)("td",{className:"fp-k",children:"Completed Time"}),(0,t.jsx)("td",{className:"fp-v",children:e.filled?.completed_at||""})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"fp-k",children:"Tel. No."}),(0,t.jsx)("td",{className:"fp-v",children:e.filled?.contact_phone||""}),(0,t.jsx)("td",{className:"fp-k",children:"Attended By"}),(0,t.jsx)("td",{className:"fp-v",children:e.filled?.attended_by||""})]})]})}),(0,t.jsx)("div",{className:"fp-sec",children:"DEVICE INFORMATION"}),0===e.fields.length?(0,t.jsx)("div",{className:"fp-empty",children:"No Device Information fields defined on this template."}):(0,t.jsx)("table",{className:"fp-kv",children:(0,t.jsx)("tbody",{children:N.map((e,a)=>(0,t.jsx)("tr",{children:e.map(a=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)("td",{className:"fp-k",children:[a.label,a.is_required?(0,t.jsx)("span",{className:"fp-req",children:"*"}):null]}),(0,t.jsx)("td",{className:"fp-v",colSpan:1===e.length?3:1,children:a.value||""})]},a.field_key))},`d-${a}`))})}),(0,t.jsx)("div",{className:"fp-sec",children:"DETAILS OF THE JOB PERFORMED"}),(0,t.jsxs)("table",{className:"fp-jobs",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{className:"fp-c-no",children:"NO."}),(0,t.jsx)("th",{children:"ITEM"}),(0,t.jsx)("th",{className:"fp-c-chk",children:"CHECK"}),(0,t.jsx)("th",{className:"fp-c-com",children:"COMMENT"})]})}),(0,t.jsxs)("tbody",{children:[u.map(({item:e,no:a,group:s},n)=>{let r=u[n-1],l=s&&(!r||r.group!==s);return(0,t.jsxs)(i.Fragment,{children:[l&&(0,t.jsx)("tr",{className:"fp-grouprow",children:(0,t.jsx)("td",{colSpan:4,children:s})}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"fp-c-no",children:a}),(0,t.jsxs)("td",{className:"fp-c-item",children:[e.item,e.is_required?(0,t.jsx)("span",{className:"fp-req",children:" *"}):null]}),(0,t.jsx)("td",{className:"fp-c-chk",children:e.is_done?"✓":""}),(0,t.jsx)("td",{className:"fp-c-com",children:e.remarks||""})]})]},`r-${a}`)}),Array.from({length:w}).map((e,a)=>(0,t.jsxs)("tr",{className:"fp-blank",children:[(0,t.jsx)("td",{}),(0,t.jsx)("td",{}),(0,t.jsx)("td",{}),(0,t.jsx)("td",{})]},`b-${a}`))]})]}),(0,t.jsx)("div",{className:"fp-sec",children:"CUSTOMER REMARKS"}),(0,t.jsx)("div",{className:"fp-remarks",children:e.filled?.customer_remarks||""}),(0,t.jsxs)("table",{className:"fp-ack",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"ENGINEER ACKNOWLEDGEMENT"}),(0,t.jsx)("th",{children:"CUSTOMER ACKNOWLEDGEMENT"})]})}),(0,t.jsx)("tbody",{children:(0,t.jsxs)("tr",{children:[(0,t.jsxs)("td",{children:[(0,t.jsx)("div",{className:"fp-sig",children:g?.image&&(0,t.jsx)("img",{src:g.image,alt:""})}),(0,t.jsx)("div",{className:"fp-ack-line"}),(0,t.jsxs)("div",{className:"fp-ack-row",children:[(0,t.jsx)("span",{className:"fp-lab",children:"Name"}),(0,t.jsx)("span",{className:"fp-val",children:g?.name||""})]}),(0,t.jsxs)("div",{className:"fp-ack-row",children:[(0,t.jsx)("span",{className:"fp-lab",children:"Designation"}),(0,t.jsx)("span",{className:"fp-val",children:g?.designation||""})]}),(0,t.jsxs)("div",{className:"fp-ack-row",children:[(0,t.jsx)("span",{className:"fp-lab",children:"Date"}),(0,t.jsx)("span",{className:"fp-val",children:g?.date||""})]})]}),(0,t.jsxs)("td",{children:[(0,t.jsx)("div",{className:"fp-sig",children:x?.image&&(0,t.jsx)("img",{src:x.image,alt:""})}),(0,t.jsx)("div",{className:"fp-ack-line"}),(0,t.jsxs)("div",{className:"fp-ack-foot",children:[(0,t.jsxs)("div",{className:"fp-ack-names",children:[(0,t.jsxs)("div",{className:"fp-ack-row",children:[(0,t.jsx)("span",{className:"fp-lab",children:"Name"}),(0,t.jsx)("span",{className:"fp-val",children:x?.name||""})]}),(0,t.jsxs)("div",{className:"fp-ack-row",children:[(0,t.jsx)("span",{className:"fp-lab",children:"Desig."}),(0,t.jsx)("span",{className:"fp-val",children:x?.designation||""})]}),(0,t.jsxs)("div",{className:"fp-ack-row",children:[(0,t.jsx)("span",{className:"fp-lab",children:"Date"}),(0,t.jsx)("span",{className:"fp-val",children:x?.date||""})]})]}),(0,t.jsxs)("div",{className:"fp-stamp",children:[(0,t.jsx)("div",{className:"fp-stamp-lab",children:"Company Stamp"}),(0,t.jsx)("div",{className:"fp-stamp-box",children:x?.stamp&&(0,t.jsx)("img",{src:x.stamp,alt:""})})]})]})]})]})})]}),(0,t.jsxs)("div",{className:"fp-foot",children:[(0,t.jsxs)("span",{children:[a?.company_name||"ATLINE SDN BHD"," \xa0\xb7\xa0 ICT Infrastructure Engineering & Consulting"]}),(0,t.jsx)("span",{children:b})]})]}),(0,t.jsxs)("div",{className:"fp-page fp-page2",children:[(0,t.jsxs)("div",{className:"fp-lh",children:[(0,t.jsx)("div",{className:"fp-lh-logo",children:a?.logo?(0,t.jsx)("img",{src:a.logo,alt:a.company_name||"Company logo"}):(0,t.jsx)("div",{className:"fp-lh-fallback",children:a?.company_name||""})}),(0,t.jsxs)("div",{className:"fp-lh-co",children:[(0,t.jsxs)("div",{className:"fp-lh-name",children:[a?.company_name||"—",a?.reg_no?` (${a.reg_no})`:""]}),a?.address&&(0,t.jsx)("div",{children:a.address}),(0,t.jsx)("div",{children:[a?.phone,a?.email,a?.website].filter(Boolean).join("  \xb7  ")})]})]}),(0,t.jsxs)("div",{className:"fp-band",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{children:"Before & After Photo Report"}),(0,t.jsx)("div",{className:"fp-band-sub",children:"PREVENTIVE MAINTENANCE EVIDENCE"})]}),(0,t.jsxs)("div",{className:"fp-band-refs",children:[(0,t.jsxs)("div",{children:["Form No. ",(0,t.jsx)("b",{children:b})]}),(0,t.jsxs)("div",{children:["Service Date ",(0,t.jsx)("b",{children:e.filled?.service_date||""})]})]})]}),(0,t.jsx)("div",{className:"fp-sec",children:"EQUIPMENT SERVICED"}),(0,t.jsxs)("div",{className:"fp-ident",children:[(0,t.jsxs)("div",{className:"fp-serial",children:[(0,t.jsx)("div",{className:"fp-lab",children:"SERIAL NUMBER"}),(0,t.jsx)("div",{className:"fp-serial-no",children:T?.serial||""})]}),(0,t.jsxs)("div",{className:"fp-meta",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"fp-k",children:"MODEL"}),(0,t.jsx)("div",{className:"fp-v",children:T?.model||""})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"fp-k",children:"DEVICE TYPE"}),(0,t.jsx)("div",{className:"fp-v",children:T?.device_type||""})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"fp-k",children:"LOCATION"}),(0,t.jsx)("div",{className:"fp-v",children:T?.location||""})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"fp-k",children:"ASSET TAG"}),(0,t.jsx)("div",{className:"fp-v",children:T?.asset_tag||""})]})]})]}),(0,t.jsx)("div",{className:"fp-sec",children:"BEFORE MAINTENANCE"}),(0,t.jsx)("div",{className:"fp-shots",children:y.length>0?y.map((e,a)=>(0,t.jsxs)("div",{className:"fp-shot",children:[(0,t.jsx)("div",{className:"fp-frame",children:(0,t.jsx)("img",{src:`/api/operations/field/file?id=${e.id}&type=photo`,alt:`Before ${r(a+1)}`,decoding:"sync"})}),(0,t.jsxs)("div",{className:"fp-cap",children:[(0,t.jsxs)("div",{className:"fp-hd",children:[(0,t.jsxs)("span",{className:"fp-tag fp-tag-before",children:["Before ",r(a+1)]}),(0,t.jsx)("span",{className:"fp-ts",children:l(e.taken_at)})]}),(0,t.jsx)("div",{className:"fp-shot-txt",children:e.caption||""})]})]},`before-${e.id}`)):Array.from({length:2}).map((e,a)=>(0,t.jsxs)("div",{className:"fp-shot",children:[(0,t.jsx)("div",{className:"fp-frame"}),(0,t.jsxs)("div",{className:"fp-cap",children:[(0,t.jsxs)("div",{className:"fp-hd",children:[(0,t.jsxs)("span",{className:"fp-tag fp-tag-before",children:["Before ",r(a+1)]}),(0,t.jsx)("span",{className:"fp-ts"})]}),(0,t.jsx)("div",{className:"fp-shot-txt"})]})]},`before-empty-${a}`))}),(0,t.jsxs)("div",{className:"fp-obs",children:[(0,t.jsx)("b",{children:"Observation on arrival."}),"\xa0 ",e.filled?.arrival_note||""]}),(0,t.jsx)("div",{className:"fp-sec",children:"AFTER MAINTENANCE"}),(0,t.jsx)("div",{className:"fp-shots",children:E.length>0?E.map((e,a)=>(0,t.jsxs)("div",{className:"fp-shot",children:[(0,t.jsx)("div",{className:"fp-frame",children:(0,t.jsx)("img",{src:`/api/operations/field/file?id=${e.id}&type=photo`,alt:`After ${r(a+1)}`,decoding:"sync"})}),(0,t.jsxs)("div",{className:"fp-cap",children:[(0,t.jsxs)("div",{className:"fp-hd",children:[(0,t.jsxs)("span",{className:"fp-tag fp-tag-after",children:["After ",r(a+1)]}),(0,t.jsx)("span",{className:"fp-ts",children:l(e.taken_at)})]}),(0,t.jsx)("div",{className:"fp-shot-txt",children:e.caption||""})]})]},`after-${e.id}`)):Array.from({length:2}).map((e,a)=>(0,t.jsxs)("div",{className:"fp-shot",children:[(0,t.jsx)("div",{className:"fp-frame"}),(0,t.jsxs)("div",{className:"fp-cap",children:[(0,t.jsxs)("div",{className:"fp-hd",children:[(0,t.jsxs)("span",{className:"fp-tag fp-tag-after",children:["After ",r(a+1)]}),(0,t.jsx)("span",{className:"fp-ts"})]}),(0,t.jsx)("div",{className:"fp-shot-txt"})]})]},`after-empty-${a}`))}),(0,t.jsxs)("div",{className:"fp-obs",children:[(0,t.jsx)("b",{children:"Completion summary."}),"\xa0 ",e.filled?.completion_summary||""]}),(0,t.jsx)("div",{className:"fp-sec",children:"NOTES & DECLARATION"}),(0,t.jsxs)("div",{className:"fp-notes",children:[e.filled?.notes?(0,t.jsxs)(t.Fragment,{children:[e.filled.notes,"\xa0\xb7\xa0 "]}):null,"The customer confirms the work recorded on page 1 was carried out and the equipment left in working order unless stated under Customer Remarks. The photographs above were taken on site before and after the service and form part of this record. Any fault found after this visit must be reported to the ATLINE helpdesk quoting the Form No. shown here."]}),(0,t.jsx)("div",{className:"fp-spacer"}),(0,t.jsxs)("div",{className:"fp-signoff",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"fp-lab",children:"PHOTOS TAKEN BY"}),(0,t.jsx)("div",{className:"fp-val",children:e.filled?.attended_by||""})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"fp-lab",children:"CAPTURED ON"}),(0,t.jsx)("div",{className:"fp-val",children:C})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"fp-lab",children:"EVIDENCE"}),(0,t.jsx)("div",{className:"fp-val",children:S})]})]}),(0,t.jsxs)("div",{className:"fp-foot",children:[(0,t.jsxs)("span",{children:[a?.company_name||"ATLINE SDN BHD"," \xa0\xb7\xa0 ICT Infrastructure Engineering & Consulting"]}),(0,t.jsx)("span",{children:b})]})]})]})}function d({data:e,onClose:a}){let[s,r]=(0,i.useState)(null),[l,p]=(0,i.useState)(!1);(0,i.useEffect)(()=>{p(!0)},[]),(0,i.useEffect)(()=>{fetch("/api/operations/field/letterhead").then(e=>e.json()).then(e=>{e.success&&r(e.data)}).catch(()=>{})},[]),(0,i.useEffect)(()=>{let e=e=>{"Escape"===e.key&&a()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[a]);let f=!!e.filled;return l?(0,n.createPortal)((0,t.jsx)("div",{className:"fp-portal",children:(0,t.jsxs)("div",{className:"fp-overlay",onMouseDown:e=>{e.target===e.currentTarget&&a()},children:[(0,t.jsx)("style",{children:c}),(0,t.jsxs)("div",{className:"fp-shell",children:[(0,t.jsxs)("div",{className:"fp-toolbar",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("strong",{style:{fontSize:14},children:e.form_title}),(0,t.jsx)("span",{style:{fontSize:12,color:"#9ca3af",marginLeft:8},children:f?"Completed sheet":"Blank form preview — A4"})]}),(0,t.jsxs)("div",{className:"d-flex gap-2 align-items-center",children:[(0,t.jsxs)("button",{className:"rm-btn-outline",onClick:()=>window.print(),children:[(0,t.jsx)("i",{className:"bi bi-printer-fill"})," Print / Save as PDF"]}),(0,t.jsx)("button",{className:"usr-modal-close",onClick:a,"aria-label":"Close",children:(0,t.jsx)("i",{className:"bi bi-x-lg"})})]})]}),s?.incomplete?.length>0&&(0,t.jsxs)("div",{className:"fp-warn",children:[(0,t.jsx)("i",{className:"bi bi-exclamation-triangle-fill"}),(0,t.jsxs)("span",{children:["The company letterhead is incomplete or still contains placeholders (",s.incomplete.join(", "),"). Fix it under ",(0,t.jsx)("strong",{children:"Settings › Global Config › General"})," before sending this form to a customer."]})]}),(0,t.jsx)("div",{className:"fp-scroll",children:(0,t.jsx)(o,{data:e,head:s,pageId:"fp-print-area"})})]})]})}),document.body):null}let p="11mm",c=`
.fp-overlay{position:fixed;inset:0;z-index:10000;background:rgba(15,23,42,.55);backdrop-filter:blur(3px);
  display:flex;align-items:center;justify-content:center;padding:16px;}
.fp-shell{background:#fff;border-radius:12px;width:100%;max-width:900px;max-height:95vh;
  display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.3);}
.fp-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:12px 18px;border-bottom:1px solid #e5e7eb;background:#f9fafb;flex-shrink:0;}
.fp-warn{display:flex;gap:8px;align-items:flex-start;background:#fffbeb;border-bottom:1px solid #fde68a;
  color:#92400e;padding:9px 18px;font-size:12px;line-height:1.6;}
/* A COLUMN, and centred with align-items rather than justify-content.
   As a flex row this centred the one sheet it used to hold; the moment page 2
   arrived the two sheets were laid out side by side, 420mm wide inside a 900px
   modal, so both were clipped and the preview grew a horizontal scrollbar.
   justify-content stays at its flex-start default on purpose: centring a
   column that overflows pushes the first sheet above the scroll origin, and
   the top of page 1 then cannot be scrolled back to. */
.fp-scroll{flex:1;overflow:auto;background:#e5e7eb;padding:18px;
  display:flex;flex-direction:column;align-items:center;gap:18px;}

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
  width:210mm;min-height:296mm;background:#fff;padding:${p};
  box-shadow:0 2px 12px rgba(0,0,0,.15);font-family:Arial,Helvetica,sans-serif;
  color:#111;font-size:8pt;line-height:1.32;box-sizing:border-box;
  display:flex;flex-direction:column;
  /* The sheet is itself a flex item of the column .fp-scroll, so it inherits
     flex-shrink:1 and a sheet whose content exceeds 296mm would be compressed
     back toward that floor — overflowing its own padding box, since overflow
     here is visible. That is the clipped-checklist failure described above,
     reintroduced through the parent. Pinned so the sheet always takes its
     natural height and the page simply gets longer. */
  flex:0 0 auto;}
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

/* ══ Page 2 — Before & After Photo Report ══
   Shares .fp-page's geometry and variables; .fp-page2 adds only the break so
   on screen it stacks below page 1 in the flex .fp-scroll and on paper it
   starts a fresh sheet. */
.fp-page2{page-break-before:always;break-before:page;}

/* Equipment serviced — one row, not a 2x2 grid (the grid cost 45.6mm for six
   values in the prototype). */
.fp-ident{border:.3mm solid var(--fp-tint-line);border-top:none;display:flex;align-items:stretch;}
.fp-serial{background:var(--fp-tint);padding:1.8mm 3.4mm;border-right:.3mm solid var(--fp-tint-line);
  min-width:58mm;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.fp-serial .fp-lab{font-size:6.4pt;letter-spacing:1.1px;color:var(--fp-purple-ink);font-weight:700;}
.fp-serial-no{font-size:13pt;font-weight:700;letter-spacing:.3px;margin-top:.6mm;}
.fp-meta{flex:1;display:flex;}
.fp-meta>div{flex:1;padding:1.8mm 3mm;border-right:.3mm solid #efe7f4;}
.fp-meta>div:last-child{border-right:none;}
.fp-meta .fp-k{font-size:6.4pt;color:var(--fp-muted);letter-spacing:.4px;}
.fp-meta .fp-v{font-weight:700;margin-top:.4mm;}

/* Photo grid — two columns, responsive, one .fp-shot per frame. 16:9 frames
   with object-fit:cover so a real photo crops inside the frame rather than
   pushing the page over. */
.fp-shots{display:grid;grid-template-columns:1fr 1fr;gap:3mm;
  border:.3mm solid var(--fp-tint-line);border-top:none;padding:3mm;}
.fp-shot{border:.3mm solid var(--fp-tint-line);}
.fp-frame{aspect-ratio:16/9;background:#f2f2f4;overflow:hidden;}
.fp-frame img{width:100%;height:100%;object-fit:cover;display:block;}
.fp-cap{padding:1.6mm 2.4mm;border-top:.3mm solid var(--fp-tint-line);}
.fp-cap .fp-hd{display:flex;justify-content:space-between;align-items:baseline;}
.fp-tag{font-weight:700;font-size:7.6pt;}
.fp-tag-before{color:#9a3412;}
.fp-tag-after{color:#15803d;}
.fp-ts{font-size:6.4pt;color:var(--fp-muted);}
.fp-shot-txt{font-size:6.8pt;color:#374151;margin-top:.6mm;text-align:justify;}

/* Observation / completion line under each photo group. */
.fp-obs{border:.3mm solid var(--fp-tint-line);border-top:none;padding:1.8mm 3mm;
  text-align:justify;font-size:7.2pt;}

/* Notes & declaration. */
.fp-notes{border:.3mm solid var(--fp-tint-line);background:#fdfbfe;padding:1.8mm 3mm;
  font-size:6.8pt;line-height:1.5;color:#374151;text-align:justify;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;}

/* Page 2's shock-absorber, mirrors .fp-remarks on page 1. Declared after
   .fp-page>* so it wins the equal-specificity tie and is allowed to flex. */
.fp-spacer{flex:1 1 auto;min-height:0;}

/* Photo sign-off strip. */
.fp-signoff{display:flex;justify-content:space-between;gap:6mm;margin-top:var(--fp-gap-sec);}
.fp-signoff>div{flex:1;}
.fp-signoff .fp-lab{font-size:6.4pt;color:var(--fp-muted);letter-spacing:.4px;}
.fp-signoff .fp-val{font-weight:700;margin-top:.5mm;}

/* Where a long sheet is allowed to tear.
   Not inside a key/value block or the acknowledgement — a signature box split
   across two pages is unusable. Not immediately after a section bar either, or
   a page ends on a purple heading with nothing under it. The checklist is the
   one block that may break, and it repeats its header when it does. */
.fp-ack,.fp-kv,.fp-remarks,.fp-foot,.fp-shots,.fp-ident,.fp-signoff,.fp-notes{page-break-inside:avoid;break-inside:avoid;}
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
  .fp-page{width:210mm !important;min-height:296mm !important;padding:${p} !important;
    margin:0 !important;box-shadow:none !important;}
  /* Page 2 shares .fp-page above for geometry; force its physical break on
     print so it always lands on a fresh sheet. */
  .fp-page2{page-break-before:always !important;break-before:page !important;}

  @page{size:A4 portrait;margin:0;}
}
`}}]);