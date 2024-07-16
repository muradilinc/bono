import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../../app/store/hooks';
import { sendEmail } from '../../../features/auth/api/authThunk';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ResetPass: React.FC<AuthFormProps> = ({ setChange }) => {
  const [state, setState] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sendCodeHandle = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(sendEmail(state)).unwrap();
      setState('');
      toast.success('На почту отправлен код!');
      navigate('/check-code');
    } catch (error) {
      toast.error('Что то пошло не так!');
      console.log(error);
    }
  };

  return (
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
      <button
        onClick={() => setChange(false)}
        className="w-full text-white py-[16px] px-[24px] border border-white rounded"
      >
        Назад
      </button>
    </form>
  );
};
