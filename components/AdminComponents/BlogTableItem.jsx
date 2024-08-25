import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React from 'react';
import { asserts } from '@/assets/assets'; // Ensure this path is correct

const BlogTableItem = ({ author_img, title, author, date, deleteBlog, mongoId }) => {
  // Ensure date is parsed and displayed correctly
  const blogDate = new Date(date);
  const formattedDate = blogDate.toDateString() !== 'Invalid Date' ? blogDate.toDateString() : 'No Date Available';

  return (
    <tr className='bg-white border-b'>
      <th scope='row' className='flex items-center gap-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        <Image
          width={40}
          height={40}
          src={author_img ? author_img : asserts.logo}
          alt='Author Image'
          className='rounded-full'
        />
        <p>{author || 'No author'}</p>
      </th>
      <td className='px-6 py-4'>
        {title || 'No title'}
      </td>
      <td className='px-6 py-4'>
        {formattedDate}
      </td>
      <td className='px-6 py-4 cursor-pointer text-red-600 hover:text-red-800' onClick={() => deleteBlog(mongoId)}>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

export default BlogTableItem;
