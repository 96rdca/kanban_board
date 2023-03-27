/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const cssStyle = {
    app: css({
        textAlign: 'center',
        backgroundColor: '#6699CC',
        minHeight: '100vh',
        minWidth: '100vw'
    }),
    header: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        //   fontSize: 'calc(10px + 1vmin)',
    }),
    divColumns: css({
        display: 'flex',
        columns: 3,
        padding: '1rem',
        flex: 1,
        // backgroundColor: '#c1d5e0'
    }),
    divColum: css({ flex: 1, minHeight: '70vh', minWidth: '30vw' })
}

const SkeletonCard = () => (
    <Skeleton height='20vh' width='30vw'/>
);

export default SkeletonCard;