import type { Lang } from "@/components/LangContext";

export type Localized = Record<Lang, string>;

export type Project = {
  title: Localized;
  description: Localized;
  year: number;
  url?: string;
  slug?: string;
  video?: {
    src?: string;
    poster?: string;
    loop?: boolean;
    youtubeId?: string;
  };
};

export const SECTION_LABEL: Localized = {
  en: "Projects",
  zh: "作品",
  ja: "プロジェクト",
};

export const BACK_LABEL: Localized = {
  en: "← Back",
  zh: "← 返回",
  ja: "← 戻る",
};

export const PROJECTS: Project[] = [
  {
    title: { en: "Mars Universe Bank", zh: "Mars Universe Bank", ja: "Mars Universe Bank" },
    description: {
      en: "A personal-finance OS.",
      zh: "我的个人财务系统",
      ja: "個人財務 OS",
    },
    year: 2026,
    url: "https://beancount.demo.marstanjx.com/",
  },
  {
    title: { en: "Maimai Per Round", zh: "NYNJ 舞萌地图", ja: "Maimai" },
    description: {
      en: "Arcade pricing across NYC and NJ.",
      zh: "舞萌机厅每轮价格收集",
      ja: "ニューヨークとニュージャージーの価格表",
    },
    year: 2026,
    url: "https://maimai.marstanjx.com/",
  },
  {
    title: { en: "Nessie", zh: "Nessie", ja: "Nessie" },
    description: {
      en: "Launch video for Nessie Labs (YC 2025).",
      zh: "Nessie Labs（YC 2025）的产品首发视频",
      ja: "Nessie Labs（YC 2025）のローンチ動画",
    },
    year: 2025,
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7392319883167920128/",
  },
  {
    title: { en: "AI Agents", zh: "AI 智能体", ja: "AI エージェント" },
    description: {
      en: "Animated agentic workflow.",
      zh: "智能体工作流的演示动画",
      ja: "ワークフロー例をアニメーション化",
    },
    year: 2024,
    slug: "ai-agents",
    video: {
      src: "/videos/2024-agents.mp4",
      loop: true,
    },
  },
  {
    title: { en: "Diffusion-GAN", zh: "Diffusion-GAN", ja: "Diffusion-GAN" },
    description: {
      en: "Reproducing Diffusion-GAN. CMU 11-785.",
      zh: "论文复现",
      ja: "論文の再現",
    },
    year: 2023,
    url: "https://youtu.be/lj9nIg5ENpw",
  },
  {
    title: { en: "Groupoo", zh: "Groupoo", ja: "Groupoo" },
    description: {
      en: "Launch video co-animated.",
      zh: "社交平台产品首发视频",
      ja: "共同で制作したローンチ動画",
    },
    year: 2022,
    slug: "groupoo",
    video: {
      src: "/videos/2022-groupoo.mp4",
    },
  },
  {
    title: { en: "Motion Reel", zh: "动画作品集", ja: "モーションリール" },
    description: {
      en: "Years of animation work.",
      zh: "早期视觉动效和逐帧动画",
      ja: "数年間のアニメーション作品集",
    },
    year: 2021,
    url: "https://youtu.be/izcohuh3vBA",
  },
  {
    title: { en: "AARDVARC", zh: "AARDVARC", ja: "AARDVARC" },
    description: {
      en: "USC syllabus platform, since acquired by Salesforce.",
      zh: "南加大课程大纲平台（Salesforce 收购）",
      ja: "シラバスツール（Salesforce に買収）",
    },
    year: 2020,
    url: "https://aardvarc.archive.marstanjx.com/",
  },
  {
    title: { en: "Lucky Ball", zh: "幸运球", ja: "ラッキーボール" },
    description: {
      en: "A simple p5.js crawl machine game.",
      zh: "一个简单的 p5.js 爬球机游戏",
      ja: "p5.js のクレーンゲーム",
    },
    year: 2019,
    url: "http://demo.marstanjx.com/game/",
  },
  {
    title: {
      en: "Japanese Notes",
      zh: "日语笔记",
      ja: "日本語ノート",
    },
    description: {
      en: "My JLPT notebook, in code.",
      zh: "我的 JLPT 笔记本",
      ja: "コードで書いた私の JLPT ノート",
    },
    year: 2018,
    url: "https://notes.marstanjx.com/n3/chapter/1/",
  },
  {
    title: {
      en: "Portfolio Site",
      zh: "作品集网站",
      ja: "作品集サイト",
    },
    description: {
      en: "Earlier projects can be found here.",
      zh: "早期版本的作品集",
      ja: "以前の作品集",
    },
    year: 2017,
    url: "https://archive.marstanjx.com/",
  },
];
