import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SearchHeaderComponent from '../../../components/SearchHeader'

class SearchHeader extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<SearchHeaderComponent keyword={this.props.keyword} />
		)
	}
}

export default SearchHeader