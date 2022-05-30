import {url} from '../../Constants'

export const ReadJob = () =>{
        return(dispatch)=>{

                fetch(url+'/readjob')
                .then(res=>res.json())
                .then(res2=>{
                        dispatch({type:'READJOB',payload:res2})
                })
        }
}


export const PostNewJob = (data) =>{
        return(dispatch)=>{

                fetch(url+'/postjob',{
                method:'Post',
                body:JSON.stringify(data),
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

export const UpdateJob = (data) =>{

        return(dispatch)=>{

                fetch(url+'/updatejob',{
                method:'put',
                body:JSON.stringify(data),
                headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                }
                })
                .then(res=>res.json())
                .then(res2=>{
                        dispatch({type:'UPDATEJOB',payload:res2})
                })
        }
}

export const DeleteJob = (Id) =>{
        return(dispatch)=>{

                fetch(url+'/deletejob',{
                method:'Delete',
                body:JSON.stringify(Id),
                headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                }
                })
                .then(res=>res.json())
                .then(res2=>{
                        dispatch({type:'DELETE',payload:res2})
                })
        }
}

export const Filter = (filterData)=>{
        return(dispatch)=>{
                dispatch({type:'Filter',payload:filterData})
        }
}
export const ResetFilter = ()=>{

        return(dispatch)=>{
                dispatch({type:'Reset'})
        }
}



