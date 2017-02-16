import React, {PropTypes} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router';

const Nav = styled.nav`
	flex: 2 40% !important;
	text-align: center;

	/* tablet, landscape iPad, lo-res laptops ands desktops */
	@media (max-width: 960px) {
		display:none;
	}

	& ul {
		padding: 0;
        list-style: none;
	}
	& ul li {
		display: inline-block;
        position: relative;
        text-align: left;
	}
	& ul li a {
		display: block;
        padding: 0 1.5em;
        text-decoration: none;
        color: #8f8f8f;
	}
	& ul li a:hover {
		background: #e2e2e2;
		color: #222 !important;
		/* text-shadow:0px 0px 1px #222;	instead of bold */
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
		position:relative;
		display: inline-block;
		line-height: 20px;
		width:100%;
	}
	& ul li ul.dropdown li a {
		padding: 1em 2em;
		color: #8f8f8f;
	}
	& ul li:hover ul.dropdown {
		display: block;
	}
	& ul li ul.dropdown li {
		display: block;
	}
`

const TopNavigation = ({onMouseOver, onMouseOut}) => {
	return (
		<Nav id="top-nav" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li>
					<Link to="/">Stories &#9662;</Link>
					<ul className="dropdown">
		                <li><Link to="/">All</Link></li>
		                <li><Link to="/">Saving</Link></li>
		                <li><Link to="/">Fund</Link></li>
		                <li><Link to="/">Stock</Link></li>
		                <li><Link to="/">Money Ideas</Link></li>
		            </ul>
				</li>
				<li><Link to="/">About Us</Link></li>
				<li><Link to="/">Contact</Link></li>
			</ul>
		</Nav>
	)
}


TopNavigation.propTypes = {
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
}

export default TopNavigation;