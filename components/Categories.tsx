"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categoryFilters } from "@/constants";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const handleTags = (filter: string) => {
    if (filter === "All") {
      router.push(`${pathName}`);
    }
    else {
      router.push(`${pathName}?category=${filter}`);
    }
  };

  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => (
          <button
            type="button"
            key={filter}
            onClick={() => handleTags(filter)}
            className={`${
              (category === filter) || (!category && filter === "All")
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-0 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
