/**
 * Created by ssehacker on 2017/3/5.
 */
import React from 'react';
import classnames from 'classnames';

class Filter extends React.Component {

  static propTypes = {
    onBlur: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      show: false,
    };
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  help() {
    this.setState({
      show: true,
    });
  }

  close() {
    this.setState({
      show: false,
    });
  }

  render() {
    const me = this;
    const { handleChange, help, close } = me;
    const { value, show } = me.state;
    const { onBlur } = me.props;
    return (
      <div className="ws-filter">
        <span>Filter</span>
        <input value={value}
         onChange={handleChange.bind(me)}
         onBlur={onBlur}
        />
        <a onClick={help.bind(me)}>Rule?</a>
        <div className={classnames({'ws-filter-help': true, 'ws-hidden': !show})}>
          <div className="ws-filter-help-bg"></div>
          <div className="ws-filter-help-content">
            <h3>You can specify the versions by queries (case insensitive):<a title="close" onClick={close.bind(me)}>X</a></h3>
            <div className="ws-filter-help-body">
              <ul>
                <li><code>last 2 versions</code>: the last 2 versions for each major browser.</li>
                <li><code>last 2 Chrome versions</code>: the last 2 versions of Chrome browser.</li>
                <li><code>&gt; 5%</code>: versions selected by global usage statistics.</li>
                <li><code>&gt; 5% in US</code>: uses USA usage statistics. It accepts two-letter country code.</li>
                <li><code>&gt; 5% in my stats</code>: uses custom usage data.</li>
                <li><code>ie 6-8</code>: selects an inclusive range of versions.</li>
                <li><code>Firefox &gt; 20</code>: versions of Firefox newer than 20.</li>
                <li><code>Firefox &gt;= 20</code>: versions of Firefox newer than or equal to 20.</li>
                <li><code>Firefox &lt; 20</code>: versions of Firefox less than 20.</li>
                <li><code>Firefox &lt;= 20</code>: versions of Firefox less than or equal to 20.</li>
                <li><code>Firefox ESR</code>: the latest [Firefox ESR] version.</li>
                <li><code>iOS 7</code>: the iOS browser version 7 directly.</li>
                <li><code>not ie &lt;= 8</code>: exclude browsers selected before by previous queries. You can add not to any query.</li>
              </ul>
              <p>Browserslist works with separated versions of browsers. You should avoid queries like <code>Firefox > 0</code>.Multiple criteria are combined as a boolean <code>OR</code>. A browser version must match at least one of the criteria to be selected.</p>
              <p>All queries are based on the Can I Use support table, e.g. <code>last 3 iOS versions</code> might select 8.4, 9.2, 9.3 (mixed major and minor), whereas <code>last 3 Chrome versions</code> might select 50, 49, 48 (major only).</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Filter;