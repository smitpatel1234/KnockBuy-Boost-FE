export const cetogoryColumn = [
   {
      title: "Image",
      key: "image_url",
      searchable: false,
      sortable: false
   },
   {
      title: "Category Name",
      key: "category_name",
      filterKey: "category.category_name",
      sortable: true,
      searchable: true
   },
   {
      title: "Parent Category",
      key: "parent_category_name",
      filterKey: "parent.category_name",
      sortable: true,
      searchable: true
   },
   {
      title: "Description",
      key: "description",
      sortable: true,
      searchable: true
   },
];