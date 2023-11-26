import axiosInstance from "./axios";

export const getAllLookbook = async () => {
  try {
    const res = await axiosInstance.get(`look-book/view-all`);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const getALookbook = async (id) => {
  try {
    const res = await axiosInstance.get(`look-book/view/${id}`);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

//  look-book/search?categoryName=hair

export const getLookbooksByService = async (categoryName) => {
  try {
    const res = await axiosInstance.get(
      `look-book/search?categoryName=${categoryName}`
    );
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

export const getNearByUserLookbooks = async ({
  categoryName,
  latitude,
  longitude,
}) => {
  try {
    const res = await axiosInstance.get(`look-book/searchLookbooksNearUser`, {
      params: {
        categoryName,
        latitude,
        longitude,
      },
    });
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const getAllLookbooksLocations = async () => {
  try {
    const res = await axiosInstance.get(`look-book/getLookbookLocation`);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

export const getLookbooksByLocations = async ({ categoryName, location }) => {
  try {
    const res = await axiosInstance.get(`look-book/search/lookbook`, {
      params: {
        categoryName,
        location,
      },
    });
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

