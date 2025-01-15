import { Item } from '@/lib/types/Item';
import { useRouter } from 'next/navigation';

const ProductCard = ({ item }: { item: Item }) => {
    const router = useRouter();
    const redirectToProductPage = () => {
        router.push(`/products/${item.id}`);
    };
    return (
        <button
            className="rounded-xl shadow-custom w-full"
            onClick={redirectToProductPage}>
            <div className="h-48 flex justify-center items-center overflow-hidden rounded-t-xl border-b-2 border-grey">
                <img src={item?.image} alt="Product Name" />
            </div>
            <div className="py-2.5 px-5 text-black text-sm bg-white rounded-b-xl text-left">
                <p>{item?.name}</p>
                <p className="font-black text-xl">{item?.price} credits</p>
                <p className="italic text-dark-grey text-sm">
                    Stock left: {item?.stock}
                </p>
            </div>
        </button>
    );
};

export default ProductCard;
