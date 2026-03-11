const siteSettings = {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  fields: [
    { name: "elevatorPitch", type: "text", title: "Elevator Pitch" },
    { name: "greetingIntro", type: "text", title: "Greeting Intro" },
    { name: "pageDescription", type: "text", title: "Page Description" },
    {
      name: "copy",
      type: "array",
      title: "Copy",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", type: "string", title: "Key" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    },
  ],
} as const;

export default siteSettings;
