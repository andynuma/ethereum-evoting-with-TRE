import React,{ useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router,Switch, Route,Redirect,withRouter } from "react-router-dom"
import Home from "./components/Home"
import Organizer from "./components/organizer/Organizer"

const Root = (props) => {

  useEffect(() => {
    props.history.push("/home")
  },[])

  return(
    <Switch>
      <Route path="/home" component={Home}/>
      <Route path="/organizer" component={Organizer} />
      <Route exact path="/" component={App}/>
      {/* <Redirect path="/home"/> */}
    </Switch>
  )
}

const RootWithRouter = withRouter(Root)

ReactDOM.render(
<Router>
  <RootWithRouter/>
</Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
