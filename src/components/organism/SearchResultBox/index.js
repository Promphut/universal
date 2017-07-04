import React from 'react'
import styled from 'styled-components'

export default class SearchResultBox extends React.Component  {
  render() {
    // console.log(this.props.result)
    return (
      <div>{this.props.type}</div>
    )
  }
}
