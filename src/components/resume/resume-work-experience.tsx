import { Card, Text, Badge, Separator, Flex, Box, Heading } from "@radix-ui/themes";
import { renderMarkdown } from "@/lib/markdown";
import { getDurationString } from "@/lib/format-date";
import type { WorkExperience, WorkExperienceSubEntry } from "@/lib/content";

function SubEntry({ entry }: { entry: WorkExperienceSubEntry }) {
  return (
    <Box>
      <Flex
        direction={{ initial: "column", sm: "row" }}
        justify="between"
        align={{ initial: "start", sm: "center" }}
        gap="1"
        mb="2"
      >
        <Text size="3" weight="bold" className="text-[var(--color-text)]">
          {entry.title}
        </Text>
        <Text size="1" color="gray" className="shrink-0">
          {getDurationString(entry.startDate, entry.endDate, entry.present)}
        </Text>
      </Flex>
      <div
        className="article-body text-sm text-[var(--color-text-muted)]"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(entry.body) }}
      />
    </Box>
  );
}

export function ResumeWorkExperience({
  items,
}: {
  items: WorkExperience[];
}) {
  return (
    <section className="mb-12">
      <Heading size="6" mb="6" className="text-gradient">
        Work Experience
      </Heading>
      <Flex direction="column" gap="5">
        {items.map((item) => (
          <Card key={item.company} size="3">
            <Flex
              direction={{ initial: "column", sm: "row" }}
              justify="between"
              align={{ initial: "start", sm: "center" }}
              gap="1"
              mb="3"
            >
              <Flex align="center" gap="4" wrap="wrap">
                <Heading size="4" asChild>
                  <a
                    href={item.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[var(--color-primary)]"
                  >
                    {item.company}
                  </a>
                </Heading>
                <Text size="2" color="gray">
                  {item.city}, {item.countryCode}
                </Text>
              </Flex>
              <Text size="2" color="gray" className="shrink-0">
                {getDurationString(item.startDate, item.endDate, item.present)}
              </Text>
            </Flex>

            <Flex gap="2" wrap="wrap" mb="4">
              {item.roles.map((role) => (
                <Badge key={role.role} variant="soft" color="gray" size="1">
                  {role.role}
                </Badge>
              ))}
            </Flex>

            {item.subEntries && item.subEntries.length > 0 ? (
              <Flex direction="column" gap="5">
                {item.subEntries.map((entry, i) => (
                  <Box key={entry.title}>
                    {i > 0 && <Separator size="4" mb="5" />}
                    <SubEntry entry={entry} />
                  </Box>
                ))}
              </Flex>
            ) : (
              item.body && (
                <div
                  className="article-body text-sm text-[var(--color-text-muted)]"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(item.body),
                  }}
                />
              )
            )}
          </Card>
        ))}
      </Flex>
    </section>
  );
}
