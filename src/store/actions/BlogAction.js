import {url} from '../../Constants'

export const ReadBlogs=()=>{
    return(dispatch)=>{

        fetch(url+'/readblogs')
            .then(res=>res.json())
            .then(res2=>{
               dispatch({type:'ReadBlog',payload:res2})
            })

    }
}

export const AddCategory=(Category)=>{

    return(dispatch)=>{
        fetch(url+'/addblogcategory',{
            method:'Post',
            body:JSON.stringify(Category),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
               dispatch({type:'AddCategory',payload:res2})
            })
        
    }
}

export const AddNewBlog=(Blog)=>{
    return(dispatch)=>{
        fetch(url+'/addnewblog',{
            method:'Put',
            body:JSON.stringify(Blog),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'AddBlog',payload:res2})
            })
        
    }
}
export const AddComment=(Comment)=>{
    return(dispatch)=>{
        fetch(url+'/addblogcomment',{
            method:'Put',
            body:JSON.stringify(Comment),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type:'AddCom',payload:res2})
            })
        
    }
}