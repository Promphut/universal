import React, {PropTypes} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router'

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
		top:-2px;
		display: block;
		padding: 18px 20px 20px 20px;
    text-decoration: none;
    color: ${props => props.theme.barTone=='light'?'#222':'#FFF'};
		height:61px;
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
		color: ${props => props.theme.barTone=='light'?'#222':'#FFF'};
	}

	& ul li:hover ul.dropdown {
		padding-left: 0px;
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
				<Link to={'/stories/'+cols[i].slug} activeClassName='active' >{cols[i].name}</Link>
			</li>
		)
	}
	//console.log(window.location.pathname.split("/")[1]=='stories')
	return (
		<Nav>
			<ul>
				<li><Link to="/" activeClassName='active' onlyActiveOnIndex={true}>Home</Link></li>
				<li>
					<Link style={{cursor: 'pointer'}} style={{top:'0px'}} className={window.location.pathname.split("/")[1]=='stories'?'active':''} activeClassName='active'>Stories &#9662;</Link>
						<ul className="dropdown">
							{items}
							<li key={999}><Link to={'/stories/columns'} activeClassName='active' >All Columns</Link></li>
						</ul>
				</li>
				<li><Link to="/about" activeClassName='active'>About Us</Link></li>
				<li><Link to="/contact" activeClassName='active'>Contact</Link></li>
			</ul>
		</Nav>
	)
}

TopNavigation.propTypes = {
	menu: PropTypes.object
}

export default TopNavigation;
