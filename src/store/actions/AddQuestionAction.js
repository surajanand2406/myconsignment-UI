import {url} from '../../Constants'

export const ReadQuestions=()=>{
    return(dispatch)=>{

        fetch(url+'/readquestions')
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'ReadQues',payload:res2})
            })

    }
}

export const AddTopic=(topic)=>{
    return(dispatch)=>{
        fetch(url+'/addtopic',{
            method:'Post',
            body:JSON.stringify(topic),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'AddTopic',payload:res2})
            })
        
    }
}

export const AddNewQuestion=(Question)=>{
    return(dispatch)=>{
        fetch(url+'/addquestion',{
            method:'Put',
            body:JSON.stringify(Question),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'AddQuestion',payload:res2})
            })
        
    }
}