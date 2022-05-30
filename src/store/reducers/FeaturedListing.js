
import  FeaturedListingState from '../States/FeaturedListingState'

const FeaturedListing=(state=FeaturedListing,action)=>{
    console.log("FEATURED_LISTING : ", action);
    switch(action.type)
    {
        case 'FEATURED_LISTING':
            {
                return{
                    FeaturedListing:action.payload
                }
            }
        default:
            return state;
    }
} 

export default FeaturedListing;