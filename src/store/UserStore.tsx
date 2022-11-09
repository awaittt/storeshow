import { makeAutoObservable } from "mobx"
import { http } from "../utils"


class UserStore{
    userInfo={}
    constructor(){
        makeAutoObservable(this)
    }
    //调用接口
    getUserInfo=async()=>{
    const res= await (await http.get('/user/profile'))
     this.userInfo =res.data
       
    }
}
export {UserStore}