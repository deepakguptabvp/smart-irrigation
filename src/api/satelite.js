import axios from "axios";

export const fetchNDMI = async (geometry) => {
  const res = await axios.post(
    "https://server.cropgenapp.com/get-vegetation-index",
    {
      start_date: "2025-05-15",
      end_date: "2025-05-31",
      geometry,
      index: "NDMI",
      dataset: "COPERNICUS/S2_HARMONIZED"
    }
  );

  return res.data;
};
