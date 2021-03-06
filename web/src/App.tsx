import React, { useEffect, useState } from 'react';
import { API_ENDPOINT } from './api';

const useMe = () => {
  const [state, setState] = useState<{ name: string; now: number }>();
  useEffect(() => {
    (async () => {
      const resp = await fetch(`${API_ENDPOINT}/api/me`);
      if (resp.ok) {
        const data = await resp.json();
        setState(data);
      } else {
        setState(undefined);
        console.error(await resp.text());
      }
    })();
  }, []);

  return state;
};

export const App = () => {
  const data = useMe();

  return (
    <main>
      <h1>Hello World</h1>

      <p>
        Hello, {data?.name}. It is{' '}
        {data ? new Date(data?.now).toLocaleString() : undefined} now.
      </p>
    </main>
  );
};
