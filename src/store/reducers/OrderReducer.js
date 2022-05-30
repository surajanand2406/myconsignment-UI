import OrderState from '../States/OrderState'

const OrderReducer = (state=OrderState,action) =>{

    switch(action.type)
    {
        case 'READORDERS':
            {
                return{
                    OrderData:action.payload
                }
            }
        case 'CreateOrder':
            {
                return{
                    ...state,
                    OrderData:state.OrderData.concat(action.payload)
                }
            }

        case 'CancelOrder':
            {
                const newArr= state.OrderData.filter(data=>{
                    return data._id !== action.payload._id
                })

                return{
                    OrderData:newArr
                }
            }

        default:
            return state;
    }

}

export default OrderReducer;