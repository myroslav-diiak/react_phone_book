import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Contacts } from "../../types/Contacts";
import { Item } from "../Item";
import { Loader } from "../Loader";
import './ItemList.scss';


export const ItemList: React.FC = () => {
  const contacts: Contacts[] = useAppSelector(state => state.contacts);

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
          {contacts.map(item => (
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