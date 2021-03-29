import { createStore } from '../createStore';

const initState = {
    count: 0
}

const reducer = (state = initState, action) => {
    if (action.type === 'ADD') {
        return {...state, count: state.count + 1}
    }
    return state
}

describe('createStore:', () => {
    let store;
    let subscribeHandler;
    beforeEach(() => {
        store = createStore(reducer, initState)
        subscribeHandler = jest.fn();
    })

    
    test('should return store object', () => {
        expect(store).toBeDefined()
        expect(store.dispatch).toBeDefined()
        expect(store.subscribe).toBeDefined()
        expect(store.getState).not.toBeUndefined()
    })

    test('should return object as a state', () => {
        expect(store.getState()).toBeInstanceOf(Object)
    })

    test('should return default state', () => {
        expect(store.getState()).toEqual(initState)
    })

    test('should change State if action exist', () => {
        store.dispatch({ type: 'ADD' })
        expect(store.getState().count).toBe(1)
    })

    test('should change State if action does not exist', () => {
        store.dispatch({ type: 'NOT_EXISTING_ACTION' })
        expect(store.getState().count).toBe(0)
    })

    test('should call subscriber function', () => {
        store.subscribe(subscribeHandler)
        store.dispatch({ type: 'ADD' })
        expect(subscribeHandler).toHaveBeenCalled()
        expect(subscribeHandler).toHaveBeenCalledWith(store.getState())
    })

    test('should NOT call subscribe if unsubscribe', () => {
        const sub = store.subscribe(subscribeHandler)
        sub.unsub()

        store.dispatch({ type: 'ADD' })
        expect(subscribeHandler).not.toHaveBeenCalled()
    })

    test('should dispatch in async way', () => {
        return new Promise(resolve =>{
            setTimeout(() => {
                store.dispatch({ type: 'ADD' })
            }, 500)
            setTimeout(() =>{
                expect(store.getState().count).toBe(1)
                resolve()
            }, 1000)
        })

    })
});
