import { FC, useCallback, useEffect } from 'react';
import {
  Card,
  CellButton,
  Link,
  NavIdProps,
  Panel,
  Text,
  Title,
} from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon16Replay, Icon24Back, Icon24ExternalLinkOutline } from '@vkontakte/icons';
import { newsSlice } from '../store/newsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCommentsList, getNews } from '../api';
import { Comments } from '../components/comments/comments';

export const News: FC<NavIdProps> = ({ id }) => {
  const params = useParams<'id'>();
  const routeNavigator = useRouteNavigator();
  const { news } = useAppSelector((store) => store.news);
  const dispatch = useAppDispatch();
  const { getComments, get, loading } = newsSlice.actions;
  const currentNew = news.find((item) => item.id === Number(params?.id));

  const getCurrentComments = useCallback(async () => {
    if(currentNew?.kids?.length) {
        const comments = await getCommentsList(currentNew?.kids ?? []);
        dispatch(getComments({id: currentNew?.id ?? 0, comments})); 
    }
  }, [currentNew?.id, currentNew?.kids, dispatch, getComments]);

  const getNewById = useCallback(async() => {
    if(!currentNew && !news.length) {
        dispatch(loading());
        const newById = await getNews(params?.id ?? '');
        dispatch(get([newById]));
    }
  }, [currentNew, dispatch, get, loading, params?.id])

  useEffect(() => {
    getNewById();
    getCurrentComments();
  }, [getCurrentComments, getNewById])

  return (
    <Panel id={id}>
      <Card>
        <CellButton
          onClick={() => routeNavigator.push('/')}
          before={<Icon24Back />}
          mode='primary'
          style={{ width: '50%' }}
        >
          Вернуться
        </CellButton>
        <CellButton
          onClick={getCurrentComments}
          before={<Icon16Replay />}
          mode='primary'
          style={{ width: '50%' }}
        >
          Обновить список комментариев
        </CellButton>
        <Title level='1' style={{ marginBottom: 16 }}>
          {currentNew?.title}
        </Title>
        <Text>Автор: {currentNew?.by}</Text>
        <Text>Дата: {new Date(currentNew?.time ?? 0).toLocaleDateString('ru-Ru')}</Text>
        {
            currentNew?.kids?.length && <Text>Комментарии: {currentNew?.kids?.length}</Text>
        }
        {
            currentNew?.url && <Link href={`${currentNew?.url}`} target='_blank'>
                {currentNew?.url} <Icon24ExternalLinkOutline width={16} height={16} />
            </Link>
        }
        <Comments
            id={currentNew?.id ?? 0}
            kidsIds={currentNew?.kids ?? []}
            comments={currentNew?.comments}
            isParent={true}
        />
      </Card>
      {/* <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Persik
      </PanelHeader>
      <Placeholder>
        <img width={230} src={PersikImage} alt="Persik The Cat" />
      </Placeholder> */}
    </Panel>
  );
};
