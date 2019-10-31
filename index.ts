import svg2wxss,{option} from "./lib/svg2wxss"

export type option = option

export default function(option:string|option){
    let opt : option = {path:""}
    if(typeof option == "string"){
        opt.path = option;
    }else{
        opt = option;
    }
    return svg2wxss(opt).then(_=>{
        console.log("success");
    });
}