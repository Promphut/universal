import React from 'react'
import {Link, browserHistory} from 'react-router'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import {Dropdown, SecondaryButton} from 'components'
import auth from 'components/auth'
import api from 'components/api'

const StoryDropdown = React.createClass({
  componentWillMount(){
		let token = browserHistory.getCurrentLocation().query.token || auth.getToken()

		api.getCookieAndToken(token)
		.then(result => {
			auth.setCookieAndToken(result)
			this.menu = result.menu
		})
	},

  render() {
    const {theme} = this.context.setting.publisher
    const nowPage = this.props.nowPage || 'All'

    const menu = this.menu
    let cols = menu && menu.column ? menu.column : []

    let button = []
    for (let i = 0; i < cols.length + 1; i++){
      button.push(
        <div key={i}>
          <Link to={(i == 0) ? '/stories/columns' : '/stories/'+cols[i - 1].slug}>
            <FlatButton
              label={(i == 0) ? 'All' : cols[i - 1].name}
              labelStyle={{fontWeight: 'bold', fontSize: '15px', color: theme.primaryColor, fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
              style={{width: '130px', textAlign: 'left', display: 'inline-block'}}
            />
          </Link><br/>
        </div>
      )
    }

    const buttonLabel = (
      <span>{nowPage}
        <FontIcon className="material-icons" style={{color: theme.primaryColor, float: 'right', padding: '8px 8px 0px 0px', marginLeft: '-8px'}}>
          keyboard_arrow_down
        </FontIcon>
      </span>
    )

    const buttonDropdown = (
      <SecondaryButton
        label={buttonLabel}
        labelStyle={{textTransform:'none'}}
        style={{margin: '15px'}}
      />
    )

    return(
      <Dropdown
        button={buttonDropdown}
        style={{display: 'flex', justifyContent: 'center'}}
        marginMobile='58px 0px 0px 0px'
        className={this.props.className}
      >
        {button}
      </Dropdown>
    )
  }
})

StoryDropdown.contextTypes = {
	setting: React.PropTypes.object
};

export default StoryDropdown
