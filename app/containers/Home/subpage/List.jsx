import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home.js'

import ListComponent from '../../../components/List'
import './style.less'

class List extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			hasMore: false,
			data: []
		}
	}
	render(){
		return(
			<div className="home-list">
				<h2>猜你喜欢</h2>
				{
					this.state.data.length
					? <ListComponent data={this.state.data} />
					: <div>加载中...</div>
				}
			</div>
		)
	}
	componentDidMount(){
		//获取首页列表数据
		const cityName = this.props.cityName;
		const result = getListData(cityName,0)
		this.resultHandle(result);
	}
	//数据处理
	resultHandle(result){
		result.then((res) => {
			return res.json()
		}).then((json) => {
			const hasMore = json.hasMore;
			const data=json.data;
			console.log(data);

			// 存储数据
			this.setState({
				hasMore: hasMore,
				data: this.state.data.concat(data)
			})
		})
	}
}

export default List