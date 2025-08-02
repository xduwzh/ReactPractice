import classNames from "classnames";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveIndex } from "../../store/modules/takeaway";

const Menu = () => {
  const { foodsList, activeIndex } = useSelector((state) => state.foods);
  const dispatch = useDispatch();
  if (!foodsList || foodsList.length === 0) return null; // 防止 map 报错

  const menus = foodsList.map((item) => ({ tag: item.tag, name: item.name }));

  return (
    <nav className="list-menu">
      {menus.map((item, index) => {
        return (
          <div
            onClick={() => dispatch(changeActiveIndex(index))}
            key={item.tag}
            className={classNames(
              "list-menu-item",
              activeIndex === index && "active"
            )}
          >
            {item.name}
          </div>
        );
      })}
    </nav>
  );
};

export default Menu;
