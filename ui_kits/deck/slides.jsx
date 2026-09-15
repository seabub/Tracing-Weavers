// Slide components recreated from "Beyond Tenun Fundraising Deck v3" (Canva, 1920×1080). Authored at 1280×720 (values = deck ÷ 1.5).
const DS=window.BeyondTenunDesignSystem_9d918e;
const {Eyebrow,Stat,Step,Button}=DS;
const M=80, MY=64; // margins
function Frame({dark=false,image,scrim,children,label}){
  return <section data-screen-label={label} style={{width:1280,height:720,position:"relative",overflow:"hidden",background:dark?"var(--bt-ink)":"var(--bt-paper)",color:dark?"#fff":"var(--bt-ink)",fontFamily:"var(--font-body)"}}>
    {image&&<div style={{position:"absolute",inset:0,background:"url("+image+") center/cover",filter:"var(--photo-filter)"}}/>}
    {scrim&&<div style={{position:"absolute",inset:0,background:scrim}}/>}
    <div style={{position:"absolute",inset:MY+"px "+M+"px",display:"flex",flexDirection:"column"}}>{children}</div>
  </section>;
}
function Footer({children,dark}){return <div style={{marginTop:"auto",paddingTop:12,borderTop:"1px solid "+(dark?"rgba(255,255,255,.18)":"var(--bt-stone)"),font:"400 11px/1.4 var(--font-body)",letterSpacing:".12em",textTransform:"uppercase",color:dark?"rgba(255,255,255,.62)":"var(--text-muted)"}}>{children}</div>}
const H1=({children,dark,size=56,width="72%"})=><h1 style={{font:"900 "+size+"px/1.02 var(--font-display)",letterSpacing:"-.02em",maxWidth:width,color:dark?"#fff":"var(--bt-ink)"}}>{children}</h1>;
const Body=({children,dark,muted=true})=><p style={{font:"400 15px/1.45 var(--font-body)",color:dark?(muted?"rgba(255,255,255,.72)":"#fff"):(muted?"var(--text-muted)":"var(--bt-ink)")}}>{children}</p>;

function TitleSlide(){return <Frame dark label="01 Title">
  <Eyebrow inverse>TBN Conference 2026 · Impact Partnership</Eyebrow>
  <div style={{marginTop:120}}>
    <div style={{font:"400 24px/1.2 var(--font-display)",color:"rgba(255,255,255,.72)"}}>AI is becoming more intelligent.</div>
    <H1 dark size={60} width="78%">How do we make sure the wisdom held by communities is not left behind?</H1>
  </div>
  <Footer dark>Impact Creative Management <span style={{color:"var(--bt-salmon)"}}>×</span> Transformational Business Network <span style={{color:"var(--bt-salmon)"}}>×</span> Torajamelo</Footer>
</Frame>}

function StatementSlide(){return <Frame label="02 Statement" image="../../assets/imagery/weaving-hands-loom.jpg" scrim="var(--scrim-left)">
  <div style={{marginTop:"auto",marginBottom:"auto"}}><H1 dark size={72} width="70%">Restore. Regenerate. Flourish.</H1></div>
</Frame>}

function ProblemSlide(){return <Frame label="03 Why this matters">
  <Eyebrow>Why this matters</Eyebrow>
  <div style={{display:"grid",gridTemplateColumns:"1.15fr 1fr",gap:48,marginTop:28,flex:1}}>
    <div><H1 size={38} width="100%">What happens when disaster does not only destroy homes, but also interrupts livelihoods, knowledge, identity and opportunity?</H1>
      <div style={{display:"grid",gap:14,marginTop:32}}>
        {[["Livelihood interrupted","Income from land and loom stops while the cost of living carries on."],["Knowledge transfer interrupted","Teaching moves to survival. What elders hold is not passed on during a shock."],["Identity and opportunity interrupted","People are left to rebuild as beneficiaries instead of as owners of their own capacity."]].map(([t,d])=><div key={t} style={{borderTop:"1px solid var(--bt-stone)",paddingTop:10}}><div style={{font:"700 15px/1.3 var(--font-body)"}}>{t}</div><Body>{d}</Body></div>)}
      </div></div>
    <div style={{background:"url(../../assets/imagery/tenun-hanging.jpg) center/cover",filter:"var(--photo-filter)"}}/>
  </div>
  <Footer>These communities are not short of intelligence, skill, relationships or assets. Field mapping in Adonara, Lembata and Manggarai currently lists 580 active weavers.</Footer>
</Frame>}

function StepsSlide(){const steps=[["Seed","Restore land, cotton and local ecological knowledge."],["Loom","Strengthen skills, culture and women's livelihood."],["Trace","Connect weaver, product, story, provenance and impact."],["Teach","Build teacher capacity and co-create a locally rooted curriculum."],["Regenerate","Climate action beyond carbon, linking ecology, livelihoods and culture."],["Hub","A Local Impact Hub for capacity building, incubation and enterprise development."],["Flourish","Strengthen agency, dignity, resilience and future opportunity."]];
return <Frame label="04 How it works">
  <Eyebrow>How it works</Eyebrow>
  <H1 size={30} width="100%"><span style={{fontWeight:400}}>Seed → Loom → Trace → Teach → Regenerate → Hub → </span>Flourish</H1>
  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"28px 32px",marginTop:28}}>
    {steps.map(([t,d],i)=><Step key={t} number={i+1} title={t} style={{fontSize:13}}><span style={{fontSize:13,lineHeight:1.35,display:"block"}}>{d}</span></Step>)}
    <div style={{background:"var(--bt-ink)",color:"#fff",padding:16}}><div style={{font:"400 11px/1 var(--font-body)",letterSpacing:".32em",color:"var(--bt-salmon)"}}>WHY THIS ORDER</div><div style={{font:"400 13px/1.4 var(--font-body)",marginTop:10,color:"rgba(255,255,255,.8)"}}>Each step only holds if the one before it is in place. That is why it is funded as one pathway and not as seven grants.</div></div>
  </div>
  <Footer>Seed to Loom is framed as revival and strengthening because the land, buildings, weaving skills and trusted organizations already exist</Footer>
