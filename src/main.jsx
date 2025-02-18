import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProviders from './authentication/firebase/Providers/AuthProviders';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <QueryClientProvider client={queryClient}>
        <div className='bg-white'>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProviders>
  </StrictMode>,
)
