import React from 'react'

import { clx } from '@medusajs/ui'
import {
  useHits,
  UseHitsProps,
  useSearchBox,
} from 'react-instantsearch-hooks-web'

import { ProductHit } from '../hit'
import ShowAll from '../show-all'

type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element
  }

const Hits = ({
  hitComponent: Hit,
  className,
  ...props
}: HitsProps<ProductHit>) => {
  const { query } = useSearchBox()
  const { hits } = useHits(props)

  return (
    <div
      className={clx(
        'sm:w-[50vw] sm:overflow-hidden mb-1 w-full p-px transition-[height,max-height,opacity] duration-300 ease-in-out',
        className,
        {
          'max-h-full opacity-100': !!query,
          'max-h-0 opacity-0': !query && !hits.length,
        }
      )}
    >
      <div
        className="sm:grid-cols-3 mb-4 grid grid-cols-1 gap-4"
        data-testid="search-results"
      >
        {hits.slice(0, 6).map((hit, index) => (
          <li
            key={index}
            className={clx('list-none', {
              'sm:block hidden': index > 2,
            })}
          >
            <Hit hit={hit as unknown as ProductHit} />
          </li>
        ))}
      </div>
      <ShowAll />
    </div>
  )
}

export default Hits
