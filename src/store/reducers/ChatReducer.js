import ChatState from '../States/ChatState'

const ChatReducer = (state=ChatState,action) =>{

    switch(action.type)
    {
        case 'READCHATS':{
               return{
                   ChatData:action.payload
               }

        }
        case 'PROPOSAL':{
            return{
                ...state,
                ChatData:state.ChatData.concat(action.payload)
            }
        } 
        case 'ReadMessege':{
            var newData = state.ChatData.map(data=>{
                if(data._id === action.payload._id)
                {
                    data.isRead = true
                    return data
                }
                return data
            })
            return { ChatData : newData}
        }

        default:
            return state;
    }

}

export default ChatReducer;