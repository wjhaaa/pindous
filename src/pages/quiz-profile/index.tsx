import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { questions } from "@/mock/questions";
import "./index.scss";

interface UserProgress {
  totalQuestions: number;
  learnedCount: number;
  favoriteCount: number;
  learningDays: number;
  todayCount: number;
  lastLearningDate: string;
}

const QuizProfile: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>({
    totalQuestions: questions.length,
    learnedCount: 0,
    favoriteCount: 0,
    learningDays: 0,
    todayCount: 0,
    lastLearningDate: "",
  });

  const [categoryStats, setCategoryStats] = useState<
    Array<{ category: string; total: number; learned: number }>
  >([]);

  useEffect(() => {
    loadProgress();
    loadCategoryStats();
  }, []);

  const loadProgress = () => {
    try {
      const savedProgress = Taro.getStorageSync("quiz_progress");
      const favorites = Taro.getStorageSync("quiz_favorites") || [];
      const learned = Taro.getStorageSync("quiz_learned") || [];

      if (savedProgress) {
        const today = new Date().toDateString();
        const lastDate = savedProgress.lastLearningDate || "";

        let learningDays = savedProgress.learningDays || 0;
        if (lastDate !== today && savedProgress.todayCount > 0) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (lastDate === yesterday.toDateString()) {
            learningDays++;
          } else {
            learningDays = 1;
          }
        } else if (!lastDate) {
          learningDays = 1;
        }

        setProgress({
          totalQuestions: savedProgress.totalQuestions || questions.length,
          learnedCount: learned.length,
          favoriteCount: favorites.length,
          learningDays,
          todayCount: savedProgress.todayCount || 0,
          lastLearningDate: savedProgress.lastLearningDate || "",
        });
      }
    } catch (error) {
      console.error("加载进度失败:", error);
    }
  };

  const loadCategoryStats = () => {
    const categories = ["JavaScript", "React", "Vue", "HTML/CSS", "工程化"];
    const learned = Taro.getStorageSync("quiz_learned") || [];

    const stats = categories.map((category) => {
      const total = questions.filter((q) => q.category === category).length;
      const learnedQuestions = questions.filter(
        (q) => q.category === category && learned.includes(q.id),
      ).length;
      return {
        category,
        total,
        learned: learnedQuestions,
      };
    });

    setCategoryStats(stats);
  };

  const handleResetProgress = () => {
    Taro.showModal({
      title: "确认重置",
      content: "确定要重置所有学习进度吗？此操作不可恢复。",
      success: (res) => {
        if (res.confirm) {
          try {
            Taro.removeStorageSync("quiz_progress");
            Taro.removeStorageSync("quiz_learned");
            Taro.removeStorageSync("quiz_favorites");

            setProgress({
              totalQuestions: questions.length,
              learnedCount: 0,
              favoriteCount: 0,
              learningDays: 0,
              todayCount: 0,
              lastLearningDate: "",
            });

            setCategoryStats(
              ["JavaScript", "React", "Vue", "HTML/CSS", "工程化"].map(
                (category) => ({
                  category,
                  total: questions.filter((q) => q.category === category)
                    .length,
                  learned: 0,
                }),
              ),
            );

            Taro.showToast({
              title: "重置成功",
              icon: "success",
            });
          } catch (error) {
            console.error("重置失败:", error);
            Taro.showToast({
              title: "重置失败",
              icon: "none",
            });
          }
        }
      },
    });
  };

  const getProgressPercentage = (learned: number, total: number) => {
    return total > 0 ? Math.round((learned / total) * 100) : 0;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "#67C23A";
    if (percentage >= 50) return "#E6A23C";
    return "#F56C6C";
  };

  return (
    <ScrollView className="quiz-profile" scrollY>
      <View className="header">
        <View className="header-content">
          <Text className="header-title">我的学习</Text>
          <Text className="header-subtitle">坚持学习，每天进步</Text>
        </View>
      </View>

      <View className="stats-section">
        <View className="stats-card">
          <View className="stat-item">
            <Text className="stat-value">{progress.learnedCount}</Text>
            <Text className="stat-label">已学习</Text>
          </View>
          <View className="stat-divider" />
          <View className="stat-item">
            <Text className="stat-value">{progress.favoriteCount}</Text>
            <Text className="stat-label">收藏</Text>
          </View>
          <View className="stat-divider" />
          <View className="stat-item">
            <Text className="stat-value">{progress.learningDays}</Text>
            <Text className="stat-label">学习天数</Text>
          </View>
        </View>
      </View>

      <View className="overview-section">
        <View className="section-header">
          <Text className="section-title">学习概览</Text>
        </View>
        <View className="overview-card">
          <View className="overview-item">
            <Text className="overview-label">总题目数</Text>
            <Text className="overview-value">{progress.totalQuestions}</Text>
          </View>
          <View className="overview-item">
            <Text className="overview-label">今日学习</Text>
            <Text className="overview-value">{progress.todayCount}</Text>
          </View>
          <View className="overview-item">
            <Text className="overview-label">学习进度</Text>
            <Text className="overview-value">
              {getProgressPercentage(
                progress.learnedCount,
                progress.totalQuestions,
              )}
              %
            </Text>
          </View>
        </View>
      </View>

      <View className="categories-section">
        <View className="section-header">
          <Text className="section-title">分类进度</Text>
        </View>
        <View className="categories-list">
          {categoryStats.map((stat, index) => (
            <View key={index} className="category-item">
              <View className="category-info">
                <Text className="category-name">{stat.category}</Text>
                <Text className="category-count">
                  {stat.learned} / {stat.total}
                </Text>
              </View>
              <View className="progress-bar">
                <View
                  className="progress-fill"
                  style={{
                    width: `${getProgressPercentage(
                      stat.learned,
                      stat.total,
                    )}%`,
                    backgroundColor: getProgressColor(
                      getProgressPercentage(stat.learned, stat.total),
                    ),
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="actions-section">
        <View className="action-card" onClick={handleResetProgress}>
          <Text className="action-icon">🔄</Text>
          <Text className="action-text">重置进度</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default QuizProfile;
