/**
 * Created by ssehacker on 2017/3/4.
 */
import React from 'react';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

class Editor extends React.Component {

  static propTypes = {
    filter: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      css: '',
    };
  }

  componentDidMount() {
    hljs.configure({useBR: true});
  }

  parseCSS(css, filter) {
    var isBrowser=new Function("try {return this===window;}catch(e){ return false;}");

    if(!isBrowser()) {
      return '';
    }

    try {
      let parsedCSS = postcss([autoprefixer({browsers: filter.split(',')})]).process(css).css;
      let res = hljs.highlightAuto(parsedCSS, ['css']);

      return res.value;
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }

  handleChange(e) {
    this.setState({
      css: e.target.value,
    });
  }

  render() {
    const me = this;
    const { handleChange } = this;
    const { css } = this.state;
    const html = me.parseCSS(css, me.props.filter);
    return (
      <div className="ws-editor">
        <div className="ws-editor-input">
          <textarea key="editor" value={css} onChange={handleChange.bind(me)} />
        </div>
        <pre className="ws-editor-preview">
          <code dangerouslySetInnerHTML={{__html: html}}></code>
        </pre>
      </div>
    )
  }
}

export default Editor;