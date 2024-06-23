import { API_URL } from "@constants/url-settings";
import { Category } from "@models/CategoryModel";

export const fetchCategories = async () => {
  const respData = await fetch(API_URL.GET_CATEGORIES)
    .then((response) => response.json())
    .then((data) => data.trivia_categories as Category[])
    .catch((error) => {
      console.log("@fetchCategories ~ error", error);
      return null;
    });

  return respData;
};
