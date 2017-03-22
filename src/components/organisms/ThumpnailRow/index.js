import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {Thumpnail,ThumpnailSmall} from 'components'
import Slider from 'react-slick'

const Container = styled.div`
  width:100%;
  @media (max-width:480px) {
    width:100%;

  }
`

const Box = styled.div`
  flex:1;
`

const ThumpnailRow = React.createClass({
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

  render(){
    var {size,style} = this.props
    var {detail} = this.state
    var thumpnail = []
    var No = size=='small'?5:4
    var settings = {
      centerMode: false,
      slidesToShow: No,
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

    if(detail.length!=0){
      for(let i=0;i<9;i++){
        thumpnail.push(
          size=='small'?<Box key={i}><ThumpnailSmall detail={detail[i]} /></Box>:<Box key={i}><Thumpnail detail={detail[i]}/></Box>
        )
      }
    } else {
      thumpnail=[]
      console.log(detail)
    }

    return (
      <Container style={{...style}}>
        <Slider {...settings}>
        {thumpnail}
        </Slider>
      </Container>
    )
  }
})

    


export default ThumpnailRow;