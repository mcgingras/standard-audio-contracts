import React, { useEffect, useState } from 'react';

const Header = () => {

    const [address, setAddress] = useState(null);

    const checkForWallet = () => {
        setAddress(window.ethereum.selectedAddress)
    }

    useEffect(() => {
        checkForWallet()
    }, [])


    return (
        
    )

}

export default Header;