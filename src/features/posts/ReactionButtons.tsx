import React from 'react'
import { Post, reactionAdded, ReactionName } from './postsSlice'
import { useAppDispatch } from '@/app/store'

const reactionEmoji:Record<ReactionName,string> = {
    thumbsUp: '👍',
    tada: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
  }


  interface ReactionButtonsProps {
    post: Post
  }
  
export default function ReactionButtons({post}:ReactionButtonsProps) {

    const dispatch = useAppDispatch()
    const reactionButtons = Object.entries(reactionEmoji).map(([stringName,emoji])=> {
        const reaction = stringName as ReactionName
        return (
            <button
            
            key={reaction}
            type='button'
            className="muted-button reaction-button"
            onClick={()=> dispatch(reactionAdded({postId:post.id,reaction}))}            
            >
                {emoji} {post.reactions[reaction]}
            </button>
        )
    })

  return (
    <div>{reactionButtons}</div>
  )
}
