import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router'
import {PrimaryButton} from 'components'
import TextField from 'material-ui/TextField';

const Box = styled.div`
  width:477px;
  height:450px;
  background-color:#fff;
  padding:10px 0 10px 0;
  @media (max-width:480px){
    width:100vw;
  }
  .centerMob{
    width:100px;
  }
`
const Head = styled.div`
  margin:50px auto 10px auto;
  text-align:center;
  font-size:42px;
  color:${props=> props.theme.primaryColor};
  font-family:'Nunito';
  @media (max-width:480px){
    font-size:32px;
  }
`
const Text = styled.div`
  color:#8f8f8f;
  font-size:18px;
  text-align:center;
  @media (max-width:480px){
    font-size:16px;
  }
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
const ForgetPassword = ({text,style}) => {
  return(
    <Box>
      <Head >Forget Password?</Head>
      <Text className="sans-font">We’ll send you an email to reset <br/>the password</Text>
      <InputBox>
        <TextField
          hintText="Email"
          floatingLabelText="Email"
          type="email"
          fullWidth={true}
          style={{marginTop:'15px'}}
        /><br />
        <div style={styles.btnCon} className='centerMob'><PrimaryButton label='Confirm' /></div>
      </InputBox>
    </Box>
  )
}

export default ForgetPassword