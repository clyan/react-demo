/**
 * @description 项目主入口
 * @author clyan
 */

import ReactDOM from 'react-dom/client'
import App from './App'
import './app.css'
import './styles/uno.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

root.render(<App />)
