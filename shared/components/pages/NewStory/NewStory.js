import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
	EditorCss,
	TopBarWithNavigation,
	EditorCollapse
} from '../../../components'

const Wrapper = styled.div`
	width:100%;
`

const Container = styled(EditorCss)`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	width: 1110px;
	margin: 0 auto;
	
	@media(max-width:480px){
		max-width: 100%;
	}
`

const Main = styled.div`
	width: 731px;
	margin-top: 92px;
`

const Aside = styled.div`
	width: 334px;
	margin-left: 37px;
	margin-top: 92px;
`

class NewStory extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	render() {
		let { theme } = this.context.setting.publisher
		let { onLoading } = this.props
		let {} = this.state

		return (
			<Wrapper>
				<TopBarWithNavigation onLoading={onLoading} />
				<Container>
					<Main>
						Title
					</Main>
					<Aside>
						<EditorCollapse />
					</Aside>
				</Container>
			</Wrapper>
		)
	}
}

export default NewStory
