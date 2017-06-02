import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getInfoData } from '../../../fetch/detail/detail'

import DetailInfo from '../../../components/DetailInfo'

class Info extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			info: false
		}
	}
	render(){
		return(
			<div>
				{
					this.state.info
					? <DetailInfo data={this.state.info} />
					: ''
				}
			</div>
		)
	}
	componentDidMount() {
		//获取商户信息
		const id = this.props.id,
			  result = getInfoData(id);

		result.then((res) => {
			return res.json()
		}).then((json) => {
			const data = json;
			this.setState({
				info: data
			})
			console.log(this.state.info)
		})
	}
}

export default Info