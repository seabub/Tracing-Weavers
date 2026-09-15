/** Flat, square-cornered surface with a 1px stone border; optional 16:9 photo header. */
export interface CardProps{eyebrow?:string;title?:string;children?:React.ReactNode;image?:string;footer?:React.ReactNode;tone?:"default"|"tint"|"outline";inverse?:boolean;padding?:string;style?:React.CSSProperties}
export function Card(props:CardProps):JSX.Element;