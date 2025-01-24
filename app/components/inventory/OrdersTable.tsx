import { Transaction } from '@/lib/types/Transaction';
import SearchIcon from '../icons/SearchIcon';
import { useEffect, useState } from 'react';

const OrdersTable = ({ orders }: { orders: Transaction[] }) => {
    const columnNames = [
        'Order ID',
        'Item Ordered',
        'Ordered By',
        'Quantity',
        'Order Status',
    ];

    const [allOrdersSelected, setAllOrdersSelected] = useState<boolean>(true);
    const [approvedSelected, setApprovedSelected] = useState<boolean>(false);
    const [pendingApprovalSelected, setPendingApprovalSelected] =
        useState<boolean>(false);
    const [preorderSelected, setPreorderSelected] = useState<boolean>(false);
    const [allOrders, setAllOrders] = useState<Transaction[]>();
    const [results, setResults] = useState<Transaction[]>([]);

    const handleSelection = (category: string) => {
        // Reset all categories to false
        setAllOrdersSelected(false);
        setApprovedSelected(false);
        setPendingApprovalSelected(false);
        setPreorderSelected(false);

        // Set the selected category to true
        if (category === 'allOrders') {
            setAllOrdersSelected(true);
            setResults(orders);
        } else if (category === 'approved') {
            setApprovedSelected(true);
            setResults(
                orders.filter(
                    (order) =>
                        order.status === 'CLAIMED' ||
                        order.status === 'CONFIRMED'
                )
            );
        } else if (category === 'pendingApproval') {
            setPendingApprovalSelected(true);
            setResults(
                orders.filter((order) => order.status === 'AWAITING_CONF')
            );
        } else if (category === 'preorder') {
            setPreorderSelected(true);
            setResults(orders.filter((order) => order.status === 'PREORDER'));
        }
    };

    const pickBgColor = (status: string): string => {
        const statusColors: { [key: string]: string } = {
            AWAITING_CONF: 'bg-yellow',
            CLAIMED: 'bg-green',
            CONFIRMED: 'bg-green',
            PREORDER: 'bg-blue',
            CANCELED: 'bg-dark-grey',
        };

        return statusColors[status] || ''; // Return empty string if status is not found
    };

    useEffect(() => {
        setResults(orders);
    }, []);
    return (
        <div className="flex-col flex gap-y-4">
            <p className="font-inter text-blue font-bold tracking-tight text-3xl">
                Orders
            </p>
            <div className="bg-white rounded-xl justify-center shadow-custom p-8 flex flex-col gap-y-4">
                <div className="flex gap-x-12 font-bold text-dark-grey">
                    <button
                        className={`${
                            allOrdersSelected ? '!text-blue underline' : ''
                        }`}
                        onClick={() => handleSelection('allOrders')}>
                        All Orders
                    </button>
                    <button
                        className={`${
                            pendingApprovalSelected
                                ? '!text-blue underline'
                                : ''
                        }`}
                        onClick={() => handleSelection('pendingApproval')}>
                        Pending Approval
                    </button>
                    <button
                        className={`${
                            preorderSelected ? '!text-blue underline' : ''
                        }`}
                        onClick={() => handleSelection('preorder')}>
                        Preorders
                    </button>
                    <button
                        className={`${
                            approvedSelected ? '!text-blue underline' : ''
                        }`}
                        onClick={() => handleSelection('approved')}>
                        Approved
                    </button>
                </div>
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
                        {results.map((order, index) => {
                            return (
                                <div
                                    className="grid grid-cols-[1fr_2fr_3fr_2fr_2fr] font-medium font-inter place-items-center text-black text-center gap-y-1"
                                    key={order.id}>
                                    <p className="p-4">{order.id}</p>

                                    <p className="p-4">{order.item}</p>

                                    <p className="p-4">{order.uid}</p>

                                    <p className="p-4">{order.quantity}</p>

                                    <p className="p-4">
                                        <span
                                            className={`font-inter font-bold ${pickBgColor(
                                                order.status
                                            )} text-white px-2 py-1 rounded-md text-sm`}>
                                            {order.status}
                                        </span>
                                    </p>

                                    {index === orders.length - 1 ? null : (
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

export default OrdersTable;
