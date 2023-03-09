import { Tooltip } from "@mantine/core";


export default function LinkBarTop({configuration}){


    return(


    
        <>
    {
      configuration?configuration.map(e=><Tooltip label={e.label?e.label:''}>
           <div style={{marginRight:"5%" }} onClick={()=>window.open(e.link?e.link:'', '_blank')}>
          <div style = {{width:'50px', height:'50px', backgroundColor:"#fff", borderRadius:"10%", boxShadow: "2px 2px 4px grey", backgroundImage:`url(${e.bgurl})`, backgroundSize:'cover'}}></div>
           </div>
        </Tooltip>):<></>
}
    </>
    
    )



}