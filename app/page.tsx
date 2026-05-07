export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">配链</h1>
      <p className="text-gray-500 text-lg mb-10">青州汽配，一链直达</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/seller/register"
          className="bg-blue-600 text-white rounded-lg px-8 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors text-center"
        >
          我是卖家，申请入驻
        </a>
        <a
          href="/search"
          className="border border-gray-200 text-gray-700 rounded-lg px-8 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors text-center"
        >
          我是买家，找配件
        </a>
      </div>
    </div>
  );
}
