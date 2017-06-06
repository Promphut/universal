import React from 'react'
import styled, { keyframes } from 'styled-components'
import { BGImg, ShareDropdown } from 'components'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import moment from 'moment'
import truncate from 'lodash/truncate'

const Container = styled.div`
  width:100%;
  z-index:100;
  overflow:hidden;
  height:141px;
  border-top:1px solid #000;
  border-right:1px solid #000;
  border-left:1px solid #000;
  .showText{
    padding:45px 40px;
  }
  .imgWidth{
    width:100%;
    height:141px;
  }
  .hideText{
    position:relative;
    top:-141px;
    width:87%;
    margin:0 0 0 13%;
  }
  &:hover{
    cursor:pointer;

    .hideText{
      z-index:-10;
    }
  }
`
const BG = styled(BGImg)`
  width:100%;
  animation: ${props => (props.hover ? slideOut : slideIn)} ${props => (props.hover ? 0.4 : 0.2)}s forwards;
`
const BoxText = styled.div`
  width:100%;
  color:${props => (props.hover ? props.theme.accentColor : '#222')};
  font-size:16px;
  height:141px;
  display:flex;
  padding:0 25px;
  justify-content:center;
  align-items:center;
  text-align:center;

`
const Cover = styled.div`
  background:rgba(0,0,0, ${props => props.hover ? 0.7 : 0.4});
  transition: .5s;
`

const slideOut = keyframes`
	from {
    transform: translateX(-87%);
  }
  to {
    transform: translateX(0%);
  }
`
const slideIn = keyframes`
	from {
    transform: translateX(0%);;
  }
  to {
    transform: translateX(-87%);
  }
`

class TopNewsSmall extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			hover: false
		}
	}

	hoverOff = () => {
		this.setState({
			hover: false
		})
	}

	hoverOn = () => {
		this.setState({
			hover: true
		})
	}

	render() {
		let { detail, style } = this.props

		return (
			<Container
				className="row"
				style={{ ...style }}
				onMouseOver={this.hoverOn}
				onMouseLeave={this.hoverOff}>
				<BG
					hover={this.state.hover}
					url={detail && detail.url}
					src={detail && detail.cover.medium}
					className="imgWidth mob-hidden"
					style={{ backgroundPosition: 'right' }}>
					<Cover hover={this.state.hover}>
						<BoxText className="nunito-font showText" hover={this.state.hover}>
							<span>
								{truncate(detail && detail.ptitle, {
									length: 70,
									separator: ''
								})}
							</span>
						</BoxText>
					</Cover>
				</BG>
				<BoxText className="nunito-font hideText">
					<span>
						{truncate(detail && detail.ptitle, {
							length: 70,
							separator: ''
						})}
					</span>
				</BoxText>
			</Container>
		)
	}
}

export default TopNewsSmall
