import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/store/hooks';
import { register } from '../../../../features/auth/api/authThunk';
import { RegisterMutation } from '../../../../features/auth/model/authTypes';

export const RegisterPage = () => {
  const [state, setState] = useState<RegisterMutation>({
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

  const registerHandle = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      setState({
        email: '',
        password: '',
      });
      toast.success('Аккаунт успешно создан!');
      navigate('/admin');
    } catch (error) {
      console.log(error);
      toast.error('Что пошло не так!');
    }
  };

  return (
    <div className="h-svh flex justify-center items-center px-[10px]">
      <form
        onSubmit={registerHandle}
        className="flex flex-col justify-center w-full sm:w-[500px] p-[20px] bg-black border border-white gap-[20px]"
      >
        <h2 className="text-white text-center text-[20px] sm:text-[32px]">
          Регистрация
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
        <button
          className="w-full text-white py-[16px] px-[24px] border border-white rounded"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
