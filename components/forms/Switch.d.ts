/** Pill toggle — the one rounded control in the system. */
export interface SwitchProps{label?:string;checked?:boolean;defaultChecked?:boolean;onChange?:(checked:boolean)=>void;disabled?:boolean;inverse?:boolean}
export function Switch(props:SwitchProps):JSX.Element;