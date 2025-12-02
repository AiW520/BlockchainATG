import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

// 知识资源数据
const knowledgeResources = [
  {
    id: 1,
    title: "区块链技术原理与应用",
    url: "https://www.tup.com.cn/bookscenter/book_08472401.html",
    type: "论文",
   领域: "基础理论",
    source: "清华大学出版社",
    publishDate: "2025-09-15",
    abstract: "本文深入探讨了区块链技术的基本原理、核心特性和应用场景，分析了区块链技术在金融、供应链、医疗等领域的创新应用模式，并对未来发展趋势进行了展望。",
    citations: 128,
    link: "#"
  },
  {
    id: 2,
    title: "智能合约安全漏洞分析与防护",
    url: "https://web3caff.com/archives/120018",
    type: "技术文档",
   领域: "安全",
    source: "链源科技",
    publishDate: "2025-03-14",
    abstract: "本报告详细分析了智能合约中常见的安全漏洞类型，包括重入攻击、整数溢出、访问控制等问题，并提供了相应的防护措施和最佳实践指南。",
    citations: 87,
    link: "#"
  },
  {
    id: 3,
    title: "去中心化金融(DeFi)发展研究报告",
    url: "https://news.qq.com/rain/a/20250613A030LU00",
    type: "研究报告",
   领域: "金融应用",
    source: "区块链金融研究院",
    publishDate: "2025-11-05",
    abstract: "本报告全面梳理了DeFi生态系统的发展现状，分析了主要DeFi协议的运行机制、风险特征和创新点，并对DeFi与传统金融的融合路径进行了探讨。",
    citations: 215,
    link: "#"
  },
  {
    id: 4,
    title: "联盟链技术架构与实现",
    url: "https://blog.csdn.net/baidu_38990811/article/details/108079889",
    type: "技术文档",
   领域: "技术架构",
    source: "呆呆_小茗博主",
    publishDate: "2025-08-30",
    abstract: "本文详细介绍了联盟链的技术架构设计原则、关键技术组件和实现方案，包括共识机制、权限管理、跨链交互等核心功能模块的设计与实现。",
    citations: 63,
    link: "#"
  },
  {
    id: 5,
    title: "区块链技术作为雾计算安全与隐私",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0140366421004321",
    type: "论文",
   领域: "隐私保护",
    source: "计算机通信",
    publishDate: "2022-01-15",
    abstract: "研究结果阐明了区块链在雾计算安全与基于隐私的增强中的愿景，并引发了对开放挑战和未来研究方向的关注。",
    citations: 94,
    link: "#"
  },
  {
    id: 6,
    title: "区块链与能源：文献计量分析与综述",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1364032120308819",
    type: "综述",
   领域: "性能优化",
    source: "计算机科学与技术学报",
    publishDate: "2021-03-28",
    abstract: "本文基于166篇文献的基础参考文献，通过共同引用分析分析区块链与能源的交叉领域。",
    citations: 156,
    link: "#"
  },
  {
    id: 7,
    title: "区块链在可持续智慧城市中的应用",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S2210670723003086",
    type: "论文",
   领域: "应用创新",
    source: "可持续城市与社会",
    publishDate: "2023-10-12",
    abstract: "总结了BCT在可持续智慧城市中角色的最新趋势、挑战及未来研究方向。探讨了区块链技术在智慧城市中的隐私保护机制及其应用案例。",
    citations: 132,
    link: "#"
  },
  {
    id: 8,
    title: "比特币用于旅游可持续发展目标？",
    url: "https://www.sciencedirect.com/org/science/article/abs/pii/S1757988020000161",
    type: "研究报告",
   领域: "金融应用",
    source: "亚伦·谭",
    publishDate: "2019-05-20",
    abstract: "本文旨在讨论区块链和加密货币的颠覆性使用及其影响，并倡导它们作为推动可持续旅游发展目标的推动者。",
    citations: 78,
    link: "#"
  },
  {
    id: 9,
    title: "发展自主可控的区块链技术平台",
    url: "https://www.cnipa.gov.cn/art/2020/5/27/art_779_13490.html",
    type: "综述",
   领域: "性能优化",
    source: "知识产权报",
    publishDate: "2020-05-27",
    abstract: "本文聚焦全国人大代表孔发龙关于加速区块链自主核心技术创新力度的建议。",
    citations: 49,
    link: "#"
  },
  {
    id: 10,
    title: "锚定创新方向 布局知识产权",
    url: "https://www.cnipa.gov.cn/art/2019/10/30/art_55_126622.html",
    type: "政策研究",
   领域: "政策法规",
    source: "知识产权报",
    publishDate: "2019-10-30",
    abstract: "本文系统梳理了我国区块链技术发展的战略方向与创新路径，结合习近平总书记对区块链核心技术突破的重要指示和权威专利分析报告，提出关键技术攻关与产业生态建设策略。",
    citations: 56,
    link: "#"
  },
  {
    id: 11,
    title: "区块链技术安全性调查",
    url: "https://www.sciencedirect.com/science/article/pii/S2096720922000070",
    type: "研究报告",
   领域: "安全",
    source: "区块链：研究与应用",
    publishDate: "2022-10-20",
    abstract: "在本文中，我们首先对区块链技术进行了更深入的调研，特别是其历史、共识算法的量化比较、加密技术的细节，以及区块链应用的综合列表。此外，区块链本身的安全性也是本文关注的重点。",
    citations: 81,
    link: "#"
  },
  {
    id: 12,
    title: "区块链分布式能源综述：对机构发展的影响",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1364032119301352",
    type: "论文",
   领域: "应用",
    source: "可再生与可持续能源评审",
    publishDate: "2019-06-29",
    abstract: "本文旨在推动能源领域区块链构建更有据可循的制度架构，推动研究的扩展。",
    citations: 118,
    link: "#"
  },
  {
    id: 13,
    title: "电力系统区块链：当前趋势与未来应用",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1364032119307932",
    type: "论文",
   领域: "技术创新",
    source: "可再生与可持续能源评审",
    publishDate: "2020-03",
    abstract: "本文旨在提出关于区块链技术在电力系统领域的广泛应用视角，阐明这一有前景技术的一些技术细节、迄今开发的功能和应用，同时聚焦电力领域创新应用的未来。",
    citations: 85,
    link: "#"
  },
  {
    id: 14,
    title: "区块链在政府中的应用:分布式账本技术在信息共享中的益处与影响",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0740624X17303155",
    type: "论文",
   领域: "政策法规",
    source: "政府信息季刊",
    publishDate: "2017-9",
    abstract: "本文核心问题是区块链技术是否将带来创新和政府流程的转型。",
    citations: 77,
    link: "#"
  }

];

