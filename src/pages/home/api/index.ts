import { Story } from "../../../app/store/newsSlice";

export const getNewsList = async (): Promise<Story[]> => {
    const idResponse = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    const idData: number[] = await idResponse.json();
    const idList = idData.slice(0,100);
    const newsListResponse = await Promise.all(idList.map((idNews) => fetch(`https://hacker-news.firebaseio.com/v0/item/${idNews}.json?print=pretty`)));
    const newsList = await Promise.all((newsListResponse.map((news) => news.json())));

    return newsList;
}
