import React from 'react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton';
import {Link,browserHistory} from 'react-router'
import Request from 'superagent'
import TextField from 'material-ui/TextField';


const Box = styled.div`
  width:600px;
  background-color:#fff;
  padding:10px 0 10px 0;
  @media (max-width:480px) {
    background:none;
    width:100vw;
    padding:80px 0 80px 0;
    height:auto;
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
`


const EmailSignUp = React.createClass({
  getInitialState(){
    return{
      email:''
    }
  },

  onChangeText(e){
    this.setState({email:e.target.value})
  },

  render(){
  var { email } = this.state
  var { errorText,onSubmit } = this.props
  var { theme } = this.context.setting.publisher
  var styles={
    button:{
      background:theme.accentColor,
      borderRadius:'24px',
      height:'40px',
      width:'350px',
      marginTop:'25px'
    },
    btn:{
      background:theme.accentColor,
      borderRadius:'24px',
    },
    btnCon:{
      width:'350px',
      margin:'0px auto 20px auto'
    },
    labelBtn:{
      top:'10px',
      fontWeight:'bold'
    }
  }
  
    return(
      <Box>
        <Head >Enter your Email</Head>
        <InputBox onSubmit={(e)=>onSubmit(e,this.state.email)}>
          <TextField
            floatingLabelText="Email"
            type="email"
            fullWidth={true}
            name='email'
            inputStyle={{color:'#222'}}
            value={email}
            onChange={this.onChangeText}
            errorText={errorText}
          />
          <div style={{...styles.btnCon}}>
            <RaisedButton
              label="Next"
              labelPosition="after"
              labelColor='white'
              labelStyle={{...styles.labelBtn}}
              style={{...styles.button}}
              buttonStyle={{...styles.btn}}
              type='submit'
            />
          </div>
          <Text>Already have ab account? <LinkUnderLine to='/signin'> Sign In</LinkUnderLine> </Text>
        </InputBox>
      </Box>
    )
  }
})

EmailSignUp .contextTypes = {
	setting: React.PropTypes.object
}

export default EmailSignUp 