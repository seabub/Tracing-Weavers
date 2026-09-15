import React from "react";
export function Switch({label,checked,defaultChecked=false,onChange,disabled=false,inverse=false}){
  const [inner,setInner]=React.useState(defaultChecked);const on=checked??inner;
  const acc=inverse?"var(--bt-salmon)":"var(--bt-red)",ink=inverse?"var(--bt-white)":"var(--bt-ink)";
  return React.createElement("label",{style:{display:"inline-flex",alignItems:"center",gap:"12px",cursor:disabled?"not-allowed":"pointer",opacity:disabled?.4:1,color:ink,font:"400 17px/1 var(--font-body)"}},
    React.createElement("button",{type:"button",role:"switch","aria-checked":on,disabled,onClick:()=>{const n=!on;setInner(n);onChange&&onChange(n)},style:{width:"40px",height:"22px",padding:"2px",border:"1px solid "+(on?acc:ink),background:on?acc:"transparent",borderRadius:"var(--radius-pill)",position:"relative",cursor:"inherit",transition:"all var(--duration-base) var(--ease-out)"}},
      React.createElement("span",{style:{display:"block",width:"16px",height:"16px",borderRadius:"50%",background:on?"#fff":ink,transform:on?"translateX(18px)":"translateX(0)",transition:"transform var(--duration-base) var(--ease-out)"}})),
    label&&React.createElement("span",null,label));
}