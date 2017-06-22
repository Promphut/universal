import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon';
import {EditorCss,WriterAndDate,WritedBy,TagBox,CommentBox,CommentUser,RecommendArticle,FromColumn} from 'components'
import RaisedButton from 'material-ui/RaisedButton';
import api from 'components/api'
import utils from '../../../services/utils'

const Wraper = styled(EditorCss)`
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
  margin-top:40px;
  clear:both;
	overflow:hidden;
<<<<<<< HEAD
  ul > li {
    font-family: 'cs_prajad','PT Sans', sans-serif;
    font-size: 18px;
    margin:10px 0 10px 0;
  }
  p {
    font-family: 'cs_prajad','PT Sans', sans-serif;
    font-size: 18px;
    margin:12px 0 12px 0;
    line-height:1.5;
    font-weight:normal;
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
    color:#222;
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
    border-left: 3px solid ${props=>props.theme.accentColor};
    padding-left:20px;
    display:inline-block;
    white-space: pre-wrap;      /* Webkit */
    white-space: -moz-pre-wrap; /* Firefox */
    white-space: -pre-wrap;     /* Opera <7 */
    white-space: -o-pre-wrap;   /* Opera 7 */
    word-wrap: break-word;      /* IE */
  }
  a {
    color:${props=>props.theme.accentColor};
    &:hover{
      cursor:pointer;
    }
  }
  @media (max-width:480px){
    font-size:16px;
    margin-top:15px;
    h2 {
      font-size: 24px;
    }
    .medium-insert-embeds iframe, .mediumInsert-embeds iframe {
      width:100% !important;
      height:auto !important;
      margin: 0 !important; 
    }
  }
=======
>>>>>>> hotfix-1.1.8
`

const TagContainer = styled.div`
  display:flex;
  flex-wrap:wrap;
  margin:30px 0 0 0;
  font-family:'PT Sans';
  @media (max-width:480px){
    margin:15px 0 15px 0;
  }
`

const Divider = styled.div`
  height:2px;
  width:100%;
  background-color:#E2E2E2;
  margin:20px 0 20px 0;
  @media (max-width:480px){
    margin:15px 0 15px 0;
  }
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
const HighlightBox = styled.div`
  width:100%;
  padding:2px;
  background: linear-gradient(135deg,  ${props => props.theme.primaryColor} 0%, ${props => props.theme.accentColor} 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
`

const Highlight = styled.div`
  position:relative;
  top:0;
  left:0;
  width:100%;
  background-color:white;
  padding:20px;
<<<<<<< HEAD
  ul > li {
    font-family: 'cs_prajad','PT Sans', sans-serif;
    font-size: 18px;
    margin:8px 0 8px 0;
    line-height:1.5;
  }
  ol > li {
    font-family: 'cs_prajad','PT Sans', sans-serif;
    font-size: 18px;
    margin:8px 0 8px 0;
    line-height:1.5;
  }
  p {
    font-family: 'cs_prajad','PT Sans', sans-serif;
    margin:8px 0 8px 0;
    line-height:1.5;;
  }
  @media (max-width:480px){
    padding:5px;
  }
=======
>>>>>>> hotfix-1.1.8
`
const HighlightText = styled.span`
  position:relative;
  top:10px;
  left:20px;
  z-index:5;
  color:${props=>props.theme.primaryColor};
  text-align:center;
  padding:0 9px;
  font-size:14px;
  font-weight:bold;
  font-family:'PT Sans';
  background:white;
  border-left:2px solid ${props=>props.theme.accentColor};
  border-right:2px solid ${props=>props.theme.accentColor};
`
const Flex= styled.div`
  -webkit-flex:1;
  flex:1;
  @media (max-width:480px){
    -webkit-flex:0;
    flex:0;
  }
`


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

class StoryDetail extends React.Component {
  state = {
    tags:[]
  }
  constructor(props) {
    super(props)
    //console.log(props)
    // this.story = {
    //   writer: {},
    //   column: {}
    // }
  }

  getStoryTags = (sid) => {
    if(sid) 
      api.getStoryTags(sid).then((tags)=>{
        //console.log(tags)
        this.setState({
          tags
        })
      })
  }

  renderComment = (data, index) => { 
    return (
      <div key={index}>
        <CommentUser data={data}/>
        <Child></Child>
      </div>
    )
  }

  componentDidMount(){
     this.getStoryTags(this.props.story._id)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.story != this.props.story){
      this.getStoryTags(nextProps.story._id)
      //console.log(nextProps.story)
    }
  }

  render(){
    var {story} = this.props
    var s = story
    //console.log(s)
    const isMobile = utils.isMobile()
    let {tags} = this.state
    const columnStyle = isMobile ? {
      marginTop: '22px'
    } : {}
    //console.log(s)

    return (
      <Wraper>
        <Head className='title-font'>{s.ptitle}</Head>
        <WriterAndDate readTime={s.readTime} writer={s.writer} column={s.column} published={s.published}/>
        {s.phighlight &&
        <div>
          <HighlightText>{s.format=='NEWS'?'SUMMARY':'HIGHLIGHTS'}</HighlightText>
          <HighlightBox>
            <Highlight id='highlight'  dangerouslySetInnerHTML={{__html:s.phighlight}}/>
          </HighlightBox>
        </div>} 
        <Story ref="detail" id='paper'  dangerouslySetInnerHTML={{__html:s.phtml}}></Story>
        {/*<WritedBy writer={s.writer} column={s.column} published={s.published} />*/}


        <TagContainer>
          {tags.map((tag,index)=>(
            <Link to={tag.url} key={index}><TagBox style={{margin:'0 20px 20px 0'}}>{tag.name}</TagBox></Link>
          ))}
        </TagContainer>

        <Divider/>

        {(s.writer&&s.column)&&<div className='row center'>
          <Flex >
            <WritedBy writer={s.writer} column={s.column} published={s.published} />
          </Flex>
          <Flex style={{...columnStyle}}>
            {s.column && <FromColumn column={s.column} />}
          </Flex>
        </div>}

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
}

export default StoryDetail;
