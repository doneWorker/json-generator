import { nanoid } from "nanoid";

export const findField = (fields, id) => {
  for (let field of fields) {
    if (field.id === id) return field;

    if (field.children) {
      const result = findField(field.children, id);
      if (result) return result;
    }
  }
};

export const removeField = (fields, id) => {
  for (let index in fields) {
    if (fields[index].id === id) {
      fields.splice(index, 1);
      return;
    } else if (fields[index].children) {
      removeField(fields[index].children, id);
    }
  }
};

export const createDefaultField = () => ({
  name: "",
  type: "id",
  id: nanoid(),
});
