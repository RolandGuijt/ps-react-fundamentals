import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";

const useBids = (houseId) => {
  const [bids, setBids] = useState([]);
  const { get, loadingState } = useGetRequest(`/api/bids/${houseId}`);

  useEffect(() => {
    const fetchBids = async () => {
      const bids = await get();
      setBids(bids);
    };
    fetchBids();
  }, [get]);

  const postBid = async (bid) => {
    await fetch(`/api/bids/${bid.houseId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bid),
    });
  };

  const addBid = (bid) => {
    postBid(bid);
    setBids([...bids, bid]);
  };

  return { bids, loadingState, addBid };
};

export default useBids;
