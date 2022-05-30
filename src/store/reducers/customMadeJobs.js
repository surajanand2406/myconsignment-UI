import CustomMadeState from '../States/CustomMadeState'

const CustomMadeJobReducer=(state=CustomMadeState,action)=>{
    console.log("CustomMadeJobReducergg : ", action)
    switch(action.type)
    {
        case 'CUSTOM_MADE_JOB':
            {
                return{
                    customMadeState:action.payload
                }
            }
        
        default:
            return state;
    }
}

export default CustomMadeJobReducer;