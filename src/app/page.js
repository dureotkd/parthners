/* eslint-disable @next/next/no-img-element */
"use client";

import dynamic from "next/dynamic";

// 🔹 Dynamic import 설정
const Main = dynamic(() => import("./main"), { ssr: false });

export default function Home() {
  return (
    <div>
      <Main />
      <footer
        className="pt-1 flex justify-center"
        style={{ backgroundColor: "#54595f", height: 211 }}
      >
        <div className="e-con-inner flex justify-center">
          <div
            className="elementor-element elementor-element-43cc9a7 elementor-widget elementor-widget-text-editor"
            data-id="43cc9a7"
            data-element_type="widget"
            data-widget_type="text-editor.default"
          >
            <div className="elementor-widget-container text-white leading-10">
              <p className="text-center">(주)파트너스</p>
              <p className="text-center">
                © Partners. 2025 ALL RIGHTS RESERVED
              </p>
              <p className="text-center">대표자 : 남동진</p>
              <p className="text-center">사업자등록번호 : 648-50-01150</p>
              <p className="text-center">
                경기도 시흥시 시흥대로 268번길 51 상가 101호
              </p>{" "}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
