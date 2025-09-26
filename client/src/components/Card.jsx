/* A reusable card component */
export default function Card({ title, endpoint }) {
  const handleClick = () => {
    window.open(`http://localhost:5000${endpoint}`, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
    >
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500">{endpoint}</p>
    </div>
  );
}
