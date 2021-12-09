import {combineReducers, createStore} from "redux";
import userReducer from "./User/UserReducer";

const rootReducer = combineReducers({
    user: userReducer,
})

const preloadState = () => ({

})

const constructStore = () => {
    const store = createStore(
        rootReducer,
        preloadState(),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    return store;
}

const store = constructStore()

export default store
