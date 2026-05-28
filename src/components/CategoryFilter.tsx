"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setActiveCategory } from "@/lib/store/slices/uiSlice";

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.ui.activeCategory);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => dispatch(setActiveCategory(category))}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
            activeCategory === category
              ? "bg-nike-black text-white shadow-md"
              : "bg-nike-grey-100 text-nike-grey-700 hover:bg-nike-grey-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
