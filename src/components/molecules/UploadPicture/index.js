import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'

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
const Preview = styled.div`
  width:100%;
  height:108px;
  font-size:14px;
  background-size:cover;
  background-position:center;
  color:#fff;
  &:hover{
    cursor:pointer;
    text-decoration:underline;
  }
`
const Filter = styled.div`
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.5);
  text-align:center;
  font-size:14px;
  padding-top:48px;
  color:#fff;
  &:hover{
    cursor:pointer;
    text-decoration:underline;
  }
`

const UploadPicture = React.createClass({
  getInitialState(){
    return{
      statePreview:false,
    }
  },
  upload(e){
    var self = this
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
          
        }
        dom(self.refs.preview).style.backgroundImage = 'url('+event.target.result+')'
        self.setState({statePreview:true})
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
  },

  render(){
    if(this.state.statePreview){
      var styleVisible = {
        //visibility:'visible'
        display:'block'
      }
    }else{
      var styleVisible = {
        //visibility:'hidden'
        display:'none'
      }
    }
    return(
      <Container>
        {!this.state.statePreview?<Box className="menu-font" onClick={()=>(dom(this.refs.imageLoader).click())}>Upload Picture</Box>:''}
        <Preview ref='preview' style={{...styleVisible,backgroundImage:'url(/tmp/story-list/1486677858322-NTBTS_102_8586.jpeg)'}}>
          <Filter onClick={()=>(dom(this.refs.imageLoader).click())}>Change Picture</Filter>
        </Preview>
        <input type="file" ref="imageLoader" name="imageLoader" onChange={this.upload} style={{visibility:'hidden'}}/>
      </Container>
    )
  }
})
    
export default UploadPicture;