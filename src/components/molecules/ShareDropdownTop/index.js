import React from 'react'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import {Dropdown} from 'components'
import CopyToClipboard from 'react-copy-to-clipboard'
import api from 'components/api'
const ShareDropdownTop = React.createClass({
  getInitialState () {
    return {
      open: false,
      copied: false
    }
  },

  select(shareTo) {
    if (shareTo === 'facebook') {
      api.shareFB()
    } else if (shareTo === 'twitter') {
      console.log('Twitter share')
    } else {
      console.log('Copied')
    }
  },

  render() {
    var {theme} = this.context.setting.publisher

    const buttonStyle = {
      color: theme.primaryColor,
      fontSize: '18px',
      float: 'left',
      marginTop: '10px',
      paddingLeft: '10px',
      width: '28px'
    }
    let buttons = []
    buttons.push(<span><i className="fa fa-twitter" aria-hidden="true" style={buttonStyle}></i>Twitter</span>)
    buttons.push(<span><FontIcon className="material-icons" style={buttonStyle}>link</FontIcon>Copy Link</span>)

    const button = (
      <div>
        <a href={config.TWT}>
        <FlatButton
          label={buttons[0]}
          labelStyle={{fontWeight: 'bold', fontSize: '15px', color: theme.primaryColor, fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
          style={{width: '140px', textAlign: 'left', display: 'inline-block'}}
          onTouchTap={() => this.select('twitter')}
        />
        </a>
        <CopyToClipboard text={window.location.href} onCopy={() => this.setState({copied: true})}>
          <FlatButton
            label={buttons[1]}
            labelStyle={{fontWeight: 'bold', fontSize: '15px', color: theme.primaryColor, fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
            style={{width: '140px', textAlign: 'left', display: 'inline-block'}}
            onTouchTap={() => this.select('copy')}
          />
        </CopyToClipboard>
      </div>
    )

    return(
      <Dropdown
        button={this.props.children}
        float='right'
        marginMobile='0px 0px 0px -100px'
        maxWidth='140px'
      >
        {button}
      </Dropdown>
    )
  }
})

ShareDropdownTop.contextTypes = {
	setting: React.PropTypes.object
};

export default ShareDropdownTop
