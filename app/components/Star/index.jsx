import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
class Star extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			star: 0
		}
	}
	render(){
		let star = this.state.star;
		if (star > 5) {
			star %= 5
		};

		const totalNum = this.totalStar();
		return(
			<div className="star">
				{
					totalNum.map((item,index) => {
						const lightClass = star >= item ? 'light' : '';
						
						return (
							<i key={index} className={'icon-star ' + lightClass} onClick={this.clickHandler.bind(this,item)}></i>
						)
					})
				}
			</div>
		)
	}
	totalStar(){
		var totalNum = [];
		for (var i = 0; i < 5; i++) {
			totalNum[i] = i + 1
		};
		return totalNum;
	}
	componentDidMount() {
		this.setState({
			star: this.props.star
		})
	}
	clickHandler(star) {
		const clickCallback = this.props.clickCallback;
		
		if (!clickCallback) {
			return
		}

		this.setState({
			star: star
		})

		clickCallback(star);
	}
}

export default Star