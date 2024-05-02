import { FC, useCallback, useEffect } from 'react';
import {
  Panel,
  Group,
  NavIdProps,
  CardGrid,
  CellButton,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon16Replay } from '@vkontakte/icons';
import { NewsCard } from '../../../shared/newsCard/ui/newsCard';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { newsSlice } from '../../../app/store/newsSlice';
import { getNewsList } from '../api';

import styles from './styles.module.css';

const { loading, get } = newsSlice.actions;

export const Home: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const dispatch = useAppDispatch();
  const { news } = useAppSelector(store => store.news);

  const getNews = useCallback(async() => {
    dispatch(loading());
    const news = await getNewsList();
    dispatch(get(news));
  }, [dispatch])

  useEffect(() => {
    if(news.length < 2) {
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
    <Panel id={ id }>
      <Group>
        <CardGrid size='l'>
          <CellButton
            onClick={ getNews }
            before={ <Icon16Replay /> }
            mode="primary"
            className={ styles.btn }
          >
            Обновить список новостей
          </CellButton>
          {
            news.map((item) => (
              <NewsCard 
                title={ item.title ?? '' } 
                score={ item.score ?? 0 } 
                by={ item.by ?? '' } 
                time={ item.time ?? 0 } 
                onClick={ () => routeNavigator.push(`/news/${item.id}`) }
                key={ item.id}  
              />
            ))
          }
        </CardGrid>
      </Group>
    </Panel>
  );
};
