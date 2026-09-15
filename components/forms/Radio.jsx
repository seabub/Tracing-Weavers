import React from "react";
export function Radio({label,description,checked,defaultChecked=false,onChange,disabled=false,inverse=false,name,value}){
  const [inner,setInner]=React.useState(defaultChecked);const on=checked??inner;
  const ink=inverse?"var(--bt-white)":"var(--bt-ink)",acc=inverse?"var(--bt-salmon)":"var(--bt-red)";
  const toggle=()=>{if(disabled)return;const n=true;setInner(n);onChange&&onChange(value)};
  const box={width:"18px",height:"18px",flex:"none",border:"1px solid "+(on?acc:ink),background:on&&"transparent",borderRadius:"50%",display:"grid",placeItems:"center",transition:"all var(--duration-fast) var(--ease-out)",marginTop:"2px"};
  return React.createElement("label",{onClick:e=>{e.preventDefault();toggle()},style:{display:"flex",gap:"12px",alignItems:"flex-start",cursor:disabled?"not-allowed":"pointer",opacity:disabled?.4:1,fontFamily:"var(--font-body)",color:ink}},
    React.createElement("input",{type:"radio",name,value,checked:on,readOnly:true,style:{position:"absolute",opacity:0,width:0,height:0}}),
    React.createElement("span",{style:box},on&&React.createElement("span",{style:{width:"8px",height:"8px",borderRadius:"50%",background:acc}})),
    React.createElement("span",null,React.createElement("span",{style:{display:"block",font:"400 17px/1.3 var(--font-body)"}},label),description&&React.createElement("span",{style:{display:"block",font:"400 14px/1.3 var(--font-body)",color:inverse?"rgba(255,255,255,.62)":"var(--text-muted)"}},description)));
}