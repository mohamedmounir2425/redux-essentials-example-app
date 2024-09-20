

import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'

interface PostAuthorProps {
    userId: string
}

export default function PostAuthor({userId}: PostAuthorProps) {
    
    const author = useSelector(state => selectUserById(state,userId));

    return <span>by {author?.name ?? 'Unkown author'}</span>
}
