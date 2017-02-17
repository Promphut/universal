import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'

const Container = styled.div`
  width:227px;
`
const Box = styled.div`
  width:100%;
  height:56px;
  padding-top:17px;
  border-radius:10px;
  border:1px dashed #C2C2C2;
  background-color:#F4F4F4;
  text-align:center;
  font-size:14px;
  
  color:#00B2B4;
  &:hover{
    cursor:pointer;
    text-decoration:underline;
  }
`

const UploadPicture = React.createClass({
  getInitialState(){
    return{

    }
  },

  render(){
    return(
      <Container>
        <Box className="menu-font">Upload Picture</Box>
      </Container>
    )
  }
})
    
export default UploadPicture;