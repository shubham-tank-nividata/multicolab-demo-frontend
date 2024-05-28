import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import * as Y from 'yjs';
import { Awareness, QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';

type User = {
  id: number;
  name: string;
  color: string;
};

Quill.register('modules/cursors', QuillCursors);

function App() {
  const providerRef = useRef<WebsocketProvider | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const currentUserColor = useMemo(
    () => usercolors[Math.floor(Math.random() * usercolors.length)],
    []
  );

  const handleUsernameChange = (username: string) => {
    if (providerRef.current) {
      providerRef.current.awareness.setLocalStateField('user', {
        name: username || 'Guest',
        color: username ? currentUserColor : '#aa1111',
      });
    }
  };

  const handleAwarenessChange = (awareness: Awareness) => {
    const updatedUsers: User[] = [];

    for (let [id, state] of awareness.getStates().entries()) {
      if (state.user) {
        updatedUsers.push({ id, ...state.user });
      }
    }

    setOnlineUsers(updatedUsers);
  };

  useEffect(() => {
    if (!providerRef.current) {
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
        placeholder: 'Type here...',
        theme: 'snow',
      });

      const ydoc = new Y.Doc();

      const provider = new WebsocketProvider(
        import.meta.env.VITE_WEBSOCKET_SERVER_URL,
        'my-editor ',
        ydoc
      );
      providerRef.current = provider;
      const awareness = provider.awareness;

      awareness.on('change', () => handleAwarenessChange(awareness));

      const ytext = ydoc.getText('quill');

      new QuillBinding(ytext, quill, awareness); // binding

      handleUsernameChange('');
    }
  }, []);

  return (
    <div className='container mt-6'>
      <div className='flex mb-5 gap-4 items-center'>
        <span className='text-green-500'>Online:</span>
        <ul className='flex gap-4'>
          {onlineUsers.map((user, index) => (
            <li
              key={index}
              className='text-xs p-1 px-2 text-white rounded'
              style={{
                backgroundColor: user.color,
              }}
            >
              <span className='[text-shadow:_0_0_20px_black]'>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className='mb-5 flex'>
        <input
          type='text'
          placeholder='Username'
          className='text-base text-cyan-300 bg-inherit border-2 border-cyan-700 py-1 px-2 focus-visible:outline-none focus-visible:border-cyan-400 rounded placeholder:text-[rgb(49,103,110)]'
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
      </div>

      <div
        id='editor'
        className='h-60 text-base text-cyan-300 p-4 box-content rounded-b-xl !border-none'
        ref={editorRef}
      />
    </div>
  );
}

export default App;

export const usercolors = [
  '#30bced',
  '#6eeb83',
  '#ffbc42',
  '#ecd444',
  '#ee6352',
  '#9ac2c9',
  '#8acb88',
  '#1be7ff',
];
