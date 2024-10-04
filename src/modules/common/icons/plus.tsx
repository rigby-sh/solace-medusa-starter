import { IconProps } from 'types/icon'

export const PlusIcon = (props: IconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Plus Icon</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99984 3.54163C10.345 3.54163 10.6248 3.82145 10.6248 4.16663V9.37496H15.8332C16.1783 9.37496 16.4582 9.65478 16.4582 9.99996C16.4582 10.3451 16.1783 10.625 15.8332 10.625H10.6248V15.8333C10.6248 16.1785 10.345 16.4583 9.99984 16.4583C9.65466 16.4583 9.37484 16.1785 9.37484 15.8333V10.625H4.1665C3.82133 10.625 3.5415 10.3451 3.5415 9.99996C3.5415 9.65478 3.82133 9.37496 4.1665 9.37496H9.37484V4.16663C9.37484 3.82145 9.65466 3.54163 9.99984 3.54163Z"
        fill="currentColor"
      />
    </svg>
  )
}
