import React, { useState, useMemo } from "react";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { AtSearchBar, AtCard, AtTag, AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import "./gallery.scss";

interface WorkItem {
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
}

const Gallery: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("全部");

  const allWorks: WorkItem[] = [
    {
      id: 1,
      title: "可爱小熊",
      image: "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=小熊",
      category: "动物",
      difficulty: "简单",
      likes: 156,
      description: "可爱的小熊拼豆作品，适合初学者",
      tags: ["可爱", "动物", "简单"],
      author: "豆豆爱好者",
      createTime: "2024-01-15",
    },
    {
      id: 2,
      title: "彩虹独角兽",
      image: "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=独角兽",
      category: "神话",
      difficulty: "中等",
      likes: 234,
      description: "梦幻的彩虹独角兽，色彩丰富",
      tags: ["梦幻", "神话", "彩色"],
      author: "彩虹艺术家",
      createTime: "2024-01-20",
    },
    {
      id: 3,
      title: "像素马里奥",
      image: "https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=马里奥",
      category: "游戏",
      difficulty: "困难",
      likes: 189,
      description: "经典游戏角色马里奥的像素风格作品",
      tags: ["游戏", "像素", "经典"],
      author: "游戏达人",
      createTime: "2024-01-25",
    },
    {
      id: 4,
      title: "樱花树",
      image: "https://via.placeholder.com/300x300/FF9FF3/FFFFFF?text=樱花",
      category: "植物",
      difficulty: "中等",
      likes: 178,
      description: "春日樱花盛开的美丽场景",
      tags: ["植物", "春天", "粉色"],
      author: "自然爱好者",
      createTime: "2024-02-01",
    },
    {
      id: 5,
      title: "圣诞老人",
      image: "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=圣诞",
      category: "节日",
      difficulty: "简单",
      likes: 267,
      description: "圣诞老人的节日主题作品",
      tags: ["节日", "圣诞", "红色"],
      author: "节日达人",
      createTime: "2024-02-05",
    },
    {
      id: 6,
      title: "美味披萨",
      image: "https://via.placeholder.com/300x300/FF9F43/FFFFFF?text=披萨",
      category: "食物",
      difficulty: "中等",
      likes: 145,
      description: "看起来就很美味的披萨拼豆",
      tags: ["食物", "美味", "黄色"],
      author: "美食家",
      createTime: "2024-02-10",
    },
  ];

  const categories = [
    "全部",
    "动物",
    "植物",
    "人物",
    "食物",
    "游戏",
    "神话",
    "节日",
    "其他",
  ];
  const difficulties = ["全部", "简单", "中等", "困难"];

  const filteredWorks = useMemo(() => {
    return allWorks.filter((work) => {
      const matchesSearch =
        work.title.includes(searchValue) ||
        work.description.includes(searchValue) ||
        work.tags.some((tag) => tag.includes(searchValue));
      const matchesCategory =
        selectedCategory === "全部" || work.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "全部" || work.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchValue, selectedCategory, selectedDifficulty]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
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

  const clearFilters = () => {
    setSearchValue("");
    setSelectedCategory("全部");
    setSelectedDifficulty("全部");
  };

  return (
    <View className="gallery">
      {/* 搜索栏 */}
      <View className="search-section">
        <AtSearchBar
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="搜索作品名称、描述或标签..."
        />
      </View>

      {/* 筛选器 */}
      <View className="filters">
        <ScrollView className="filter-scroll" scrollX>
          <View className="filter-group">
            <Text className="filter-label">分类:</Text>
            {categories.map((category) => (
              <AtTag
                key={category}
                className="filter-tag"
                type={selectedCategory === category ? "primary" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </AtTag>
            ))}
          </View>

          <View className="filter-group">
            <Text className="filter-label">难度:</Text>
            {difficulties.map((difficulty) => (
              <AtTag
                key={difficulty}
                className="filter-tag"
                type={selectedDifficulty === difficulty ? "primary" : ""}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty}
              </AtTag>
            ))}
          </View>
        </ScrollView>

        <AtButton
          type="secondary"
          size="small"
          onClick={clearFilters}
          className="clear-btn"
        >
          清除筛选
        </AtButton>
      </View>

      {/* 作品统计 */}
      <View className="stats">
        <Text className="stats-text">
          找到 {filteredWorks.length} 个作品
          {selectedCategory !== "全部" && ` · ${selectedCategory}`}
          {selectedDifficulty !== "全部" && ` · ${selectedDifficulty}`}
        </Text>
      </View>

      {/* 作品网格 */}
      <ScrollView className="works-grid" scrollY>
        {filteredWorks.length === 0 ? (
          <View className="empty-state">
            <Text className="empty-text">暂无作品，请尝试其他筛选条件</Text>
          </View>
        ) : (
          filteredWorks.map((work) => (
            <AtCard
              key={work.id}
              className="work-card"
              onClick={() => handleWorkClick(work)}
            >
              <Image
                className="work-image"
                src={work.image}
                mode="aspectFill"
              />
              <View className="work-content">
                <View className="work-header">
                  <Text className="work-title">{work.title}</Text>
                  <AtTag
                    size="small"
                    customStyle={{
                      backgroundColor: getDifficultyColor(work.difficulty),
                      color: "#fff",
                    }}
                  >
                    {work.difficulty}
                  </AtTag>
                </View>

                <Text className="work-description">{work.description}</Text>

                <View className="work-meta">
                  <Text className="work-category">{work.category}</Text>
                  <Text className="work-likes">❤️ {work.likes}</Text>
                </View>

                <View className="work-tags">
                  {work.tags.map((tag, index) => (
                    <AtTag key={index} size="small" className="tag">
                      {tag}
                    </AtTag>
                  ))}
                </View>

                <View className="work-footer">
                  <Text className="work-author">by {work.author}</Text>
                  <Text className="work-time">{work.createTime}</Text>
                </View>
              </View>
            </AtCard>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Gallery;
