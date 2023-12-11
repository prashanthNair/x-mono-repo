import Card from './Card';
import { LayoutData } from '../../utils/constant';
import { LayoutList } from '../../utils/prelemTypes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';

const CardList = ({
  layoutList,
  handleLayoutFilter,
  searchValue,
  categoryState,
}: LayoutList) => {
  const navigate = useNavigate();
  const maxLimit = 4;
  const [limit, setLimit] = useState(maxLimit);
  const [index, setIndex] = useState({ prevIndex: 0, nextIndex: limit });

  const getPreviousLayouts = () => {
    setIndex((prevState) => {
      return {
        prevIndex: prevState.prevIndex - limit,
        nextIndex: prevState.nextIndex - limit,
      };
    });
  };
  const getNextLayouts = () => {
    setIndex((prevState) => {
      return {
        prevIndex: prevState.prevIndex + limit,
        nextIndex: prevState.nextIndex + limit,
      };
    });
  };

  return (
    <>
      {layoutList.map((layout, key) => {
        return (
          <Card
            key={key}
            layout={layout}
            handleLayoutFilter={handleLayoutFilter}
          />
        );
      })}
    </>
  );
};

export default CardList;
