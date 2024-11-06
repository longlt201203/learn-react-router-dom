import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import ErrorPage from './error-page';
import Contacts, { loader as contactsLoader } from './routes/contacts';
import EditContact, { action as editContactAction } from './routes/edit';
import { action as destroyAction } from "./routes/destroy";
import Index from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: 'contacts/:contactId',
        element: <Contacts />,
        loader: contactsLoader
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactsLoader,
        action: editContactAction
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
