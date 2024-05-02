import { FC, useCallback, useEffect } from 'react';
import {
  CellButton,
  Group,
  InfoRow,
  Link,
  NavIdProps,
  Panel,
  Title,
} from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  Icon16Replay,
  Icon24Back,
  Icon24ExternalLinkOutline,
} from '@vkontakte/icons';
import { Comments } from '../../widgets/comments/comments';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { newsSlice } from '../../app/store/newsSlice';
import { getCommentsList, getNews } from './api';
import { getTime } from '../../app/utils/dateUtils';
const { getComments, get, loading } = newsSlice.actions;

import styles from './styles.module.css';

export const News: FC<NavIdProps> = ({ id }) => {
  const params = useParams<'id'>();
  const routeNavigator = useRouteNavigator();
  const { news } = useAppSelector((store) => store.news);
  const dispatch = useAppDispatch();
  const currentNew = news.find((item) => item.id === Number(params?.id));

  const getCurrentComments = useCallback(async () => {
      const comments = await getCommentsList(currentNew?.kids ?? []);
      dispatch(getComments({ id: currentNew?.id ?? 0, comments }));
  }, [currentNew?.id, currentNew?.kids, dispatch]);

  const getNewById = useCallback(async () => {
    if (!currentNew && !news.length) {
      dispatch(loading());
      const newById = await getNews(params?.id ?? '');
      dispatch(get([newById]));
    }
  }, [currentNew, dispatch, news, params?.id]);

  useEffect(() => {
    getNewById();
    if (!!currentNew?.kids?.length && !currentNew.comments?.length) {
      getCurrentComments();
    }
  }, [currentNew?.comments?.length, currentNew?.kids?.length, getCurrentComments, getNewById]);

  return (
    <Panel id={ id }>
      <Group className={ styles.group }>
        <CellButton
          onClick={ () => routeNavigator.push('/') }
          before={ <Icon24Back /> }
          mode='primary'
          className={ styles.btn }
        >
          Вернуться
        </CellButton>
        <Title level='1' style={{ marginBottom: 16 }}>
          { currentNew?.title }
        </Title>
        <InfoRow header='Автор'>{ currentNew?.by }</InfoRow>
        <InfoRow header='Дата публикации'>
          { `${ getTime(currentNew?.time ?? 0).date } ${ getTime(currentNew?.time ?? 0).time }` }
        </InfoRow>
        {
          currentNew?.url && (
            <InfoRow header='Ссылка на новость'>
              <Link href={currentNew?.url} target='_blank'>
                {currentNew?.url}
                <Icon24ExternalLinkOutline width={ 16 } height={ 16 } />
              </Link>
            </InfoRow>
          )
        }
        {
          currentNew?.kids?.length && (
            <InfoRow header='Комментарии'>{ currentNew?.kids?.length }</InfoRow>
          )
        }
        <CellButton
          onClick={ getCurrentComments }
          before={ <Icon16Replay /> }
          mode='primary'
          className={ styles.btn }
        >
          Обновить список комментариев
        </CellButton>
        {
          currentNew?.comments && (
            <Comments
              id={ currentNew?.id ?? 0 }
              kidsIds={ currentNew?.kids ?? [] }
              comments={ currentNew?.comments }
              isParent={ true }
            />
          )
        }
      </Group>
    </Panel>
  );
};
