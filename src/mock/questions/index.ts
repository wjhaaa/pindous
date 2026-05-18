import { Question } from "@/types/question";
import { javascriptQuestions } from "./javascript";
import { browserWebApiQuestions } from "./browser-web-api";
import { htmlCssQuestions } from "./html-css";
import { typescriptQuestions } from "./typescript";
import { reactQuestions } from "./react";
import { taroMiniProgramQuestions } from "./taro-mini-program";
import { engineeringQuestions } from "./engineering";
import { scenarioQuestions } from "./scenario";

export const questions: Question[] = [
  ...javascriptQuestions,
  ...browserWebApiQuestions,
  ...htmlCssQuestions,
  ...typescriptQuestions,
  ...reactQuestions,
  ...taroMiniProgramQuestions,
  ...engineeringQuestions,
  ...scenarioQuestions,
];

export { javascriptQuestions } from "./javascript";
export { browserWebApiQuestions } from "./browser-web-api";
export { htmlCssQuestions } from "./html-css";
export { typescriptQuestions } from "./typescript";
export { reactQuestions } from "./react";
export { taroMiniProgramQuestions } from "./taro-mini-program";
export { engineeringQuestions } from "./engineering";
export { scenarioQuestions } from "./scenario";
