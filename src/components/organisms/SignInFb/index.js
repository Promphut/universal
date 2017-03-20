import React, {PropTypes} from 'react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton';
import {Link,browserHistory} from 'react-router'
import Request from 'superagent'

const Box = styled.div`
  width:477px;
  height:427px;
  background-color:#fff;
  padding:10px 0 10px 0;
`
const Head = styled.div`
  margin:70px auto 10px auto;
  text-align:center;
  font-size:42px;
  font-family:'Nunito'
  color:#00B2B4;
`
const Text = styled.div`
  color:#8f8f8f;
  font-size:18px;
  text-align:center;
  font-family:'Mitr'
`
const LinkUnderLine = styled(Link)`
  text-decoration:underline;
`
const Div = styled.div`
  width:308px;
  border-top:1px solid #E2E2E2;
  padding-top:15px;
  margin:70px auto 0 auto;
`
const NewLink = styled(Link)`
  color:#C2C2C2;
  font-size:14px;
  font-family:'Nunito';
`
var styles={
  button:{
    background:'#3A579A',
    borderRadius:'24px',
    height:'48px',
    width:'307px'
  },
  btn:{
    background:'#3A579A',
    borderRadius:'24px',
  },
  btnCon:{
    width:'307px',
    margin:'60px auto 20px auto'
  },
  labelBtn:{
    top:'8px',
    fontWeight:'bold'
  }
}
const SignInFb = React.createClass({
  getInitialState(){
    return{

    }
  },

  // signupFB(e){
  //   e.preventDefault()
  //   Request
  //     .get(config.BACKURL+'/auth/facebook?publisher='+config.PID)
  //     .set('Accept','application/json')
  //     .end((err,res)=>{
  //       if(err) throw err
  //       else{
  //         browserHistory.push('/')
  //       }
  //     })
  // },  

  render(){
  return(
    <Box>
      <Head>Sign In</Head>
      <div style={styles.btnCon}>
        <a href={config.BACKURL+'/auth/facebook?publisher='+config.PID+'&nextpathname='+encodeURIComponent(this.props.nextPathname)}>
          <RaisedButton
            label=" Sign In with facebook"
            labelPosition="after"
            labelColor='white'
            labelStyle={styles.labelBtn}
            icon={<i className="fa fa-facebook" style={{color:'white',margin:'17px 10px 0 0'}} aria-hidden="true"></i>}
            style={styles.button}
            buttonStyle={styles.btn}
          />
        </a>
      </div>
      <Text style={{marginTop:'20px',fontFamily:'Nunito'}}>Or <LinkUnderLine to="#" onClick={this.props.emailSignIn}>Sign In with an E-mail</LinkUnderLine></Text>
      <Div>
        <NewLink to="/forget" style={{float:'left'}}>Forget Password?</NewLink>
        <NewLink to="/signup" style={{float:'right'}}>Sign Up</NewLink>
      </Div>
    </Box>
  )
  },
})

SignInFb.propTypes = {
  nextPathname: PropTypes.string.isRequired
}


export default SignInFb