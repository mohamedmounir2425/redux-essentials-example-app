import postsSlice from '@/features/posts/postsSlice'
import usersSlice from '@/features/users/usersSlice'
import authReducer from '@/features/auth/authSlice'
import { configureStore, type Action } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    users: usersSlice,
    auth: authReducer
  },
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
