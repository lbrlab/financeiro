import React,{ useEffect, useState } from "react"
import { Modal, Select, Text, TextInput, Textarea, Button,Switch } from "@mantine/core";
import {status, upForm, credores} from "../api/api";
import { useForm } from '@mantine/form';

export default function Mymodal2({opened, setOpened}){

    const [options, setOpt]  = useState([{}])

    const [checked, setChecked] = useState(false);



    const reset = ()=>{

        form.reset()
      
    
    
      }

      const form = useForm({
    initialValues: {
        nomeCredor:"",
        referencia:"", 
        valor:"", 
        dataInicio:"", 
        dataFim:"", 
        barcod:"", 
        recorrente:"", 
        diaMes:""
    },})
    

      async function submitNovoCredor(values){

        
        const res = await upForm('financeiro/novocredor', {nome:values.toUpperCase()})

        getCredores()



      }

      async function submitNovaConta(values){


        await upForm('financeiro/novaconta', 
        {
            referencia:values.referencia, 
            valor:values.valor, 
            dataInicio:values.dataInicio, 
            dataFim:values.dataFim != ""? values.dataFim:values.dataInicio, 
            barcod:values.barcod, 
            recorrente:checked, 
            })
        

       
        
        reset()
     
    
    
      }

    async function getCredores(){

        const res = await credores()
    
        const s = res.map(e=>{
          return {label:e.nome, value:e.cod}
        })

        setOpt(s)

        console.log(options)
    }

    useEffect(()=>{

        getCredores()
    
    
    
      },[])

      return(
        <>
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={"Nova Conta"}
        >
        

        <form onSubmit={form.onSubmit((values) => submitNovaConta(values))} >

        <Select
        mt={'lg'}
        label = "Credor"
        data = {options}
        {...form.getInputProps('referencia')}
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => {
          const item = { value: query, label: query };
          submitNovoCredor(item.value)
          return item;
        }}
        >

        </Select>
 
        <TextInput  {...form.getInputProps("valor")} type={"number"} label={"Valor:"} ></TextInput>

        <Switch
      label="Recorrente"
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      mb={"md"}
        />

     
        
        <TextInput 
        label={`${checked?'Lembrar todo mês, a partir de:':'Primeiro pagamento:'}`}
        type={'date'}
        {...form.getInputProps('dataInicio')}
        >
        </TextInput>
        
        <TextInput 
        label={'Último pagamento'}
        type={'date'}
        value ={checked?null:''}
        {...form.getInputProps('dataFim')}
        mt={10}
        style = {{display:!checked?"block":"none"}}
        >
        </TextInput>

        <TextInput 
        label={'Código de barra/PIX'}
        value ={checked?null:''}
        {...form.getInputProps('barcod')}
        mt={10}
        >
        </TextInput>

        
        <Button type={"submit"} mt={15}>Salvar</Button>
        
        </form>
        
        </Modal>
        </>

      )

}