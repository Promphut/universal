import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Container = styled.div`
	display:flex;
	.active{
		font-weight:bold;
		color:${props => props.theme.accentColor};
	}
`

const NavSpan = styled.span`
	padding: 18px 20px 20px 20px;
	font-size:17px;
	color: ${props => (props.theme.barTone == 'light' ? '#222' : '#FFF')};
	height:60px;
	cursor: pointer;
	transition: .2s;
	&:hover{
		font-weight:bold;
		color:${props => props.theme.accentColor};
		>div{
			display:block;
		}
	}
`
const NavLink2 = styled(NavLink)`
	padding: 18px 20px 20px 20px;
	font-size:17px;
	text-decoration: none;
	color: ${props => (props.theme.barTone == 'light' ? '#222' : '#FFF')};
	height:60px;
	cursor: pointer;
	transition: .2s;
	&:hover{
		font-weight:bold;
		color:${props => props.theme.accentColor};
		>div{
			display:block;
		}
	}
`
const DropdownBox = styled.div`
		min-width: 230px;
    display: none;
    position: absolute;
    z-index: 3;
    top: 60px;
		background-color:#E5E5E5;
		padding:18px 28px 18px 28px;
`
const DropdownList = styled(NavLink)`
		background-color:#E5E5E5;
		width: 100%;
		padding: 10px 0 10px 0;
		color: #222;
		transition: .2s;
		display:block;&:hover{
			color:${props => props.theme.accentColor};
		}
`
const Line = styled.div`
	background-color:#C4C4C4;
	height:1px;
	width:100%;
	margin:10px 0 10px 0;
`

const TopNavigation = ({ menu }) => {
	let cols = menu && menu.column ? menu.column : []

	let items = []
	for (let i = 0; i < cols.length; i++) {
		items.push(
			<DropdownList
				key={i}
				exact
				to={'/stories/' + cols[i].slug}
				activeClassName="active"
				className="nunito-font">
				{cols[i].name}
			</DropdownList>
		)
	}

	return (
		<Container>
			<NavLink2
				exact
				to="/stories/news"
				activeClassName="active"
				className="nunito-font">
				News
			</NavLink2>
			<NavSpan className="nunito-font">
				Stories ▾
				<DropdownBox>
					{items}
					<Line />
					<DropdownList
						to={'/stories/columns'}
						activeClassName="active"
						className="nunito-font">
						All Columns
					</DropdownList>
				</DropdownBox>
			</NavSpan>
			<NavLink2
				exact
				to="/about"
				activeClassName="active"
				className="nunito-font">
				About Us
			</NavLink2>
			<NavLink2
				exact
				to="/contact"
				activeClassName="active"
				className="nunito-font">
				Contact
			</NavLink2>
		</Container>
	)
}

TopNavigation.propTypes = {
	menu: PropTypes.object
}

export default TopNavigation
