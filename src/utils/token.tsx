

const key='zhouwen_key'



const setToken=(token:any)=>{
    return window.localStorage.setItem(key,token)

}
const getToken=()=>{
    return window.localStorage.getItem(key)

}



const removeToken=()=>{
    return window.localStorage.removeItem(key)

}

export {
    removeToken,setToken,getToken
}