import {url} from '../../Constants'

export const ReadCategory = () =>{

    return(dispatch)=>{
        fetch(url+'/readcategory')
        .then(res=>res.json())
        .then(res2=>{
         dispatch({type:'READCATEGORY',payload:res2})
        })
    }
    
}

export const NewCategory = (data) =>{

    return(dispatch)=>{

        fetch(url+'/addcategory',{
            method:'Post',
            body:JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(res2=>{
        dispatch({type:'ADDCATEGORY',payload:res2})
        })
    }

}

export const DeleteCategory = (Id) =>{

    return(dispatch)=>{
        fetch(url+'/deletecategory',{
            method:'Delete',
            body:JSON.stringify(Id),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(res2=>{
            dispatch({type:'DELETECATEGORY',payload:res2})
        })
    }

}