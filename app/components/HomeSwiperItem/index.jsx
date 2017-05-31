import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class HomeSwiperItem extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const data = this.props.data;
		return(
			<ul className="clear-fix">
				{
					data.map((item,index) => {
						return (
							<li key={index} className="float-left">
								<img src={item.img} />
								<p>{item.title}</p>
							</li>
						)
					})
				}
			</ul>
		)
	}
}

export default HomeSwiperItem