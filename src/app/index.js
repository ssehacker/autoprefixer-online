/**
 * Created by ssehacker on 2017/3/4.
 */
import React from 'react';
import Editor from './Editor';
import Filter from './Filter';

class App extends React.Component {

  render() {
    return (
      <div className="ws-app">
        <h1 className="ws-header">Autoprefixer CSS online</h1>
        <Filter />
        <Editor />
      </div>
    );
  }
}

export default App;