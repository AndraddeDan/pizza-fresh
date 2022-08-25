import React, { ButtonHTMLAttributes } from 'react';
import * as S from "./style";

type ButtonType =  ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonToggleProps = {
  value: string;
  active?: boolean;
} & ButtonType;

const ButtonToggle: React.FC<ButtonToggleProps> = ({ value, active = false, ...props }) => {
  return (
    <S.ButtonToggle {...props} active={active}> {value} </S.ButtonToggle>
  );
}

export default ButtonToggle;
