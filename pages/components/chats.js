
import React from 'react';
import stc from 'string-to-color';
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  LineController,
  BarController,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Chart } from 'react-chartjs-2';



export default function CallCharts(matrix=[], mes=[]){

try{

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

    const labels = mes[0]?mes.map(e=>meses[e]):[]

    const sumData = {
        type:"line",
        label: "Soma",
        fill: false,
        data:labels.map((e,i)=>{
        let aux = 0
        matrix.forEach(element => {
            aux += element.valores[i]
        });
        return aux
        }),
        backgroundColor:"#000"


}



    const segData = matrix.map(e=>
        {return({
          type:'bar',
          label: e.empresa,
          data: e.valores,
          backgroundColor: stc(e.empresa),
        })})

    segData.push(sumData)
    console.log(segData)
    

    ChartJS.register(
        LinearScale,
        CategoryScale,
        BarElement,
        PointElement,
        LineElement,
        Legend,
        Tooltip,
        LineController,
        BarController
      );
    let options = {
        layout: {
            padding: 10
        },
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: "Notas por mês",
        },
      },
    };

    let  data = {
      labels,
      datasets: segData
      ,
    };

    console.log(data)
const bar1 = <Chart type='bar' options={options} data={data} />







options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
      },
    },
  };

  ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
 data = {
    labels: matrix.map(e=>e.empresa),
    datasets: [
      {
        label: "Notas por empresa",
        data: matrix.map(e=>{
          let initialValue = 0
          return e.valores.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          initialValue)
        
        }
        
        ),
        backgroundColor: matrix.map(e=>stc(e.empresa))
        
      },
    ],
  };


  const pie1 = <Pie options={options} data={data} />





 return [pie1, bar1]

 
}catch{
  return[<></>,<></>]
}








}