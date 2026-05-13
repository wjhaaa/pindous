import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { questions } from "@/mock/questions";
import { Question } from "@/types/question";
import "./index.scss";

const QuizFlagged: React.FC = () => {
  const [flaggedQuestions, setFlaggedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    loadFlaggedQuestions();
  }, []);

  const loadFlaggedQuestions = () => {
    try {
      const flaggedIds = Taro.getStorageSync("quiz_flagged") || [];
      const flaggedList = questions.filter((q) => flaggedIds.includes(q.id));
      setFlaggedQuestions(flaggedList);
    } catch (error) {
      console.error("加载标记列表失败:", error);
    }
  };

  // 从标记列表进入答题页时，能看到标记状态
  const handleQuestionClick = (questionId: string) => {
    Taro.navigateTo({
      url: `/pages/quiz/index?mode=review&id=${questionId}`,
    });
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1: return "简单";
      case 2: return "中等";
      case 3: return "困难";
      default: return "未知";
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return "#10B981";
      case 2: return "#F59E0B";
      case 3: return "#EF4444";
      default: return "#6B7280";
    }
  };

  return (
    <ScrollView className="quiz-flagged" scrollY>
      <View className="header">
        <View className="header-content">
          <Text className="header-title">待审查题目</Text>
          <Text className="header-subtitle">
            共 {flaggedQuestions.length} 道待审查
          </Text>
        </View>
      </View>

      {flaggedQuestions.length === 0 ? (
        <View className="empty-section">
          <View className="empty-icon">🚩</View>
          <Text className="empty-text">暂无标记</Text>
          <Text className="empty-desc">
            刷题时点标记图标，将答案可疑的题标为待审查
          </Text>
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
        <View className="flagged-list">
          {flaggedQuestions.map((question) => (
            <View
              key={question.id}
              className="flagged-item"
              onClick={() => handleQuestionClick(question.id)}
            >
              <View className="flagged-header">
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
                <View className="flagged-icon">🚩</View>
              </View>
              <Text className="flagged-title">{question.title}</Text>
              <View className="flagged-tags">
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

export default QuizFlagged;
