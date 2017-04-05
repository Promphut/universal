import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {BGImg} from 'components'
import Slider from 'react-slick'
import Request from 'superagent'
import FontIcon from 'material-ui/FontIcon'
const Container = styled.div`
  width:203px;
  display:inline;
  .imgWidth{
    width:203px;
    height:290px;
  }
  @media (max-width:480px) {
    width:135px;
    .imgWidth{
      width:135px;
      height:193px;
    }
  }
`
const Div = styled.div`
  color:#8F8F8F;
  font-size:13px;
  margin-top:5px;
  @media (max-width:480px) {
    font-size:11px;
  }
`
const Column = styled.span`
  font-weight:bold;
`
const Name = styled.div`
  color:#222;
  font-weight:bold;
  font-size:17px;
  margin:10px 0 0 0;
  @media (max-width:480px) {
    font-size:13px;
  }
`

const ThumpnailSmall = ({detail,style})=>{
    var {name,updated,cover} = detail
    return(
      <Container style={{...style}}>
        <BGImg src={cover} className='imgWidth' alt={name}/>
        <Name className='sans-font'>{name}</Name>
        <Div className='sans-font'>1145 Stories</Div>
      </Container>
    )
}


const Con = styled.div`
  width:100%;
  @media (max-width:480px) {
    width:100%;

  }
`
const Box = styled.div`
  flex:1;
`

const ColumnThumpnailRow= React.createClass({
  getInitialState(){
    return{
      column:[],
    }
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.detail!=this.props.detail){
      this.setState({
        detail:nextProps.detail
      })
    }
  },
  componentDidMount(){
    this.getColumn()
  },
  getColumn(){
    var self = this
    Request
    .get(config.BACKURL+'/publishers/'+config.PID+'/columns')
    .set('Accept','application/json')
    .end((err,res)=>{
      if(err) throw err
      else{
        //console.log(res.body)
        self.setState({column:res.body.columns})
      }
    })
  },
  render(){
  var {size,style,sortBy} = this.props
  var {column} = this.state
  var thumpnail = []
  var settings = {
    centerMode: false,
    slidesToShow: 5,
    speed: 300,
    draggable: false,
    initialSlide:0,
    slickGoTo:0,
    slidesToScroll:3,
    nextArrow:<button type='button' style={{top:'50px',position:'relative'}}><FontIcon className='material-icons' style={{color:'#8F8F8F',fontSize:'90px',top:'-70px',left:'-40',position:'relative'}}>keyboard_arrow_right</FontIcon></button>,
    prevArrow:<button type='button'><FontIcon className='material-icons' style={{color:'#8F8F8F',fontSize:'90px',top:'-70px',left:'-50',position:'relative'}}>keyboard_arrow_left</FontIcon></button>,
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
  }
  for(let i=0;i<column.length;i++){
    thumpnail.push(
      <Box key={i}><ThumpnailSmall detail={column[i]}  /></Box>
    )
  }
  return(
    <Con style={{...style}}>
      {column.length!=0?<Slider {...settings}>
      {thumpnail}
      </Slider>:''}
    </Con>
  )
}
})

export default ColumnThumpnailRow;
