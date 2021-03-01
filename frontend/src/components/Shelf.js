import React, {useState, useEffect} from "react";
import axios from 'axios';

const getIPFSData = (hash) => {
    const url = `https://gateway.ipfs.io/ipfs/${hash}`
    return axios
    .get(url)
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        console.log(error)
    });
};

const Shelf = ({contract}) => {
    const [mixes, setMixes] = useState([]);

    const fetchNFTs = async () => {
        try {
          const total = await contract.totalSupply();
          let uriList = [];
          let i = 0;
          for (i = 0; i < 20; i++) {
              let tokenID = await contract.tokenByIndex(i);
              let uri = await contract.tokenURI(tokenID);
              let response = await getIPFSData(uri);
              uriList.push(response.data);
          }

          return uriList;
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData(){
            let mixes = await fetchNFTs();
            console.log(mixes);
            // setMixes(mixes);
        }
        if (contract != null) {
            fetchData();
        }
    }, [contract])

    return (
        <div className="container mx-auto">
            <h4 className="text-xl font-bold">Browse Mixtapes</h4>
            <div className="grid grid-cols-5 gap-4">
                {
                    mixes.map((mixData) => {
                        return (
                            <div className="border p-2 rounded-sm" key={mixData.title}>
                                {mixData.title}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Shelf;