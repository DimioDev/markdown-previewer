import React from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import './App.css';

const renderer = new marked.Renderer();
renderer.link = function (href, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div className="editorWrap">
          <div className="toolbar">Text Input Here:</div>
          <textarea
            id="editor"
            markdown={this.state.markdown}
            onChange={this.handleChange}
            type="text"
            value={this.state.markdown}
          />
        </div>
        <div className="converter" />
        <div className="previewWrap">
          <div className="toolbar">Markdown Preview:</div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                marked(this.state.markdown, { renderer: renderer })
              ),
            }}
            id="preview"
          />
        </div>
      </div>
    );
  }
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


# Markdown Previewer by Dimitar Odrinski for:
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export default App;
