import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

// 竞赛数据
const competitions = [
  {
    id: 1,
    title: "全球区块链应用开发大赛",
    url: "https://btc.ccf.org.cn/home",
    platform: "区块链开发者协会",
    type: "应用开发",
    difficulty: "中级",
    startTime: "2025-12-01",
    endTime: "2026-03-15",
    description: "开发基于区块链技术的创新应用，解决实际行业痛点，推动区块链技术落地应用。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Blockchain%20hackathon%2C%20coding%20competition%2C%20developers%20team%2C%20award%20ceremony&sign=f1d93cb0a33a6620f02f243652d5667f",
    rewards: "总奖金池100万元，包括一、二、三等奖和最佳创新奖",
    link: "#"
  },
  {
    id: 2,
    title: "智能合约安全审计大赛",
    url: "https://www.isclab.org.cn/",
    platform: "区块链安全联盟",
    type: "安全审计",
    difficulty: "高级",
    startTime: "2025-11-15",
    endTime: "2025-12-31",
    description: "通过审计智能合约代码，发现潜在安全漏洞，提升区块链应用的安全性和可靠性。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Smart%20contract%20security%20audit%2C%20code%20review%2C%20vulnerability%20detection&sign=f5d5449d20524189aeae2144a8e00a0e",
    rewards: "总奖金50万元，优秀审计报告将被收录到区块链安全知识库",
    link: "#"
  },
  {
    id: 3,
    title: "DeFi创新应用挑战赛",
    url: "https://www.cicas.cn/News/Detail/199",
    platform: "DeFi开发者社区",
    type: "金融应用",
    difficulty: "中级",
    startTime: "2026-01-10",
    endTime: "2026-02-28",
    description: "开发创新的去中心化金融应用，探索区块链技术在金融领域的创新应用场景。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Decentralized%20finance%2C%20DeFi%20application%2C%20blockchain%20finance%20technology&sign=262c88da692475946cd2a09e3ee50e35",
    rewards: "总奖金80万元，获胜项目有机会获得投资机构青睐",
    link: "#"
  },
  {
    id: 4,
    title: "区块链+供应链管理创新赛",
    url: "https://www.saikr.com/vse/49856",
    platform: "供应链区块链联盟",
    type: "行业应用",
    difficulty: "初级",
    startTime: "2025-12-15",
    endTime: "2026-02-15",
    description: "利用区块链技术解决供应链管理中的信任、透明和效率问题，推动供应链数字化转型。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Blockchain%20supply%20chain%20management%2C%20logistics%20tracking%2C%20product%20traceability&sign=37fc3c8c750e4937d0faefbebc04ed4c",
    rewards: "总奖金60万元，获奖方案有机会落地实施",
    link: "#"
  },
  {
    id: 5,
    title: "NFT数字艺术创作大赛",
    url: "https://www.odaily.news/zh-CN/activity/326",
    platform: "NFT创作者联盟",
    type: "创意设计",
    difficulty: "初级",
    startTime: "2026-01-05",
    endTime: "2026-03-05",
    description: "创作基于区块链技术的数字艺术作品，探索NFT在艺术、游戏、文化等领域的应用。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=NFT%20digital%20art%2C%20crypto%20art%2C%20blockchain%20creative%20design&sign=cda91306e68e20920c30b6be7c414a60",
    rewards: "总奖金40万元，获奖作品将在数字艺术馆展出",
    link: "#"
  },
  {
    id: 6,
    title: "区块链底层技术优化大赛",
    url: "https://btc.ccf.org.cn/",
    platform: "区块链技术研究院",
    type: "底层技术",
    difficulty: "高级",
    startTime: "2026-02-01",
    endTime: "2026-04-30",
    description: "优化区块链底层技术，提升性能、安全性和扩展性，推动区块链技术基础设施创新。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Blockchain%20infrastructure%2C%20consensus%20algorithm%2C%20performance%20optimization&sign=3dc01ee7ad00f0eeab686fa9f67ed2c1",
    rewards: "总奖金120万元，优秀优化方案将被开源社区采纳",
    link: "#"
  }
];

// 筛选选项
const filterOptions = {
  types: ["全部", "应用开发", "安全审计", "金融应用", "行业应用", "创意设计", "底层技术"],
  difficulties: ["全部", "初级", "中级", "高级"],
  timeRanges: ["全部", "即将开始", "进行中", "已结束"]
};

