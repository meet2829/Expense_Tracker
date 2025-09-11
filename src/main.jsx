import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store.js'
import Democontext from "./context/Democontext"; //

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Democontext>
        <Provider store={store}>
      <PersistGate loading={<p>Loading.....</p>} persistor={persistor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </PersistGate>
    </Provider>
     </Democontext>
  </StrictMode>,
)
