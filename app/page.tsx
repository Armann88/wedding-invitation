"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Line1 from "../public/images/Line1.png";
import { Great_Vibes, Noto_Serif_Armenian } from "next/font/google";
import localFont from "next/font/local";


const ArmenianDecorativeUnicode = localFont({
  src: "./fonts/ArmenianDecorativeUnicode.ttf",
});
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});
const NotSerifArmenian = Noto_Serif_Armenian({
  weight: ["200", "300", "400", "700"],
  subsets: ["latin"],
});

export default function Home() {
 const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [guestsCount, setGuestsCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [heartPosition, setHeartPosition] = useState({
    x: 55,
    y: 0,
  });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 30%", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 20,
    damping: 25,
  });

  const [progressValue, setProgressValue] = useState(0);

const [musicOn, setMusicOn] = useState(false);

function startMusic() {
  if (!audioRef.current) return;

  audioRef.current.volume = 0.5;

  audioRef.current.play()
    .then(() => {
      setMusicOn(true);
    })
    .catch(console.log);
}
useEffect(() => {
  const unsubscribe = smoothProgress.on("change", (progress) => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    const point = path.getPointAtLength(progress * length);

    setHeartPosition({
      x: point.x,
      y: point.y,
    });
  });

  return () => unsubscribe();
}, [smoothProgress]);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      side: formData.get("side"),
      guestsCount, // <-- state-ից ենք վերցնում
      additionalInfo: formData.get("additionalInfo"),
    };

    console.log(data);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwFfzvr4Eo295X-N1CcTxLVcSb49XXqSaSKwc0ajLGwkV_ylVLI4kLMtMtgg2YrAra_iQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      form.reset();

      setGuestsCount(""); // dropdown-ը նույնպես մաքրում ենք
      setMessage("Սիրով կսպասենք Ձեզ");
    } catch (error) {
      console.error(error);
      setMessage("Սխալ տեղի ունեցավ");
    }

    setLoading(false);
  }
  const weddingDate = new Date("2026-08-15T09:30:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const diff = weddingDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="min-h-screen bg-[#ffF8F8] flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-black shadow-xl">
        <header className="relative w-full overflow-hidden">
          <Image
            src="/images/Line1.png"
            alt="Wedding"
            width={430}
            height={900}
            priority
            className="w-full h-auto object-contain"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center -translate-x-[10px] translate-y-[120px]">
            <h1
              className={`${greatVibes.className} text-[#272727] text-[80px] -translate-x-[83px] translate-y-[60px]`}
            >
              Aram
            </h1>

            <h1
              className={`${greatVibes.className} text-[#272727] text-[60px]`}
            >
              &
            </h1>

            <h1
              className={`${greatVibes.className} text-[#272727] text-[80px] translate-x-[83px] -translate-y-[50px]`}
            >
              Syuzi
            </h1>
            <p
              className={`${NotSerifArmenian.className}  text-[#272727] text-[15px] font-bold translate-y-[63px]`}
            >
              AUGUST
            </p>
            <div className="flex items-center justify-center gap-4 translate-y-[63px]">
              <div className="flex flex-col items-center gap-1">
                <hr className="w-[85px] border-t-1 border-[#272727]" />
                <p
                  className={`${NotSerifArmenian.className} text-[#272727] text-[13px] font-bold`}
                >
                  SUNDAY
                </p>
                <hr className="w-[85px] border-t-1 border-[#272727]" />
              </div>
              <h1
                className={`${NotSerifArmenian.className} text-[#272727] text-[35px] font-bold`}
              >
                15
              </h1>
              <div className="flex flex-col items-center gap-1">
                <hr className="w-[85px] border-t-1 border-[#272727]" />
                <p
                  className={`${NotSerifArmenian.className} text-[#272727] text-[13px] font-bold`}
                >
                  FROM 10 AM
                </p>
                <hr className="w-[85px] border-t-1 border-[#272727]" />
              </div>
            </div>
            <p
              className={`${NotSerifArmenian.className}  text-[#272727] text-[15px] font-bold translate-y-[63px]`}
            >
              2026
            </p>
          </div>
        </header>
        <div className="relative w-full min-h-[1900px] overflow-hidden">
          {/* BACKGROUND */}
       <Image
  src="/images/Background.png"
  alt="Background"
  width={430}
  height={1900}
  className="
    absolute
    top-0
    left-0
    w-full
    h-full
    object-cover
    z-0
    pointer-events-none
  "
/>

          {/* CONTENT ON BACKGROUND */}
         <div className="relative z-10 flex flex-col items-center">
            {/* GROUP */}
            <Image
              src="/images/Group.png"
              alt="Group"
              width={430}
              height={1900}
              className="w-full h-auto"
            />

            {/* AUGUST */}
            <p
              className={`${NotSerifArmenian.className}
      text-[#272727] text-[30px] font-normal mt-[50px] mb-[60px]`}
            >
              Օգոստոս 2026
            </p>

            {/* SVG */}
<div
  ref={timelineRef}
  className="flex items-center justify-center w-full h-[1000px] overflow-hidden"
>
              <div
                className={`${NotSerifArmenian.className} text-center text-[#272727]`}
              >
                <div className=" -translate-y-[50px] translate-x-[35px]">
                  <p className="text-[30px] font-semibold">09:30</p>

                  <p className="text-[17px] font-[400]">Փեսայի Տուն</p>

                  <p className="text-[13px] font-[300]  ">
                    ք. Երևան,
                    <br /> Բուռնազյան 65
                  </p>
                </div>
                <div
                  className={`${NotSerifArmenian.className} text-center text-[#272727] translate-y-[40px] translate-x-[35px]`}
                >
                  <p className="text-[30px] font-semibold">13:30</p>

                  <p className="text-[17px] font-[400]">Պսակադրություն</p>

                  <p className="text-[13px] font-[300]">
                    Սուրբ Հովհաննես <br /> Ավետարանիչ եկեղեցի
                    <br /> (ք. Արտաշատ)
                  </p>
                </div>
              </div>

              <div className="relative w-full">
<div
  className={`
    ${NotSerifArmenian.className}
    absolute
    ml-[-8px]
    top-[10px]
    left-0
    w-full
    flex
    justify-center
    items-center
    text-[#787777]
    text-[35px]
  `}
>
  <div className="flex gap-8">
    <span>13</span>
    <span>14</span>
  </div>

  <div className="mx-[50px]"></div>

  <div className="flex gap-8">
    <span>16</span>
    <span>17</span>
  </div>
</div>
                <svg
                  className="relative z-50 w-[160px] h-full overflow-visible"
                  viewBox="0 -80 430 1780"
                >
                  <g transform="translate(150 0)">
                    <path
                      ref={pathRef}
                      d="M58 20.5C52.64 69.74 52.5 135.5 79 171.5C99.1 206.87 130.76 245.1 126 285.5C117.56 357.11 23.3196 362.74 6.1096 429.6C-5.7604 475.74 19.3696 517.03 49.7096 549.19C78.2196 579.41 111.63 608.22 123.48 648.04C137.44 694.93 121.11 739.49 91.9696 776.69C64.2096 812.13 19.2196 837.09 5.1596 881.74C-5.6104 915.93 4.5596 953.76 22.7396 984.65C62.1996 1051.68 150.23 1103.62 151.23 1188.77C151.75 1232.99 137.1 1271.18 109.16 1304.88C83.7096 1335.58 51.8096 1362.59 36.3796 1400.31C16.8796 1448 29.1796 1500.73 45.0196 1547.54C60.0796 1592.04 54.9896 1621.04 54.5696 1665.65"
                      fill="none"
                      stroke="#272727"
                      strokeWidth="1.5"
                      strokeDasharray="8 15"
                    />
                  </g>

                 <image
  href="/images/Heart.png"
  width="127"
  height="115"
  x={heartPosition.x + 85}
  y={heartPosition.y - 55}
/>
                </svg>
              </div>
              <div>
                <div
                  className={`${NotSerifArmenian.className} text-center text-[#272727] -translate-y-[-50px] -translate-x-[35px]`}
                >
                  <p className="text-[30px] font-semibold">11:30</p>

                  <p className="text-[17px] font-[400]">Հարսի Տուն</p>

                  <p className="text-[13px] font-[300]">
                    ք. Արտաշատ, Ստեփանյան 30
                  </p>
                </div>
                <div
                  className={`${NotSerifArmenian.className} text-center text-[#272727] translate-y-[140px] -translate-x-[35px]`}
                >
                  <p className="text-[30px] font-semibold">17:00</p>

                  <p className="text-[17px] font-[400]">Հանդիսություն</p>

                  <p className="text-[13px] font-[300]">
                    Safari hall restaurant
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-[50px]">
              <div className="relative w-[350px] h-[full]">
                <Image
                  src="/images/Line2.png"
                  alt="Line2"
                  width={625.77}
                  height={777.75}
                  className="absolute top-0 left-0 w-[235px] h-auto z-10"
                />

                <Image
                  src="/images/Line22.png"
                  alt="Line22"
                  width={625.77}
                  height={777.75}
                  className="absolute top-29 left-[110px] w-[235px] h-auto z-20"
                />
              </div>
            </div>
            <div className="flex flex-col items-center mt-[550px]">
              <p
                className={`${ArmenianDecorativeUnicode.className} text-[28px] mb-[20px] italic text-[#272727]`}
              >
                Սիրով կսպասենք Ձեզ
              </p>

              <Image
                src="/images/Footer.png"
                alt="Footer"
                width={250}
                height={280}
              />

            <form
  onSubmit={handleSubmit}
  className={`${ArmenianDecorativeUnicode.className} text-[18px] italic text-[#272727] mt-[100px]`}
>

  {/* Անուն */}
  <div className="mb-[15px]">
    <label htmlFor="firstName">Անուն</label>
    <br />

    <input
      id="firstName"
      name="firstName"
      type="text"
      placeholder="Մուտքագրեք անունը"
      required
      className="
        w-full
        bg-transparent
        border-0
        border-b
        border-[#272727]
        outline-none
        focus:border-[#272727]
        px-0
        py-2
        placeholder:text-gray-400
      "
    />
  </div>


  {/* Ազգանուն */}
  <div className="mb-[15px]">
    <label htmlFor="lastName">Ազգանուն</label>
    <br />

    <input
      id="lastName"
      name="lastName"
      type="text"
      placeholder="Մուտքագրեք Ազգանուն"
      required
      className="
        w-full
        bg-transparent
        border-0
        border-b
        border-[#272727]
        outline-none
        focus:border-[#272727]
        px-0
        py-2
        placeholder:text-gray-400
      "
    />
  </div>


  {/* Կողմ */}
  <fieldset className="mb-6">

    <legend className="text-[#272727] mb-3">
      Ո՞ր կողմից եք
    </legend>


    <label className="flex items-center gap-3 cursor-pointer mb-3">

      <input
        type="radio"
        name="side"
        value="Հարսի կողմից"
        required
        className="peer hidden"
      />

      <span
        className="
          w-4
          h-4
          rounded-full
          border
          border-[#272727]
          flex
          items-center
          justify-center
          peer-checked:bg-[#272727]
        "
      />

      <span>
        Հարսի կողմից
      </span>

    </label>



    <label className="flex items-center gap-3 cursor-pointer">

      <input
        type="radio"
        name="side"
        value="Փեսայի կողմից"
        className="peer hidden"
      />

      <span
        className="
          w-4
          h-4
          rounded-full
          border
          border-[#272727]
          flex
          items-center
          justify-center
          peer-checked:bg-[#272727]
        "
      />

      <span>
        Փեսայի կողմից
      </span>

    </label>

  </fieldset>



  {/* Հյուրերի քանակ */}
  <div className="mb-6 relative">

    <label className="block mb-2">
      Հյուրերի քանակ
    </label>


    <div
      onClick={() => setIsOpen(!isOpen)}
      className="
        border-b
        border-[#272727]
        pb-2
        flex
        justify-between
        cursor-pointer
      "
    >

      <span>
        {guestsCount || "Ընտրեք քանակը"}
      </span>


      <span
        className={`transition duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        ▼
      </span>

    </div>



    <div
      className={`
        absolute
        left-0
        right-0
        mt-2
        bg-white
        rounded-xl
        shadow-xl
        overflow-hidden
        z-50
        transition-all
        duration-300
        ${
          isOpen
          ? "opacity-100 max-h-[200px]"
          : "opacity-0 max-h-0 pointer-events-none"
        }
      `}
    >

      {Array.from({length:10},(_,i)=>(

        <div
          key={i}
          onClick={()=>{
            setGuestsCount(String(i+1))
            setIsOpen(false)
          }}
          className="
            h-12
            flex
            flex-col
            items-center
            justify-center
            cursor-pointer
            hover:bg-[#f8f2f2]
          "
        >

          <span>
            {i+1}
          </span>


          <div className="w-10 h-[1px] bg-[#272727] mt-1"/>

        </div>

      ))}


    </div>

  </div>




  {/* Լրացուցիչ տեղեկություն */}
  <div className="mb-6">

    <label
      htmlFor="additionalInfo"
      className={`${ArmenianDecorativeUnicode.className} block text-[18px] italic text-[#272727] tracking-wide`}
    >
      Լրացուցիչ տեղեկություն
    </label>


    <textarea
      id="additionalInfo"
      name="additionalInfo"
      rows={4}
      placeholder="Ցանկության դեպքում կարող եք գրել Ձեր ցանկությունները կամ նշումները..."
      className="
        w-full
        bg-transparent
        border-0
        border-b
        border-[#B8A7A7]
        pb-2
        text-[#272727]
        text-[17px]
        placeholder:text-[#B8A7A7]
        outline-none
        resize-none
        transition-all
        duration-300
        focus:border-[#272727]
        focus:scale-[1.01]
      "
    />

  </div>




  {/* Button */}
  <div className="w-full flex justify-center mt-8">

    <button
      type="submit"
      disabled={loading}
      className="
        w-[150px]
        h-[50px]
        border
        border-[#272727]
        rounded-full
        text-[#272727]
        flex
        items-center
        justify-center
        cursor-pointer
        transition-all
        duration-300
        hover:bg-[#272727]
        hover:text-white
      "
    >

      {loading ? "Ուղարկվում է..." : "Ուղարկել"}

    </button>

  </div>


</form>
              {message && (
                <p
                  style={{
                    marginTop: "20px",
                    color: "[#272727]",
                    fontWeight: "bold",
                  }}
                >
                  {message}
                </p>
              )}
              <div
                className={`
    ${ArmenianDecorativeUnicode.className}
    flex
    justify-center
    gap-3
    text-[18px]
    italic
    text-[#272727]
    mt-[80px]
    mb-[50px]
  `}
              >
                <p className="w-[45px] text-center">{timeLeft.days} օր</p>

                <p className="w-[55px] text-center">{timeLeft.hours} ժամ</p>

                <p className="w-[55px] text-center">{timeLeft.minutes} րոպե</p>

                <p className="w-[90px] text-center">
                  {timeLeft.seconds} վայրկյան
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!musicOn && (
  <button
    onClick={startMusic}
    className="
      fixed
      top-6
      right-6
      z-[999]
      w-12
      h-12
      rounded-full
      border
      border-[#272727]
      bg-[#272727]
    "
  >
    🎵
  </button>
)}
<audio ref={audioRef} loop playsInline>
  <source src="/music/wedding.mp3" type="audio/mpeg" />
</audio>
    </main>
  );
}
