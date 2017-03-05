/**
 * Created by ssehacker on 2017/3/5.
 */
import React from 'react';

class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const me = this;
    const { handleChange } = me;
    const { value } = this.state;
    return (
      <div className="ws-filter">
        <span>Filter</span>
        <input value={value} onChange={handleChange.bind(me)} />
      </div>
    )
  }
}

export default Filter;