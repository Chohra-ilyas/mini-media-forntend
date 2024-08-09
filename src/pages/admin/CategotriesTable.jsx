import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import "./adminTable.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchAllCategories } from "../../redux/apiCalls/categoryApiCall";
import { useEffect } from "react";

const CategotriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);
  // delete Category handler
  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(categoryId))
        swal("Poof! Your Category has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Category is safe!");
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category,index) => (
              <tr key={category._id}>
                <td>{index}</td>
                <td>
                  <b>{category.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={()=>{deleteCategoryHandler(category._id)}}>
                      Delete Category
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CategotriesTable;
