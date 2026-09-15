import React from "react";
export function Input({label,hint,error,placeholder,value,defaultValue,onChange,type="text",multiline=false,rows=4,disabled=false,inverse=false,style}){
  const [focus,setFocus]=React.useState(false);
  const ink=inverse?"var(--bt-white)":"var(--bt-ink)",muted=inverse?"rgba(255,255,255,.62)":"var(--text-muted)";
  const border=error?"var(--status-negative)":focus?(inverse?"var(--bt-salmon)":"var(--bt-red)"):(inverse?"rgba(255,255,255,.35)":"var(--bt-ink-3)");
  const base={width:"100%",boxSizing:"border-box",background:"transparent",color:ink,border:"none",borderBottom:"1px solid "+border,padding:"10px 0",font:"400 19px/1.3 var(--font-body)",outline:"none",transition:"border-color var(--duration-fast) var(--ease-out)",opacity:disabled?.4:1,resize:"vertical",...style};
  const el=multiline?React.createElement("textarea",{rows,placeholder,value,defaultValue,disabled,onChange:e=>onChange&&onChange(e.target.value),onFocus:()=>setFocus(true),onBlur:()=>setFocus(false),style:base}):React.createElement("input",{type,placeholder,value,defaultValue,disabled,onChange:e=>onChange&&onChange(e.target.value),onFocus:()=>setFocus(true),onBlur:()=>setFocus(false),style:base});
  return React.createElement("label",{style:{display:"block",fontFamily:"var(--font-body)"}},
    label&&React.createElement("span",{style:{display:"block",font:"400 12px/1 var(--font-body)",letterSpacing:".14em",textTransform:"uppercase",color:error?"var(--status-negative)":muted,marginBottom:"2px"}},label),
    el,
    (error||hint)&&React.createElement("span",{style:{display:"block",font:"400 14px/1.3 var(--font-body)",color:error?"var(--status-negative)":muted,marginTop:"6px"}},error||hint));
}