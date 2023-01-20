import React, { useState } from "react";
import { Contacts } from "../../types/Contacts";
import cn from 'classnames';

type Props = {
  contact: Contacts;
}

export const StaffItem: React.FC<Props> = ({ contact }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { id, name, lastname, adress, city, country, email, number } = contact;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
        <button
          className={cn('accordion-button', { collapsed: !isOpened })}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseOne"
          aria-expanded={isOpened}
          aria-controls="panelsStayOpen-collapseOne"
          onClick={() => setIsOpened(!isOpened)}
        >
          {`#${id} ${name} ${lastname}`}
        </button>
      </h2>
      <div id="panelsStayOpen-collapseOne" className={cn('accordion-collapse collapse', {'show': isOpened})} aria-labelledby="panelsStayOpen-headingOne">
        <div className="accordion-body">
        <ul className="list-group">
          <li className="list-group-item">{`${name} ${lastname}`}</li>
          <li className="list-group-item">{`Adress: ${adress}`}</li>
          <li className="list-group-item">{`Country, city: ${country}, ${city}`}</li>
          <li className="list-group-item">{`Email: ${email}`}</li>
          <li className="list-group-item">{`Number: ${number}`}</li>
        </ul>
        </div>
      </div>
    </div>
  );
}