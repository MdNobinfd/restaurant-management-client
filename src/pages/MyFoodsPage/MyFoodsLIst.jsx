// import React, { use } from 'react';
// import { FaEdit } from "react-icons/fa";
// import { Link } from 'react-router';

// const MyFoodsList = ({ myaddedFood }) => {
//     const data = use(myaddedFood)
//   return (
//     <div className="p-6 overflow-x-auto">
//       <h2 className="text-xl font-bold mb-4 text-orange-600">🍽️ My Added Foods</h2>

//       {data?.length === 0 ? (
//         <p className="text-gray-500">No food items added yet.</p>
//       ) : (
//         <table className="min-w-full bg-white border border-orange-300 rounded shadow-md">
//           <thead className="bg-orange-100 text-orange-800">
//             <tr>
//               <th className="px-4 py-3 border-b text-left">Image</th>
//               <th className="px-4 py-3 border-b text-left">Name</th>
//               <th className="px-4 py-3 border-b text-left">Price</th>
//               <th className="px-4 py-3 border-b text-left">Quantity</th>
//               <th className="px-4 py-3 border-b text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((food) => (
//               <tr key={food._id} className="hover:bg-orange-50 transition">
//                 <td className="px-4 py-3 border-b">
//                   <img
//                     src={food.food_image}
//                     alt={food.food_name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 </td>
//                 <td className="px-4 py-3 border-b">{food.food_name}</td>
//                 <td className="px-4 py-3 border-b">${food.price}</td>
//                 <td className="px-4 py-3 border-b">{food.quantity}</td>
//                 <td className="px-4 py-3 border-b text-center">
//                   <Link to={`/update_food/${food._id}`}>
//                   <button
//                     className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
//                   >
//                     <FaEdit /> Update
//                   </button>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default MyFoodsList;

import React, { use, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyFoodsList = ({ myaddedFood }) => {
  const data = use(myaddedFood);

  const [singleFood, setSingleFood] = useState(data);

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`${import.meta.env.VITE_API_URL}/delete_food/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount) {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                const remainingTips = singleFood.filter(
                  (food) => food._id !== id
                );
                setSingleFood(remainingTips);
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 mb-6 text-center">
        🍽️ My Added Foods
      </h2>

      {singleFood?.length === 0 ? (
        <p className="text-gray-500 text-center">No food items added yet.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg border border-orange-300">
            <table className="min-w-full dark:bg-dark-black dark:text-white bg-white divide-y divide-orange-200">
              <thead className="bg-orange-100 text-orange-800">
                <tr>
                  <th className="px-4 py-3 text-left text-base font-semibold">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-base font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-base font-semibold">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-base font-semibold">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-center text-base font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100">
                {singleFood.map((food) => (
                  <tr key={food._id} className="hover:bg-orange-50 hover:text-black transition">
                    <td className="px-4 py-3">
                      <img
                        src={food.food_image}
                        alt={food.food_name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    </td>
                    <td className="px-4 py-3">{food.food_name}</td>
                    <td className="px-4 py-3">${food.price}</td>
                    <td className="px-4 py-3">{food.quantity}</td>
                    <td className="px-4 py-3 text-center">
                      {/* <Link to={`/update_food/${food._id}`}>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition">
                          <FaEdit /> Update
                        </button>
                      </Link> */}
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/single_food/${food._id}`}
                          className="dark:bg-black dark:text-white dark:border-white border bg-dark-black text-white p-2 rounded-lg transition"
                        >
                          <FaEye className="text-xl" />
                        </Link>
                        <button
                          onClick={() => handleDelete(food._id)}
                          className="dark:bg-black dark:text-white dark:border-white border bg-dark-black cursor-pointer text-white p-2 rounded-lg transition"
                        >
                          <MdDelete className="text-xl" />
                        </button>
                        <Link
                          to={`/update_food/${food._id}`}
                          className="dark:bg-black dark:text-white dark:border-white border bg-dark-black text-white p-2 rounded-lg transition"
                        >
                          <FaEdit className="text-xl" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {data.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-lg shadow border border-orange-200 p-4 space-y-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-orange-600">
                      {food.food_name}
                    </h3>
                    <p className="text-sm text-gray-700">
                      Price: ${food.price}
                    </p>
                    <p className="text-sm text-gray-700">
                      Quantity: {food.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Link to={`/update_food/${food._id}`}>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-md transition">
                      <FaEdit /> Update
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyFoodsList;
