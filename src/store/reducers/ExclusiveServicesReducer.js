import ExclusiveServicesState from '../States/ExclusiveServicesState'

const ExclusiveServicesReducer = ( state = ExclusiveServicesState , action)=>{

    switch(action.type)
    {
        case 'ReadServices':
        {
            return{
                ExclusiveServicesData:action.payload
            }
        }
        case 'AddNewService':
        {
            return {
                ExclusiveServicesData : state.ExclusiveServicesData.concat(action.payload)
            }
        }
        case 'UpdateService':
        {
            const newData = state.ExclusiveServicesData.map(service=>{
                if(service._id===action.payload._id)
                {
                    service.Title = action.payload.Title;
                    service.Price = action.payload.Price;
                    service.ServiceDescription = action.payload.ServiceDescription;
                    service.Images = action.payload.Images;

                    return service
                }

                return service

            })

            return {
                ExclusiveServicesData : newData
            }
        }
        case 'DeletedService':
        {
            const newData = state.ExclusiveServicesData.filter(data=>{
                return data._id !== action.payload._id
            })
            return {
                ExclusiveServicesData : newData
            }
        }
        case 'Review':
        {
            console.log(action.payload)
        }
        default:
        {
            return state;
        }
    }
}

export default ExclusiveServicesReducer;