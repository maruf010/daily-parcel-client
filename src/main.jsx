import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './Routes/Routes.jsx';
import Aos from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-[#EAECED] lg:pt-5 '>
      <div className='font-urbanist '>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </div>
  </StrictMode>,
)
