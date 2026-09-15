// Traceable Weaver experience — demo prototype described in brief §5.10. All names, places and stories are SAMPLE / DEMO content.
const DS=window.BeyondTenunDesignSystem_9d918e;
const {Eyebrow,Button,Tabs,Step,Badge,Tag,Card,Stat}=DS;
const W=390,H=844;
function Phone({children,dark}){return <div style={{width:W,height:H,background:dark?"var(--bt-ink)":"var(--bt-paper)",color:dark?"#fff":"var(--bt-ink)",position:"relative",overflow:"hidden",fontFamily:"var(--font-body)",display:"flex",flexDirection:"column"}}>{children}</div>}
function TopBar({title,onBack,dark}){return <div style={{display:"flex",alignItems:"center",gap:12,padding:"56px 20px 12px",font:"400 12px/1 var(--font-body)",letterSpacing:".32em",textTransform:"uppercase",color:dark?"var(--bt-salmon)":"var(--bt-red)"}}>{onBack&&<button onClick={onBack} aria-label="Back" style={{all:"unset",cursor:"pointer",width:44,height:44,marginLeft:-12,display:"grid",placeItems:"center"}}><span style={{width:10,height:10,borderLeft:"1.5px solid currentColor",borderBottom:"1.5px solid currentColor",transform:"rotate(45deg)",display:"block",color:dark?"#fff":"var(--bt-ink)"}}/></button>}<span>{title}</span></div>}
function Demo(){return <div style={{position:"absolute",top:14,left:0,right:0,textAlign:"center",font:"700 9px/1 var(--font-body)",letterSpacing:".24em",color:"var(--bt-amber)"}}>SAMPLE / DEMO CONTENT</div>}

function ScanScreen({go}){return <Phone dark><Demo/>
  <div style={{padding:"80px 24px 0"}}><Eyebrow inverse>Traceable Weaver</Eyebrow><h1 style={{font:"900 34px/1.02 var(--font-display)",letterSpacing:"-.02em",marginTop:16}}>A tag in the cloth carries the maker's record to you.</h1></div>
  <div style={{flex:1,margin:"32px 24px",background:"url(../../assets/imagery/tenun-hands-detail.jpg) center/cover",filter:"var(--photo-filter)",position:"relative"}}><div style={{position:"absolute",inset:0,background:"var(--scrim-bottom)"}}/><div style={{position:"absolute",left:16,bottom:16,right:16,font:"400 13px/1.4 var(--font-body)",color:"rgba(255,255,255,.8)"}}>Hold your phone to the NFC tag inside the selvedge, or scan the QR on the card.</div></div>
  <div style={{padding:"0 24px 40px",display:"grid",gap:10}}><Button inverse fullWidth onClick={go}>Read this cloth</Button><div style={{textAlign:"center",font:"400 11px/1 var(--font-body)",letterSpacing:".12em",textTransform:"uppercase",color:"rgba(255,255,255,.5)"}}>Beyond Tenun · Seed to Loom</div></div>
</Phone>}

