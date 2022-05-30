
import  ExclusiveState from '../States/ExclusiveState'

const exclusiveServices=(state=ExclusiveState,action)=>{
    console.log("EXCLUSIVE_SERVICESdfgdf : ", action);
    switch(action.type)
    {
        case 'EXCLUSIVE_SERVICES':
            {
                return{
                    exclusiveData:action.payload
                }
            }
        default:
            return state;
    }
} 

export default exclusiveServices;