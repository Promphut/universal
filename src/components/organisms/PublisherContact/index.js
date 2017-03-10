import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture,DropdownWithIcon,Alert,MenuList} from 'components'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Request from 'superagent'
import auth from 'components/auth'

const Container = styled.form`
  width:100%;
  padding:80px;
  border-bottom:1px solid #E2E2E2;
  .textTitle{
    color:#C2C2C2;
    font-family:'PT Sas';
    font-size:17px;
  }
  .head{
    color:#C2C2C2;
    font-family:'Nunito';
    font-size:18px;
    text-transform:uppercase;
  }
`
const Flex = styled.div`
  display:flex;
  items-align:center;
  flex-flow: row wrap;
  margin:50px 0 0 50px;
`
const Title = styled.div`
  flex:2 150px;
  max-width:150px;
  color:#C2C2C2;
  font-size:17px;
  padding-top:15px;
`
const Edit = styled.div`
  flex:6 450px;
  max-width:450px;
`

const TextStatus = styled.div`
  color:#00B2B4;
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
` 
const AddTag = styled.div`
  color:#8F8F8F;
  font-size:16px;
  overflow:hidden;
  margin-top:20px;
  display:inline;
`

const SendBox = styled.div`
  width:480px;
  background-color:#F4F4F4;
  margin:20px 0 0 0;
  padding:15px;
`
const PublisherContact = React.createClass({
  getInitialState(){
  
    return{
      textStatus:'Unsave',
      value:1,
      error:false,
      alert:false,
    }
  },

  componentDidMount(){
     this.getPublisherId()
  },

  getPublisherId(){
    var self = this
    Request
      .get(config.BACKURL+'/publishers/'+config.PID)
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err) throw err 
        else{
          self.setState({publisher:res.body})
          self.setData()
        }
      })
  },

  setData(){
    var {contact} = this.state.publisher.publisher
    this.setState({value:typeof contact =="undefined"?1:contact.catName})
    document.getElementById('toEmail').value = typeof contact=="undefined"?'':contact.toEmail
    document.getElementById('desc').value = typeof contact== "undefined"?'':contact.desc
  },

  updateData(e){
    e.preventDefault()
    var self = this
    var data = {
      publisher : {
        contact:{
          catName:this.state.value,
          toEmail:document.getElementById('toEmail').value,
          desc:document.getElementById('desc').value
        },
      }
    }
    Request
      .patch(config.BACKURL+'/publishers/'+config.PID+'?token='+auth.getToken())
      .set('x-access-token', auth.getToken())
      .set('Accept','application/json')
      .send(data)
      .end((err,res)=>{
        if(err) self.setState({textStatus:res.body.error.message,error:true})
        else{
          self.setState({textStatus:'Saved successfully',error:false})
        }
      })
  },

  handleChange(event, index, value){
    this.setState({value})
  },

  createContact(e){
    e.preventDefault()
    //console.log(e)
    
  },

  selectItem(e,val){
    this.setState({value:val})
  },

  handleRequestClose(){
    this.setState({alert:false})
  },

  alertDelete(e){
    this.setState({alert:true,alertWhere:e.currentTarget,alertDesc:'Delete is permanent. Are you sure?',alertConfirm:this.deleteCate})
  },

  deleteCate(){
    
  },

  render(){
    var {error,textStatus,value,alert,alertConfirm,alertWhere,alertChild,alertDesc} = this.state
    return(
      <Container onSubmit={this.updateData}>
        <div  className="head sans-font">Contact</div>
        <Flex>
          <Title>
            <div className="sans-font">Categories</div>
          </Title>
          <Edit>
            <Alert 
              open={alert}
              anchorEl={alertWhere}
              onRequestClose={this.handleRequestClose}
              description={alertDesc}
              child={alertChild} 
              confirm={alertConfirm}/>
              <DropdownWithIcon
                onChange={this.selectItem} 
                menuItem={[{value:1,text:'General'}]} 
                value={value}
                editMenu={
                  [<MenuList onClick={this.alertDelete} key='delete'>Delete</MenuList>,
                  <MenuList onClick={this.alertDelete} key='new'>+ New Category</MenuList>]}
                />
            <SendBox>
              <TextField
                defaultValue="unknow@mail.com"
                floatingLabelText="Sent to email"
                floatingLabelFixed={true}
                id='toEmail'
              /><br/><br/>
              <TextField
                defaultValue="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown "
                multiLine={true}
                fullWidth={true}
                floatingLabelText="Description"
                floatingLabelFixed={true}
                id='desc'
                rows={2}
                rowsMax={10}
              />
            </SendBox>
          </Edit>
        </Flex>
        <div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' onClick={this.setData} style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus style={{color:error?'#D8000C':'#00B2B4'}}>{textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default PublisherContact