</Frame>}

function StatsSlide(){return <Frame dark label="05 TBN-aligned outputs">
  <Eyebrow inverse>TBN-aligned outputs</Eyebrow>
  <H1 dark size={40} width="80%">An enterprise-development pipeline, not only a resilience program.</H1>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,marginTop:40}}>
    <div><Stat inverse accent value=">1,000" label="sociopreneurs developed" size="lg"/><Body dark>Through training, mentoring, community practice and Local Impact Hub pathways.</Body></div>
    <div><Stat inverse accent value=">5" label="new social enterprises" size="lg"/><Body dark>Incubated or launched from community opportunities identified through the program.</Body></div>
  </div>
  <Footer dark>These are program targets to be measured over the three-year pilot, not guaranteed outcomes.</Footer>
</Frame>}

function TableSlide(){const rows=[["Lodan Due · Senitawa","Adonara, East Flores","PEGAS PEKKA","250"],["Kerubaki","Lembata","PEGAS PEKKA","incl. above"],["Doka","Sikka, Flores","Sanggar Doka Tawa Tana","80"],["Cibal","Manggarai","DEKRANASDA Manggarai","250"]];
const th={font:"400 11px/1 var(--font-body)",letterSpacing:".2em",textTransform:"uppercase",color:"var(--text-muted)",textAlign:"left",padding:"0 0 10px",borderBottom:"1px solid var(--bt-ink)"};
const td={font:"400 16px/1.3 var(--font-body)",padding:"14px 0",borderBottom:"1px solid var(--bt-stone)",verticalAlign:"top"};
return <Frame label="06 Six sites">
  <Eyebrow>Six sites · One shared recovery challenge</Eyebrow>
  <H1 size={34} width="80%">The communities we sit with, and who already stands beside them.</H1>
  <table style={{width:"100%",borderCollapse:"collapse",marginTop:28}}><thead><tr>{["Site","District","Local partner organization","Weavers"].map(h=><th key={h} style={{...th,textAlign:h==="Weavers"?"right":"left"}}>{h}</th>)}</tr></thead>
  <tbody>{rows.map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} style={{...td,textAlign:i===3?"right":"left",fontWeight:i===0?700:400}}>{c}</td>)}</tr>)}
  <tr><td colSpan={3} style={{...td,borderBottom:"none",font:"400 12px/1 var(--font-body)",letterSpacing:".2em",textTransform:"uppercase",color:"var(--text-muted)"}}>Mapped to date</td><td style={{...td,borderBottom:"none",textAlign:"right",font:"900 28px/1 var(--font-display)",color:"var(--bt-red)"}}>580</td></tr></tbody></table>
  <Footer>Three shocks in six years · COVID-19 · Cyclone Seroja · 2026 earthquake</Footer>
</Frame>}

function ClosingSlide(){return <Frame dark label="07 The invitation">
  <Eyebrow inverse>The invitation</Eyebrow>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,marginTop:24,flex:1}}>
    <div><Stat inverse accent value="USD 1M" size="xl"/><Body dark muted={false}>for a three-year Beyond Tenun Impact Partnership. We are building a small consortium of committed Impact Partners who will walk with the communities from restoration to regeneration and flourishing.</Body>
      <div style={{marginTop:24,display:"flex",gap:10}}><Button inverse>Join the 3-year journey</Button><Button inverse variant="secondary">Continue the conversation</Button></div></div>
    <div style={{alignSelf:"end"}}><div style={{font:"400 11px/1 var(--font-body)",letterSpacing:".32em",color:"var(--bt-salmon)"}}>INDICATIVE USE OF FUNDS</div>
      {[["Assessment trip and post-assessment, six sites","USD 20,000"],["Community program, three communities × three years","USD 900,000"],["Technology platform, local curriculum, Hub coordination","balance · to confirm"]].map(([a,b])=><div key={a} style={{display:"flex",justifyContent:"space-between",gap:16,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.18)",font:"400 14px/1.3 var(--font-body)"}}><span style={{color:"rgba(255,255,255,.8)"}}>{a}</span><span style={{whiteSpace:"nowrap"}}>{b}</span></div>)}
      <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",font:"700 14px/1.3 var(--font-body)"}}><span>Toward &gt;1,000 sociopreneurs and &gt;5 new social enterprises</span><span>USD 1,000,000</span></div></div>
  </div>
  <Footer dark>Not a one-off sponsorship. Not crowdfunding. Suitable capital: grants, philanthropic funding, catalytic capital, corporate or foundation partnership.</Footer>
</Frame>}

Object.assign(window,{TitleSlide,StatementSlide,ProblemSlide,StepsSlide,StatsSlide,TableSlide,ClosingSlide,SlideFrame:Frame});