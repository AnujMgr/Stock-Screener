const SunIcon = ({ height, width, color, customClass }) => {
  return (
    <svg
      className={customClass}
      xmlns="http://www.w3.org/2000/svg"
      height={height ? `${height}` : '24'}
      width={width ? `${width}` : '24'}
      fill={width ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
    >
      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
    </svg>
  );
};

const MoonIcon = ({ height, width, color, customClass }) => {
  return (
    <svg
      className={customClass}
      xmlns="http://www.w3.org/2000/svg"
      height={height ? `${height}` : '24'}
      width={width ? `${width}` : '24'}
      fill={width ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
    >
      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
    </svg>
  );
};

const SortUp = ({ height, width, color, customClass }) => {
  return (
    <svg
      className={customClass}
      xmlns="http://www.w3.org/2000/svg"
      height={height ? `${height}` : '24'}
      width={width ? `${width}` : '24'}
      fill={width ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
    >
      <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
    </svg>
  );
};

const SortDown = ({ height, width, color, customClass }) => {
  return (
    <svg
      className={customClass}
      xmlns="http://www.w3.org/2000/svg"
      height={height ? `${height}` : '24'}
      width={width ? `${width}` : '24'}
      fill={width ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
    >
      <path d=" M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
    </svg>
  );
};

const PlusIcon = ({ height, width, color, customClass }) => {
  return (
    <svg
      className={customClass}
      xmlns="http://www.w3.org/2000/svg"
      height={height ? `${height}` : '24'}
      width={width ? `${width}` : '24'}
      // fill={width ? `${color}` : "currentColor"}
      viewBox="0 0 16 16"
    >
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
    </svg>
  );
};

const MinusIcon = ({ height, width, color, customClass }) => {
  return (
    <svg
      className={customClass}
      xmlns="http://www.w3.org/2000/svg"
      height={height ? `${height}` : '24'}
      width={width ? `${width}` : '24'}
      fill={width ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
    >
      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
    </svg>
  );
};

const InfoIcon = ({ height, width, color, customClass }) => {
  return (
    <svg
      className={customClass}
      xmlns="http://www.w3.org/2000/svg"
      height={height ? `${height}` : '24'}
      width={width ? `${width}` : '24'}
      fill={width ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
    </svg>
  );
};

const OpenEye = ({ height, width, color, customClass }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg>
  );
};

const CloseEye = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
    </svg>
  );
};

const SearchIcon = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 24 24"
      className={customClass}
    >
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
    </svg>
  );
};

const CloseIcon = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path
        fillRule="evenodd"
        d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
      />
      <path
        fillRule="evenodd"
        d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
      />
    </svg>
  );
};

const HamburgerIcon = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path
        fillRule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  );
};

const CaretUpIcon = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
    </svg>
  );
};

const CaretDownIcon = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>
  );
};

const ProfileIcon = ({ height, width, color, customClass }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
    </svg>
  );
};

const FacebookIcon = ({ height, width, color, customClass }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
    </svg>
  );
};

const InstagramIcon = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
    </svg>
  );
};

const TwitterIcon = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
    </svg>
  );
};

const LogoutIcon = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path
        fillRule="evenodd"
        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
      />
      <path
        fillRule="evenodd"
        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
      />
    </svg>
  );
};

const Briefcase = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
      <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z" />{' '}
    </svg>
  );
};

const BookMarkIcon = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
    </svg>
  );
};

const BookMarkFillIcon = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z" />
      <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z" />
    </svg>
  );
};

const CameraIcon = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : '24'}
      width={width !== null ? `${width}` : '24'}
      fill={color !== null ? `${color}` : 'currentColor'}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />{' '}
    </svg>
  );
};

export {
  MoonIcon,
  SunIcon,
  SortDown,
  SortUp,
  PlusIcon,
  MinusIcon,
  InfoIcon,
  CloseEye,
  OpenEye,
  SearchIcon,
  CloseIcon,
  HamburgerIcon,
  CaretUpIcon,
  CaretDownIcon,
  FacebookIcon,
  ProfileIcon,
  InstagramIcon,
  LogoutIcon,
  TwitterIcon,
  Briefcase,
  BookMarkIcon,
  BookMarkFillIcon,
  CameraIcon,
};
