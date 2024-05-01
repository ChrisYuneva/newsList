import { useState, useEffect, ReactNode } from 'react';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { News } from './panels/News';
import { useAppSelector } from './store/hooks';

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
        <View activePanel={activePanel}>
          <Home id="home" />
          <News id="news" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
