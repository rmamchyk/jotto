import React, {Component} from 'react';
import {connect} from 'react-redux';

class Input extends Component {
    render() {
        return (
            <div>
                <button></button>
            </div>
        )
    }
}

export default connect((state) => {
    return {};
})(Input);