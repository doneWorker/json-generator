import { nanoid } from "nanoid";
import { loremIpsum } from "lorem-ipsum";

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateId = () => nanoid();

const generateNumber = (min, max) => random(min, max);

const generateString = (paragraph) =>
  loremIpsum({ count: paragraph, units: "paragraph" });

const generateOneOf = (list) => list.split(",")[random(0, list.length - 1)];

const generateField = (params) => {
  const { type } = params;
  const { name } = params;

  const val =
    type === "number"
      ? generateNumber(params.min, params.max)
      : type === "string"
      ? generateString(params.paragraph)
      : type === "oneof"
      ? generateOneOf(params.list)
      : type === "id"
      ? generateId()
      : null;

  return [name, val];
};

const generateRecord = (fields) => {
  const obj = {};
  fields.forEach((field) => {
    if (field.type === "object") {
      obj[field.name] = generateRecord(field.children);
    } else {
      const [name, val] = generateField(field);
      obj[name] = val;
    }
  });

  return obj;
};

const generate = (config) => {
  const { fields } = config;
  const { total } = config;
  const result = [];

  for (let i = 0; i < total; i++) result.push(generateRecord(fields));

  return JSON.stringify(result, null, "\t");
};

export default generate;
