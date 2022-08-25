import React, { ButtonHTMLAttributes } from "react";
import * as S from "./style";

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLargeProps = {
  value: string;
} & ButtonType;

const ButtonLarge: React.FC<ButtonLargeProps> = ({ value, ...props }) => {
  return <S.ButtonLarge {...props}>{value}</S.ButtonLarge>;
};

export default ButtonLarge;
