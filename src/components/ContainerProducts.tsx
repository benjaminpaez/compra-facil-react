import type { ReactNode } from "react";

type TContainer = {
  title: string;
  description: string;
  children: ReactNode;
};
export default function ContainerProducts({
  title,
  description,
  children,
}: TContainer) {
  return (
    <div className="flex flex-col bg-[#DFDFDE] gap-8 p-8 rounded-md">
      <section>
        <h1 className="flex text-4xl text-black">{title}</h1>
        <p className="text-slate-600 text-lg">{description}</p>
        <hr className="my-2 border-t border-gray-300" />
      </section>
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {children}
      </article>
    </div>
  );
}
