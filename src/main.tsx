import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Fallback from './components/Fallback/Fallback.tsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { SearchContextProvider } from './context/SearchContext.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';

const $root = document.getElementById('root');

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Fallback />}></Route>
  )
);

if ($root) {
  createRoot($root).render(
    <StrictMode>
      <ErrorBoundary fallback={<Fallback />}>
        <SearchContextProvider>
          <RouterProvider router={router} />
        </SearchContextProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
