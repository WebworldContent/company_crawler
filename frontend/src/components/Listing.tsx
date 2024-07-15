import { useEffect, useState } from "react";
import { CardElement } from "./Card";
import { Company } from "../lib/interfaces";
import { getCompanies } from "../services/companies";

interface CardType {
  page: number;
  setCompanies: Function;
  companies: Company[];
}

export const CardListing = ({ page = 0, setCompanies, companies }: CardType) => {
  const [isCardUpdated, setUpdateCard] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCompanies(page);
        setCompanies(response);
      } catch (error) {
        setError((prevError) => ({ ...prevError, 'COMPANY_FETCH_ERROR': 1 }))
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    setUpdateCard(false);
  }, [page, isCardUpdated]);

  if (Object.keys(error).length > 0) {
    return (<div>
      <h1>Something Went Wrong!</h1>
      <p>Try Loading the page again or visit sometime later</p>
      <p>Our Team is working on it.</p>
      <p>We appriciate your patients!</p>
    </div>)
  }


  return (
    <div className='listing'>
      {isLoading ? (<h1>Loading...</h1>) : (companies.map(data => {
        if (data.companyName || data.cin) {
          return <div key={data.id} className='card-item'><CardElement companyName={data.companyName} cin={data.cin} pin={data.pin} id={data.id} setUpdateCard={setUpdateCard} /></div>
        }
      }))}
    </div>
  );
};