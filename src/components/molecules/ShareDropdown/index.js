import React from 'react'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import {Dropdown,TwtShareButton, FbShareButton} from 'components'
import CopyToClipboard from 'react-copy-to-clipboard'
import api from 'components/api' 

const Hover = styled.div`
`

const ShareDropdown = React.createClass({
  getInitialState () {
    return {
      open: false,
      //copied: false,
      hover: -1
    }
  },

  onHover(selected) {
    this.setState({
      hover: selected
    })
  },

  onNotHover() {
    this.setState({
      hover: -1
    })
  },

  onStoryCopied(val){
    //console.log('onStoryCopied', val)
    // get sid
    val = getTrailingSid(val)
    //this.setState({copied: true})
    if(val!=null) api.incStoryInsight(val, 'share', 'share_dark')
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
    buttons.push(<span><i className="fa fa-facebook" aria-hidden="true" style={buttonStyle}></i>Share on Facebook</span>)
    buttons.push(<span><i className="fa fa-twitter" aria-hidden="true" style={buttonStyle}></i>Share on Twitter</span>)
    buttons.push(<span><FontIcon className="material-icons" style={buttonStyle}>link</FontIcon>Copy Link</span>)

    // for (let i = 0; i < buttons.length; i++){
      // button.push(
      //   <div key={i}>
      //     <FlatButton
      //       label={buttons[i]}
      //       labelStyle={{fontWeight: 'bold', fontSize: '15px', color: theme.primaryColor, fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
      //       style={{width: '130px', textAlign: 'left', display: 'inline-block'}}
      //       onTouchTap={() => this.select(i)}
      //       data-clipboard-text
      //     /><br/>
      //   </div>
      // )
    // }

    const button = (
      <div onMouseLeave={this.onNotHover}>
        <Hover onMouseEnter={() => this.onHover(0)}>
          <FbShareButton url={config.FRONTURL+this.props.url} button={
            <FlatButton
              label={buttons[0]}
              labelStyle={{fontWeight: 'bold', fontSize: '15px', color: theme.primaryColor, fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
              style={{width: '180px', textAlign: 'left', display: 'inline-block'}}
            />
          } />
          {/*<FlatButton
              label={buttons[0]}
              labelStyle={{fontWeight: 'bold', fontSize: '15px', color: theme.primaryColor, fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
              style={{width: '180px', textAlign: 'left', display: 'inline-block'}}
              onTouchTap={() => this.select('facebook')}
            />*/}
        </Hover>
        <Hover onMouseEnter={() => this.onHover(1)}>
          <TwtShareButton url={config.FRONTURL+this.props.url} button={
            <FlatButton
              label={buttons[1]}
              labelStyle={{fontWeight: 'bold', fontSize: '15px', color: theme.primaryColor, fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
              style={{width: '180px', textAlign: 'left', display: 'inline-block'}}
            />
          } />
        </Hover>
        <Hover onMouseEnter={() => this.onHover(2)}>
          <CopyToClipboard text={config.FRONTURL+this.props.url} onCopy={this.onStoryCopied}>
            <FlatButton
              label={buttons[2]}
              labelStyle={{fontWeight: 'bold', fontSize: '15px', color: theme.primaryColor, fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
              style={{width: '180px', textAlign: 'left', display: 'inline-block'}}
            />
          </CopyToClipboard>
        </Hover>
      </div>
    )

    const buttonDropdown = (
      <FontIcon className="material-icons" style={{color:'#8f8f8f'}}>
        keyboard_arrow_down
      </FontIcon>
    )

    return(
      <Dropdown button={buttonDropdown} float='right' marginMobile='0px 0px 0px -160px'>
        {button}
      </Dropdown>
    )
  }
})

ShareDropdown.contextTypes = {
	setting: React.PropTypes.object
};

export default ShareDropdown
