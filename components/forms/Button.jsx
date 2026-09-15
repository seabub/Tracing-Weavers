import React from "react";
export function Button({variant="primary",size="md",inverse=false,disabled=false,fullWidth=false,children,onClick,type="button",style}){
  const h={sm:"var(--control-h-sm)",md:"var(--control-h-md)",lg:"var(--control-h-lg)"}[size];
  const px={sm:"var(--control-px-sm)",md:"var(--control-px-md)",lg:"var(--control-px-lg)"}[size];
  const fs={sm:"14px",md:"16px",lg:"18px"}[size];
  const ink=inverse?"var(--bt-white)":"var(--bt-ink)";
  const acc=inverse?"var(--bt-salmon)":"var(--bt-red)";
  const v={
    primary:{background:acc,color:inverse?"var(--bt-ink)":"var(--bt-white)",border:"1px solid "+acc},
    secondary:{background:"transparent",color:ink,border:"1px solid "+ink},
    ghost:{background:"transparent",color:acc,border:"1px solid transparent"},
  }[variant];
  const [hover,setHover]=React.useState(false),[down,setDown]=React.useState(false);
  const hv=hover&&!disabled?(variant==="primary"?{background:inverse?"#FFB3A4":"var(--bt-red-bright)",borderColor:inverse?"#FFB3A4":"var(--bt-red-bright)"}:{background:inverse?"rgba(255,255,255,.1)":"rgba(32,30,29,.06)"}):{};
  return React.createElement("button",{type,disabled,onClick,onMouseEnter:()=>setHover(true),onMouseLeave:()=>{setHover(false);setDown(false)},onMouseDown:()=>setDown(true),onMouseUp:()=>setDown(false),
    style:{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"10px",height:h,padding:"0 "+px,fontFamily:"var(--font-body)",fontSize:fs,fontWeight:500,letterSpacing:".12em",textTransform:"uppercase",borderRadius:"var(--radius-none)",cursor:disabled?"not-allowed":"pointer",opacity:disabled?.4:1,transform:down?"translateY(1px)":"none",transition:"background var(--duration-fast) var(--ease-out),border-color var(--duration-fast) var(--ease-out)",width:fullWidth?"100%":undefined,whiteSpace:"nowrap",...v,...hv,...style}},children);
}