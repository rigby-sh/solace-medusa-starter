import { StoreProduct } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { Text } from '@modules/common/components/text'
import Thumbnail from '@modules/products/components/thumbnail'

export const RecommendedItem = ({
  handleOpenDialogChange,
  item,
}: {
  item: StoreProduct
  handleOpenDialogChange: (value: boolean) => void
}) => {
  return (
    <LocalizedClientLink
      href={`/products/${item.handle}`}
      onClick={() => {
        handleOpenDialogChange(false)
      }}
    >
      <Box
        className="flex w-full bg-primary transition-all duration-300 ease-in-out large:hover:bg-hover"
        data-testid="product-row"
      >
        <div className="flex h-[90px] w-[90px]">
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </div>
        <Box className="px-4 pt-3 medium:flex-grow">
          <Text className="font-medium" data-testid="product-name">
            {item.title}
          </Text>
          {item.variants && (
            <Text size="md" className="text-secondary">
              {item.variants[0]?.title}
            </Text>
          )}
        </Box>
      </Box>
    </LocalizedClientLink>
  )
}
