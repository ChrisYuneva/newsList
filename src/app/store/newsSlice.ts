import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export interface Story {
    id: number,
    by?: string,
    descendants?: number,
    kids?: number[],
    score?: number,
    time?: number,
    title?: string,
    type: StoryTypes,
    url?: string,
    parent?: number,
    deleted?: boolean,
    text?: string,
    dead?: boolean,
    comments?: Story[]
}

export enum StoryTypes {
    STORY = 'story',
    COMMENT = 'comment',
}
export interface NewsState {
    news: Story[],
    isLoading: boolean,
}

const initialState: NewsState = {
    news: [],
    isLoading: false,
};

const findCommentsById = (arr: Story[], findId: number): Story | undefined => {
    for(const obj of arr) {
        if (obj.id === findId) {
            return obj;
        }
        if(obj.comments){
            const result = findCommentsById(obj.comments, findId);
            if (result) {
                return result;
            }
        }
    }
    
    return undefined;
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    loading(state) {
        state.isLoading = true;
    },
    get(state, action: PayloadAction<Story[]>) {
        state.news = action.payload.sort((a, b) => (b.time ?? 0) - (a.time ?? 0));
        state.isLoading = false;
    },
    getComments(state, action: PayloadAction<{id: number, comments: Story[]}>) {
        for(const obj of state.news) {
            if (obj.id === action.payload.id) {
                obj.comments = action.payload.comments;
                return;
            }
            if(obj.comments){
                const result = findCommentsById(obj.comments, action.payload.id);
                if (result) {
                    result.comments = action.payload.comments;
                }
            }
        }
        state.isLoading = false;
    },
  },
});

export default newsSlice.reducer;
