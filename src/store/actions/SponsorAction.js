import {url} from '../../Constants'

export const ReadEvent=()=>{

    return(dispatch)=>{

        fetch(url+'/readevent')
        .then(res=>res.json())
        .then(res2=>{
            dispatch({type:'READEVENT',payload:res2})
        })
        
        
    }
    
}

export const StartEvent = (newEvent) =>{
    return(dispatch)=>{

        fetch(url+'/startevent',{
            method:'Post',
            body:JSON.stringify(newEvent),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
        })
        .then(res=>res.json())
        .then(res2=>{
            dispatch({type:'STARTEVENT',payload:res2})
        })
        
        
    }
}

export const UpdateEvent = (value) =>{


    return(dispatch)=>{

        fetch(url+'/updateevent',{
            method:'Put',
            body:JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
        })
        .then(res=>res.json())
        .then(res2=>{
            dispatch({type:'UPDATEEVENT',payload:res2})
        })
         
    }
    
}

export const DeleteComment = (data) =>{

    return(dispatch) =>{
        fetch(url+'/deletecomment',{
            method:'Put',
            body:JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
        })
        .then(res=>res.json())
        .then(res2=>{

            dispatch({type:'DCOMMENT',payload:res2})
        })
    }

}

export const AddComment=(comment)=>{
    return(dispatch) =>{

        fetch(url+'/addcomment',{
            method:'Put',
            body:JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
        })
        .then(res=>res.json())
        .then(res2=>{

            dispatch({type:'COMMENT',payload:res2})
        })
    }
}


export const AddDonation=(donatedAmount)=>{

    return(dispatch) =>{

        fetch(url+'/donation',{
            method:'Put',
            body:JSON.stringify(donatedAmount),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
        })
        .then(res=>res.json())
        .then(res2=>{
           dispatch({type:'DONATION',payload:res2})
        })
    }

}
