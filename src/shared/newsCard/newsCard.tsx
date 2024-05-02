import { Card, InfoRow, Title } from '@vkontakte/vkui';
import { FC } from 'react';

import styles from './styles.module.css';
import { getTime } from '../../app/utils/dateUtils';

interface NewsCardProps {
    title: string,
    score: number,
    by: string,
    time: number,
    onClick: () => void,
}

export const NewsCard: FC<NewsCardProps> = ({ title, score, by, time, onClick }) => {
  return (
    <Card onClick={ onClick } className={ styles.card }>
      <Title level='2'>{ title }</Title>
      <InfoRow header="Автор">{ by }</InfoRow>
      <InfoRow header="Рейтинг">{ score }</InfoRow>
      <InfoRow header="Дата публикации">{ `${getTime(time).date} ${getTime(time).time} `}</InfoRow>
    </Card>
  );
};
