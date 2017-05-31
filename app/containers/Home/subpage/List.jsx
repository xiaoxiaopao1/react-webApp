import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home.js'

import ListComponent from '../../../components/List'
import  LoadMore from '../../../components/LoadMore'
import './style.less'

class List extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			hasMore: false,
			data: [],
			isLoadingMore: false,
			page: 0
		}
	}
	render(){
		return(
			<div className="home-list">
				<h2 className="home-list-title">猜你喜欢</h2>
				{
					this.state.data.length
					? <ListComponent data={this.state.data} />
					: <div>加载中...</div>
				}
				{
					this.state.hasMore
					? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)} />
					: ''
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

	//加载更多数据
	loadMoreData(){
		//记录状态
		this.setState({
			isLoadingMore: true
		})

		const cityName = this.props.cityName,
			  page = this.state.page,
			  result = getListData(cityName,page);

		this.resultHandle(result);

		//增加page计数，同时isLoadingMore状态改变
		this.setState({
			page: page + 1,
			isLoadingMore: false
		})
	}
	//数据处理
	resultHandle(result){
		result.then((res) => {
			return res.json()
		}).then((json) => {
			const hasMore = json.hasMore;
			const data=json.data;

			// 存储数据
			this.setState({
				hasMore: hasMore,
				//此处的数据为新旧数据拼接，用concat()操作
				data: this.state.data.concat(data)
			})
		})
	}
}

export default List