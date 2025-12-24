import antfu from "@antfu/eslint-config";

export default antfu(
  { rules: {
    "perfectionist/sort-object-types": ["warn", { alphabet: "natural" }],
    "perfectionist/sort-objects": ["warn", { alphabet: "natural" }],
    "style/max-len": ["warn", 110],
    "style/newline-per-chained-call": ["warn", { ignoreChainWithDepth: 2 }],
    "style/no-extra-parens": ["warn", "all"],
    "style/object-curly-newline": ["warn", { minProperties: 2 }],
    "style/object-curly-spacing": ["warn", "always"],
    "style/quotes": ["warn", "double"],
    "style/semi": ["warn", "always"],
    "vue/attribute-hyphenation": ["warn", "always"],
    "vue/attributes-order": [
      "warn",
      { alphabetical: true },
    ],
    "vue/max-attributes-per-line": ["warn", { singleline: 1 }],
    "vue/v-bind-style": ["warn", "shorthand", { sameNameShorthand: "always" }],
  } },
);
