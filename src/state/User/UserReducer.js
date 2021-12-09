import {LOGIN} from "./UserModel";

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return action.user
        default:
            return state
    }
}

export default userReducer
