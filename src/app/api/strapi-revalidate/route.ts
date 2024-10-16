import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const body = await request.json()

  if (secret !== process.env.STRAPI_WEBHOOK_REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    if (body.model === 'blog' || body.model === 'blog-post-category') {
      revalidateTag(`blog-${body.entry.Slug}`)
      revalidateTag('blog')
      revalidateTag('explore-blog')
      revalidateTag('blog-categories')
      revalidateTag('blog-slugs')

      return NextResponse.json({ revalidated: true, now: Date.now() })
    }

    return NextResponse.json({ message: 'No revalidation needed' })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
