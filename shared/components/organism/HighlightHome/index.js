import React from 'react'
import PropTypes from 'prop-types'
import { BGImg } from '../../../components'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import truncate from 'lodash/truncate'
import api from '../../../services/api';

const Content = styled.div`
	display: flex;
	justify-content: center;
	padding: 120px 0 0 0;

	@media (max-width:480px) {
		padding: 16px 0 0 0;
	}
	@media (min-width: 768px) and (max-width: 992px) {
		padding: 80px 0 0 0;
	}
	.fa-arrow-right{
		font-size:8px;
		position:relative;
		top:-2px;
		margin-left:4px;
	}
	.fa-angle-up{
		font-size:16px;
		color:white;
	}
	.fa-angle-down{
		font-size:16px;
		color:white;
	}
	.margin-bottom{
		margin-bottom:2px;
	}
`;

const Container = styled.div`
  display:flex;
`
const Img = styled(BGImg)`
  flex:1 650px;
  width:650px;
  height:339px;
`
const BoxText = styled.div`
  flex:1 460px;
  width:460px;
  height:339px;
	background-color:${props=>props.theme.primaryColor};
	padding:16px;
	display:flex;
	justify-content:space-between;
`
const InnerBox = styled.div`
	flex:6 380px;
	border-top:1px solid ${props=>props.theme.accentColor};
	border-bottom:1px solid ${props=>props.theme.accentColor};
	width:380px;
	height:307px;
	max-height:307px;
	max-width:380px;
	padding:16px;
	display:flex;
	flex-direction:column;
`
const Pos = styled.div`
	flex:1 24px;
	max-width:24px;
	width:24px;
	display:flex;
	flex-direction:column;
	justify-content:space-between;
`
const Hl = styled.div`
	color:${props=>props.theme.accentColor};
	font-family:'PT sans';
	font-weight:bold;
	font-size:20px;
	margin-bottom:16px;
`
const Title = styled(Link)`
	color:white;
	font-family:"Mitr";
	font-size:24px;
	margin-top:0px;
	line-height:1.2;
	&:hover{
		color:white;
		opacity:0.8;
	}
`
const More = styled(Link)`
	color:#F4F4F4;
	font-family:"Mitr";
	font-size:18px;
	margin-top:auto;
	&:hover{
		color:#F4F4F4;
		opacity:0.8;
	}
`
const Button = styled.button`
	width:24px;
	height:24px;
	background:none;
	border:1px solid #FFFFFF;
	border-radius:5px;
	&:hover{
		cursor:pointer;
	}
`
const Top = styled.div`

`
const Center = styled.div`
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:center;
`
const Bottom = styled.div`
	
`
const Dash = styled.div`
	flex:1;
	width:10px;
	background-color:white;
	height:4px;
	margin:4px 0 4px 0;
	&:hover{
		cursor:pointer;
	}
`
class HighlightHome extends React.Component {
	static contextTypes = {
		setting: PropTypes.object
	}

	constructor(props) {
		super(props)

		this.state = {
			stories:[]
		}
	}

	componentDidMount() {
		api.getFeed('stories', { status: 1 }, 'trending', null, 0, 5).then((result) => {
      if (result) {
        this.setState({
          stories: result.feed,
        });
      }
    });
  }

	renderDot = (ar) =>{
		return ar.map((val,inx)=><Dash/>)
	}
	render() {
		// var { style, swift, className, large, head, final} = this.props
		// var {
		// 	cover,
		// 	writer,
		// 	column,
		// 	votes,
		// 	comments,
		// 	updated,
		// 	url,
		// 	readTime,
		// 	contentShort,
		// 	ptitle
		// } = this.props.detail
		var { stories } = this.state
		if(stories){
			var s1 = stories[0]
			var s2 = stories[1]
		}
    return (
			<Content>	
				<Container>  
					<Img src="/tmp/story-list/1486591796200-GettyImages-591802466.jpeg" />
					<BoxText>
						<InnerBox>
							<Hl>Highlight</Hl>	
							<Title to='#'>{s1&&truncate(s1.ptitle,{ length: 60, separator: '' })}</Title>
							<More to='#'>อ่านต่อ<i className="fa fa-arrow-right" aria-hidden="true"></i></More>
						</InnerBox>
						<Pos>
							<Top></Top>
							<Center>
								{this.renderDot(stories)}
							</Center>						
							<Bottom>
								<Button className='margin-bottom'><i className="fa fa-angle-up" aria-hidden="true"></i></Button>
								<Button><i className="fa fa-angle-down" aria-hidden="true"></i></Button>
							</Bottom>
						</Pos>							
					</BoxText>                     
				</Container>  
			</Content>                
    )
		
	}
}

export default HighlightHome
