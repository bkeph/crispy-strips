import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('test auth reducer', () => {
    it('should output the initial reducer', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            localId: null,
            error: null,
            loading: false
        });
    });

    it('should update reducer with userId and idToken', () => {
        expect(reducer({
            token: null,
            localId: null,
            error: null,
            loading: false
        }, {
            type: actionTypes.AUTH,
            idToken: 'some-id-token',
            localId: 'some-local-id'
        })).toEqual({
            token: 'some-id-token',
            localId: 'some-local-id',
            error: null,
            loading: false
        });
    });
});

