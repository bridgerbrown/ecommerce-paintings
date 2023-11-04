import React from "react";

export default function PageTitle({ title, apiFetchDuration }) {
  return (
    <div className="title-container">
      <h4 className="page-title">{title}</h4>
      {
        apiFetchDuration ?
        <h5 className="duration-subtitle">
        API data fetched in {apiFetchDuration} ms!
        </h5>
        :
        <span></span>
      }    
    </div>
  )
};
