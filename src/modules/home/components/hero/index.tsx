import Image from 'next/image'

import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { Text } from '@modules/common/components/text'
import { HeroBanner } from 'types/strapi'

const Hero = ({ data }: { data: HeroBanner }) => {
  const { Headline, Text: text, CTA, Image: bannerImage } = data

  return (
    <>
      <Box className="h-[168px] max-h-[368px] w-full small:h-[368px] 2xl:h-[468px] 2xl:max-h-[468px]">
        <Image
          src={bannerImage.url}
          alt={bannerImage.alternativeText ?? 'Banner image'}
          className="h-full w-full object-cover"
          width={1000}
          height={600}
          priority
        />
      </Box>
      <Container className="flex flex-col gap-2 !py-6 small:gap-8 small:!py-10">
        <Heading className="max-w-full text-4xl text-basic-primary small:max-w-[510px] medium:text-5xl">
          {Headline}
        </Heading>
        <Box className="flex flex-col-reverse justify-between gap-8 medium:flex-row medium:items-center">
          <Button asChild className="w-max">
            <LocalizedClientLink href={CTA.BtnLink}>
              {CTA.BtnText}
            </LocalizedClientLink>
          </Button>
          <Text
            size="lg"
            className="max-w-full text-basic-primary medium:max-w-[410px] medium:text-end"
          >
            {text}
          </Text>
        </Box>
      </Container>
    </>
  )
}

export default Hero
