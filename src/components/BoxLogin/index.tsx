import ButtonLarge from "components/ButtonLarge";
import React, { HTMLAttributes, useState } from "react";
import logo from 'assets/imgs/logo.png';
import * as S from "./style";
import { Login } from "types/api/login";

type BoxLoginType =  HTMLAttributes<HTMLDivElement>

export type BoxLoginProps = {
  onSubmitData: (data: Login) => void
  errorMessage: string
} & BoxLoginType;

const BoxLogin: React.FC<BoxLoginProps> = ({ onSubmitData, errorMessage }: BoxLoginProps) => {
	const [nickname, setNickname] = useState('')
	const [password, setPassword] = useState('')

  const handleSubmit = (): void => {
	  const data: Login = { nickname, password }
	  onSubmitData(data)
  }

  return (
    <S.BoxLogin>
		<S.BoxLoginLogo>
			<S.BoxLoginLogoText>
				<span>Pizza</span>
				<span>Fresh</span>
			</S.BoxLoginLogoText>
			<S.BoxLoginLogoImage src={logo} alt="Logo"  />
		</S.BoxLoginLogo>
		<S.BoxLoginForm>
			<input type="text" placeholder="Nickname" value={nickname} onChange={({ target }) => setNickname(target.value)} />
			<input type="password" placeholder="Senha" value={password} onChange={({ target }) => setPassword(target.value)} />
			<ButtonLarge value="Entrar" type="button" onClick={handleSubmit} />
		</S.BoxLoginForm>

		{ Boolean(errorMessage.length) && <S.BoxLoginError>{errorMessage}</S.BoxLoginError> }
    </S.BoxLogin>
  );
};

export default BoxLogin;
