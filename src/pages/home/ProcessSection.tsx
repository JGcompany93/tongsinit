import Step1Gif from "../../assets/step1.gif";
import Step2Gif from "../../assets/step2.gif";
import Step3Gif from "../../assets/step3.gif";
import ScrollHint from "./ScrollHint";

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#0B3AA8] min-h-[95svh]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_80%_35%,rgba(99,102,241,0.18),transparent_45%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-white">
          <span className="inline-flex items-center rounded-full bg-white/12 px-4 py-2 text-sm font-semibold">
            PROCESS
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-extrabold leading-tight">
            간편하게 진행해요!
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { title: "간편 접수", sub: "5분 만에 접수해요!", img: Step1Gif },
            { title: "로켓 설치", sub: "당일 설치도 가능해요!", img: Step2Gif },
            { title: "당일 입금", sub: "담당 직원에게 연락해요!", img: Step3Gif },
          ].map((x) => (
            <div
              key={x.title}
              className="relative rounded-3xl bg-white p-10 border border-black/5 shadow-[0_28px_0_rgba(0,0,0,0.14),0_48px_90px_rgba(0,0,0,0.28)]"
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-10px_20px_rgba(0,0,0,0.04)]" />
              <div className="relative">
                <div className="flex justify-center">
                  <img
                    src={x.img}
                    alt=""
                    className="h-28 w-28 object-contain"
                    draggable={false}
                  />
                </div>

                <div className="mt-7 text-center">
                  <div className="text-2xl font-extrabold text-gray-900">
                    {x.title}
                  </div>
                  <div className="mt-3 text-base font-semibold text-gray-600">
                    {x.sub}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ PROCESS ↔ REVIEWS 사이 */}
      <ScrollHint href="#reviews" />
    </section>
  );
}
