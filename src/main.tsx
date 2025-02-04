import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SearchContextProvider } from './context/SearchContext.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';

const $root = document.getElementById('root');

if ($root) {
  createRoot($root).render(
    <StrictMode>
      <ErrorBoundary fallback="test">
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
