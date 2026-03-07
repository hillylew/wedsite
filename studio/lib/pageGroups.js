import { CiSettings } from "react-icons/ci";
import { GrDocumentText } from "react-icons/gr";
import { TfiLayoutListLargeImage } from "react-icons/tfi";

export default [
  {
    name: "settings",
    title: "Basic Settings",
    icon: CiSettings,
    default: true,
  },

  {
    name: "hero",
    title: "Hero Section",
    icon: TfiLayoutListLargeImage,
  },

  {
    name: "sections",
    title: "Content Sections",
    icon: GrDocumentText,
  },
];
