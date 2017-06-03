import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Login extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			username: ''
		}
	}
	render(){
		return(
			<div className="login-container">
				<div className="input-container phone-container">
					<i className="icon-tablet" />
					<input type="text"
						   placeholder="输入手机号"
						   onChange={this.changeHandler.bind(this)}
						   value={this.state.username} />
				</div>
				<div className="input-container password-container">
					<i className="icon-key" />
					<input type="text" placeholder="输入验证码" />
					<button>发送验证码</button>
					
				</div>
				<button className="btn-login" onClick={this.clickHandler.bind(this)}>登录</button>
			</div>
		)
	}
	changeHandler(e) {
		this.setState({
			username: e.target.value
		})
	}
	clickHandler() {
		const username = this.state.username;
		const loginHandler = this.props.loginHandler;
		loginHandler(username);
	}
}

export default Login