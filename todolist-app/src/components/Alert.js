import { useEffect } from "react";
const Alert=({msg,type,setAlert,List})=>{
    useEffect(()=>{
            const timeOut = setTimeout(()=>{
                setAlert ({show:false,msg:'',type:''}) 
            },3000)
            return()=>clearTimeout(timeOut)
            // eslint-disable-next-line
    },[List])
    return(
        <p className={`alert ${type}`}>{msg}</p>
    );
}
export default Alert