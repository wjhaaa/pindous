export default {
  pages: [
    "pages/quiz-home/index",
    "pages/quiz/index",
    "pages/quiz-favorite/index",
    "pages/quiz-wrong/index",
    "pages/quiz-flagged/index",
    "pages/quiz-profile/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "前端刷题",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#999999",
    selectedColor: "#1890FF",
    backgroundColor: "#ffffff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/quiz-home/index",
        text: "首页",
        iconPath: "assets/icons/home.png",
        selectedIconPath: "assets/icons/home-active.png",
      },
      {
        pagePath: "pages/quiz-profile/index",
        text: "我的",
        iconPath: "assets/icons/user.png",
        selectedIconPath: "assets/icons/user-active.png",
      },
    ],
  },
};
