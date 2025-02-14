/* eslint-disable @next/next/no-img-element */

"use client";

import React from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = React.useState({
    name: "",
    contact: "",
    exchange: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.exchange) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }
    console.log("Form Submitted:", formData);
  };

  return (
    <div>
      <main>
        <img
          src="https://partnerscoins.com/wp-content/uploads/2025/02/수정1-1.png"
          className="attachment-full size-full wp-image-79"
        />

        <div className="flex flex-col justify-center items-center">
          <form className="w-2/3 max-w-[664px] mt-11" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                성함 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="(예시) 홍길동"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="(예시) 010-1234-1234"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                이용 중인 거래소 <span className="text-red-500">*</span>
              </label>
              <select
                name="exchange"
                value={formData.exchange}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">선택하세요</option>
                <option value="binance">Binance</option>
                <option value="upbit">Upbit</option>
                <option value="bithumb">Bithumb</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              지원하기
            </button>
          </form>

          <div
            class="elementor-element elementor-element-bcf65fd elementor-widget elementor-widget-image"
            data-id="bcf65fd"
            data-element_type="widget"
            data-widget_type="image.default"
          >
            <div class="elementor-widget-container mt-8 mb-8">
              <img
                decoding="async"
                width="800"
                height="134"
                src="https://partnerscoins.com/wp-content/uploads/2025/02/홈페이지-소요시간-1024x171.png"
                class="attachment-large size-large wp-image-110"
                alt=""
                srcset="https://partnerscoins.com/wp-content/uploads/2025/02/홈페이지-소요시간-1024x171.png 1024w, https://partnerscoins.com/wp-content/uploads/2025/02/홈페이지-소요시간-300x50.png 300w, https://partnerscoins.com/wp-content/uploads/2025/02/홈페이지-소요시간-768x128.png 768w, https://partnerscoins.com/wp-content/uploads/2025/02/홈페이지-소요시간.png 1200w"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </div>
          </div>
        </div>

        <img
          loading="lazy"
          decoding="async"
          width="1920"
          height="887"
          src="https://partnerscoins.com/wp-content/uploads/2025/02/mo_2-1.png"
          class="attachment-full size-full wp-image-80"
          alt=""
          srcset="https://partnerscoins.com/wp-content/uploads/2025/02/mo_2-1.png 1920w, https://partnerscoins.com/wp-content/uploads/2025/02/mo_2-1-300x139.png 300w, https://partnerscoins.com/wp-content/uploads/2025/02/mo_2-1-1024x473.png 1024w, https://partnerscoins.com/wp-content/uploads/2025/02/mo_2-1-768x355.png 768w, https://partnerscoins.com/wp-content/uploads/2025/02/mo_2-1-1536x710.png 1536w"
          sizes="(max-width: 1920px) 100vw, 1920px"
        ></img>
      </main>
      <footer></footer>
    </div>
  );
}
