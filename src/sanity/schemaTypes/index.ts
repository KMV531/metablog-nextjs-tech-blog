import { type SchemaTypeDefinition } from "sanity";

import { categoryType } from "./categoryType";
import { postTypes } from "./postType";
import { authorType } from "./authorType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, postTypes, authorType],
};
