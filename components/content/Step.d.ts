/** One step of the Seed → Loom → … journey: numeral, caps title, short description, red top rule. */
export interface StepProps{number?:number|string;title:string;children?:React.ReactNode;inverse?:boolean;rule?:boolean;style?:React.CSSProperties}
export function Step(props:StepProps):JSX.Element;