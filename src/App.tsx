import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import { useEffect, useRef } from 'react';
import './App.css';
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'
import { WebsocketProvider } from 'y-websocket';

Quill.register('modules/cursors', QuillCursors);

function App() {
  const quillRef = useRef<Quill | null>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!quillRef.current) {
      
      const quill = new Quill(editorRef.current!, {
        modules: {
          cursors: true,
          toolbar: [
            // adding some basic Quill content features
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
          ],
          history: {
            userOnly: true,
          },
        },
        placeholder: 'Start collaborating...',
        theme: 'snow', 
      });
      const ydoc = new Y.Doc()
  
      const provider = new WebsocketProvider(
        'ws://localhost:1234', 'my-editor ', ydoc
      )
  
      const ytext = ydoc.getText('quill')
  
      const binding = new QuillBinding(ytext, quill)

      quillRef.current = quill
    }
  }, []);

  return (
    <div className='container mt-4'>
      <div id='editor' className='h-60 text-base text-cyan-300' ref={editorRef} />
    </div>
  );
}

export default App;
