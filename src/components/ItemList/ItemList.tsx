import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Companies } from "../../types/Companies";
import { Contacts } from "../../types/Contacts";
import { ListContent } from "../../types/ListContent";
import { SortType } from "../../types/SortType";
import { Item } from "../Item";
import { Loader } from "../Loader";
import { StaffList } from "../StaffList";
import './ItemList.scss';


export const ItemList: React.FC = () => {
  const contacts: Contacts[] = useAppSelector(state => state.contacts);
  const companies: Companies[] = useAppSelector(state => state.companies);
  const sortType: SortType = useAppSelector(state => state.sortType);
  const sortDirection = useAppSelector(state => state.sortDirection);
  const isLoading = useAppSelector(state => state.isLoading);
  const listContent: ListContent = useAppSelector(state => state.listContent);
  const selectedStaff = useAppSelector(state => state.selectedStaff);

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

  return listContent === 'contacts'
    ? ( 
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
        {isLoading && <Loader />}
      </>
    )
    : (<>
        <table className="table table-striped">
          <thead>
            <td>Logo</td>
            <td>Company</td>
            <td>Staff</td>
            <td>Edit</td>
            <td>Remove</td>
          </thead>
          <tbody>
            {companies.map(item => (
              <Item
                key={item.id}
                company={item}
              />
            ))}
          </tbody>
        </table>
        {selectedStaff && <StaffList />}
      </>
    )}