import React from 'react'
import { TopBarWithNavigation,BGImg,StoryMenu,} from 'components'
import {findDOMNode as dom} from 'react-dom'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'react-slick'
import Request from 'superagent'

const Wrapper = styled.div`
  background-color:#E5E5E5;
  .imgWidth{
    width:222px;
    height:123px;
  }
  @media (max-width:480px) {
    .imgWidth{
      width:135px;
      height:193px;
    }
  }
`
const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding:50px 0 0 0;
`

const Main = styled.div`
	flex: 8 730px;
	max-width: 730px;
	@media (max-width: 480px) {
		flex:0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
	}
`

const Aside = styled.div`
	flex: 3 325px;
	position:relative;
	max-width: 325px;
	margin-left:60px;
	@media (max-width: 1160px) {
		display:none;
	}
`
const Text = styled.div`
	color:#8F8F8F;
	font-size:19px;
`
const TextLine = styled.div`
	color:#8F8F8F;
	font-size:19px;
	border-bottom:1px solid #E2E2E2;
	padding-bottom:11px;
`
const ColumnName = styled.div`
  font-size:24px;
  font-weight:bold;
  margin-top:10px;
`
const Column = styled.div`
	color:#8F8F8F;
  font-size:14px;
  margin-top:10px;
`
const Feed = styled.div`
	flex: 12 1120px;
	max-width: 1120px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		min-width: 100%;
		padding:0 15px 0 15px;
  }
`

const Box = styled.div`
  width:255px;
  background:white;
  padding:15px;
  height:356px;
`

// const ColumnTN = ()=>{
//   return(

//   )
// }

const AllColumn = React.createClass({
	getInitialState(){
		return {
			stopPos:0,
			feed:[],
			popular:[]
		}
	},

	componentDidMount(){
		this.getFeed()
	},

	getFeed(){
		var filter = JSON.stringify({status:1})
		Request
			.get(config.BACKURL+'/publishers/'+config.PID+'/feed?type=story&filter='+filter+'&sort=latest')
			.set('Accept','application/json')
			.end((err,res)=>{
				if(err) throw err
				else{
					//console.log(res.body)
					this.setState({feed:res.body.feed})
				}
			})
	},

	render(){
		var c = []  
    var settings = {
      centerMode: false,
      slidesToShow: 4,
      speed: 300,
      arrows: false,
      draggable: false,
      infinite: false,
      initialSlide:0,
      slickGoTo:0,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            initialSlide:1,
            slickGoTo:1,
            arrows: false,
            centerMode: true,
            draggable: true,
            centerPadding: '10px',
            slidesToShow: 2
          }
        }
      ]
    };
		var {feed} = this.state
    for(var i=0;i<9;i++){
      c.push(
        <div style={{flex:1}}><Box key={i}>
          <BGImg src='/tmp/story-list/1486687443533-Dakota.jpeg' className='imgWidth' style={{margin:'0 auto 0 auto'}}/>
          <ColumnName className='serif-font'>Money Ideas</ColumnName>
          <Column className='sans-font' >Recents from 131 Stories</Column>
          <ColumnName className='sans-font' style={{fontSize:'14px'}}>1.โมหจริต ละตินฮิปฮอปด็อกเตอร์โมหจริตแอดมิสชัน</ColumnName>
          <ColumnName className='sans-font' style={{fontSize:'14px'}}>2.โมหจริต ละตินฮิปฮอปด็อกเตอร์โมหจริตแอดมิสชัน</ColumnName>
        </Box></div>
      )
    }
		return (
		    <Wrapper>
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} loggedIn={this.props.params.loggedIn} />
					<Content >
            <Feed>
              <div className='row' style={{width:'100%'}}><StoryMenu style={{padding:'15px 0 15px 0',marginTop:'20px',float:'left'}}/></div>
              <div style={{margin:'20px 0 20px 0'}}>
                <Slider {...settings} >
                  {c}
                </Slider>
              </div>  
              <div style={{margin:'20px 0 20px 0'}}>
                <Slider {...settings} >
                  {c}
                </Slider>
              </div> 
            </Feed>
          </Content>
		   </Wrapper>
		  )
	}
});

export default AllColumn;