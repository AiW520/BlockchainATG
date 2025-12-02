import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

// 区块链基础分类数据
const blockchainCategories = [
  {
    id: 1,
    title: "搭链",
    description: "学习如何搭建自己的区块链网络，包括节点配置、共识机制设置等基础步骤。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Blockchain%20network%20setup%2C%20nodes%20connection%2C%20block%20creation&sign=c464a905ee469999a5d2bb4c5623e348",
    learningPath: [
      "区块链网络基础架构",
      "节点部署与配置",
      "共识机制选择",
      "网络安全设置",
      "链上数据管理"
    ],
    resources: [
      { name: "区块链网络搭建指南", url: "https://fisco-bcos-documentation.readthedocs.io/zh-cn/latest/docs/installation.html" },
      { name: "节点配置最佳实践", url: "https://fisco-bcos-documentation.readthedocs.io/zh-cn/latest/docs/installation.html#id8" },
      { name: "共识机制详解", url: "https://cloud.tencent.com/developer/article/2395876" }
    ]
  },
  {
    id: 2,
    title: "控制台",
    description: "掌握区块链控制台的使用方法，包括链上数据查询、交易发送、智能合约部署等操作。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Blockchain%20console%20interface%2C%20command%20line%20operations%2C%20data%20query&sign=4457f2c179978722b717ab31e615349c",
    learningPath: [
      "控制台基本命令",
      "区块与交易查询",
      "账户管理",
      "合约部署与调用",
      "链上数据分析"
    ],
    resources: [
      { name: "控制台命令参考手册", url: "https://fisco-bcos-documentation.readthedocs.io/zh-cn/latest/docs/console/download_console.html" },
      { name: "区块链数据查询教程", url: "https://fisco-bcos-documentation.readthedocs.io/zh-cn/latest/docs/webase/webase.html" },
      { name: "合约交互指南", url: "https://fisco-bcos-documentation.readthedocs.io/zh-cn/latest/docs/app_dev/index.html" }
    ]
  },
  {
    id: 3,
    title: "FISCO BCOS",
    description: "学习使用FISCO BCOS联盟链平台，包括环境搭建、智能合约开发、应用对接等内容。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=FISCO%20BCOS%20blockchain%20platform%2C%20consortium%20chain%20technology&sign=ff7d9fce3e5728bcf3522b1bd5779dd4",
    learningPath: [
      "FISCO BCOS介绍",
      "环境搭建与配置",
      "WeIdentity身份管理",
      "智能合约开发",
      "应用对接实践"
    ],
    resources: [
      { name: "FISCO BCOS官方文档", url: "https://fisco-bcos-documentation.readthedocs.io/zh-cn/latest/docs/introduction.html" },
      { name: "WeIdentity使用指南", url: "https://weidentity.readthedocs.io/zh-cn/release-1.0.28/docs/one-stop-experience.html" },
      { name: "企业级应用案例", url: "https://xueshu.baidu.com/ndscholar/browse/search?wd=%E5%8C%BA%E5%9D%97%E9%93%BE%E4%BC%81%E4%B8%9A%E7%BA%A7%E5%BA%94%E7%94%A8%E6%A1%88%E4%BE%8B&tn=SE_baiduxueshu_c1gjeupa&ie=utf-8&sc_hit=1" }
    ]
  },
  {
    id: 4,
    title: "WeBase",
    description: "了解WeBase区块链中间件平台，学习如何使用可视化工具管理区块链网络和智能合约。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=WeBase%20blockchain%20middleware%2C%20visualization%20platform&sign=ef67d7dc4d1d7ddbf10015f983b42089",
    learningPath: [
      "WeBase架构与功能",
      "平台部署与配置",
      "合约IDE使用",
      "节点管理",
      "监控与告警"
    ],
    resources: [
      { name: "WeBase安装部署文档", url: "https://webase-web.readthedocs.io/en/latest/docs/WeBASE-Web/development.html" },
      { name: "合约开发工具教程", url: "https://blog.csdn.net/CompiTide/article/details/153576401" },
      { name: "区块链监控最佳实践", url: "https://blog.csdn.net/Huahua_1223/article/details/142442079" }
    ]
  }
];

