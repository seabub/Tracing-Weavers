/** Big number with a one-line qualifier (">1,000 sociopreneurs developed"). */
export interface StatProps{value:string;label?:string;/** red numeral */accent?:boolean;inverse?:boolean;size?:"md"|"lg"|"xl";align?:"left"|"center"}
export function Stat(props:StatProps):JSX.Element;