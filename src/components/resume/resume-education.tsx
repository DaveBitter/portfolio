import { Card, Text, Badge } from "@radix-ui/themes";
import { renderMarkdown } from "@/lib/markdown";
import { getDurationString } from "@/lib/format-date";
import type { Education } from "@/lib/content";

export function ResumeEducation({ items }: { items: Education[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-gradient mb-6 text-2xl font-bold">Education</h2>
      <div className="space-y-6">
        {items.map((item) => (
          <Card key={item.study} size="3">
            <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 flex-wrap">
                <Text size="4" weight="bold">
                  <a
                    href={item.instituteWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[var(--color-primary)]"
                  >
                    {item.institute}
                  </a>
                </Text>
                <Text size="2" color="gray">
                  {item.city}, {item.countryCode}
                </Text>
              </div>
              <Text size="2" color="gray">
                {getDurationString(
                  item.startDate,
                  item.endDate,
                  item.present
                )}
              </Text>
            </div>
            <Text size="3" weight="medium" className="mb-2 block">
              {item.study}
            </Text>
            {item.grade && (
              <Badge color="orange" variant="soft" size="1" className="mb-3">
                {item.grade}
              </Badge>
            )}
            <div
              className="prose prose-invert prose-sm max-w-none text-[var(--color-text-muted)]"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(item.body),
              }}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}
