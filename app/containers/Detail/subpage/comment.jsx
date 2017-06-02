import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getCommentData } from '../../../fetch/detail/detail'

import CommentList from '../../../components/CommentList'
import LoadMore from '../../../components/LoadMore'

import './style.less'

class Comment extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: [],
			hasMore: false,
			isLoadingMore: false,
			page: 0
		}
	}
	render(){
		return(
			<div className="detail-comment-subpage">
				<h2>用户点评</h2>
				{
					this.state.data.length
					? <CommentList data={this.state.data} />
					: <div>{/* 加载中... */}</div>
				}
				{
					this.state.hasMore
					? <LoadMore loadMoreFn = {this.loadMoreData.bind(this)} />
					: ''
				}
			</div>
		)
	}
	componentDidMount() {
		this.loadFirstPageData();

	}

	//获取首页数据
	loadFirstPageData() {
		const id = this.props.id,
			  result = getCommentData(0,id);

		this.resultHandler(result);
	}

	// 加载更多数据
	loadMoreData() {
		//记录状态
		this.setState({
			isLoadingMore: true
		});

		const id = this.props.id,
			  page = this.props.page,
			  result = getCommentData(page,id);

		this.resultHandler(result);
	}

	//数据处理
	resultHandler(result){
		result.then((res) => {
			return res.json();
		}).then((json) => {

			//增加page计数
			const page = this.state.page;
			this.setState({
				page: page + 1
			})
			const hasMore = json.hasMore,
				  data = json.data;

		    this.setState({
		    	hasMore: hasMore,
		    	data: this.state.data.concat(data)
		    })
		})
	}
}

export default Comment