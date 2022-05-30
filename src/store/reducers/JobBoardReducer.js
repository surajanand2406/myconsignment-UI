import JobBoardState from '../States/JobBoardState'

const JobBoardReducer = (state=JobBoardState,action) =>{

    switch(action.type)
    {
        case 'READJOB':
            {

                var newData =[];

                  action.payload.map(data=>{
                        newData.push(data)
                  })
                return{
                     JobBoardData:newData
                  }
                   
            }

        case 'POST':
            {
                return{
                    JobBoardData: state.JobBoardData.concat(action.payload)
                }
            }

        case 'UPDATEJOB':
            {
                var updateData = state.JobBoardData.map(data=>{
                    if(data._id===action.payload._id)
                    {
                         data = action.payload
                    }
                    return data
                })

                return{
                    JobBoardData:updateData
                }
            }

        case 'DELETE':
            {
                var newData = state.JobBoardData.filter(arr=>{
                    return arr._id !== action.payload._id
                })

                return{
                    JobBoardData:newData
                }
            }  
        case 'Filter':{

                var filteredData = [];
    
                if(action.payload.category !== 'All Categories' && action.payload.country !== 'All Countries')
                {
                    filteredData = state.JobBoardData.filter(data=>{
                        return data.JobCategory === action.payload.category && data.Country === action.payload.country && data.Budget >= action.payload.minPrice && data.Budget <= action.payload.maxPrice
                    })
                }
                else if(action.payload.category === 'All Categories' && action.payload.country !== 'All Countries')
                {
                    filteredData = state.JobBoardData.filter(data=>{
                        return data.Country === action.payload.country && data.Budget >= action.payload.minPrice && data.Budget <= action.payload.maxPrice
                    })
                }
                else if(action.payload.category !== 'All Categories' && action.payload.country === 'All Countries')
                {
                    filteredData = state.JobBoardData.filter(data=>{
                        return data.JobCategory === action.payload.category && data.Budget >= action.payload.minPrice && data.Budget <= action.payload.maxPrice
                    })
                }
                else
                {
                    filteredData = state.JobBoardData.filter(data=>{
                        return data.Budget >= action.payload.minPrice && data.Budget <= action.payload.maxPrice
                    })
    
                }
    
                return {
                    filteredState:filteredData,
                    JobBoardData : state.JobBoardData
                };
    
            } 
            case 'Reset':
                {
                    return {
                        JobBoardData: state.JobBoardData
                    }
                }

        default:
            return state;
    }

}

export default JobBoardReducer;