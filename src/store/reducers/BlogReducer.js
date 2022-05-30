import BlogState from '../States/BlogState'

const BlogReducer=(state=BlogState,action)=>{
    switch(action.type)
    {
        case 'ReadBlog':
            {
                return{
                    BlogData:action.payload
                }
            }
        case 'AddBlog':
            {
                var newArr = state.BlogData.map(data=>{
                    if(data._id === action.payload._id)
                    {
                        data= action.payload
                        return data
                    }
                    return data
                })

                return{
                    BlogData:newArr
                }
            }
        case 'AddCategory':
            {
                return{
                    BlogData:state.BlogData.concat(action.payload)
                }
            }
        case 'AddCom':
            {
                var newArr = state.BlogData.map(data=>{
                    if(data._id === action.payload._id)
                    {
                        data = action.payload
                        return data
                    }
                    return data
                })
                console.log(newArr)

                return{
                    BlogData:newArr
                }
            }
        default:
            return state;
    }
}

export default BlogReducer;