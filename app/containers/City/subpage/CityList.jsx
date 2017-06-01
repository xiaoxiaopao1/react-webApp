import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as userInfoActionsFromOtherFile from '../../../actions/userinfo'
import { CITYNAME } from '../../../config/localStoreKey'
import localStore from '../../../util/localStore'

import { getCityList } from '../../../fetch/city/cityList'

import CityListComponent from '../../../components/CityList'


class CityList extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: []
		}
	}
	render(){
		return(
			<CityListComponent changeFn={this.changeCity.bind(this)} data={this.state.data}/>
		)
	}
	componentDidMount(){
		var result = getCityList();

		result.then((res) => {
			return res.json();
		}).then((arr) => {
			const data = arr;
			
			this.setState({
				data: data
			})
		})
	}
	changeCity(newCity){
		if (newCity == null) {
			return
		}

		//修改redux
		const userinfo = this.props.userinfo;
		userinfo.cityName = newCity;
		this.props.userInfoActions.update(userinfo);

		 // 修改 cookie
        localStore.setItem(CITYNAME, newCity)

        // 跳转页面
        hashHistory.push('/')
	}
	
}

// -------------------redux react 绑定--------------------
function mapStateToProps(state){
    return{
        userinfo: state.userinfo
    }
}

function mapDispathToProps(dispatch){
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(CityList)