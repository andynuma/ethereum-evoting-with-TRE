import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Voter from '../src/components/voter/Voter';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import Home from './components/Home';
import Organizer from './components/organizer/Organizer';
import web3 from '../src/web3/provider';
import { Provider, Store } from './reducers/store';
import Sample from './contracts/Sample';
import Spinner from './components/Spinner';
import Result from './components/Result/Result';
import Decrypt from './components/Decrypt/Decrypt';
import CheckTimeKey from './components/check/CheckTimeKey';

const Root = props => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    setContract();
    props.history.push('/home');
    console.log({
      state
    });
  }, []);

  const setContract = async () => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Sample.networks[networkId];
    const instance = new web3.eth.Contract(
      Sample.abi,
      deployedNetwork.address,
      {
        from: web3.eth.defaultAccount
      }
    );
    console.log('Contract Instance :', instance);
    // StoreにContractを格納
    await dispatch({
      type: 'SET_CONTRACT',
      payload: instance
    });
  };

  return state.isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route path="/home" component={Home} />{' '}
      <Route path="/organizer" component={Organizer} />{' '}
      <Route exact path="/" component={Voter} />{' '}
      <Route path="/result" component={Result} />{' '}
      <Route path="/decrypt" component={Decrypt} />{' '}
      <Route path="/check" component={CheckTimeKey} />{' '}
      {/* <Redirect path="/home"/> */}{' '}
    </Switch>
  );
};

const RootWithRouter = withRouter(Root);

ReactDOM.render(
  <Provider>
    <Router>
      <RootWithRouter />
    </Router>{' '}
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
