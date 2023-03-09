import React,{ useEffect, useState } from "react"
import { Modal, Select, Text, TextInput, Textarea, Button } from "@mantine/core";
import {status, upForm, notas, statusNota} from "../api/api";
import { useForm } from '@mantine/form';
export default function Mymodal({title="", id="", opened, setOpened, update, data=[]}){


  const [options, setOpt]  = useState([{}])
  



  const getStatusNota = ()=>{

    const statusNota = data.filter(nota=>nota.numero == id)
    console.log(statusNota[0])
    
    return statusNota[0]?statusNota[0]:[]

  }


  const reset = ()=>{

    form.reset()
    update()



  }


  const form = useForm({
    initialValues: {
    status:getStatusNota().statusCod,
    obs:"", 
    dataPagamento:""
    },})

  async function submitForm(values,id){

    console.log(values)
    values.id = id
    const res = await upForm('financeiro/baixanota', values)
    reset()
    console.log(res)


  }


  async function getStatus(){

    const res = await status()

    const s = res.map(e=>{
      return {label:e.nome, value:e.cod}
    })

    setOpt(s)
    


  }

  useEffect(()=>{

    getStatus()
    



  },[])


  


   return( 
   
   <Modal
    opened={opened}
    onClose={() => setOpened(false)}
    title={"Nota: " + id}
  >
  <Text weight={'bold'}>{title}</Text>


<form onSubmit={form.onSubmit((values) => submitForm(values, id))} >


<Select
mt={'lg'}
label = "Status"
data = {options}
{...form.getInputProps('status')}
>

</Select>

<TextInput 
label={'Data do pagamento'}
type={'date'}
{...form.getInputProps('dataPagamento')}
>

</TextInput>


<Textarea 
label={'Observação'}
{...form.getInputProps('obs')}
>  
</Textarea>


<Button
mt={'lg'}
type={'submit'}
color={'indigo'}

>
Salvar
</Button>

</form>
  </Modal>
   )
}

