import React from 'react'
import styled from 'styled-components'

import isEmpty from 'lodash/isEmpty'

import {ArticleBox, NewsBox} from 'components'

export default class SearchResultBox extends React.Component  {
  render() {
    var resultFeed = [];

    if (!isEmpty(this.props.result)){
      resultFeed = []

      if (this.props.type === 'news') {
        for (var i = 0 ; i < this.props.result.length ; i++)
        {
            resultFeed.push(<NewsBox detail={this.props.result[i]} timeline={false} key={i}/>)
        }
      }
      else {
        for (var i = 0 ; i < this.props.result.length ; i++)
        { 
            resultFeed.push(<ArticleBox detail={this.props.result[i]} key={i}/>)
        }
      }
    }

      // console.log(this.props.result)
    return (
      <div>
        {resultFeed}
      </div>
    )
  }
}
