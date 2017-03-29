import React from 'react'
// import {browserHistory} from 'react-router'
import { TopBarWithNavigation, TopBarWithBack, UserSettingMenu } from 'components'
import styled from 'styled-components'
import auth from 'components/auth'

const Wrapper = styled.div`
  width:100%;
	background: ${props=> props.theme.primaryColor};
  background: -moz-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: -webkit-gradient(left top, right bottom, color-stop(0%, ${props=> props.theme.primaryColor}), color-stop(100%, ${props=> props.theme.secondaryColor}));
  background: -webkit-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: -o-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: -ms-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: linear-gradient(135deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00b2b4', endColorstr='#cef1b7', GradientType=1 );
`

const Container = styled.div`
  width:100%;
  padding:10% 0 10% 0;
  @media(max-width:480px){
    max-width: 100%;
    padding:0 0 0 0;
  }
`
const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
  width:1110px;
  margin:0 auto 0 auto;
  @media(max-width:480px){
    max-width: 100%;
  }
`
const Main = styled.div`
	background: white;
	flex: 3 855px;
  @media(max-width:480px){
    max-width: 100%;
  }
`
const Aside = styled.div`
	background: rgba(255,255,255,0.5);
	flex: 1 255px;
	max-width: 255px;
  @media(max-width:480px){
    display:none;
  }
`

const UserSetting = React.createClass({
	getInitialState(){
    this.user = {}
		return {}
	},

  componentWillMount(){
    this.user = auth.getUser()
  },

  componentDidMount(){
    // api.getUser()
    // .then(user => {
    //   this.user = user
    // })
    // .catch(err => {
    //   browserHistory.push('/signin');
    // })
  },

  render(){
    const isMobile = window.isMobile()

    let title = ''
    if (this.props.location.pathname == '/me/settings') {
      title = 'Setting'
    } else if (this.props.location.pathname == 'me/settings/account') {
      title = 'Edit Profile'
    }

		return (
		    <Wrapper>
          {isMobile ? <TopBarWithBack title={title}/> :
            <TopBarWithNavigation title={'Title of AomMoney goes here..'} />
          }

          <Container>
            <Content>
              <Aside>
                <UserSettingMenu pathname={this.props.location.pathname} user={this.user}/>
              </Aside>
              <Main>
                {this.props.children}
              </Main>
            </Content>
          </Container>
		   </Wrapper>
		  )
	}
});

export default UserSetting
