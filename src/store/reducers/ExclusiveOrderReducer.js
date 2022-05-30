import ExclusiveOrderState from '../States/ExclusiveOrderState'


const ExclusiveOrderReducer = ( state = ExclusiveOrderState , action)=>
{
    switch(action.type)
    {
        case 'ReadOrders':
        {
            return {
                ExclusiveOrderData : action.payload
            }
        }
        case 'CreateNewOrder':
        {
            return{
                ExclusiveOrderData : state.ExclusiveOrderData.concat(action.payload)
            }
        }
        case 'DeleteSellerOrder':
        {
            var newArr = state.ExclusiveOrderData.filter(data=>{
                return data._id !== action.payload._id
            })

            return {
                ExclusiveOrderData : newArr
            }
        }
        case 'CompleteOrder':
        {
           var completedOrder = state.ExclusiveOrderData.map(order=>{
                if(order._id === action.payload._id)
                {
                    order.isComplete = true
                    return order
                }
                return order
            })

            return{
                ExclusiveOrderData :completedOrder
            }
        }
        default:
            return state;
    }
}

export default ExclusiveOrderReducer;