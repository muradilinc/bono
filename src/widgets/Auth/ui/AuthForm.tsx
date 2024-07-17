import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../../app/store/hooks';
import { login, loginCrm } from '../../../features/auth/api/authThunk';
import { LoginMutation } from '../../../features/auth/model/authTypes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  crm: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthForm: React.FC<AuthFormProps> = ({ crm, setChange }) => {
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeFields = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginHandle = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (crm) {
        await dispatch(loginCrm(state)).unwrap();
      } else {
        await dispatch(login(state)).unwrap();
      }
      setState({
        email: '',
        password: '',
      });
      toast.success('Добро пожаловать!');
      navigate(crm ? '/schedule' : '/admin');
    } catch (error) {
      console.log(error);
      toast.error('Что пошло не так!');
    }
  };

  return (
    <form
      onSubmit={loginHandle}
      className="flex flex-col justify-center w-full sm:w-[500px] p-[20px] bg-black border border-white gap-[20px]"
    >
      <h2 className="text-white text-center text-[20px] sm:text-[32px]">
        Авторизация
      </h2>
      <input
        className="border-b bg-transparent px-[8px] py-[12px] text-white"
        type="mail"
        name="email"
        value={state.email}
        onChange={changeFields}
        required
        placeholder="Email"
      />
      <input
        className="border-b bg-transparent px-[8px] py-[12px] text-white"
        type="password"
        name="password"
        value={state.password}
        onChange={changeFields}
        required
        placeholder="Пароль"
      />
      {crm ? null : (
        <button
          onClick={() => setChange(true)}
          className="text-gray-500 text-right"
          type="button"
        >
          Забыли пароль?
        </button>
      )}
      <button
        className="w-full text-white py-[16px] px-[24px] border border-white rounded"
        type="submit"
      >
        Войти
      </button>
      {/*<Link*/}
      {/*  to="/register"*/}
      {/*  className="w-full text-white text-center py-[16px] px-[24px] border border-white rounded"*/}
      {/*>*/}
      {/*  Зарегистрироваться*/}
      {/*</Link>*/}
    </form>
  );
};
