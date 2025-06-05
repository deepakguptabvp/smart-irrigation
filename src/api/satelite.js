import axios from "axios";

function formatAndIncrementDate(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate());
  return date.toISOString().split("T")[0];
}

export const fetchNDMI = async (geometry, sowingDate) => {
  const res = await axios.post("https://map-backend-wz2x.vercel.app/proxy/ndmi", {
    start_date: formatAndIncrementDate(new Date(sowingDate)),
    end_date: formatAndIncrementDate(new Date()),
    geometry,
    index: "NDMI",
    dataset: "COPERNICUS/S2_HARMONIZED"
  });

  return res.data;
};
