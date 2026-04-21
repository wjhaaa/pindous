import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { AtButton, AtTag, AtIcon } from "taro-ui";
import Taro from "@tarojs/taro";
import "./detail.scss";

interface WorkDetail {
  id: number;
  title: string;
  image: string;
  category: string;
  difficulty: "简单" | "中等" | "困难";
  likes: number;
  description: string;
  tags: string[];
  author: string;
  createTime: string;
  materials: string[];
  steps: string[];
  size: string;
  timeRequired: string;
}

const Detail: React.FC = () => {
  const [work, setWork] = useState<WorkDetail | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(0);

  const works: WorkDetail[] = [
    {
      id: 1,
      title: "可爱小熊",
      image: "https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=小熊",
      category: "动物",
      difficulty: "简单",
      likes: 156,
      description:
        "这是一款非常适合初学者的可爱小熊拼豆作品。整体设计简洁明了，色彩搭配温馨可爱，制作过程简单有趣。",
      tags: ["可爱", "动物", "简单", "初学者"],
      author: "豆豆爱好者",
      createTime: "2024-01-15",
      materials: [
        "红色拼豆",
        "白色拼豆",
        "黑色拼豆",
        "棕色拼豆",
        "拼豆板",
        "熨斗",
      ],
      steps: [
        "准备拼豆板和所需颜色的拼豆",
        "按照设计图纸摆放拼豆",
        "从底部开始，先摆放小熊的身体轮廓",
        "填充小熊的身体颜色",
        "添加眼睛、鼻子等细节",
        "使用熨斗加热固定拼豆",
        "冷却后取下完成的作品",
      ],
      size: "15x15cm",
      timeRequired: "约30分钟",
    },
    {
      id: 2,
      title: "彩虹独角兽",
      image: "https://via.placeholder.com/400x400/4ECDC4/FFFFFF?text=独角兽",
      category: "神话",
      difficulty: "中等",
      likes: 234,
      description:
        "梦幻的彩虹独角兽作品，色彩丰富，设计精美。适合有一定基础的拼豆爱好者挑战。",
      tags: ["梦幻", "神话", "彩色", "中等难度"],
      author: "彩虹艺术家",
      createTime: "2024-01-20",
      materials: ["彩虹色拼豆套装", "白色拼豆", "拼豆板", "熨斗"],
      steps: [
        "准备彩虹色拼豆和拼豆板",
        "从独角兽的角开始制作",
        "逐步完成头部和身体",
        "添加彩虹鬃毛和尾巴",
        "细致处理眼睛和细节",
        "加热固定",
        "完成作品",
      ],
      size: "20x25cm",
      timeRequired: "约1小时",
    },
    {
      id: 3,
      title: "像素马里奥",
      image: "https://via.placeholder.com/400x400/45B7D1/FFFFFF?text=马里奥",
      category: "游戏",
      difficulty: "困难",
      likes: 189,
      description: "经典游戏角色马里奥的像素风格作品，细节丰富，制作难度较高。",
      tags: ["游戏", "像素", "经典", "高难度"],
      author: "游戏达人",
      createTime: "2024-01-25",
      materials: ["红色拼豆", "蓝色拼豆", "棕色拼豆", "拼豆板", "熨斗"],
      steps: [
        "准备像素设计图纸",
        "从底部开始逐行摆放",
        "注意颜色搭配和像素对齐",
        "处理复杂的细节部分",
        "仔细检查每个像素点",
        "加热固定",
        "完成作品",
      ],
      size: "25x30cm",
      timeRequired: "约2小时",
    },
  ];

  useEffect(() => {
    const { id } = Taro.getCurrentInstance().router?.params || {};
    const workId = parseInt(id || "1");
    const foundWork = works.find((w) => w.id === workId);

    if (foundWork) {
      setWork(foundWork);
      setCurrentLikeCount(foundWork.likes);
      Taro.setNavigationBarTitle({
        title: foundWork.title,
      });
    }
  }, []);

  const handleLike = () => {
    if (work) {
      setIsLiked(!isLiked);
      setCurrentLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    }
  };

  const handleShare = () => {
    Taro.showShareMenu({
      withShareTicket: true,
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

  if (!work) {
    return (
      <View className="loading">
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="detail" scrollY>
      {/* 作品图片 */}
      <View className="work-image-section">
        <Image className="work-image" src={work.image} mode="aspectFit" />
      </View>

      {/* 作品基本信息 */}
      <View className="work-info">
        <View className="work-header">
          <Text className="work-title">{work.title}</Text>
          <View className="like-section" onClick={handleLike}>
            <AtIcon
              value="heart"
              size="20"
              color={isLiked ? "#FF6B6B" : "#ccc"}
            />
            <Text className="like-count">{currentLikeCount}</Text>
          </View>
        </View>

        <View className="work-meta">
          <AtTag
            size="small"
            customStyle={{
              backgroundColor: getDifficultyColor(work.difficulty),
              color: "#fff",
            }}
          >
            {work.difficulty}
          </AtTag>
          <Text className="work-category">{work.category}</Text>
        </View>

        <Text className="work-description">{work.description}</Text>

        <View className="work-tags">
          {work.tags.map((tag, index) => (
            <AtTag key={index} size="small" className="tag">
              {tag}
            </AtTag>
          ))}
        </View>

        <View className="work-stats">
          <View className="stat-item">
            <Text className="stat-label">尺寸</Text>
            <Text className="stat-value">{work.size}</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-label">制作时间</Text>
            <Text className="stat-value">{work.timeRequired}</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-label">作者</Text>
            <Text className="stat-value">{work.author}</Text>
          </View>
        </View>
      </View>

      {/* 所需材料 */}
      <View className="materials-section">
        <Text className="section-title">所需材料</Text>
        <View className="materials-list">
          {work.materials.map((material, index) => (
            <View key={index} className="material-item">
              <AtIcon value="check" size="16" color="#4CAF50" />
              <Text className="material-text">{material}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 制作步骤 */}
      <View className="steps-section">
        <Text className="section-title">制作步骤</Text>
        <View className="steps-list">
          {work.steps.map((step, index) => (
            <View key={index} className="step-item">
              <View className="step-number">{index + 1}</View>
              <Text className="step-text">{step}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 操作按钮 */}
      <View className="action-buttons">
        <AtButton type="primary" className="action-btn" onClick={handleShare}>
          分享作品
        </AtButton>
        <AtButton type="secondary" className="action-btn">
          收藏教程
        </AtButton>
      </View>
    </ScrollView>
  );
};

export default Detail;
