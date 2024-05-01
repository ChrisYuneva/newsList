import { Caption, Card, Footnote, Title } from '@vkontakte/vkui';
import { FC } from 'react';

interface NewsCardProps {
    title?: string,
    score?: number,
    by?: string,
    time: number,
    onClick: () => void,
}

export const NewsCard: FC<NewsCardProps> = ({ title, score, by, time, onClick }) => {

  return (
    <Card onClick={onClick}>
      <Title level='2' style={{ margin: 16 }}>
        {title}
      </Title>
      <Footnote>{score}</Footnote>
      <Footnote>{by}</Footnote>
      <Caption level='3' style={{ marginBottom: 16 }}>
        {new Date(time).toLocaleDateString('ru-Ru')}
      </Caption>
    </Card>
  );
};
