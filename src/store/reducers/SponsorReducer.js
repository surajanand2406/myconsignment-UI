import SponsorState from '../States/SponsorState'

const SponsorReducer = (state = SponsorState,action)=>{
    switch(action.type){

        case 'READEVENT':{     
            state.SponsorData = [];    
            return{

                SponsorData:state.SponsorData.concat(action.payload)
            }
           
        }

        case 'STARTEVENT':
            {
                return{
                    SponsorData:state.SponsorData.concat(action.payload)
                }
            }


        case 'UPDATEEVENT':
            {
                    const newValue = state.SponsorData.map(data=>{
                        data.Title=action.payload.Title;
                        data.TargetedAmount=action.payload.TargetedAmount;
        
                        return data;
                    })
        
                    return{ SponsorData:newValue }
    
            }

        
        case 'DCOMMENT':
            {
                const newComment = state.SponsorData.map(data=>{

                    data.Comments = action.payload.Comments

                    return data
                })

                return {
                    SponsorData:newComment
                }
                   
                  
            }

        case 'COMMENT':
            {

                const newCom = state.SponsorData.map(data=>{

                    data.Comments = action.payload.Comments

                    return data
                })

                return {
                    SponsorData:newCom
                }

            }

        case 'DONATION':
            {
                const newDon = state.SponsorData.map(data=>{

                    data.Donation = action.payload.Donation

                    return data
                })

                return {
                    SponsorData:newDon
                }

            }    
            

        default:
                return state;

    } 
}

export default SponsorReducer;