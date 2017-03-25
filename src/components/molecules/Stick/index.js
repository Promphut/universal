import React, {Component} from 'react';
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'
const Container = styled.div`
	width: auto;
  z-index:100;
  position: -webkit-sticky;
  position: sticky;
  top:${props=> props.topOffset?props.topOffset:0}px;
  bottom:${props=> props.bottomOffset?props.bottomOffset:0}px;
`
const Stick = React.createClass({
  getInitialState(){
    return{
      stick:true,
    }
  },

  componentDidMount(){
    // this.slider()
  },

  // slider(){
  //   // var paddingTop = this.props.paddingTop || 0
  //   // var self = this
  //   // var item = dom(self.refs.stick)
  //   // var WH = window.innerHeight
  //   // var oldPos = item.getBoundingClientRect().top

  //   // if(!this.state.paddingBottom){
  //   //     window.addEventListener("scroll", function(event) {
  //   //         var offset = item.getBoundingClientRect();
  //   //         var top = offset.top
  //   //         var scrollY = this.scrollY
  //   //         if(top<(15+paddingTop)){
  //   //           if(scrollY<oldPos){
  //   //             item.style.top = (top-paddingTop)+'px'
  //   //             self.setState({stick:false})
  //   //           }else{
  //   //             item.style.top = (0+paddingTop)+'px'
  //   //             self.setState({stick:true})
  //   //           }
  //   //         }
  //   //         if(scrollY==0){
  //   //           item.style.top = 0+'px'
  //   //         }
  //   //     })
  //   // }else{
  //   //     window.addEventListener("scroll", function(event) {
  //   //         var paddingBottom = self.state.paddingBottom-oldPos
  //   //         //console.log(paddingBottom)
  //   //         var offset = item.getBoundingClientRect();
  //   //         var top = offset.top
  //   //         var scrollY = this.scrollY
  //   //         if(top<(15+paddingTop)){
  //   //           if(scrollY<oldPos){
  //   //             item.style.top = (top-paddingTop)+'px'
  //   //             self.setState({stick:false})
  //   //           }else if(scrollY >= paddingBottom){
  //   //             self.setState({stick:false})
  //   //             item.style.top = (scrollY-WH+top)+'px'
  //   //           }else{
  //   //             item.style.top = (0+paddingTop)+'px'
  //   //             self.setState({stick:true})
  //   //           }
  //   //         }
  //   //         if(scrollY<=oldPos){
  //   //           item.style.top = 0+'px'
  //   //         }
  //   //     })
  //   // }
  // },

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.paddingBottom!=this.props.paddingBottom){
  //     this.setState({paddingBottom:nextProps.paddingBottom},()=>{
  //     })
  //   }
  // },

  render(){
    return(
      <Container topOffset={this.props.topOffset} bottomOffset={this.props.bottomOffset} style={{...this.props.style}}>
        {this.props.children}
      </Container>
    )
  }
})

export default Stick;
