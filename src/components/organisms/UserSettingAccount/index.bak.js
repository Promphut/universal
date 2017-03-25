import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';
import Request from 'superagent'
import auth from 'components/auth'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon'
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
  color:${props=> props.theme.primaryColor};
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
` 

const styles = {
  button: {
    margin: 12,
    borderRadius:'10px',
  },
  btn:{
    borderRadius:'10px',
    backgroundColor:'#3A589B'
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};
const UserSettingProfile = React.createClass({
  getInitialState(){
    this.user = this.props.params.user
    return{
      user:{},
      error1:false,
      error2:false,
      textStatus1:'Unsave',
      textStatus2:'Unsave',
      errText0:null,
      errText1:null,
      errText2:null
    }
  },

  componentDidMount(){
    //console.log(this.user.user)
    this.getUserDetail()
  },

  getUserDetail(){
    var self = this
    Request
      .get(config.BACKURL+'/users/'+this.user.user._id)
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err) self.setState({textStatus1:res.body.error.message,error1:true})
        else{
          self.setState({user:res.body.user})
          //console.log(res.body.user)
          self.setData()
        }
      })
  },

  setData(){
    var {username,email} = this.state.user
    document.getElementById('username').value = typeof username =="undefined" ?'':username
    document.getElementById('email').value = typeof email == "undefined" ?'':email
  },

  updateData(e){
    e.preventDefault()
    var data = {}
    var self = this
    var input = e.target.getElementsByTagName("input")
    input = [].slice.call(input)
    input.forEach((field,index)=>{
      data[field.name] = field.value
    })
    var user = {
      user:data
    }
    //console.log(user)
    Request
      .patch(config.BACKURL+'/users/'+this.user.user._id+'?token='+auth.getToken())
      .set('x-access-token', auth.getToken())
      .set('Accept','application/json')
      .send(user)
      .end((err,res)=>{
        if(err) self.setState({textStatus1:res.body.error.message,error1:true})
        else{
          self.setState({textStatus1:'Saved successfully',error1:false})
        }
      })
  },
  signFB(e){
    e.preventDefault()
    var self = this
    Request
      .get(config.BACKURL+'/auth/facebook')
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err) self.setState({textStatus2:'Connect with Facebook fail',error2:true,})
        else{
          self.setState({
            textStatus2:'Connect with Facebook successfully',error2:false,
          })
        }
      })
  },
  changePWD(e){
    e.preventDefault()
    var data = {}
    var self = this
    var input = e.target.getElementsByTagName("input")
    var er = 0
    input = [].slice.call(input)
    input.forEach((field,index)=>{
      if(field.value!=''){
        //console.log(field.name+':'+field.value)
        data[field.name] = field.value
      }else{
        er+=1
        this.state['errText'+index] = 'This field is required'
        this.setState({})
      }
    })
    //console.log(data)
    var send = {oldPassword:data.oldPassword,newPassword:data.newPassword}
    if(er!=0){
      return
    }else{
      if(data.newPassword===data.newPassword2){
        Request
          .post(config.BACKURL+'/users')
          .set('Accept','application/json')
          .send({send})
          .end((err,res)=>{
            //console.log(res.body)
            if(err) this.setState({errText0:res.body.error.message,errText1:res.body.error.message,errText2:res.body.error.message})
            else{
              //auth.setCookieAndToken(res.body)
              browserHistory.push('/')
            }
          })
        //console.log(send)
      }else{
        this.setState({errText2:'Wrong Password'})
      }
    }
  },
  checkPWD(e){
    //console.log(e.target.value)
    var pass1 = e.target.value
    //console.log(pass1)
    if(e.target.value!==pass1)this.setState({errText2:'Wrong Password'})
    else this.setState({errText2:''})
  },

  render(){
    var {textStatus1,error1,textStatus2,error2,errText0,errText2,errText1} = this.state

    return(
      <div>
        <Container onSubmit={this.updateData} ref='form1'>
          <div  className="head sans-font">ACCOUNT</div>
          <Flex>
            <Title>
              <div className="sans-font">Username</div>
            </Title>
            <Edit>
              <TextField id='username' name='username' key='username'/>
            </Edit>
          </Flex>
          <Flex>
            <Title>
              <div className="sans-font">Email</div>
            </Title>
            <Edit>
              <TextField id='email' name='email' key='email'/>
            </Edit>
          </Flex>
          <Flex>
            <Title>
              <div className="sans-font">Social Connect </div>
            </Title>
            <Edit>
              <Social className="sans-font">
                <RaisedButton
                  onClick={this.signFB}
                  label="Connect"
                  labelStyle={{color:'white'}}
                  style={{...styles.button}}
                  buttonStyle={{...styles.btn}}
                  icon={<i className="fa fa-facebook" style={{color:'white',margin:'0 5px 0 14px'}} aria-hidden="true"></i>}
                />
              </Social>
              {/*<Social className="sans-font">
                <RaisedButton
                  onClick={this.signTWT}
                  label="Connect"
                  labelStyle={{color:'white'}}
                  style={{...styles.button}}
                  buttonStyle={{...styles.btn,backgroundColor:'#60AADE'}}
                  icon={<i className="fa fa-twitter" style={{color:'white'}} aria-hidden="true"></i>}
                />
              </Social>*/}
            </Edit>
          </Flex>
          <div className='sans-font' style={{marginTop:'30px',overflow:'hidden'}}><PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' onClick={this.setData} style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus style={{color:error1?'#D8000C':'#00B2B4'}}>{textStatus1}</TextStatus></div>
        </Container>

        <Container onSubmit={this.changePWD} autoComplete="off">
          <div  className="head sans-font">CHANGE PASSWORD</div>
          <Flex>
            <Title>
              <div className="sans-font">Old Password</div>
            </Title>
            <Edit>
              <TextField
                hintText="Old Password"
                type="password"
                name='oldPassword'
                id='oldPassword'
                errorText={errText0}
                autoComplete="off"
                key='oldPassword'
              />  
            </Edit>
          </Flex>
          <Flex>
            <Title>
              <div className="sans-font">New Password</div>
            </Title>
            <Edit>
              <TextField
                hintText="New Password"
                type="password"
                name='newPassword'
                id='newPassword'
                errorText={errText1}
                autoComplete="off"
                key='newPassword'
              />
            </Edit>
          </Flex>
          <Flex>
            <Title>
              <div className="sans-font">Retype Again</div>
            </Title>
            <Edit>
              <TextField
                hintText="New Password Agian"
                type="password"
                name='newPassword2'
                id='newPassword2'
                errorText={errText2}
                autoComplete="off"
                onBlur={this.checkPWD}
                key='newPassword2'
              />
            </Edit>
          </Flex>
          <div className='sans-font' style={{marginTop:'30px',overflow:'hidden'}}><PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' onClick={this.setData} style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus style={{color:error2?'#D8000C':'#00B2B4'}}>{textStatus2}</TextStatus></div>
        </Container>
      </div>
    )
  },
})



export default UserSettingProfile