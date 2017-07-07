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
            text: '',
            redirect: false
        }
    }

    static contextTypes = {
		setting: PropTypes.object
	}

    handleClick = (e) => {
        if(trim(this.state.text).length != 0)  {
            this.setState({focus : false, redirect: true})
            /*window.open(config.FRONTURL + '/search/stories?keyword=' + trim(this.state.text), "_top")*/
        }
        else this.setState({focus: true})
    }

    handleChange = (event) => {
        const value = event.target.value;
        if(value != this.state.text)
            this.setState({text: value})
    }

    componentDidMount() {
		document.getElementById("bt").addEventListener('click', this.handleClick)
	}

    componentWillReceiveProps(nextProps) {
        if(this.state.redirect)
            this.setState({redirect : false, text : ''})
	}

    render() {
        let { theme } = this.context.setting.publisher
        let { text, redirect } = this.state

        return(
            <div>
                {redirect && <Redirect push to={'/search/stories?keyword=' + trim(text)} />
                }   
                <MuiThemeProvider muiTheme={theme.barTone=='light' ? muiTheme : muiTheme2}>
                    <ButtonContainer>
                        <Button>
                            <SearchButtonIcon id="bt" className="fa fa-search" aria-hidden="true"></SearchButtonIcon>
                        </Button>
                        {this.state.focus &&
                            <TextField
                                id="textField"
                                hintText="Search Stories"
                                hintStyle={getStyles('hintStyle',theme.barTone)}
                                inputStyle={getStyles('inputStyle',theme.barTone)}
                                style={getStyles('textareaStyle',theme.barTone)}
                                textareaStyle={getStyles('textareaStyle',theme.barTone)}
                                floatingLabelFocusStyle={getStyles('inputStyle',theme.barTone)}
                                underlineFocusStyle={{borderColor: theme.accentColor}}
                                value={text}
                                onChange={this.handleChange}
                                onKeyPress={(ev) => {
                                    if (ev.key === 'Enter' && trim(text).length != 0) {
                                        // Do code here
                                        this.setState({focus:false ,redirect: true})
                                        {/*alert(this.state.text)*/}
                                        /*window.open(config.FRONTURL + '/search/stories?keyword=' + trim(text), "_top")*/
                                    } else if (ev.key === 'Enter') this.setState({text: ''})
                                }}
                            />}
                    </ButtonContainer>
                </MuiThemeProvider>
            </div>
            // </Link>
        )
    }

}

export default SearchButton
