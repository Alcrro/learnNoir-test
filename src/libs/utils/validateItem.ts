import type { LoaderFunctionArgs } from "react-router-dom";

export const validateItem = ({ params }: LoaderFunctionArgs) => {
  const { category, itemId } = params;

  if (!category || !itemId) {
    throw new Response("Not Found", { status: 404 });
  }

  // dacă vrei poți valida și itemId aici

  return null;
};
