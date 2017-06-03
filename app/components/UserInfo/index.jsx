import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
class UserInfo extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<div className="userinfo-container">
				<p>
					<i className="icon-user" />
					&nbsp;
					<span>用户: </span>
					<span>{this.props.username}</span>
				</p>
				<p>
					<i className="icon-map-marker" />
					&nbsp;
					<span>城市: </span>
					<span>{this.props.cityName}</span>
				</p>
			</div>
		)
	}
}

export default UserInfo