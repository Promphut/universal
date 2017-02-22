import React from 'react'
import { TopBarWithNavigation, OverlayImg, ColumnSetting} from 'components'

import styled from 'styled-components'

const Container = styled.div`
  width:100%;
`


const ColumnSettingPage = React.createClass({
	getInitialState(){
		return {}
	},

  render(){
		return (
      <Container>
        <ColumnSetting/>
      </Container>
		  )
	}
});

export default ColumnSettingPage