import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';
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
const Social = styled.div`
  color:#8F8F8F;
  font-size:19px;
  overflow:hidden;
`
const TextStatus = styled.div`
  color:#00B2B4;
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
` 
const UserSettingProfile = React.createClass({
  getInitialState(){
    return{
      textStatus:'Unsave',
      uploadPhoto:null
    }
  },

  // componentDidMount(){
  //   this.setData()
  // },

  // setData(){
  //   var {name,shortDesc,channels} = this.props.data.publisher
  //   document.getElementById('title').value = typeof name =="undefined" ?'':name 
  //   document.getElementById('description').value = typeof shortDesc == "undefined" ?'':shortDesc
  //   document.getElementById('sc-fb').value = typeof channels == "undefined" ?'':channels.fb
  //   document.getElementById('sc-twt').value = typeof channels == "undefined" ?'':channels.twt
  //   document.getElementById('sc-ig').value = typeof channels == "undefined" ?'':channels.ig
  //   document.getElementById('sc-yt').value = typeof channels == "undefined" ?'':channels.yt
  // },

  // updateData(e){
  //   e.preventDefault()
  //   var data = {publisher : {
  //     name:document.getElementById('title').value,
  //     shortDesc:document.getElementById('description').value,
  //     channels:{
  //       fb:document.getElementById('sc-fb').value,
  //       twt:document.getElementById('sc-twt').value,
  //       ig:document.getElementById('sc-ig').value,
  //       yt:document.getElementById('sc-yt').value
  //     },
  //   }}
  //   Request
  //     .patch(config.BACKURL+'/publishers/11?token='+auth.getToken())
  //     .set('x-access-token', auth.getToken())
  //     .set('Accept','application/json')
  //     .send(data)
  //     .end((err,res)=>{
  //       if(err)throw err 
  //       else{
  //         this.setState({textStatus:'Saved successfully'})
  //       }
  //       //console.log(res.body)
  //     })
  // },

  render(){
    var {uploadPhoto} = this.state
    return(
      <Container onSubmit={this.updateData}>
        <div  className="head sans-font">PROFILE</div>
        <Flex>
          <Title>
            <div className="sans-font">Display name</div>
          </Title>
          <Edit>
            <TextField 
              defaultValue="Ochawin Chirasottikul" 
              id='title'
            />
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Profile picture</div>
          </Title>
          <Edit>
            <UploadPicture src={uploadPhoto} path='/publishers/11/cover' type='cover'/>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Tell people about me</div>
          </Title>
          <Edit>
            <TextField
              defaultValue="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown"
              multiLine={true}
              fullWidth={true}
              floatingLabelText="80 characters"
              floatingLabelFixed={true}
              rows={2}
              rowsMax={4}
              id='description'
            />
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Current living city</div>
          </Title>
          <Edit>
            <TextField 
              defaultValue="Bangkok, Thailand" 
              id='title'
            />
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Social Channels</div>
          </Title>
          <Edit>
            <Social className="sans-font">
              <i className="fa fa-facebook" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>facebook.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} id='sc-fb' />
            </Social>
            <Social className="sans-font">
              <i className="fa fa-twitter" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>twitter.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} id='sc-twt' />
            </Social>
            <Social className="sans-font">
              <i className="fa fa-instagram" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>instagram.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} id='sc-ig' />
            </Social>
            <Social className="sans-font">
              <i className="fa fa-youtube-play" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>youtube.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} id='sc-yt' />
            </Social>
          </Edit>
        </Flex>
        <div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' onClick={this.setData} style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus>{this.state.textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default UserSettingProfile