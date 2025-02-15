import Svg, {
  Circle, ClipPath,
  Defs, G,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from "react-native-svg";

export const LoaderIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 4C11.163 4 4 11.163 4 20a2 2 0 11-4 0C0 8.954 8.954 0 20 0s20 8.954 20 20a2 2 0 11-4 0c0-8.837-7.163-16-16-16z"
        fill="#9192FC"
      />
    </Svg>
  );
};

export const QuestionIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={17} height={31} viewBox="0 0 17 31" fill="none" {...props}>
      <Path transform="translate(0 .5)" fill="#fff" d="M0 0H17V30H0z"/>
      <Path
        clipRule="evenodd"
        d="M8.5 6.5A3.5 3.5 0 005 10a2 2 0 11-4 0 7.5 7.5 0 1115 0c0 2.28-1.221 3.826-2.336 4.828-.546.49-1.117.896-1.548 1.202l-.007.005c-.495.352-.726.523-.85.646l-.027.028-.03.027a3.486 3.486 0 00-1.125 2.572 2 2 0 11-4 0c0-2.165.92-4.118 2.384-5.485.384-.377.88-.728 1.25-.99l.08-.057c.448-.32.844-.605 1.2-.924C11.683 11.23 12 10.68 12 10a3.5 3.5 0 00-3.5-3.5z"
        stroke="url(#paint0_linear_2001_1119)"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle
        cx={8}
        cy={26.5}
        r={2}
        stroke="url(#paint1_linear_2001_1119)"
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2001_1119"
          x1={8.10294}
          y1={21.3077}
          x2={8.10297}
          y2={3.02244}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9192FC"/>
          <Stop offset={1} stopColor="#5C5CDE"/>
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_2001_1119"
          x1={7.89412}
          y1={28.5}
          x2={7.89412}
          y2={24.6111}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9192FC"/>
          <Stop offset={1} stopColor="#5C5CDE"/>
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export const ProfileIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg
      width={26}
      height={25}
      viewBox="0 0 26 25"
      fill="none"
      {...props}
    >
      <Path
        d="M21.612 23.889a8.889 8.889 0 00-17.778 0"
        stroke="#ACACAC"
        strokeLinecap="round"
      />
      <Circle cx={13.2771} cy={6.66665} r={5.61111} stroke="#ACACAC"/>
    </Svg>
  )
}

export const InfoIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg
      width={26}
      height={25}
      viewBox="0 0 26 25"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_2516_232)" stroke="#ACACAC">
        <Path
          d="M12.801 19.453c-.667 0-1.208-.54-1.208-1.208V10.41c0-.667.54-1.208 1.208-1.208v0c.667 0 1.208.541 1.208 1.208v7.835c0 .667-.54 1.208-1.208 1.208v0zm.007-11.706a1.41 1.41 0 01-.988-.38 1.226 1.226 0 01-.414-.928c0-.365.138-.674.414-.927.276-.258.605-.387.988-.387.387 0 .716.129.987.387.276.253.414.562.414.927 0 .36-.138.67-.414.928-.271.253-.6.38-.987.38z"/>
        <Circle cx={13} cy={12.5} r={12}/>
      </G>
      <Defs>
        <ClipPath id="clip0_2516_232">
          <Path fill="#fff" d="M0 0H26V25H0z"/>
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export const LogoutIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg
      width={26}
      height={25}
      viewBox="0 0 26 25"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_1_1910)" stroke="#ACACAC" strokeLinecap="round">
        <Path d="M11.333 24.167h9.166A4.167 4.167 0 0024.666 20V5A4.167 4.167 0 0020.499.833h-9.166M1.69 12.5h15"/>
        <Path d="M5.633 8.26l-4.3 4.3 4.3 4.299" strokeLinejoin="round"/>
      </G>
      <Defs>
        <ClipPath id="clip0_1_1910">
          <Path fill="#fff" transform="translate(.5)" d="M0 0H25V25H0z"/>
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export const HomeIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg
      width={25}
      height={26}
      viewBox="0 0 25 26"
      fill="none"
      {...props}
    >
      <Path
        d="M4.583 10.083v12.084h5.625V15.5h4.583v6.667h5.625V10.5"
        stroke="#fff"
        strokeLinejoin="round"
      />
      <Path
        d="M22.5 12.166l-10.345-9.31-9.655 9.31"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const RightIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg
      width={14}
      height={25}
      viewBox="0 0 14 25"
      fill="none"
      {...props}
    >
      <Path
        d="M1.313 1.186L12.627 12.5 1.313 23.814"
        stroke="#CCC"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
