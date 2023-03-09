import {useState, useEffect} from "react"
import { Card, Grid, Group, Skeleton, Text } from "@mantine/core";
import { prevMes } from "../api/api";

export default function DashCards(){


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    const meses = [
        "0",
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ];

    async function getData(){

       const  res = await prevMes()

        setData(res)
      

    }

    
    useEffect(()=>{


        setInterval(()=>{
            getData()
        },3000)


    },[])




    return(

        <>
        
        <Grid columns={4}>

        

            {data[0]?data.map(e=>{

                return <Grid.Col md= {2} lg={1}>
                
                <Card
                style={{backgroundImage:'url("/cardback.gif")', backgroundSize:'cover', boxShadow: "3px 3px 5px grey"}}
                >
                    <Group style={{justifyContent:'center'}}>
                        <Text weight={500} color={'#fff'}>{meses[e.mes]}/{e.ano}</Text>
                    </Group>
                      <Group position="apart" p="lg" mt="md" mb="xs" style={{backgroundColor:'#0000008a', backdropFilter:'blur(1px)', borderRadius:'5px', justifyContent:'center'}}>
                    <Text weight={500} size={'xl'} color={'#53e72e'}>R$ {parseFloat(e.valor).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
                 </Group>
                </Card>
                
                </Grid.Col>
                

            }):<Skeleton height={200}/>}

      
        </Grid>
       
        </>
    )



}