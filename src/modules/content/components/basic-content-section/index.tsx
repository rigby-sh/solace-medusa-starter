import Image from 'next/image'

import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import { Text } from '@modules/common/components/text'
import { ContentAttributes } from 'types/strapi'

export const BasicContentSection = ({ data }: { data: ContentAttributes }) => {
  return (
    <Container className="flex flex-col justify-between large:flex-row">
      <Box className="mb-6 shrink large:mb-0 large:mr-12 large:max-w-[539px]">
        <Heading className="mb-4 text-2xl text-basic-primary small:text-3xl">
          {data.Title}
        </Heading>
        <Text size="lg" className="text-secondary">
          {data.Text}
        </Text>
      </Box>
      <Box className="relative h-[224px] grow small:h-[400px] large:min-w-[400px] large:max-w-[600px]">
        <Image
          src={data.Image.url}
          alt={data.Image.alternativeText ?? 'Content section image'}
          fill
          className="object-cover"
        />
      </Box>
    </Container>
  )
}
