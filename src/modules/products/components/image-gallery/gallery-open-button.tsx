'use client'

import { Button } from '@modules/common/components/button'

import { MAX_INITIAL_IMAGES } from './consts'

export const GalleryOpenButton = ({ totalImages }: { totalImages: number }) => {
  // TODO: Implement gallery modal
  const handleOpenGallery = () => {
    console.log('open gallery')
  }

  return (
    totalImages > MAX_INITIAL_IMAGES && (
      <Button
        className="mx-auto hidden w-fit medium:flex"
        variant="tonal"
        size="sm"
        onClick={handleOpenGallery}
      >
        See more images
      </Button>
    )
  )
}
