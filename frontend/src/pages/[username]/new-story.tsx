import React from 'react';

import Editor from 'react-medium-editor';
// To be protected by auth

export default function NewStory1() {
  const [title, setTitle] = React.useState('title');
  const [body, setBody] = React.useState('content');
  return (
    <main>
      <div style={{ display: 'flex' }}>
        <Editor
          style={{
            border: '0.5px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            margin: 5,
            width: '100%',
          }}
          tag='pre'
          text={title}
          onClick={() => {
            if (title === 'Title') setTitle('');
          }}
          onChange={(e) => {
            setTitle(e);
          }}
          options={{
            toolbar: {
              buttons: ['bold', 'h2'],
              allowMultiParagraphSelection: true,
            },
          }}
        />
      </div>

      <div style={{ display: 'flex' }}>
        <Editor
          style={{
            border: '0.5px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            margin: 5,
            width: '100%',
          }}
          tag='pre'
          text={body}
          onChange={(e) => {
            setBody(e);
          }}
          options={{
            toolbar: {
              //   buttons: ['bold', 'italic', 'underline', 'anchor', 'h3', 'quote'],
              diffLeft: 0,
              diffTop: -10,
              firstButtonClass: 'medium-editor-button-first',
              lastButtonClass: 'medium-editor-button-last',
              relativeContainer: null,
              standardizeSelectionStart: false,
              static: false,
            },
          }}
        />
      </div>
    </main>
  );
}
