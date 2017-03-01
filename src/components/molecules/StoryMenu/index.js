import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

const StoryMenu = ({style,className,child,next}) => {
	return (
			<div className={className+' row'} style={{...style}}>
        <FlatButton
          label="STORIES"
          buttonStyle={{padding:'10px'}}
          className='nunito-font'
          labelStyle={{fontSize:'18px',color:'#8f8f8f'}}
          icon={<FontIcon className="material-icons" style={{fontSize:'35px',color:'#8f8f8f'}}>apps</FontIcon>}
        />
        <FontIcon className="material-icons" style={{fontSize:'35px',color:'#8f8f8f'}}>chevron_right</FontIcon>
        <FlatButton
          label={next}
          buttonStyle={{padding:'10px'}}
          className='nunito-font'
          labelStyle={{fontSize:'18px',color:'#00B2B4',fontWeight:'bold'}}
        />
        {child}
      </div>
	)
}

export default StoryMenu;
