import { useAppSelector } from '@/app/store'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from '@/components/TimeAgo'
import { selectCurrentUsername } from '../auth/authSlice'

export default function SinglePostPage() {
  const { postId } = useParams()
  const post = useAppSelector((state) =>selectPostById(state,postId!))
  const currentUsername = useAppSelector(selectCurrentUsername)!
  if (!post) {
      return (
          <section>
        <h2>Post not found!</h2>
      </section>
    )
}
const canEdit = currentUsername === post.user
  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <TimeAgo timestamp={post.date}/>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <br />
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
        
      </article>
    </section>
  )
}
