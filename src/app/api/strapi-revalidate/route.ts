import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
export const runtime = 'edge'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  console.log('secret: ', secret)
  console.log('NEXT_PUBLIC_STRAPI_WEBHOOK_REVALIDATION_SECRET: ', process.env.NEXT_PUBLIC_STRAPI_WEBHOOK_REVALIDATION_SECRET)
  const body = await request.json()

  console.log('body: ', body)

  if (secret !== process.env.NEXT_PUBLIC_STRAPI_WEBHOOK_REVALIDATION_SECRET) {
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
