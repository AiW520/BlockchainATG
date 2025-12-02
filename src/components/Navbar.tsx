import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavItem {
  id: number;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: 1, label: '首页', path: '/' },
  { id: 2, label: '区块链开发基础', path: '/basics' },
  { id: 3, label: '编程语言', path: '/languages' },
  { id: 4, label: '竞赛渠道', path: '/competitions' },
  { id: 5, label: '知识检索', path: '/knowledge' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const location = useLocation();
  
  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // load user from localStorage
  useEffect(() => {
    try {
      const u = localStorage.getItem('auth_user');
      if (u) setUser(u);
    } catch (e) {
      // ignore
    }
  }, []);

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setIsRegisterMode(false);
    setEmailInput('');
    setPasswordInput('');
    setAuthMessage(null);
  };

  const handleRegister = () => {
    const email = emailInput.trim();
    const pwd = passwordInput;
    if (!email || !pwd) {
      setAuthMessage('请输入邮箱和密码');
      return;
    }
    try {
      const raw = localStorage.getItem('auth_users');
      const users = raw ? JSON.parse(raw) : [];
      if (users.find((u: any) => u.email === email)) {
        setAuthMessage('该邮箱已注册，请直接登录');
        return;
      }
      users.push({ email, password: pwd });
      localStorage.setItem('auth_users', JSON.stringify(users));
      localStorage.setItem('auth_user', email);
      setUser(email);
      setAuthMessage('注册成功');
      setTimeout(() => closeAuthModal(), 800);
    } catch (e) {
      setAuthMessage('注册失败，请稍后重试');
    }
  };

  const handleLogin = () => {
    const email = emailInput.trim();
    const pwd = passwordInput;
    if (!email || !pwd) {
      setAuthMessage('请输入邮箱和密码');
      return;
    }
    try {
      const raw = localStorage.getItem('auth_users');
      const users = raw ? JSON.parse(raw) : [];
      const found = users.find((u: any) => u.email === email && u.password === pwd);
      if (!found) {
        setAuthMessage('账户或密码错误');
        return;
      }
      localStorage.setItem('auth_user', email);
      setUser(email);
      setAuthMessage('登录成功');
      setTimeout(() => closeAuthModal(), 600);
    } catch (e) {
      setAuthMessage('登录失败，请稍后重试');
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('auth_user');
    } catch (e) {}
    setUser(null);
  };
  
  // 获取当前活动的导航项
  const getActiveItem = () => {
    return navItems.findIndex(item => item.path === location.pathname);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] flex items-center justify-center text-[#0a0a1f] mr-3">
                <i className="fa-brands fa-blockchain text-xl"></i>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#00ff9d]">
                区块链学习平台
              </span>
            </Link>
          </motion.div>
          
          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link 
                  to={item.path}
                  className={`nav-item text-white hover:text-[#00f5ff] font-medium ${
                    getActiveItem() === index ? 'active text-[#00ff9d]' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            
            {/* 登录/注册按钮 */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-200">{user}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-transparent border border-[#00f5ff] text-[#00f5ff] font-medium"
                >
                  退出
                </button>
              </div>
            ) : (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="btn-hover px-6 py-2 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold"
                onClick={() => setAuthModalOpen(true)}
              >
                登录 / 注册
              </motion.button>
            )}
          </nav>
          
          {/* 移动端菜单按钮 */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fa-solid text-xl ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </motion.button>
        </div>
      </div>
      
      {/* 移动端导航菜单 */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden glass"
        >
          <div className="px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.id}
                to={item.path}
                className={`nav-item py-2 text-white hover:text-[#00f5ff] font-medium ${
                  getActiveItem() === item.id - 1 ? 'active text-[#00ff9d]' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-200">{user}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-transparent border border-[#00f5ff] text-[#00f5ff] font-medium"
                >
                  退出
                </button>
              </div>
            ) : (
              <button
                className="btn-hover px-6 py-2 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold"
                onClick={() => setAuthModalOpen(true)}
              >
                登录 / 注册
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Auth Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={closeAuthModal}></div>
          <div className="relative w-full max-w-md mx-4 bg-[#0b0b23] rounded-xl border border-[#1a1a3a] p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{isRegisterMode ? '注册' : '登录'}</h3>
              <button onClick={closeAuthModal} className="text-gray-400">关闭</button>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">邮箱</label>
              <input
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0f1226] border border-[#23233a] text-white"
                placeholder="your@email.com"
                type="email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">密码</label>
              <input
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0f1226] border border-[#23233a] text-white"
                placeholder="密码"
                type="password"
              />
            </div>
            {authMessage && <div className="mb-3 text-sm text-yellow-300">{authMessage}</div>}

            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  if (isRegisterMode) handleRegister(); else handleLogin();
                }}
                className="px-4 py-2 rounded bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold"
              >
                {isRegisterMode ? '注册' : '登录'}
              </button>
              <button
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="px-3 py-2 text-sm text-[#00f5ff]"
              >
                {isRegisterMode ? '已有账号？去登录' : '没有账号？去注册'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}