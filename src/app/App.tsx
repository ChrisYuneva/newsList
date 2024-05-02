import { useState, useEffect, ReactNode } from 'react';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { DEFAULT_VIEW_PANELS } from './routes';
import { useAppSelector } from './store/hooks';
import { Home, News } from '../pages';

import styles from './styles.module.css';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);
  const { isLoading } = useAppSelector(state => state.news);

  useEffect(() => {
    if(isLoading) {
      setPopout(<ScreenSpinner size="large" />);
    }
    else {
      setPopout(null);
    }
  }, [isLoading])

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel} className={styles.panel}>
          <Home id="home" />
          <News id="news" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
