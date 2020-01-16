export const SET_USER='SET_USER';
export const SET_LOCATION='SET_LOCATION';
export function setUser(user){
    return {
        type: SET_USER,
        user
    }
}

export function setLocation(location){
    return {
        type: SET_LOCATION,
        location
    }
}