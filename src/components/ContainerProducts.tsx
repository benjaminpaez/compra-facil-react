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
    <div className="flex flex-col bg-[#DFDFDE] gap-4 p-8">
      <section>
        <h1 className="flex text-4xl text-black">{title}</h1>
        <p className="text-lg text-slate-600">{description}</p>
        <hr className="my-2 border-t border-gray-300" />
      </section>
      <article className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </article>
    </div>
  );
}
