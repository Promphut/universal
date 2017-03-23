import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {BGImg} from 'components'
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
  width:171px;
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

const Column = styled.div`
  font-weight:bold;
  font-size:36px;
  color:#00B2B4;
  text-align:center;
`

//if height less than 900px remove last item
const Con = styled.div`
  width:100%;
  margin:40px 0 0 0;
`

const Name = styled(Link)`
  color:#222;
  font-size:17px;
  width:190px;
  font-weight:bold;
`

const Img = styled.div`
  width:127px;
  height:75px;
  float:right;
  background-position:center;
  background-size:cover;
`

const Vote = styled.div`
  color:#8F8F8F;
  font-size:13px;
  margin-top:15px;
`

const TrendingSideBarInner = ({style, detail, index}) => {
  let {title,comments,votes,cover} = detail
  return(
    <Con style={{...style}}>
      <BGImg url={detail.url} src={cover} style={{width:'127px',height:'75px',float:'right'}}/>
      <Name to={detail.url} className="sans-font">{index+'.'+title}</Name>
      <Vote className="sans-font">{votes.total} Votes {''+ comments.count} Comments</Vote>
    </Con>
  )
}

const TrendingSideBar = React.createClass({
  getInitialState(){
    return{
      popular:[]
    }
  },

  componentDidMount(){
    this.getPopular()
    //this.Slider()
	},

  getPopular(){
    // sort will be changed to 'trending' later when implemented
    api.getFeed('story', {status:1}, 'latest')
    .then(result => {
      this.setState({popular:result.feed})
    })
  },

  // Slider(){
  //   var self = this
  //   var item = dom(self.refs.contain)
  //   var startPos = item.getBoundingClientRect().top
  //   var height = item.scrollHeight;
  //   var direction = 0
	// 	window.addEventListener("scroll", function(event) {
	// 		var top = this.scrollY
  //     var stopPos = self.state.stopPos
  //     //console.log(height +' : '+startPos+' : '+top +' : '+stopPos)
  //     if(top>direction){
  //       if(top>=startPos-60&&top<=stopPos-height){
  //         item.style.top = top-startPos+'px';
  //       }
  //     }else{
  //       if(top>=startPos&&top<=stopPos-height){
  //         item.style.top =  top-startPos+'px';
  //       }
  //     }
  //     direction = top
	// 	});
  // },

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.stop != this.props.stop){
  //     this.setState({stopPos:nextProps.stop})
  //   }
  // },

  render(){
    let {popular} = this.state
    //console.log('popular', popular)
    let {style} = this.props
    let tn = []
    if(popular.length > 0){
      for(let i=0;i<6;i++){
        tn.push(
          <TrendingSideBarInner key={i} detail={popular[i]} index={i+1}/>
        )
      }
    }

    return(
      <Container style={{...style}} ref='contain'>
        <Divider/>
        <Head>NOW TRENDING</Head>
        {popular.length!=0?tn:[]}
        {/*{detail.map((data,index)=><Link to='#' key={index}><TrendingSideBarInner detail={data}/></Link>)}*/}
        <Divider/>
      </Container>
    )
  },
})


export default TrendingSideBar;
