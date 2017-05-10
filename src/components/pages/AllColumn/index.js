import React from 'react'
import {TopBarWithNavigation, BGImg, StoryMenu, Footer} from 'components'
import {findDOMNode as dom} from 'react-dom'
import styled from 'styled-components'
import {Link} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'react-slick'
//import Request from 'superagent'
import api from 'components/api'

const Wrapper = styled.div`
  background-color: #F4F4F4;
  height:100vh;
  padding-bottom:300px;
  .imgWidth{
    width:255px;
    height:141px;
  }
  @media (max-width:480px) {
    .imgWidth{
      width:255px;
      height:141px;
    }
    .row{
      display:block;
    }
  }
`
const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding:50px 0 0 0;

	@media (min-width: 481px) {
		min-height: 768px;
	}
`

const Main = styled.div`
	flex: 8 730px;
	max-width: 730px;
	@media (max-width: 480px) {
		flex:0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
	}
`

const Aside = styled.div`
	flex: 3 325px;
	position:relative;
	max-width: 325px;
	margin-left:60px;
	@media (max-width: 1160px) {
		display:none;
	}
`
const Text = styled.div`
	color:#8F8F8F;
	font-size:19px;
`
const TextLine = styled.div`
	color:#8F8F8F;
	font-size:19px;
	border-bottom:1px solid #E2E2E2;
	padding-bottom:11px;
`
const ColumnName = styled.div`
  font-size:24px;
  font-weight:bold;
  margin-top:10px;
  color:white;
`
const Column = styled.div`
	color:#8F8F8F;
  font-size:14px;
  margin-top:2px;
  color:white;
`
const Feed = styled.div`
	flex: 12 1120px;
	max-width: 1120px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		min-width: 100%;
		padding:0 15px 0 15px;
  }
`

const Box = styled.div`
  width:255px;
  background:white;
  height:257px;
  margin:0px auto 15px auto;
  cursor: pointer;
  @media (max-width:480px){

  }
`
const Blur = styled.div`
background: rgba(255,255,255,0);
background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(89%, rgba(255,255,255,1)), color-stop(100%, rgba(255,255,255,1)));
background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=0 );
  position:relative;
  width:100%;
  height:117px;
  opacity:1;
`
const Desc = styled.div`
  font-size:14px;
  white-space: pre-wrap;      /* Webkit */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap;     /* Opera <7 */
  white-space: -o-pre-wrap;   /* Opera 7 */
  word-wrap: break-word;      /* IE */
  overflow: hidden;
  text-overflow: ellipsis;
  position:relative;
  color:#222;
  background:white;
  height:120px;
  padding:15px;
`

// const ColumnTN = ()=>{
//   return(

//   )
// }

class AllColumn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stopPos:0,
      columns:[],
      //popular:[]
    }
  }

  getColumn = () => {
    // var filter = JSON.stringify({status:1})
    // Request
    //  .get(config.BACKURL+'/publishers/'+config.PID+'/columns')
    //  .set('Accept','application/json')
    //  .end((err,res)=>{
    //    if(err) throw err
    //    else{
    //      this.setState({column:res.body.columns})
    //    }
    //  })

    api.getColumns()
    .then(cols => {
      this.setState({columns:cols})
    })
  }

  componentDidMount(){
    this.getColumn()
  }

  render(){
    let {columns} = this.state
    //console.log('column', column)
    return (
        <Wrapper>
          <TopBarWithNavigation title={'Title of AomMoney goes here..'} onLoading={this.props.onLoading}/>
          <Content>
            <Feed>
              <div className='row' style={{width: '100%'}}>
                <StoryMenu
                  style={{padding: '15px 0 15px 0', marginTop: '20px', float: 'left'}}
                  page="allcolumn"
                />
              </div>
              <div className='row' style={{overflow:'hidden'}}>
                {columns && columns.map((data, index) => (
                  <div className='col-lg-3 col-md-4 col-sm-12' key={index} style={{margin:'20px 0 20px 0'}}>
                    <Link to={'/stories/' + data.slug} >
                    <Box>
                      <BGImg src={data.cover.small || data.cover.medium} opacity={0.6}
                        className='imgWidth' style={{margin:'0 auto 0 auto'}} alt={data.name}>
                        <div style={{margin:'80px 0 0 15px'}}>
                          <ColumnName className='serif-font'>{data.name}</ColumnName>
                          {/*
                            FOR THE NEXT VERSION
                          <Column className='sans-font' >131 Stories</Column>
                          */}
                        </div>
                      </BGImg>
                        <Desc className='sans-font' >
                          {data.shortDesc}
                        </Desc>
                      <Blur style={{top:'-120px'}}></Blur>
                    </Box>
                    </Link>
                  </div>
                ))}
              </div>
            </Feed>
          </Content>
          <Footer/>
      </Wrapper>
    )
  }
}

export default AllColumn;
