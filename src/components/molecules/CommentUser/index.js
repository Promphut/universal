import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import {UserTag} from 'components'
import RaisedButton from 'material-ui/RaisedButton';

const Container = styled.div`
  width:100%;
  margin:10px 0 10px 0;
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

const TextBtn = styled.div`
  color:#C1C1C1;
  font-size:16px;
  float:left;
  margin:25px 15px 0 20px; 
  &:hover{
    text-decoration:underline;
    color:#222;
    cursor:pointer;
  }
`

const ReplyBox = styled.textarea`
  width:500px;
  height:60px;
  border: 1px solid #C1C1C1;
  float:left;
`

var styles = {
  button:{
    borderRadius:'20px',
    margin:'15px 0 0 60px',
    background:'none',
    boxShadow:'none',
    float:'left'
  },
  btnStyle:{
    borderRadius:'20px',
    border:'2px solid #C1C1C1',
    background:'none',
  },
  cont:{
    overflow:'hidden',
    width:'100%'
  },  
  button2:{
    borderRadius:'20px',
    marginLeft:'15px',
    float:'left'
  },
  btnStyle2:{
    borderRadius:'20px',
  },
}

var replyBox = ''
const test = []

const CommentBox = React.createClass({
  getInitialState(){
    return{
      a:false
    }
  },
  showReplyBox(){
    replyBox=<div style={{...styles.cont,margin:'15px 0 15px 60px'}}>
          <ReplyBox/>
          <RaisedButton 
            onClick={this.reply}
            label="Reply" 
            target="_blank"
            labelColor="#fff"
            style={styles.button2}
            buttonStyle={styles.btnStyle2}
            backgroundColor="#00B2B4"/>
        </div>
    this.setState({a:true})
  },
  reply(){
    replyBox=''
    this.setState({a:true})
  },
  render(){
    return(
      <Container>
        <Link to="#"><Avatar src='/tmp/avatar.png' size={49} style={{float:'left',marginRight:'15px'}}/></Link>
        <Name>{this.props.data.name} <Time>{this.props.data.date}</Time></Name>
        <div><UserTag>@{this.props.data.target}</UserTag> {this.props.data.text}</div>
        <div style={styles.cont}>
          <RaisedButton 
            label="Upvote | 18" 
            target="_blank"
            labelColor="#C1C1C1"
            labelStyle={{fontSize:'12px',top:'-2px'}}
            style={styles.button}
            buttonStyle={styles.btnStyle}
            backgroundColor="none"/>
          <TextBtn>Downvote</TextBtn>
          <TextBtn onClick={this.showReplyBox}>Reply</TextBtn>
        </div>
        {replyBox}
      </Container>
    )
  }
}) 


export default CommentBox;