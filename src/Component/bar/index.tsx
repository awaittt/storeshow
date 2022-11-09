import React, { FC, useEffect } from "react";
import * as echarts from 'echarts'
interface IProps{}
const BarEcharts:FC=({}:IProps)=>{
    const domRef:any=React.useRef<HTMLDivElement>()
    let  myChart:echarts.ECharts
    const setOption=()=>{
        myChart=echarts.init(domRef.current)
      const  option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      };
          if(domRef.current){
            myChart.setOption(option)
        }
        }
    useEffect(()=>{
        myChart=echarts.init(domRef.current)
        setOption()
    },[])
    useEffect(()=>{
        setOption()
    },[])
    return (
        <div ref={domRef} style={{width:'500px',height:'400px'}}></div>
    )
}


export {BarEcharts}