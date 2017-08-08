import React from 'react'
import styled from 'styled-components'

import { TopBarWithNavigation,Footer } from 'components'
// Main Controller Style Goes Here!
const Wrapper = styled.div `
`

export default class Template extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    let { children } = this.props

    return (
      <Wrapper>
        <TopBarWithNavigation/>
        {children}
        <Footer/>
      </Wrapper>
    )
  }
}
