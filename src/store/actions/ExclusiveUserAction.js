import {url} from '../../Constants'

export const RequestForRegisteration = (userData)=>{
    
    return(dispatch)=>{
        fetch(url+'/requestforregisteration',{
        method:'Post',
        body:JSON.stringify(userData),
        headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
        }
        })
        .then(res=>res.json())
        .then(res2=>{
            dispatch({type:'POST',payload:res2})
        })
    } 
}


export const RegisterExclusiveUser = () =>{
  
}


export const ReadExclusiveUserData = () =>{
    return(dispatch)=>{
        fetch(url+'/readexclusiveuserdata')
        .then(res=>res.json())
        .then(res2=>{
            dispatch({type:'User_Data',payload:res2})
        }) 
    }
}

export const ChnageExclusiveProfileImage = (Image)=>{
    
    return(dispatch)=>{
        fetch(url+'/changeprofileimage',{
        method:'Put',
        body:JSON.stringify(Image),
        headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
        }
        })
        .then(res=>res.json())
        .then(res2=>{
            dispatch({type:'ChangeImage',payload:res2})
        })
    } 
}

export const UpdateExclusiveUserData = (updatedData)=>{
    
    return(dispatch)=>{
        fetch(url+'/updateexclusiveuserdata',{
        method:'Put',
        body:JSON.stringify(updatedData),
        headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
        }
        })
        .then(res=>res.json())
        .then(res2=>{
            dispatch({type:'UpdateUser',payload:res2})
        })
    } 
}

