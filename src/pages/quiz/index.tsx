import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { questions } from "@/mock/questions";
import { Question } from "@/types/question";
import "./index.scss";

const Quiz: React.FC = () => {
  const router = useRouter();
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [learnedQuestions, setLearnedQuestions] = useState<string[]>([]);

  useEffect(() => {
    loadQuestions();
    loadLearnedQuestions();
  }, []);

  const loadQuestions = () => {
    const { category, mode, id } = router.params;

    let filteredQuestions: Question[] = [];

    if (mode === "daily" && id) {
      const dailyQuestion = questions.find((q) => q.id === id);
      if (dailyQuestion) {
        filteredQuestions = [dailyQuestion];
      }
    } else if (category) {
      filteredQuestions = questions.filter(
        (q) => q.category === decodeURIComponent(category),
      );
    } else {
      filteredQuestions = [...questions];
    }

    if (filteredQuestions.length === 0) {
      Taro.showToast({
        title: "暂无题目",
        icon: "none",
      });
      return;
    }

    setQuizQuestions(filteredQuestions);
    loadFavoriteStatus(filteredQuestions[0].id);
    loadFlagStatus(filteredQuestions[0].id);
  };

  const loadLearnedQuestions = () => {
    try {
      const learned = Taro.getStorageSync("quiz_learned") || [];
      setLearnedQuestions(learned);
    } catch (error) {
      console.error("加载学习记录失败:", error);
    }
  };

  const loadFavoriteStatus = (questionId: string) => {
    try {
      const favorites = Taro.getStorageSync("quiz_favorites") || [];
      setIsFavorite(favorites.includes(questionId));
    } catch (error) {
      console.error("加载收藏状态失败:", error);
    }
  };

  const loadFlagStatus = (questionId: string) => {
    try {
      const flagged = Taro.getStorageSync("quiz_flagged") || [];
      setIsFlagged(flagged.includes(questionId));
    } catch (error) {
      console.error("加载标记状态失败:", error);
    }
  };

  const handleToggleAnswer = () => {
    const newShowAnswer = !showAnswer;
    setShowAnswer(newShowAnswer);

    if (newShowAnswer) {
      markAsLearned();
    }
  };

  const markAsLearned = () => {
    const currentQuestion = quizQuestions[currentIndex];
    try {
      let learned = Taro.getStorageSync("quiz_learned") || [];

      if (!learned.includes(currentQuestion.id)) {
        learned.push(currentQuestion.id);
        Taro.setStorageSync("quiz_learned", learned);
        setLearnedQuestions(learned);

        const progress = Taro.getStorageSync("quiz_progress") || {};
        progress.learnedCount = learned.length;
        progress.learningDays = calculateLearningDays();
        Taro.setStorageSync("quiz_progress", progress);
      }
    } catch (error) {
      console.error("标记学习失败:", error);
    }
  };

  const calculateLearningDays = () => {
    try {
      const progress = Taro.getStorageSync("quiz_progress") || {};
      const lastDate = progress.lastLearningDate;
      const today = new Date().toDateString();

      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastDate === yesterdayStr) {
          return (progress.learningDays || 0) + 1;
        } else if (!lastDate) {
          return 1;
        } else {
          return 1;
        }
      }
      return progress.learningDays || 0;
    } catch (error) {
      return 0;
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizQuestions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setShowAnswer(false);
      loadFavoriteStatus(quizQuestions[nextIndex].id);
      loadFlagStatus(quizQuestions[nextIndex].id);
    } else {
      Taro.showToast({
        title: "已完成所有题目",
        icon: "success",
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    }
  };

  const handleToggleFavorite = () => {
    const currentQuestion = quizQuestions[currentIndex];
    try {
      let favorites = Taro.getStorageSync("quiz_favorites") || [];
      const index = favorites.indexOf(currentQuestion.id);

      if (index > -1) {
        favorites.splice(index, 1);
        setIsFavorite(false);
        Taro.showToast({
          title: "已取消收藏",
          icon: "none",
        });
      } else {
        favorites.push(currentQuestion.id);
        setIsFavorite(true);
        Taro.showToast({
          title: "已收藏",
          icon: "success",
        });
      }

      Taro.setStorageSync("quiz_favorites", favorites);
    } catch (error) {
      console.error("收藏失败:", error);
    }
  };

  const handleToggleFlag = () => {
    const currentQuestion = quizQuestions[currentIndex];
    try {
      let flagged = Taro.getStorageSync("quiz_flagged") || [];
      const index = flagged.indexOf(currentQuestion.id);

      if (index > -1) {
        flagged.splice(index, 1);
        setIsFlagged(false);
        Taro.showToast({ title: "已取消标记", icon: "none" });
      } else {
        flagged.push(currentQuestion.id);
        setIsFlagged(true);
        Taro.showToast({ title: "已标记（待审查）", icon: "none" });
      }

      Taro.setStorageSync("quiz_flagged", flagged);
    } catch (error) {
      console.error("标记失败:", error);
    }
  };

  const isLearned = learnedQuestions.includes(quizQuestions[currentIndex]?.id);

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

  if (quizQuestions.length === 0) {
    return (
      <View className="quiz-loading">
        <Text className="loading-text">加载中...</Text>
      </View>
    );
  }

  const currentQuestion = quizQuestions[currentIndex];

  return (
    <ScrollView className="quiz" scrollY>
      <View className="quiz-container">
        <View className="quiz-header">
          <View className="header-content">
            <View className="progress-info">
              <Text className="progress-text">
                第 {currentIndex + 1} 题 / 共 {quizQuestions.length} 题
              </Text>
              <View className="progress-bar">
                <View
                  className="progress-fill"
                  style={{
                    width: `${
                      ((currentIndex + 1) / quizQuestions.length) * 100
                    }%`,
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="question-card">
          <View className="question-header">
            <View className="question-meta">
              <View
                className="difficulty-badge"
                style={{
                  backgroundColor: getDifficultyColor(
                    currentQuestion.difficulty,
                  ),
                }}
              >
                <Text className="difficulty-text">
                  {getDifficultyText(currentQuestion.difficulty)}
                </Text>
              </View>
              <Text className="category-badge">{currentQuestion.category}</Text>
              {isLearned && (
                <View className="learned-badge">
                  <Text className="learned-text">已学习</Text>
                </View>
              )}
            </View>
            <View className="flex justify-end header-actions">
              <View
                className={`mr-10 ${isFlagged ? "active" : ""}`}
                onClick={handleToggleFlag}
              >
                <Text className="text-sm text-color666">
                  {isFlagged ? "已标记" : "标记"}
                </Text>
              </View>
              <View
                className={` ${isFavorite ? "active" : ""}`}
                onClick={handleToggleFavorite}
              >
                <Text className="text-sm text-color666">
                  {isFavorite ? "已收藏" : "收藏"}
                </Text>
              </View>
            </View>
          </View>

          <View className="question-content">
            <Text className="question-title">{currentQuestion.title}</Text>
          </View>

          <View className="answer-toggle" onClick={handleToggleAnswer}>
            <Text className="toggle-text">
              {showAnswer ? "收起答案" : "展开答案"}
            </Text>
            <Text className="toggle-icon">{showAnswer ? "▲" : "▼"}</Text>
          </View>

          {showAnswer && (
            <View className="answer-section">
              <View className="answer-card">
                <View className="answer-header">
                  <Text className="answer-label">正确答案</Text>
                  <Text className="answer-value">{currentQuestion.answer}</Text>
                </View>
              </View>

              <View className="explanation-card">
                <View className="explanation-header">
                  <Text className="explanation-label">解析</Text>
                </View>
                <Text className="explanation-text">
                  {currentQuestion.explanation}
                </Text>
              </View>
            </View>
          )}

          <View className="action-buttons">
            <View
              className="action-btn secondary"
              onClick={() => Taro.navigateBack()}
            >
              <Text className="btn-text">返回</Text>
            </View>
            <View className="action-btn primary" onClick={handleNextQuestion}>
              <Text className="btn-text">
                {currentIndex < quizQuestions.length - 1 ? "下一题" : "完成"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Quiz;
