import React, {Component} from 'react';
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'
const Container = styled.div`
	width: auto;
  z-index:100;
  position:${props=> props.stick?"fixed":"relative"};
` 
const Stick = React.createClass({
  getInitialState(){
    return{
      stick:false
    }
  },

  componentDidMount(){
    
    var paddingTop = this.props.paddingTop || 0
    var paddingBottom = this.props.paddingBottom  || document.body.offsetHeight
    var self = this
    var item = dom(self.refs.stick)
    var oldPos = item.offsetTop
    if(item.getBoundingClientRect()==0){
      this.setState({stick:true})
    }
    if(!this.props.paddingBottom){
      window.addEventListener("scroll", function(event) {
        var offset = item.getBoundingClientRect();
        var top = offset.top
        var scrollY = this.scrollY 
        if(top<15+paddingTop){
          if(scrollY<oldPos){
            item.style.top = (top-paddingTop)+'px'
            self.setState({stick:false})
          }else{
            item.style.top = (0+paddingTop)+'px'
            self.setState({stick:true})
          }
        }
        if(scrollY==0){
          item.style.top = 0+'px'
        }
      })
    }else{
      window.addEventListener("scroll", function(event) {
        var offset = item.getBoundingClientRect();
        var top = offset.top
        var scrollY = this.scrollY 
        if(top<15+paddingTop){
          if(scrollY<oldPos){
            item.style.top = (top-paddingTop)+'px'
            self.setState({stick:false})
          }else if(scrollY >= paddingBottom){
            self.setState({stick:false})
          }else{
            item.style.top = (0+paddingTop)+'px'
            self.setState({stick:true})
          }
        }
        if(scrollY==0){
          item.style.top = 0+'px'
        }
      })
    }
    
  },

  render(){
    var {stick} = this.state
    
    return(
      <Container stick={stick} ref='stick'>
        {this.props.children}
      </Container>
    )
  }
})

export default Stick;