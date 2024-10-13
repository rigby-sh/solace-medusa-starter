import { Button } from '@modules/common/components/button'
import { useFormStatus } from 'react-dom'

export const ButtonSubmit = () => {
  const { pending } = useFormStatus()

  return (
    <Button isLoading={pending} type="submit" className="w-full">
      Save
    </Button>
  )
}
