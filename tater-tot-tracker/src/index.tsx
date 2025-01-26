import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <App />
    <footer className="footer">
      <p>
        Check out the source code on{' '}
        <a
          href="https://github.com/edjineer/TaterTotTracker"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  </React.StrictMode>,
);
