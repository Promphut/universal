import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar'
import {} from 'components'

const Container = styled.div`
  overflow: auto;
	width: 100%
` 
const TextInput = styled.textarea`
  width:534px;
  height:82px;
  margin-left:15px;
  float:left;
  border: 1px solid #C1C1C1;
`
const Btn = styled.button`
  border-radius:20px;
  width:95px;
  height:40px;
  background-color:#00B2B4;
  color:#fff;
  float:left;
  margin-left:20px;
  &:hover{
    cursor:pointer;
  }
`

var styles = {
  button:{
    borderRadius:'20px',
    marginLeft:'15px'
  },
  btnStyle:{
    borderRadius:'20px',
  },
}

const CommentInput = React.createClass({
  getInitialState(){
    return{

    }
  },

  render(){
    return(
      <Container>
        <Link to="#"><Avatar src='/tmp/avatar.png' size={49} style={{float:'left'}}/></Link>
        <TextInput placeholder='Your comment here...'/>
        <RaisedButton 
          label="Send" 
          target="_blank"
          labelColor="#fff"
          style={styles.button}
          buttonStyle={styles.btnStyle}
          backgroundColor="#00B2B4"/>
      </Container>
    )
  }
})

export default CommentInput;