import CatagoryState from '../States/CatagoryState'

const AllCatagoryReducer=(state=CatagoryState,action)=>{
    console.log("dsjkfhks : ", action)
    switch(action.type)
    {
        case 'ALL_CATAGORY':
            {
                return{
                    catagoryState:action.payload.docs
                }
            }
        
        default:
            return state;
    }
}

export default AllCatagoryReducer;