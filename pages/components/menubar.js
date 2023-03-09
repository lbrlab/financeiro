import { NavLink } from "@mantine/core"





export default function MenuItens({Itens=[], setPage}){




/*const listItens = Itens.map((e, i)=>{
    return <li><a onClick={()=>setPage(i)}>{e.label}</a></li>
})*/


const listItens = Itens.map((e, i)=>{

    console.log(e)

 if(e.parent){   
    
   return( <NavLink
    label={e.label}
    childrenOffset={28}
  >
    
    {e.links.map((l,i)=>{ return <NavLink label={l.label} onClick={()=>setPage(l.item)} />})}
   
   </NavLink>)

 }else{

   return <NavLink label={e.label} onClick={()=>setPage(e.item)} />

 }
})

return (

        <>

        {listItens}
 

        </>

    )

}