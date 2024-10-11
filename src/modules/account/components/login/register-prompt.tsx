import { LOGIN_VIEW } from '@modules/account/templates/login-template'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Heading } from '@modules/common/components/heading'

export default function RegisterPrompt({
  setCurrentView,
}: {
  setCurrentView: (view: LOGIN_VIEW) => void
}) {
  return (
    <Box className="flex w-full flex-col gap-6 bg-primary p-4 small:p-5">
      <Heading as="h2" className="text-xl small:text-2xl">
        Don’t have account yet?
      </Heading>
      <Button
        variant="tonal"
        className="w-full"
        onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
      >
        Create account
      </Button>
    </Box>
  )
}
