import {makeAutoObservable} from 'mobx'
import  {http,getToken,setToken,removeToken} from '../utils/index'

interface login{
    mobile:number,
    code:number
    
}
class LoginStore{
     token=getToken()||''

    constructor(){
        //响应式
    }
    getToken=async({mobile,code}:login)=>{
        //调用登录接口
    const res=   await http.post('http://geek.itheima.net/v1_0/authorizations',{
        mobile,code
       })
        //存入token
        console.log(res.data)

        this.token=res.data.token
        //存到本地
        setToken(res.data.token)
    }
    clearToken=()=>{
        this.token=''
        removeToken()
    }
}

export {LoginStore}