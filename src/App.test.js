import React from 'react';
import {shallow} from 'enzyme';
import {storeFactory} from '../test/testUtils';
import App, {UnconnectedApp} from './App';

const setup = (state={}) => {
    const store = storeFactory(state);
    return shallow(<App store={store} />).dive();
}

describe('redux properties', () => {
    it('has access to `success` state', () => {
        const success = true;
        const wrapper = setup({success});
        const successProp = wrapper.instance().props.success;
        expect(successProp).toBe(success);
    });

    it('has access to `secretWord` state', () => {
        const secretWord = 'party';
        const wrapper = setup({secretWord});
        const secretWordProp = wrapper.instance().props.secretWord;
        expect(secretWordProp).toBe(secretWord);
    });

    it('has access to `guessedWords` state', () => {
        const guessedWords = [{guessedWord: 'train', letterMatchCount: 3}];
        const wrapper = setup({guessedWords});
        const quessedWordsProp = wrapper.instance().props.guessedWords;
        expect(quessedWordsProp).toEqual(guessedWords);
    });

    it('`getSecretWord` action creator is a function on the props', () => {
        const wrapper = setup();
        const getSecretWordProp = wrapper.instance().props.getSecretWord;
        expect(getSecretWordProp).toBeInstanceOf(Function);
    });
});

it('`getSecretWord` runs on App mount', () => {
    const getSecretWordMock = jest.fn();
    const setupProps = {
        success: false,
        guessedWords: [],
        getSecretWord: getSecretWordMock
    }

    const wrapper = shallow(<UnconnectedApp {...setupProps}/>);
    wrapper.instance().componentDidMount();

    const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
    expect(getSecretWordCallCount).toBe(1);
});


