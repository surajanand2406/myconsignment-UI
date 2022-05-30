import {url} from '../../Constants'

export const ReadChats = ()=>{

    return(dispatch)=>{

            fetch(url+'/readchatdata')
            .then(res=>res.json())
            .then(res2=>{
                    dispatch({type:'READCHATS',payload:res2})
            })
    }

}
export const SendPropsal = (data)=>{

        return(dispatch)=>{

                fetch(url+'/sendproposal',{
                method:'post',
                body:JSON.stringify(data),
                headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                }
                })
                .then(res=>res.json())
                .then(res2=>{
                        dispatch({type:'PROPOSAL',payload:res2})
                })
        }

}


export const ReadMessege = (Id)=>{

        return(dispatch)=>{

                fetch(url+'/readmessege',{
                method:'post',
                body:JSON.stringify(Id),
                headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                }
                })
                .then(res=>res.json())
                .then(res2=>{
                        dispatch({type:'ReadMessege',payload:res2})
                })
        }

}