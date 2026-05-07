"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SellerLogin() {
  const [form, setForm] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("sellers")
      .select("id, shop_name, contact_name")
      .eq("phone", form.phone)
      .eq("password_hash", form.password)
      .single();

    setLoading(false);

    if (error || !data) {
      setMessage("手机号或密码错误");
      return;
    }

    localStorage.setItem("seller_id", data.id);
    localStorage.setItem("seller_shop_name", data.shop_name);
    localStorage.setItem("seller_contact_name", data.contact_name);

    router.push("/seller/publish");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">卖家登录</h1>
        <p className="text-gray-400 text-sm mb-8">配链汽配平台</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="138xxxxxxxx"
              required
              type="tel"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="请输入密码"
              required
              type="password"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {message && (
            <p className="text-sm text-center text-red-500">{message}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-3 text-sm font-semibold hover:bg-blue-700 transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? "登录中..." : "登录"}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">
          还没有账号？<a href="/seller/register" className="text-blue-600">申请入驻</a>
        </p>
      </div>
    </div>
  );
}
