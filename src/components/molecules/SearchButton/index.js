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

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
  color: #ffffff;
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

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#ffffff',
  },
});

class SearchButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            focus: false,
            text: ''
        }
    }

    handleClick = (e) => {
        if(this.state.focus && _.trim(this.state.text).length != 0)  {
            this.setState({focus: !this.state.focus})
            window.open('http://localhost:3000/search/stories/' + _.trim(this.state.text), "_top")
        }
        else if(this.state.focus) this.setState({focus: true})
        else this.setState({focus: !this.state.focus})
        this.setState({text: ''})
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({text: value})
    }

    componentDidMount() {
		document.getElementById("bt").addEventListener('click', this.handleClick)
	}

    render() {
        return(
            // <Link to={'/search/news/fsfsf'}>
            <MuiThemeProvider muiTheme={muiTheme}>
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
                                if (ev.key === 'Enter' && _.trim(this.state.text).length != 0) {
                                    // Do code here
                                    {/*alert(this.state.text)*/}
                                    window.open('http://localhost:3000/search/stories/' + _.trim(this.state.text), "_top")
                                    ev.preventDefault();
                                } else if (ev.key === 'Enter') this.setState({text: ''})
                            }}
                        />}
                </ButtonContainer>
            </MuiThemeProvider>
            // </Link>
        )
    }

}

export default SearchButton
