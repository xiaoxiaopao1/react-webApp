import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class CityList extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		var data = this.props.data;
		console.log(data)
		return(
			<div className="city-list-container">
				<h3>热门城市</h3>
				<ul className="clear-fix">
					{
						data.map((item,index) => {
							return (
								<li key={index} onClick={this.clickHandler.bind(this,item)}>
									<span>{item}</span>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
	clickHandler(newCity){
		const changeFn = this.props.changeFn;
		changeFn(newCity);
	}
}

export default CityList