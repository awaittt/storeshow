import React,{useContext} from "react"
import { LoginStore } from "./Login.Store"
import { UserStore } from "./UserStore"



class RootStore {
    constructor() {
      this.loginStore = new LoginStore()
      this.userStore=new UserStore()
      // ...
    }
  }
  
  // 实例化根
  // 导出useStore context
  const rootStore = new RootStore()
  const context = React.createContext(rootStore)
  
  const useStore = () => React.useContext(context)
  
  export { useStore }