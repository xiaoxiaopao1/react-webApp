import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Detail extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<div>404 Detail</div>
		)
	}
}

export default Detail