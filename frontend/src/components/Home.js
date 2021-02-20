import React from 'react';

const Home = () => {
    return (
        <div className="relative bg-gray-50 overflow-hidden h-screen">
            <div className="relative pt-6 pb-16 sm:pb-24">
                <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">Mixtape</span>
                            <span className="block text-indigo-600 xl:inline">NFTs</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Create mixtapes and mint them as NFTs to send to your friends! We need better copy here! This is all just boilerplate anyways!!!
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <a href="/new" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                    Create Mix
                                </a>
                            </div>
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <a href="shelf" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                                    View All
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home;