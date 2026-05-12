import { Question } from "@/types/question";
import { javascriptQuestions } from "./javascript";
import { reactQuestions } from "./react";
import { vueQuestions } from "./vue";
import { htmlCssQuestions } from "./html-css";
import { engineeringQuestions } from "./engineering";
import { typescriptQuestions } from "./typescript";

export const questions: Question[] = [
  ...javascriptQuestions,
  ...reactQuestions,
  ...vueQuestions,
  ...htmlCssQuestions,
  ...engineeringQuestions,
  ...typescriptQuestions,
];

export { javascriptQuestions } from "./javascript";
export { reactQuestions } from "./react";
export { vueQuestions } from "./vue";
export { htmlCssQuestions } from "./html-css";
export { engineeringQuestions } from "./engineering";
export { typescriptQuestions } from "./typescript";
