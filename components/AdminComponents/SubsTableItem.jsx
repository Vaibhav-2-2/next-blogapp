import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import 'react-toastify/dist/ReactToastify.css';

const SubsTableItem = ({ email, mongoId, deleteEmail, date }) => {
  const emailDate = new Date(date);

  return (
    <tr className="bg-white border-b text-left">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {email ? email : "No Email"}
      </th>
      <td className="px-6 py-4 hidden sm:block">
        {emailDate.toDateString()}
      </td>
      <td className="px-6 py-4 cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out" onClick={() => deleteEmail(mongoId)}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </td>
    </tr>
  );
};

export default SubsTableItem;
