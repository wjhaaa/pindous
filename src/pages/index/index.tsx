import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { AtButton, AtCard, AtTag } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.scss";

interface WorkItem {
  id: number;
  title: string;
  image: string;
  category: string;
  difficulty: "简单" | "中等" | "困难";
  likes: number;
  description: string;
  // 小红书相关字段
  source?: "xiaohongshu" | "local";
  sourceUrl?: string;
  author?: string;
  tags?: string[];
  publishTime?: string;
  viewCount?: number;
  collectCount?: number;
}

const Index: React.FC = () => {
  const [featuredWorks] = useState<WorkItem[]>([
    {
      id: 1,
      title: "可爱小熊拼豆教程",
      image:
        "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=%E5%B0%8F%E7%86%8A",
      category: "动物",
      difficulty: "简单",
      likes: 1560,
      description: "来自小红书用户@拼豆小仙女的可爱小熊教程，新手友好",
      source: "xiaohongshu",
      sourceUrl: "https://xiaohongshu.com/note/123456",
      author: "拼豆小仙女",
      tags: ["新手友好", "小熊", "教程"],
      publishTime: "2024-01-15",
      viewCount: 12500,
      collectCount: 890,
    },
    {
      id: 2,
      title: "彩虹独角兽梦幻制作",
      image:
        "https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=%E7%8B%AC%E8%A7%92%E5%85%BD",
      category: "神话",
      difficulty: "中等",
      likes: 2340,
      description: "小红书热门作品，彩虹独角兽的梦幻色彩搭配",
      source: "xiaohongshu",
      sourceUrl: "https://xiaohongshu.com/note/234567",
      author: "豆豆创意工坊",
      tags: ["独角兽", "彩虹", "梦幻"],
      publishTime: "2024-01-20",
      viewCount: 18900,
      collectCount: 1200,
    },
    {
      id: 3,
      title: "像素马里奥进阶教程",
      image:
        "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=%E9%A9%AC%E9%87%8C%E5%A5%A5",
      category: "游戏",
      difficulty: "困难",
      likes: 1890,
      description: "小红书大神@像素艺术家的马里奥像素风格作品",
      source: "xiaohongshu",
      sourceUrl: "https://xiaohongshu.com/note/345678",
      author: "像素艺术家",
      tags: ["马里奥", "像素", "游戏角色"],
      publishTime: "2024-01-25",
      viewCount: 21500,
      collectCount: 1560,
    },
    {
      id: 4,
      title: "樱花季节限定拼豆",
      image:
        "https://via.placeholder.com/400x300/FF9FF3/FFFFFF?text=%E6%A8%B1%E8%8A%B1",
      category: "植物",
      difficulty: "中等",
      likes: 3120,
      description: "小红书爆款樱花主题拼豆，季节限定作品",
      source: "xiaohongshu",
      sourceUrl: "https://xiaohongshu.com/note/456789",
      author: "樱花拼豆社",
      tags: ["樱花", "季节限定", "植物"],
      publishTime: "2024-02-01",
      viewCount: 27800,
      collectCount: 2100,
    },
    {
      id: 5,
      title: "迷你卡通人物系列",
      image:
        "https://via.placeholder.com/400x300/FFB86B/FFFFFF?text=%E4%BA%BA%E7%89%A9",
      category: "人物",
      difficulty: "简单",
      likes: 1870,
      description: "小红书热门迷你卡通人物拼豆系列教程",
      source: "xiaohongshu",
      sourceUrl: "https://xiaohongshu.com/note/567890",
      author: "迷你拼豆家",
      tags: ["卡通", "人物", "迷你"],
      publishTime: "2024-02-05",
      viewCount: 16500,
      collectCount: 980,
    },
    {
      id: 6,
      title: "3D立体拼豆艺术",
      image: "https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=3D",
      category: "创意",
      difficulty: "困难",
      likes: 2560,
      description: "小红书大神创作的3D立体拼豆艺术作品",
      source: "xiaohongshu",
      sourceUrl: "https://xiaohongshu.com/note/678901",
      author: "3D拼豆大师",
      tags: ["3D", "立体", "创意"],
      publishTime: "2024-02-10",
      viewCount: 19800,
      collectCount: 1450,
    },
  ]);

  const [categories] = useState<string[]>([
    "动物",
    "植物",
    "人物",
    "食物",
    "游戏",
    "神话",
    "节日",
    "其他",
  ]);

  const handleViewGallery = () => {
    Taro.navigateTo({
      url: "/pages/gallery/gallery",
    });
  };

  const handleOpenGenerator = () => {
    Taro.switchTab({
      url: "/pages/generator/index",
    });
  };

  const handleWorkClick = (work: WorkItem) => {
    Taro.navigateTo({
      url: `/pages/detail/detail?id=${work.id}`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "简单":
        return "#4CAF50";
      case "中等":
        return "#FF9800";
      case "困难":
        return "#F44336";
      default:
        return "#666";
    }
  };

  return (
    <ScrollView className="index" scrollY>
      {/* 现代化头部横幅 */}
      <View className="banner">
        <Image
          className="banner-image"
          src="https://via.placeholder.com/750x400/111827/FFFFFF?text=%E6%8B%BC%E8%B1%86%E7%94%9F%E6%88%90%E5%99%A8"
          mode="aspectFill"
        />
        <View className="banner-content">
          <Text className="banner-title">创意拼豆世界</Text>
          <Text className="banner-subtitle">发现无限可能的拼豆艺术</Text>
        </View>
      </View>

      {/* 快速导航 */}
      <View className="quick-nav">
        <Text className="section-title">快速浏览</Text>
        <View className="generator-entry">
          <AtButton type="primary" onClick={handleOpenGenerator}>
            打开拼豆图纸生成器
          </AtButton>
        </View>
        <View className="categories">
          {categories.map((category, index) => (
            <View
              key={index}
              className="category-item"
              onClick={() =>
                Taro.showToast({ title: `浏览${category}作品`, icon: "none" })
              }
            >
              <Text className="category-text">{category}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 精选作品 */}
      <View className="featured-works">
        <View className="section-header">
          <Text className="section-title">精选作品</Text>
          <View className="view-all" onClick={handleViewGallery}>
            <Text>查看全部</Text>
            <Text>→</Text>
          </View>
        </View>

        <View className="works-grid">
          {featuredWorks.map((work) => (
            <View
              key={work.id}
              className="work-card"
              onClick={() => handleWorkClick(work)}
            >
              <Image
                className="work-image"
                src={work.image}
                mode="aspectFill"
              />
              <View className="work-info">
                <View className="work-meta">
                  <View
                    className="difficulty-tag"
                    style={{
                      backgroundColor: getDifficultyColor(work.difficulty),
                    }}
                  >
                    <Text className="difficulty-text">{work.difficulty}</Text>
                  </View>
                  <Text className="work-category">{work.category}</Text>
                  {work.source === "xiaohongshu" && (
                    <View className="source-tag">
                      <Text className="source-text">小红书</Text>
                    </View>
                  )}
                </View>
                <Text className="work-title">{work.title}</Text>
                <Text className="work-description">{work.description}</Text>

                {/* 小红书数据统计 */}
                {work.source === "xiaohongshu" && (
                  <View className="xiaohongshu-stats">
                    <View className="stat-item">
                      <Text className="stat-icon">👁️</Text>
                      <Text className="stat-value">{work.viewCount}</Text>
                    </View>
                    <View className="stat-item">
                      <Text className="stat-icon">❤️</Text>
                      <Text className="stat-value">{work.likes}</Text>
                    </View>
                    <View className="stat-item">
                      <Text className="stat-icon">⭐</Text>
                      <Text className="stat-value">{work.collectCount}</Text>
                    </View>
                  </View>
                )}

                {/* 作者信息 */}
                {work.author && (
                  <View className="author-info">
                    <Text className="author-text">by {work.author}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 新手引导 */}
      <View className="guide-section">
        <Text className="section-title">新手入门</Text>
        <View className="guide-cards">
          <View className="guide-card">
            <Text className="guide-card-title">拼豆基础教程</Text>
            <Text className="guide-card-desc">
              学习拼豆的基本技巧和工具使用
            </Text>
          </View>
          <View className="guide-card">
            <Text className="guide-card-title">材料选购指南</Text>
            <Text className="guide-card-desc">
              如何选择合适的拼豆材料和工具
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;
