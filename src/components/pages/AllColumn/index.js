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
    width:255px;
    height:141px;
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
  color:white;
`
const Column = styled.div`
	color:#8F8F8F;
  font-size:14px;
  margin-top:2px;
  color:white;
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
  height:257px;
  margin:0 auto 0 auto;
`
const Blur = styled.div`
background: rgba(255,255,255,0);
background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(89%, rgba(255,255,255,1)), color-stop(100%, rgba(255,255,255,1)));
background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=0 );
  position:relative;
  width:100%;
  height:117px;
  opacity:1;
`
const Desc = styled.div`
  font-size:14px;
  white-space: pre-wrap;      /* Webkit */    
  white-space: -moz-pre-wrap; /* Firefox */     
  white-space: -pre-wrap;     /* Opera <7 */    
  white-space: -o-pre-wrap;   /* Opera 7 */     
  word-wrap: break-word;      /* IE */ 
  overflow: hidden;
  text-overflow: ellipsis;
  position:relative;
  color:#222;
  background:white;
  height:120px;
  padding:15px;
`

// const ColumnTN = ()=>{
//   return(

//   )
// }

const AllColumn = React.createClass({
	getInitialState(){
		return {
			stopPos:0,
			column:[],
			popular:[]
		}
	},

	componentDidMount(){
		this.getColumn()
	},

	getColumn(){
		var filter = JSON.stringify({status:1})
		Request
			.get(config.BACKURL+'/publishers/'+config.PID+'/columns')
			.set('Accept','application/json')
			.end((err,res)=>{
				if(err) throw err
				else{
					console.log(res.body)
					this.setState({column:res.body.columns})
				}
			})
	},

	render(){ 
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
		var {column} = this.state
		return (
		    <Wrapper>
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} />
					<Content >
            <Feed>
              <div className='row' style={{width:'100%'}}><StoryMenu style={{padding:'15px 0 15px 0',marginTop:'20px',float:'left'}}/></div>
              {/*<div style={{margin:'20px 0 20px 0'}}>
                <Slider {...settings} >
                  {c}
                </Slider>
              </div>  
              <div style={{margin:'20px 0 20px 0'}}>
                <Slider {...settings} >
                  {c}
                </Slider>
              </div> */}
              <div className='row'>
                {column?column.map((data,index)=>(
                  <div className='col-3' key={index} style={{margin:'20px 0 20px 0'}}>
                    <Box>
                      <BGImg src={data.cover} opacity={0.6} className='imgWidth' style={{margin:'0 auto 0 auto'}}>
                        <div style={{margin:'80px 0 0 15px'}}>
                          <ColumnName className='serif-font'>{data.name}</ColumnName>
                          <Column className='sans-font' >131 Stories</Column>
                        </div>
                      </BGImg>
                        <Desc className='sans-font' >
                          {data.created}
                        </Desc>     
                      <Blur style={{top:'-120px'}}></Blur>     
                    </Box>
                  </div>
                )):''}
              </div>
            </Feed>
          </Content>
		   </Wrapper>
		  )
	}
});

export default AllColumn;