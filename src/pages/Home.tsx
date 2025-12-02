import Carousel3D from '@/components/Carousel3D';
import FeatureCard from '@/components/FeatureCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// 3D轮播图片数据
const carouselImages = [
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Blockchain%20technology%2C%20digital%20currency%2C%20crypto%20wallet%2C%20secure%20transactions%2C%20futuristic%20interface&sign=0589feae4629adbcfba94cdce2ae08d1",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Smart%20contracts%2C%20blockchain%20code%2C%20distributed%20ledger%2C%20programming%20interface&sign=aa58a63aad76db092d5cdc0b279da6a9",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Blockchain%20nodes%2C%20network%20security%2C%20data%20encryption%2C%20peer-to-peer%20connections&sign=1111b9354bd7a8a91f8c48fbef9e2ed4",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Decentralized%20applications%2C%20dapps%2C%20blockchain%20platform%2C%20user%20interface&sign=8923b44e93362f74648de673117a0d00",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Blockchain%20innovation%2C%20future%20technology%2C%20digital%20transformation%2C%20global%20network&sign=50639372bc1791e7b5ddea6ee392228e"
];

// 特色功能数据
const features = [
  {
    id: 1,
    title: "区块链开发基础",
    description: "学习搭链、控制台、FISCO BCOS、WeBase等区块链开发核心技术",
    icon: "fa-blockchain",
    link: "/basics"
  },
  {
    id: 2,
    title: "编程语言",
    description: "掌握Solidity、Go、Vue.js、Java等区块链开发必备编程语言",
    icon: "fa-code",
    link: "/languages"
  },
  {
    id: 3,
    title: "竞赛渠道",
    description: "了解最新区块链竞赛平台，按时间、类型、难度筛选参赛机会",
    icon: "fa-trophy",
    link: "/competitions"
  },
  {
    id: 4,
    title: "知识检索",
    description: "搜索区块链论文、技术文档，按领域、时间、来源筛选结果",
    icon: "fa-search",
    link: "/knowledge"
  }
];

export default function Home() {
  
  return (
    <div className="min-h-screen">
      {/* 英雄区域 */}
      <section className="relative h-[80vh] overflow-hidden">
        <Carousel3D images={carouselImages} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1f] to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#00ff9d]">
                区块链技术学习平台
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                探索区块链技术的无限可能，从基础到精通的完整学习路径
              </p>
            </motion.div>
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/basics"
                className="btn-hover px-8 py-3 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold text-lg text-center"
              >
                开始学习
              </Link>
              <Link
                to="/knowledge"
                className="btn-hover px-8 py-3 rounded-full bg-transparent border-2 border-[#00f5ff] text-[#00f5ff] font-bold text-lg text-center"
              >
                探索资源
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 特色功能区域 */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">探索核心功能</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard 
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  link={feature.link}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 平台优势 */}
      <section className="py-20 px-4 bg-[#08081a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">为什么选择我们</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              我们提供全面的区块链学习资源，帮助你快速掌握前沿技术，开启区块链开发之旅
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-xl border border-[#1a1a3a] hover-card bg-[#0c0c2a]"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] flex items-center justify-center mx-auto mb-6 text-[#0a0a1f]">
                <i className="fa-solid fa-book-open text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">全面学习资源</h3>
              <p className="text-gray-300">
                从基础知识到高级应用，我们提供系统化的区块链学习资料和实战项目
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-xl border border-[#1a1a3a] hover-card bg-[#0c0c2a]"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] flex items-center justify-center mx-auto mb-6 text-[#0a0a1f]">
                <i className="fa-solid fa-code text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">实战导向</h3>
              <p className="text-gray-300">
                通过实际项目和竞赛，让你在实践中掌握区块链技术，提升开发能力
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-xl border border-[#1a1a3a] hover-card bg-[#0c0c2a]"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] flex items-center justify-center mx-auto mb-6 text-[#0a0a1f]">
                <i className="fa-solid fa-users text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">社区支持</h3>
              <p className="text-gray-300">
                加入我们的开发者社区，与志同道合的伙伴交流学习，共同成长
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 号召行动 */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Blockchain%20network%20visualization%2C%20digital%20technology%2C%20futuristic%20background&sign=49540e6a2cffff41ca7547a3a2662bf8')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-[#0a0a1f] opacity-90"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#00ff9d]">
              开启你的区块链开发之旅
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              无论你是初学者还是有经验的开发者，我们都能帮助你掌握区块链技术
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/basics"
                className="btn-hover px-8 py-3 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold text-lg text-center"
              >
                立即开始
              </Link>
              <Link
                to="/knowledge"
                className="btn-hover px-8 py-3 rounded-full bg-transparent border-2 border-[#00f5ff] text-[#00f5ff] font-bold text-lg text-center"
              >
                浏览资源
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}