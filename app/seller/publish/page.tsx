"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PublishProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    carModel: "",
    contact: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sellerId = localStorage.getItem("seller_id");
    if (!sellerId) {
      router.push("/seller/login");
      return;
    }

    setLoading(true);
    setMessage("");

    let imageUrl = "";

    if (image) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${sellerId}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, image);

      if (uploadError) {
        setLoading(false);
        setMessage("图片上传失败，请重试");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from("products").insert({
      seller_id: sellerId,
      name: form.name,
      price: parseFloat(form.price),
      car_model: form.carModel,
      contact: form.contact,
      image_url: imageUrl,
    });

    setLoading(false);

    if (error) {
      setMessage("发布失败，请重试");
    } else {
      setMessage("商品发布成功！");
      setForm({ name: "", price: "", carModel: "", contact: "" });
      setImage(null);
      setPreview("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">发布商品</h1>
        <p className="text-gray-400 text-sm mb-8">配链汽配平台</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品名称</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="例：刹车片、机油滤清器"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">价格（元）</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="例：58"
              required
              type="number"
              min="0"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">适用车型</label>
            <input
              name="carModel"
              value={form.carModel}
              onChange={handleChange}
              placeholder="例：大众速腾、丰田卡罗拉"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">联系方式</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="手机号或微信号"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品图片</label>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              {preview ? (
                <img src={preview} alt="预览" className="w-full h-40 object-cover rounded-lg mb-2" />
              ) : (
                <div className="h-40 flex items-center justify-center text-gray-300 text-sm">
                  点击上传图片
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full text-sm text-gray-500"
              />
            </div>
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
            {loading ? "发布中..." : "发布商品"}
          </button>
        </form>
      </div>
    </div>
  );
}