export default function CompetitionChannels() {
  const [filteredCompetitions, setFilteredCompetitions] = useState(competitions);
  const [selectedType, setSelectedType] = useState("全部");
  const [selectedDifficulty, setSelectedDifficulty] = useState("全部");
  const [selectedTimeRange, setSelectedTimeRange] = useState("全部");
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();
  
  // 筛选竞赛
  useEffect(() => {
    let results = competitions;
    
    // 类型筛选
    if (selectedType !== "全部") {
      results = results.filter(comp => comp.type === selectedType);
    }
    
    // 难度筛选
    if (selectedDifficulty !== "全部") {
      results = results.filter(comp => comp.difficulty === selectedDifficulty);
    }
    
    // 时间范围筛选
    if (selectedTimeRange !== "全部") {
      const now = new Date();
      if (selectedTimeRange === "即将开始") {
        results = results.filter(comp => new Date(comp.startTime) > now);
      } else if (selectedTimeRange === "进行中") {
        results = results.filter(comp => 
          new Date(comp.startTime) <= now && new Date(comp.endTime) >= now
        );
      } else if (selectedTimeRange === "已结束") {
        results = results.filter(comp => new Date(comp.endTime) < now);
      }
    }
    
    // 搜索筛选
    if (searchTerm) {
      const lowerCaseTerm = searchTerm.toLowerCase();
      results = results.filter(comp => 
        comp.title.toLowerCase().includes(lowerCaseTerm) || 
        comp.description.toLowerCase().includes(lowerCaseTerm) ||
        comp.platform.toLowerCase().includes(lowerCaseTerm)
      );
    }
    
    setFilteredCompetitions(results);
  }, [selectedType, selectedDifficulty, selectedTimeRange, searchTerm]);
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // 检查竞赛状态
  const checkCompetitionStatus = (startTime: string, endTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now < start) return "即将开始";
    if (now >= start && now <= end) return "进行中";
    return "已结束";
  };
  
  // 获取状态对应的样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "即将开始":
        return "bg-[#00f5ff]/20 text-[#00f5ff] border-[#00f5ff]";
      case "进行中":
        return "bg-[#00ff9d]/20 text-[#00ff9d] border-[#00ff9d]";
      case "已结束":
        return "bg-gray-500/20 text-gray-400 border-gray-500";
      default:
        return "";
    }
  };
  
  // 获取难度对应的样式
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case "初级":
        return "bg-blue-500/20 text-blue-400";
      case "中级":
        return "bg-yellow-500/20 text-yellow-400";
      case "高级":
        return "bg-red-500/20 text-red-400";
      default:
        return "";
    }
  };

  // 生成 ICS 的日期格式 YYYYMMDD
  const toICSDate = (dateString: string) => {
    const d = new Date(dateString);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}${m}${dd}`;
  };

  const nowISOString = () => {
    const d = new Date();
    return d.toISOString().replace(/[-:\\.]/g, '').split('Z')[0] + 'Z';
  };

  // 生成单个竞赛的 VEVENT 字符串
  const buildEvent = (comp: any) => {
    const uid = `comp-${comp.id}@blockchain-site`;
    const dtstamp = nowISOString();
    const dtstart = toICSDate(comp.startTime);
    // DTEND as next day for all-day event
    const endDate = new Date(comp.endTime);
    endDate.setDate(endDate.getDate() + 1);
    const dtend = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, '0')}${String(endDate.getDate()).padStart(2, '0')}`;

    return [
      'BEGIN:VEVENT',
      `UID:${uid}` ,
      `DTSTAMP:${dtstamp}` ,
      `DTSTART;VALUE=DATE:${dtstart}` ,
      `DTEND;VALUE=DATE:${dtend}` ,
      `SUMMARY:${comp.title}` ,
      `DESCRIPTION:${comp.description}` ,
      `URL:${comp.url || comp.link || ''}` ,
      'END:VEVENT'
    ].join('\r\n');
  };

  // 生成 ICS 并触发下载
  const downloadICSForCompetitions = (comps: any[]) => {
    if (!comps || comps.length === 0) return;
    const header = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//区块链网站//Competition Calendar//CN'].join('\r\n');
    const events = comps.map(buildEvent).join('\r\n');
    const footer = 'END:VCALENDAR';
    const ics = [header, events, footer].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'competitions.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadSingleICS = (comp: any) => {
    const header = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//区块链网站//Competition Calendar//CN'].join('\r\n');
    const event = buildEvent(comp);
    const footer = 'END:VCALENDAR';
    const ics = [header, event, footer].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${comp.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // 通知调度（简单实现：24 小时前提醒），注意：仅在页面打开时有效
  const scheduledTimers: Record<string, number> = {};

  const scheduleNotificationForComp = async (comp: any, hoursBefore = 24) => {
    if (!('Notification' in window)) {
      alert('当前浏览器不支持通知功能');
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('请允许通知以启用提醒功能');
      return;
    }

    const start = new Date(comp.startTime);
    const notifyTime = new Date(start.getTime() - hoursBefore * 60 * 60 * 1000);
    const now = new Date();
    const ms = notifyTime.getTime() - now.getTime();

    const showNotification = () => {
      new Notification(comp.title, {
        body: `竞赛将于 ${formatDate(comp.startTime)} 开始。点击查看详情。`,
      });
    };

    if (ms <= 0) {
      // 时间已到或过去，立即提示
      showNotification();
      return;
    }

    // 限制最长超时（浏览器/环境限制）—如果太长仍尝试，但可能不可靠
    const timerId = window.setTimeout(showNotification, ms);
    scheduledTimers[`${comp.id}`] = timerId;
    alert(`已为“${comp.title}”设置提醒（将在 ${hoursBefore} 小时前通知）。请保持页面打开以接收通知`);
  };

  const scheduleNotificationsForAll = async (comps: any[], hoursBefore = 24) => {
    for (const c of comps) {
      // await to sequentially request permission only once; Notification.requestPermission is cached by browser
      // but keep sequential to avoid spamming prompts in some browsers
      // eslint-disable-next-line no-await-in-loop
      await scheduleNotificationForComp(c, hoursBefore);
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">区块链竞赛渠道</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            发现最新、最具挑战性的区块链竞赛，展示你的技术实力，赢取丰厚奖励
          </p>
        </motion.div>
        
        {/* 搜索和筛选区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#0c0c2a] rounded-xl p-6 border border-[#1a1a3a] mb-12"
        >
          {/* 搜索框 */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索竞赛..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 pl-12 rounded-lg bg-[#1a1a3a] border border-[#2a2a4a] focus:border-[#00f5ff] focus:outline-none text-white"
              />
              <i className="fa-solid fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          
          {/* 筛选选项 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 类型筛选 */}
            <div>
              <h3 className="text-lg font-semibold mb-3">竞赛类型</h3>
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
            
            {/* 难度筛选 */}
            <div>
              <h3 className="text-lg font-semibold mb-3">难度级别</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                      selectedDifficulty === difficulty
                        ? 'bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]'
                        : 'bg-[#1a1a3a] text-gray-300 border border-transparent hover:border-[#00f5ff]/50'
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 时间范围筛选 */}
            <div>
              <h3 className="text-lg font-semibold mb-3">时间范围</h3>
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
        
        {/* 竞赛列表 */}
        {filteredCompetitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCompetitions.map((competition, index) => (
              <motion.div
                key={competition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl overflow-hidden border border-[#1a1a3a] hover-card bg-[#0c0c2a]"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={competition.image} 
                    alt={competition.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{competition.title}</h3>
                    <span className={`px-3 py-1 text-xs rounded-full border ${getStatusStyle(checkCompetitionStatus(competition.startTime, competition.endTime))}`}>
                      {checkCompetitionStatus(competition.startTime, competition.endTime)}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-4 text-gray-400">
                    <i className="fa-solid fa-building mr-2"></i>
                    <span>{competition.platform}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-6 line-clamp-3">{competition.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 text-xs rounded-full bg-[#1a1a3a] text-gray-300">
                      {competition.type}
                    </span>
                    <span className={`px-3 py-1 text-xs rounded-full ${getDifficultyStyle(competition.difficulty)}`}>
                      {competition.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center text-sm text-gray-400 mb-1">
                        <i className="fa-solid fa-calendar-alt mr-2"></i>
                        <span>{formatDate(competition.startTime)} - {formatDate(competition.endTime)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <i className="fa-solid fa-award mr-2"></i>
                        <span className="line-clamp-1">{competition.rewards}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <a 
                        href={competition.url || competition.link}
                        target={(competition.url || competition.link || '').startsWith('http') ? '_blank' : undefined}
                        rel={(competition.url || competition.link || '').startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="btn-hover px-4 py-2 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold"
                      >
                        立即报名
                      </a>
                      <button
                        onClick={() => downloadSingleICS(competition)}
                        className="ml-3 px-3 py-2 rounded-lg bg-[#1a1a3a] text-gray-300 text-sm border border-[#2a2a4a]"
                        title="添加到日历"
                      >
                        <i className="fa-solid fa-calendar-plus"></i>
                      </button>
                      <button
                        onClick={() => scheduleNotificationForComp(competition)}
                        className="ml-2 px-3 py-2 rounded-lg bg-transparent border border-[#00f5ff] text-[#00f5ff] text-sm"
                        title="设置提醒"
                      >
                        <i className="fa-solid fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 rounded-full bg-[#1a1a3a] flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-search text-4xl text-gray-500"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">未找到匹配的竞赛</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              尝试调整筛选条件或搜索关键词，以查找更多相关竞赛
            </p>
            <button 
              className="btn-hover mt-8 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold"
              onClick={() => {
                setSelectedType("全部");
                setSelectedDifficulty("全部");
                setSelectedTimeRange("全部");
                setSearchTerm("");
              }}
            >
              重置筛选条件
            </button>
          </motion.div>
        )}
        
        {/* 竞赛日历提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#0c0c2a] rounded-xl p-8 border border-[#1a1a3a] hover-card text-center"
        >
          <h2 className="text-2xl font-bold mb-4">不错过任何竞赛机会</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            订阅我们的竞赛日历，及时获取最新竞赛信息和截止日期提醒
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => downloadICSForCompetitions(filteredCompetitions)}
              className="btn-hover px-6 py-3 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold"
            >
              <i className="fa-solid fa-calendar-plus mr-2"></i>
              订阅竞赛日历
            </button>
            <button
              onClick={() => scheduleNotificationsForAll(filteredCompetitions)}
              className="btn-hover px-6 py-3 rounded-lg bg-transparent border-2 border-[#00f5ff] text-[#00f5ff] font-bold"
            >
              <i className="fa-solid fa-bell mr-2"></i>
              设置提醒通知
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}