import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FroalaEditor, AnalyticContainer } from '../../../components'

const Container = styled.div`
`

const Title = styled.textarea`
    font-size: 36px;
    font-weight: bold;
    overflow-y: hidden;
	color: #222;
	height: 120px;
    width: 100%;
    outline: none;
    border: none;
    resize: none;

    &:focus {
      outline: none;
    }
`

const HighlightContainer = styled.div`
`

const HighlightTitle = styled.span`
    position: relative;
    top: 10px;
    left: 20px;
    z-index: 5;
    color: ${props => props.theme.primaryColor};
    text-align: center;
    padding: 0 9px;
    font-size: 14px;
    font-weight: bold;
    background: white;
    border-left: 2px solid ${props => props.theme.accentColor};
    border-right: 2px solid ${props => props.theme.accentColor};
`

const HighlightBox = styled.div`
    width: 100%;
    padding: 2px;
    background: linear-gradient(135deg, ${props => props.theme.primaryColor} 0%, ${props => props.theme.accentColor} 100%);
`

const Highlight = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 20px;
    background-color: white;

    &:focus {
        outline: none;
    }
`

const Divider = styled.div`
    width: 100%;
    min-height: 1px;
    margin: 80px 0px 56px;
    background-color: #BFBFBF;
`

const HtmlContainer = styled.div`
    margin-top: 40px;
    min-height: 300px;
`

class EditorMain extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	render() {
		const { story, changeTitle, changeHighlight, changeHtml } = this.props
		const { title, highlight, html, focusWord } = story

		return (
			<Container>
				<Title
					placeholder="Title"
					className="serif-font"
					value={title}
					onChange={changeTitle}
				/>

				<HighlightContainer>
					<HighlightTitle className="serif-font">HIGHLIGHT</HighlightTitle>
					<HighlightBox>
						<Highlight>
							<FroalaEditor
								model={highlight}
								onModelChange={changeHighlight}
								highlight={true}
								sid={story._id}
							/>
						</Highlight>
					</HighlightBox>
				</HighlightContainer>

				<HtmlContainer>
					<FroalaEditor
						ref="paper"
						model={html}
						onModelChange={changeHtml}
						sid={story._id}
					/>
				</HtmlContainer>

				<Divider />
				<AnalyticContainer
					title={title ? title : ''}
					highlight={highlight ? highlight : ''}
					content={html ? html : ''}
					focusWord={focusWord ? focusWord : ''}
				/>
			</Container>
		)
	}
}

export default EditorMain
