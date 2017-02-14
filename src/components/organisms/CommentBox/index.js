import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar'
import {CommentInput,CommentUser} from 'components'

const Container = styled.div`
  width:100%;
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
        <CommentInput/>
        <CommentUser name='Jirunya Bewvy' date='10 hrs ago' target='Ochawin' text="Ruined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.uined the party last night as they rocked into Toronto"/>
      </Container>
    )
  }
})

export default CommentBox;