import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			load: false
		}
	}
	render(){
		return(
			<div className="load-more">
				{
					this.state.load
					? <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
					: <span>加载中...</span>
					
				}
			</div>
		)
	}

	componentDidMount() {
		this.setState({
			load: true
		})
	}

	loadMoreHandle(){
		this.props.loadMoreFn();
	}
}

export default LoadMore