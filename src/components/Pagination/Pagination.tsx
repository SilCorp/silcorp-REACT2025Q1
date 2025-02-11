import './Pagination.css';
import { useMemo } from 'react';
import { range } from '../../utils/range.ts';

type PaginationProps = {
  total: number;
  limit: number;
  page: number;
  onChange: (page: number, offset: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const { total, limit, onChange, page } = props;

  const pageCount = useMemo(() => Math.ceil(total / limit), [limit, total]);

  const handlePageChange = (pageNum: number | 'prev' | 'next') => {
    const newPageMap = {
      prev: page - 1,
      next: page + 1,
    };

    const newPage = typeof pageNum === 'string' ? newPageMap[pageNum] : pageNum;

    onChange(newPage, newPage * limit);
  };

  const isFirstPage = page === 0;
  const isLastPage = page === pageCount - 1;

  return (
    <div className="pagination">
      <button
        className="pagination__button pagination__prev"
        onClick={() => handlePageChange('prev')}
        disabled={isFirstPage}
      >
        {'<'}
      </button>
      {range(0, pageCount, 1).map((pageNum) => {
        const isActive = pageNum === page;
        const activeClass = isActive ? ' pagination__button--active' : '';

        return (
          <button
            key={pageNum}
            className={'pagination__button' + activeClass}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum + 1}
          </button>
        );
      })}
      <button
        className="pagination__button pagination__next"
        onClick={() => handlePageChange('next')}
        disabled={isLastPage}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
