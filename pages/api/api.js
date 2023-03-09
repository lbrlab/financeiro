


export const notas = async()=>{

    const req = await fetch('http://192.168.0.126:8081/local/financeiro/notas', {method:'POST'})

    const res = req.json()

    return res
    

    
}

export const status = async()=>{

    const req = await fetch('http://192.168.0.126:8081/local/financeiro/status', {method:'POST'})

    const res = req.json()

    return res
    

    
}

export const credores = async()=>{

    const req = await fetch('http://192.168.0.126:8081/local/financeiro/credores', {method:'POST'})

    const res = req.json()

    return res
    

    
}


export const statusNota = async(params)=>{

    const req = await fetch('http://192.168.0.126:8081/local/financeiro/statusnota', {method:'POST', body:JSON.stringify(params)})

    const res = req.json()

    return res
    

}



export const upForm =  async (route,params)=>{


    const req = await fetch(`http://192.168.0.126:8081/local/${route}`, {method:'POST', body:JSON.stringify(params), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})
    
    return req

}

export const prevMes = async()=>{

    
    const req = await fetch('http://192.168.0.126:8081/local/financeiro/previsaomes', {method:'POST'})

    const res = req.json()

    return res


}


export const contasHoje = async()=>{

    try{
    const req = await fetch('http://192.168.0.126:8081/local/financeiro/contashoje', {method:'POST'})

    const res = await req.json()

    return res

    }catch(error){
        return []
    }

}


export const contasData = async(data)=>{

    const req = await fetch('http://192.168.0.126:8081/local/financeiro/contasdata', {method:'POST', body:JSON.stringify(data), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})

    const res = req.json()

    return res

}


export const enviaConta = async(valor, refe, cod, id)=>{
    const params = {title:refe, msg:"Valor: R$"+valor}

    await fetch('http://192.168.0.126:8081/sendwhats', {method:'POST', body:JSON.stringify(params), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})

    if(cod !=""){
     
    const params2 = {title:'', msg:cod}

        await fetch('http://192.168.0.126:8081/sendwhats', {method:'POST', body:JSON.stringify(params2), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})

    }

    const data = {id:id} 
    await fetch('http:///192.168.0.126:8081/local/financeiro/enviocontas', {method:'POST', body:JSON.stringify(data), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})



    return

    

}



export const notasMes = async (data)=>{

    const req = await fetch('http:///192.168.0.126:8081/local/financeiro/notasmes', {method:'POST', body:JSON.stringify(data), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})

    const res = await req.json()

    return res

}


export const novoRecebivel = async (req)=>{

    let data = {}
    if(req.tipo == 1){

        data = { 
        numero:req.numero,
        cnpj:req.cnpj, 
        valor:req.valor, 
        dataEmissao:req.dataEmissao,}
    }else{
        data = { 
            cnpj:req.cnpj, 
            valor:req.valor, 
            dataEmissao:req.dataEmissao,}
    }
    const res = await fetch(`http:///192.168.0.126:8081/local/financeiro/${req.tipo == 1?"nota":"semnota"}`, {method:'POST', body:JSON.stringify(data), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})


    

    return res


}


