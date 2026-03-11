const education = {
  name: "education",
  type: "document",
  title: "Education",
  fields: [
    { name: "institute", type: "string", title: "Institute" },
    { name: "instituteWebsite", type: "url", title: "Institute Website" },
    { name: "study", type: "string", title: "Study" },
    {
      name: "body",
      type: "array",
      title: "Body",
      of: [{ type: "block" }],
    },
    { name: "grade", type: "string", title: "Grade" },
    { name: "startDate", type: "datetime", title: "Start Date" },
    { name: "endDate", type: "datetime", title: "End Date" },
    { name: "present", type: "boolean", title: "Present" },
    { name: "city", type: "string", title: "City" },
    { name: "countryCode", type: "string", title: "Country Code" },
  ],
} as const;

export default education;
