import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import {Dropdown,TwtShareButton} from 'components'
import CopyToClipboard from 'react-copy-to-clipboard'
import config from '../../../config'
import { withRouter } from 'react-router'

class ShareDropdownTop extends React.Component {
  static contextTypes = {
    setting: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      copied: false
    }
  }

  render() {
    let {theme} = this.context.setting.publisher

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
        <TwtShareButton button={
          <FlatButton
            label={buttons[0]}
            labelStyle={{fontWeight: 'bold', fontSize: '15px', color: theme.primaryColor, fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
            style={{width: '140px', textAlign: 'left', display: 'inline-block'}}
          />
        } />

        <CopyToClipboard text={config.FRONTURL + this.props.location} onCopy={() => this.setState({copied: true})}>
          <FlatButton
            label={buttons[1]}
            labelStyle={{fontWeight: 'bold', fontSize: '15px', color: theme.primaryColor, fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
            style={{width: '140px', textAlign: 'left', display: 'inline-block'}}
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
}

export default withRouter(ShareDropdownTop)