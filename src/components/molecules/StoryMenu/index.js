import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton';
import {Link,browserHistory} from 'react-router'

const LinkTo = (path)=>{
  browserHistory.push(path)
}

const StoryMenu = ({style,className,child,path,linkPath}) => {
  //console.log(window.location.pathname)
	return (
			<div className={className+' row'} style={{...style}}>
        <IconButton 
          onClick={()=>LinkTo('/stories/columns')}
          style={{padding:'0px'}}
          iconStyle={{
            fontSize:'35px',
            color:window.location.pathname=='/stories/columns' ? '#00B2B4' : '#8f8f8f'
          }}>
          <FontIcon className="material-icons">apps</FontIcon>
        </IconButton>
        <FlatButton
          label="STORIES"
          onClick={()=>LinkTo('/stories/columns')}
          className='nunito-font'
          style={{marginTop:'5px'}}
          labelStyle={{
            fontSize:'18px',
            color:window.location.pathname==='/stories/columns' ? '#00B2B4' : '#8f8f8f',
            fontWeight:window.location.pathname==='/stories/columns' ? 'bold' : 'normal'
          }}
        />
        {!path?'':<FlatButton
          label={next}
          className='nunito-font'
          style={{marginTop:'5px'}}
          href={linkPath}
          icon={<FontIcon className="material-icons" style={{fontSize:'35px',color:'#8f8f8f'}}>chevron_right</FontIcon>}
          labelStyle={{fontSize:'18px',color:'#00B2B4',fontWeight:'bold'}}
        />}
        {child}
      </div>
	)
}

export default StoryMenu;
