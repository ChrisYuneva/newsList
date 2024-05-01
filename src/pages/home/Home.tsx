import { FC, useCallback, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  NavIdProps,
  CardGrid,
  CellButton,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon16Replay } from '@vkontakte/icons';
import { NewsCard } from '../../shared/newsCard/newsCard';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { newsSlice } from '../../app/store/newsSlice';
import { getNewsList } from './api';

export const Home: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const dispatch = useAppDispatch();
  const { news } = useAppSelector(store => store.news);
  const { loading, get } = newsSlice.actions;

  const getNews = useCallback(async() => {
    dispatch(loading());
    const news = await getNewsList();
    dispatch(get(news));
  }, [dispatch, get, loading])

  useEffect(() => {
    if(news.length < 2) {
      console.log('first')
      getNews();
    }
    const timer = setInterval(() => {
      getNews();
    }, 60 * 1000)

    return () => {
      clearInterval(timer);
    }
  }, [getNews, news.length]);

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      
      <Group>
      <CellButton onClick={getNews} before={<Icon16Replay />} mode="primary">
        Обновить список новостей
      </CellButton>
        <CardGrid size='l'>
          {
            news.map((item) => (
              <NewsCard 
                title={item.title} 
                score={item.score} 
                by={item.by} 
                time={item.time} 
                onClick={() => routeNavigator.push(`/news/${item.id}`)}
                key={item.id} 
              />
            ))
          }
        </CardGrid>
      </Group>
    </Panel>
  );
};
