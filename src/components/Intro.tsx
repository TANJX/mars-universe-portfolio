"use client";

import { type ReactNode } from "react";
import { useLang, type Lang } from "./LangContext";

const InstaLILY = (
  <a
    href="https://instalily.ai"
    target="_blank"
    rel="noreferrer"
    className="text-foreground"
  >
    InstaLILY AI
  </a>
);

type Content = {
  name: ReactNode;
  role: ReactNode;
  paragraphs: ReactNode[];
};

const CONTENT: Record<Lang, Content> = {
  en: {
    name: "Mars Tan",
    role: <>Senior Design Engineer at {InstaLILY}.</>,
    paragraphs: [
      <>
        A good product is both crafted and built, and someone has to hold both
        at once. I think of design engineering as bringing taste into
        engineering.
      </>,
      <>
        At InstaLILY, I iterate on prototyping workflows that turn emerging
        ideas into shipped experiences, evolve a design system shared across
        humans and agents, and ship enterprise-grade agentic workflows for the
        physical goods economy.
      </>,
      <>
        Before this, I studied Arts, Technology, and the Business of Innovation
        at USC Iovine and Young Academy.
      </>,
    ],
  },
  zh: {
    name: "谭健旋",
    role: <>{InstaLILY} 资深设计工程师</>,
    paragraphs: [
      <>
        一个好的产品，既需要被精心打磨，也需要真正落地。对我来说，设计工程的价值在于把审美判断、产品直觉和工程能力结合起来，让好的想法不只停留在概念中，而是变成真实可用并且可交付的产品体验。
      </>,
      <>
        在 InstaLILY，我专注于 AI
        原生产品体验的设计与实现：通过原型设计工作流，将早期想法快速推进到真实产品中；持续建设人类与智能体共同使用的设计系统；并为企业客户打造面向销售、服务和运营场景的企业级自动化工作流。
      </>,
      <>
        在此之前，我就读于南加州大学 USC Iovine and Young
        Academy，学习设计、技术和商业思维的交叉学科。这段跨学科背景也塑造了我今天理解产品、设计与技术关系的方式。
      </>,
    ],
  },
  ja: {
    name: (
      <>
        <ruby>
          譚<rt>たん</rt>
        </ruby>
        {"　"}
        <ruby>
          健<rt>けん</rt>旋<rt>せん</rt>
        </ruby>
      </>
    ),
    role: <>{InstaLILY} シニア・デザインエンジニア</>,
    paragraphs: [
      <>
        良いプロダクトは、美しく磨き上げられるだけでなく、実際に使える形として実現される必要があります。私にとってデザインエンジニアリングとは、デザインの感性、プロダクトへの直感、そしてエンジニアリングの実装力をつなぎ、良いアイデアを単なるコンセプトで終わらせず、実際に使われるプロダクト体験へと落とし込むことです。
      </>,
      <>
        InstaLILY では、AI
        ネイティブなプロダクト体験の設計と実装に取り組んでいます。プロトタイピングのワークフローを通じて初期段階のアイデアを素早くプロダクトへと発展させ、人と
        AI
        エージェントが共に使うデザインシステムを継続的に進化させています。また、営業、カスタマーサービス、オペレーション領域における企業向けの自動化ワークフローの開発にも携わっています。
      </>,
      <>
        その前は、南カリフォルニア大学で、デザイン、テクノロジー、ビジネス思考を横断的に学びました。この学際的な背景が、現在の私のプロダクト、デザイン、テクノロジーに対する考え方の土台になっています。
      </>,
    ],
  },
};

export function Intro() {
  const { lang } = useLang();
  const { name, role, paragraphs } = CONTENT[lang];

  return (
    <section className="space-y-10 text-[17px] leading-[1.65] text-foreground">
      <div>
        <h1 className="text-[28px] font-medium tracking-tight">{name}</h1>
        <p className="text-muted">{role}</p>
      </div>

      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </section>
  );
}
