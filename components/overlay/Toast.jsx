import React from "react";
export function Toast({children,tone="ink",action,onAction,style}){
  const bg={ink:"var(--bt-ink)",accent:"var(--bt-red)",amber:"var(--bt-amber)"}[tone];const fg=tone==="amber"?"var(--bt-ink)":"var(--bt-white)";
  return React.createElement("div",{role:"status",style:{display:"inline-flex",alignItems:"center",gap:"20px",background:bg,color:fg,padding:"14px 20px",font:"400 16px/1.3 var(--font-body)",boxShadow:"var(--shadow-float)",...style}},
    React.createElement("span",null,children),
    action&&React.createElement("button",{type:"button",onClick:onAction,style:{all:"unset",cursor:"pointer",font:"700 13px/1 var(--font-body)",letterSpacing:".14em",textTransform:"uppercase",color:tone==="ink"?"var(--bt-salmon)":fg}},action));
}