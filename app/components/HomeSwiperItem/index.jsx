import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { Link } from 'react-router'

import './style.less'

class HomeSwiperItem extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const data = this.props.data;
		return(
			<ul className="swiper-single clear-fix">
				{
					data.map((item,index) => {
						return (
							<Link to={'/search/' + index} key={index}>
								<li className="float-left">
									<img src={item.img} />
									<p>{item.title}</p>
								</li>
							</Link>
						)
					})
				}
			</ul>
		)
	}
}

export default HomeSwiperItem