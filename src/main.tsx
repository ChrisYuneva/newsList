import { createRoot } from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';

import { Provider } from 'react-redux';
import { AppConfig } from './app/AppConfig.tsx';
import { store } from './app/store/store.ts';


vkBridge.send('VKWebAppInit');

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppConfig />
  </Provider>
);

if (import.meta.env.MODE === 'development') {
  import('./app/eruda.ts');
}
