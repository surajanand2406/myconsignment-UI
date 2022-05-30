import ExclusiveUserState from '../States/ExclusiveUserState';


const ExclusiveUserReducer = (state=ExclusiveUserState,action)=>{

    switch(action.type)
    {
        case 'User_Data':
        {
            return{
                ExclusiveUserData: action.payload
            }
        }
        case 'ChangeImage':
        {
           const newData = state.ExclusiveUserData.map(user=>{
                if(user._id === action.payload._id)
                {
                    user.Image = action.payload.Image;

                    return user
                }
                return user
            })
            return{
                ExclusiveUserData: newData
            }
        }
        case 'UpdateUser':
        {
           const newData = state.ExclusiveUserData.map(user=>{
                if(user._id === action.payload._id)
                {
                    user.BusinessName = action.payload.BusinessName;
                    user.Password = action.payload.Password;
                    user.Contact = action.payload.Contact;
                    user.Image = action.payload.Image;
                    user.BusinessDetail = action.payload.BusinessDetail

                    return user
                }
                return user
            })
            return{
                ExclusiveUserData: newData
            }
        }
        default :
        {
            return state;
        }
    }

}

export default ExclusiveUserReducer;