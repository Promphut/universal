import React from 'react'
import { browserHistory } from 'react-router'
import styled from 'styled-components'
import {Link} from 'react-router'
import {PrimaryButton} from 'components'
import TextField from 'material-ui/TextField';
import {findDOMNode as dom}from 'react-dom';
import Request from 'superagent'
import auth from 'components/auth'
import api from 'components/api'

const Box = styled.div`
  width:477px;
  
  background-color:#fff;
  padding:10px 0 10px 0;
`
const Head = styled.div`
  margin:50px auto 10px auto;
  text-align:center;
  font-size:42px;
  color:#00B2B4;
  font-family:'Nunito'
`
const Text = styled.div`
  color:#8f8f8f;
  font-size:18px;
  text-align:center;
  font-family:'Mitr'
`

const InputBox = styled.form`
  width:308px;
  margin:0 auto 0 auto;
`
var styles={
  button:{
    background:'#3A579A',
    borderRadius:'24px',
    height:'48px',
    width:'167px'
  },
  btn:{
    background:'#3A579A',
    borderRadius:'24px',
  },
  btnCon:{
    margin:'40px auto 20px auto'
  },
}

const SignUp = React.createClass({
  getInitialState(){
    return{
      errText0:'',
      errText1:'',
      errText2:'',
    }
  },

  signup(e){
    e.preventDefault()
    let data = {},
        self = this,
        input = dom(this.refs.signupForm).getElementsByTagName("input")
    
    input = [].slice.call(input)
    input.forEach((field,index) => {
      if(field.value!=''){
        //console.log(field.name+':'+field.value)
        data[field.name] = field.value
        self.state['errText'+index] = ''
        self.setState({})
      } else {
        self.state['errText'+index] = 'This field is required'
        self.setState({})
      }
    })
    //console.log(data)
    data = {
      email:data.email,
      password:data.password1,
      publisher: config.PID
    }

    if(data.password1===data.password2){
      api.signup(data)
      .then(res => {
        auth.setCookieAndToken(res)
        browserHistory.push('/')
      })
      .catch(err => {
        let msg = ''

        if(err.errors && err.errors.email)
          msg = err.errors.email.message
        else
          msg = err.message

        self.setState({
          errText0:msg,
          errText1:msg
        })
      })
    } 
    else this.setState({errText2:'Wrong Password'})
  },

  checkPWD(e){
    //console.log(e.target.value)
    let pass1 = document.getElementsByName('password1')[0].value
    //console.log(pass1)
    if(e.target.value!==pass1)this.setState({errText2:'Wrong Password'})
    else this.setState({errText2:''})
  },

  render(){
    let {onClick,style} = this.props
    let {errText0,errText1,errText2} = this.state

    return (
      <Box style={{...style}}>
        <Head>Email Sign Up</Head>
        <Text>ไม่พลาดทุกเรื่องราวการเงินดีๆ สมัครสมาชิค</Text>
        <InputBox onSubmit={this.signup} ref='signupForm'>
          <TextField
            autoFocus
            hintText="Email"
            floatingLabelText="Email"
            type="email"
            fullWidth={true}
            style={{marginTop:'15px'}}
            name='email'
            errorText={errText0}
          /><br />
          <TextField
            hintText="Password must be at least 6 characters"
            floatingLabelText="Password"
            type="password"
            fullWidth={true}
            style={{marginTop:'15px'}}
            name='password1'
            errorText={errText1}
          /><br />
          <TextField
            hintText="Password Again"
            floatingLabelText="Password"
            type="password"
            fullWidth={true}
            style={{marginTop:'15px'}}
            name='password2'
            errorText={errText2}
            onBlur={this.checkPWD}
          /><br />
          <div style={styles.btnCon}><PrimaryButton label='Sign Up' type='submit' /></div>
        </InputBox>
      </Box>
    )
  }
})


export default SignUp