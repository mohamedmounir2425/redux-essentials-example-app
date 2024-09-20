
import { formatDistanceToNow, parseISO } from 'date-fns'
import React from 'react'

interface TimeAgoProps {
    timestamp:string
}


export default function TimeAgo({timestamp}:TimeAgoProps) {

    let timeAgo = ""
    if(timestamp){
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
    
    
  return (
    <time dateTime={timestamp} title={timestamp}>
    &nbsp; <i>{timeAgo}</i>
  </time>
  )
}
