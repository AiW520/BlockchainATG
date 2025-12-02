import { useState } from 'react';
import { motion } from 'framer-motion';
import { u } from 'framer-motion/client';

// 编程语言数据
const programmingLanguages = [
  {
    id: 1,
    name: "Solidity",
    url: "https://soliditylang.org/",
    icon: "fa-ethereum",
    color: "#363636",
    gradient: "from-[#627eea] to-[#7857ff]",
    description: "以太坊区块链平台的智能合约编程语言，是开发去中心化应用(DApps)的核心语言。",
    applications: [
      "智能合约开发",
      "去中心化应用(DApps)",
      "代币发行(ERC-20, ERC-721等)",
      "去中心化金融(DeFi)协议"
    ],
    resources: [
      { name: "Solidity官方文档", url: "https://docs.soliditylang.org/en/v0.8.30/" },
      { name: "智能合约开发教程", url: "https://jishuzhan.net/article/1952673007293476865" },
      { name: "智能合约编译器使用指南", url: "https://remix.ethereum.org/" }
    ]
  },
  {
    id: 2,
    name: "Go",
    url: "https://www.runoob.com/go/go-tutorial.html",
    icon: "fa-golang",
    color: "#00ADD8",
    gradient: "from-[#00ADD8] to-[#3CCF4E]",
    description: "由Google开发的开源编程语言，被广泛应用于区块链系统开发，特别是在Hyperledger Fabric等联盟链中。",
    applications: [
      "区块链底层系统开发",
      "联盟链节点实现",
      "高性能区块链应用",
      "区块链工具开发"
    ],
    resources: [
      { name: "Go官方文档", url: "https://golang.org/doc/" },
      { name: "区块链Go语言开发", url: "https://hyperledger-fabric.readthedocs.io/en/release-2.2/developapps/go.html" },
      { name: "并发编程指南", url: "https://golang.org/doc/effective_go#concurrency" }
    ]
  },
  {
    id: 3,
    name: "Vue.js",
    url: "https://vuejs.org/",
    icon: "fa-vuejs",
    color: "#4FC08D",
    gradient: "from-[#4FC08D] to-[#38B2AC]",
    description: "渐进式JavaScript框架，用于构建用户界面，常被用于开发区块链DApp的前端界面。",
    applications: [
      "区块链DApp前端开发",
      "钱包应用界面",
      "区块链浏览器前端",
      "去中心化交易所界面"
    ],
    resources: [
      { name: "Vue.js官方文档", url: "https://vuejs.org/v2/guide/" },
      { name: "DApp前端开发教程", url: "https://juejin.cn/post/7441035254284501030" },
      { name: "区块链API集成", url: "https://bbs.huaweicloud.com/blogs/432608" }
    ]
  },
  {
    id: 4,
    name: "Java",
    url: "https://www.java.com/",
    icon: "fa-java",
    color: "#007396",
    gradient: "from-[#007396] to-[#ED8B00]",
    description: "广泛使用的编程语言，在企业级区块链应用和联盟链开发中占有重要地位。",
    applications: [
      "企业级区块链应用",
      "联盟链开发",
      "区块链中间件",
      "区块链SDK开发"
    ],
    resources: [
      { name: "Java官方文档", url: "https://docs.oracle.com/en/java/" },
      { name: "区块链Java开发指南", url: "https://docs.bubi.cn/docs/quick-start/develop-first-app/" },
      { name: "企业区块链集成", url: "https://developer.baidu.com/article/details/3357587" }
    ]
  },
  {
    id: 5,
    name: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: "fa-square-js",
    color: "#F7DF1E",
    gradient: "from-[#F7DF1E] to-[#323330]",
    description: "Web前端开发的核心语言，通过Web3.js等库可以与区块链进行交互。",
    applications: [
      "区块链Web应用开发",
      "智能合约交互",
      "区块链数据可视化",
      "钱包集成"
    ],
    resources: [
      { name: "JavaScript教程", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Web3.js开发指南", url: "https://web3js.readthedocs.io/en/v1.7.0/" },
      { name: "区块链前端最佳实践", url: "https://ethereum.org/en/developers/docs/dapps/" }
    ]
  },
  {
    id: 6,
    name: "Rust",
    url: "https://www.rust-lang.org/",
    icon: "fa-rust",
    color: "#DEA584",
    gradient: "from-[#DEA584] to-[#000000]",
    description: "系统级编程语言，以安全性、速度和并发性著称，被用于开发Polkadot、Solana等新一代区块链。",
    applications: [
      "高性能区块链开发",
      "区块链协议实现",
      "智能合约安全开发",
      "跨链技术实现"
    ],
    resources: [
      { name: "Rust官方文档", url: "https://www.rust-lang.org/learn" },
      { name: "区块链Rust开发", url: "https://leapwhale.com/article/hx9eyt24" },
      { name: "系统级编程指南", url: "https://doc.rust-lang.org/book/" }
    ]
  }
];

export default function ProgrammingLanguages() {
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
  
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">区块链编程语言</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            探索区块链开发中常用的编程语言，了解它们的特性、应用场景和学习资源
          </p>
        </motion.div>
        
        {/* 语言卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programmingLanguages.map((language, index) => (
            <motion.div
              key={language.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`rounded-xl overflow-hidden border hover-card cursor-pointer transition-all duration-300 ${
                selectedLanguage === language.id 
                  ? 'border-[#00f5ff] shadow-[0_0_20px_rgba(0,245,255,0.4)]' 
                  : 'border-[#1a1a3a]'
              }`}
              onClick={() => setSelectedLanguage(language.id === selectedLanguage ? null : language.id)}
            >
              <div className={`h-2 bg-gradient-to-r ${language.gradient}`}></div>
              <div className="p-6 bg-[#0c0c2a]">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{language.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {language.description.substring(0, 100)}...
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#1a1a3a] flex items-center justify-center">
                    <i className={`fa-brands ${language.icon} text-2xl`} style={{ color: language.color }}></i>
                  </div>
                </div>
                
                {/* 应用场景简要展示 */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">主要应用</h4>
                  <div className="flex flex-wrap gap-2">
                    {language.applications.slice(0, 2).map((app, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 text-xs rounded-full bg-[#1a1a3a] text-gray-300"
                      >
                        {app}
                      </span>
                    ))}
                    {language.applications.length > 2 && (
                      <span className="px-3 py-1 text-xs rounded-full bg-[#1a1a3a] text-gray-300">
                        +{language.applications.length - 2} 更多
                      </span>
                    )}
                  </div>
                </div>
                
                {/* 展开/收起按钮 */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <i 
                      className={`fa-solid text-[#00f5ff] ${
                        selectedLanguage === language.id ? 'fa-chevron-up' : 'fa-chevron-down'
                      }`}
                    ></i>
                    <span className="ml-2 text-sm text-[#00f5ff]">
                      {selectedLanguage === language.id ? '收起详情' : '查看详情'}
                    </span>
                  </div><div className="text-xs text-gray-400">
                    查看学习资源
                  </div>
                </div>
                
                {/* 展开的详情内容 */}
                <motion.div
                  initial={false}
                  animate={{ 
                    height: selectedLanguage === language.id ? 'auto' : 0,
                    opacity: selectedLanguage === language.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 border-t border-[#1a1a3a]">
                    <p className="text-gray-300 mb-6">
                      {language.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-[#00f5ff]">应用场景</h4>
                      <ul className="space-y-2">
                        {language.applications.map((app, i) => (
                          <li key={i} className="flex items-center text-gray-300">
                            <i className="fa-solid fa-check-circle text-[#00ff9d] mr-3"></i>
                            {app}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-[#00f5ff]">学习资源</h4>
                      <ul className="space-y-2">
                        {language.resources.map((resource, i) => (
                          <li key={i}>
                            <a 
                              href={resource.url} 
                              className="flex items-center text-gray-300 hover:text-[#00f5ff] transition-colors"
                            >
                              <i className="fa-solid fa-book-open text-[#00ff9d] mr-3"></i>
                              {resource.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <a
                      href={language.url ?? (language.resources?.[0]?.url ?? '#')}
                      target={(language.url ?? (language.resources?.[0]?.url ?? '')).startsWith('http') ? '_blank' : undefined}
                      rel={(language.url ?? (language.resources?.[0]?.url ?? '')).startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="btn-hover mt-8 block w-full py-3 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold text-lg text-center"
                    >
                      开始学习 {language.name}
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* 学习建议区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-[#0c0c2a] rounded-xl p-8 border border-[#1a1a3a] hover-card"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">如何选择适合的编程语言</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] flex items-center justify-center text-[#0a0a1f] mx-auto mb-6">
                <i className="fa-solid fa-brain text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-3">根据学习目标</h3>
              <p className="text-gray-400">
                智能合约开发选择Solidity，底层系统开发选择Go或Rust，前端界面选择Vue.js或JavaScript
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] flex items-center justify-center text-[#0a0a1f] mx-auto mb-6">
                <i className="fa-solid fa-network-wired text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-3">根据区块链平台</h3>
              <p className="text-gray-400">
                以太坊生态使用Solidity，Hyperledger Fabric使用Go或Java，Polkadot使用Rust
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] flex items-center justify-center text-[#0a0a1f] mx-auto mb-6">
                <i className="fa-solid fa-code text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-3">根据现有技能</h3>
              <p className="text-gray-400">
                有JavaScript基础可先学Solidity，有Java基础可先学Hyperledger Fabric开发
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}