/**
 * Created by ssehacker on 2017/3/4.
 */
import React from 'react';
import Footer from 'ws-footer';
import Editor from './Editor';
import Filter from './Filter';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'last 2 version,> 1%',
    };
  }

  handleFilterChange(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  render() {
    const me = this;
    const { filter } = me.state;
    const { handleFilterChange } = me;
    return (
      <div className="ws-app">
        <h1 className="ws-header">Autoprefixer CSS online</h1>
        <Filter value={filter} onBlur={handleFilterChange.bind(me)} />
        <Editor filter={filter} />
        <Footer />
      </div>
    );
  }
}

export default App;