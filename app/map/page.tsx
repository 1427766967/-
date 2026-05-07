"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const mockShops = [
  { name: "张记汽配", address: "青州市经济开发区", phone: "138xxxx1234", lng: 118.4798, lat: 36.6953 },
  { name: "李氏配件行", address: "青州市王府街道", phone: "139xxxx5678", lng: 118.4650, lat: 36.6853 },
  { name: "青州老王汽配", address: "青州市弥河镇", phone: "137xxxx9012", lng: 118.4900, lat: 36.6753 },
];

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapLoaded = useRef(false);

  const initMap = () => {
    if (mapLoaded.current || !mapRef.current) return;
    mapLoaded.current = true;

    // @ts-ignore
    const map = new AMap.Map(mapRef.current, {
      zoom: 13,
      center: [118.4798, 36.6853],
    });

    mockShops.forEach((shop) => {
      // @ts-ignore
      const marker = new AMap.Marker({
        position: [shop.lng, shop.lat],
        title: shop.name,
      });

      // @ts-ignore
      const infoWindow = new AMap.InfoWindow({
        content: `
          <div style="padding:8px;min-width:160px">
            <div style="font-weight:bold;margin-bottom:4px">${shop.name}</div>
            <div style="font-size:12px;color:#666;margin-bottom:4px">${shop.address}</div>
            <div style="font-size:12px;color:#666">电话：${shop.phone}</div>
          </div>
        `,
        offset: new (window as any).AMap.Pixel(0, -30),
      });

      marker.on("click", () => {
        infoWindow.open(map, marker.getPosition());
      });

      marker.setMap(map);
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">找店铺</h1>
        <p className="text-gray-400 text-xs">点击地图标记查看店铺信息</p>
      </div>
      <Script
        src={`https://webapi.amap.com/maps?v=2.0&key=${process.env.NEXT_PUBLIC_AMAP_KEY}`}
        onLoad={initMap}
      />
      <div ref={mapRef} className="flex-1" style={{ minHeight: "calc(100vh - 80px)" }} />
    </div>
  );
}
