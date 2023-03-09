import { Row } from 'gridjs';
import React,{useState, useEffect, useRef} from 'react'
import DataTable from 'react-data-table-component';
import { Autocomplete, Button, Group, Modal, TextInput, Select } from '@mantine/core';
import { novoRecebivel } from "../api/api";
import { useForm } from '@mantine/form';




export default function MyDataTable({openModal, data=[], updated, setUpdated, update}){



const ExpandedComponent = ({ data }) => <div style={{marginLeft:"1em"}}><p><b>Observações: </b>{data.obs}</p></div>;
const [columns, setColums] = useState([])
const [allData, setAllData] = useState([])
const [tableData, setTableData] = useState([])
const [opened, setOpened] = useState(false)
const refNota = useRef(null)
const [lastFilter, setLastFilter] = useState(null) 

const reset = ()=>{

    form.reset()
    update()



  }

function filterData(data,text,i=0){

   let array =  data.filter(e=>{

        let verificated = false
        Object.values(e).forEach(e=>{
            
            if(String(e).includes(text.toUpperCase())){
                verificated = true
            }
        })
        return verificated
        
    })
    setTableData(array)

    setLastFilter({function:filterData, params:[text,i]})
}



async function updateNotas(){
 
    setTableData(data)
    let arrayColumns = data[0]
    delete arrayColumns.obs
    delete arrayColumns.statusCod
    const columns = Object.keys(arrayColumns).map(column=>{{
    if(column == 'status'){
        

        return {
        name:column.toUpperCase(), 
        selector:row=>{
            console.log(row[column])
            return row[column]}, 
        sortable: true,
        button: true,
		cell:(row)=><button onClick={()=>openModal(row.numero, row.Empresa)} style={{backgroundColor:"transparent", border:"none"}}>{row.status}</button>,
        conditionalCellStyles: [
			{
				when: row => row.status == "Pago",
				style: {
					backgroundColor: 'rgba(63, 195, 128, 0.9)',
					color: 'white',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			},
			{
				when: row => row.status == "Aguardando Pagamento",
				style: {
					backgroundColor: 'rgba(248, 148, 6, 0.9)',
					color: 'white',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			},
			{
				when: row => row.status == "Em atraso" || row.status == "Cancelada",
				style: {
					backgroundColor: 'rgba(242, 38, 19, 0.9)',
					color: 'white',
					'&:hover': {
						cursor: 'not-allowed',
					},
				},
			},
		],
	}
    

    }else if(column == "valor"){    

        return {name:column.toUpperCase(), selector:row=>row[column],cell:(row)=>row.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), sortable: true}
        
    }else if(column == "dataEmissao"||column == "dataPagamento"){
        return {name:column.toUpperCase(), selector:row=>row[column],cell:(row)=>row[column]?row[column].split('T')[0]:'', sortable: true}
    }else{
        return {name:column.toUpperCase(), selector:row=>row[column], sortable: true}
    }
    }})
    setColums(columns)
    
    let allDataArray = []
    let distinctArray = []
    let A = data
   
    data.forEach(element => {
     
        allDataArray = allDataArray.concat(Object.values(element).map(e=>String(e)))
    })

   const allDataArrayReduce = allDataArray.filter(e=>{
        console.log(e)
        if(distinctArray.includes(e) != true){
            distinctArray.push(e)
            
            return true 
        }

    })

    setAllData(allDataArrayReduce)
    if(lastFilter != null){
        lastFilter.function(data,lastFilter.params[0], lastFilter.params[1])
    }
 
    
}

async function insertNew(form){

    const data = {
        tipo:form.tipo,
        numero:form.numero,
        cnpj:form.cnpj, 
        valor:form.valor, 
        dataEmissao:form.dataEmissao
    }

    const res = await novoRecebivel(data)
    if(res.ok){
        setOpened(false)
        setUpdated(true)
        reset()
    }

}

const getSelectData =()=>{

    const result = tableData.reduce((acc, cur)=>{
        console.log(acc)
        if(!acc.includes(cur.cnpj)){
            return [...acc, cur.cnpj]
        }else{
            return acc
        }
    },[])

    console.log(result)
    return result

}

useEffect(()=>{
    
    if(updated){
    updateNotas()
  
    setUpdated(false)
 
}
})


function filterByDate(data,date,i){
    if(date){
    console.log(data)
    if(i == 1){

    let allDataArrayfiltred = data.filter(e=>e['dataEmissao'].split('T')[0].slice(0,7) == String(date))
    setTableData(allDataArrayfiltred)
    
}else{
    
    let allDataArrayfiltred = data.filter(e=>e['dataPagamento']?e['dataPagamento'].split('T')[0].slice(0,7) == String(date):false)
    setTableData(allDataArrayfiltred)
        

    }
    setLastFilter({function:filterByDate, params:[date,i]})
    }
}




const form = useForm({
    initialValues:{
        numero:'',
        tipo:'',
        cnpj:'', 
        valor:'', 
        dataEmissao:'',
        
    }
})


return(
    <>
    <></>
    <Modal
    opened={opened}
    onClose={() => setOpened(false)}
    >

        <form onSubmit={form.onSubmit((values)=>insertNew(values))}>

            <Select data={[{label:"Nota Fiscal", value:'1'}, {label:"Recebível Sem Nota", value:'2'}]} label={"Tipo de entrada"} ref={refNota} {...form.getInputProps("tipo")} required/>
            <TextInput label={"Número da nota"} {...form.getInputProps("numero")} disabled={form.values.tipo == 2} required={form.values.tipo == 1}/>
            <Select data={getSelectData()} label={"Cnpj"} searchable  {...form.getInputProps("cnpj")} required/>
            <TextInput label={"Valor"} type={"number"}  {...form.getInputProps("valor")} required/>
            <TextInput mt={10} type={"date"} label={"Data da emissão"}  {...form.getInputProps("dataEmissao")} required/>
            <Button mt={10} type={'submit'}>Salvar</Button>
                 
        </form>

    </Modal>
    <Group pb={"lg"}>
    <Autocomplete
      label="Buscar"
      placeholder="Filtro"
      data={allData}
      onChange={(val)=>filterData(data,val)}
    />
<TextInput type={'month'}  label="Data Emissão" onChange={(e)=>filterByDate(data,e.target.value,1)}/>
<TextInput type={'month'}  label="Data Pagamento" onChange={(e)=>filterByDate(data,e.target.value,2)}/>
<Button mt={20} onClick={()=>setOpened(true)} color={"green"}>Nova Entrada</Button>
    </Group>
   {data[0]?<DataTable
            columns={columns}
            data={tableData}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            pagination
            responsive
        />:<></>
   }
    </>
)




}