import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { setUsername, addUsers } from '../actions';
import custom from '../styles/custom.css';
import moment from 'moment'

class SetUsername extends React.Component {
    constructor(props) {
        super(props);

        this.handleJoin = this.handleJoin.bind(this);
    }

    render() {
        const {dispatch} = this.props;
        return (
            <div className="login page">
                <div className="form">
                    <h3 className="title">What's your nickname?</h3>
                    <input className="usernameInput" type="text" maxLength="14"  ref={(input) => { this.textInput = input; }}/>
                    <input type="button" value="Join" onClick={this.handleJoin}/>
                </div>
            </div>
        );
    }

    handleJoin() {
        let user = {
            username: this.textInput.value,
            time: moment().format("MM-DD-YYYY HH:mm")
        };

        this.props.dispatch(setUsername(user));
        this.props.dispatch(addUsers(user));
    }
}

SetUsername.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps, dispatch => ({dispatch}))(SetUsername);
