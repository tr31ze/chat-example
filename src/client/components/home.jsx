/*
 * This is a demo component the Eletrode app generator included
 * to show using Skeleton CSS lib (named base.css) and Redux
 * store for display HTML elements and managing states.
 *
 * To start your own app, please replace or remove these files:
 *
 * - this file (home.jsx)
 * - demo-buttons.jsx
 * - demo-pure-states.jsx
 * - demo-states.jsx
 * - reducers/index.jsx
 * - styles/*.css
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/normalize.css';
import '../styles/raleway.css';
import skeleton from '../styles/skeleton.css';
import custom from '../styles/custom.css';
import electrodePng from '../images/electrode.png';
import DemoStates from './demo-states';
import DemoPureStates from './demo-pure-states';
import DemoButtons  from './demo-buttons';
import MessagesBox from './MessagesBox';
import SetUsername from './SetUsername';
/**/
// import io from 'socket.io-client';

// let socket;
import { setUsername, sendMessage, popMessage, undoMessage, addUsers } from '../actions/index';

class Home extends Component {

    constructor(props) {
        super(props);

        const {dispatch} = this.props;


    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className={custom.container}>

                {this.props.currentUser.nickname && this.props.currentUser.nickname.length ?
                    <MessagesBox messages={this.props.messages} user={this.props.currentUser} /> : <SetUsername />}
            </div>
        );
    }

}

Home.PropTypes = {
    currentUser: PropTypes.object,
    messages: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        messages: state.messages,
        users: state.users
    };
};

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Home);
