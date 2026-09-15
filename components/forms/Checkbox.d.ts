/** Square checkbox; red fill when checked. */
export interface CheckboxProps{label:string;description?:string;checked?:boolean;defaultChecked?:boolean;onChange?:(checked:boolean)=>void;disabled?:boolean;inverse?:boolean;name?:string;value?:string}
export function Checkbox(props:CheckboxProps):JSX.Element;