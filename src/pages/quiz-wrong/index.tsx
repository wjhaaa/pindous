import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { questions } from "@/mock/questions";
import { Question } from "@/types/question";
import "./index.scss";

const QuizWrong: React.FC = () => {
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);

  useEffect(() => {
    loadWrongQuestions();
  }, []);

  const loadWrongQuestions = () => {
    try {
      const wrongIds = Taro.getStorageSync("quiz_wrong") || [];
      const wrongList = questions.filter((q) => wrongIds.includes(q.id));
      setWrongQuestions(wrongList);
    } catch (error) {
      console.error("加载错题失败:", error);
    }
  };

  const handleQuestionClick = (questionId: string) => {
    Taro.navigateTo({
      url: `/pages/quiz/index?mode=review&id=${questionId}`,
    });
  };

  const handleClearWrong = () => {
    Taro.showModal({
      title: "提示",
      content: "确定要清空错题本吗？",
      success: (res) => {
        if (res.confirm) {
          try {
            Taro.setStorageSync("quiz_wrong", []);
            setWrongQuestions([]);
            Taro.showToast({
              title: "已清空",
              icon: "success",
            });
          } catch (error) {
            console.error("清空错题失败:", error);
          }
        }
      },
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
    <ScrollView className="quiz-wrong" scrollY>
      <View className="header">
        <View className="header-content">
          <Text className="header-title">错题本</Text>
          <Text className="header-subtitle">
            共 {wrongQuestions.length} 道错题
          </Text>
        </View>
      </View>

      {wrongQuestions.length === 0 ? (
        <View className="empty-section">
          <View className="empty-icon">📝</View>
          <Text className="empty-text">暂无错题</Text>
          <Text className="empty-desc">继续加油，保持正确率！</Text>
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
        <>
          <View className="wrong-list">
            {wrongQuestions.map((question) => (
              <View
                key={question.id}
                className="wrong-item"
                onClick={() => handleQuestionClick(question.id)}
              >
                <View className="wrong-header">
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
                  <View className="wrong-icon">❌</View>
                </View>
                <Text className="wrong-title">{question.title}</Text>
                <View className="wrong-tags">
                  {question.tags.map((tag, index) => (
                    <View key={index} className="tag">
                      <Text className="tag-text">{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View className="footer-actions">
            <View className="clear-btn" onClick={handleClearWrong}>
              <Text className="clear-text">清空错题本</Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default QuizWrong;
