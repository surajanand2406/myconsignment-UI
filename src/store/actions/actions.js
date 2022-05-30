
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
    setFavorite,
    allCatagory,
    
} from "./actionNames";
 
export function AllCatagoryAction(data){
    return dispatch=>{
        dispatch({
            type:allCatagory,
            payload:data
        })
    }
}
// export function AllCatagoryAction(data){
//     return dispatch=>{
//         dispatch({
//             type:exclusiveServices,
//             payload:data
//         })
//     }
// }

export function LoginAction(username){
    return dispatch=>{
        dispatch({
            type:login,
            payload:username
        })
    }
}


export function LogoutAction(){
    return dispatch=>{
        dispatch({
            type:logout
        })
    }
}
export function becomePROAction(){
    return dispatch=>{
        dispatch({
            type:becomePRO
        })
    }
}
export function selectCategoryAction(category){
    return dispatch=>{
        dispatch({
            type:selectCategory,
            payload:category
        })
    }
}
export function showListingCategoriesAction(){
    return dispatch=>{
        dispatch({
            type:showListingCategoriesMOdal
        })
    }
}
export function hideListingCategoriesAction(){
    return dispatch=>{
        dispatch({
            type:hideListingCategoriesMOdal
        })
    }
}
export function setUIDAction(UID){
    return dispatch=>{
        dispatch({
            type:setUID,
            payload:UID
        })
    }
}
export function renderItemAction(item){
    return dispatch=>{
        dispatch({
            type:renderItem,
            payload:item
        })
    }
}
export function setChatDataAction(chat){
    return dispatch=>{
        dispatch({
            type:setChatData,
            payload:chat
        })
    }
}

export function addtListingsAction(listingsData){
    return dispatch=>{
        dispatch({
            type:addtListings,
            payload:listingsData
        })
    }
}
export function favoriteItemAction(id){
    return dispatch=>{
        dispatch({
            type:favoriteItem,
            payload:id
        })
    }
}
export function showDescriptionModalAction(){
    return dispatch=>{
        dispatch({
            type:showDescriptionModal
        })
    }
}
export function hideDescriptionModalAction(){
    return dispatch=>{
        dispatch({
            type:hideDescriptionModal
        })
    }
}
export function setQueryAction(query){
    return dispatch=>{
        dispatch({
            type:setQuery,
            payload:query
        })
    }
}
export function setFavoriteIdsAction(ids){
    return dispatch=>{
        dispatch({
            type:setFavoriteIds,
            payload:ids
        })
    }
}

export function setSubCategoriesAction(categories){
    return dispatch=>{
        dispatch({
            type:setSubCategories,
            payload:categories
        })
    }
}
export function setShippingProfileAction(profile){
    return dispatch=>{
        dispatch({
            type:setShippingProfile,
            payload:profile
        })
    }
}
export function setShippingsAction(profiles){
    return dispatch=>{
        dispatch({
            type:setShippings,
            payload:profiles
        })
    }
}
export function setFavoriteAction(type){
    return dispatch=>{
        dispatch({
            type:setFavorite,
            payload:type
        })
    }
}
export function selectShippingAction(profile){
    return dispatch=>{
        dispatch({
            type:selectShipping,
            payload:profile
        })
    }
}
export function showOrderModalAction(){
    return dispatch=>{
        dispatch({
            type:showOrderModal
        })
    }
}
export function hideOrderModalAction(){
    return dispatch=>{
        dispatch({
            type:hideOrderModal
        })
    }
}
export function renderOrderAction(order){
    return dispatch=>{
        dispatch({
            type:renderOrder,
            payload:order
        })
    }
}
export function setCategoriesAction(categories){
    return dispatch=>{
        dispatch({
            type:setCategories,
            payload:categories
        })
    }
}
export function setLocationAction(location){
    console.log('action=>',location)
    return dispatch=>{
        dispatch({
            type:setLocation,
            payload:location
        })
    }
}
// export function showSubCategoriesMOdalAction(){
//     return dispatch=>{
//         dispatch({
//             type:showSubCategoriesMOdal
//         })
//     }
// }
export function hideSubCategoriesMOdalAction(){
    return dispatch=>{
        dispatch({
            type:hideSubCategoriesMOdal
        })
    }
}
export function setSubCategoriesForListingAction(id){
    return dispatch=>{
        dispatch({
            type:setSubCategoriesForListing,
            payload:id
        })
    }
}
export function setListingsCategoriesAction(categories){
    return dispatch=>{
        dispatch({
            type:setListingCategories,
            payload:categories
        })
    }
}
export function setSubCategoryAction(cat){
    return dispatch=>{
        dispatch({
            type:setSubCategory,
            payload:cat
        })
    }
}
export function pushListingAction(listing){
    return dispatch=>{
        dispatch({
            type:pushListing,
            payload:listing
        })
    }
}
export function setPaymentInfoAction(info){
    return dispatch=>{
        dispatch({
            type:setPaymentInfo,
            payload:info
        })
    }
}

export function setFlagDataAction(data){
    return dispatch=>{
        dispatch({
            type:setFlagData,
            payload:data
        })
    }
}
export function setUserInfoAction(userdata){
    return dispatch=>{
        dispatch({
            type:setUserInfo,
            payload:userdata
        })
    }
}
export function categorySelectedAction(data){
    return dispatch=>{
        dispatch({
            type:categorySelected,
            payload:data
        })
    }
}