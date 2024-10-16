import { Text } from '@modules/common/components/text'

export function BlogInfo({ createdAt, readTime }) {
  return (
    <Text className="my-4 text-secondary medium:my-8">
      {new Date(createdAt).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })}
      <span className="mx-2">•</span>
      {readTime} min read
    </Text>
  )
}