export default function BlockchainBasics() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">区块链开发基础</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            从区块链网络搭建到智能合约开发，掌握区块链技术的核心基础知识和实践技能
          </p>
        </motion.div>
        
        {/* 分类导航 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {blockchainCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                activeCategory === index
                  ? 'border-[#00f5ff] bg-[#00f5ff]/10 text-[#00f5ff]'
                  : 'border-[#1a1a3a] text-gray-300 hover:border-[#00f5ff]/50'
              }`}
            >
              {category.title}
            </motion.button>
          ))}
        </div>
        
        {/* 内容展示区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：图片和描述 */}
          <motion.div
            key={blockchainCategories[activeCategory].id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="rounded-xl overflow-hidden shadow-xl hover-card border border-[#1a1a3a] mb-6">
              <img 
                src={blockchainCategories[activeCategory].image} 
                alt={blockchainCategories[activeCategory].title}
                className="w-full h-auto"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">{blockchainCategories[activeCategory].title}</h2>
            <p className="text-gray-300 mb-6">
              {blockchainCategories[activeCategory].description}
            </p>
            
            {/* 资源链接 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-[#00f5ff]">学习资源</h3>
              <ul className="space-y-3">
                {blockchainCategories[activeCategory].resources.map((resource, index) => (
                  <li key={index}>
                    <a 
                      href={resource.url} 
                      className="text-gray-300 hover:text-[#00f5ff] transition-colors flex items-center"
                    >
                      <i className="fa-solid fa-file-arrow-down mr-3 text-[#00ff9d]"></i>
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* 右侧：学习路径 */}
          <motion.div
            key={`path-${blockchainCategories[activeCategory].id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-[#0c0c2a] rounded-xl p-8 border border-[#1a1a3a] hover-card">
              <h3 className="text-xl font-bold mb-6">学习路径</h3>
              <div className="space-y-8">
                {blockchainCategories[activeCategory].learningPath.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex"
                  >
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] flex items-center justify-center text-[#0a0a1f] font-bold">
                        {index + 1}
                      </div>
                      {index < blockchainCategories[activeCategory].learningPath.length - 1 && (
                        <div className="w-0.5 h-full bg-gradient-to-b from-[#00f5ff] to-[#00ff9d] my-2"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{step}</h4>
                      <div className="w-full bg-[#1a1a3a] rounded-full h-1.5 mb-4">
                        <div 
                          className="bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] h-1.5 rounded-full" 
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {getStepDescription(step)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-10">
                <button className="btn-hover w-full py-3 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold text-lg">
                  <a href="https://fisco-doc.readthedocs.io/zh/release-2-dev/docs/introduction.html">开始学习之旅</a>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// 获取步骤描述的辅助函数
function getStepDescription(step: string): string {
  const descriptions: Record<string, string> = {
    "区块链网络基础架构": "了解区块链网络的组成部分、节点类型和通信机制。",
    "节点部署与配置": "学习如何部署区块链节点并进行基本配置。",
    "共识机制选择": "理解不同共识机制的工作原理和适用场景。",
    "网络安全设置": "掌握区块链网络的安全配置和防护措施。",
    "链上数据管理": "学习如何有效管理和查询链上数据。",
    "控制台基本命令": "熟悉区块链控制台的常用命令和操作方法。",
    "区块与交易查询": "掌握如何查询区块信息和交易详情。",
    "账户管理": "学习如何创建和管理区块链账户。",
    "合约部署与调用": "了解智能合约的部署流程和调用方法。",
    "链上数据分析": "掌握如何分析和利用链上数据。",
    "FISCO BCOS介绍": "了解FISCO BCOS联盟链平台的特点和优势。",
    "环境搭建与配置": "学习如何搭建FISCO BCOS开发环境。",
    "WeIdentity身份管理": "掌握WeIdentity分布式身份解决方案的使用。",
    "智能合约开发": "学习在FISCO BCOS平台上开发智能合约。",
    "应用对接实践": "实践如何将应用与FISCO BCOS区块链对接。",
    "WeBase架构与功能": "了解WeBase中间件平台的架构和核心功能。",
    "平台部署与配置": "学习如何部署和配置WeBase平台。",
    "合约IDE使用": "掌握WeBase合约IDE的使用方法。",
    "节点管理": "学习如何通过WeBase管理区块链节点。",
    "监控与告警": "了解如何设置区块链网络的监控和告警机制。"
  };
  
  return descriptions[step] || "学习此步骤的核心概念和实践技能。";
}