'use client';

import React from 'react';
import { Hydrate as RQHydrate, HydrateProps } from '@tanstack/react-query';

function Hydrate(props: HydrateProps) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <RQHydrate {...props} />;
}

export default Hydrate;
