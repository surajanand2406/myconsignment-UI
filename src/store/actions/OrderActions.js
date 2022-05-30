import {url} from '../../Constants'

export const ReadOrders = () =>{
        return(dispatch)=>{

                fetch(url+'/readorders')
                .then(res=>res.json())
                .then(res2=>{
                        dispatch({type:'READORDERS',payload:res2})
                })
        }
}

export const CreateOrder = (data) =>{
        console.log(data)
    return(dispatch)=>{

            fetch(url+'/createorder',{
            method:'Post',
            body:JSON.stringify(data),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'CreateOrder',payload:res2})
            })
    }
}


export const CancelJob = (Id) =>{
        return(dispatch)=>{

                fetch(url+'/canceljob',{
                method:'Delete',
                body:JSON.stringify(Id),
                headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                }
                })
                .then(res=>res.json())
                .then(res2=>{
                        dispatch({type:'CancelOrder',payload:res2})
                })
        }
}

export const CancelOrder = (Id) =>{
        return(dispatch)=>{

                fetch(url+'/cancelorder',{
                method:'Delete',
                body:JSON.stringify(Id),
                headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                }
                })
                .then(res=>res.json())
                .then(res2=>{
                        dispatch({type:'CancelOrder',payload:res2})
                })
        }
}

export const CompleteOrder = (data) =>{

        return(dispatch)=>{

                fetch(url+'/completeorder',{
                method:'put',
                body:JSON.stringify(data),
                headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                }
                })
                .then(res=>res.json())
                .then(res2=>{
                       // dispatch({type:'UPDATEJOB',payload:res2})
                })
        }
}


