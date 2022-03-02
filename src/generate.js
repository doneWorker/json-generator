import { nanoid } from "nanoid";
import { loremIpsum } from "lorem-ipsum";
import { uniqueNamesGenerator, names } from "unique-names-generator";

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateId = () => nanoid();

const generateName = () =>
  uniqueNamesGenerator({
    dictionaries: [names, names],
    separator: " ",
    length: 2,
    style: "capital",
  });

const generateNumber = ({ min, max }) => random(min, max);

const generateString = ({ paragraph }) =>
  loremIpsum({ count: paragraph, units: "paragraph" });

const generateOneOf = ({ list }) => {
  const arr = list.split(",");
  return arr[random(0, arr.length - 1)];
};

const generateField = (params) => {
  const { type } = params;
  const { name } = params;

  const typesToFunc = {
    number: generateNumber,
    string: generateString,
    oneof: generateOneOf,
    name: generateName,
    id: generateId,
  };

  const val = typesToFunc[type](params);

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
