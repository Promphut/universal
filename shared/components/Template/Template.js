import React from 'react'
import styled from 'styled-components'

import TopBarWithNavigation from '../organism/TopBarWithNavigation'
import Footer from '../atoms/Footer'
// Main Controller Style Goes Here!
const Wrapper = styled.div `
  margin: 0;
  padding: 0;
`

export default class Template extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    let { ChildComponent } = this.props

    return (
      <Wrapper>
        <TopBarWithNavigation/>
        {ChildComponent}
        <Footer/>
      </Wrapper>
    )
  }
}
