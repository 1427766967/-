"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  car_model: string;
  contact: string;
  image_url: string;
};

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(false);

    const { data, error } = await supabase
      .from("products")
      .select("id, name, price, car_model, contact, image_url")
      .or(`name.ilike.%${keyword}%,car_model.ilike.%${keyword}%`);

    setLoading(false);
    setSearched(true);
    setResults(error ? [] : (data || []));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">找配件</h1>
        <p className="text-gray-400 text-sm mb-6">配链汽配平台</p>
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="输入零件名或车型，例：刹车片、速腾"
            required
            className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded-lg px-5 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "搜索中..." : "搜索"}
          </button>
        </form>

        {searched && results.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-10">没找到相关商品</p>
        )}

        <div className="space-y-3">
          {results.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
              {item.image_url && (
                <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-3" />
              )}
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-gray-900">{item.name}</span>
                <span className="text-blue-600 font-bold">¥{item.price}</span>
              </div>
              <p className="text-xs text-gray-400 mb-1">适用车型：{item.car_model}</p>
              <p className="text-xs text-gray-500">联系：{item.contact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
