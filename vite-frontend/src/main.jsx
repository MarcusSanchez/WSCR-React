import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.jsx'
import Nav from './components/Nav/Nav.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Nav />
        <App/>
    </React.StrictMode>,
)
