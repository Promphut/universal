import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {TagBox} from 'components'
import {findDOMNode as dom} from 'react-dom'
//import Request from 'superagent'
import api from 'components/api'

const Container = styled.div`
  width:324px;
  position:sticky;
`

const Head = styled.div`
  color:#8F8F8F;
  font-size:20px;
  width:201px;
  text-align:center;
  margin:20px auto 15px auto;
  border:1px solid #E2E2E2;
  background:white;
  padding:2px;
  font-family:'Nunito'

	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	cursor: default;
`

const Divider =styled.div`
  height:1px;
  width:100%;
  background-color:#E2E2E2;
  top:35px;
  z-index:-5;
  position:relative;
`

const tagArray = [
    {id:1,name:'tag1 asd as ',url:'/tag/tag1'},
    {id:2,name:'tag2 sad as',url:'/tag/tag2'},
    {id:3,name:'tag3 asd ',url:'/tag/tag3'},
    {id:4,name:'tag4 asd sa das ',url:'/tag/tag4'}
  ]

const TagSideBar = React.createClass({
  getInitialState(){
    return{
      popular:[]
    }
  },

  componentDidMount(){

	},

  render(){
    let {style} = this.props
    let tn = []
    if(tagArray.length > 0){
      for(let i=0;i<tagArray.length;i++){
        tn.push(
          <Link to={tagArray[i].url} key={i}><TagBox style={{margin:'0 20px 20px 0'}}>{tagArray[i].name}</TagBox></Link>    
        )
      }
    }

    return(
      <Container style={{...style}} >
        <Divider/>
        <Head>SUGGESTED TAGS</Head>
        <div className='row' style={{margin:'30px 0 60px 0'}}>
          {tagArray.length!=0?tn:[]}
        </div>
      </Container>
    )
  },
})


export default TagSideBar;
