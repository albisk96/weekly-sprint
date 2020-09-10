import React from "react";
import Item from "./item.component";

const ItemList = ({ items }) => {

  return (
    <div>
      {items.length ? (
        <ul className="list">
          {items.map((item, key) => (
            <div key={key}>
              <Item item={item}/>
            </div>
          ))}
        </ul>
      ) : (
        <div className="no-tasks">No Tasks</div>
      )}
    </div>
  );
};

export default ItemList;