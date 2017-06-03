import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as storeActionsFromFile from '../../../actions/store'

import BuyAndStore from '../../../components/BuyAndStore'

class Buy extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			isStore: false
		}
	}
	render(){
		return(
			<BuyAndStore isStore={this.state.isStore} 
						 buyHandler={this.buyHandler.bind(this)}
						 storeHandler={this.storeHandler.bind(this)} />
		)
	}
	componentDidMount() {
		//验证当前商户是否被收藏
		this.checkStoreState();
	}
	checkStoreState() {
		const id = this.props.id,
			  store = this.props.store;

		//some 表示遍历store，其中有一项满足即可
		if (!store) {
			return;
		}
		store.some(item => {
			if (item.id === id) {
				//已经被收藏
				this.setState({
					isStore: true
				})
			}
			return true
		})
	}
	//检查登录状态
	loginCheck() {
		const id = this.props.id,
			  userinfo = this.props.userinfo;

		if (!userinfo.username) {
			//跳转至登录页面。并传入当前router便于返回
			hashHistory.push('/Login/' + encodeURIComponent('/detail/' + id));
			return false;
		}
		return true;
	}
	//购买事件
	buyHandler() {
		//验证登录
		const loginFlag = this.loginCheck();
		if (!loginFlag) {
			return
		}

		//已登录的时候跳转到用户主页
		hashHistory.push('/User')
	}
	//收藏事件
	storeHandler() {
		//验证登录
		const loginFlag = this.loginCheck();
		if (!loginFlag) {
			return
		}

		const id = this.props.id,
			  storeActions = this.props.storeActions;

		if (this.state.isStore) {
			//已经被收藏的状态时，取消收藏
			storeActions.rm({id: id});
		}else{
			//未收藏状态时，则添加到收藏中
			storeActions.add({id: id});
		}
		//修改状态
		this.setState({
			isStore: !this.state.isStore
		})
	}
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)