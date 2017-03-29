import React, {PropTypes} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router'

const Nav = styled.nav`
	ul {
		margin: 0px;
		list-style: none;
	}

	& ul li {
		display: inline-block;
    position: relative;
    text-align: left;
	}

	& ul li a {
		display: block;
		padding: 19px 20px 18px;
    text-decoration: none;
    color: ${props => props.theme.barTone=='light'?'#222':'#FFF'};
	}

	& ul li a:hover {
		background: ${props => props.theme.secondaryColor};
		color: ${props => props.theme.barTone=='light'?'#222':'#FFF'};
	}

	& ul li ul.dropdown {
		min-width: 230px;
    background: #f4f4f4;
    display: none;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 59px;
	}

	& ul li ul.dropdown li {
		position: relative;
		display: inline-block;
		line-height: 20px;
		width: 100%;
	}

	& ul li ul.dropdown li a {
		padding: 1em 2em;
		color: #222;
	}

	& ul li ul.dropdown li a:hover {
		color: ${props => props.theme.barTone=='light'?'#222':'#FFF'};
	}

	& ul li:hover ul.dropdown {
		paddingLeft: 0px;
		display: block;
	}

	& ul li ul.dropdown li {
		display: block;
	}
`

const TopNavigation = ({menu}) => {
	let cols = menu && menu.column ? menu.column : []

  // Menu items from menu props
  let items = []
  for (let i=0; i < cols.length; i++) {
    items.push(
			<li key={i}>
				<Link to={'/stories/'+cols[i].slug}>{cols[i].name}</Link>
			</li>
		)
	}

	return (
		<Nav>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li>
					<Link style={{cursor: 'pointer'}}>Stories &#9662;</Link>
						<ul className="dropdown">
							{items}
							<li key={999}><Link to={'/stories/columns'}>All Columns</Link></li>
						</ul>
				</li>
				<li><Link to="/about">About Us</Link></li>
				<li><Link to="/contact">Contact</Link></li>
			</ul>
		</Nav>
	)
}

TopNavigation.propTypes = {
	menu: PropTypes.object
}

export default TopNavigation;
