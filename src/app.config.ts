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
    color: "#666666",
    selectedColor: "#667eea",
    backgroundColor: "#ffffff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/quiz-home/index",
        text: "首页",
        iconPath: "assets/icons/home.png",
        selectedIconPath: "assets/icons/home.png",
      },
      {
        pagePath: "pages/quiz-profile/index",
        text: "我的",
        iconPath: "assets/icons/gallery.png",
        selectedIconPath: "assets/icons/gallery.png",
      },
    ],
  },
};
