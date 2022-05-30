import  {allCatagory,exclusiveServices,featuredListing,customMadeJob,popularListings} from "./actionNames";
import {url} from '../../Constants'
 

export const allCatagoryAction=()=>{
    return(dispatch)=>{
        fetch(url+'/api/getCategories',{
            method:'Get',
            body:JSON.stringify(),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                console.log("sssss : ", res2);
               dispatch({
                type:allCatagory,
                payload:res2
            })
            })
        
    }
}


export const exclusiveService=()=>{
    return(dispatch)=>{
        fetch(url+'/readexclusiveservices',{
            method:'Get',
            body:JSON.stringify(),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                console.log("readexclusiveservices : ", res2);
               dispatch({
                type:exclusiveServices,
                payload:res2
            })
            })
    }
}

export const featureListing=()=>{
    return(dispatch)=>{
        fetch(url+'/api/getFeaturedListings',{
            method:'Get',
            body:JSON.stringify(),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                console.log("/api/getFeaturedListings : ", res2);
               dispatch({
                type:featuredListing,
                payload:res2
            })
            })
    }
}



export const customMadeJobs=()=>{
    return(dispatch)=>{
        fetch(url+'/readJob',{
            method:'Get',
            body:JSON.stringify(),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                console.log("/readJobs : ", res2);
               dispatch({
                type:customMadeJob,
                payload:res2
            })
            })
    }
}



export const popularListing=()=>{
    return(dispatch)=>{
        fetch(url+'/api/getPopularListings1',{
            method:'Post',
            body:JSON.stringify(),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
            })
            .then(res=>res.json())
            .then(res2=>{
                console.log("/popularListing : ", res2);
               dispatch({
                type:popularListings,
                payload:res2
            })
            })
    }
}