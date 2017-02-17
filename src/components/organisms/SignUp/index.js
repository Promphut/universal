import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router'
import {PrimaryButton} from 'components'
import TextField from 'material-ui/TextField';

const Box = styled.div`
  width:477px;
  height:550px;
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

const InputBox = styled.div`
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
const SignUp = ({text,style}) => {
  return(
    <Box>
      <Head>Email Sign Up</Head>
      <Text>ไม่พลาดทุกเรื่องราวการเงินดีๆ สมัครสมาชิค</Text>
      <InputBox>
        <TextField
          hintText="Email"
          floatingLabelText="Email"
          type="email"
          fullWidth={true}
          style={{marginTop:'15px'}}
        /><br />
        <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
          fullWidth={true}
          style={{marginTop:'15px'}}
        /><br />
        <TextField
          hintText="Password Again"
          floatingLabelText="Password Again"
          type="password"
          fullWidth={true}
          style={{marginTop:'15px'}}
        /><br />
        <div style={styles.btnCon}><PrimaryButton label='Sign Up' /></div>
      </InputBox>
    </Box>
  )
}

export default SignUp