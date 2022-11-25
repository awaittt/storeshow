import React from "react";
import { BarEcharts } from "../../../Component/bar";
import styles from './index.module.scss'
import {
  UserOutlined
} from '@ant-design/icons';
interface userArr{
  name:string,
  value:number,
  color:string
}
const Home = () => {
 
  let userArr:Array<userArr>=[
    {name:'总用户',value:99,color:'#4096ff'},
    {name:'在线用户',value:66,color:'#bae637'},
    {name:'离线用户',value:22,color:'#f0f0f0'},
    {name:'禁用用户',value:1 ,color:'#ff7875'},
    {name:'异常用户',value:10,color:'#ffc069'},
  ]
  return (
    <div className={styles.main}>
      <div className={styles.title}>
              {userArr.map((f1)=>{
                return (
                  <div className={styles.lis}>
                    <div className={styles.icon}   style={{backgroundColor:`${f1.color}` }}>
                             <UserOutlined />
                    </div>
                    <div className={styles.detail}>
                      <span className={styles.value}>{f1.value}</span>
                    <span className={styles.name}>{f1.name}</span>

                    </div>
                  </div>
                )
              })}
      </div>
      
      <BarEcharts/>
    </div>
  );
};

export default Home;
