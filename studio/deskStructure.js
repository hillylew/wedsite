import {
  RiPagesLine,
  RiPhoneLine,
  RiNavigationLine,
  RiMenu2Fill,
} from "react-icons/ri";

import { AiOutlineHome } from "react-icons/ai";
import { BiSitemap } from "react-icons/bi";
import { HiArrowUturnLeft } from "react-icons/hi2";

export const deskStructure = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .icon(AiOutlineHome)
        .child(S.document().schemaType("homepage").documentId("homepage")),

      S.listItem()
        .title("Pages")
        .child(S.documentTypeList("page"))
        .icon(RiPagesLine),

      S.divider(),

      S.listItem()
        .title("Site Settings")
        .icon(BiSitemap)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),

      S.listItem()
        .title("Contact Information")
        .icon(RiPhoneLine)
        .child(
          S.document().schemaType("contactInfo").documentId("contactInfo"),
        ),

      S.listItem()
        .title("Redirects")
        .child(S.documentTypeList("redirect"))
        .icon(HiArrowUturnLeft),

      S.listItem()
        .title("Navigation")
        .icon(RiNavigationLine)
        .child(
          S.list()
            .title("Navigation")
            .items([
              S.listItem()
                .title("Main Menu")
                .icon(RiMenu2Fill)
                .child(
                  S.document()
                    .schemaType("mainMenu")
                    .documentId("mainMenu")
                    .title("Main Menu"),
                ),
            ]),
        ),
    ]);
