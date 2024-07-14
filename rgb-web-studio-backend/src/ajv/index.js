ajv.addFormat("byte", {
  type: "number",
  validate: (x) => x >= 0 && x <= 255 && x % 1 == 0,
});
