const workExperience = {
  name: "workExperience",
  type: "document",
  title: "Work Experience",
  fields: [
    { name: "company", type: "string", title: "Company" },
    { name: "companyWebsite", type: "url", title: "Company Website" },
    {
      name: "body",
      type: "array",
      title: "Body",
      of: [{ type: "block" }],
    },
    {
      name: "roles",
      type: "array",
      title: "Roles",
      of: [
        {
          type: "object",
          fields: [
            { name: "role", type: "string", title: "Role" },
            { name: "startDate", type: "datetime", title: "Start Date" },
            { name: "endDate", type: "datetime", title: "End Date" },
            { name: "present", type: "boolean", title: "Present" },
          ],
        },
      ],
    },
    { name: "startDate", type: "datetime", title: "Start Date" },
    { name: "endDate", type: "datetime", title: "End Date" },
    { name: "present", type: "boolean", title: "Present" },
    { name: "city", type: "string", title: "City" },
    { name: "countryCode", type: "string", title: "Country Code" },
  ],
} as const;

export default workExperience;
