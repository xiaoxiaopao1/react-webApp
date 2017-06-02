import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/CityHeader'
import Info from './subpage/info'
import Comment from './subpage/Comment'

class Detail extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const id = this.props.params.id;
		return(
			<div>
				<Header title="商户详情" />
				<Info id={id} />
				<Comment id={id} />
			</div>
		)
	}
}

export default Detail