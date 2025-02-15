"use client";

import { createClient } from "@supabase/supabase-js";
import React from "react";
import Select from "react-select";

const supabaseUrl = "https://inagnsrucwyegbgvkozh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYWduc3J1Y3d5ZWdiZ3Zrb3poIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTU0MTI1MSwiZXhwIjoyMDU1MTE3MjUxfQ.T4HAG1DsFMOMYUgDqbX1AEib_mQw6PPv7nBFh9CbwXw";
const supabase = createClient(supabaseUrl, supabaseKey);

// 거래소 옵션 리스트
const exchangeOptions = [
  { value: "빗썸", label: "빗썸" },
  { value: "업비트", label: "업비트" },
  { value: "코인원", label: "코인원" },
  { value: "코빗", label: "코빗" },
];

function Main() {
  const [formData, setFormData] = React.useState({
    name: "",
    contact: "",
  });
  const [selectedExchanges, setSelectedExchanges] = React.useState([]);

  React.useEffect(() => {
    (async () => {})();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || selectedExchanges.length === 0) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }
    const useSpot = selectedExchanges.map((item) => item.value).join(",");

    const res = await fetch("/api/telegram", {
      method: "POST", // ✅ `handler` 함수가 실행됨
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.contact,
        use_spot: useSpot,
      }),
    })
      .then((r) => r.json())
      .catch((e) => {
        console.log(e);
      });

    // ✅ Supabase에 데이터 저장
    const { data, error } = await supabase.from("counsel").insert([
      {
        name: formData.name,
        phone: formData.contact,
        use_spot: useSpot,
      },
    ]);

    if (error) {
      console.error("데이터 저장 실패:", error);
      alert("데이터 저장에 실패했습니다.");
      return;
    }

    alert("신청이 완료되었습니다.");

    setFormData({
      name: "",
      contact: "",
    });

    setSelectedExchanges([]);
  };

  return (
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
              이용중인 거래소 <span className="text-red-500">*</span>
            </label>
            <Select
              className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              options={exchangeOptions}
              isMulti // ✅ 다중 선택 활성화
              value={selectedExchanges}
              onChange={(selectedOptions) => {
                setSelectedExchanges(selectedOptions);
              }}
              placeholder="거래소 선택"
              closeMenuOnSelect={false} // ✅ 선택 후에도 메뉴가 닫히지 않도록 설정
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            지원하기
          </button>
        </form>

        <div
          className="elementor-element elementor-element-bcf65fd elementor-widget elementor-widget-image"
          data-id="bcf65fd"
          data-element_type="widget"
          data-widget_type="image.default"
        >
          <div className="elementor-widget-container mt-8 mb-8">
            <img
              decoding="async"
              width="800"
              height="134"
              src="https://partnerscoins.com/wp-content/uploads/2025/02/홈페이지-소요시간-1024x171.png"
              className="attachment-large size-large wp-image-110"
              alt=""
              srcSet="https://partnerscoins.com/wp-content/uploads/2025/02/홈페이지-소요시간-1024x171.png 1024w, https://partnerscoins.com/wp-content/uploads/2025/02/홈페이지-소요시간-300x50.png 300w, https://partnerscoins.com/wp-content/uploads/2025/02/홈페이지-소요시간-768x128.png 768w, https://partnerscoins.com/wp-content/uploads/2025/02/홈페이지-소요시간.png 1200w"
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
        className="attachment-full size-full wp-image-80"
        alt=""
        srcSet="https://partnerscoins.com/wp-content/uploads/2025/02/mo_2-1.png 1920w, https://partnerscoins.com/wp-content/uploads/2025/02/mo_2-1-300x139.png 300w, https://partnerscoins.com/wp-content/uploads/2025/02/mo_2-1-1024x473.png 1024w, https://partnerscoins.com/wp-content/uploads/2025/02/mo_2-1-768x355.png 768w, https://partnerscoins.com/wp-content/uploads/2025/02/mo_2-1-1536x710.png 1536w"
        sizes="(max-width: 1920px) 100vw, 1920px"
      ></img>
    </main>
  );
}

export default Main;
