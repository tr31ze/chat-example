import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleCheck, incNumber, decNumber } from '../actions';
import custom from '../styles/custom.css';

class DemoStates extends React.Component {
  render() {
    const { checked, value, dispatch } = this.props;
    return (
        <li className="chat page">
            <div className="chatArea">
                <ul className="messages"></ul>
            </div>
            <input className="inputMessage" placeholder="Type here..."/>
        </li>
    );
  }
}

DemoStates.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    checked: state.checkBox.checked,
    value: state.number.value
  };
};

export default connect(mapStateToProps, dispatch => ({ dispatch }))(DemoStates);
