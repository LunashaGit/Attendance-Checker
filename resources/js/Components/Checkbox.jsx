export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded bg-gray-900 border-gray-300 border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 focus:ring-indigo-600 focus:ring-offset-gray-800"
            onChange={(e) => handleChange(e)}
        />
    );
}
