import { useAppSelector } from '@/app/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from '@/components/TimeAgo'
import ReactionButtons from './ReactionButtons'

export default function PostsList() {
  const posts = useAppSelector(selectAllPosts)

  const orderedPosts  = posts.slice().sort((a,b)=> b.date.localeCompare(a.date)) 

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={'/posts/' + post.id}>{post.title}</Link>
      </h3>
      <TimeAgo timestamp={post.date}/>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.user} />
      <ReactionButtons post={post}/>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
