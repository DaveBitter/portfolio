const tag = {
  name: "tag",
  type: "document",
  title: "Tag",
  fields: [
    { name: "key", type: "string", title: "Key" },
    { name: "value", type: "string", title: "Value" },
  ],
} as const;

export default tag;
