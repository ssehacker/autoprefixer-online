/**
 * Created by ssehacker on 2017/3/4.
 */
import React from 'react';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      css: '',
      html: ''
    };
  }

  componentDidMount() {
    hljs.configure({useBR: true});
  }

  handleChange(e) {
    const css = e.target.value;

    try {
      let parsedCSS = postcss([autoprefixer({browsers: ['last 2 version', '> 0.01%']})]).process(css).css;
      let res = hljs.highlightAuto(parsedCSS, ['css']);

      this.setState({
        css,
        html: res.value,
      });
    } catch (e) {
      console.log(e.message);
      this.setState({
        css,
      });
    }

  }

  render() {
    const me = this;
    const { handleChange } = this;
    const { css, html } = this.state;
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