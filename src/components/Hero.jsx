import "../styles/hero.css";

import { useEffect, useState } from "react";

const images = [

  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",

  "https://images.unsplash.com/photo-1562774053-701939374585",

  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",

  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
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

        <button>
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

