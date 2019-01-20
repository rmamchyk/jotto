import React, {Component} from 'react';
import {connect} from 'react-redux';
import {guessWord} from '../actions';

export class UnconnectedInput extends Component {
    constructor(props) {
        super(props);

        this.inputBox = React.createRef();

        this.submitGuessedWord = this.submitGuessedWord.bind(this);
    }

    submitGuessedWord(event) {
        // prevent submitting a form
        event.preventDefault();

        const guessedWord = this.inputBox.current.value;
        if (guessedWord && guessedWord.length > 0) {
            this.props.guessWord(guessedWord);
            this.inputBox.current.value = '';
        }
    }

    render() {
        const contents = this.props.success || this.props.gaveUp
            ? null
            : (
                <form className="form-inline">
                    <input 
                        id="word-guess"
                        type="text"
                        ref={this.inputBox}
                        placeholder="enter guess"
                        data-test="input-box" 
                        className="mb-2 mx-sm-3" />
                    <button 
                        type="submit" 
                        data-test="submit-button" 
                        className="btn btn-primary mb-2"
                        onClick={this.submitGuessedWord}>
                        Submit
                    </button>
                </form>
            );

        return (
            <div data-test="component-input">
                {contents}
            </div>
        )
    }
}

export default connect(({success}) => {
    return {success};
}, {
    guessWord
})(UnconnectedInput);