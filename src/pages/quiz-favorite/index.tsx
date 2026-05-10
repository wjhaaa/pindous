import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { questions } from "@/mock/questions";
import { Question } from "@/types/question";
import "./index.scss";

const QuizFavorite: React.FC = () => {
  const [favoriteQuestions, setFavoriteQuestions] = useState<Question[]>([]);

  useEffect(() => {
    loadFavoriteQuestions();
  }, []);

  const loadFavoriteQuestions = () => {
    try {
      const favoriteIds = Taro.getStorageSync("quiz_favorites") || [];
      const favoriteList = questions.filter((q) => favoriteIds.includes(q.id));
      setFavoriteQuestions(favoriteList);
    } catch (error) {
      console.error("加载收藏失败:", error);
    }
  };

  const handleQuestionClick = (questionId: string) => {
    Taro.navigateTo({
      url: `/pages/quiz/index?mode=review&id=${questionId}`,
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
        return "#10B981";
      case 2:
        return "#F59E0B";
      case 3:
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <ScrollView className="quiz-favorite" scrollY>
      <View className="header">
        <View className="header-content">
          <Text className="header-title">收藏夹</Text>
          <Text className="header-subtitle">
            共 {favoriteQuestions.length} 道收藏
          </Text>
        </View>
      </View>

      {favoriteQuestions.length === 0 ? (
        <View className="empty-section">
          <View className="empty-icon">⭐</View>
          <Text className="empty-text">暂无收藏</Text>
          <Text className="empty-desc">收藏重要题目，方便复习</Text>
          <View className="empty-actions">
            <View
              className="action-btn primary"
              onClick={() => Taro.switchTab({ url: "/pages/quiz-home/index" })}
            >
              <Text className="btn-text">开始刷题</Text>
            </View>
          </View>
        </View>
      ) : (
        <View className="favorite-list">
          {favoriteQuestions.map((question) => (
            <View
              key={question.id}
              className="favorite-item"
              onClick={() => handleQuestionClick(question.id)}
            >
              <View className="favorite-header">
                <View
                  className="difficulty-badge"
                  style={{
                    backgroundColor: getDifficultyColor(question.difficulty),
                  }}
                >
                  <Text className="difficulty-text">
                    {getDifficultyText(question.difficulty)}
                  </Text>
                </View>
                <Text className="category-badge">{question.category}</Text>
                <View className="favorite-icon">⭐</View>
              </View>
              <Text className="favorite-title">{question.title}</Text>
              <View className="favorite-tags">
                {question.tags.map((tag, index) => (
                  <View key={index} className="tag">
                    <Text className="tag-text">{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default QuizFavorite;
