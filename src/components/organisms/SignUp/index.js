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
  width:600px;
  
  background-color:#fff;
  padding:10px 0 10px 0;
  @media (max-width:480px) {
    width:100vw;
  } 
`
const Head = styled.div`
  margin:25px auto 0px auto;
  text-align:center;
  font-size:32px;
  color:${props=> props.theme.primaryColor};
  font-family:'Nunito';
  @media (max-width:480px) {
    margin:0px auto 10px auto;
    font-weight:bold;
    color:#fff;
  } 
`
const Text = styled.div`
  color:#8f8f8f;
  font-size:18px;
  text-align:center;
  font-family:'Nunito';
  margin:20px 0 20px 0;
`
const LinkUnderLine = styled(Link)`
  color:${props=> props.theme.primaryColor};
  font-size:18px;
  text-decoration:underline; 
`

const InputBox = styled.form`
  width:350px;
  margin:0 auto 0 auto;
  @media (max-width:480px) {
    margin:50px auto 0 auto;
  } 
`
var styles={
  button:{
    background:'#3A579A',
    borderRadius:'24px',
    height:'48px',
    width:'350px'
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
        input = dom(this.refs.signupForm).getElementsByTagName("input")
    
    input = [].slice.call(input)
    input.forEach((field,index) => {
      if(field.value!=''){
        //console.log(field.name+':'+field.value)
        data[field.name] = field.value
        this.state['errText'+index] = ''
        this.setState({})
      } else {
        this.state['errText'+index] = 'This field is required'
        this.setState({})
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

        if(err.errors)
          this.setState({
            errText0:err.errors.email && err.errors.email.message,
            errText1:err.errors.password && err.errors.password.message
          })
        else
          this.setState({
            errText0:err.message,
            errText1:err.message
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
        <Head >Create a Password</Head>
        <Text style={{marginBottom:'0px'}}>Sign up using <span style={{color:'#222'}}>aommoney@likemeasia.com</span></Text>
        <InputBox onSubmit={this.signup} ref='signupForm'>
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
            hintText="Password must be at least 6 characters"
            floatingLabelText="Password Again"
            type="password"
            fullWidth={true}
            style={{marginTop:'15px'}}
            name='password2'
            errorText={errText2}
            onBlur={this.checkPWD}
          /><br />
          <div style={{...styles.btnCon,width:'350px'}}><PrimaryButton label='Sign Up' type='submit' style={{width:'350px'}}/></div>
          <Text style={{textAlign:'left'}}>Already have ab account? <LinkUnderLine to='/signin'> Sign In</LinkUnderLine> </Text>
        </InputBox>
      </Box>
    )
  }
})


export default SignUp