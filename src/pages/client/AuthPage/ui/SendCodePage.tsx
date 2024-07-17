import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/store/hooks';
import {
  sendCrmEmail,
  sendEmail,
} from '../../../../features/auth/api/authThunk';

export const SendCodePage = () => {
  const [state, setState] = useState('');
  const [searchParams, _] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(searchParams.get('type'));

  const sendCodeHandle = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (searchParams.get('type') === 'admin') {
        await dispatch(sendEmail(state)).unwrap();
      } else {
        await dispatch(sendCrmEmail(state)).unwrap();
      }
      setState('');
      toast.success('На почту отправлен код!');
      navigate(`/check-code?type=${searchParams.get('type')}`);
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
          Изменения пароля
        </h2>
        <input
          className="border-b bg-transparent px-[8px] py-[12px] text-white"
          type="email"
          value={state}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setState(event.target.value)
          }
          required
          placeholder="Email"
        />
        <button
          className="w-full text-white py-[16px] px-[24px] border border-white rounded"
          type="submit"
        >
          Отправить код
        </button>
        <button className="w-full text-white py-[16px] px-[24px] border border-white rounded">
          Назад
        </button>
      </form>
    </div>
  );
};
