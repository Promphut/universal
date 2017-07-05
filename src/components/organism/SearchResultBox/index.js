import React from 'react'
import styled from 'styled-components'

import isEmpty from 'lodash/isEmpty'

import {ArticleBox, NewsBox} from 'components'

export default class SearchResultBox extends React.Component  {
  render() {
    let resultFeed = [];

    if (!isEmpty(this.props.result))
      resultFeed = []
      let i = 0

      if (this.props.type === 'news') {
        for (let item in this.props.result)
        {
          if (this.props.result.length > 0)
            resultFeed.push(<NewsBox detail={item} timeline={false} key={++i}/>)
        }
      }
      else {
        for (let item in this.props.result)
        {
          if (this.props.result.length > 0)
          resultFeed.push(<ArticleBox detail={item} key={++i}/>)
        }
      }

      // console.log(this.props.result)

    return (
      <div>{resultFeed}</div>
    )
  }
}
