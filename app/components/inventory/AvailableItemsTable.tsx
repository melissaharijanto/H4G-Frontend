import { Item } from '@/lib/types/Item';
import SearchIcon from '../icons/SearchIcon';

const AvailableItemsTable = ({ items }: { items: Item[] }): React.ReactNode => {
    const columnNames = [
        'Item ID',
        'Name',
        'Description',
        'Price (in Credits)',
        'Stock',
    ];

    return (
        <div className="flex-col flex gap-y-4">
            <p className="font-inter text-blue font-bold tracking-tight text-3xl">
                All Available Items
            </p>
            <div className="bg-white rounded-xl justify-center shadow-custom p-8">
                <div className="font-inter flex flex-col w-full rounded-2xl gap-y-4">
                    <div className="bg-grey w-full p-4 rounded-xl">
                        <div className="bg-white flex justify-center items-center rounded-lg relative p-2 w-full">
                            <SearchIcon
                                strokeColor="stroke-dark-grey"
                                width="w-4"
                                className="absolute right-0"
                            />
                            <input
                                className="text-sm w-full bg-none focus:outline-none text-black ml-2"
                                placeholder="Enter your search query here."
                            />
                        </div>
                    </div>
                    <div className="border-[1px] border-grey rounded-xl">
                        <div className="w-full bg-input rounded-t-xl shadow-sm flex items-center text-black">
                            <div className="w-full grid grid-cols-[1fr_2fr_3fr_2fr_2fr] w-full font-semibold  flex text-center items-center">
                                {columnNames.map((col) => {
                                    return (
                                        <button className="p-4" key={col}>
                                            {col}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        {items.map((item, index) => {
                            return (
                                <div
                                    className="grid grid-cols-[1fr_2fr_3fr_2fr_2fr] font-medium font-inter place-items-center text-black text-center gap-y-1"
                                    key={item.id}>
                                    <p className="p-4">{item.id}</p>

                                    <p className="p-4">{item.name}</p>

                                    <p className="p-4">
                                        {`${item.description.slice(0, 25)}${
                                            item.description.length > 25
                                                ? '...'
                                                : ''
                                        }`}
                                    </p>

                                    <p className="p-4">{item.price}</p>

                                    <p className="p-4">{item.stock}</p>
                                    {index === items.length - 1 ? null : (
                                        <div className="col-span-5 w-full">
                                            <hr className="w-full border-grey" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableItemsTable;
