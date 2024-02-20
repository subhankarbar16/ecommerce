export default function TextArea({ col=4, row=6, className = '', ...props }) {
    return (
        <textarea
            col={col}
            row={row}
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
        ></textarea>
    );
}