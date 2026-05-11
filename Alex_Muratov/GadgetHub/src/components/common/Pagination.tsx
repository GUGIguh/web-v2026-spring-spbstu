import RightArrowIcon from "../../icons/RightArrowIcon";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import {JSX} from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const SIBLINGS = 1;

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    let start = Math.max(1, currentPage - SIBLINGS);
    let end = Math.min(totalPages, currentPage + SIBLINGS);

    if (currentPage <= SIBLINGS + 1) {
        end = Math.min(SIBLINGS * 2 + 1, totalPages);
    }
    if (currentPage >= totalPages - SIBLINGS) {
        start = Math.max(1, totalPages - SIBLINGS * 2);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center gap-2 my-20">
            <ArrowBtn
                direction={<LeftArrowIcon/>}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            />

            {start > 1 && (
                <>
                    <PageBtn page={1} current={currentPage} onClick={onPageChange} />
                    {start > 2 && <span className="px-1 text-gray-400">...</span>}
                </>
            )}

            {pages.map((page) => (
                <PageBtn key={page} page={page} current={currentPage} onClick={onPageChange} />
            ))}

            {end < totalPages && (
                <>
                    {end < totalPages - 1 && <span className="px-1 text-gray-400">...</span>}
                    <PageBtn page={totalPages} current={currentPage} onClick={onPageChange} />
                </>
            )}

            <ArrowBtn
                direction={<RightArrowIcon/>}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            />
        </div>
    );
}

function PageBtn({ page, current, onClick }: { page: number; current: number; onClick: (p: number) => void }) {
    return (
        <button
            onClick={() => onClick(page)}
            className={`w-10 h-10 font-medium transition-colors rounded-full
                ${page === current
                ? "bg-blue-def text-white "
                : "text-blue-def hover:text-white hover:bg-blue-dis"
            }`}
        >
            {page}
        </button>
    );
}

function ArrowBtn({ direction, disabled, onClick }: { direction: JSX.Element; disabled: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex justify-center items-center w-10 h-10 text-blue-def disabled:hidden hover:cursor-pointer hover:bg-gray-2 hover:rounded-full"
        >
            {direction}
        </button>
    );
}