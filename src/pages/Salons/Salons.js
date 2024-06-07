import React, { useState, useCallback, useMemo } from "react";
import styles from "./Salons.module.css";
import Salon from "../../components/Cards/Salon/Salon";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/slices/filterModals/filterModal";
import {
  filterDeskIcon,
  filter,
  chevronDown,
} from "../../assets/images/SalonsPageImages";
import Pagination from "../../components/pagination/Pagination";
import {
  updateFilterContent,
  updateSearchSalonResults,
} from "../../redux/slices/salons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getfilterSalonByServiceLatLng } from "../../utils/utils";
import { arrowleft, closeIcon } from "../../assets/images/icons/index.js";
import { getAllServices } from "../../services/Services.js";
import Treatments from "../../components/HomePage/Hero/SearchContent/Treatments.js";
import MainSearchBar from "../../components/Input/mainSearchBar/MainSearchBar.js";
const Salons = React.memo(() => {
  const salonsState = useSelector((state) => state.salons);
  const userDetails = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [serviceInput_Mobo, setserviceInput_Mobo] = useState("");
  const [allServices, setallServices] = useState({});
  const [filteredServiceData, setFilteredServiceData] = useState([]);
  const [isServiceDropdownOpen, setisServiceDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClosedropdown = () => {
    setisServiceDropdownOpen(false);
  };
  const searchParams = new URLSearchParams(location.search);
  // Get the 'services' and 'location' query parameters
  let servicesParam = "";
  servicesParam = searchParams.get("service");
  const locationParam = searchParams.get("location");
  const locationLat = searchParams.get("lat");
  const locationLng = searchParams.get("lng");

  // Filter salonContent based on the condition
  const handleBack = () => {
    navigate("/"); // Go back to the previous page
  };

  const handleOpenModal = useCallback(
    (modalContent) => {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      dispatch(openModal(modalContent));
      setCurrentPage(1);
    },
    [dispatch]
  );

  //pagination codes
  const ITEMS_PER_PAGE = 6;

  //fetching base on search input
  useEffect(() => {
    setIsLoading(true); // Set loading state

    getfilterSalonByServiceLatLng(
      userDetails,
      "searchBase",
      servicesParam,
      locationParam,
      locationLat,
      locationLng
    ).then((res) => {
      setIsLoading(false);
      dispatch(updateSearchSalonResults(res));
      dispatch(updateFilterContent(res));
    });
  }, [servicesParam, locationParam]);

  const handleServiceInput = (e) => {
    const inputValue = e.target.value;
    setserviceInput_Mobo(inputValue);

    // Filter the data based on the input value
    const filtered = allServices.filter((item) =>
      item.service_name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredServiceData(filtered);
  };
  const handle_closeTrt_Modal = () => {
    // setTreatmentInputValue("");
    setisServiceDropdownOpen(false);
    document.body.style.overflow = "auto";
  };
  // Memoize items based on filterContent
  const items = useMemo(() => {
    return salonsState?.filterContent?.map((item, index) => (
      <Salon key={index} salonData={item} />
    ));
  }, [salonsState.filterContent]);

  console.log(Math.ceil(items?.length / ITEMS_PER_PAGE));
  console.log(salonsState);

  const totalPages = Math.ceil(items?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleItems = items?.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
  };
  const showingStart = startIndex + 1;
  const showingEnd = endIndex <= items?.length ? endIndex : items?.length;
  let showing = showingStart - showingEnd;

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 1000); // Set a 2-second delay

    return () => {
      clearTimeout(delay); // Clear the timeout if the component unmounts
    };
  }, []);
  useEffect(() => {
    setserviceInput_Mobo(servicesParam);
  }, [servicesParam]);

  useEffect(() => {
    // Call the getAllServices function when the component mounts
    async function fetchAllServices() {
      try {
        const { res, err } = await getAllServices();

        if (res) {
          // If the request was successful, update the state with the data
          setallServices(res?.data?.data); // Assuming the response data contains a "data" property
          setFilteredServiceData(res?.data?.data);
        } else {
          // If there was an error, handle it and set the error state
          console.log(err);
        }
      } catch (error) {
        // Handle unexpected errors here
        console.log(error);
      }
    }

    fetchAllServices();
  }, []);

  const handeOpenDropdown = () => {
    setFilteredServiceData(allServices);
    setisServiceDropdownOpen(true);
  };
  console.log(salonsState?.filterContent?.length);
  console.log(totalPages);
  console.log(currentPage);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mobo_ServiceBar}>
          <button className={styles.backbutton} onClick={handleBack}>
            <img src={arrowleft} alt="backArrow" />
          </button>
          <input
            value={serviceInput_Mobo}
            onChange={handleServiceInput}
            onClick={handeOpenDropdown}
          />
          {isServiceDropdownOpen && (
            <button
              className={styles.closebutton}
              onClick={handleClosedropdown}
            >
              <img src={closeIcon} alt="closeIcon" />
            </button>
          )}
        </div>
        {isServiceDropdownOpen && (
          <Treatments
            allServices={filteredServiceData}
            setTreatmentInputValue={setserviceInput_Mobo}
            handle_close={handle_closeTrt_Modal}
            pageName="salons"
          />
        )}
        {/* mobo filter options */}

        <div className={styles.mobo_filters}>
          <button className={styles.filterIcon}>
            <img src={filter} alt="filter" />
          </button>

          <button
            className={styles.filter}
            onClick={() => handleOpenModal("sortBy")}
          >
            Sort <img src={chevronDown} alt="chevronDown" />
          </button>
          <button
            className={styles.filter}
            onClick={() => handleOpenModal("price")}
          >
            Price <img src={chevronDown} alt="chevronDown" />
          </button>
          <button
            className={styles.filter}
            onClick={() => handleOpenModal("venue")}
          >
            Venue Type <img src={chevronDown} alt="chevronDown" />
          </button>
        </div>
        {<MainSearchBar />}

        <div className={styles.venueInfo}>
          <h4>
            Showing {visibleItems?.length} of{" "}
            {salonsState?.filterContent?.length} venues
          </h4>
          <button
            className={styles.filterDesk}
            onClick={() => handleOpenModal("all")}
          >
            <img
              src={filterDeskIcon}
              alt="filterDeskIcon"
              className={styles.filterDeskIcon}
            />
            Filters
          </button>
        </div>

        <div className={styles.salonsWrapper}>
          {isLoading ? (
            <div className="zeroResponse">Loading...</div>
          ) : showContent ? (
            visibleItems?.length > 0 ? (
              visibleItems
            ) : (
              <div className="zeroResponse">No result found</div>
            )
          ) : null}
        </div>
        {salonsState?.filterContent?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
});

export default Salons;
