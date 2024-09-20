import { useAppDispatch, useAppSelector } from '@/app/store'
import React from 'react'
import { type Post, postAdded } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit'
import { selectAllUsers } from '../users/usersSlice'
import { selectCurrentUsername } from '../auth/authSlice'

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export default function AddPostForm() {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectCurrentUsername)!

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()
    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value


    dispatch(postAdded(title,content,userId))

    e.currentTarget.reset()
  }


  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input name="postTitle" type="text" id="postTitle" defaultValue="" required />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button>Save Post</button>
      </form>
    </section>
  )
}
