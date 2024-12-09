import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={"333830921578-v9r64fljg0q7t2et5na507dlfqf57uha.apps.googleusercontent.com"}>
        <StrictMode>
            <App/>
        </StrictMode>
    </GoogleOAuthProvider>
)
