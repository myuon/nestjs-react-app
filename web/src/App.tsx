import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getApiEndpoint } from './util';

interface Me {
  name: string;
  now: number;
}

const useMe = () => {
  const [state, setState] = useState<Me>();
  useEffect(() => {
    (async () => {
      const resp = await fetch(`${getApiEndpoint()}/me`);
      if (resp.ok) {
        setState(await resp.json());
      } else {
        console.error(await resp.text());
      }
    })();
  }, []);

  return state;
};

function App() {
  const [count, setCount] = useState(0);
  const me = useMe();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello {me?.name}, it is {me?.now && new Date(me.now).toISOString()}{' '}
          now.
        </p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
