import type { LoaderFunctionArgs } from "react-router-dom";

const allowedCategories = ["algorithms", "data-structures"] as const;
type Category = (typeof allowedCategories)[number];

export const validateCategory = ({ params }: LoaderFunctionArgs) => {
  const { category } = params;
  if (!category || !allowedCategories.includes(category as Category)) {
    throw new Response("Not Found", { status: 404 });
  }

  if (!allowedCategories.includes(category as Category)) {
    throw new Response("Not Found", { status: 404 });
  }

  return null;
};
