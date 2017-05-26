import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PrimaryButton, SecondaryButton } from 'components'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import { Link } from 'react-router-dom'
import auth from 'components/auth'
import { withRouter } from 'react-router'

const Wrapper = styled.div`
  .open {
    transform: rotate(180deg);
    transition-duration: 1s;
  }
`

let styles = {
	list: {
		color: 'white'
	},

	listItem: {
		padding: '16px 20px',
		color: 'white',
		fontFamily: "'Nunito', 'Mitr', sans-serif",
		fontWeight: 'bold'
	},

	listNestedItem: {
		padding: '5px 20px',
		color: 'white',
		fontFamily: "'Nunito', 'Mitr', sans-serif",
		fontWeight: 'bold'
	}
}

const SelectableList = makeSelectable(List)

class PublisherSettingMenu extends React.Component {
	static contextTypes = {
		setting: PropTypes.object
	}
	constructor(props) {
		super(props)

		this.state = {
			selectedIndex: props.pathname,
			openInsights: true,
			openManage: false,
			openSettings: false
		}
	}

	changePath = path => {
		this.props.history.push(path)
	}

	toggleNestedInsights = path => {
		this.setState({
			openInsights: true,
			openManage: false,
			openSettings: false
		})
		this.changePath(path)
	}

	toggleNestedColumns = path => {
		this.setState({
			openInsights: false,
			openManage: true,
			openSettings: false
		})
		this.changePath(path)
	}

