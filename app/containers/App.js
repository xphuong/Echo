import React from 'react';
import { connect } from 'react-redux';
import { Nav, Analyzer } from '../components';
import { ToastContainer } from 'react-toastify';
import Websocket from '../websocket';
import * as Containers from './';

class App extends React.Component {
  componentDidMount() {
    this.websocket = new Websocket();
    this.websocket
      .init()
      .then(_ => this.websocket.addSongToQueue(68));
  }

  render() {
    const { showPlayer, showAnalyzer: show, showQueue, slideInRight } = this.props;
    const className = `container animated ${slideInRight && 'slideInRight'}`;

    return (
      <div>
        <Nav auth={this.props.auth} dispatch={this.props.dispatch} />
        <div className={className}>
          {this.props.children}
          <Analyzer show={show}/>
        </div>
        <Containers.Queue show={showQueue}/>
        { showPlayer ? <Containers.Player /> : null }
        <Containers.Modal />
        <ToastContainer
          position="top-right"
          autoClose={1000}
        />
      </div>
    );
  }
}

function mapStateToProps({ songData, UIState, auth }) {
  const { showQueue, showAnalyzer, slideInRight } = UIState;

  return {
    showPlayer: Object.keys(songData.data).length,
    showAnalyzer,
    showQueue,
    slideInRight,
    auth,
  };
}

export default connect(mapStateToProps)(App);
