import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { deskStructure } from "./deskStructure";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { table } from "@sanity/table";

// Define singleton types.
const singletonTypes = new Set([
  "siteSettings",
  "contactInfo",
  "mainMenu",
  "homepage",
]);

const Logo = () => (
  <img src="/static/logo.svg" alt="U-M Block M" />
);

// Define singleton allowed actions.
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: process.env.SANITY_STUDIO_TITLE,
  icon: Logo,

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,

  plugins: [
    structureTool({ structure: deskStructure }),
    media(),
    visionTool(),
    table()
  ],

  schema: {
    types: schemaTypes,

    // Filter out singleton types from the "New document" list.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Filter out unwanted actions from singletons.
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
