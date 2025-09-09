export interface AboutHeader {
  image?: string; // 背景图片 URL（优先）
  color?: string; // 纯色背景，如 #ff7e5f
  gradientFrom?: string; // 渐变起始色
  gradientTo?: string;   // 渐变结束色
}

export interface AboutData {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  /**
   * Long form markdown content for the About page main section
   */
  about?: string;
  header?: AboutHeader;
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}
