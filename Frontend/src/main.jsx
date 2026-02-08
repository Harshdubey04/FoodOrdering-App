import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux';
import appStore from './utils/Store/appStore';
import ThemeProvider from './Contexts/ThemeContext';

createRoot(document.getElementById('root')).render(

    <ThemeProvider>
        <Provider store={appStore}>
        <BrowserRouter>
        <App/>
        </BrowserRouter>
        </Provider>
    </ThemeProvider>
)
