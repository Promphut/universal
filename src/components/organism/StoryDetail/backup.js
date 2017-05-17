import React, {Component} from 'react';
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon';
import {WritedBy,TagBox,CommentBox,CommentUser,RecommendArticle} from 'components'
import RaisedButton from 'material-ui/RaisedButton';

const Wraper = styled.div`
  color:#222;
  width:100%;
  margin:0 auto 0 auto;
  @media(max-width:480px){
    .center{
      justify-content: center;
    }
  }
`
const Head = styled.h1`
  font-size:36px;
  font-Weight:bold;
  @media (max-width:480px){
    font-size:24px;
  }
`
const Article = styled.div`
  font-size:20px;
  margin-top:40px;
  @media (max-width:480px){
    font-size:16px;
    margin-top:15px;
  }
`
const TagContainer = styled.div`
  display:flex;
  flex-wrap:wrap;
  margin:40px 0 40px 0;
  font-family:'PT Sans';
  @media (max-width:480px){
    margin:20px 0 20px 0;
  }
`
const Divider = styled.div`
  height:2px;
  width:100%;
  background-color:#E2E2E2;
  margin:20px 0 20px 0;
`
const CommentUserContainer = styled.div`
  width:100%;

`
const Child = styled.div`
  margin-left:60px;
  width:80%;
`
const NoComment = styled.div`
  font-size:19px;
  color:#8F8F8F;
  margin:15px 0 15px 0;
  @media (max-width:480px){
    font-size:16px;
  }
`
var commentUserObj = {
  id:'1',
  name:'Jirunya Bewvy',
  target:'Ochawin',
  date:'10 hrs ago',
  text:"Ruined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.uined the party last night as they rocked into Toronto"
}

var a = [commentUserObj,commentUserObj,commentUserObj,commentUserObj,commentUserObj]

const styles ={
  button:{
    width:'100%',
    margin:'15px 0 15px 0',
    height:'40px',
    borderRadius:'15px'
  },
  btnStyle:{
    width:'100%',
    borderRadius:'15px'
  }
}

const writerDetail = {
    name:'Ochawin',
    date:' 16 Nov 2016, 8:30pm',
    column:'Money Ideas'
}


const StoryDetail = React.createClass({
  getInitialState(){
    this.head = "MICROSOFT SURFACE STUDIO REVIEW: A BEAUTIFUL INVADER OF APPLE'S BASE";
    this.article = `Ruined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.uined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'. ruined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.uined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.\n \n
Ruined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.uined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'. ruined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.uined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.`
    return{

    }
  },

  renderComment(data,index){
    return(
      <div key={index}>
        <CommentUser data={data}/>
        <Child>
        </Child>
      </div>
    )
  },

  render(){
    return(
      <Wraper>
        <Head className='title-font'>{this.head}</Head>
        <WritedBy detail={writerDetail}/>
        <Article className='content-font'>{this.article}</Article>
        <TagContainer>
          <TagBox text='MONEY IDEAS' style={{margin:'10px'}}/>
          <TagBox text='MONEY' style={{margin:'10px'}}/>
          <TagBox text='IDEAS' style={{margin:'10px'}}/>
          <TagBox text='MONEY IDEAS' style={{margin:'10px'}}/>
          <TagBox text='MONEY IDEAS' style={{margin:'10px'}}/>
          <TagBox text='MONEY' style={{margin:'10px'}}/>
        </TagContainer>
        <Divider/>
        <div className='row center'>
          <div className='col-md-6 col-sm-12'>
            <WritedBy detail={writerDetail} />
          </div>
          <div className='col-md-6 col-sm-12'>
            <WritedBy detail={writerDetail} />
          </div>
        </div>
        <Divider/>
        <NoComment>5 Comments</NoComment>
        <CommentBox className="hidden-mob"/>
        <CommentUserContainer>
          {a.map(this.renderComment)}
          <RaisedButton 
            label="Show more comments" 
            target="_blank"
            labelColor="#8F8F8F"
            labelStyle={{fontSize:'15px',top:'11'}}
            style={styles.button}
            buttonStyle={styles.btnStyle}
            backgroundColor="none"
          />
        </CommentUserContainer>

        
      </Wraper>
    )
  }
})

export default StoryDetail;