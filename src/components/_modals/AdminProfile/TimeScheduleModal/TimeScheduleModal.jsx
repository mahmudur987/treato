import React, { memo, useState } from "react";
import EditAdminModal from "../EditAdminData/EditAdminModal";
import AddLeaveModal from "../AddLeaveModal/AddLeaveModal";
import sty from "./TimeScheduleModal.module.css";
import axiosInstance from "../../../../services/axios";
import { toast } from "react-toastify";
const TimeScheduleModal = ({
  closeEditModal,
  openEditModal,
  closeLeaveModal,
  openLeaveModal,
  isLeave,
  isEdit,
  employeeSchedule,
  schedule,
  member,
  refetch,
}) => {
  const handleDeleteShift = async () => {
    try {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      let url = `stylist/deleteShift?stylistId=${member.id}&date=${schedule?.date}&shiftId=${schedule?.shifts[0]._id}`;

      const { data } = await axiosInstance.patch(url, {}, { headers });
      refetch();
      toast.success(data ? data.message : "delete shift ");
    } catch (error) {
      toast.error(error ? error.message : "Error");
    }
  };

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
        <p onClick={handleDeleteShift} className={sty.Delete}>
          Delete shift
        </p>
      </div>
      {isEdit && <EditAdminModal onClose={closeEditModal} />}
      {isLeave && <AddLeaveModal onClose={closeLeaveModal} />}
    </>
  );
};

export default TimeScheduleModal;
export const MemoizedTimeScheduleModal = memo(TimeScheduleModal);
