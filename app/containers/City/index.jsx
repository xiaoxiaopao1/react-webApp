import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import { CITYNAME } from '../../config/localStoreKey'
import localStore from '../../util/localStore'

import Header from '../../components/CityHeader'
import CurrentCity from '../../components/CurrentCity'
import CityList from './subpage/CityList.jsx'

class City extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<div>
				<Header title="选择城市" />
				<CurrentCity cityName={this.props.userinfo.cityName} />
				<CityList />
			</div>
		)
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
)(City)