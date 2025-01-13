const CategoryLabel = ({ name }: { name: string }) => {
    return (
        <div className="bg-white rounded-lg">
            <p className="font-semibold text-blue text-md py-2 px-4">{name}</p>
        </div>
    );
};

export default CategoryLabel;
