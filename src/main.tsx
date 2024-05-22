'use client'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './css/index.css'
import './css/reset.css'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { ConfigProvider } from 'antd';
import config from './theme/index.ts'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorModal from './component/ErrorModal/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={config.theme} prefixCls={config.prefixCls}>
    <Provider store={store}>
      <ErrorBoundary fallbackRender={ErrorModal}>
        <App />
      </ErrorBoundary>
    </Provider>
  </ConfigProvider>
)
