import { useEffect, useState } from "react";

export const useCoupons = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/offers")
      .then((res) => res.json())
      .then((data) => setCoupons(data || []))
      .catch((err) => console.log(err));
  }, []);

  return coupons;
};