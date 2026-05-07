"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { icon: "🛞", name: "刹车系统" },
  { icon: "🔧", name: "发动机" },
  { icon: "💡", name: "灯具" },
  { icon: "⚙️", name: "变速箱" },
  { icon: "🌡️", name: "冷却系统" },
  { icon: "🔋", name: "电气系统" },
  { icon: "🪟", name: "车身配件" },
  { icon: "🔩", name: "底盘悬挂" },
];

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) router.push(`/search?q=${encodeURIComponent(keyword)}`);
  };

  const handleCategory = (name: string) => {
    router.push(`/search?q=${encodeURIComponent(name)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero + 搜索 */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white px-6 pt-14 pb-20 flex flex-col items-center text-center">
        <div className="text-xs font-semibold tracking-widest text-blue-300 mb-3 uppercase">青州汽配平台</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 leading-tight">找配件，就上配链</h1>
        <p className="text-blue-200 text-sm mb-8">汇聚青州本地汽配商铺，直连卖家</p>
        <form onSubmit={handleSearch} className="w-full max-w-sm flex gap-2">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="零件名、车型、品牌..."
            className="flex-1 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="bg-white text-blue-700 rounded-xl px-5 py-3 text-sm font-bold hover:bg-blue-50 transition-colors shrink-0"
          >
            搜索
          </button>
        </form>
      </div>

      {/* 分类快捷入口 */}
      <div className="px-6 -mt-6">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs text-gray-400 mb-4">常用分类</p>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategory(cat.name)}
                className="flex flex-col items-center gap-1.5 py-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs text-gray-600 font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 卖家入口 */}
      <div className="px-6 py-8">
        <div className="max-w-lg mx-auto bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-6 text-white flex items-center justify-between">
          <div>
            <p className="font-bold mb-1">你是汽配卖家？</p>
            <p className="text-xs text-gray-400">前3个月完全免费体验</p>
          </div>
          <a
            href="/seller/register"
            className="bg-white text-gray-900 rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-gray-100 transition-colors shrink-0"
          >
            免费入驻
          </a>
        </div>
      </div>

      {/* 平台优势 */}
      <div className="px-6 pb-12">
        <div className="max-w-lg mx-auto space-y-3">
          {[
            { icon: "🔍", title: "搜索直达", desc: "输入零件名或车型，秒出有货商铺" },
            { icon: "📞", title: "直连卖家", desc: "电话微信一目了然，直接沟通议价" },
            { icon: "📍", title: "地图导航", desc: "店铺位置清晰，一键导航到门口" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl shrink-0">{item.icon}</div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部 */}
      <div className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        配链汽配平台 · 青州本地
        <span className="mx-2">·</span>
        <a href="/seller/login" className="text-gray-400 hover:text-gray-600">卖家登录</a>
      </div>
    </div>
  );
}
