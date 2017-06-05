import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { postComment } from '../../../fetch/user/user'
import Star from '../../Star'

import './style.less'

class Item extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			commentState: 1,
			id: this.props.data.id,
			stars: 0
		}
	}
	render(){
		const data = this.props.data;
		const id = data.id;
		return(
			<div className="order-item-container clear-fix">
				<div className="order-item-img float-left">
					<img src={data.img} />
				</div>
				<div className="order-item-content float-left">
					<span>商户：{data.title}</span>
					<span>数量：{data.count}</span>
					<span>价格：￥{data.price}</span>
				</div>
				<div className="order-item-comment float-right">
					{
						this.state.commentState === 0
						//未评价
						? <button className="btn" onClick={this.showComment.bind(this)}>评价</button>
						: 
							this.state.commentState === 1
							// 评价中
							? ''
							: 
								this.state.commentState === 2
								// 已经评价
								? <button className="btn unselected-btn">已评价</button>
								: ''

					}
				</div>
				{
					//评价中状态要显示输入框
					this.state.commentState === 1
					? <div className="comment-text-container">
					  	<textarea style={{width: '100%',height: '80px'}} className="comment-text" ref="commentText" />
					  	<div style={{paddingTop: '10px',paddingBottom: '10px'}}>
					  		<Star star={this.state.stars} clickCallback={this.starClickCallback.bind(this)} />
					  	</div>
					  	<button className="btn" onClick={this.submitComment.bind(this)}>提交</button>
					  	&nbsp;
					  	<button className="btn unselected-btn" onClick={this.hideComment.bind(this)}>取消</button>
					  </div>
				    : ''
				}
			</div>
		)
	}
	componentDidMount() {
		//将状态维护到state中
		this.setState({
			commentState: this.props.data.commentState
		})
	}

	showComment() {
		// 显示输入框
		this.setState({
			commentState: 1
		})
	}
	submitComment() {
		// 获取操作函数
		const submitComment = this.props.submitComment;

		// 获取id
		const id = this.props.data.id;

		// 获取star数量
		const stars = this.state.stars;
		
		// 获取评价内容
		const commentText = this.refs.commentText;
		const value = commentText.value.trim();

		if (!value) {
			return
		}

		// 执行数据提交
		submitComment(id,value,stars,this.commentOk.bind(this));
		console.log(stars)
	}
	commentOk() {
		//已经评价修改状态
		this.setState({
			commentState: 2
		})
	}
	hideComment() {
		// 隐藏输入框
		this.setState({
			commentState: 0
		})
	}
	starClickCallback(star) {
		

		this.setState({
			stars: star
		})
	}
}

export default Item