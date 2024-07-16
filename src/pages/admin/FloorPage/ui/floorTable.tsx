import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  selectTables,
  selectTablesLoading,
} from '../../../../features/tables/model/tableSlice';
import { useEffect } from 'react';
import { getTables } from '../../../../features/tables/api/tablesThunk';
import FloorTbody from './floorTbody';
import { TableAll } from '../../../../features/tables/model/table';
import Loading from '../../../../shared/ui/Loading';

const FloorTable = () => {
  const { id } = useParams();
  const table = useAppSelector<TableAll[]>(selectTables);
  const loading = useAppSelector(selectTablesLoading);
  const dispatch = useAppDispatch();
  const filterTable = table.filter((t) => t.floor.id === Number(id));

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-[30px] py-[18px] text-white">
      <h1 className="font-bold text-[24px] font-comfort">
        {filterTable[0]?.floor.title} - столы
      </h1>
      {filterTable.length > 0 ? (
        <div className="text-white font-medium mt-[30px] overflow-y-scroll max-h-[750px] bookScroll">
          <table className="table-auto w-full text-center">
            <thead className="border-b border-white bg-black sticky top-0">
              <tr>
                <th className="pb-[10px]">Столы</th>
                <th className="pb-[10px]">Редак-ть</th>
                <th className="pb-[10px]">Удалить</th>
              </tr>
            </thead>
            <tbody>
              {filterTable.map((item) => (
                <FloorTbody item={item} key={item.id} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h4 className="text-white text-center mt-60">Нету столов</h4>
      )}
    </div>
  );
};

export default FloorTable;
