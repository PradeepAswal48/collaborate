import {store} from '../store.js';
import { setLocation } from '../actions/action.js'


function stateChange(){
    console.log(store.getState());
} 
export function getLocation(){
    if(window.navigator.geolocation){
        window.navigator.geolocation.getCurrentPosition(function(location){
            store.dispatch(setLocation(location));
            return location;
        })
    }
    else{
        console.log("doesn't support location. please manually enter the location.");
    }
}

store.subscribe(stateChange);
