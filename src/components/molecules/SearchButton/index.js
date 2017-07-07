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
import trim from 'lodash/trim'
import config from '../../../config'
import PropTypes from 'prop-types'

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

const SearchButtonIcon = styled.i`
  transition: 0.2;
  color: ${props => props.theme.barTone=='light'?'#222':'white'};
`

const getStyles = (name,theme) => {
    if(name=='hintStyle')
        return {
            color: theme.barTone == 'light' ? '#222':'white',
            fontWeight: 'normal'
        }
    else if(name=='inputStyle')
        return {
            color: theme.barTone == 'light' ? '#222':'white',
        }
    else if(name=='textareaStyle')
        return {
            width: '180px',
            color: theme.barTone == 'light' ? '#222':'white',
        }
}

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#222',
  },
});

const muiTheme2 = getMuiTheme({
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

    static contextTypes = {
		setting: PropTypes.object
	}

    handleClick = (e) => {
        if(this.state.focus && trim(this.state.text).length != 0)  {
            this.setState({focus: !this.state.focus})
            window.open(config.FRONTURL + '/search/stories?keyword=' + trim(this.state.text), "_top")
        }
        else if(this.state.focus) this.setState({focus: true})
        else this.setState({focus: !this.state.focus})
        this.setState({text: ''})
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({text: value})
    }

    handleFocus = (e) => {
      this.setState({focus: false})
    }

    componentDidMount() {
		document.getElementById("bt").addEventListener('click', this.handleClick)
	}

    render() {
        let { theme } = this.context.setting.publisher
        return(
            <MuiThemeProvider muiTheme={theme.barTone=='light' ? muiTheme : muiTheme2}>
                <ButtonContainer>
                    <Button>
                        <SearchButtonIcon id="bt" className="fa fa-search" aria-hidden="true"></SearchButtonIcon>
                    </Button>
                    {this.state.focus &&
                        <TextField
                            id="textField"
                            hintText="ค้นหา"
                            hintStyle={getStyles('hintStyle',theme.barTone)}
                            inputStyle={getStyles('inputStyle',theme.barTone)}
                            style={getStyles('textareaStyle',theme.barTone)}
                            textareaStyle={getStyles('textareaStyle',theme.barTone)}
                            floatingLabelFocusStyle={getStyles('inputStyle',theme.barTone)}
                            underlineFocusStyle={{borderColor: theme.accentColor}}
                            value={this.state.text}
                            onChange={this.handleChange}
                            onBlur={this.handleFocus}
                            autoFocus
                            onKeyPress={(ev) => {
                                if (ev.key === 'Enter' && trim(this.state.text).length != 0) {
                                    // Do code here
                                    {/*alert(this.state.text)*/}
                                    window.open(config.FRONTURL + '/search/stories?keyword=' + trim(this.state.text), "_top")
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
