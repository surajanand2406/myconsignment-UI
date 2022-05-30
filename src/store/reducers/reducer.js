//VlQFUjFjlgblWkMnWSssLTzXRkI3
import { 
    login,
    logout,
    selectCategory,
    showListingCategoriesMOdal,
    hideListingCategoriesMOdal,
    setUID,
    renderItem,
    setChatData,
    addtListings,
    showDescriptionModal,
    hideDescriptionModal,
    setQuery,
    setFavoriteIds,
    setSubCategories,
    setShippingProfile,
    setShippings,
    selectShipping,
    showOrderModal,
    hideOrderModal,
    renderOrder,
    setCategories,
    hideSubCategoriesMOdal,
    setSubCategoriesForListing,
    setSubCategory,
    setPaymentInfo,
    setFlagData,
    setUserInfo,
    categorySelected,
    setListingCategories,
    pushListing,
    setLocation,
    becomePRO,
    favoriteItem,
    setFavorite
} from "../actions/actionNames";
const initialState = {
    isLoggedIn:false,
    userName:'',
    selectedCategory:'',
    showListingCategories:false,
    UID:'',
    item:null,
    chatData:null,
    data:[],
    showDescription:false,
    query:null,
    Favorites:[],
    subCategories:[],
    shippingProfile:null,
    shippings:[],
    selectedShipping:null,
    order:null,
    showOrder:false,
    categories:[],
    showSubCategories:false,
    selectedSubCategory:'',
    paymentInfo:null,
    flagData:null,
    userInfo:null,
    listingCategories:[],
    ChatData:[],
    categoryIndex:0,
    currentLocation:{
        lat: -1.2884,
        lng: 36.8233
    },
    isPRO:false,
    isFavorited:false
}

export default (state = initialState,action)=>{
    switch(action.type){
        case login:
        return{
            ...state,
            isLoggedIn:true,
            userName:action.payload
        }
        case logout:
        return {
            ...state,
            isLoggedIn:false,
            userName:''
        }
        case selectCategory:
        return{
            ...state,
            selectedCategory:action.payload,
            showListingCategories:false
        }
        case showListingCategoriesMOdal:
        return{
            ...state,
            showListingCategories:true
        }
        case hideListingCategoriesMOdal:

        return{
            ...state,
            showListingCategories:false
        }
        case setUID:
        return{
            ...state,
            UID:action.payload
        }
        case renderItem:
        return{
            ...state,
            item:action.payload
        }
        case setChatData:
        return{
            ...state,
            ChatData:action.payload
        }
        case addtListings:
        if(action.payload.page===1){
            return{
                ...state,
                data:action.payload.listings   
            }
        }
        else{
            return{
                ...state,
                data:[...state.data,...action.payload.listings]
            }
        }
        case showDescriptionModal:
        return{
            ...state,
            showDescription:true
        }
        case hideDescriptionModal:
        return{
            ...state,
            showDescription:false
        }
        case setQuery:
        return{
            ...state,
            query:action.payload
        }
        case setFavoriteIds:
            return{
                ...state,
                Favorites:action.payload
            }
        case setSubCategories:
            return{
                ...state,
                subCategories:action.payload.subCategories,
                selectedCategory:action.payload.category,
                categoryIndex:action.payload.index

            }
        case setShippingProfile:
            return{
                ...state,
                shippingProfile:action.payload
            }
        case setShippings:
            return{
                ...state,
                shippings:action.payload
            }
        case selectShipping:
            return{
                ...state,
                selectedShipping:action.payload
            }
        case showOrderModal:
            return{
                ...state,
                showOrder:true
            }
        case hideOrderModal:
            return{
                ...state,
                showOrder:false
            }
        case renderOrder:
            return{
                ...state,
                order:action.payload
            }
        case setCategories:
            return{
                ...state,
                categories:action.payload
            }
        case hideSubCategoriesMOdal:
            return{
                ...state,
                showSubCategories:false
            }
        case setSubCategoriesForListing:
            let data = state.categories.filter(cat=>{
                return cat._id === action.payload
            })
            return{
                ...state,
                subCategories:data[0].subCategories,
                showSubCategories:true
            }
        case setSubCategory:
            return{
                ...state,
                selectedSubCategory:action.payload,
                showListingCategories:false
            }
        case setPaymentInfo:
            return{
                ...state,
                paymentInfo:action.payload
            }
        case setFlagData:
            return{
                ...state,
                flagData:action.payload
            }
        case setUserInfo:
            return{
                ...state,
                userInfo:action.payload
            }
        case categorySelected:
                let datum = state.categories.filter(cat=>{
                    return cat._id === action.payload.id
                })
            return{
                ...state,
                showSubCategories:true,
                selectedCategory:action.payload.category,
                subCategories:datum[0].subCategories
            }
        case setListingCategories:
            return{
                ...state,
                listingCategories:action.payload
            }
        case pushListing:
            let listings = state.data
            listings.push(action.payload)
            return{
                ...state,
                data:listings
            }
        case setLocation:
            return{
                ...state,
                currentLocation:action.payload
            }

        case becomePRO:
            return{
                ...state,
                isPRO:true
            }
        case favoriteItem:
            let updatedItems = state.data.map(list=>{
                if(list._id===action.payload){
                    let itemObject={
                        ...list
                    }
                    itemObject.isFavorited=itemObject.isFavorited===true?false:true
                    return itemObject
                }
                else return list
            })
            return {
                ...state,
                data:updatedItems
            }
        case setFavorite:
            return{
                ...state,
                isFavorited:action.payload
            }
        default:
        return state
    }
}