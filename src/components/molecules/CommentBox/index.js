import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar'
import {CommentInput,CommentUser} from 'components'

const Container = styled.div`
  width:100%;
  margin:50px 0 30px 0;
` 

const CommentBox = React.createClass({
  getInitialState(){
    return{

    }
  },

  render(){
    var {style,className} = this.props
    return(
      <Container style={{...style}} className={className}>
        <CommentInput/>
      </Container>
    )
  }
})

export default CommentBox;