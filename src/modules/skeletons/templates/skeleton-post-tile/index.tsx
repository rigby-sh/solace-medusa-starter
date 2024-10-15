import repeat from '@lib/util/repeat'
import SkeletonPostTile from '@modules/skeletons/components/skeleton-post-tile'

const SkeletonBlogPosts = () => {
  return (
    <ul
      className="!mt-6 grid grid-cols-1 gap-2 large:grid-cols-2"
      data-testid="blog-post-list"
    >
      {repeat(8).map((index) => (
        <li key={index}>
          <SkeletonPostTile />
        </li>
      ))}
    </ul>
  )
}

export default SkeletonBlogPosts
