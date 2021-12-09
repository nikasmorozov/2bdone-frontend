import {LOGIN} from "./UserModel";

export const setLogin = (
    user
) => ({
    type: LOGIN,
    user
})
