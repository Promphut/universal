import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {PrimaryButton} from 'components'
import TextField from 'material-ui/TextField';
import {findDOMNode as dom}from 'react-dom';
import auth from 'components/auth'
import api from 'components/api'
import config from '../../../config'
import { withRouter } from 'react-router'

const Box = styled.div`
  width:477px;
  
  background-color:#fff;
  padding:10px 0 10px 0;
  @media (max-width:480px) {
    width:100vw;
  } 
`

const Head = styled.div`
  margin:50px auto 10px auto;
  text-align:center;
  font-size:42px;
  color:${props=> props.theme.primaryColor};
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
  @media (max-width:480px) {
    margin:50px auto 0 auto;
  } 
`

let styles={
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

class SignUp extends React.Component {
  state = {
    errText0:'',
    errText1:'',
    errText2:'',
  }
  constructor(props) {
    super(props)
  }

  signup = (e) => {
    e.preventDefault()

    let data = {},
        input = dom(this.refs.signupForm).getElementsByTagName("input")
    
    input = [].slice.call(input)
    input.forEach((field,index) => {
      if(field.value!=''){
        //console.log(field.name+':'+field.value)
        data[field.name] = field.value

        let state = {}
        state['errText'+index] = ''
        this.setState(state)
      } else {
        let state = {}
        state['errText'+index] = 'This field is required'
        this.setState(state)
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
        this.props.history.push('/')
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
  }

  checkPWD = (e) => {
    //console.log(e.target.value)
    let pass1 = document.getElementsByName('password1')[0].value
    //console.log(pass1)
    if(e.target.value!==pass1) this.setState({errText2:'Wrong Password'})
    else this.setState({errText2:''})
  }

  render(){
    let {onClick,style} = this.props
    let {errText0,errText1,errText2} = this.state

    return (
      <Box style={{...style}}>
        <Head className='hidden-mob'>Email Sign Up</Head>
        <Text className='hidden-mob'>ไม่พลาดทุกเรื่องราวการเงินดีๆ สมัครสมาชิค</Text>
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
          <div style={{...styles.btnCon,width:'120px'}}><PrimaryButton label='Sign Up' type='submit' style={{width:'120px'}}/></div>
        </InputBox>
      </Box>
    )
  }
}


export default withRouter(SignUp)