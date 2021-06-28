export interface FilterType {
  text_index: string,
  category: string,
  subcategories: Array<string>,
  lower_limit: number | null,
  upper_limit: number | null
};
