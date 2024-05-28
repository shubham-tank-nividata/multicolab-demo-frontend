import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import { useEffect, useRef } from 'react';
import './App.css';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';

Quill.register('modules/cursors', QuillCursors);

function App() {
  const quillRef = useRef<Quill | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

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
      const ydoc = new Y.Doc();
      console.log(import.meta.env.VITE_WEBSOCKET_SERVER_URL)
      new WebsocketProvider(
        import.meta.env.VITE_WEBSOCKET_SERVER_URL,
        'my-editor ',
        ydoc
      ); // provider

      const ytext = ydoc.getText('quill');

      new QuillBinding(ytext, quill); // binding

      quillRef.current = quill;
    }
  }, []);

  return (
    <div className='container mt-4'>
      <div
        id='editor'
        className='h-60 text-base text-cyan-300'
        ref={editorRef}
      />
    </div>
  );
}

export default App;
