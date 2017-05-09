import React from 'react';
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'

const Container = styled.div`
	width: auto;
  z-index:100;
  position: -webkit-sticky;
  position: sticky;
  top: ${props=> props.topOffset?props.topOffset:0}px;
  bottom: ${props=> props.bottomOffset?props.bottomOffset:0}px;
	margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}px;
`

class Stick extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stick:true,
    }
  }

  render(){
    return (
      <Container
        topOffset={this.props.fixed ? -100 : this.props.topOffset}
        bottomOffset={this.props.bottomOffset}
        style={{...this.props.style}}
        className={this.props.className}
        marginBottom={this.props.marginBottom}
      >
        {this.props.children}
      </Container>
    )
  }
}

export default Stick;
