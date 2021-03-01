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
        <header className="bg-gradient-to-r from-light-blue-800 to-cyan-600 w-100">
            <div className="max-w-screen-xl mx-auto">
                <div className="py-8 border-b border-black border-opacity-20 flex justify-between">
                    <h1 className="text-white font-bold text-3xl">CryptoCassettes</h1>
                    { address ? <p className="text-white text-opacity-70 truncate w-48">connected to {address}</p> : <button className="self-end flex justify-center items-center px-4 py-2 bg-opacity-30 border border-white border-opacity-30 shadow-sm font-medium rounded-md text-white bg-white hover:bg-opacity-50">Connect Wallet</button> }
                </div>
                <div className="py-16 flex justify-between">
                    <div>
                        <h3 className="text-white text-4xl font-semibold">The same mixtapes you love,</h3>
                        <h3 className="text-white text-4xl font-semibold text-opacity-50">now on the Ethereum network.</h3>
                    </div>
                    <a href="/new" className="self-end flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Claim Cassette</a>
                </div>
            </div>
        </header>
    )

}

export default Header;