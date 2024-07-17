import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  selectSubCategories,
  selectSubCategoriesLoading,
} from '../model/subCategorySlice';
import { deleteSubCategory, getSubCategories } from '../api/subCategoryThunk';
import { Link } from 'react-router-dom';
import { DotsSixVertical, Pen, Trash } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import Loading from '../../../../shared/ui/Loading';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import axios from 'axios';

export const SubCategoriesPage = () => {
  const subCategories = useAppSelector(selectSubCategories);
  const loading = useAppSelector(selectSubCategoriesLoading);
  const dispatch = useAppDispatch();

  const kitchen = subCategories.filter(
    (el) => el.parent_details?.name === 'Кухня',
  );
  const bar = subCategories.filter((el) => el.parent_details?.name === 'Бар');

  useEffect(() => {
    dispatch(getSubCategories());
  }, [dispatch]);

  const handleDeleteCategory = async (id: number) => {
    try {
      await dispatch(deleteSubCategory(id)).unwrap();
      await dispatch(getSubCategories()).unwrap();
      toast.success('Удалено!');
    } catch (error) {
      toast.error('Что-то пошло не так!');
    }
  };

  const handleOrderSubCategory = async (id: number, order: number) => {
    const data = [
      {
        id: id,
        order: order,
      },
    ];
    try {
      await axios.post(
        `https://backend.bono-bar.com/api/category/subcategories/order/`,
        data,
      );
    } catch (error) {
      toast.error('Ошибка при обновлении порядка!');
    }
  };

  const onDragEndKitchen = async (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(kitchen);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    try {
      await handleOrderSubCategory(movedItem.id, result.destination.index);
      await dispatch(getSubCategories()).unwrap();
    } catch (error) {
      toast.error('Ошибка при обновлении порядка!');
    }
  };

  const onDragEndBar = async (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(bar);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    try {
      await handleOrderSubCategory(movedItem.id, result.destination.index);
      await dispatch(getSubCategories()).unwrap();
    } catch (error) {
      toast.error('Ошибка при обновлении порядка!');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header className="flex items-center justify-between flex-wrap w-full h-[60px] bg-black px-[20px] mt-[10px]">
        <h1 className="text-white font-semibold">Под Категории</h1>
        <Link
          to="/admin/sub-category-submit"
          className="font-semibold text-white bg-[#6BC678] rounded-[8px] py-[10px] px-[15px]"
        >
          + Добавить
        </Link>
      </header>

      <section className="bg-black w-full min-h-[635px] py-[30px] px-[20px] text-white">
        <DragDropContext onDragEnd={onDragEndKitchen}>
          <h4 className="text-[17px] font-semibold">Кухня</h4>
          <Droppable droppableId="kitchen-droppable">
            {(provided, _snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {kitchen.length > 0 ? (
                  kitchen.map((subCategory, index) => (
                    <Draggable
                      key={subCategory.id}
                      draggableId={String(subCategory.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between my-[20px] flex-wrap"
                        >
                          <div className="flex items-center">
                            <div className="text-white ml-[15px] flex items-center">
                              <DotsSixVertical
                                className="opacity-[0.5]"
                                size={32}
                              />
                              <div className="flex flex-col gap-x-3">
                                <h4>Категории: Кухня</h4>
                                <p>Название: {subCategory.name}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-x-3">
                            <Link
                              className="text-white bg-red-500 py-[5px] px-[10px] rounded-[5px]"
                              to={`/admin/sub-category-submit/${subCategory.id}`}
                            >
                              <Pen size={24} />
                            </Link>
                            <button
                              onClick={() =>
                                handleDeleteCategory(subCategory.id)
                              }
                              className="text-white bg-red-500 py-[5px] px-[10px] rounded-[5px]"
                            >
                              <Trash size={20} />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p className="text-white">Пусто</p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <DragDropContext onDragEnd={onDragEndBar}>
          <h4 className="text-[17px] font-semibold border-white border-t-2 pt-[20px]">
            Бар
          </h4>
          <Droppable droppableId="bar-droppable">
            {(provided, _snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {bar.length > 0 ? (
                  bar.map((subCategory, index) => (
                    <Draggable
                      key={subCategory.id}
                      draggableId={String(subCategory.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between my-[20px] flex-wrap"
                        >
                          <div className="flex items-center">
                            <div className="text-white ml-[15px] flex items-center">
                              <DotsSixVertical
                                className="opacity-[0.5]"
                                size={32}
                              />
                              <div className="flex flex-col gap-x-3">
                                <h4>Категории: Бар</h4>
                                <p>Название: {subCategory.name}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-x-3">
                            <Link
                              className="text-white bg-red-500 py-[5px] px-[10px] rounded-[5px]"
                              to={`/admin/sub-category-submit/${subCategory.id}`}
                            >
                              <Pen size={24} />
                            </Link>
                            <button
                              onClick={() =>
                                handleDeleteCategory(subCategory.id)
                              }
                              className="text-white bg-red-500 py-[5px] px-[10px] rounded-[5px]"
                            >
                              <Trash size={20} />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p className="text-white">Пусто</p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </>
  );
};
