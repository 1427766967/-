"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SellerRegister() {
  const [form, setForm] = useState({
    shopName: "",
    contactName: "",
    phone: "",
    address: "",
    yearsOpen: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("sellers").insert({
      shop_name: form.shopName,
      contact_name: form.contactName,
      phone: form.phone,
      address: form.address,
      years_open: parseInt(form.yearsOpen),
      password_hash: form.password,
    });

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        setMessage("该手机号已注册");
      } else {
        setMessage("注册失败，请重试");
      }
    } else {
      setMessage("申请成功！我们会尽快联系您。");
      setForm({ shopName: "", contactName: "", phone: "", address: "", yearsOpen: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">卖家入驻</h1>
        <p className="text-gray-400 text-sm mb-8">配链汽配平台</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">店铺名称</label>
            <input
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              placeholder="例：张记汽配"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">联系人姓名</label>
            <input
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              placeholder="您的姓名"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">店铺地址</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="青州市xxx路xxx号"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">开店年限（年）</label>
            <input
              name="yearsOpen"
              value={form.yearsOpen}
              onChange={handleChange}
              placeholder="例：8"
              required
              type="number"
              min="1"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">登录密码</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="6位以上"
              required
              type="password"
              minLength={6}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {message && (
            <p className={`text-sm text-center ${message.includes("成功") ? "text-green-600" : "text-red-500"}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-3 text-sm font-semibold hover:bg-blue-700 transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? "提交中..." : "申请入驻"}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">
          已有账号？<a href="/seller/login" className="text-blue-600">登录</a>
        </p>
      </div>
    </div>
  );
}