	toggleNestedSettings = path => {
		this.setState({
			openInsights: false,
			openManage: false,
			openSettings: true
		})
		this.changePath(path)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.pathname != this.props.pathname) {
			this.setState({
				selectedIndex: nextProps.pathname
			})
		}
	}

	componentDidMount() {
		this.setState({ selectedIndex: this.props.pathname })
	}

	componentWillMount() {
		this.isAdmin = auth.hasRoles(['ADMIN'])
	}

	render() {
		//console.log(this.props.pathname.split('/'))
		let { theme } = this.context.setting.publisher
		let { selectedIndex, openInsights, openManage, openSettings } = this.state

		return (
			<Wrapper>
				<SelectableList style={{ padding: 0 }}>
					<ListItem
						style={{
							...styles.listItem,
							backgroundColor: (selectedIndex == '/editor/' &&
								theme.accentColor) ||
								(this.props.pathname == '/editor/stories' &&
									theme.accentColor) ||
								(this.props.pathname == '/editor/columns' &&
									theme.accentColor) ||
								(this.props.pathname == '/editor/writers' && theme.accentColor)
						}}
						onClick={() => this.toggleNestedInsights('/editor/')}
						value={
							(this.props.pathname == '/editor/' && this.props.pathname) ||
								(this.props.pathname == '/editor/stories' &&
									this.props.pathname) ||
								(this.props.pathname == '/editor/columns' &&
									this.props.pathname) ||
								(this.props.pathname == '/editor/writers' &&
									this.props.pathname)
						}
						primaryTogglesNestedList={true}
						className="nunito-font"
						primaryText="Insights"
						open={openInsights}
						rightIcon={
							<FontIcon
								className={'material-icons ' + (openInsights ? 'open' : '')}
								style={{ color: 'white' }}>
								keyboard_arrow_up
							</FontIcon>
						}
						nestedItems={[
							<ListItem
								onClick={() => this.changePath('/editor/')}
								value="/editor/"
								style={{
									...styles.listNestedItem,
									color: selectedIndex == '/editor/'
										? theme.accentColor
										: 'white'
								}}
								primaryText="Overview"
							/>,
							<ListItem
								onClick={() => this.changePath('/editor/stories')}
								value="/editor/stories"
								style={{
									...styles.listNestedItem,
									color: selectedIndex == '/editor/stories'
										? theme.accentColor
										: 'white'
								}}
								primaryText="Stories"
							/>,
							<ListItem
								onClick={() => this.changePath('/editor/columns')}
								value="/editor/columns"
								style={{
									...styles.listNestedItem,
									color: selectedIndex == '/editor/columns'
										? theme.accentColor
										: 'white'
								}}
								primaryText="Columns"
							/>,
							<ListItem
								onClick={() => this.changePath('/editor/writers')}
								value="/editor/writers"
								style={{
									...styles.listNestedItem,
									color: selectedIndex == '/editor/writers'
										? theme.accentColor
										: 'white'
								}}
								primaryText="Writers"
							/>
						]}
						nestedListStyle={{
							background: 'rgba(255,255,255,0.2)',
							padding: '0px'
						}}
					/>

					<ListItem
						style={{
							...styles.listItem,
							backgroundColor: (selectedIndex == '/editor/manage/news' &&
								theme.accentColor) ||
								(this.props.pathname == '/editor/manage/news' &&
									theme.accentColor) ||
								(this.props.pathname == '/editor/manage/stories' &&
									theme.accentColor)
						}}
						onClick={() => this.toggleNestedColumns('/editor/manage/news')}
						value={
							(this.props.pathname == '/editor/manage/news' &&
								this.props.pathname) ||
								(this.props.pathname == '/editor/manage/news' &&
									this.props.pathname) ||
								(this.props.pathname == '/editor/manage/stories' &&
									this.props.pathname)
						}
						primaryTogglesNestedList={true}
						className="nunito-font"
						primaryText="Manage"
						open={openManage}
						rightIcon={
							<FontIcon
								className={'material-icons ' + (openManage ? 'open' : '')}
								style={{ color: 'white' }}>
								keyboard_arrow_up
							</FontIcon>
						}
						nestedItems={[
							<ListItem
								onClick={() => this.changePath('/editor/manage/news')}
								value="/editor/manage/news"
								style={{
									...styles.listNestedItem,
									color: selectedIndex == '/editor/manage/news'
										? theme.accentColor
										: 'white'
								}}
								primaryText="News"
							/>,
							<ListItem
								onClick={() => this.changePath('/editor/manage/stories')}
								value="/editor/manage/column"
								style={{
									...styles.listNestedItem,
									color: selectedIndex == '/editor/manage/stories'
										? theme.accentColor
										: 'white'
								}}
								primaryText="Stories"
							/>
						]}
						nestedListStyle={{
							background: 'rgba(255,255,255,0.2)',
							padding: '0px'
						}}
					/>

					{this.isAdmin &&
						<ListItem
							style={{
								...styles.listItem,
								backgroundColor: (selectedIndex == '/editor/settings/' &&
									theme.accentColor) ||
									(this.props.pathname == '/editor/settings/stories' &&
										theme.accentColor) ||
									(this.props.pathname == '/editor/settings/contact' &&
										theme.accentColor)
							}}
							onClick={() => this.toggleNestedSettings('/editor/settings/')}
							value={
								(this.props.pathname == '/editor/settings/' &&
									this.props.pathname) ||
									(this.props.pathname == '/editor/settings/columns' &&
										this.props.pathname) ||
									(this.props.pathname == '/editor/settings/contact' &&
										this.props.pathname)
							}
							primaryTogglesNestedList={true}
							className="nunito-font"
							primaryText="Settings"
							open={openSettings}
							rightIcon={
								<FontIcon
									className={'material-icons ' + (openSettings ? 'open' : '')}
									style={{ color: 'white' }}>
									keyboard_arrow_up
								</FontIcon>
							}
							nestedItems={[
								<ListItem
									onClick={() => this.changePath('/editor/settings/')}
									value="/editor/settings"
									style={{
										...styles.listNestedItem,
										color: selectedIndex == '/editor/settings/'
											? theme.accentColor
											: 'white'
									}}
									primaryText="Profile & Theme"
								/>,
								<ListItem
									onClick={() => this.changePath('/editor/settings/columns')}
									value="/editor/settings/columns"
									style={{
										...styles.listNestedItem,
										color: selectedIndex == '/editor/settings/columns'
											? theme.accentColor
											: 'white'
									}}
									primaryText="Column"
								/>,
								<ListItem
									onClick={() => this.changePath('/editor/settings/contact')}
									value="/editor/settings/contact"
									style={{
										...styles.listNestedItem,
										color: selectedIndex == '/editor/settings/contact'
											? theme.accentColor
											: 'white'
									}}
									primaryText="Contact & About"
								/>
							]}
							nestedListStyle={{
								background: 'rgba(255,255,255,0.2)',
								padding: '0px'
							}}
						/>}
				</SelectableList>
			</Wrapper>
		)
	}
}

export default withRouter(PublisherSettingMenu)
