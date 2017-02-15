import React, {Component} from 'react';
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon';
import {WritedBy,TagBox,CommentBox} from 'components'

const Wraper = styled.div`
  color:#222;
  width:100%;
  margin:0 auto 0 auto;
`
const Head = styled.h1`
  font-size:36px;
  font-Weight:bold;
`
const Article = styled.div`
  font-size:20px;
  margin-top:40px;
`
const TagContainer = styled.div`
  display:flex;
  flex-wrap:wrap;
  margin:40px 0 40px 0;
`
const Divider = styled.div`
  height:2px;
  width:100%;
  background-color:#E2E2E2;
  margin:20px 0 20px 0;
`


const ArticlePage = React.createClass({
  getInitialState(){
    this.head = "MICROSOFT SURFACE STUDIO REVIEW: A BEAUTIFUL INVADER OF APPLE'S BASE";
    this.article = `Ruined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.uined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'. ruined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.uined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.\n \n
Ruined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.uined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'. ruined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.uined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.`
    return{

    }
  },

  render(){
    return(
      <Wraper>
        <h1>{this.head}</h1>
        <WritedBy writerName='Ochawin' date='16 Nov 2016, 8:30pm' column='Money Ideas'/>
        <Article>{this.article}</Article>
        <TagContainer>
          <TagBox text='MONEY IDEAS' style={{margin:'10px'}}/>
          <TagBox text='MONEY' style={{margin:'10px'}}/>
          <TagBox text='IDEAS' style={{margin:'10px'}}/>
          <TagBox text='MONEY IDEAS' style={{margin:'10px'}}/>
          <TagBox text='MONEY IDEAS' style={{margin:'10px'}}/>
          <TagBox text='MONEY' style={{margin:'10px'}}/>
        </TagContainer>
        <Divider/>
        <div style={{display:'flex'}}>
          <div style={{flex:'1'}}>
            <WritedBy writerName='Ochawin' date='16 Nov 2016, 8:30pm' column='Money Ideas'/>
          </div>
          <div style={{flex:'1'}}>
            <WritedBy writerName='Ochawin' date='16 Nov 2016, 8:30pm' column='Money Ideas'/>
          </div>
        </div>
        <Divider/>
        <CommentBox/>
      </Wraper>
    )
  }
})

export default ArticlePage;