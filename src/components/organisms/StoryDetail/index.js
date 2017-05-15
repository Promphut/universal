import React, {Component} from 'react';
import {Link} from 'react-router'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon';
import {WritedBy,TagBox,CommentBox,CommentUser,RecommendArticle,FromColumn} from 'components'
import RaisedButton from 'material-ui/RaisedButton';
import api from 'components/api'
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
  white-space: pre-wrap;      /* Webkit */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap;     /* Opera <7 */
  white-space: -o-pre-wrap;   /* Opera 7 */
  word-wrap: break-word;      /* IE */
  
  @media (max-width:480px){
    font-size:24px;
  }
`
const Story = styled.div`
  font-size:20px;
  margin-top:40px;
  clear:both;
	overflow:hidden;
  ul > li {
    font-family: 'PT Sans', 'cs_prajad', sans-serif;
    font-size: 18px;
    margin:10px 0 10px 0;
  }
  p {
    font-family: 'PT Sans', 'cs_prajad', sans-serif;
    font-size: 18px;
    white-space: pre-wrap;      /* Webkit */
    white-space: -moz-pre-wrap; /* Firefox */
    white-space: -pre-wrap;     /* Opera <7 */
    white-space: -o-pre-wrap;   /* Opera 7 */
    word-wrap: break-word;      /* IE */
  }
  h2 {
    font-size: 28px;
    font-weight:bold;
    color:#222;
    white-space: pre-wrap;      /* Webkit */
    white-space: -moz-pre-wrap; /* Firefox */
    white-space: -pre-wrap;     /* Opera <7 */
    white-space: -o-pre-wrap;   /* Opera 7 */
    word-wrap: break-word;      /* IE */
  }
  h3 {
    font-size: 20px;
    font-weight:normal;
    color:#bfbfbf;
    white-space: pre-wrap;      /* Webkit */
    white-space: -moz-pre-wrap; /* Firefox */
    white-space: -pre-wrap;     /* Opera <7 */
    white-space: -o-pre-wrap;   /* Opera 7 */
    word-wrap: break-word;      /* IE */
  }
  blockquote {
    font-size: 20px;
    font-family: 'PT Serif', 'Mitr';
    font-weight:normal;
    color:#222;
    border-left: 1px solid #E2E2E2;
    padding-left:20px;
    display:inline-block;
    white-space: pre-wrap;      /* Webkit */
    white-space: -moz-pre-wrap; /* Firefox */
    white-space: -pre-wrap;     /* Opera <7 */
    white-space: -o-pre-wrap;   /* Opera 7 */
    word-wrap: break-word;      /* IE */
  }
  @media (max-width:480px){
    font-size:16px;
    margin-top:15px;
  }
`
const TagContainer = styled.div`
  display:flex;
  flex-wrap:wrap;
  margin:30px 0 0 0;
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
const Highlight = styled.div`
  background-color:#F4F4F4;
  border:1px dashed ${props=>props.theme.accentColor};
  width:100%;
  padding:20px;
  ul > li {
    font-family: 'PT Sans', 'cs_prajad', sans-serif;
    font-size: 18px;
    margin:10px 0 10px 0;
  }
  ol > li {
    font-family: 'PT Sans', 'cs_prajad', sans-serif;
    font-size: 18px;
    margin:10px 0 10px 0;
  }
  p {
    font-family: 'PT Sans', 'cs_prajad', sans-serif;
    font-size: 18px;
  }
`

var commentUserObj = {
  id:'1',
  name:'Jirunya Bewvy',
  target:'Ochawin',
  date:'10 hrs ago',
  text:"Ruined the party last night as they rocked into Toronto and downed the Raptors on 'Drake night'.uined the party last night as they rocked into Toronto"
}

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

const StoryDetail = React.createClass({
  getInitialState(){
    this.story = this.props.story
    return {
      tags:[]
     }
  },

  getStoryTags(){
    var sid = this.story.id
    api.getStoryTags(sid).then((tags)=>{
      this.setState({
        tags
      })
      //console.log(tags)
    })
  },

  componentWillMount(){
    this.getStoryTags()
  },

  componentWillReceiveProps(nextProps){
    if(nextProps.story != this.props.story){
      this.story = nextProps.story
      //this.setState({refresh: Math.random()})
      //console.log('componentWillReceiveProps', this.story)
    }
  },

  renderComment(data,index){
    return (
      <div key={index}>
        <CommentUser data={data}/>
        <Child></Child>
      </div>
    )
  },

  render(){
    let s = this.story
    const isMobile = window.isMobile()
    var {tags} = this.state
    const columnStyle = window.isMobile() ? {
      marginTop: '22px'
    } : {}
    //console.log(s.ptitle)
    return (
      <Wraper>
        <Head className='title-font'>{s.ptitle}</Head>
        {s.phighlight&&<Highlight className='content-font'  dangerouslySetInnerHTML={{__html:s.phighlight}}></Highlight>} 
        <Story ref="detail" className='content-font' dangerouslySetInnerHTML={{__html:s.phtml}}></Story>
        {/*<WritedBy writer={s.writer} column={s.column} published={s.published} />*/}


        <TagContainer>
          {tags.length!=0&&tags.map((tag,index)=>(
            <Link to={tag.url} key={index}><TagBox style={{margin:'0 20px 20px 0'}}>{tag.name}</TagBox></Link>
          ))}
        </TagContainer>

        <Divider/>
        <div className='row center'>
          <div className='col-md-6 col-sm-12'>
            <WritedBy writer={s.writer} column={s.column} published={s.published} />
          </div>
          <div className='col-md-6 col-sm-12'  style={columnStyle}>
            {s.column && <FromColumn  column={s.column} />}
          </div>
        </div>
        <Divider/>

        {/* NEXT ITERATION
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
        </CommentUserContainer>*/}


      </Wraper>
    )
  }
})

export default StoryDetail;
