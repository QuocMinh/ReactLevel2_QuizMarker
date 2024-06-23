import { API_URL } from "@constants/url-settings";
import { CategoryModel } from "@models/CategoryModel";
import { messageArea } from "@utils/redux.utils";

export const fetchCategories = async () => {
  const respData = await fetch(API_URL.GET_CATEGORIES)
    .then((response) => response.json())
    .then((data) => data.trivia_categories as CategoryModel[])
    .catch((error) => {
      messageArea.warning(
        "An error occur: " + (error.message ?? "Undefined error")
      );
      return null;
    });

  return respData;
};
