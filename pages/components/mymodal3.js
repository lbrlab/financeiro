import React,{ useEffect, useState } from "react"
import { Modal, Select, Text, TextInput, Textarea, Button,Switch, Group } from "@mantine/core";
import {status, upForm, credores} from "../api/api";
import { useForm } from '@mantine/form';
import { toast } from "react-hot-toast";

export default function Mymodal3({opened, setOpened, id}){

    const [options, setOpt]  = useState([{}])

    const [checked, setChecked] = useState(false);



    const reset = ()=>{

        form.reset()
      
    
    
      }

      const form = useForm({
    initialValues: {
          dataPagamento:"",
          dataRef:"",
          
    },})
    


    const baixaPagamento = async (data)=>{

      const res = await upForm("financeiro/pagarconta", {id:id, dataPag:data.dataPagamento ,dataRef:data.dataRef})

      console.log(res)

      setOpened(false)

      toast.success("Conta paga!")

      reset()


    }

 

      return(
        <>
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={"Pagamento"}
        >
        

        <form onSubmit={form.onSubmit((values) => baixaPagamento(values))} >

        <Group>
          <TextInput type={"date"} label={"Data referência"} {...form.getInputProps("dataRef")}></TextInput>
        </Group>

        <Group>
          <TextInput type={"date"} label={"Data do pagamento"} {...form.getInputProps("dataPagamento")}></TextInput>
        </Group>
        
        <Button type={"submit"} mt={15}>Salvar</Button>
        
        </form>
        
        </Modal>
        </>

      )

}