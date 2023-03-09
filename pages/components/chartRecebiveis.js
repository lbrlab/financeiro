import React,{useEffect, useState} from 'react';
import { Box, Grid, Group, Select, Text } from '@mantine/core';
import {notasMes} from '../api/api'
import  CallCharts  from './chats';










export default function ChartRecebiveis() {





const [elements, setElement] = useState([])

const [sum, setSum] = useState(0)



function unique(v,i,s){
  return s.indexOf(v) === i;
}

async function ChartsData(ano){

    setElement([])
    const res = await notasMes({ano:ano})

    const empresas = res.map(e=>e.nome).filter(unique)
    const mes = res.map(e=>e.mes).filter(unique)

    
    const matrix = []


    let aux = []

    console.log(mes)

    empresas.forEach(element => {

        mes.forEach(e=>{

            let verificationArray = res.filter(obj=>{
              if(obj.nome == element && obj.mes == e){
                return true
              }else{
                return false
              }
            })
  

          
            if (verificationArray.length > 0){
              aux.push(verificationArray[0].valor_notas)
            }else{
              aux.push(0)
            }
          
          
 
        })

    matrix.push({empresa:element, valores:aux})
    aux = []

    
   
    });


console.log(matrix)

const chartElement = CallCharts(matrix, mes)

let i1 =0
let i2 = 0
let soma = matrix.map(e=>{
  
  return e.valores.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  i1)
}).reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  i2)
  
setSum(soma)


setElement(chartElement)
 
console.log(elements)

  }





useEffect(()=>{
setElement([])
  ChartsData('2023')




},[])
  

  




  return (
<>
<Group>
<Select mb={10} label="Ano" defaultValue={1} data={Array.from(new Array(new Date().getFullYear()-2020), (x, i) => 2021+i).map(e=>{return {value:e, label:e}})} onChange={(val)=>ChartsData(val)}></Select>
<Text weight={500} size={"xl"} color={"green"}>R$ {parseFloat(sum).toLocaleString()}</Text>
</Group>
<Grid columns={2}>

{elements.map(e=>{

  return <Grid.Col  sm={2} lg={1}>
    <Box style={{background:"#fff", padding:"1em ", borderRadius:"5px", height:"500px"}}>
  {e}
  </Box>
 </Grid.Col>
  }
  
  )}

 </Grid>
 </>
 )
}
