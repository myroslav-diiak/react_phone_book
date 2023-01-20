import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions as selectedStaffActions } from "../../features/selectedStaff";
import { Contacts } from "../../types/Contacts";
import { StaffItem } from "../StaffItem";
import './StaffList.scss';

export const StaffList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedStaff = useAppSelector(state => state.selectedStaff)
  const contacts = useAppSelector(state => state.contacts);

  const staff: Contacts[] = contacts.filter(contact => contact.companyid === selectedStaff);

  const handleCloseButton = () => {
    dispatch(selectedStaffActions.removeStaff());
  }

  return (
      <div className="staff-background" >
        {staff.length
        ? (<>
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={handleCloseButton}
            >
              x
            </button>
            <div className="accordion" id="accordionPanelsStayOpenExample">
              {staff.map(item => (
                <StaffItem key={item.id} contact={item} />
              ))}
            </div>
          </>
        )
        : (
            <div className="alert alert-warning">
              <span>No staff in selected company</span>
              <button 
                type="button" 
                className="btn btn-outline-danger staff-button"
                onClick={handleCloseButton}
              >
                x
              </button>
            </div>
        )
      }
    </div>
  );
}