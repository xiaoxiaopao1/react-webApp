import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class CityHeader extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<div className="city-header">
				<span className="back-icon" onClick={this.clickHandler.bind(this)}>
					<i className="icon-chevron-left"></i>
				</span>
				<h1>{this.props.title}</h1>
			</div>
		)
	}
	clickHandler(){
		window.history.back();
	}
}

export default CityHeader