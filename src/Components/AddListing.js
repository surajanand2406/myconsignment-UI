import React, { Component } from 'react'
import {Button,Drawer,Divider,Form,Input,Radio, Upload, Modal} from 'antd'
import { Icon } from '@ant-design/compatible';
import Select from 'react-select';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import { setUIDAction, setUserInfoAction } from "../store/actions/actions";
import { connect } from "react-redux";

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

class AddListing extends Component {
    constructor(props){
        super(props)
        this.initialState={
            isShowForm:false,
            isShipping:false,
            tradeCheckboxValue:'Yes',
            shippingCheckboxValue:'International',
            previewVisible: false,
            previewImage: '',
            fileList: [],
            subCatogories:[]
        }
        this.state={
            ...this.initialState
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleCloseDrawer = () =>{
        this.props.handleCloseDrawer(false)
    }

    tradeCheckboxValueChange=(e)=>{
        if(e.target.value==="No")
        {   
            this.setState({tradeCheckboxValue:e.target.value,isShipping:true})
        }
        else
        {
            this.setState({tradeCheckboxValue:e.target.value,isShipping:false})
        }
        
    }

    shippingCheckboxValueChange=(e)=>{
        this.setState({shippingCheckboxValue:e.target.value})
    }

    //Image code Start
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
  
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    };


    handleSubmit(){
        
    }
    handleChange = ({ fileList }) => this.setState({ fileList });
  
    //Image Code End
     
    render() {

        //Image Code Start
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
        );
        //Image Code End
        
        const scaryAnimals = [
            { label: "Alligators", value: 1 },
            { label: "Crocodiles", value: 2 },
            { label: "Sharks", value: 3 },
            { label: "Small crocodiles", value: 4 },
            { label: "Smallest crocodiles", value: 5 },
          ];
        return (
            <Drawer title={<h1>Add Your Product</h1>}  visible={true} width={(this.props.fullWidth)<=768?'100%':(this.props.fullWidth)<=980?'80%':(this.props.fullWidth)<=1180?'60%':'40%'}  closable={false}>
                    <Button style={{backgroundColor:'#B17E4E',color:'white',position:'relative',top:'-85px',left:'95%'}} shape="circle" size="large" onClick={this.handleCloseDrawer}>
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </Button>
                    <Select placeholder="Select Category" options={this.props.categories}  onChange={(val)=>{
                        console.log(val)
                        this.setState({isShowForm:true})
                    }} />
                    <Divider />
                    {
                        this.state.isShowForm===true ? 
                        <Form style={{marginBottom:'10px'}}>
                            <Select placeholder="Select Sub Category...." options={scaryAnimals} />
                            <Input placeholder="Enter Title...." size="large" style={{backgroundColor:'#fafafa',marginBottom:'10px',marginTop:'10px'}} />
                            <Input.TextArea size="large" style={{backgroundColor:'#fafafa',marginBottom:'10px'}} placeholder="Enter Description...." autoSize={{minRows:5}}></Input.TextArea>
                            <Input placeholder="Enter Price...." size="large" style={{backgroundColor:'#fafafa',marginBottom:'10px'}} />
                            <div style={{display:'flex',justifyContent:"flex-start",alignItems:'center',marginBottom:'10px'}}>
                                <h4 style={{marginRight:'10px',marginTop:'5px'}}>Accept Trade?</h4>
                                   <Radio.Group value={this.state.tradeCheckboxValue} onChange={this.tradeCheckboxValueChange}>
                                        <Radio value="Yes">Yes</Radio>
                                        <Radio value="No">No</Radio>
                                   </Radio.Group>
                            </div>
                            {
                                this.state.isShipping===true ? 
                                <div style={{marginBottom:'10px'}}>
                                    <h4>Shipping</h4>
                                    <Radio.Group value={this.state.shippingCheckboxValue} onChange={this.shippingCheckboxValueChange}>
                                        <Radio value="International">International</Radio>
                                        <Radio value="National">National</Radio>
                                        <Radio value="Pickup">Pickup Only (Locally)</Radio>
                                    </Radio.Group>
                                </div>
                                
                                : null
                            }

                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>

                            <Button onClick={this.handleSubmit} style={{backgroundColor:"#B17E4E",color:'white',width:'150px'}} size="large" shape='round'>Add Listing</Button>

                        </Form>
                        : null
                    }

            </Drawer>
            )
    }
}
function mapStateToProps(state) {
    return ({
        UID:state.rootReducer.UID,
        userInfo:state.rootReducer.userInfo,
        categories:state.rootReducer.categories
    })
}
function mapActionsToProps(dispatch) {
    return ({
        setUID: (UID) => {
            dispatch(setUIDAction(UID))
        },
        setUserInfo: (info) => {
            dispatch(setUserInfoAction(info))
        }
    })
}
export default connect(mapStateToProps,mapActionsToProps)(AddListing)
