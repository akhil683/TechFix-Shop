import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[100vh] inset-0 flex flex-col justify-center items-center">
      <h2 className="text-3xl">Not Found</h2>
      <p className="text-gray-300">Could not found the page ?</p>
      <Link
        href={"/"}
        className="bg-white text-black px-4 py-2 mt-2 rounded-xl"
      >
        Return Home
      </Link>
    </div>
  );
}
