import { createRoot } from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';
import { AppConfig } from './AppConfig.tsx';

import { store } from './store/store.ts';
import { Provider } from 'react-redux';


vkBridge.send('VKWebAppInit');

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppConfig />
  </Provider>
);

if (import.meta.env.MODE === 'development') {
  import('./eruda.ts');
}
