import React, { useState } from "react";
import EditAdminModal from "../EditAdminData/EditAdminModal";
import AddLeaveModal from "../AddLeaveModal/AddLeaveModal";
import sty from "./TimeScheduleModal.module.css";
const TimeScheduleModal = ({
  closeEditModal,
  openEditModal,
  closeLeaveModal,
  openLeaveModal,
  handleShift,
  isLeave,
  isEdit,
  employeeSchedule,
}) => {
  return (
    <div>
      <div className={sty.editContent1}>
        {handleShift && (
          <div className={sty.editContent}>
            <div>
              {isEdit && <EditAdminModal onClose={closeEditModal} />}
              <p
                onClick={() => {
                  openEditModal();
                }}
              >
                Edit this shift
              </p>
            </div>
            <p onClick={employeeSchedule}>Edit Employee Schedule</p>
            <div>
              {isLeave && <AddLeaveModal onClose={closeLeaveModal} />}
              <p
                onClick={() => {
                  openLeaveModal();
                }}
              >
                Add Leave
              </p>
            </div>
            <p className={sty.Delete}>Delete shift</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeScheduleModal;
