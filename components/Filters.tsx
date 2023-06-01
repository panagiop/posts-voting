/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import SortableProperty from './SortableProperty';

export default function Filters({ sortBy }: { sortBy: CallableFunction }) {
    const [sort, setSort] = useState('');

    useEffect(() => {
        sortBy(sort);
    }, [sort]);

    return (
        <nav className="flex text-black w-full px-2 py-2 items-center">
            <ul className="flex w-full">
                <li className="mr-6">Sort by:</li>
                <li className="mr-6">
                    <SortableProperty
                        sort={sort}
                        prop="numberOfLikes"
                        onClick={(sort: string) => setSort(sort)}
                    >
                        Likes
                    </SortableProperty>
                </li>
                <li className="mr-6">
                    <SortableProperty
                        sort={sort}
                        prop="numberOfDislikes"
                        onClick={(sort: string) => setSort(sort)}
                    >
                        Dislikes
                    </SortableProperty>
                </li>
                <li className="mr-6">
                    <SortableProperty
                        sort={sort}
                        prop="createdAt"
                        onClick={(sort: string) => setSort(sort)}
                    >
                        Date
                    </SortableProperty>
                </li>
            </ul>
        </nav>
    );
}
