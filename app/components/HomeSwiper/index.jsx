import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactSwipe from 'react-swipe'

import SwiperItem from '../HomeSwiperItem'
import './style.less'

class HomeSwiper extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			index: 0
		}
	}
	render(){
		
		const data = this.props.data;
		
		var opt = {
    		auto: 2000,
    		callback: function(index){
    			this.setState({
    				index: index
    			})
    		}.bind(this),
    		continuous: true
    	}

		return(
			<div className="home-swiper">
				<ReactSwipe key={data.length} swipeOptions={opt}>
					{
						data.map((item,index) =>{
							return (
								<div key={index} className="carousel-item" style={{width: '100%'}}>
									<SwiperItem data={item} />
								</div>
							)
						})
					}
				</ReactSwipe>
				<div className="index-container">
					<ul>
						{
							data.map((item,index) => {
								return (
									<li key={index} className={this.state.index === index ? "selected" : ''}></li>
								)
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default HomeSwiper