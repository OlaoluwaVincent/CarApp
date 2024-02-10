"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { toggleShow } from "src/redux/features/sidenav/sidebar-slice";
import { getProducts } from "src/redux/features/product/product_slice";

const steeringType = ["Automatic", "Manual"];
const Menu = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const is_show = useSelector((state: RootState) => state.sidebar.show);
  const data = useSelector((state: RootState) => state.product.data);
  const dispatch: AppDispatch = useDispatch();
  const [type, setType] = useState<string>();

  const [steering, setSteering] = useState<string>();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (innerWidth >= 768) {
        dispatch(toggleShow("show"));
      } else {
        dispatch(toggleShow("hide"));
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, dispatch]);

  function handleFind({
    types,
    steerings,
  }: {
    types?: string;
    steerings?: string;
  }) {
    setType(types || type);
    setSteering(steerings || steering);
    dispatch(
      getProducts({ type: types || type, steering: steerings || steering })
    );
  }

  const sortedCategory = useMemo(() => {
    let d = data?.data?.slice();

    const uniqueCategories = Array.from(
      new Set(d?.map((item) => item.carType))
    );

    return uniqueCategories;
  }, [data]);

  return (
    <div
      className={`${
        is_show === "show" ? "block" : "hidden"
      } menu bg-white`}
    >
      <aside className="flex flex-col gap-2">
        <h4 className="flex items-center gap-5 text-xs text-black-300 uppercase">
          Car Type{" "}
          <span
            className="text-error-500 cursor-pointer text-lg "
            onClick={() => setType("")}
          >
            X
          </span>
        </h4>

        {sortedCategory.map((category, idx) => {
          return (
            <div className="flex gap-3 py-2" key={idx}>
              <input
                type="checkbox"
                className="w-5 h-5"
                name="carType"
                checked={type === category}
                onChange={() => handleFind({ types: category })}
              />
              <label htmlFor={category} className="">
                {category.toUpperCase()}
              </label>
            </div>
          );
        })}

        <h4 className="flex items-center gap-5 text-xs text-black-300 uppercase ">
          Steering{" "}
          <span
            className="text-error-500 cursor-pointer text-lg "
            onClick={() => setSteering("")}
          >
            X
          </span>
        </h4>
        {steeringType.map((steer, idx) => (
          <div className="flex gap-3 py-3" key={idx}>
            <input
              type="checkbox"
              className="w-5 h-5"
              id={idx.toString()}
              name="steering"
              checked={steering === steer}
              onChange={() => handleFind({ steerings: steer })}
            />
            <label htmlFor={idx.toString()} className="">
              {steer.toUpperCase()}
            </label>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default Menu;
