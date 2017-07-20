import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { sendMessage, undoMessage, redoMessage } from '../actions';
import custom from '../styles/custom.css';

class MessagesBox extends React.Component {
    constructor(props) {
        super(props);

        this._handleKeyPress = this._handleKeyPress.bind(this);
        this._handleRedo = this._handleRedo.bind(this);
        this._handleUndo = this._handleUndo.bind(this);
    }

    render() {
        console.log(this.props.messages)
        return (

            <div className={custom["chatArea"]}>
                <ul className={custom["messages"]}>
                    {this.props.messages.past.length > 0 && this.props.messages.past.map(message => {
                        return (
                            <li key={message.data} className={custom["messageBody"]} >
                                {message.user.nickname} : {message.data}
                            </li>
                        )
                    })}
                    {this.props.messages.current ? <li key={this.props.messages.current.data} className={custom["messageBody"]} >
                        {this.props.messages.current.user.nickname} : {this.props.messages.current.data}
                    </li> : ""}

                </ul>
                <div>
                    <input type="button" name="Undo" value="UNDO" onClick={this._handleUndo}/>
                    <input type="button" name="Redo" value="REDO" onClick={this._handleRedo}/>
                </div>
                <input className={custom["inputMessage"]} ref={(input) => { this.textInput = input; }} onKeyPress={this._handleKeyPress} placeholder="Type here..."/>
            </div>
        );
    }

    _handleUndo() {
        this.props.dispatch(undoMessage());
    }

    _handleRedo() {
        this.props.dispatch(redoMessage());
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.dispatch(sendMessage(this.textInput.value, this.props.user));
            this.textInput.value = ""
        }
    }
}

MessagesBox.propTypes = {
    messages: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {

    };
};

export default connect(mapStateToProps, dispatch => ({dispatch}))(MessagesBox);
