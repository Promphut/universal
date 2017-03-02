import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';
import Request from 'superagent'
import auth from 'components/auth'
import {findDOMNode as dom}from 'react-dom';

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
    this.user = this.props.params.user
    return{
      error:false,
      textStatus:'Unsave',
      uploadPhoto:null
    }
  },

  componentDidMount(){
    this.setData()
  },

  setData(){
    var {display,shortDesc,pic,city,channels} = this.user.user
    document.getElementById('display').value = typeof display =="undefined" ?'':display
    document.getElementById('description').value = typeof shortDesc == "undefined" ?'':shortDesc
    document.getElementById('city').value = typeof city == "undefined" ?'':city
    document.getElementById('fb').value = typeof channels == "undefined" ?'':channels.fb
    document.getElementById('twt').value = typeof channels == "undefined" ?'':channels.twt
    document.getElementById('ig').value = typeof channels == "undefined" ?'':channels.ig
    document.getElementById('yt').value = typeof channels == "undefined" ?'':channels.yt
    this.setState({
      uploadPhoto:typeof pic == "undefined" ?null:pic.medium
    })
  },

  updateData(e){
    e.preventDefault()
    var data = {}
    var self = this
    var input = dom(this.refs.userProfile).getElementsByTagName("input")
    input = [].slice.call(input)
    input.forEach((field,index)=>{
      data[field.name] = field.value
    })
    data['shortDesc'] = document.getElementById('description').value
    var user = {
      user:{
        display:data.display,
        shortDesc:data.shortDesc,
        city:data.city,
        channels:{
          fb:data.fb,
          twt:data.twt,
          ig:data.ig,
          yt:data.yt
        }
      }
    }
    Request
      .patch(config.BACKURL+'/users/'+this.user.user._id+'?token='+auth.getToken())
      .set('x-access-token', auth.getToken())
      .set('Accept','application/json')
      .send(user)
      .end((err,res)=>{
        if(err) this.setState({textStatus:res.body.error.message,error:true})
        else{
          this.setState({textStatus:'Saved successfully',error:false})
        }
      })
  },

  render(){
    var {uploadPhoto,textStatus,error} = this.state
    return(
      <Container onSubmit={this.updateData} ref='userProfile'>
        <div  className="head sans-font">PROFILE</div>
        <Flex>
          <Title>
            <div className="sans-font">Display name</div>
          </Title>
          <Edit>
            <TextField id='display'name='display'/>
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
              name='shortDesc'
            />
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Current living city</div>
          </Title>
          <Edit>
            <TextField 
              defaultValue="Bangkok, Thailand" id='city' name='city'/>
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
              <TextField style={{float:'left',margin:'5px 0 0 0'}} id='fb' name='fb'/>
            </Social>
            <Social className="sans-font">
              <i className="fa fa-twitter" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>twitter.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} id='twt' name='twt'/>
            </Social>
            <Social className="sans-font">
              <i className="fa fa-instagram" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>instagram.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} id='ig' name='ig'/>
            </Social>
            <Social className="sans-font">
              <i className="fa fa-youtube-play" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>youtube.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} id='yt' name='yt'/>
            </Social>
          </Edit>
        </Flex>
        <div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' onClick={this.setData} style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus style={{color:error?'#D8000C':'#00B2B4'}}>{textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default UserSettingProfile