// 筛选选项
const filterOptions = {
  types: ["全部", "论文", "技术文档", "研究报告", "综述", "政策研究"],
  fields: ["全部", "基础理论", "安全", "金融应用", "技术架构", "应用创新", "性能优化", "隐私保护", "政策法规"],
  timeRanges: ["全部", "近一周", "近一月", "近三月", "近一年"]
};

export default function KnowledgeRetrieval() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("全部");
  const [selectedField, setSelectedField] = useState("全部");
  const [selectedTimeRange, setSelectedTimeRange] = useState("全部");
  const [sortBy, setSortBy] = useState("publishDate");
  const [searchResults, setSearchResults] = useState<any[]>(knowledgeResources);
  const [isSearching, setIsSearching] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState<string | null>(null);
  const { theme } = useTheme();
  
  // 搜索和筛选功能
  useEffect(() => {
    setIsSearching(true);
    
    // 模拟搜索延迟
    const timer = setTimeout(() => {
      let results = [...knowledgeResources];
      
      // 搜索筛选
      if (searchTerm) {
        const lowerCaseTerm = searchTerm.toLowerCase();
        results = results.filter(item => 
          item.title.toLowerCase().includes(lowerCaseTerm) ||
          item.abstract.toLowerCase().includes(lowerCaseTerm) ||
          item.source.toLowerCase().includes(lowerCaseTerm)
        );
      }
      
      // 类型筛选
      if (selectedType !== "全部") {
        results = results.filter(item => item.type === selectedType);
      }
      
      // 领域筛选
      if (selectedField !== "全部") {
        results = results.filter(item => item.领域 === selectedField);
      }
      
      // 时间范围筛选
      if (selectedTimeRange !== "全部") {
        const now = new Date();
        let days = 0;
        
        switch (selectedTimeRange) {
          case "近一周":
            days = 7;
            break;
          case "近一月":
            days = 30;
            break;
          case "近三月":
            days = 90;
            break;
          case "近一年":
            days = 365;
            break;
        }
        
        const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        results = results.filter(item => new Date(item.publishDate) >= cutoffDate);
      }
      
      // 排序
      results.sort((a, b) => {
        if (sortBy === "publishDate") {
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        } else if (sortBy === "citations") {
          return b.citations - a.citations;
        }
        return 0;
      });
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm, selectedType, selectedField, selectedTimeRange, sortBy]);
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };

  // 在线检索 arXiv（ATOM 格式），返回简化的资源对象数组
  const fetchArxiv = async (query: string, maxResults = 8) => {
    try {
      const q = encodeURIComponent(query);
      const url = `https://export.arxiv.org/api/query?search_query=all:${q}&start=0&max_results=${maxResults}`;
      const res = await fetch(url);
      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'application/xml');
      const entries = Array.from(xml.getElementsByTagName('entry'));
      const items = entries.map((entry) => {
        const idNode = entry.getElementsByTagName('id')[0];
        const titleNode = entry.getElementsByTagName('title')[0];
        const summaryNode = entry.getElementsByTagName('summary')[0];
        const publishedNode = entry.getElementsByTagName('published')[0];
        const linkNodes = Array.from(entry.getElementsByTagName('link'));
        const pdfLink = linkNodes.find(l => l.getAttribute('title') === 'pdf')?.getAttribute('href') || idNode?.textContent || '';

        return {
          id: `arxiv-${Math.random().toString(36).slice(2, 9)}`,
          title: titleNode?.textContent?.trim() || 'arXiv Paper',
          abstract: summaryNode?.textContent?.trim() || '',
          source: 'arXiv',
          publishDate: publishedNode?.textContent?.slice(0,10) || new Date().toISOString().slice(0,10),
          citations: 0,
          type: '论文',
          领域: '区块链',
          link: pdfLink
        };
      });
      return items;
    } catch (err) {
      // 失败则返回空数组
      // console.error(err);
      return [];
    }
  };

  const [isOnlineSearching, setIsOnlineSearching] = useState(false);

  // 在线搜索处理器（使用 arXiv）
  const handleOnlineSearch = async () => {
    if (!searchTerm) return;
    setIsOnlineSearching(true);
    const onlineItems = await fetchArxiv(searchTerm, 8);
    // 合并前端资源和在线结果（在线结果放前）
    setSearchResults(prev => [...onlineItems, ...prev]);
    setIsOnlineSearching(false);
  };
  
  // 获取类型对应的图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "论文":
        return "fa-file-alt";
      case "技术文档":
        return "fa-file-code";
      case "研究报告":
        return "fa-file-pdf";
      case "综述":
        return "fa-file-lines";
      case "政策研究":
        return "fa-file-contract";
      default:
        return "fa-file";
    }
  };
  
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">知识检索</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            搜索区块链领域的论文、技术文档和研究报告，获取最前沿的区块链知识
          </p>
        </motion.div>
        
        {/* 搜索区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#0c0c2a] rounded-xl p-8 border border-[#1a1a3a] mb-12"
        >
          {/* 搜索框 */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="搜索区块链论文、技术文档..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-4 px-6 pl-14 rounded-xl bg-[#1a1a3a] border border-[#2a2a4a] focus:border-[#00f5ff] focus:outline-none text-white text-lg"
            />
            <i className="fa-solid fa-search absolute left-6 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400"></i>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <button
                className="bg-[#00f5ff] text-[#0a0a1f] px-5 py-2 rounded-full font-bold"
                disabled={!searchTerm}
                onClick={() => {
                  // 本地搜索由 useEffect 自动触发；此按钮也可以触发在线搜索
                  handleOnlineSearch();
                }}
              >
                {isOnlineSearching ? '搜索中...' : '搜索网络'}
              </button>
              <button
                className="bg-transparent border border-[#2a2a4a] text-gray-300 px-4 py-2 rounded-full font-semibold"
                onClick={() => {
                  // 清空在线结果并只运行本地过滤（useEffect 已处理，但我们触发一次以确保状态一致）
                  setSearchResults([...knowledgeResources]);
                  setSearchResults(prev => prev.filter(item => {
                    const lowerCaseTerm = searchTerm.toLowerCase();
                    return (
                      item.title?.toLowerCase().includes(lowerCaseTerm) ||
                      item.abstract?.toLowerCase().includes(lowerCaseTerm) ||
                      item.source?.toLowerCase().includes(lowerCaseTerm)
                    );
                  }));
                }}
                disabled={!searchTerm}
              >
                本地搜索
              </button>
            </div>
          </div>
          
          {/* 高级筛选 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 资源类型 */}
            <div>
              <h3 className="text-lg font-semibold mb-3">资源类型</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                      selectedType === type
                        ? 'bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]'
                        : 'bg-[#1a1a3a] text-gray-300 border border-transparent hover:border-[#00f5ff]/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 研究领域 */}
            <div>
              <h3 className="text-lg font-semibold mb-3">研究领域</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.fields.map((field) => (
                  <button
                    key={field}
                    onClick={() => setSelectedField(field)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                      selectedField === field
                        ? 'bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]'
                        : 'bg-[#1a1a3a] text-gray-300 border border-transparent hover:border-[#00f5ff]/50'
                    }`}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 时间范围 */}
            <div>
              <h3 className="text-lg font-semibold mb-3">发布时间</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedTimeRange(range)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                      selectedTimeRange === range
                        ? 'bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]'
                        : 'bg-[#1a1a3a] text-gray-300 border border-transparent hover:border-[#00f5ff]/50'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* 搜索结果区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 搜索结果列表 */}
          <div className="lg:col-span-2">
            {/* 排序和结果数量 */}
            <div className="flex flex-wrap justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                搜索结果 {isSearching ? '(搜索中...)' : `(${searchResults.length})`}
              </h2>
              <div className="flex items-center">
                <span className="mr-3 text-gray-400">排序方式:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#1a1a3a] border border-[#2a2a4a] text-white rounded-lg px-4 py-2 focus:border-[#00f5ff] focus:outline-none"
                >
                  <option value="publishDate">按发布时间</option>
                  <option value="citations">按引用次数</option>
                </select>
              </div>
            </div>
            
            {/* 结果列表 */}
            {isSearching ? (
              // 搜索加载状态
              <div className="space-y-6">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="animate-pulse bg-[#0c0c2a] rounded-xl p-6 border border-[#1a1a3a]">
                    <div className="h-6 bg-[#1a1a3a] rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-[#1a1a3a] rounded w-full mb-2"></div>
                    <div className="h-4 bg-[#1a1a3a] rounded w-5/6 mb-2"></div>
                    <div className="h-4 bg-[#1a1a3a] rounded w-4/6 mb-6"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-[#1a1a3a] rounded w-1/4"></div>
                      <div className="h-10 bg-[#1a1a3a] rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              // 搜索结果列表
              <div className="space-y-6">
                {searchResults.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[#0c0c2a] rounded-xl p-6 border border-[#1a1a3a] hover-card"
                  >
                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#1a1a3a] flex items-center justify-center mr-4 mt-1">
                        <i className={`fa-solid ${getTypeIcon(resource.type)} text-[#00f5ff]`}></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 hover:text-[#00f5ff] transition-colors cursor-pointer">
                          {resource.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-sm text-gray-400">
                            <i className="fa-solid fa-building mr-1"></i>
                            {resource.source}
                          </span>
                          <span className="text-sm text-gray-400">
                            <i className="fa-solid fa-calendar-alt mr-1"></i>
                            {formatDate(resource.publishDate)}
                          </span>
                          <span className="text-sm text-gray-400">
                            <i className="fa-solid fa-quote-right mr-1"></i>
                            引用: {resource.citations}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 line-clamp-3">
                      {resource.abstract}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs rounded-full bg-[#1a1a3a] text-gray-300">
                          {resource.type}
                        </span>
                        <span className="px-3 py-1 text-xs rounded-full bg-[#1a1a3a] text-gray-300">
                          {resource.领域}
                        </span>
                      </div>
                      <a
                        href={resource.url || resource.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          try {
                            const key = 'kr_clicks';
                            const raw = localStorage.getItem(key);
                            const clicks = raw ? JSON.parse(raw) : {};
                            clicks[resource.id] = (clicks[resource.id] || 0) + 1;
                            localStorage.setItem(key, JSON.stringify(clicks));
                          } catch (e) {
                            // ignore
                          }
                        }}
                        className="btn-hover px-4 py-2 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold"
                      >
                        查看详情
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // 无结果状态
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center py-16 bg-[#0c0c2a] rounded-xl border border-[#1a1a3a]"
              >
                <div className="w-24 h-24 rounded-full bg-[#1a1a3a] flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-search text-4xl text-gray-500"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">未找到匹配的资源</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  尝试调整搜索关键词或筛选条件，以获取更多相关资源
                </p>
                <button 
                  className="btn-hover px-6 py-3 rounded-lg bg-transparent border-2 border-[#00f5ff] text-[#00f5ff] font-bold"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("全部");
                    setSelectedField("全部");
                    setSelectedTimeRange("全部");
                  }}
                >
                  清除筛选条件
                </button>
              </motion.div>
            )}
          </div>
          
          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            {/* 热门资源 */}
            <div className="bg-[#0c0c2a] rounded-xl p-6 border border-[#1a1a3a] mb-8">
              <h3 className="text-xl font-bold mb-6">热门资源</h3>
              <div className="space-y-4">
                {knowledgeResources
                  .sort((a, b) => b.citations - a.citations)
                  .slice(0, 5)
                  .map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#1a1a3a] flex items-center justify-center mr-3 text-sm font-bold text-[#00f5ff]">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1 hover:text-[#00f5ff] transition-colors cursor-pointer line-clamp-2">
                          {resource.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-400">
                          <i className="fa-solid fa-quote-right mr-1"></i>
                          <span>引用: {resource.citations}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
            
            {/* 研究领域分布 */}
            <div className="bg-[#0c0c2a] rounded-xl p-6 border border-[#1a1a3a]">
              <h3 className="text-xl font-bold mb-6">研究领域分布</h3>
              <div className="space-y-4">
                {[
                  { name: "基础理论", count: 128, percentage: 32 },
                  { name: "安全", count: 95, percentage: 24 },
                  { name: "金融应用", count: 76, percentage: 19 },
                  { name: "技术架构", count: 42, percentage: 11 },
                  { name: "应用创新", count: 38, percentage: 9 },
                  { name: "其他", count: 21, percentage: 5 }
                ].map((field, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{field.name}</span>
                      <span className="text-sm text-[#00f5ff]">{field.count}</span>
                    </div>
                    <div className="w-full bg-[#1a1a3a] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] h-2 rounded-full" 
                        style={{ width: `${field.percentage}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 资源订阅提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#0c0c2a] rounded-xl p-8 border border-[#1a1a3a] hover-card text-center"
        >
          <h2 className="text-2xl font-bold mb-4">获取最新研究动态</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            订阅我们的知识更新，及时获取区块链领域的最新研究成果和技术进展
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="flex max-w-md w-full">
              <input
                type="email"
                placeholder="输入您的邮箱地址"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                className="flex-grow py-3 px-4 rounded-l-lg bg-[#1a1a3a] border border-[#2a2a4a] focus:border-[#00f5ff] focus:outline-none text-white"
              />
              <button
                className="btn-hover px-6 py-3 rounded-r-lg bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold"
                onClick={() => {
                  // 简单邮箱校验
                  const email = subscriberEmail.trim();
                  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
                  if (!email || !re.test(email)) {
                    setSubscribeMessage('请输入有效的邮箱地址');
                    setTimeout(() => setSubscribeMessage(null), 3000);
                    return;
                  }

                  try {
                    const key = 'kr_subscribers';
                    const raw = localStorage.getItem(key);
                    const arr = raw ? JSON.parse(raw) : [];
                    if (!arr.includes(email)) {
                      arr.push(email);
                      localStorage.setItem(key, JSON.stringify(arr));
                      setSubscribeMessage('订阅成功，已保存到本地！');
                    } else {
                      setSubscribeMessage('该邮箱已订阅');
                    }
                  } catch (e) {
                    setSubscribeMessage('订阅失败，请稍后重试');
                  }
                  setTimeout(() => setSubscribeMessage(null), 3000);
                }}
              >
                订阅
              </button>
            </div>
            {subscribeMessage && (
              <div className="text-sm text-green-400 mt-3">{subscribeMessage}</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}