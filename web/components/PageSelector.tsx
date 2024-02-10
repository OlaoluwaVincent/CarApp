"use client";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "src/redux/features/product/product_slice";
import { AppDispatch, RootState } from "src/redux/store";

type Props = {};
const PageSelector = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.product);

  if (!data) {
    return null;
  }

  const { totalPages, page } = data;

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  function handleClick(value: number) {
    dispatch(getProducts({ page: String(value) }));
  }

  return (
    <div className="flex items-center gap-4 w-full justify-center">
      {pageNumbers.map((pageNumber) => (
        <button
        key={pageNumber}
          type="button"
          className={`${
            pageNumber == page ? "bg-info-600" : ""
          } px-3 py-2 rounded-sm border hover:bg-info-300`}
          onClick={() => handleClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default PageSelector;
