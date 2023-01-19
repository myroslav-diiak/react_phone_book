import React from "react";
import "./Header.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions as selectedContactActions } from '../../features/selectedContact';
import { actions as isCompanyEdittingActions } from '../../features/isCompanyEditting';
import { actions as sortTypeActions } from '../../features/sortType';
import { actions as sortDirectionActions } from '../../features/sortDirection';
import { actions as listContentActions } from '../../features/listContent';
import { SortType } from "../../types/SortType";
import { ListContent } from "../../types/ListContent";

export const Header: React.FC = () => {
  const sotrTypes = ['None', 'Name', 'Lastname', 'City', 'Country', 'Company'];
  const dispatch = useAppDispatch();
  const currentSortType: SortType = useAppSelector(state => state.sortType);
  const currentSortDirection = useAppSelector(state => state.sortDirection);
  const currentListContent = useAppSelector(state => state.listContent);

  const addButtonHandler = () => {
    dispatch(selectedContactActions.setContact(0));
  }

  const editCompanyHandler = () => {
    dispatch(isCompanyEdittingActions.setIsEdittingCompany(true));
  }

  const sortDirectionHandler = () => {
    dispatch(sortDirectionActions.setSortDirection(!currentSortDirection))
  }

  const selectHandler = (sortType: string) => {
    switch (sortType) {
      case 'Name':
        dispatch(sortTypeActions.setSortType(SortType.NAME));
        break;
      case 'Lastname':
        dispatch(sortTypeActions.setSortType(SortType.LASTNAME));
        break;
      case 'City':
        dispatch(sortTypeActions.setSortType(SortType.CITY));
        break;
      case 'Country':
        dispatch(sortTypeActions.setSortType(SortType.COUNTRY));
        break;
      case 'Company':
        dispatch(sortTypeActions.setSortType(SortType.COMPANY));
        break;
      default:
        dispatch(sortTypeActions.setSortType(SortType.NONE));
    }
  }

  const listContentRadioHandler = (listContent: ListContent) => {
    dispatch(listContentActions.setListContent(listContent));
  }

  return (
    <header>
      <button 
        type="button" 
        className="btn btn-success"
        onClick={() => addButtonHandler()}
      >
        Add Contact
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => editCompanyHandler()}
      >
        Add company
      </button>

      Sort by:
      <select 
        className="form-select select sort-type-select"
        value={currentSortType}
        onChange={(event) => selectHandler(event.target.value)}
      >
      {sotrTypes.map(item => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
    <input
      type="checkbox"
      className="btn-check"
      id="btn-check"
      autoComplete="off"
      onChange={() => sortDirectionHandler()}
      checked={currentSortDirection}
    />
    <label className="btn btn-primary" htmlFor="btn-check">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-expand" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8ZM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2ZM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10Z"/>
      </svg>
      {currentSortDirection ? 'Asc': 'Desc'}
    </label>

    <br />

    <input 
      type="radio" 
      className="btn-check" 
      name="options-outlined" 
      id="list-content-contacts" 
      autoComplete="off"
      checked={currentListContent === 'contacts'}
      onChange={() => listContentRadioHandler('contacts')}
    />
    <label className="btn btn-outline-primary" htmlFor="list-content-contacts">Contacts</label>

    <input 
      type="radio" 
      className="btn-check" 
      name="options-outlined" 
      id="list-content-companies" 
      autoComplete="off"
      checked={currentListContent === 'companies'}
      onChange={() => listContentRadioHandler('companies')}
    />
    <label className="btn btn-outline-primary" htmlFor="list-content-companies">Companies</label>
    </header>
  );
};
