import { useState, useRef } from 'react'

import { TextInput, Text,Select } from '@mantine/core'


export default function EditableTitle({title, saveFunction, type="text", select=false}){

    const [text, setText] = useState(title)
    const [editable, setEditable] = useState(false)

    const myRef = useRef(null)


    const dataSelect = select?select.map(e=>{
        console.log({label:Object.keys(e)[0], value:Object.values(e)[0]})
         return {label:Object.keys(e)[0], value:Object.values(e)[0]}
     }):false

     console.log(dataSelect)
    function setEditHandle(){

        setEditable(true)

        setTimeout(()=>{
            myRef.current.focus()
        },300)
       
    }

    function saveOnBlur(){
        saveFunction(text)
        setEditable(false)
        return text
    }

    return(

<>
<div onClick={()=>setEditHandle()} style={{marginBottom:"1em"}}>
{!editable?<Text c="dimmed">
{!text?"Device Name":text}
</Text>:!select?
<TextInput type={type} ref={myRef}  step={type == "time"?"2":false} value={text} onChange={(e)=>setText(e.target.value)}  onBlur={()=>saveOnBlur()}></TextInput>
:<Select ref={myRef} data={dataSelect} onChange={(e)=>setText(e)} onBlur={()=>saveOnBlur()} value={text} defaultValue={text}/>
}

</div>
</>


    )

}