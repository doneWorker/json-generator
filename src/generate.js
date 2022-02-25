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

const generate = (config) => {
  const { fields } = config;
  const { total } = config;
  const result = [];

  for (let i = 0; i < total; i++) {
    const obj = {};
    fields.forEach((field) => {
      const [name, val] = generateField(field);
      obj[name] = val;
    });
    result.push(obj);
  }

  return JSON.stringify(result, null, "\t");
};

export default generate;
