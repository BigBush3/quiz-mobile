import Svg, {
  Circle,
  Defs,
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
      <Path transform="translate(0 .5)" fill="#fff" d="M0 0H17V30H0z" />
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
          <Stop stopColor="#9192FC" />
          <Stop offset={1} stopColor="#5C5CDE" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_2001_1119"
          x1={7.89412}
          y1={28.5}
          x2={7.89412}
          y2={24.6111}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9192FC" />
          <Stop offset={1} stopColor="#5C5CDE" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
