import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';
import Request from 'superagent'
import auth from 'components/auth'
import {findDOMNode as dom} from 'react-dom';
import api from 'components/api'
import utils from 'components/utils'

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
    return {
      error:false,
      textStatus:'Unsave',

      user: {
        display: '',
        shortDesc: '',
        city: '',
        channels: {
          fb:'',
          twt: '',
          ig: '',
          yt: ''
        },
        pic: {
          medium: ''
        }
      }
    }
  },

  componentDidMount(){
    api.getUser()
    .then(user => {
      this.user = user
      this.setState({
        user: user
      })
    })

    //self.display.focus()
  },

  updateCookie(){
    // * If user object is editted, we must reset the local cookie user as well.
    let token = auth.getToken()
    // 1. Fetch menu, user, and roles information
    api.getCookieAndToken(token)
    .then(result => {
      // 2. Update newly fetch cookie
      auth.setCookieAndToken(result)
    })
  },

  updateData(e){
    e.preventDefault()

    let user = this.state.user
    api.updateUser(user)
    .then(u => {
      if(!u) {
        return this.setState({
          textStatus: 'Cannot save the user, try again.',
          error:true
        })
      }

      this.setState({
        textStatus:'Saved successfully',
        error:false
      })

      this.updateCookie()
    })
    .catch(err => {
      this.setState({
        textStatus: err.message,
        error:true
      })
    })
  },

  userChanged(e){
    const name = e.target.name
    let user = {...this.state.user}
    utils.set(user, name, e.target.value)

    this.setState({
      user: user
    })
  },

  render(){
    var {textStatus, error, user} = this.state
    //console.log('user.pic.medium', user.pic.medium)
    return(
      <Container onSubmit={this.updateData} ref='userProfile'>
        <div  className="head sans-font">PROFILE</div>
        <Flex>
          <Title>
            <div className="sans-font">Display name</div>
          </Title>
          <Edit>
            <TextField name='display' value={user.display} onChange={this.userChanged} ref={input => {this.display = input}}/>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Profile picture</div>
          </Title>
          <Edit>
            <UploadPicture src={user.pic.medium} path={'/users/'+user._id+'/photo'} type='photo'/>
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
              name='shortDesc'
              value={user.shortDesc}
              onChange={this.userChanged}/>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Current living city</div>
          </Title>
          <Edit>
            <TextField
              defaultValue="Bangkok, Thailand" name='city' value={user.city} onChange={this.userChanged}/>
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
              <TextField style={{float:'left',margin:'5px 0 0 0'}} name='channels.fb' value={user.channels.fb} onChange={this.userChanged}/>
            </Social>
            <Social className="sans-font">
              <i className="fa fa-twitter" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i>
              <div style={{float:'left',margin:'15px 20px 0 0'}}>twitter.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} name='channels.twt' value={user.channels.twt} onChange={this.userChanged}/>
            </Social>
            <Social className="sans-font">
              <i className="fa fa-instagram" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i>
              <div style={{float:'left',margin:'15px 20px 0 0'}}>instagram.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} name='channels.ig' value={user.channels.ig} onChange={this.userChanged}/>
            </Social>
            <Social className="sans-font">
              <i className="fa fa-youtube-play" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i>
              <div style={{float:'left',margin:'15px 20px 0 0'}}>youtube.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} name='channels.yt' value={user.channels.yt} onChange={this.userChanged}/>
            </Social>
          </Edit>
        </Flex>
        <div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' onClick={this.setData} style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus style={{color:error?'#D8000C':'#00B2B4'}}>{textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default UserSettingProfile
