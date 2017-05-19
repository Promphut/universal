import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

const Container = styled.div`
	display:flex;
	.active{
		font-weight:bold;
		color:${props => props.theme.accentColor};
	}
`
const NavLink = styled(Link)`
	padding: 18px 20px 20px 20px;
	font-size:17px;
	text-decoration: none;
	color: ${props => (props.theme.barTone == 'light' ? '#222' : '#FFF')};
	height:60px;
	cursor: pointer;
	&:hover{
		font-weight:bold;
		color:${props => props.theme.accentColor};
	}
`

const TopNavigation = ({ menu }) => {
	let cols = menu && menu.column ? menu.column : []

	let items = []
	for (let i = 0; i < cols.length; i++) {
		items.push(
			<li key={i}>
				<Link to={'/stories/' + cols[i].slug} activeClassName="active">
					{cols[i].name}
				</Link>
			</li>
		)
	}

	return (
		<Container>
			<NavLink to="/stories/news" activeClassName="active" className='nunito-font'>News</NavLink>
			<NavLink to="/stories/columns" activeClassName="active" className='nunito-font'>Stories ▾</NavLink>
			<NavLink to="/about" activeClassName="active" className='nunito-font'>About Us</NavLink>
			<NavLink to="/contact" activeClassName="active" className='nunito-font'>Contact</NavLink>
		</Container>			
	)
}

TopNavigation.propTypes = {
	menu: PropTypes.object
}

export default TopNavigation