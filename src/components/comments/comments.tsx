import { FC, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { newsSlice } from '../../store/newsSlice';
import { getCommentsList } from '../../api';
import { Text } from '@vkontakte/vkui';
import { Story } from '../../api/types';

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
    if (kidsIds.length) {
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
        <div style={ { marginLeft: '8px' } }>
            <Text onClick={() => getKidsCommentsKids(comment.id, comment?.kids ?? [])}>{comment.text}</Text>
            { renderTreeComments(comment.comments) }
        </div>
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
