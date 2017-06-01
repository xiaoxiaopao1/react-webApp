import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { getSearchData } from '../../../fetch/search/search'
import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

// 初始化组件state
const initialState = {
	data: [],
	hasMore: false,
	isLoadingMore: false,
	page: 0
}
class SearchList extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = initialState;
	}
	render(){
		return(
			<div>
				{
					this.state.data.length
					? <ListComponent data={this.state.data}/>
					: <div>{/* 加载中... */}</div>
				}
				{
					this.state.hasMore
					? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)} />
					: ''
				}
			</div>
		)
	}
	componentDidMount() {
		this.loadFirstPageData();
	}
	loadFirstPageData() {
		const cityName = this.props.userinfo.cityName,
			  keyword = this.props.keyword || '',
			  category = this.props.category,
			  result = getSearchData(0,cityName,category,keyword);

		this.resultHandler(result)	  
	}

	//加载更多数据
	loadMoreData() {
		this.setState({
			isLoadingMore: true
		})
		const cityName = this.props.userinfo.cityName
        const page = this.state.page
        const keyword = this.props.keyword || ''
        const category = this.props.category
        const result = getSearchData(page, cityName, category, keyword)
        this.resultHandler(result)
	}
	resultHandler(result) {
		//增加page计数
		const page = this.state.page;
		this.setState({
			page: page + 1
		});

		result.then((res) => {
			return res.json();
		}).then((json) => {
			const hasMore = json.hasMore,
				  data = json.data;

			this.setState({
				hasMore: hasMore,
				data: this.state.data.concat(data)
			})
		})
	}

	//处理搜索页面的继续搜索
	componentDidUpdate(prevProps,prevState){
		const keyword = this.props.keyword,
			  category = this.props.category;

		//搜索条件完全相同时，忽略
		if (keyword === prevProps.keyword && category === prevProps.category) {
			return
		}

		//重置state
		this.setState(initialState);

		//重新加载数据
		this.loadFirstPageData();
	}
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList)