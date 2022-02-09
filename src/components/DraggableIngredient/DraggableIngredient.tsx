import React, { useRef, FC } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from '../../services/hooks';

import { moveConstructorIngredients } from '../../services/actions/burgerConstructor';

type TDraggableIngredient = {
  index: number;
};

export const DraggableIngredient: FC<TDraggableIngredient> = ({ children, index }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'card',
    hover: (item: TDraggableIngredient, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      // индекс двигаемой карточки совпадает ли с индексом элемента над которым двигаемый находится
      if (dragIndex === hoverIndex) return;
      // нахожу размеры карточки над которой происходит hover
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // нахожу середину карточки над которой будет зависать двигаемая карточка
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // текущая позиция курсора мыши
      const clientOffset = monitor.getClientOffset();
      // расстояние от курсора до верхней границы карточки, над которой hover
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      // тянем сверху вниз
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      // тянем снизу вверх
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      // обновляю порядок элементов
      dispatch(moveConstructorIngredients(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: { index: index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: `${opacity}` }}>
      {children}
    </div>
  );
};

export default DraggableIngredient;
