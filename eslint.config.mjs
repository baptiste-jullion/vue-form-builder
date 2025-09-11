// @ts-check
import antfu from "@antfu/eslint-config";

export default antfu(
  {
    rules: {
      "style/quotes": ["warn", "double"],
      "style/semi": ["warn", "always"],
    },
  },
);
