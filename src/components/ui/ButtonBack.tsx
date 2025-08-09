import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ButtonBack({ direction, name }: string) {
  return (
    <Link
      to={direction}
      className="flex gap-2 mr-4 text-gray-500 hover:text-gray-700"
    >
      <ChevronLeft />
      {name || "Volver"}
    </Link>
  );
}
