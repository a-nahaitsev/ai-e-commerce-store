import Link from "next/link";

type Props = {
  id?: string;
  title: string;
  action?: { label: string; href: string };
};

/** Section title (uppercase heading) with an optional trailing link. */
export function SectionHeading({ id, title, action }: Props) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4 md:mb-8">
      <h2 id={id} className="heading">
        {title}
      </h2>
      {action && (
        <Link href={action.href} className="link-underline text-xs">
          {action.label}
        </Link>
      )}
    </div>
  );
}
