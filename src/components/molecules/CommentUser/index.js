import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import {UserTag} from 'components'
import RaisedButton from 'material-ui/RaisedButton';

const Container = styled.div`
  width:100%;
  margin:20px 0 20px 0;
` 
const Name = styled.div`
  color:#222222;
  font-weight:bold;
  font-size:17px;
`
const Time = styled.span`
  color:#8F8F8F;
  font-size:15px;
`

var styles = {
  button:{
    borderRadius:'20px',
    margin:'15px 0 0 60px '
  },
  btnStyle:{
    borderRadius:'20px',
  },
}


const CommentBox = ({name,date,target,text}) =>{
  return(
    <Container>
      <Link to="#"><Avatar src='/tmp/avatar.png' size={49} style={{float:'left',marginRight:'15px'}}/></Link>
      <Name>{name} <Time>{date}</Time></Name>
      <div><UserTag>@{target}</UserTag> {text}</div>
      <div>
        <RaisedButton 
          label="Upvote | 18" 
          target="_blank"
          labelColor="#fff"
          labelStyle={{fontSize:'12px'}}
          style={styles.button}
          buttonStyle={styles.btnStyle}
          backgroundColor="none"/>
      </div>
    </Container>
  )
}

export default CommentBox;