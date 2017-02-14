import React, {Component} from 'react';
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar'
import {} from 'components'

const Container = styled.div`
  width:730px;
  margin:50px 0 50px 0;
` 
const styles={
  NoComment:{
    fontSize:'19px',
    color:'#8F8F8F',
    margin:'15px 0 15px 0'
  }
}

const CommentBox = React.createClass({
  getInitialState(){
    return{

    }
  },

  render(){
    return(
      <Container>
        <div style={styles.NoComment}>5 Comments</div>
        <Avatar src='/tmp/avatar.png' size={49} style={{float:'left'}}/>
      </Container>
    )
  }
})

export default CommentBox;