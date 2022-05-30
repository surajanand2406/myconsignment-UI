import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Navbar from './Navbar'
import Footer from './Footer'
import {Input,Collapse} from 'antd'
import { Icon } from '@ant-design/compatible';
import {ReadQuestions} from '../store/actions/AddQuestionAction';
import ReactHtmlParser from 'react-html-parser';
import './CSS/HelpCenter.css'

class HelpCenter extends Component {

    state={
        questions:[],
        selectDes:[],
        searchedList:[]
    }

    componentDidMount(){
        this.props.readQuestions();
        window.scrollTo(0, 0)

    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({questions:nextProps.questions})
   }

    handleTopic=(Id)=>{
        console.log(Id)
        const topic = this.state.questions.filter(data=>{
            return data._id === Id
        })
        this.setState({selectDes:topic})
    }

    handleSearch=(e)=>{
        if(this.state.selectDes.length !== 0)
        {
            let list = [];
                
                if(e.target.value.trim() !=="")
                {
                        list = this.state.selectDes[0].Questions;

                       let updatedList = list.filter(data=>{
                            const item = data.question.toLowerCase();
                            const value = e.target.value.toLowerCase();

                            return item.includes(value);
                        })

                        this.setState({searchedList:updatedList})
                }
                else
                {
                    this.setState({searchedList:[]}) 
                }
        }
        else
        {
            this.setState({searchedList:[]}) 
        }
    }

    render() {
        return (
            <div className="HelpCenter-Container">
                <Navbar />
                <div className="HelpCenter-Body-Container">
                    <div className="HelpCenter-Body">
                        {/* <Link to="/add-question">Add a Question</Link> */}
                        <div className="HelpCenter-Header">
                            <h4 style={{fontWeight:'bold',margin:0}}>Help Center {this.state.selectDes.length !==0 ? '  ' + ' > ' + '  ' + this.state.selectDes[0].Topic : null}</h4>
                        </div>
                        <div className="HelpCenter-Inner-Section">
                            <div className="HelpCenter-Inner-Section-Sidebar">
                                <div className="Header">
                                    <div style={{width:'10%'}}>
                                        <Icon type="menu" style={{fontSize:20,color:'white'}} />
                                    </div>
                                    <div style={{width:'90%'}}>
                                        <h2 style={{fontWeight:'bold',margin:0,color:'white'}}>Topics</h2>
                                    </div>
                                </div>
                                <div className="body">
                                    <div style={{listStyle:'none'}}>
                                        {
                                            this.state.questions.map(data=>{
                                                return <h4 onClick={()=>this.handleTopic(data._id)} style={{fontWeight:'bold',padding:5}}>{data.Topic}</h4>
                                            })
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="HelpCenter-Inner-Section-Main-Body">
                                <div className="Header">
                                    <h2 style={{fontWeight:'bold',margin:0,color:'white'}}>Related Questions</h2>
                                </div>
                                <div className="body">
                                    <div className="search-area">
                                        <Input.Search  style={{backgroundColor:'#eeeeee',border:'solid 1px gray',borderRadius:5}} onChange={this.handleSearch} />
                                    </div>
                                    <div className="question">
                                        {

                                            this.state.searchedList.length !== 0 ?
                                                
                                                this.state.searchedList.map((question,i)=>{
                                                    console.log(question)
                                                    return(
                                                        <Collapse className="collaps" activeKey="1" accordion>
                                                            <Collapse.Panel style={{width:'100%'}} key={i}  showArrow={false} header={<h4 style={{fontWeight:'bold'}}>Q: {question.question}</h4>}>
                                                                <div style={{overflowX:'auto'}} class="panel-content"><b>A:</b> {ReactHtmlParser(question.description)}</div>  
                                                            </Collapse.Panel>
                                                        </Collapse>
                                                    )
                                                })

                                            :
                                                this.state.selectDes.length !== 0 ? 
                                                    this.state.selectDes[0].Questions.map(question=>{
                                                        return(
                                                            <Collapse className="collaps" accordion>
                                                                <Collapse.Panel  showArrow={false} header={<h4 style={{fontWeight:'bold'}}>Q: {question.question}</h4>}>
                                                                    <div class="panel-content"><b>A:</b> {ReactHtmlParser(question.description)}</div>  
                                                                </Collapse.Panel>
                                                            </Collapse>
                                                        )
                                                    })
                                                :
                                                null
                                           
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state)
    return{
        questions:state.HelpCenterReducer.HelpCenterData
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        readQuestions:()=>{dispatch(ReadQuestions())}
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(HelpCenter);
