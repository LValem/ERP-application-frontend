import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination">
            <button
                onClick={() => {
                    if (currentPage > 0) {
                        onPageChange(currentPage - 1);
                    }
                }}
                disabled={currentPage === 0}
            >
                Previous
            </button>
            <button
                onClick={() => {
                    if (currentPage + 1 < totalPages) {
                        onPageChange(currentPage + 1);
                    }
                }}
                disabled={currentPage + 1 >= totalPages}
            >
                Next
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
