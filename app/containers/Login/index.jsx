import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 

import Header from '../../components/CityHeader'
import LoginComponent from '../../components/Login'

class Login extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			checking: true
		}
	}
	render(){
		return(
			<div>
				<Header title="登录" />
				{
					this.state.checking
					? <div>{/* 等待中 */}</div>
					: <LoginComponent loginHandler={this.loginHandler.bind(this)} />
				}
				
			</div>
		)
	}
	componentDidMount() {
		//判断是否已经登录
		this.doCheck();
	}
	doCheck() {
		const userinfo = this.props.userinfo;
		if (userinfo.username) {
			//已经登录
			this.goUserPage();
		}else{
			//未登录
			this.setState({
				checking: false
			})
		}
	}
	//处理登录之后的事情
	loginHandler(username) {
		//保存用户名
		const actions = this.props.userInfoActions;
		let userinfo = this.props.userinfo;
		userinfo.username = username;
		actions.update(userinfo);

		const params = this.props.params,
			  router = params.router;
		if (router) {
			//跳转到指定页面
			hashHistory.push(router)
		}else{
			//跳转到用户主页
			this.goUserPage();
		}
	}
	goUserPage() {
		hashHistory.push('/User');
	}
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)