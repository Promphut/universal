import React from 'react'
import styled from 'styled-components'

import {AnalyticRuleSet} from 'components'
import utils from '../../../services/utils'

const AnalyticMainContainer = styled.div `
  margin-top:20px;
`

const RuleText = [
    'Adding at least 1 image in the content.',
    'The keyword density must be more than 2%.',
    'The text must contain more than 1,500 characters.',
    'Consider using unused focus word.',
    'Adding at least 1 link in the content.',
    'The focus word should appear in the title.'
]

// Rule => (status,text)

//Props => content, focusWord, HTML

export default class AnalyticContainer extends React.Component {

   constructor(props) {
		   super(props)
       this.state = {
         ruleSet: []
       }
  }

   calculateRule () {
    //  Rules Calculation Goes Here!
      var rules = [
        { status: this.atLeastImgTag(this.props.html), text: RuleText[0]},
        { status: this.focusWordDensityChecker(this.props.html, this.props.focusWord), text: RuleText[1]},
        { status: this.numberOfWordsChecker(this.props.html), text: RuleText[2]},
        { status: this.focusWordAvailablityChecker(this.props.focusWord), text: RuleText[3]},
        { status: this.linkTagChecker(this.props.html), text: RuleText[4]},
        { status: this.titleFocusWordChecker(this.props.title,this.props.focusWord), text: RuleText[5]},
      ]

      rules.sort(function(a, b){return a.status-b.status})

      this.setState({
          ruleSet: rules
        })

   }

   // Rule 1 : Check for Img Tag in the post return the score (0: no img , 1: has img)
   atLeastImgTag (html)
   {
     return utils.analyticsHasImg(html)? 2 : 0
   }

   // Rule 2 : Check for focus word density at least 2% return the score (0: < 1%, 1 >2%, 2 > 1%)
   focusWordDensityChecker (content, focusWord)
   {
      var density = utils.analyticsDensityFocusWord(focusWord,content)

      if (density < 1) return 0
      else if (density >= 1 && density < 2) return 1
      return 2
   }

   // Rule 3 : Check for number of char must greater than 1500 return the score (0: < 1000, 1 >= 1500, 2 > 1000)
   numberOfWordsChecker (content)
   {
     var noOfWord = utils.analyticsCharCount(content)

     if (noOfWord < 1000) return 0
     else if (noOfWord >= 1000 && noOfWord < 1500) return 1
     return 2
   }

   //Rule 4 Used focus word return the score (0 : used focusWord , 1 : focusWord is available)
   focusWordAvailablityChecker (focusWord)
   {
     return utils.analyticsisFocusWordIsAvailable(focusWord) ? 2 : 0
   }

   //Rule 5 Is Link Tag is in the article return the score (0 : has no link, 1 : has link)
   linkTagChecker (html)
   {
     return utils.analyticsHasLink(html) ? 2 : 0
   }

   //Rule 6 Focus Title return is focus word is in the title return the score (0 : has no focusWord, 1 : has focusWord in Title)
   titleFocusWordChecker (title, focusWord)
   {
     return utils.analyticsHasFocusWordInTitle(title, focusWord) ? 2 : 0
   }

   componentDidMount () {
     this.calculateRule()
   }

   componentWillReceiveProps (nextProps) {
      this.calculateRule()
   }

    render () {
      return (
        <AnalyticMainContainer>
          <h4>Analytics</h4>
          <AnalyticRuleSet rules = {this.state.ruleSet} />
        </AnalyticMainContainer>
      )
    }
	}
