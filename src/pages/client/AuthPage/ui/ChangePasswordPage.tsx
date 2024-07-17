import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/store/hooks';
import {
  changeCrmPassword,
  changePassword,
} from '../../../../features/auth/api/authThunk';

export const ChangePasswordPage = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const [searchParams, _setSearchParams] = useSearchParams();
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
      if (searchParams.get('type') === 'admin') {
        await dispatch(changePassword(state)).unwrap();
      } else {
        await dispatch(changeCrmPassword(state)).unwrap();
      }
      setState({
        email: '',
        password: '',
      });
      toast.success('Пароль успешно обновлен!');
      navigate('/authorization');
    } catch (error) {
      console.log(error);
      toast.error('Что пошло не так!');
    }
  };

  return (
    <div className="h-svh flex justify-center items-center px-[10px]">
      <form
        onSubmit={loginHandle}
        className="flex flex-col justify-center w-full sm:w-[500px] p-[20px] bg-black border border-white gap-[20px]"
      >
        <h2 className="text-white text-center text-[20px] sm:text-[32px]">
          {searchParams.get('type') ? 'Изменения пароля' : 'Авторизация'}
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
          Изменить
        </button>
      </form>
    </div>
  );
};
