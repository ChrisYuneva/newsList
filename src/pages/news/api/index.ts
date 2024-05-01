import { Story } from "../../../app/store/newsSlice";

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