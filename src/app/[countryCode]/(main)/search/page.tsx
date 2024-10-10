import SearchModal from '@modules/search/templates/search-modal'

export default function SearchModalRoute({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  return <SearchModal countryCode={countryCode} />
}
