import { Story } from "./types";

export const getNewsList = async (): Promise<Story[]> => {
    const idResponse = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    const idData: number[] = await idResponse.json();
    const idList = idData.slice(0,100);
    const newsListResponse = await Promise.all(idList.map((idNews) => fetch(`https://hacker-news.firebaseio.com/v0/item/${idNews}.json?print=pretty`)));
    const newsList = await Promise.all((newsListResponse.map((news) => news.json())));
    
    return newsList;
}

export const getCommentsList = async(commentsIds: number[]): Promise<Story[]> => {
    const commentsListResponse = await Promise.all(commentsIds.map((idComment) => fetch(`https://hacker-news.firebaseio.com/v0/item/${idComment}.json?print=pretty`)));
    const commentsList = await Promise.all((commentsListResponse.map((comment) => comment.json())));

    return commentsList;
}

export const getNews = async(id: string): Promise<Story> => {
    const newsResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    const newsData = await newsResponse.json();
    
    return newsData;
}