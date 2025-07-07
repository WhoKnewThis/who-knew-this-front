import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Topic {
  id: string;
  name: string;
  description: string;
}

interface TopicsState {
  topics: Topic[];
}

const initialState: TopicsState = {
  topics: [],
};

export const topicSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopic: (state, action: PayloadAction<Topic>) => {
      state.topics.push(action.payload);
    },
  },
});

export const { addTopic } = topicSlice.actions;

export const selectTopics = (state: RootState) => state.topics.topics;

export default topicSlice.reducer;
