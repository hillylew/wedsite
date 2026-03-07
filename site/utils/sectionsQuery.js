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
      },
    },
  },
`;
