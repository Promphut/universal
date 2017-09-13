import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { UploadPicture } from '../../../components'

const Container = styled.div`
	.desktop{
		border:1px solid #8E8E8E;
		border-radius:0px;
	}
	.icon-desktop{
		color:#5A5A5A;
		font-size:54px;
	}
	.mobile{
		border:1px solid #8E8E8E;
		border-radius:0px;
		border-left:0px;
	}
`

const Text = styled.div`
	font-size: 12px;
	color: #8E8E8E;
	margin: 8px 0 12px 0;
`

class EditorCover extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	render() {
		var {story} = this.props
		return (
			<Container>
				<Text>สามารถอัพโหลดได้ทั้งสำหรับ desktop และ mobile</Text>
				<div className='row'>
					<UploadPicture
						ratio={1200 / 628}
						path={`/stories/${story.sid}/cover`}
						deleteURL={`/stories/${story.sid}/cover`}
						src={story.cover && story.cover.medium}
						width={190}
						height={110}
						label={<i className="material-icons icon-desktop" >desktop_mac</i>}
						className='desktop'
						type="cover"
						style={{flex:'0 190px'}}
					/>
					<UploadPicture
						ratio={330 / 500}
						path={`/stories/${story.sid}/covermobile`}
						deleteURL={`/stories/${story.sid}/covermobile`}
						src={story.coverMobile && story.coverMobile.medium}
						width={110}
						height={110}
						label={<i className="material-icons icon-desktop" >phone_iphone</i>}
						className='mobile'
						type="coverMobile"
						style={{flex:'0 110px'}}
					/>
				</div>
			</Container>
		)
	}
}

export default EditorCover
