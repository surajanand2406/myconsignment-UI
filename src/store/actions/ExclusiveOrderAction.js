import {url} from '../../Constants'

export const ReadExclusiveOrders=()=>{
    return(dispatch)=>{

        fetch(url+'/readexclusiveorders')
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'ReadOrders',payload:res2})
            })

    }
}

export const CreateExclusiveOrder=(orderData)=>{
    return(dispatch)=>{

        fetch(url+'/createexclusiveorder',{
            method:'Post',
            body:JSON.stringify(orderData),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'CreateNewOrder',payload:res2})
            })
        
    }
}

export const DeleteExclusiveSellerOrder=(deleteOrder)=>{
    return(dispatch)=>{

        fetch(url+'/deleteexclusivesellerorder',{
            method:'Delete',
            body:JSON.stringify(deleteOrder),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'DeleteSellerOrder',payload:res2})
            })
        
    }
}

export const DeleteExclusiveBuyerOrder=(deleteOrder)=>{
    
    return(dispatch)=>{
        
        fetch(url+'/deleteexclusivebuyerorder',{
            method:'Delete',
            body:JSON.stringify(deleteOrder),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'DeleteSellerOrder',payload:res2})
            })
    }
}

export const CompleteExclusiveSellerOrder=(completeOrder)=>{
    return(dispatch)=>{

        fetch(url+'/completeexclusiveorder',{
            method:'Put',
            body:JSON.stringify(completeOrder),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'CompleteOrder',payload:res2})
            })
        
    }
}