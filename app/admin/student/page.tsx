const Student = () => {
    return(
        <div>
            <div className="flex flex-row items-start px-20 bg-white mb-10">
                <div className="lg:shadow-custom font-inter flex flex-col w-full m-4 lg:m-10 p-10 rounded-2xl">



                <div className="w-full bg-gray-100 rounded-md shadow-sm p-2 px-10 mb-10 flex items-center justify-between">
                    <div className="bg-white h-10 p-4 w-1/3 rounded-md shadow flex items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            className="font-semibold font-inter border-none outline-none text-gray-700 w-full"
                        />
                    </div>

                    <button className="bg-gradient-to-b from-green-400 to-green-300 shadow-lg text-white font-bold px-6 py-2 rounded-lg text-lg">
                        + Add Student
                    </button>
                </div>



                    <div className="w-full bg-[#F4F4F4] rounded-md shadow-sm p-7 px-10 mb-3 flex items-center">
                        <div className="w-full grid grid-cols-[1fr_4fr] flex items-center">
                            <button className="font-semibold text-left">Name</button>
                            <button className="font-semibold text-left px-">Email ID</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-[1fr_4fr]  text-black text-left px-6 gap-y-1">

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3 underline">
                            nicholasjimmy@gmail.com
                        </p>


                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3 underline">
                            nicholasjimmy@gmail.com
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3 underline">
                            nicholasjimmy@gmail.com
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>

                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3 underline">
                            nicholasjimmy@gmail.com
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>
                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3 underline">
                            nicholasjimmy@gmail.com
                        </p>

                        <div className="col-span-5">
                            <hr className="w-full border-gray-300" />
                        </div>
                        <p className="font-inter font-bold p-3">
                            Nicholas Jimmy Alden
                        </p>

                        <p className="font-inter font-bold p-3 underline">
                            nicholasjimmy@gmail.com
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

export default Student;