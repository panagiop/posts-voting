import { ReactNode } from 'react';
import ArrowDownIcon from './ArrowDownIcon';

export default function SortableProperty({
    sort,
    prop,
    onClick,
    children
}: {
    sort: string;
    prop: string;
    onClick: CallableFunction;
    children: ReactNode;
}) {
    let [sortProp, desc] = sort?.split(':') ?? [];
    let newSort: string | null;

    if (sortProp !== prop) {
        newSort = prop;
    } else if (sortProp === sort && !desc) {
        newSort = `${prop}:desc`;
    } else {
        newSort = null;
    }

    return (
        <button
            type="button"
            className="inline-flex group"
            onClick={() => onClick(newSort)}
        >
            {children}
            <span
                className={`${
                    sortProp === prop
                        ? 'text-gray-900 bg-gray-200 group-hover:bg-gray-300'
                        : 'invisible group-hover:visible'
                } px-[2px] py-[2px] ml-2 rounded`}
            >
                <ArrowDownIcon className={`${desc ? 'rotate-180' : ''}`} />
            </span>
        </button>
    );
}
