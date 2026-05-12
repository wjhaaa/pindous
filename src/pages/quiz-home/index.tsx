import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

interface Category {
  name: string;
  count: number;
  color: string;
  icon: string;
}

const QuizHome: React.FC = () => {
  const [categories] = useState<Category[]>([
    { name: "JavaScript", count: 6, color: "#5B86E5", icon: "📜" },
    { name: "React", count: 5, color: "#67C23A", icon: "⚛️" },
    { name: "Vue", count: 2, color: "#42b883", icon: "💚" },
    { name: "HTML/CSS", count: 4, color: "#E6A23C", icon: "🎨" },
    { name: "工程化", count: 3, color: "#909399", icon: "⚙️" },
  ]);

  const [stats, setStats] = useState({
    totalQuestions: 20,
    learnedCount: 0,
    favoriteCount: 0,
    learningDays: 0,
  });

  const [dailyQuestion] = useState({
    id: "js-001",
    title: "typeof null 的结果是什么？",
    difficulty: 1,
  });

  useEffect(() => {
    loadUserProgress();
  }, []);

  const loadUserProgress = () => {
    try {
      const progress = Taro.getStorageSync("quiz_progress");
      const favorites = Taro.getStorageSync("quiz_favorites") || [];

      if (progress) {
        setStats({
          totalQuestions: progress.totalQuestions || 20,
          learnedCount: progress.learnedCount || 0,
          favoriteCount: Array.isArray(favorites) ? favorites.length : 0,
          learningDays: progress.learningDays || 0,
        });
      }
    } catch (error) {
      console.error("加载用户进度失败:", error);
    }
  };

  const handleStartQuiz = (category: string) => {
    Taro.navigateTo({
      url: `/pages/quiz/index?category=${encodeURIComponent(category)}`,
    });
  };

  const handleDailyQuiz = () => {
    Taro.navigateTo({
      url: `/pages/quiz/index?mode=daily&id=${dailyQuestion.id}`,
    });
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return "简单";
      case 2:
        return "中等";
      case 3:
        return "困难";
      default:
        return "未知";
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return "#67C23A";
      case 2:
        return "#E6A23C";
      case 3:
        return "#F56C6C";
      default:
        return "#909399";
    }
  };

  return (
    <ScrollView className="quiz-home" scrollY>
      <View className="header">
        <View className="header-content">
          <Text className="header-title">我爱学习</Text>
          <Text className="header-subtitle">每天进步一点点</Text>
        </View>
      </View>

      <View className="stats-section">
        <View className="stats-card">
          <View className="stat-item">
            <Text className="stat-value">{stats.learnedCount}</Text>
            <Text className="stat-label">已学习</Text>
          </View>
          <View className="stat-divider" />
          <View className="stat-item">
            <Text className="stat-value">{stats.favoriteCount}</Text>
            <Text className="stat-label">收藏</Text>
          </View>
          <View className="stat-divider" />
          <View className="stat-item">
            <Text className="stat-value">{stats.learningDays}</Text>
            <Text className="stat-label">学习天数</Text>
          </View>
        </View>
      </View>

      <View className="daily-section">
        <View className="section-header">
          <Text className="section-title">每日一题</Text>
          <View className="daily-badge">
            <Text className="badge-text">今日推荐</Text>
          </View>
        </View>
        <View className="daily-card" onClick={handleDailyQuiz}>
          <View className="daily-content">
            <View className="daily-icon">📝</View>
            <View className="daily-info">
              <Text className="daily-title">{dailyQuestion.title}</Text>
              <View className="daily-meta">
                <View
                  className="difficulty-tag"
                  style={{
                    backgroundColor: getDifficultyColor(
                      dailyQuestion.difficulty,
                    ),
                  }}
                >
                  <Text className="difficulty-text">
                    {getDifficultyText(dailyQuestion.difficulty)}
                  </Text>
                </View>
                <Text className="daily-action">点击学习 →</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="categories-section">
        <View className="section-header">
          <Text className="section-title">题库分类</Text>
        </View>
        <View className="categories-grid">
          {categories.map((category, index) => (
            <View
              key={index}
              className="category-card"
              onClick={() => handleStartQuiz(category.name)}
            >
              <Text className="category-icon" style={{ color: category.color }}>
                {category.icon}
              </Text>
              <Text className="category-name">{category.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default QuizHome;
