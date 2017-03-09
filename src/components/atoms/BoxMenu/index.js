import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  height:60px;
  min-width:60px;
	display:flex;
  padding:0 !important;
`

const BoxMenu = React.createClass({
  getInitialState(){
    return{
    
    }
  },
  render(){
    var {style,className,children} = this.props
    return(
      <Box style={{...style}} className={className}>
        {this.props.children}
      </Box>
    )
  }
})

export default BoxMenu