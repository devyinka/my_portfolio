import { iconType } from "../types";
import {
  JavascriptSVG,
  TypescriptSVG,
  PostgreSQLSVG,
  ReactSVG,
  ReactnativeSVG,
  TailwindSVG,
  ExpressSVG,
  NextSVG,
  MongoDBSVG,
  PythonSVG,
  CplusplusSVG,
  FigmaSVG,
} from "../components/ui/icons";

let color: string = "#9ca3af";
export const techonologyIconList: iconType[] = [
  {
    name: "JavaScript",
    icon: <JavascriptSVG color={color} size={35} />,
  },

  {
    name: "TypeScript",
    icon: <TypescriptSVG color={color} size={35} />,
  },
  {
    name: "Python",
    icon: <PythonSVG color={color} size={35} />,
  },
  {
    name: "C++",
    icon: <CplusplusSVG color={color} size={35} />,
  },

  {
    name: "React",
    icon: <ReactSVG color={color} size={35} />,
  },
  {
    name: "Next.js",
    icon: <NextSVG color={color} size={35} />,
  },
  {
    name: "Tailwind",
    icon: <TailwindSVG color={color} size={35} />,
  },
  {
    name: "Figma",
    icon: <FigmaSVG color={color} size={35} />,
  },

  {
    name: "React Native",
    icon: <ReactnativeSVG color={color} size={35} />,
  },

  {
    name: "Express",
    icon: <ExpressSVG color={color} size={35} />,
  },
  {
    name: "MongoDB",
    icon: <MongoDBSVG color={color} size={35} />,
  },
  {
    name: "PostgreSQL",
    icon: <PostgreSQLSVG color={color} size={35} />,
  },
];
