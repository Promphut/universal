import React from 'react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'
import {PrimaryButton} from 'components'

const Box = styled.div`
  width:476px;
  height:427px;
  background-color:#fff;
  margin:15% auto 0 auto;
  padding:10px 0 10px 0;
`
const Head = styled.div`
  margin:70px auto 10px auto;
  text-align:center;
  font-size:42px;
  color:#00B2B4;
`
const Text = styled.div`
  color:#8f8f8f;
  font-size:18px;
  text-align:center;
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
    width:'94px',
    margin:'70px auto 20px auto'
  },
}
const SignUp = ({text,style}) => {
  return(
    <Box>
      <Head>Email Sign Up</Head>
      <Text>ไม่พลาดทุกเรื่องราวการเงินดีๆ สมัครสมาชิค</Text>

      <div style={styles.btnCon}><PrimaryButton label='Sign Up' /></div>
    </Box>
  )
}

export default SignUp