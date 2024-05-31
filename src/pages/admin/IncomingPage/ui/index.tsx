import { guests } from '../config/constants';

export const AdminIncomingPage = () => {
  return (
    <section className="flex h-svh">
      <div className="w-full h-full bg-black">
        <div className="bg-black p-[16px] flex items-center">
          <h1 className="font-semibold text-[17px] text-white">Admin - BONO</h1>
        </div>
        <div className="text-white font-medium p-[16px]">
          <h5 className="">Гости</h5>
          <ul className="p-[10px] max-w-[770px]">
            {guests.map((guest) => (
              <li
                className="flex justify-between border-b-[1px] border-white"
                key={guest.id}
              >
                <p>{guest.id}</p>
                <p>{guest.name}</p>
                <p>{guest.phone}</p>
                <p>{guest.time}</p>
                <p>{guest.table}</p>
                <button type="button">DEL</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
