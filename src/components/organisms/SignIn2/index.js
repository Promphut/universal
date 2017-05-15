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
  padding:10px 0 20px 0;
  @media (max-width:480px) {
    background:none;
    width:100vw;
    padding:80px 0 80px 0;
    height:auto;
  } 
`
const Head = styled.div`
  margin:35px auto 0px auto;
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
  margin:5px 0 5px 0;
  line-height:1.5;
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
const NewLink = styled(Link)`
  color:#C2C2C2;
  font-size:14px;
  font-family:'Nunito';
`

const SignIn2 = React.createClass({
  getInitialState(){
    return{
      email:''
    }
  },

  onChangeText(e){
    this.setState({email:e.target.value})
  },

  render(){
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
        <Head >You already have an account</Head>
        <Text className='sans-font' style={{marginBottom:'0px'}}>
          <span style={{color:'#222'}}>aommoney@likemeasia.com </span>is signed up<br/>
          with Infographic Thailand by Facebook.<br/>
          Do you want to continue log in with this account?
        </Text>
        <div style={{width:'70px',margin:'40px auto 20px auto'}}><Avatar src='/tmp/avatar.png' size={70}/></div>
        <Text className='sans-font' style={{color:"#222",margin:'30px',marginBottom:'0px'}}>Ochawin Chirasottikul</Text>
        <InputBox onSubmit={(e)=>this.props.onSubmit(e,this.state.email)}>
          <TextField
            floatingLabelText="Email"
            type="email"
            fullWidth={true}
            name='email'
            inputStyle={{color:'#222'}}
            value={this.state.email}
            onChange={this.onChangeText}
          />
          <NewLink to="/forget" style={{float:'left'}}>Forget Password?</NewLink>
          <div style={styles.btnCon}>
            <RaisedButton
              label="Next"
              labelPosition="after"
              labelColor='white'
              labelStyle={styles.labelBtn}
              style={styles.button}
              buttonStyle={styles.btn}
              type='button'
            />
          </div>
        </InputBox>
      </Box>
    )
  }
})

SignIn2.contextTypes = {
	setting: React.PropTypes.object
}

export default SignIn2 