import "../styles/hero.css";

import { useEffect, useState } from "react";

import hero1Img from "../assets/hero1.jpg";
import hero2Img from "../assets/hero2.JPG";
import hero3Img from "../assets/hero3.JPG";

const images = [
  hero1Img,
  hero2Img,
  hero3Img
];

export default function Hero() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <section className="hero">

      <div className="hero-left">

        <h1>
          Experience the spirit of
          Chanakya University
        </h1>

        <p>
          Explore cultural, technical,
          educational and innovation
          events happening across
          Chanakya University.
        </p>

        <button onClick={() => alert("no ongoing events right now check for upcoming events in home page")}>
          Join Events
        </button>

      </div>

      <div className="hero-right">

        <img
          src={images[current]}
          alt=""
        />

      </div>

    </section>
  );
}