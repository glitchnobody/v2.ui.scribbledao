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
      <div className={s.wallet_decor_container}>
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
        <WalletDecor />
      </div>
    </div>
  );
}

function WalletDecor() {
  return (
    <svg viewBox="0 0 312 217" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_i_437_268)">
        <path
          d="M275.403 0C281.606 0 279.745 17.9156 288.429 17.9157H303.085C308.009 17.9157 312 21.4574 312 25.8263V185.375C312 203.875 296 216.874 280.5 216.874H37C9.5 217.875 0 198.875 0 183.375L0 25.8263C0 21.4574 3.99106 17.9157 8.91428 17.9157H23.5706C32.2544 17.9156 30.3934 0 36.5962 0L275.403 0Z"
          fill="url(#paint0_linear_437_268)"
        />
      </g>
      <path
        d="M36.5957 1L275.403 1C276.352 1.00012 277.145 1.64529 277.938 3.24414C278.726 4.83084 279.315 6.95495 280.031 9.25488C280.726 11.4848 281.538 13.8603 282.776 15.6787C284.006 17.4845 285.721 18.83 288.188 18.9121L288.429 18.916H303.086C307.572 18.9162 311 22.1186 311 25.8262V185.375C311 203.262 295.51 215.874 280.5 215.874H36.9639C23.4704 216.365 14.5243 211.958 8.93652 205.649C3.3214 199.31 1 190.94 1 183.375L1 25.8262C1.00008 22.1186 4.42766 18.9161 8.91406 18.916H23.5703C26.1671 18.916 27.9545 17.5427 29.2236 15.6787C30.4617 13.8603 31.274 11.4847 31.9687 9.25488C32.6854 6.95487 33.2742 4.83084 34.0615 3.24414C34.8549 1.6454 35.6471 1.0002 36.5957 1Z"
        stroke="#3B3834"
        strokeWidth="2"
      />
      <g filter="url(#filter1_i_437_268)">
        <path
          d="M269.239 7.54395C275.123 7.54395 273.358 24.1354 281.595 24.1354H295.498C300.168 24.1354 303.954 27.4153 303.954 31.4613L303.954 158.642C303.954 196.875 303.954 207.875 264.285 207.875H47.5C8 207.875 8 196.875 8 158.642V31.4613C8 27.4153 11.7858 24.1354 16.4558 24.1354H30.3584C38.5956 24.1354 36.8303 7.54395 42.714 7.54395L269.239 7.54395Z"
          stroke="#F3F3F3"
          strokeDasharray="12 6"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_437_268"
          x="-12.6"
          y="-12.6"
          width="324.6"
          height="229.512"
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
            result="effect1_innerShadow_437_268"
          />
        </filter>
        <filter
          id="filter1_i_437_268"
          x="-5.1"
          y="-5.55606"
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
            result="effect1_innerShadow_437_268"
          />
        </filter>
        <linearGradient
          id="paint0_linear_437_268"
          x1="40.1145"
          y1="7.54345"
          x2="298.823"
          y2="186.055"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#242120" />
          <stop offset="1" stopColor="#0E0D0D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
