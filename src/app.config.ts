export default {
  pages: [
    "pages/index/index",
    "pages/generator/index",
    "pages/gallery/gallery",
    "pages/detail/detail",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "拼豆作品展示",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#666666",
    selectedColor: "#FF6B6B",
    backgroundColor: "#ffffff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assets/icons/home.png",
        selectedIconPath: "assets/icons/home.png",
      },
      {
        pagePath: "pages/generator/index",
        text: "生成器",
        iconPath: "assets/icons/gallery.png",
        selectedIconPath: "assets/icons/gallery.png",
      },
      {
        pagePath: "pages/gallery/gallery",
        text: "作品集",
        iconPath: "assets/icons/gallery.png",
        selectedIconPath: "assets/icons/gallery.png",
      },
    ],
  },
};
