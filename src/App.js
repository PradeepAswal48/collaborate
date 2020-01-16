import React from 'react';
import './App.css';
import CollaborationList from './components/CollaborationList.js';
import Login from './components/Login.js';
import './firebase/firebase.js';
import {connect} from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PermIdentitySharpIcon from '@material-ui/icons/PermIdentitySharp';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {getLocation} from './utils/location.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      showLoginForm:false,
      listSection: true,
      signingAction:undefined,
      location:getLocation()
    };
    document.addEventListener('click',this.hideLoginform.bind(this));
  }
  hideLoginform(event){
    //console.log('hide the menu');
    if(this.state.showLoginForm && this.refs.login && event.target === this.refs.login.firstChild){
      this.setState({showLoginForm:false}) 
    }
  }

 
  render() {
    return (
      <div className="App">
        <span ref="login" className={this.state.showLoginForm ? '':'hide'}><Login signingAction={this.state.signingAction}></Login></span>
        <div className="App-header">
          <div className="App-heading">
            <span>COLLABORATE</span>
          </div>
          <div className="default-flex">
            <LocationOnIcon/>{this.state.location ? this.state.location.coords.latitude +'' + this.state.location.coords.latitude.longitude : ''}
          </div>
          <div className="App-header-actions">
            <div className="App-menu">
              <span  className={this.props.state.user.detail.isLoggedIn ? 'hide':'default-flex'} onClick={() => this.setState({showLoginForm: true, signingAction:'logIn'})}>
                <span className="icon-holder"><PermIdentitySharpIcon/></span>
              </span>
              <span className={this.props.state.user.detail.isLoggedIn ? 'default-flex':'hide'}>
                 Hi {this.props.state.user.detail.name} !! 
                 <span className="icon-holder" title={this.props.state.user.detail.name}><AccountCircleIcon/></span>
                |<span className="icon-holder" title="Log Out" onClick={() => {if(!this.state.signingAction!=='logOut'){this.setState({signingAction: 'logOut'})}else{alert('already signed out')}}}><ExitToAppIcon/></span></span>
            </div>
          </div>

        </div>
        <div className="App-content">
          <div className="App-section">
            <div className="section selected">
              Collabotaion near you
          </div>
            <div className="section">
              On Going Collabotaions
          </div>
          </div>
          <div id="firebaseui-auth-container" className="section-content">
            {this.state.listSection  ? <CollaborationList></CollaborationList> : <user-collaborations></user-collaborations>}
          </div>
        </div>
        <div className="footer">
          <span>
            copyright msg
          </span>
          <span>
            feboo:insta:twitter:more
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  state: state
  }
}
export default  connect(mapStateToProps)(App);
