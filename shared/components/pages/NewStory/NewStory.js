import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
	TopBarEditor,
	TopNotification,
	EditorCss,
	EditorCollapse,
	EditorTopRight
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

const TopLeft = styled.div`
	display: inherit;
	align-items: center;
	margin-left: 20px;
`

const TopRight = styled.div`
	display: inherit;
	align-items: center;
	margin-right: 20px;
`

const SavedTime = styled.div`
	font-size: 14px;
	font-weight: normal;
`

class NewStory extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			textNotification: 'Story must have title before publishing.',
			showNotification: false
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	showNotification = millsec => {
		this.setState({ showNotification: true })

		setTimeout(() => {
			this.setState({ showNotification: false })
		}, millsec)
	}

	render() {
		const { theme } = this.context.setting.publisher
		const { onLoading } = this.props
		const { textNotification, showNotification } = this.state

		const topLeft = (
			<TopLeft>
				<SavedTime>
					Saved at 10:30AM
				</SavedTime>
			</TopLeft>
		)

		const topRight = <EditorTopRight />

		return (
			<Wrapper>
				<TopBarEditor left={topLeft} right={topRight} />
				<TopNotification text={textNotification} show={showNotification} />
				<Container>
					<Main onClick={() => this.showNotification(5000)}>
						Title
					</Main>
					<Aside>
						<EditorCollapse theme={theme} />
					</Aside>
				</Container>
			</Wrapper>
		)
	}
}

export default NewStory
