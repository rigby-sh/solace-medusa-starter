import { CheckCircleIcon, XCircleIcon } from '@modules/common/icons'
import { toast as sonnerToast } from 'sonner'

const baseClassname = {
  classNames: {
    toast:
      'text-md bg-primary [.dark_&]:bg-static rounded-lg shadow-md flex items-center p-4',
    title: 'text-basic-primary [.dark_&]:text-static text-md',
    closeButton:
      'bg-primary [.dark_&]:bg-static [.dark_&]:text-static [.dark_&]:hover:bg-secondary text-basic-primary',
  },
}

export function toast(variant: 'success' | 'error', text: string) {
  switch (variant) {
    case 'success':
      sonnerToast.success(text, {
        duration: 5000,
        icon: <CheckCircleIcon className="h-5 w-5 text-positive" />,
        classNames: {
          ...baseClassname.classNames,
          toast: `${baseClassname.classNames.toast} border-positive`,
        },
      })
      break
    case 'error':
    default:
      sonnerToast.error(text, {
        duration: 5000,
        icon: <XCircleIcon className="h-5 w-5 text-negative" />,
        classNames: {
          ...baseClassname.classNames,
          toast: `${baseClassname.classNames.toast} border-negative`,
        },
      })
      break
  }
}
