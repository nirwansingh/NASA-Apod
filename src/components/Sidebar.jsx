import React from "react";

const Sidebar = (props) => {
  const { handleToggleModal, data } = props;

  return (
    <div className="sidebar">
      <div onClick={handleToggleModal} className="bgOverLay"></div>
      <div className="sidebarContents">
        <h2>{data?.title}</h2>
        <div className="descriptionContainer">
          <p className="descriptionTitle">{data?.date}</p>
          <p>
            {data?.explanation}
          </p>
        </div>
        <button onClick={handleToggleModal}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
