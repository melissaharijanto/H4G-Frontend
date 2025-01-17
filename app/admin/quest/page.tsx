const Quest = () => {
    return(
        <div>
            <div className="h-screen">
                <div className="flex flex-col items-start px-20 py-5 bg-white">
                    <p className="font-inter text-blue font-bold tracking-tight text-4xl lg:text-6xl mb-10">
                        Quest
                    </p>
                </div>

                <div className="flex justify-between items-start px-10 ">
                    <div className="flex gap-4 px-10">
                        <div className="w-40 h-40 bg-gradient-to-b from-red-400 to-red-300 rounded-xl flex flex-col justify-center items-center shadow-lg">
                            <p className="font-inter text-4xl font-bold text-white">10</p>
                            <p className="font-inter text-md font-medium text-white mt-2">Rejected Tasks</p>
                        </div>

                        <div className="w-40 h-40 bg-gradient-to-b from-orange-400 to-orange-300 rounded-xl flex flex-col justify-center items-center shadow-lg">
                            <p className="font-inter text-4xl font-bold text-white">15</p>
                            <p className="font-inter text-md font-medium text-white mt-2">Ongoing Tasks</p>
                        </div>

                        <div className="w-40 h-40 bg-gradient-to-b from-green-400 to-green-300 rounded-xl flex flex-col justify-center items-center shadow-lg">
                            <p className="font-inter text-4xl font-bold text-white">30</p>
                            <p className="font-inter text-md text-white mt-2">Completed Tasks</p>
                        </div>
                    </div>

                    <div className="flex gap-4 py-10">
                        <button className="justify-center item-center bg-gradient-to-b from-green-400 to-green-300 shadow-lg text-white font-bold px-6 py-3 rounded-lg text-4xl py-2">
                            + Add Quests
                        </button>
                    </div>
                </div>
            </div>
    
            <p className="font-inter text-blue font-bold tracking-tight text-2xl lg:text-5xl px-40  -mt-[500px]">
                Daily Quests
            </p>

            <div className="flex flex-row items-start px-20 bg-white mb-10">
                <div className="lg:shadow-custom font-inter flex flex-col w-full m-4 lg:m-10 p-10 rounded-2xl">

                    <div className="flex flex-row mb-8">
                        <button className="font-semibold text-grey w-1/4 text-center text-green underline"> All Daily Quests </button>
                        <button className="font-semibold text-grey w-1/4 text-left"> Approved </button>
                        <button className="font-semibold text-grey w-1/4 text-left"> Pending Approval </button>
                        <button className="font-semibold text-grey w-1/4 text-left"> Rejected </button>
                    </div>

                    <div className="w-full bg-gray-100 rounded-md shadow-sm p-2 px-10 mb-10">
                        <div className="bg-white h-10 p-4 w-1/3 rounded-md shadow flex items-center ">
                            <input 
                                type="text"
                                placeholder="Search"
                                className="font-semibold font-inter border-none outline-none text-gray-700 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="w-full bg-[#F4F4F4] rounded-md shadow-sm p-7 px-10 mb-3">
                        <div className="w-full grid grid-cols-[1fr_2fr_3fr_3fr_2fr]">
                            <button className="font-semibold text-left">Quest ID</button>
                            <button className="font-semibold text-left">Name</button>
                            <button className="font-semibold text-left">Quest</button>
                            <button className="font-semibold text-left">Proof of Completion</button>
                            <button className="font-semibold text-left">Status</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-[1fr_2fr_3fr_3fr_2fr] text-black px-6 gap-y-1">
                        <p className="font-inter font-bold p-3 underline">
                            #SF30
                        </p>

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3">
                            Cleaning Bed
                        </p>

                        <p className="font-inter font-bold p-3">
                            Photo
                        </p>

                        <p className="p-2 -px-5">
                            <span className="font-inter bg-green font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                APPROVED
                            </span>
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>

                        <p className="font-inter font-bold p-3 underline">
                            #SF30
                        </p>

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3">
                            Cleaning Bed
                        </p>

                        <p className="font-inter font-bold p-3">
                            Photo
                        </p>

                        <p className="p-3">
                            <span className="font-inter bg-yellow font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                PENDING APPROVAL
                            </span>
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>

                        <p className="font-inter font-bold p-3 underline">
                            #SF30
                        </p>

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3">
                            Cleaning Bed
                        </p>

                        <p className="font-inter font-bold p-3">
                            Photo
                        </p>

                        <p className="p-3">
                            <span className="font-inter font-bold bg-[#D2422A] text-white px-2 py-1 rounded-md text-sm">
                                REJECTED
                            </span>
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>
                    </div>
                    <div className= "flex justify-center items-center p-10">
                        <button className="font-inter font-bold  text-blue underline hover:text-blue-600">
                            View More
                        </button>
                    </div>
                </div>
            </div>

            <p className="font-inter text-blue font-bold tracking-tight text-2xl lg:text-5xl px-40">
                General Quests
            </p>

            <div className="flex flex-row items-start px-20 bg-white mb-10">
                <div className="lg:shadow-custom font-inter flex flex-col w-full m-4 lg:m-10 p-10 rounded-2xl">

                    <div className="flex flex-row mb-8">
                        <button className="font-semibold text-grey w-1/4 text-left text-green underline"> All General Quests </button>
                        <button className="font-semibold text-grey w-1/3 text-left"> Approved </button>
                        <button className="font-semibold text-grey w-1/4 text-left"> Pending Approval </button>
                        <button className="font-semibold text-grey w-1/11 text-left"> Rejected </button>
                    </div>

                    <div className="w-full bg-gray-100 rounded-md shadow-sm p-2 px-10 mb-10">
                        <div className="bg-white h-10 p-4 w-1/3 rounded-md shadow flex items-center ">
                            <input 
                                type="text"
                                placeholder="Search"
                                className="font-semibold font-inter border-none outline-none text-gray-700 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="w-full bg-[#F4F4F4] rounded-md shadow-sm p-7 px-10 mb-3 flex items-center">
                        <div className="w-full flex items-center">
                            <button className="font-semibold w-1/6 text-left">Quest ID</button>
                            <button className="font-semibold w-1/6 text-left">Name</button>
                            <button className="font-semibold w-1/4 text-left">Quest</button>
                            <button className="font-semibold w-1/3 text-left">Proof of Completion</button>
                            <button className="font-semibold w-1/9 text-left">Status</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-[1fr_3fr_3fr_2fr_2fr] text-black gap-y-1">
                        <p className="font-inter font-bold p-3 underline">
                            #SF30
                        </p>

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3">
                            Cleaning Bed
                        </p>

                        <p className="font-inter font-bold p-3">
                            Photo
                        </p>

                        <p className="p-2">
                            <span className="font-inter bg-green font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                APPROVED
                            </span>
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>

                        <p className="font-inter font-bold p-3 underline">
                            #SF30
                        </p>

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3">
                            Cleaning Bed
                        </p>

                        <p className="font-inter font-bold p-3">
                            Photo
                        </p>

                        <p className="p-3">
                            <span className="font-inter bg-yellow font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                PENDING APPROVAL
                            </span>
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>

                        <p className="font-inter font-bold p-3 underline">
                            #SF30
                        </p>

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3">
                            Cleaning Bed
                        </p>

                        <p className="font-inter font-bold p-3">
                            Photo
                        </p>

                        <p className="p-3">
                            <span className="font-inter font-bold bg-[#D2422A] text-white px-2 py-1 rounded-md text-sm">
                                REJECTED
                            </span>
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>
                    </div>
                    <div className= "flex justify-center items-center p-10">
                        <button className="font-inter font-bold  text-blue underline hover:text-blue-600">
                            View More
                        </button>
                    </div>
                </div>
            </div>

            <p className="font-inter text-blue font-bold tracking-tight text-2xl lg:text-5xl px-40">
                Requested Quests
            </p>

            <div className="flex flex-row items-start px-20 bg-white">
                <div className="lg:shadow-custom font-inter flex flex-col w-full m-4 lg:m-10 p-10 rounded-2xl">

                    <div className="flex flex-row mb-8">
                        <button className="font-semibold text-grey w-1/4 text-left text-green underline"> All Requested Quests </button>
                        <button className="font-semibold text-grey w-1/3 text-left"> Approved </button>
                        <button className="font-semibold text-grey w-1/4 text-left"> Pending Approval </button>
                        <button className="font-semibold text-grey w-1/11 text-left"> Rejected </button>
                    </div>

                    <div className="w-full bg-gray-100 rounded-md shadow-sm p-2 px-10 mb-10">
                        <div className="bg-white h-10 p-4 w-1/3 rounded-md shadow flex items-center ">
                            <input 
                                type="text"
                                placeholder="Search"
                                className="font-semibold font-inter border-none outline-none text-gray-700 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="w-full bg-[#F4F4F4] rounded-md shadow-sm p-7 px-10 mb-3 flex ">
                        <div className="w-full flex">
                            <button className="font-semibold w-1/6 text-left">Quest ID</button>
                            <button className="font-semibold w-1/6 text-left">Name</button>
                            <button className="font-semibold w-1/4 text-left">Quest</button>
                            <button className="font-semibold w-1/3 text-left">Proof of Completion</button>
                            <button className="font-semibold w-1/9 text-left">Status</button>
                        </div>
                    </div>



                    <div className="grid grid-cols-[1fr_3fr_3fr_2fr_2fr] text-black gap-y-1">
                        <p className="font-inter font-bold p-3 underline">
                            #SF30
                        </p>

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3">
                            Cleaning Bed
                        </p>

                        <p className="font-inter font-bold p-3">
                            Photo
                        </p>

                        <p className="p-2">
                            <span className="font-inter bg-green font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                APPROVED
                            </span>
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>

                        <p className="font-inter font-bold p-3 underline">
                            #SF30
                        </p>

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3">
                            Cleaning Bed
                        </p>

                        <p className="font-inter font-bold p-3">
                            Photo
                        </p>

                        <p className="p-3">
                            <span className="font-inter bg-yellow font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                PENDING APPROVAL
                            </span>
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>

                        <p className="font-inter font-bold p-3 underline">
                            #SF30
                        </p>

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3">
                            Cleaning Bed
                        </p>

                        <p className="font-inter font-bold p-3">
                            Photo
                        </p>

                        <p className="p-3">
                            <span className="font-inter font-bold bg-[#D2422A] text-white px-2 py-1 rounded-md text-sm">
                                REJECTED
                            </span>
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>
                    </div>
                    <div className= "flex justify-center items-center p-10">
                        <button className="font-inter font-bold  text-blue underline hover:text-blue-600">
                            View More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quest;