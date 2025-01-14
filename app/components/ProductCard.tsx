const ProductCard = () => {
    return (
        <button className="rounded-xl shadow-custom w-full">
            <div className="h-48 flex justify-center items-center overflow-hidden rounded-t-xl border-b-2 border-grey">
                <img src="/sample-product.png" alt="Product Name" />
            </div>
            <div className="py-2.5 px-5 text-black text-sm bg-white rounded-b-xl text-left">
                <p>NIKE Shoes</p>
                <p className="font-black text-xl">20 credits</p>
                <p className="italic text-dark-grey text-sm">Stock left: 20</p>
            </div>
        </button>
    );
};

export default ProductCard;
