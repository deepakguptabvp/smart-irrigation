import axios from "axios";
function formatAndIncrementDate(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() ); // Increment by 1 day

  // Format as YYYY-MM-DD
  const formatted = date.toISOString().split("T")[0];
  return formatted;
}

export const fetchNDMI = async (geometry,sowingDate) => {
  const res = await axios.post(
    "https://server.cropgenapp.com/get-vegetation-index",
    {
      start_date: "2025-06-03",
      end_date: formatAndIncrementDate(new Date()),
      geometry,
      index: "NDMI",
      dataset: "COPERNICUS/S2_HARMONIZED"
    }
  );

  return res.data;
};
