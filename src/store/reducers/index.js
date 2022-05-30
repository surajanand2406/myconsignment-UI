import reducer from './reducer'
import SponsorReducer from './SponsorReducer'
import JobBoardReducer from './JobBoardReducer'
import JobCategoryReducer from './JobCategoryReducer'
import ChatReducer from './ChatReducer'
import OrderReducer from './OrderReducer'
import ExclusiveUserReducer from './ExclusiveUserReducer'
import ExclusiveServicesReducer from './ExclusiveServicesReducer'
import ExclusiveOrderReducer from './ExclusiveOrderReducer'
import HelpCenterReducer from './AddQuestionReducer'
import BlogReducer from './BlogReducer'
import AllCatagoryReducer from "./catagoryReducer"
import exclusiveServices from "./exclusiveServices"
import FeaturedListing from "./FeaturedListing"
import CustomMadeJobReducer from "./customMadeJobs"
import PopularListing from "./PopularListings"

import { combineReducers } from "redux"


export default combineReducers({
    rootReducer:reducer,
    SponsorReducer,
    JobBoardReducer,
    JobCategoryReducer,
    ChatReducer,
    OrderReducer,
    ExclusiveUserReducer,
    ExclusiveServicesReducer,
    ExclusiveOrderReducer,
    HelpCenterReducer,
    BlogReducer,
    AllCatagoryReducer,
    exclusiveServices,
    FeaturedListing,
    CustomMadeJobReducer,
    PopularListing
})