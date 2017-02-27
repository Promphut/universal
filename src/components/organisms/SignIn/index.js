import React from 'react'
import {Link,browserHistory} from 'react-router'
import styled from 'styled-components'
import {PrimaryButton} from 'components'
import TextField from 'material-ui/TextField';
import {findDOMNode as dom}from 'react-dom';
import Request from 'superagent'
import auth from 'components/auth'
const Box = styled.div`
  width:477px;
  background-color:#fff;
  padding:10px 0 10px 0;
`
const Head = styled.div`
  margin:60px auto 10px auto;
  text-align:center;
  font-size:42px;
  color:#00B2B4;
  font-family:'Nunito';
`
const Text = styled.div`
  color:#8f8f8f;
  font-size:18px;
  text-align:center;
`
const Div = styled.div`
  width:308px;
  border-top:1px solid #E2E2E2;
  padding-top:15px;
  overflow:hidden;
  margin:50px auto 0 auto;
`
const NewLink = styled(Link)`
  color:#C2C2C2;
  font-size:14px;
  font-family:'Nunito';
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
    margin:'50px auto 20px auto'
  },
}
const SignIn = React.createClass({
  getInitialState(){
    return{
      errText0:'',
      errText1:'',
    }
  },
  signin(e){
    e.preventDefault()
    var data = {}
    var self = this
    var i = 0
    var input = dom(this.refs.signinForm).getElementsByTagName("input")
    input = [].slice.call(input)
    input.forEach((field,index)=>{
      if(field.value!=''){
        //console.log(field.name+':'+field.value)
        data[field.name] = field.value
        this.state['errText'+index] = ''
        this.setState({})
      }else{
        this.state['errText'+index] = <p>This field is required</p>
        this.setState({})
        i++
      }
    })
    if(i==0){
      Request
        .post(config.BACKURL+'/auth')
        .set('Accept','application/json')
        .send(data)
        .end((err,res)=>{
          console.log(res.body)
          if(err){
            this.setState({
              errText0: <p>{res.body.error}</p>,
              errText1: <p>{res.body.error}</p>
            })
          }else {
            auth.setCookieAndToken(res.body)
            browserHistory.push('/')
          }
        })
    }else{return}
  },

  render(){
    var {onClick,style} = this.props
    var {errText0,errText1,errText2} = this.state
    return(
      <Box>
        <Head>Email Sign In</Head>
        <InputBox onSubmit={this.signin} ref='signinForm'>
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            type="email"
            fullWidth={true}
            style={{marginTop:'20px'}}
            name='username'
            errorText={errText0}
          /><br />
          <TextField
            hintText="Password Field"
            floatingLabelText="Password"
            type="password"
            fullWidth={true}
            style={{marginTop:'20px'}}
            name='password'
            errorText={errText1}
          /><br />
          <div style={styles.btnCon}><PrimaryButton label='Sign In' type='submit'/></div>
        </InputBox>
        <Div style={{marginBottom:'20px'}}>
          <NewLink to="/forget" style={{float:'left'}}>Forget Password?</NewLink>
          <NewLink to="/signup" style={{float:'right'}}>Sign Up</NewLink>
        </Div>
      </Box>
    )
  }
})



export default SignIn