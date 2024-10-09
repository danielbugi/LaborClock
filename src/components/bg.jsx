import Image from 'next/image';

function Bg({ display }) {
  return (
    <div
      className={`${display} w-full h-full top-0 left-0 z-[-40] bg-white opacity-75 dark:bg-gray-950`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xlinkHref="http://www.w3.org/1999/xlink"
        viewBox="0 0 800 450"
        opacity="0.6"
      >
        <defs>
          <filter
            id="bbblurry-filter"
            x="-100%"
            y="-100%"
            width="400%"
            height="400%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation="40"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              edgeMode="none"
              result="blur"
            ></feGaussianBlur>
          </filter>
        </defs>
        <g filter="url(#bbblurry-filter)">
          <ellipse
            rx="100"
            ry="100"
            cx="0"
            cy="272"
            fill="hsl(37, 99%, 67%)"
          ></ellipse>
          <ellipse
            rx="100"
            ry="100"
            cx="900"
            cy="100"
            fill="hsl(316, 73%, 52%)"
          ></ellipse>
          <ellipse
            rx="100"
            ry="100"
            cx="800"
            cy="290"
            fill="hsl(185, 100%, 57%)"
          ></ellipse>
        </g>
      </svg>
      <Image
        src="/bg/texture.png"
        alt="bg"
        layout="fill"
        objectFit="repeat"
        className="mix-blend-overlay w-full h-full dark:hidden"
      />
    </div>
  );
}
export default Bg;
