import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Item extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		

		return(
			<div >111
			</div>
		)
	}
	componentDidMount(){
		const data = this.props.data;
		console.log(data.id)
	}
}

export default Item