import { Container } from '@modules/common/components/container'
import SkeletonBlogPosts from '@modules/skeletons/templates/skeleton-post-tile'

export default function Loading() {
  return (
    <Container className="flex flex-col gap-8 !py-8">
      <div className="flex animate-pulse flex-col gap-4">
        <div className="h-6 w-[150px] bg-skeleton-primary small:w-[200px]" />
        <div className="h-12 w-[300px] bg-skeleton-primary small:h-14 small:w-[350px]" />
        <div className="mb-8 mt-6 grid grid-cols-12 medium:mb-16 medium:mt-12">
          <div className="col-span-12 medium:col-span-3 medium:mb-10">
            <div className="hidden h-[372px] w-full bg-skeleton-primary medium:block" />
            <div className="flex flex-col gap-4 medium:hidden">
              <div className="h-6 w-[100px] bg-skeleton-primary" />
              <div className="h-12 w-full bg-skeleton-primary" />
              <div className="h-12 w-full bg-skeleton-primary" />
              <div className="h-12 w-full bg-skeleton-primary" />
            </div>
          </div>
          <div className="col-span-12 space-y-12 medium:col-span-8 medium:col-start-5">
            <div className="hidden items-center justify-between medium:flex">
              <div className="h-6 w-[100px] bg-skeleton-primary" />
              <div className="h-12 w-[100px] bg-skeleton-primary" />
            </div>
            <SkeletonBlogPosts />
          </div>
        </div>
      </div>
    </Container>
  )
}
