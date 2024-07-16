interface AuthFormProps {
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthForm: React.FC<AuthFormProps> = ({ setChange }) => {
  return (
    <form className="flex flex-col justify-center w-full sm:w-[500px] p-[20px] bg-black border border-white gap-[20px]">
      <h2 className="text-white text-center text-[20px] sm:text-[32px]">
        Авторизация
      </h2>
      <input
        className="border-b bg-transparent px-[8px] py-[12px] text-white"
        type="mail"
        required
        placeholder="Email"
      />
      <input
        className="border-b bg-transparent px-[8px] py-[12px] text-white"
        type="password"
        required
        placeholder="Пароль"
      />
      <button
        onClick={() => setChange(true)}
        className="text-gray-500 text-right"
      >
        Забыли пароль?
      </button>
      <button
        className="w-full text-white py-[16px] px-[24px] border border-white rounded"
        type="submit"
      >
        Войти
      </button>
    </form>
  );
};
