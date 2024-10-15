import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsSeparator,
  BreadcrumbsStatic,
} from '@modules/common/components/breadcrumbs'
import { ArrowLeftIcon } from '@modules/common/icons'

export default function BlogBreadcrumbs({
  blogTitle,
  countryCode,
}: {
  blogTitle: string
  countryCode: string
}) {
  return (
    <Breadcrumbs className="text-basic-primary">
      <BreadcrumbsList className="hidden small:flex">
        <BreadcrumbsItem>
          <BreadcrumbsLink href={`/${countryCode}`}>Home Page</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink href={`/${countryCode}/blog`}>Blog</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsStatic>{blogTitle}</BreadcrumbsStatic>
        </BreadcrumbsItem>
      </BreadcrumbsList>

      <BreadcrumbsList className="flex small:hidden">
        <BreadcrumbsItem>
          <BreadcrumbsLink
            href={`/${countryCode}/blog}`}
            className="flex items-center gap-2 text-md"
          >
            <ArrowLeftIcon className="h-[18px] w-[18px]" />
            Back to Blog
          </BreadcrumbsLink>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  )
}
