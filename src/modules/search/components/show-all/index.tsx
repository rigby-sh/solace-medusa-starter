import { Container, Text } from '@medusajs/ui'
import InteractiveLink from '@modules/common/components/interactive-link'
import { useHits, useSearchBox } from 'react-instantsearch-hooks-web'

const ShowAll = () => {
  const { hits } = useHits()
  const { query } = useSearchBox()
  const width = typeof window !== 'undefined' ? window.innerWidth : 0

  if (query === '') return null
  if (hits.length > 0 && hits.length <= 6) return null

  if (hits.length === 0) {
    return (
      <Container
        className="flex h-fit justify-center gap-2 py-2"
        data-testid="no-search-results-container"
      >
        <Text>No results found.</Text>
      </Container>
    )
  }

  return (
    <Container className="sm:flex-col flex h-fit items-center justify-center gap-2 py-4 small:flex-row small:py-2">
      <Text>Showing the first {width > 640 ? 6 : 3} results.</Text>
      <InteractiveLink href={`/results/${query}`}>View all</InteractiveLink>
    </Container>
  )
}

export default ShowAll
