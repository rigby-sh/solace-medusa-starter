import { Container } from '@modules/common/components/container'

export default function Loading() {
  return (
    <Container>
      <div className="mb-12 h-6 w-[150px] bg-skeleton-primary small:w-[300px]" />
      <div className="flex flex-col gap-y-6 large:flex-row large:items-start large:gap-x-16 xl:gap-x-[120px]">
        <div className="relative block w-full">
          <div className="col-span-2 aspect-[29/20] max-h-[540px] w-full max-w-[770px] shrink-0 animate-pulse bg-skeleton-primary" />
        </div>
        <div className="flex w-full flex-col gap-y-6 py-8 large:sticky large:top-24 large:max-w-[440px] large:py-0">
          <div className="h-4 w-24 animate-pulse bg-skeleton-primary" />
          <div className="h-8 w-64 animate-pulse bg-skeleton-primary" />
          <div className="h-6 w-20 animate-pulse bg-skeleton-primary" />
          <div className="mt-5 flex flex-col gap-1">
            <div className="h-6 w-20 animate-pulse bg-skeleton-primary" />
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-12 animate-pulse bg-skeleton-primary" />
              <div className="h-12 w-12 animate-pulse bg-skeleton-primary" />
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <div className="h-14 w-1/3 animate-pulse bg-skeleton-primary" />
            <div className="h-14 w-2/3 animate-pulse bg-skeleton-primary" />
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <div className="h-14 w-full animate-pulse bg-skeleton-primary" />
            <div className="h-14 w-full animate-pulse bg-skeleton-primary" />
            <div className="h-14 w-full animate-pulse bg-skeleton-primary" />
            <div className="h-14 w-full animate-pulse bg-skeleton-primary" />
          </div>
        </div>
      </div>
    </Container>
  )
}
