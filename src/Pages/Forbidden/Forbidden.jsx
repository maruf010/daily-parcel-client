import { FaBan, FaHome } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md text-center bg-white p-8 rounded-2xl shadow-lg">
                <FaBan className="text-red-500 text-6xl mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
                <p className="text-gray-600 mb-6">
                    Sorry, you don’t have permission to access this page.
                </p>
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <FaHome /> Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;
