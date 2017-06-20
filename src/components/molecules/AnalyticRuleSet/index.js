import React from 'react'
import styled from 'styled-components'

import AnalyticRule from '../AnalyticRule'

const RuleSetContainer = styled.div `
  margin-top: 20px;
`

export default class AnalyticRuleSet extends React.Component {
  render() {

    const rules = Object.key(this.props.rules).map((key) => {
      return (
        <AnalyticRule status={this.props.rules[key].status} text={this.props.rules[key].text} />
      )
    })

    return (
      <RuleSetContainer>
        {rules}
      </RuleSetContainer>
    )
  }
}
