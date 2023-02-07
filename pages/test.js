import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import GridList from "../components/test/GridList";
import ItemGrid from "../components/test/ItemGrid";

function Test() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const getAllData = async () => {
    const { data } = await axios.get(`/api/products`);
    setUsers( data );
    };
    
    console.log(users)

  useEffect(() => {
    getAllData();
  }, [] );
    
    return <div>
        <GridList item={users}>
            <ItemGrid />
      </GridList>
  </div>;
}

export default Test;
