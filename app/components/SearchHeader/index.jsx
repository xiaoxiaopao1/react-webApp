import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SearchInput from '../SearchInput'

import './style.less'

class SearchHeader extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<div className="search-header clear-fix">
				<span className="back-icon float-left" onClick={this.clickHandler.bind(this)}>
					<i className="icon-chevron-left"></i>
				</span>
				<div className="input-container">
					<i className="icon-search"></i>
					&nbsp;
					<SearchInput value={this.props.keyword} />
				</div>
			</div>
		)
	}
	clickHandler(){
		window.history.back();
	}
}

export default SearchHeader