const SearchIcon = ({
    strokeColor,
    className,
    width,
}: {
    strokeColor: string;
    className?: string | undefined;
    width?: string | undefined;
}) => {
    return (
        <svg
            className={width ? width : 'w-20'}
            viewBox="0 0 39 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M34.125 34.625L27.0562 27.5562M30.875 18.375C30.875 25.5547 25.0547 31.375 17.875 31.375C10.6953 31.375 4.875 25.5547 4.875 18.375C4.875 11.1953 10.6953 5.375 17.875 5.375C25.0547 5.375 30.875 11.1953 30.875 18.375Z"
                className={`${strokeColor} ${className}`}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default SearchIcon;
