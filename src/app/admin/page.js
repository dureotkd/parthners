"use client";

import { createClient } from "@supabase/supabase-js";
import React from "react";

const supabaseUrl = "https://inagnsrucwyegbgvkozh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYWduc3J1Y3d5ZWdiZ3Zrb3poIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTU0MTI1MSwiZXhwIjoyMDU1MTE3MjUxfQ.T4HAG1DsFMOMYUgDqbX1AEib_mQw6PPv7nBFh9CbwXw";
const supabase = createClient(supabaseUrl, supabaseKey);

function LoginPage({ setIsLogin }) {
  const [inputs, setInputs] = React.useState({
    id: "",
    pw: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(event) => {
                event.preventDefault();

                console.log(inputs);

                if (inputs.id === "admin" && inputs.pw === "admin1101") {
                  setIsLogin(true);
                  window.localStorage.setItem("login", "1");
                }
              }}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your id
                </label>
                <input
                  type="text"
                  name="id"
                  onChange={handleChange}
                  value={inputs.id}
                  autoFocus
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="pw"
                  onChange={handleChange}
                  value={inputs.pw}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Page() {
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const loginStorage = window.localStorage.getItem("login");

      if (loginStorage) {
        setIsLogin(true);
      }

      const { data, error } = await supabase
        .from("counsel")
        .select("*")
        .order("id", { ascending: false }); // ✅ 내림차순 (DESC)

      setList(data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div
        className="mx-auto p-4 w-full min-h-screen"
        style={{ backgroundColor: "#121212" }}
      >
        <h4 className="text-white">페이지 불러오는중...</h4>
      </div>
    );
  }

  if (!isLogin) {
    return <LoginPage setIsLogin={setIsLogin} />;
  }

  return (
    <div
      className="mx-auto p-4 w-full min-h-screen"
      style={{ backgroundColor: "#121212" }}
    >
      <h2 className="text-xl font-bold mb-4 text-white">
        사용자 거래소 데이터
      </h2>
      <div className="md:text-base text-sm overflow-x-auto">
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
                  <td className="p-3 font-bold text-gray-700">{item.phone}</td>
                  <td className="p-3">{item.use_spot.replaceAll("/", ", ")}</td>
                  <td className="p-3 text-gray-500">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
