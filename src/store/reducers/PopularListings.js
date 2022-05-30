
import  PopularListingState from '../States/PopularListingState'

const PopularListing=(state=PopularListingState,action)=>{
    console.log("POPULAR_LISTINGSsss : ", action);
    switch(action.type)
    {
        case 'POPULAR_LISTINGS':
            {
                return{
                    popularListing:action.payload
                }
            }
        default:
            return state;
    }
} 

export default PopularListing;