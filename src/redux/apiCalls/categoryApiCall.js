import { toast } from "react-toastify";
import request from "../../utils/request";

const { categoryActions } = require("../slices/categorySlice");

// Fetch All Categories
export function fetchAllCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories");
      dispatch(categoryActions.setCategoties(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// Create Category
export function createCategory(newCategory) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.post("/api/categories", newCategory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.addCategory(data));
      toast.success("category created")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Category
export function deleteCategory(categoryId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.deleteCategory(data.categoryId));
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
