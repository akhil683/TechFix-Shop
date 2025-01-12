import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default async function RSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="md:flex md:gap-6 max-md:mx-auto w-full">
        {/* header */}
        <Header />
        <Sidebar />
        <div className="px-4 py-2 mt-6 w-full">{children}</div>
      </div>
    </>
  );
}
