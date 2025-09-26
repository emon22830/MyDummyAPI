import Card from "../components/Card";

export default function Home() {
  const endpoints = [
    { title: "Users", endpoint: "/users" },
    { title: "Posts", endpoint: "/posts" },
    { title: "Comments", endpoint: "/comments" },
    { title: "Todos", endpoint: "/todos" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8">Fake API Playground</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 max-w-5xl">
        {endpoints.map((item, idx) => (
          <Card key={idx} title={item.title} endpoint={item.endpoint} />
        ))}
      </div>
    </div>
  );
}
