import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr, storeFactory} from '../../test/testUtils';
import Input, {UnconnectedInput} from './Input';

const setup = (initialState={}) => {
    const store = storeFactory(initialState);
    return shallow(<Input store={store} />).dive();
}

describe('render', () => {
    describe('word has not been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = {success: false};
            wrapper = setup(initialState);
        });

        it('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });

        it('renders input box', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.length).toBe(1);
        });

        it('renders submit button', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button');
            expect(submitButton.length).toBe(1); 
        });
    });

    describe('word has been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = {success: true};
            wrapper = setup(initialState);
        });

        it('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });

        it('does not render input box', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.length).toBe(0);
        });

        it('does not render submit button', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button');
            expect(submitButton.length).toBe(0);
        });
    });
});

describe('redux props', () => {
    it('has success piece of state as prop', () => {
        const success = true;
        const wrapper = setup({success});
        const successProp = wrapper.instance().props.success;
        expect(successProp).toBe(success);
    });

    it('`guessWord` action creator is a function prop', () => {
        const wrapper = setup();
        const guessWordProp = wrapper.instance().props.guessWord;
        expect(guessWordProp).toBeInstanceOf(Function);
    });
});

describe('`guessWord` action call', () => {
    let guessWordMock;
    let wrapper;
    const guessedWord = 'train';

    beforeEach(() => {
        guessWordMock = jest.fn();
        const setupProps = {success: false, guessWord: guessWordMock};
        wrapper = shallow(<UnconnectedInput {...setupProps} />);

        // add value to input box
        wrapper.instance().inputBox.current = {value: guessedWord};

        // simulate submit button click
        findByTestAttr(wrapper, 'submit-button').simulate('click', {preventDefault() {}});
    });

    it('calls `guessWord` action on submit button click', () => {
        const guessWordCallCount = guessWordMock.mock.calls.length;
        expect(guessWordCallCount).toBe(1);
    }); 

    it('calls `guessWord` with input value as argument', () => {
        const guessWordArg = guessWordMock.mock.calls[0][0];
        expect(guessWordArg).toBe(guessedWord);
    });

    it('input box clears on submit', () => {
        expect(wrapper.instance().inputBox.current.value).toBe('');
    });
});