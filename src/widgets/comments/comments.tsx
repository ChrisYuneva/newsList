import { FC, useCallback, useEffect } from 'react';
import { Button, Group, InfoRow, SimpleCell, Text } from '@vkontakte/vkui';
import { useAppDispatch } from '../../app/store/hooks';
import { Story, newsSlice } from '../../app/store/newsSlice';
import { getCommentsList } from '../../pages/news/api';

import styles from './styles.module.css';

interface CommentsProps {
  id: number;
  kidsIds: number[];
  isParent?: boolean;
  comments?: Story[];
}

export const Comments: FC<CommentsProps> = ({ id, kidsIds, isParent, comments }) => {
  const dispatch = useAppDispatch();
  const { getComments } = newsSlice.actions;

  const getCommentsKids = useCallback(async(id: number, kidsIds: number[]) => {
    if (kidsIds.length && !comments?.length) {
        const comments = await getCommentsList(kidsIds);
        dispatch(getComments({ id, comments }));
      }
  }, [dispatch, getComments]);

  const getKidsCommentsKids = async (id: number, kidsIds: number[]) => {
    if (kidsIds.length) {
        const comments = await getCommentsList(kidsIds);
        dispatch(getComments({ id, comments }));
      }
  }

  useEffect(() => {
    if(isParent) {
        getCommentsKids(id, kidsIds);
    }
  }, [getCommentsKids, id, isParent, kidsIds]);

  const renderTreeComments = (comments?: Story[]) => (
    <div>
      {comments?.map((comment) => (
        <Group className={styles.group} key={comment.id} mode='plain'>
          {
            comment.text && (
              <SimpleCell className={styles.cell}>
                <InfoRow header={comment.by}>
                  <Text>{comment.text}</Text>
                </InfoRow>
                {
                  comment?.kids && (
                    <Button mode='link' onClick={() => getKidsCommentsKids(comment.id, comment?.kids ?? [])}>Ответы</Button>
                  )
                }
              </SimpleCell>
            ) 
          }
            { renderTreeComments(comment.comments) }
        </Group>
      ))}
    </div>
  )

  return (
    <div>
        {
            renderTreeComments(comments)
        }
    </div>
  );
};
