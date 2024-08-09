import React from 'react'
import PostItem from "./PostItem"
import './posts.css'
const PostsList = ({posts}) => {
  return (
    <div className="post-list">
      {posts.map((item => <PostItem post={item} key={item._id}/>))}
    </div>
  )
}

export default PostsList
