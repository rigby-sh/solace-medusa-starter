import { useEffect } from 'react'

import { Disclosure } from '@headlessui/react'
import useToggleState from '@lib/hooks/use-toggle-state'
import { Badge, Button, clx } from '@medusajs/ui'
import { useFormStatus } from 'react-dom'

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  'data-testid'?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = 'An error occurred, please try again',
  children,
  'data-testid': dataTestid,
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState()

  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <div className="text-small-regular" data-testid={dataTestid}>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="uppercase text-ui-fg-base">{label}</span>
          <div className="flex flex-1 basis-0 items-center justify-end gap-x-4">
            {typeof currentInfo === 'string' ? (
              <span className="font-semibold" data-testid="current-info">
                {currentInfo}
              </span>
            ) : (
              currentInfo
            )}
          </div>
        </div>
        <div>
          <Button
            variant="secondary"
            className="min-h-[25px] w-[100px] py-1"
            onClick={handleToggle}
            type={state ? 'reset' : 'button'}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? 'Cancel' : 'Edit'}
          </Button>
        </div>
      </div>

      {/* Success state */}
      <Disclosure as="div">
        <Disclosure.Panel
          static
          className={clx(
            'overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out',
            {
              'max-h-[1000px] opacity-100': isSuccess,
              'max-h-0 opacity-0': !isSuccess,
            }
          )}
          data-testid="success-message"
        >
          <Badge className="my-4 p-2" color="green">
            <span>{label} updated succesfully</span>
          </Badge>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error state  */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            'overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out',
            {
              'max-h-[1000px] opacity-100': isError,
              'max-h-0 opacity-0': !isError,
            }
          )}
          data-testid="error-message"
        >
          <Badge className="my-4 p-2" color="red">
            <span>{errorMessage}</span>
          </Badge>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            'overflow-visible transition-[max-height,opacity] duration-300 ease-in-out',
            {
              'max-h-[1000px] opacity-100': state,
              'max-h-0 opacity-0': !state,
            }
          )}
        >
          <div className="flex flex-col gap-y-2 py-4">
            <div>{children}</div>
            <div className="mt-2 flex items-center justify-end">
              <Button
                isLoading={pending}
                className="w-full small:max-w-[140px]"
                type="submit"
                data-testid="save-button"
              >
                Save changes
              </Button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccountInfo
