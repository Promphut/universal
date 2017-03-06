import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {BGimg} from 'components'
import Slider from 'react-slick'
import Request from 'superagent'

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
    var {title,updated,coverMobile} = detail
    return(
      <Container style={{...style}}>
        <BGImg src={coverMobile} className='imgWidth'/>
        <Name className='sans-font'>{title}</Name>
        <Div className='sans-font'>5 min read</Div>
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
      detail:this.props.detail
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
    Request
    .get(config.BACKURL+'/publishers/'+config.PID+'/columns')
    .set('Accept','application/json')
    .end((err,res)=>{
      if(err) throw err
      else{
        console.log(res.body)
      }
    })
  },
  render(){
  var {size,style,sortBy} = this.props
  var {detail} = this.state
  var thumpnail = []
  var No = size=='small'?5:4
  var settings = {
    centerMode: false,
    slidesToShow: 5,
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
  // if(detail.length!=0){
  //   for(let i=0;i<9;i++){
  //     thumpnail.push(
  //       size=='small'?<Box key={i}><ThumpnailSmall detail={detail[i]}  /></Box>:<Box key={i}><ThumpnailSmall  detail={detail[i]}/></Box>
  //     )
  //   }
  // }else{
  //   thumpnail=[]
  //   console.log(detail)
  // }
  return(
    <Con style={{...style}}>
      {/*<Slider {...settings}>
      {thumpnail}
      </Slider>*/}
    </Con>
  )
}
})

export default ColumnThumpnailRow;

