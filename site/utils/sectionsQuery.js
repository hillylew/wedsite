export default `
  sections[] {
    ...,
    "imageAltText": image.asset->altText,
    "imageCaption": image.asset->description,

    _type == "richText" => {
      ...,
      content[] {
        ...,
        _type == "buttonGroup" => {
          ...,
          buttons[] {
            ...,
            "slug": page->slug.current,
          },
        },
        _type == "richImage" => {
          ...,
          "altText": image.asset->altText,
          "description": image.asset->description,
        }
      },
    },
  },
`;
