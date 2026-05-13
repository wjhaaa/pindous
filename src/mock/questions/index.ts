import { Question } from "@/types/question";
import { javascriptQuestions } from "./javascript";
import { browserWebApiQuestions } from "./browser-web-api";
import { typescriptQuestions } from "./typescript";
import { reactQuestions } from "./react";
import { vueQuestions } from "./vue";
import { htmlCssQuestions } from "./html-css";
import { engineeringQuestions } from "./engineering";
import { scenarioQuestions } from "./scenario";

export const questions: Question[] = [
  ...javascriptQuestions,
  ...browserWebApiQuestions,
  ...typescriptQuestions,
  ...reactQuestions,
  ...vueQuestions,
  ...htmlCssQuestions,
  ...engineeringQuestions,
  ...scenarioQuestions,
];

export { javascriptQuestions } from "./javascript";
export { browserWebApiQuestions } from "./browser-web-api";
export { typescriptQuestions } from "./typescript";
export { reactQuestions } from "./react";
export { vueQuestions } from "./vue";
export { htmlCssQuestions } from "./html-css";
export { engineeringQuestions } from "./engineering";
export { scenarioQuestions } from "./scenario";
