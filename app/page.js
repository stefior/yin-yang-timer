"use client";

import { useState, useEffect, useRef } from "react";
import useTimer from "easytimer-react-hook";

// TODO:
// - fix sizing on small screens
// - add alert once countdown is complete

export default function Home() {
  const [stopwatch, isStopwatchAchieved] = useTimer();
  const [updateWhenTargetAchieved, setUpdateWhenTargetAchieved] =
    useState(true);
  const [countdown, isCountdownAchieved] = useTimer({
    updateWhenTargetAchieved,
  });
  const [yinYang, setYinYang] = useState(0);
  const [timer, setTimer] = useState("00:00:00");
  const intervalRef = useRef();

  stopwatch.start({});

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer(stopwatch.getTimeValues().toString());
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = yinYang ? "black" : "white";
    if (yinYang) {
      stopwatch.pause();
      countdown.start({
        startValues: { ...stopwatch.getTimeValues() },
        countdown: true,
        target: { seconds: 0 },
      });
      stopwatch.stop();
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(
        () => setTimer(countdown.getTimeValues().toString()),
        1000
      );
    } else {
      function showNotification() {
        const notification = new Notification("Yin/Yang Countdown Complete!", {
          body: "New stopwatch automatically starting ...",
          icon: "./favicon.ico"
        });

        notification.onclick = (e) => {
          window.focus();
        }
      }

      if (Notification.permission !== "denied" && isCountdownAchieved) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            showNotification();
          }
        });
      }

      countdown.reset();
      countdown.stop();
      stopwatch.reset();
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(
        () => setTimer(stopwatch.getTimeValues().toString()),
        1000
      );
    }
  }, [yinYang]);

  useEffect(() => {
    setYinYang(0);
  }, [isCountdownAchieved]);

  return (
    <>
      <div
        className={`text-[24vw] md:text-[20vw] lg:text-[12vw] ${
          yinYang ? "text-white" : "text-black font-light"
        } transition-all`}
      >
        {timer}
      </div>
      <button
        className={`overflow-hidden w-20 h-20 md:w-28 md:h-28 lg:w-[8vw] lg:h-[8vw] mt-8 rounded-full px-1 py-1 ${
          yinYang ? "" : "ring-black hover:ring-4"
        } transition-all`}
        onClick={() => {
          yinYang ? setYinYang(0) : setYinYang(1);
        }}
        disabled={yinYang ? true : false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="svg2"
          viewBox="0 0 720 720"
          version="1.0"
        >
          <g id="layer1">
            <path
              id="path2413"
              d="m360 0v720c198.72 0 360-161.28 360-360s-161.28-360-360-360z"
            />
            <path
              id="path2466"
              fill="#fff"
              d="m360 720v-720c-198.72 0-360 161.28-360 360s161.28 360 360 360z"
            />
            <path
              id="path2468"
              fill="#fff"
              transform="matrix(4,0,0,4,540,-720)"
              d="m0 225a45 45 0 1 1 -90 0 45 45 0 1 1 90 0z"
            />
            <path
              id="path2470"
              transform="matrix(4,0,0,4,540,-360)"
              d="m0 225a45 45 0 1 1 -90 0 45 45 0 1 1 90 0z"
            />
            <path
              id="path2472"
              transform="translate(405,-45)"
              d="m0 225a45 45 0 1 1 -90 0 45 45 0 1 1 90 0z"
            />
            <path
              id="path2474"
              fill="#fff"
              transform="translate(405,315)"
              d="m0 225a45 45 0 1 1 -90 0 45 45 0 1 1 90 0z"
            />
          </g>
        </svg>
      </button>
    </>
  );
}
