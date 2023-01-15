import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Contacts } from "../../types/Contacts";
import { SortType } from "../../types/SortType";
import { Item } from "../Item";
import { Loader } from "../Loader";
import './ItemList.scss';


export const ItemList: React.FC = () => {
  const contacts: Contacts[] = useAppSelector(state => state.contacts);
  const sortType: SortType = useAppSelector(state => state.sortType);
  const sortDirection = useAppSelector(state => state.sortDirection);

  const sortContacts = () => {
    const sorted = contacts.sort((firstItem, nextItem) => {
      switch (sortType) {
        case SortType.NAME:
          return firstItem.name.localeCompare(nextItem.name);
        case SortType.LASTNAME:
          return firstItem.lastname.localeCompare(nextItem.lastname);
        case SortType.CITY:
          return firstItem.city.localeCompare(nextItem.city);
        case SortType.COUNTRY:
          return firstItem.country.localeCompare(nextItem.country);
        case SortType.COMPANY:
          return firstItem.companyid - nextItem.companyid;
        default:
          return 0;
      }
    })

    return sortDirection
    ? sorted
    : [...sorted].reverse();
  };

  return(
    <>
      <table className="table table-striped">
        <thead>
          <td>Name</td>
          <td>Lastname</td>
          <td>Adress</td>
          <td>City</td>
          <td>Country</td>
          <td>Email</td>
          <td>Number</td>
          <td>Company</td>
          <td>Edit</td>
          <td>Remove</td>
        </thead>
        <tbody>
          {sortContacts().map(item => (
            <Item
              key={item.id}
              contact={item} 
            />
          ))}
        </tbody>
      </table>
      {!contacts.length && <Loader />}
    </>
  )
}