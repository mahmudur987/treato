import React, { useState } from "react";
import editImg from "../../../../assets/images/AccountSettings/edit.svg";
import Mask1 from "../../../../assets/images/TeamDetails/Mask group.png";
import search from "../../../../assets/images/TeamDetails/search.png";
import VectorBlue from "../../../../assets/images/TeamDetails/VectorBlue.png";
import sty from "./TeamDetails.module.css";
import topImg from "../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../assets/images/TeamDetails/Vector.png";
import { useNavigate } from "react-router-dom";
import arrowLeft from "../../../../assets/images/TeamDetails/arrow-left.png";
import rightIcon from "../../../../assets/images/TeamDetails/chevron-right (3).png";
import dot from "../../../../assets/images/TeamDetails/Ellipse 294.png";
import retingStar from "../../../../assets/images/TeamDetails/retingStar.png";
import { useGetAllTeamMembers } from "../../../../services/Team";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";

const tableHeading = [
  {
    heading: "Name",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Service Profile",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Tenure",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Phone",
  },
  {
    heading: "Ratings",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Address",
  },
  {
    heading: "Services",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Bookings Today",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Edit",
  },
];
const TeamDetails = () => {
  const { data, isLoading, isError, error } = useGetAllTeamMembers();

  const TeamDetailsData = data?.data?.map((x) => {
    return {
      profile: x.stylist_Img.public_url || Mask1,
      name: x.stylist_name,
      serviceProfile: x.stylist_service[0] || "N/A",
      tenure: x.tenure || "N/A",
      phone: x.stylist_number || "N/A",
      rating: x.rating || "N/A",
      address: x.address || "N/A",
      service: x.stylist_service.length || 0,
      bookingToday: x.appointments,
      editPencil: editImg,
    };
  });
  const navigate = useNavigate();
  const [isViewAll, setIsViewAll] = useState(false);

  const AddTeamMemberData = () => {
    navigate("/partner/dashboard/AddMemberProfile");
  };
  const EditTeamMemberData = () => {
    navigate("/partner/dashboard/EditMemberProfile");
  };

  if (isLoading) {
    return <LoadSpinner />;
  }
  if (isError) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <div className={sty.container}>
      <div className={sty.manageTeam}>
        <div className={sty.TeamScheduleForResponsive}>
          <img src={arrowLeft} alt="arrowLeft" className={sty.arrowLeft} />
          <h1 className={sty.headingTeam}>Manage your team</h1>
        </div>
        <div style={{ display: "flex" }}>
          <span className={sty.searchBox}>
            <img src={search} alt="search" className={sty.searchBoxImg} />
            <input
              type="search"
              placeholder="Search by name or service title "
              className={sty.searchInp}
            />
            <div className={sty.ScheduleHeading}>
              <div>
                <h2 className={sty.ScheduleHeading1}>Team Schedule</h2>
                <p className={sty.ScheduleHeading2}>
                  View and edit schedule and shifts for team members, add
                  leaves.
                </p>
              </div>
              <div className={sty.rightIconHead}>
                <img
                  src={rightIcon}
                  alt="rightIcon"
                  onClick={EditTeamMemberData}
                />
              </div>
            </div>
            <div className={sty.horizontalLine}></div>
          </span>
          <div className={sty.addBtn}>
            <button className={sty.teamMemberBtn} onClick={AddTeamMemberData}>
              + Add team member
            </button>
          </div>
        </div>
      </div>
      {data && (
        <table className={sty.styledTable}>
          <thead>
            <tr>
              {tableHeading.map((item, i) => (
                <td key={i}>
                  <div className={sty.headingRow}>
                    <span style={{ marginLeft: "30px" }}>{item.heading}</span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "5px",
                      }}
                    >
                      <img src={item.topImg} alt="" />
                      <img src={item.bottomImg} alt="" />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {TeamDetailsData?.slice(
              0,
              isViewAll ? TeamDetailsData.length : 8
            ).map((item, i) => (
              <>
                <tr className={sty.mapData}>
                  <td>
                    <div className={sty.nameProfile}>
                      <img
                        src={item.profile}
                        alt="profile"
                        className={sty.profile}
                      />
                      <span className={sty.name}>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.serviceProfile} </td>
                  <td>{item.tenure}</td>
                  <td>{item.phone}</td>
                  <td>{item.rating}</td>
                  <td>{item.address}</td>
                  <td>{item.service}</td>
                  <td>{item.bookingToday}</td>
                  <td>
                    <img
                      src={item.editPencil}
                      alt="editPencil"
                      onClick={EditTeamMemberData}
                    />
                  </td>
                </tr>

                <div>
                  <div className={sty.nameProfileResponsive}>
                    <div>
                      <div className={sty.nameProfileR}>
                        <img
                          src={item.profile}
                          alt="profile"
                          className={sty.profile}
                        />
                        <span className={sty.name}>{item.name}</span>
                        <span className={sty.name}>
                          <img src={retingStar} alt="" />
                        </span>
                        <span className={sty.rating}>{item.rating}</span>
                      </div>
                      <div className={sty.serviceDiv}>
                        <p>{item.serviceProfile} </p>
                        <span>{item.bookingToday}</span>
                        <span>
                          <img src={dot} alt="" />
                        </span>
                        <span>booking</span>
                      </div>
                    </div>

                    <div className={sty.rightIconR}>
                      <img
                        src={rightIcon}
                        alt="rightIcon"
                        onClick={EditTeamMemberData}
                      />
                    </div>
                  </div>
                  <div className={sty.horizontalLine}></div>
                </div>
              </>
            ))}
          </tbody>
        </table>
      )}
      {TeamDetailsData?.length > 8 && (
        <div className={sty.viewAllBtnDiv}>
          <span className={sty.viewAllBtn1}>
            {isViewAll ? (
              <button
                onClick={() => setIsViewAll(false)}
                className={sty.viewAllBtn}
              >
                View less{" "}
                <img
                  src={VectorBlue}
                  alt="VectorBlue"
                  className={sty.viewAllBtnIcon}
                />
              </button>
            ) : (
              <button
                onClick={() => setIsViewAll(true)}
                className={sty.viewAllBtn}
              >
                View all{" "}
                <img
                  src={VectorBlue}
                  alt="VectorBlue"
                  className={sty.viewAllBtnIcon}
                />
              </button>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;