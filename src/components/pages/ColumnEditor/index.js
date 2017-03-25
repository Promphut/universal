import React from 'react'
import {TopBarWithNavigation, OverlayImg, PublisherProfileSetting,
   PublisherPublishingSetting, PublisherAnalyticSetting, PublisherThemeSetting,
   PublisherSettingMenu} from 'components'

import styled from 'styled-components'


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
`
const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
`
const Main = styled.div`
	background: white;
	flex: 3 855px;
	max-width: 855px;
`
const Aside = styled.div`
	background: rgba(255,255,255,0.5);
	flex: 1 255px;
	max-width: 255px;
`

const ColumnEditor = React.createClass({
	getInitialState(){
		return {}
	},

  render(){
		return (
		    <Wrapper>
        	<TopBarWithNavigation title={'Title of AomMoney goes here..'} />
          <Container>
            <Content>
              <Aside>
                <PublisherSettingMenu/>
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

export default ColumnEditor
