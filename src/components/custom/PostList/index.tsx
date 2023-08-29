import React from 'react';
import { List } from 'react-virtualized';
import { TourPost } from '@/models/TourPost/TourPost';
import PostListItem from './PostListItem';

export interface PostListProps {
  posts: TourPost[],
  renderAction: (post: TourPost) => React.ReactNode,
}

export default function PostList(props: PostListProps) {
  const {
    posts,
    renderAction,
  } = props;
  const rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    // isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const post = posts[index];
    // If row content is complex, consider rendering a light-weight placeholder while scrolling.
    const content = isScrolling ? '...'
      : <PostListItem post={post} key={post.code} renderAction={renderAction} />;
    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  };

  return (
    <List
      width={300}
      height={300}
      rowCount={posts.length}
      rowHeight={2}
      rowRenderer={rowRenderer}
    />
  );
}
