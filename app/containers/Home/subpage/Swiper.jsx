import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getSwiperData } from '../../../fetch/home/home.js'
import HomeSwiper from '../../../components/HomeSwiper'


class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: []
        }
    }
    render() {
        return (
            <div>
                <HomeSwiper data={this.state.data} />
            </div>
        )
    }
    componentDidMount(){
        const cityName = this.props.cityName;
        const result = getSwiperData(cityName,0);
        result.then((res) => {
            return res.json()
        }).then((json) => {
            const data = json;
            console.log(data);
            this.setState({
                data: data
            })
        }) 
    } 
}

export default List