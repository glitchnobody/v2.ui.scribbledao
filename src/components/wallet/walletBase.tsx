import React from "react";
import s from "./wallet.module.css";

export default function WalletBase() {
  return (
    <div className={s.wallet_container}>
      <div className={s.wallet_cards}>
        <div className={s.wallet_green_card}></div>
        <div className={s.wallet_white_card_container}>
          <div className={`${s.wallet_white_card}`}></div>
          <div className={s.backdrop} />
        </div>
      </div>
      <div className={s.wallet_filler}></div>
      <div className={s.wallet_decor_info_container}>
        <div className={s.wallet_info_container}>
          <div className={s.assets_tag_container}>
            <div className={s.assets_tag}>All Assets</div>
          </div>
          <div className={s.wallet_balance_container}>
            <div className={s.wallet_balance_title}>Scribble Wallet</div>
            <div className={s.wallet_balance_value}>$20,00.00</div>
            <div className={s.wallet_label}>Total Balance</div>
          </div>
        </div>
        <div className={s.wallet_decor_container}>
          <WalletDecor />
        </div>
      </div>
    </div>
  );
}

function WalletDecor() {
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      viewBox="0 0 312 217"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_628_997)">
        <path
          d="M275.403 0C281.606 0 279.745 17.926 288.429 17.9261H303.085C308.009 17.9261 312 21.4699 312 25.8413L311.999 176C314 193.5 307.5 215 281.5 217H34.5C10 217.5 -0.000122071 199 -0.00012207 184L-0.00012207 25.8413C-0.00012207 21.4699 3.99094 17.9261 8.91416 17.9261H23.5705C32.2543 17.926 30.3933 0 36.596 0L275.403 0Z"
          fill="url(#paint0_linear_628_997)"
        />
      </g>
      <path
        d="M36.5956 1L275.403 1C276.352 1.00012 277.145 1.64506 277.938 3.24512C278.726 4.83293 279.314 6.95925 280.031 9.26074C280.726 11.4917 281.537 13.8683 282.775 15.6875C284.005 17.4942 285.721 18.8397 288.188 18.9219L288.429 18.9258H303.086C307.572 18.926 311 22.1312 311 25.8418L310.999 176V176.057L311.006 176.113C311.99 184.72 310.871 194.233 306.39 201.803C301.943 209.314 294.128 215.017 281.455 216H34.4794C22.5122 216.244 14.1774 211.86 8.81921 205.659C3.43596 199.429 0.999878 191.296 0.999878 184L0.999878 25.8418C0.999878 22.1311 4.42806 18.9259 8.91394 18.9258H23.5702C26.1672 18.9258 27.9545 17.5524 29.2235 15.6875C30.4615 13.8682 31.2738 11.4919 31.9686 9.26074C32.6853 6.95925 33.2739 4.83293 34.0614 3.24512C34.8549 1.64535 35.6474 1.00021 36.5956 1Z"
        stroke="#6C6660"
        strokeWidth="2"
      />
      <g filter="url(#filter1_i_628_997)">
        <path
          d="M269.239 7.66992C275.123 7.66992 273.358 24.2613 281.595 24.2614H295.498C300.168 24.2614 303.954 27.5413 303.954 31.5873L303.954 158.768C303.954 197.001 303.954 208.001 264.285 208.001H47.5C8 208.001 8 197.001 8 158.768V31.5873C8 27.5413 11.7858 24.2614 16.4558 24.2614H30.3584C38.5956 24.2613 36.8303 7.66992 42.714 7.66992L269.239 7.66992Z"
          stroke="#F3F3F3"
          strokeDasharray="12 6"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_628_997"
          x="-12.6001"
          y="-12.6"
          width="324.936"
          height="229.61"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-31" dy="-21" />
          <feGaussianBlur stdDeviation="6.3" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_628_997"
          />
        </filter>
        <filter
          id="filter1_i_628_997"
          x="-5.1"
          y="-5.43008"
          width="309.554"
          height="213.931"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-31" dy="-21" />
          <feGaussianBlur stdDeviation="6.3" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_628_997"
          />
        </filter>
        <linearGradient
          id="paint0_linear_628_997"
          x1="40.1146"
          y1="7.54778"
          x2="298.92"
          y2="186.022"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#242120" />
          <stop offset="1" stopColor="#0E0D0D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
