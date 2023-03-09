import React,{useEffect,useState} from "react"
import {Grid, Card, Button, Text,Group, CopyButton, TextInput, Badge, Transition} from "@mantine/core"
import {contasHoje, upForm, enviaConta, contasData} from "../api/api"
import Mymodal3 from "../components/mymodal3"
import  {Toaster, toast}  from "react-hot-toast"
import { fadeIn } from "react-animations"



export default function CardContas({setOpened}){


    const [contas, setContas] = useState([])

    const [open2, setOpened2] = useState(false)

    const [currentId, setCurrentId] = useState("")

    const [dataR, setData] = useState("")


    async function getContasHoje(){

        const res = await contasHoje()
        setContas(res)

        console.log(res)


    }


    async function vaiConta(e){
        
        try{
        enviaConta(e.valor, '*'+e.credor+'*',e.barcod, e.id)
        toast.success("Conta Enviada")

        if(dataR == ""){
            getContasHoje()
        }else{
            filterContasData(dataR)
        }

            
    }catch{
        
        toast.error("Algo deu errado")
    }
    }

    async function setPagamento(id){

        setCurrentId(id)
        setOpened2(true)
        if(dataR == ""){
            getContasHoje()
        }else{
            filterContasData(dataR)
        }

    }


    async function filterContasData(data){
        let val = data.target.value
        const res = await contasData({data:val,data2:val})
        setContas(res)
        setData(data)

        console.log(res)

    }


    useEffect(()=>{

        getContasHoje()
    },[])

    return (

        <>
    <Mymodal3 setOpened={setOpened2} opened = {open2} id = {currentId} toast = {toast}/>
    <Toaster/>
        <Group mb={20}>
        <Button mt={25} onClick={()=>setOpened(true)}>Adicionar conta</Button>
        <TextInput type="date" label="Filtro por Data" onChange={(data)=>{filterContasData(data)}}></TextInput>

        </Group>
        <Grid columns={6}>

        {
         
           contas.map(e=>{
           return <Grid.Col span = {1}>

            <Card 
            


            style = {{justifyContent:"center", alignContent:"center",  boxShadow: "1px 3px 5px grey", animation:{fadeIn}}} p="md">


                
                <Group>
                <Text size={"lg"}  weight={500}>{e.credor}</Text>
                {e.pagamento_atraso == 1?<Badge variant="gradient" gradient={{ from: 'red', to: 'orange' }} size="xs">Pendente</Badge>:<></>}
                {e.enviada && e.enviada == 1?<Badge variant="gradient" gradient={{ from: 'teal', to: 'cyan' }} size="xs">Enviada</Badge>:<></>}
                
                <></>
                </Group>

                <Group>
                <Text size={"xl"} weight={700} color={"gold"}>R$ {e.valor}</Text>
                </Group>

                <Group>
                {e.barcod == ""?<TextInput label={"Código de barras/Pix"} onChange={(val)=>e.barcod = val.target.value}/>:<Text>{e.barcod.slice(0,20)}...</Text>}
                </Group>

                <Group>  
            <Button mt={"lg"} color={"blue"} onClick={()=>vaiConta(e)}>Enviar</Button>
            <Button mt={"lg"} color={"teal"} onClick={()=>setPagamento(e.id)}>Pagar</Button>
                </Group>
                
            </Card>

        </Grid.Col>
           })

}

        </Grid>
        </>
    )




}