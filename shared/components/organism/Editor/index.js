import React from 'react'
import styled from 'styled-components'
import utils from '../../../services/utils'
import merge from 'lodash'

const Paper = styled.div`
  width:100%;
  min-height:300px;
`;

var defaultConfig = {
  selector: '#paper',
  inline: true,
  theme: "inlite",
  selection_toolbar: 'bold italic | quicklink h2 h3 blockquote'
}

class Editor extends React.Component {
	constructor() {
		super()

		this.state = {

		}
	}

	componentDidMount() {
    var config = this.props.config
    if(document.tinymce){
      tinymce.init(
        merge(defaultConfig,config)
      );
    }else{
      utils.loadscript('https://cloud.tinymce.com/stable/tinymce.min.js',()=>{
        tinymce.init(
          merge(defaultConfig,config)
        );
      })
    }
	}

	render() {
    var {style} = this.props
		return (
      <Paper id='paper' style={style} />
		)
	}
}

export default Editor
