import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

const Nav = styled.nav`
	ul {
		margin: 0px;
		list-style: none;
	}

	.active{
		background:${props => props.theme.secondaryColor};
		color:#ffffff;
	}

	& ul li {
		display: inline-block;
    position: relative;
    text-align: left;
	}

	& ul li a {
		position: relative;
		top:-1px;
		display: block;
		padding: 18px 20px 20px 20px;
    text-decoration: none;
    color: ${props => (props.theme.barTone == 'light' ? '#222' : '#FFF')};
		height:60px;
		cursor: pointer;
	}

	& ul li a:hover {
		background: ${props => props.theme.secondaryColor} !important;
		color: ${props => (props.theme.barTone == 'light' ? '#222' : '#FFF')};
	}

	& ul li ul.dropdown {
		min-width: 230px;
    background: #F4F4F4;
    display: none;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 60px;
	}

	& ul li ul.dropdown li {
		position: relative;
		top:2px;
		display: inline-block;
		line-height: 20px;
		width: 100%;
	}

	& ul li ul.dropdown li a {
		padding: 1.3em 2em;
		color: #222;
	}

	& ul li ul.dropdown li a:hover {
		color: ${props => (props.theme.barTone == 'light' ? '#222' : '#FFF')};
	}


	& ul li ul.dropdown .active {
		background:#F4F4F4;
		color: #222;
	}

	& ul li:hover ul.dropdown {
		padding-left: 0px;
		display: block;
	}

	& ul li ul.dropdown li {
		display: block;
	}
`

const TopNavigation = ({ menu, location }) => {
	let cols = menu && menu.column ? menu.column : []

	// Menu items from menu props
	let items = []
	for (let i = 0; i < cols.length; i++) {
		items.push(
			<li key={i}>
				<NavLink to={'/stories/' + cols[i].slug} activeClassName="active">
					{cols[i].name}
				</NavLink>
			</li>
		)
	}
	return (
		<Nav>
			<ul>
				<li>
					<NavLink to="/" activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to={'/stories/columns'}
						style={{ cursor: 'pointer', top: '0px' }}
						className={
							location.pathname.split('/')[1] == 'stories'
								? 'active'
								: ''
						}
						activeClassName="active"
					>
						Stories ▾
					</NavLink>
					<ul className="dropdown">
						{items}
						<li key={999}>
							<NavLink to={'/stories/columns'} activeClassName="active">
								All Columns
							</NavLink>
						</li>
					</ul>
				</li>
				<li><NavLink to="/about" activeClassName="active">About Us</NavLink></li>
				<li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
			</ul>
		</Nav>
	)
}

TopNavigation.propTypes = {
	menu: PropTypes.object
}

export default withRouter(TopNavigation)