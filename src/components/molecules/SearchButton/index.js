import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import styled from 'styled-components'
import TextField from 'material-ui/TextField'

const ButtonContainer = styled.div`
    width: auto;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 32px;
`

const Button = styled.div`
  text-align: center;
  margin-right: 8px;
  font-size: 21.86px;
  color: #8E8E8E;
  width: 30px;
  height: 30px;

  &:hover{
    cursor:pointer;
    color: ${props => props.theme.accentColor};
  }
  
`

const styles = {
  hintStyle: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: 'normal',
  },
  inputStyle: {
      color: 'rgb(0,255,255)'
  },
  textareaStyle: {
      width: '180px',
      color: 'rgb(0,255,255)',
  }
}

class SearchButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            focus: false,
            text: ''
        }
    }

    handleClick = (e) => {
        this.setState({focus: !this.state.focus})
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({text: value})
    }

    focusUsernameInputField = (input) => {
        input.focus();
    }

    componentDidMount() {
		document.getElementById("bt").addEventListener('click', this.handleClick)
	}

    render() {
        return(
            // <Link to={'/search/news/fsfsf'}>
                <ButtonContainer>
                    <Button>
                        <i id="bt" className="fa fa-search" aria-hidden="true"></i>
                    </Button>
                    {this.state.focus && 
                        <TextField
                            id="textField"
                            hintText="Search Stories"
                            hintStyle={styles.hintStyle}
                            inputStyle={styles.inputStyle}
                            style={styles.textareaStyle}
                            textareaStyle={styles.textareaStyle}
                            floatingLabelFocusStyle={styles.inputStyle}
                            value={this.state.text}
                            onChange={this.handleChange}
                            onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    // Do code here
                                    {/*alert(this.state.text)*/}
                                    window.open('http://localhost:3000/search/stories/' + this.state.text, "_top")
                                    ev.preventDefault();
                                }
                            }}
                            ref={this.focusUsernameInputField}
                        />}
                </ButtonContainer>
            // </Link>
        )
    }
  
}

export default SearchButton