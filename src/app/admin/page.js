"use client";

import { createClient } from "@supabase/supabase-js";
import React from "react";

const supabaseUrl = "https://inagnsrucwyegbgvkozh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYWduc3J1Y3d5ZWdiZ3Zrb3poIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTU0MTI1MSwiZXhwIjoyMDU1MTE3MjUxfQ.T4HAG1DsFMOMYUgDqbX1AEib_mQw6PPv7nBFh9CbwXw";
const supabase = createClient(supabaseUrl, supabaseKey);

function Page() {
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("counsel").select("*");
      setList(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div
      className="mx-auto p-4 w-full min-h-screen"
      style={{ backgroundColor: "#121212" }}
    >
      <h2 className="text-xl font-bold mb-4 text-white">
        사용자 거래소 데이터
      </h2>
      <div className="md:text-base text-sm overflow-x-auto">
        {loading ? (
          <h4 className="text-white">데이터 불러오는중...</h4>
        ) : (
          <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-left">이름</th>
                <th className="p-3 text-left">전화번호</th>
                <th className="p-3 text-left">거래소</th>
                <th className="p-3 text-left">생성 날짜</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 &&
                list.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 font-bold text-gray-700">
                      {item.phone}
                    </td>
                    <td className="p-3">
                      {item.use_spot.replaceAll("/", ", ")}
                    </td>
                    <td className="p-3 text-gray-500">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Page;
