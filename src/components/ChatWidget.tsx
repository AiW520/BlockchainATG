import React, { useEffect, useRef, useState } from 'react';

type Role = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  role: Role;
  text: string;
  time: number;
}

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem('chat_messages');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('chat_messages', JSON.stringify(messages));
    } catch (e) {
      /* ignore */
    }
  }, [messages]);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [open, messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      time: Date.now(),
    };
    setMessages((p) => [...p, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const reply = await getAIReply(text);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: reply,
        time: Date.now(),
      };
      setMessages((p) => [...p, assistantMsg]);
    } catch (e) {
      setMessages((p) => [
        ...p,
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          text: '抱歉，AI 回复失败，请稍后再试。',
          time: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function getAIReply(text: string) {
    // 如果项目配置了一个后端代理地址，可通过环境变量 VITE_AI_PROXY_URL 指定
    // 代理应接收 { message } 并返回 { reply }
    try {
      const proxy = (import.meta as any).env?.VITE_AI_PROXY_URL as string | undefined;
      if (proxy) {
        const res = await fetch(proxy, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text }),
        });
        if (!res.ok) throw new Error('proxy error');
        const data = await res.json();
        return data.reply || JSON.stringify(data);
      }
    } catch (e) {
      console.error('AI proxy failed', e);
    }

    // 本地回退：简单规则与回声
    await new Promise((r) => setTimeout(r, 600));
    if (/你好|您好/.test(text)) return '你好！我是本站智能助手，请问有什么可以帮你的？';
    if (/学习|开始/.test(text)) return '可以去“区块链基础”页面查看学习路径，或者告诉我你想学习的具体主题。';
    if (/比赛|竞赛|报名/.test(text)) return '竞赛信息在“竞赛频道”页面，支持一键报名与添加日历提醒。';
    return `我收到了你的消息：“${text}”。（这是本地回退回复。如需更智能的对话，请配置后端AI代理。）`;
  }

  function formatTime(ts: number) {
    const d = new Date(ts);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  }

  return (
    <div>
      {/* Floating button */}
      <div className="fixed right-6 bottom-6 z-50">
        {open ? (
          <div className="w-80 md:w-96 bg-[#081028] text-white rounded-xl shadow-lg border border-[#223] overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-[#112]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#00ff9d] flex items-center justify-center text-black font-bold">AI</div>
                <div>
                  <div className="text-sm font-semibold">智能助手</div>
                  <div className="text-xs text-gray-300">离线模式</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="text-sm text-gray-300 px-2 py-1"
                  onClick={() => setOpen(false)}
                >
                  收起
                </button>
              </div>
            </div>

            <div className="h-64 overflow-y-auto p-3 space-y-3" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0))' }}>
              {messages.length === 0 && (
                <div className="text-xs text-gray-400">你好！输入消息开始会话，或点击右下角展开。</div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.role === 'user' ? 'bg-[#00ff9d] text-black' : 'bg-[#0f1724] text-gray-200'} max-w-[80%] px-3 py-2 rounded-md`}> 
                    <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                    <div className="text-[10px] text-gray-400 text-right mt-1">{formatTime(m.time)}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-[#112]">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
                  className="flex-1 px-3 py-2 rounded bg-[#071228] text-white border border-[#122]"
                  placeholder="输入消息，按 Enter 发送"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="px-3 py-2 bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-black rounded"
                >
                  {loading ? '...' : '发送'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#00ff9d] shadow-lg flex items-center justify-center font-bold text-black"
            title="打开智能助手"
          >
            AI
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
