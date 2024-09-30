import { Box } from '@modules/common/components/box'
import { Text } from '@modules/common/components/text'
import { VariantPrice } from 'types/global'

export default function ProductPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <Box className="flex items-center justify-center gap-2">
      {price.price_type === 'sale' && (
        <Text size="md" className="text-secondary line-through">
          {price.original_price}
        </Text>
      )}
      <Text className="font-bold text-basic-primary" size="lg">
        {price.calculated_price}
      </Text>
    </Box>
  )
}
