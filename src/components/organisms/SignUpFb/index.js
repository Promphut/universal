import React from 'react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton';
import {Link,browserHistory} from 'react-router'
import Request from 'superagent'
const Box = styled.div`
  width:476px;
  height:427px;
  background-color:#fff;
  padding:10px 0 10px 0;
`
const Head = styled.div`
  margin:70px auto 10px auto;
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
const LinkUnderLine = styled(Link)`
  text-decoration:underline;
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
    width:'167px',
    margin:'70px auto 20px auto'
  },
  labelBtn:{
    top:'8px',
    fontWeight:'bold'
  }
}
const SignUpFb = React.createClass({
  getInitailState(){
    return{}
  },

  render(){
    return(
      <Box>
        <Head>Sign Up</Head>
        <Text>ไม่พลาดทุกเรื่องราวการเงินดีๆ สมัครสมาชิค</Text>

        <div style={styles.btnCon}>
          <a href={config.BACKURL+'/auth/facebook?publisher='+config.PID+'&nextpathname='+encodeURIComponent(this.props.nextPathname)}>
            <RaisedButton
              label=" Sign Up"
              labelPosition="after"
              labelColor='white'
              labelStyle={styles.labelBtn}
              icon={<i className="fa fa-facebook" style={{color:'white',margin:'17px 10px 0 0'}} aria-hidden="true"></i>}
              style={styles.button}
              buttonStyle={styles.btn}
            />
          </a>  
        </div>

        <Text style={{marginTop:'10px',fontFamily:'Nunito'}}>Or <LinkUnderLine to='#' onClick={this.props.emailSignUp}>Sign Up with an E-mail</LinkUnderLine></Text>
      </Box>
    )
  }
})



export default SignUpFb 