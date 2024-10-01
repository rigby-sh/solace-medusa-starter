import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Container } from '@modules/common/components/container'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { Text } from '@modules/common/components/text'
import { ArrowLeftIcon, SolaceLogo } from '@modules/common/icons'

export default function CheckoutNav() {
  return (
    <Container
      as="nav"
      className="flex h-full items-center justify-between !py-3 small:!py-4"
    >
      <Box className="small:flex-1">
        <Button variant="tonal" asChild className="w-max">
          <LocalizedClientLink href="/cart">
            <Box className="flex gap-2">
              <ArrowLeftIcon />
              <Text>
                Back to{' '}
                <Text as="span" className="hidden small:inline">
                  shopping
                </Text>{' '}
                cart
              </Text>
            </Box>
          </LocalizedClientLink>
        </Button>
      </Box>
      <Box className="flex items-center justify-end small:flex-1 small:justify-center">
        <LocalizedClientLink href="/">
          <SolaceLogo className="h-6 small:h-7" />
        </LocalizedClientLink>
      </Box>
      <div className="hidden flex-1 basis-0 small:flex" />
    </Container>
  )
}
