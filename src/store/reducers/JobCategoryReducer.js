import JobCategoryState from '../States/JobCategoryState'

const JobCategoryReducer = (state = JobCategoryState, action)=>{
    
    switch(action.type)
    {
        case "READCATEGORY":
            {
                
               return{
                   CategoriesData:action.payload
               }

                
            }
        case 'ADDCATEGORY':
            {
                var newCate = state.CategoriesData.concat(action.payload)

                return{
                    CategoriesData:newCate
                }
            }
        case 'DELETECATEGORY':
            {
               var newCategory = state.CategoriesData.filter(data=>{
                    if(data._id !== action.payload._id)
                    {
                        return data
                    }
                })

                return{
                    CategoriesData:newCategory
                }
            }

        default:
            return state;
    }
}

export default JobCategoryReducer;