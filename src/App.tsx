import './App.css';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { ChangeEvent, useEffect, useState } from 'react';

const ydoc = new Y.Doc();
const wsProvider = new WebsocketProvider(
  'ws://localhost:1234',
  'my-roomname',
  ydoc
);
const ymap = ydoc.getMap();

function App() {
  const [text, setText] = useState('');

  const ymapObserver = () => {
    setText(ymap.get('text') as string);
  };

  useEffect(() => {
    wsProvider.on('status', (event: any) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });

    ymap.observe(ymapObserver);

    return () => {
      ymap.unobserve(ymapObserver);
    };
  }, []);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    ymap.set('text', e.target.value);
  };

  return (
    <div className='container mt-4'>
      <textarea
        className='w-full h-60 bg-[#171026] text-cyan-300 p-4 text-base border-2 border-cyan-600 rounded-md'
        value={text}
        onChange={handleTextChange}
      ></textarea>
    </div>
  );
}

export default App;
