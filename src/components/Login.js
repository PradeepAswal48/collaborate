import React from 'react';
import '../App.css';
import 'firebaseui/dist/firebaseui.css'
import firebase from "firebase/app";
import { connect } from 'react-redux';
import { setUser } from '../actions/action.js';
import {createNewUser} from '../utils/database.js';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        
    }

    componentDidMount() {
        
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                //user is still signed in, checking if user instance is present in redux..
                if (!this.props.user.isLoggedIn) {
                    //if not..update redux..    
                    let userDetail = {};
                    userDetail.name = user.displayName;
                    userDetail.email = user.email;
                    userDetail.phone = user.phoneNumber;
                    userDetail.isLoggedIn = true;
                    this.props.dispatch(setUser(userDetail));
                    
                    return false; 
                } 
                console.log('user signed in');
            } else {
                console.log('user logged out');
            }
            // eslint-disable-next-line
        }.bind(this));
    }
    singIn() {
        var firebaseui = require('firebaseui');
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    let userDetail = {};
                    userDetail.name = authResult.user.displayName;
                    userDetail.email = authResult.user.email;
                    userDetail.phone = authResult.user.phoneNumber;
                    userDetail.isLoggedIn = true;
                    this.props.dispatch(setUser(userDetail));
                    createNewUser(authResult.user);
                    return false;
                    // eslint-disable-next-line 
                }.bind(this),
                uiShown: function () {
                    //document.getElementById('loader').style.display = 'none';
                }
            },
            signInFlow: 'popup',
            signInSuccessUrl: false,
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: function (data) {
                console.log('sign in success')
            },
            // Privacy policy url.
            privacyPolicyUrl: function (data) {
                console.log('sign in success')
            }
        };

        if (firebaseui.auth.AuthUI.getInstance()) {
            const ui = firebaseui.auth.AuthUI.getInstance()
            ui.start('#loginFormContainer', uiConfig);
        } else {
            const ui = new firebaseui.auth.AuthUI(firebase.auth())
            ui.start('#loginFormContainer', uiConfig);
        }



    }

    singOut(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            if(this.props.user.isLoggedIn){
                let userDetail = {};
                userDetail.name = '';
                 userDetail.email = '';
                 userDetail.phone = '';
                userDetail.isLoggedIn = false;
                this.props.dispatch(setUser(userDetail));
            } 
            
          }.bind(this), function(error) {
            // An error happened.
          });
    }
    render() {
        return (
            <div id="loginFormModal" className="loginFormModal" ref="loginFormModal">
                <div id="loginFormContainer" className="loginFormContainer">
                    {this.props.signingAction=== "logIn" ? this.singIn(): this.singOut()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user.detail
    }
}
export default connect(mapStateToProps)(Login);