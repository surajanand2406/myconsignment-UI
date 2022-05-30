import {url} from '../../Constants'

export const ReadExclusiveServices=()=>{
    return(dispatch)=>{
        fetch(url+'/readexclusiveservices')
            .then(res=>res.json())
            .then(res2=>{
                console.log('read => ',res2)
                    dispatch({type:'ReadServices',payload:res2})
            })

    }
}

export const AddExclusiveService=(serviceData)=>{
    return(dispatch)=>{

        fetch(url+'/addexclusiveservice',{
            method:'Post',
            body:JSON.stringify(serviceData),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                    dispatch({type:'AddNewService',payload:res2})
            })
        
    }
}

export const UpdateExclusiveService=(updatedService)=>{
    return(dispatch)=>{

        fetch(url+'/updateexclusiveservice',{
            method:'Put',
            body:JSON.stringify(updatedService),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                    dispatch({type:'UpdateService',payload:res2})
            })
        
    }
}

export const DeleteExclusiveServices=(deleteService)=>{
    return(dispatch)=>{

        fetch(url+'/deleteexclusiveservice',{
            method:'Delete',
            body:JSON.stringify(deleteService),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'DeletedService',payload:res2})
            })
        
    }
}

export const AddExclusiveServiceReview=(Review)=>{
    return(dispatch)=>{

        fetch(url+'/addexclusiveservicereview',{
            method:'Put',
            body:JSON.stringify(Review),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'Review',payload:res2})
            })
        
    }
}