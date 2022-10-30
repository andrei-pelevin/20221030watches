import { React, Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';


class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 0}
        this.divergence = props.TimeZone * 60;

        this.upd = () => {
            this.setState({count: this.state.count + 1})
        }

    }
    componentDidMount() {
        this.timerId = setInterval(this.upd, 1000);
        
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {        
        console.log(this.props)
        return (
            <div className="border border-3 col-3 m-3 position-relative" >
                <span type="button" style={{position: 'absolute', right: '5px', top: '3px'}} className="material-icons" onClick={() => this.props.onDel(this.props.id)}>highlight_off</span>
                <h5 className='text-center'>{this.props.name}</h5>
                <h6 className='text-center'>{moment().utcOffset(this.divergence).format('HH:mm:ss')}</h6>
            </div>
        )
    }
}

Item.propTypes = {
    name: PropTypes.string.isRequired,
    timeZone: PropTypes.number.isRequired,
    onDel: PropTypes.func.isRequired
  };

export default Item;