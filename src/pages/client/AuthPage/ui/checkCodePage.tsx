import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../../app/store/hooks';
import { sendOtp } from '../../../../features/auth/api/authThunk';
import { useNavigate } from 'react-router-dom';

export const CheckCodePage = () => {
  const [state, setState] = useState({
    email: '',
    otp: '',
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

  const sendCodeHandle = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(sendOtp(state)).unwrap();
      setState({
        email: '',
        otp: '',
      });
      toast.success('Код действителен!');
      navigate('/change-password');
    } catch (error) {
      toast.error('Что то пошло не так!');
      console.log(error);
    }
  };

  return (
    <div className="h-svh flex justify-center items-center px-[10px]">
      <form
        onSubmit={sendCodeHandle}
        className="flex flex-col justify-center w-full sm:w-[500px] p-[20px] bg-black border border-white gap-[20px]"
      >
        <h2 className="text-white text-center text-[20px] sm:text-[32px]">
          Восстановление пароля
        </h2>
        <input
          className="border-b bg-transparent px-[8px] py-[12px] text-white"
          type="email"
          value={state.email}
          name="email"
          onChange={changeFields}
          required
          placeholder="Email"
        />
        <input
          className="border-b bg-transparent px-[8px] py-[12px] text-white"
          value={state.otp}
          name="otp"
          onChange={changeFields}
          required
          placeholder="Code"
        />
        <button
          className="w-full text-white py-[16px] px-[24px] border border-white rounded"
          type="submit"
        >
          Проверить код
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full text-white py-[16px] px-[24px] border border-white rounded"
        >
          Назад
        </button>
      </form>
    </div>
  );
};
