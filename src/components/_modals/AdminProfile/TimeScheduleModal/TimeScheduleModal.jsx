import React, { useState } from "react";
import EditAdminModal from "../EditAdminData/EditAdminModal";
import AddLeaveModal from "../AddLeaveModal/AddLeaveModal";
import sty from "./TimeScheduleModal.module.css";
const TimeScheduleModal = ({
  closeEditModal,
  openEditModal,
  closeLeaveModal,
  openLeaveModal,
  isLeave,
  isEdit,
  employeeSchedule,
}) => {
  return (
    <>
      <div className={sty.editContent}>
        <p
          onClick={() => {
            openEditModal();
          }}
        >
          Edit this shift
        </p>
        <p onClick={employeeSchedule}>Edit Employee Schedule</p>
        <p
          onClick={() => {
            openLeaveModal();
          }}
        >
          Add Leave
        </p>
        <p className={sty.Delete}>Delete shift</p>
      </div>
      {isEdit && <EditAdminModal onClose={closeEditModal} />}
      {isLeave && <AddLeaveModal onClose={closeLeaveModal} />}
    </>
  );
};

export default TimeScheduleModal;
