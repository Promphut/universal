import React from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'

const DropdownWrapper = styled.div`
  float: ${props => props.float};
  &:hover{
    cursor: pointer;
  }
`

const DropdownButton = styled.div`
`

const DropdownContent = styled.div`
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  opacity: ${props => (props.open ? '1' : '0')};
  transition: .2s;
  position: absolute;
  margin: ${props => props.margin};
  padding: 0px;
  border: ${props => (props.boxShadow ? null : '2px solid ' + props.theme.primaryColor)};
  background: white;
  z-index: 1;
  max-width: ${props => props.maxWidth};
  box-shadow: ${props => (props.boxShadow ? 'rgba(143, 143, 143, 0.25) 0px 0px 16px' : null)};

	@media (max-width: 991px) {
    margin: ${props => props.marginMobile};
  }
`

class Dropdown extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			open: false
		}
	}

	handleClick = () => {
		if (!this.state.open) {
			this.setState({
				open: true
			})
		} else {
			this.setState({
				open: false
			})
		}
	}

	handleSelect = () => {
		this.setState({
			open: false
		})
	}

	// method from onClickOutside
	handleClickOutside = () => {
		this.setState({
			open: false
		})
	}

	render() {
		const {
			children,
			button,
			margin,
			marginMobile,
			maxWidth,
			float,
			boxShadow
		} = this.props
		const { open } = this.state

		return (
			<DropdownWrapper
				float={float}
				style={{ ...this.props.style }}
				className={this.props.className}
			>
				<DropdownButton onClick={this.handleClick}>
					{button}
				</DropdownButton>
				<DropdownContent
					open={open}
					margin={margin}
					marginMobile={marginMobile}
					maxWidth={maxWidth}
					onClick={this.handleSelect}
					boxShadow={boxShadow}
				>
					{children}
				</DropdownContent>
			</DropdownWrapper>
		)
	}
}

export default onClickOutside(Dropdown)
