import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
class Star extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		let star = this.props.star || 0;
		if (star > 5) {
			star %= 5
		};
		const totalNum = this.totalStar();
		return(
			<div>
				{
					totalNum.map((item,index) => {
						const lightClass = star >= item ? 'light' : '';
						return (
							<i key={index} className={'icon-star ' + lightClass}></i>
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
}

export default Star