import React from 'react';
import { Link } from 'gatsby';
import { merge } from 'lodash';

const Pagination = (props) => {
  const defaults = {
    page: 0,
    pages: 0,
    prev: 0,
    next: 0,
    total: 0,
    prevText: '<< Previous',
    nextText: 'Next >>'
  };

  const myProps = merge({}, defaults, props);

  if(myProps.pages > 1) {
    return (
      <ul className="pagination">
        <li><Link to={myProps.prev} className={`button small ${myProps.page === 1 ? 'disabled' : ''}`}>{myProps.prevText}</Link></li>
        <li><span>Page { myProps.page } of  { myProps.pages }</span></li>
        <li><Link to={myProps.next} className={`button small ${myProps.page === myProps.pages && 'disabled'}`}>{myProps.nextText}</Link></li>
      </ul>
    )
  }
  return null;
}

export default Pagination;