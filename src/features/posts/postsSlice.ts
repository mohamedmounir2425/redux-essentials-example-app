import { nanoid, PayloadAction } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@reduxjs/toolkit/query'
import { sub } from 'date-fns'
import { userLoggedOut } from '../auth/authSlice'

export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export type ReactionName = keyof Reactions

export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
  reactions: Reactions
}
type postUpdated = Pick<Post, 'id' | 'title' | 'content'>

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

const initialState: Post[] = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: initialReactions,
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: initialReactions,
  },
]
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded: (state, action: PayloadAction<{ postId: string; reaction: ReactionName }>) => {
      const { postId, reaction } = action.payload
      const post = state.find((post) => post.id === postId)
      if (post) {
        post.reactions[reaction]++
      }
    },
    postAdded: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.push(action.payload)
      },
      prepare: (title: string, content: string, userId: string) => ({
        payload: {
          id: nanoid(),
          title,
          content,
          user: userId,
          date: new Date().toISOString(),
          reactions: initialReactions,
        },
      }),
    },
    postUpdated: (state, action: PayloadAction<postUpdated>) => {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id == id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  extraReducers: (builder) => {
    // Pass the action creator to `builder.addCase()`
    builder.addCase(userLoggedOut, (state) => {
      // Clear out the list of posts whenever the user logs out
      return []
    })
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = (state: RootState) => state.posts
export const selectPostById = (state: RootState, postId: string) => state.posts.find((post) => post.id === postId)
