import { wikipediaAxios } from "./axiosConfig";

export const getWikiData = async (wikiName) => {
  try {
    const response = await wikipediaAxios.get(`/${wikiName}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching wiki data: " + error.message);
  }
};
