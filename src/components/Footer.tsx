import { Link } from 'react-router-dom';

export default function Footer() {
  const base = import.meta.env.BASE_URL || '/';
  return (
    <footer className="bg-[#08081a] border-t border-[#1a1a3a] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 关于我们 */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] flex items-center justify-center text-[#0a0a1f] mr-3">
                <i className="fa-brands fa-blockchain text-xl"></i>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#00ff9d]">
                区块链学习平台
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              我们致力于提供全面的区块链学习资源，帮助你快速掌握前沿技术，开启区块链开发之旅。
            </p>
            <div className="flex space-x-4">
              <button type="button" aria-label="github" className="text-gray-400 hover:text-[#00f5ff] transition-colors">
                <i className="fa-brands fa-github text-xl"></i>
              </button>
              <button type="button" aria-label="twitter" className="text-gray-400 hover:text-[#00f5ff] transition-colors">
                <i className="fa-brands fa-twitter text-xl"></i>
              </button>
              <button type="button" aria-label="linkedin" className="text-gray-400 hover:text-[#00f5ff] transition-colors">
                <i className="fa-brands fa-linkedin text-xl"></i>
              </button>
              <button type="button" aria-label="youtube" className="text-gray-400 hover:text-[#00f5ff] transition-colors">
                <i className="fa-brands fa-youtube text-xl"></i>
              </button>
            </div>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">快速链接</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-[#00f5ff] transition-colors">首页</Link></li>
              <li><Link to="/basics" className="text-gray-400 hover:text-[#00f5ff] transition-colors">区块链开发基础</Link></li>
              <li><Link to="/languages" className="text-gray-400 hover:text-[#00f5ff] transition-colors">编程语言</Link></li>
              <li><Link to="/competitions" className="text-gray-400 hover:text-[#00f5ff] transition-colors">竞赛渠道</Link></li>
              <li><Link to="/knowledge" className="text-gray-400 hover:text-[#00f5ff] transition-colors">知识检索</Link></li>
            </ul>
          </div>
          
          {/* 学习资源 */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">学习资源</h3>
            <ul className="space-y-3">
                <li><a href={`${base}source/区块链教程整合集.html`} className="text-gray-400 hover:text-[#00f5ff] transition-colors">教程文档</a></li>
                <li><a href={`${base}source/区块链实战项目.html`} className="text-gray-400 hover:text-[#00f5ff] transition-colors">实战项目</a></li>
                <li><a href={`${base}source/区块链博客推荐.html`} className="text-gray-400 hover:text-[#00f5ff] transition-colors">技术博客</a></li>
                <li><a href={`${base}source/区块链常见问题整理.html`} className="text-gray-400 hover:text-[#00f5ff] transition-colors">常见问题</a></li>
                <li><a href={`${base}source/区块链开发者社区.html`} className="text-gray-400 hover:text-[#00f5ff] transition-colors">开发者社区</a></li>
            </ul>
          </div>
          
          {/* 联系我们 */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">联系我们</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <i className="fa-solid fa-envelope mr-3 text-[#00f5ff]"></i>
                <span>3029956183@qq.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fa-solid fa-phone mr-3 text-[#00f5ff]"></i>
                <span>+86 19103068888</span>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fa-solid fa-map-marker-alt mr-3 text-[#00f5ff]"></i>
                <span>深圳市南山区深职大万物生集团</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#1a1a3a] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} 区块链学习平台. 保留所有权利.
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            开发人员 李泓震 李雪慧 杨荣锦 易中天 曾泯睿 严智恩
          </p>
            <div className="flex space-x-6">
            <a href={`${base}source/隐私政策.html`} className="text-gray-400 hover:text-[#00f5ff] transition-colors">隐私政策</a>
            <a href={`${base}source/服务条款.html`} className="text-gray-400 hover:text-[#00f5ff] transition-colors">服务条款</a>
            <a href={`${base}source/Cookie政策.html`} className="text-gray-400 hover:text-[#00f5ff] transition-colors">Cookie 政策</a>
          </div>
        </div>
      </div>
    </footer>
  );
}