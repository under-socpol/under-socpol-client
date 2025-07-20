import Link from "next/link";

interface ArticleCardProps {
  href: string;
  title: string;
  excerpt: string;
}

export default function ArticleCard({ href, title, excerpt }: ArticleCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <Link href={href} className="text-sm font-bold text-app-text-color hover:text-app-primary-color leading-8 line-clamp-2 underline">
        {title}
      </Link>

      <p className="text-sm text-gray-500 leading-8 line-clamp-4 text-justify">{excerpt}</p>
    </div>
  );
}
