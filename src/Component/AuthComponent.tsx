import React, { ReactComponentElement, ReactElement, ReactNode } from "react"
import { getToken } from "../utils"
import {Navigate} from 'react-router-dom'

interface IProps{
    children:ReactNode
}
const AuthComponent=({children}:IProps)=>{

    const isToken=getToken()
    if(isToken){
        
        return <React.Fragment>{children}</React.Fragment>
    }else{
        return <Navigate to={'/login'} replace/>
    }
    
}

export {AuthComponent}