import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'

const Block = styled.div`
    width: 334px;
    background: #FAFAFA;
    border-radius: 8px;
    margin-bottom: 16px;
    padding: 24px 16px;
	cursor: ${props => (props.open ? 'default' : 'pointer')};
	transition: 0.5s;
	
	.toggleUp {
		transform: rotate(-180deg);
		transition-duration: 1s;
	}
	
	.toggleDown {
		transform: rotate(0deg);
		transition-duration: 1s;
	} 
`

const BlockTitle = styled.div`
    font-size: 14px;
    color: #222222;
    font-weight: bold;
    line-height: 1.9;
	cursor: pointer;
`

const BlockDesc = styled.div`
    font-size: 12px;
    color: #8E8E8E;
`

const Toggle = styled(FontIcon)`
    float: right;
    color: #8E8E8E;
    font-size: 18px;
	cursor: pointer;
`

class CollapseBlock extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	selectBlock = title => {
		return title
	}

	render() {
		let { children, header, select, open } = this.props
		const toggle = open ? 'toggleUp' : 'toggleDown'

		return (
			<Block onClick={open ? null : select} open={open}>
				<Toggle className={'material-icons ' + toggle} onClick={select}>
					keyboard_arrow_down
				</Toggle>
				<BlockTitle onClick={select}>{header.title}</BlockTitle>
				{open
					? children
					: header.desc ? <BlockDesc>{header.desc}</BlockDesc> : null}
			</Block>
		)
	}
}

export default CollapseBlock
