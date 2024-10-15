import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { ResetPassword } from '@modules/reset-password/components/reset-password'

export function ResetPasswordTemplate() {
  return (
    <Box className="flex justify-center bg-secondary">
      <Container className="w-full !max-w-[660px] !pb-16 !pt-8">
        <div className="flex items-center justify-center">
          <ResetPassword />
        </div>
      </Container>
    </Box>
  )
}
