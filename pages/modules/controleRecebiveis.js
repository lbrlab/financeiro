
import React,{useRef, useEffect, useState} from "react";
import { Text, Space, Box } from "@mantine/core";
import "gridjs/dist/theme/mermaid.css";
import { notas } from "../api/api";
import MyDataTable from '../components/tabelaRecebiveis'
import Mymodal from "../components/mymodal";
import DashCards from "../components/mycards";
import  ChartRecebiveis  from "../components/chartRecebiveis";

function ControleRecebiveis(){


    const [data, setData] = useState([])
    const [opened, setOpened] = useState(false)
    const [updated, setUpdated] = useState(true)


    const [title, setTitle] = useState("")
    const [id, setId] = useState("")

    function openModal(id, title){

        setId(id)
        setTitle(title)
        setOpened(true)
    }








 /*   const  getData = async ()=>{


        const res = await notas()
        setColumns(['Nº', 'CNPJ', 'Empresa', 'Valor', 'Data' ,{ 
            name: 'Status',
            formatter: (cell, row) => {
              return h('button', {
                className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                onClick: () => openModal(row.cells[0].data, row.cells[2].data)
              }, row.cells[5].data);
            }
          }, 'Previsão/Pagamento']
          )
        setData(res.map(e=>{
            
            e.bt = ""
            e.dataEmissao = new Date(e.dataEmissao).toLocaleDateString()
            e.dataPagamento = e.dataPagamento == null?'Não informado':new Date(e.dataPagamento).toLocaleDateString()
            e.valor = `R$ ${parseFloat(e.valor).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
            return Object.values(e)
        }))

    }

*/

const getNotas = async ()=>{
  const response = await notas()
  setData(response)
}





const update = async()=>{
      await getNotas()
      setOpened(false)
      setUpdated(true)
      
    }



    useEffect(() => {
      getNotas()
    },[])


  /*useEffect(() => {
    
    
    if(columns.length == 0){

    getData()
    }

    if(columns.length > 0){

    
    const grid = new Grid({
      pagination: true,
      search: true,
      width:'fit-content',
      sort: true,
      language: {
          'search': {
            'placeholder': '🔍 Buscar...'
          },
          'pagination': {
            'previous': '⬅️',
            'next': '➡️',
            'showing': 'Mostrando',
            'results': () => 'Resultados'
          }
        },
      
      columns: columns,
      data: data
    }).render(wrapperRef.current)



    
}
  });*/



  
  return (
  <>
  <Text size={'xl'} weight={500}>Recebíveis</Text>
  <Space h="xl" />
<Mymodal opened={opened} setOpened={setOpened} title={title} id={id} update={update} data={data}/>
<Space h="xl" />
<DashCards/>
<Space h="xl" />
  {data[0]?<MyDataTable update={update} updated={updated} setUpdated={setUpdated} openModal={openModal} data={data}/>:<></>}
<ChartRecebiveis/>
  </>

  );
  
}
    



export default ControleRecebiveis;
