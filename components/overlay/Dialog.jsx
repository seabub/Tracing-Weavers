import React from "react";
export function Dialog({open,onClose,eyebrow,title,children,actions,width=560}){
  if(!open)return null;
  return React.createElement("div",{onClick:onClose,style:{position:"fixed",inset:0,background:"rgba(32,30,29,.6)",display:"grid",placeItems:"center",zIndex:100,padding:"24px"}},
    React.createElement("div",{role:"dialog","aria-modal":true,onClick:e=>e.stopPropagation(),style:{width:"100%",maxWidth:width+"px",background:"var(--bt-white)",borderRadius:"var(--radius-md)",boxShadow:"var(--shadow-float)",padding:"32px",display:"grid",gap:"14px",color:"var(--bt-ink)"}},
      eyebrow&&React.createElement("div",{style:{font:"400 12px/1 var(--font-body)",letterSpacing:".42em",textTransform:"uppercase",color:"var(--bt-red)"}},eyebrow),
      title&&React.createElement("h2",{style:{margin:0,font:"900 28px/1.1 var(--font-display)"}},title),
      children&&React.createElement("div",{style:{font:"400 17px/1.4 var(--font-body)",color:"var(--text-muted)"}},children),
      actions&&React.createElement("div",{style:{display:"flex",gap:"10px",justifyContent:"flex-end",marginTop:"8px"}},actions)));
}