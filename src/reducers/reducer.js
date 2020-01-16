import { SET_USER, SET_LOCATION} from '../actions/action.js';
import {combineReducers} from 'redux'; 
const initialState ={
    detail:{
        name:'',
        email:'',
        phoneNo:'',
        isLoggedIn:false,
        
    },
    location:{},
    userCollaborations:[]
}



function user(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return Object.assign({},state,{
                detail:{
                    ...action.user
                }
            })
        case SET_LOCATION:
            return Object.assign({},state,{...action.location
            })
        default: return state 
    }
}

const appReducers = combineReducers({
    user
});
export default appReducers; 