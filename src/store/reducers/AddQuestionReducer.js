import HelpCenterState from '../States/AddQuestionState'

const HelpCenterReducer=(state=HelpCenterState,Action)=>{

    switch(Action.type)
    {
        case 'ReadQues':
            {
                console.log(Action.payload)
                return{
                    HelpCenterData:Action.payload
                }
            }
        case 'AddTopic':
            {
                return{
                    HelpCenterData:state.HelpCenterData.concat(Action.payload)
                }
            }
        case 'AddQuestions':
            {

                var newArr = state.HelpCenterData.map(data=>{
                    if(data._id === Action.payload._id)
                    {
                        data = Action.payload
                        return data
                    }
                    return data
                })

                return{
                    HelpCenterData:newArr
                }
            }
        default:
            return state
    }
}

export default HelpCenterReducer;