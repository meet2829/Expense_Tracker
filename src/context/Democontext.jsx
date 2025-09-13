
import { useState } from "react";
import notecontext from "./notecontext";

const Democontext=(props)=>{

    const state={
        "name":"john",
        "designation":"manager",
    }

    const [value,setvalue]=useState(state)
    const update=()=>{
        setTimeout(()=>{
            setvalue({
                "name":"alice",
                "designation":"Technical officer"
            })
        },5000)
    }
    
    return(
        <div>
           <notecontext.Provider value={{value,update}}>
                {props.children}
            </notecontext.Provider>
        </div>
    )
}
export default Democontext;