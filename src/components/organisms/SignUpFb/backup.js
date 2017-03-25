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
  @media (max-width:480px) {
    background:none;
    width:100vw;
    padding:80px 0 80px 0;
    height:auto;
  } 
`
const Head = styled.div`
  margin:70px auto 10px auto;
  text-align:center;
  font-size:42px;
  color:#00B2B4;
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
  font-family:'Mitr';
  margin-bottom:70px;
  @media (max-width:480px) {
    color:#fff;
    margin-bottom:20px;
  } 
`
const LinkUnderLine = styled(Link)`
  text-decoration:underline;
  @media (max-width:480px) {
    color:#fff;
  } 
`
var styles={
  button:{
    background:'#3A579A',
    borderRadius:'24px',
    height:'43px',
    width:'167px'
  },
  btn:{
    background:'#3A579A',
    borderRadius:'24px',
  },
  btnCon:{
    width:'167px',
    margin:'0px auto 20px auto'
  },
  labelBtn:{
    top:'5px',
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
        <Head className='hidden-des'>Join us today</Head>
        <Head className='hidden-mob'>Sign Up</Head>
        <Text>ไม่พลาดทุกเรื่องราวการเงินดีๆ สมัครสมาชิค</Text>

        <div style={styles.btnCon}>
          <a href={config.BACKURL+'/auth/facebook?publisher='+config.PID+'&nextpathname='+encodeURIComponent(this.props.nextPathname)}>
            <RaisedButton
              label=" Sign Up"
              labelPosition="after"
              labelColor='white'
              labelStyle={styles.labelBtn}
              icon={<i className="fa fa-facebook" style={{color:'white',margin:'10px 10px 0 0',fontSize:'24px'}} aria-hidden="true"></i>}
              style={styles.button}
              buttonStyle={styles.btn}
            />
          </a>  
        </div>
        <div style={{width:'200px',margin:'0 auto 20px auto'}}>
            <RaisedButton
              label=" Sign Up with Email"
              labelPosition="after"
              labelColor='white'
              onClick={this.props.emailSignUp}
              labelStyle={{...styles.labelBtn,top:'8px',fontWeight:'normal'}}
              style={{...styles.button,width:'200px',height:'40px',background:'none',boxShadow:'none'}}
              buttonStyle={{...styles.btn,background:'none',border:'2px solid #fff',boxShadow:'none'}}
            />
        </div>

        <Text style={{marginTop:'10px',fontFamily:'Nunito'}}>Or <LinkUnderLine to='#' onClick={this.props.emailSignUp}>Sign Up with an E-mail</LinkUnderLine></Text>
      </Box>
    )
  }
})



export default SignUpFb 