function WeaverScreen({go,back}){return <Phone><Demo/>
  <div style={{height:300,background:"url(../../assets/imagery/weaver-portrait.jpg) center/cover",filter:"var(--photo-filter)",position:"relative"}}><div style={{position:"absolute",inset:0,background:"var(--scrim-bottom)"}}/><div style={{position:"absolute",top:0,left:0,right:0}}><TopBar title="Meet the weaver" onBack={back} dark/></div>
    <div style={{position:"absolute",left:20,bottom:18,color:"#fff"}}><div style={{font:"400 11px/1 var(--font-body)",letterSpacing:".32em",color:"var(--bt-salmon)"}}>SAMPLE WEAVER</div><div style={{font:"900 30px/1 var(--font-display)",marginTop:6}}>Mama [Name]</div></div></div>
  <div style={{padding:"18px 20px",display:"grid",gap:14,flex:1,overflow:"auto"}}>
    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Tag>Adonara</Tag><Tag>PEGAS PEKKA</Tag><Tag tone="soft">Cloth no. 0042</Tag></div>
    <p style={{font:"400 16px/1.45 var(--font-body)",color:"var(--text-muted)"}}>[Demo] Weaving since she was twelve, taught by her mother on the same back-strap loom. This cloth took eleven weeks, including the natural indigo dye baths.</p>
    <div style={{borderTop:"1px solid var(--bt-stone)",paddingTop:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><Stat value="11" label="weeks on the loom" size="md"/><Stat value="3" label="dye baths, natural indigo" size="md"/></div>
  </div>
  <div style={{padding:"0 20px 32px"}}><Button fullWidth onClick={go}>Material, technique &amp; motif</Button></div>
</Phone>}

function ClothScreen({go,back}){const [t,setT]=React.useState("Material");const copy={Material:["Hand-spun local cotton","[Demo] Cotton grown on a community plot in Adonara, carded and spun by hand. Dyed with indigo leaf and morinda root — no synthetic thread."],Technique:["Back-strap ikat","[Demo] Warp threads are tied and dyed before weaving so the pattern emerges as the cloth is woven. One weaver, one loom, one length."],Motif:["What the motif is allowed to say","[Demo] This motif is worn at family ceremonies. The community decides what may be recorded and shown; some meanings stay with the weavers."]};
return <Phone><Demo/><TopBar title="The cloth" onBack={back}/>
  <div style={{padding:"0 20px"}}><Tabs items={["Material","Technique","Motif"]} value={t} onChange={setT}/></div>
  <div style={{margin:"20px 20px 0",height:220,background:"url(../../assets/imagery/tenun-hanging.jpg) center/cover",filter:"var(--photo-filter)"}}/>
  <div style={{padding:"20px 20px 0",flex:1}}><h2 style={{font:"900 26px/1.05 var(--font-display)",letterSpacing:"-.01em"}}>{copy[t][0]}</h2><p style={{font:"400 16px/1.45 var(--font-body)",color:"var(--text-muted)",marginTop:12}}>{copy[t][1]}</p></div>
  <div style={{padding:"0 20px 32px"}}><Button fullWidth onClick={go}>Seed-to-Loom journey</Button></div>
</Phone>}

function JourneyScreen({go,back}){const steps=[["Seed","Cotton planted, Adonara plot"],["Loom","Woven over eleven weeks"],["Trace","Tag written, record attached"],["Teach","Motif documented for the local curriculum"],["Hub","Sold through the Local Impact Hub"]];
return <Phone dark><Demo/><TopBar title="Seed to Loom" onBack={back} dark/>
  <div style={{padding:"8px 20px 0",flex:1,display:"grid",gap:18,alignContent:"start"}}>{steps.map(([t,d],i)=><Step key={t} inverse number={i+1} title={t}><span style={{fontSize:14}}>{d}</span></Step>)}</div>
  <div style={{padding:"0 20px 32px"}}><Button inverse fullWidth onClick={go}>Where the value goes</Button></div>
</Phone>}

function ImpactScreen({back,restart}){return <Phone><Demo/><TopBar title="Impact" onBack={back}/>
  <div style={{padding:"8px 20px 0",display:"grid",gap:16,flex:1,alignContent:"start"}}>
    <h2 style={{font:"900 30px/1.02 var(--font-display)",letterSpacing:"-.02em"}}>Value returns to the people who hold the knowledge.</h2>
    <Card tone="tint" eyebrow="This cloth" title="Income reaches the household">[Demo] The weaver's share is recorded against this tag. On resale, the record stays attached.</Card>
    <Card eyebrow="Community" title="Adonara · 250 weavers mapped" footer="PEGAS PEKKA">Part of a three-year pilot across Adonara, Lembata and Manggarai.</Card>
    <div style={{display:"flex",gap:6}}><Badge>Pilot 2026–2029</Badge><Badge tone="amber">Demo record</Badge></div>
  </div>
  <div style={{padding:"0 20px 32px",display:"grid",gap:10}}><Button fullWidth>Join the 3-year journey</Button><Button variant="ghost" fullWidth onClick={restart}>Start over</Button></div>
</Phone>}

Object.assign(window,{ScanScreen,WeaverScreen,ClothScreen,JourneyScreen,ImpactScreen});