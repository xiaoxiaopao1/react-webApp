import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { hashHistory } from 'react-router'

import './style.less'

class SearchInput extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			value: ''
		}
	}
	render(){
		return(
			<input className="search-input" 
					type="text"
					placeholder="请输入关键字"
					value={this.state.value}
					onChange={this.changeHandler.bind(this)}
					onKeyUp={this.keyUpHandler.bind(this)} />
		)
	}
	componentDidmount(){
		this.setState({
			value: this.props.value || ''
		});
	}
	changeHandler(e){
		this.setState({
			value: e.target.value
		})
	}
	keyUpHandler(e){
		if (e.keyCode !== 13) {
			return
		}
		this.enterHandler(this.state.value)
	}
	enterHandler(value) {
		hashHistory.push('/search/all/' + encodeURIComponent(value));
	}
}

export default SearchInput