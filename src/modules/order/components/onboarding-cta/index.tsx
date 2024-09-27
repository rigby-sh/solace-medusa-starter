'use client'

import { resetOnboardingState } from '@lib/data/onboarding'
import { Button, Container, Text } from '@medusajs/ui'

const OnboardingCta = ({ orderId }: { orderId: string }) => {
  return (
    <Container className="h-full w-full max-w-4xl bg-ui-bg-subtle">
      <div className="center md:items-center flex flex-col gap-y-4 p-4">
        <Text className="text-xl text-ui-fg-base">
          Your test order was successfully created! 🎉
        </Text>
        <Text className="text-small-regular text-ui-fg-subtle">
          You can now complete setting up your store in the admin.
        </Text>
        <Button
          className="w-fit"
          size="xlarge"
          onClick={() => resetOnboardingState(orderId)}
        >
          Complete setup in admin
        </Button>
      </div>
    </Container>
  )
}

export default OnboardingCta
