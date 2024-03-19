import React from 'react';
import s from './PreviewToolbar.module.css';
import clsx from 'clsx';
import Moment from 'react-moment';
import { useCmsContext } from '@lib/cms/CmsContext';
import { Calendar } from '@components/icons';
import Link from 'next/link';

const PreviewToolbar = () => {
    const { timestamp, stagingApi } = useCmsContext() || {};

    if (!timestamp || !stagingApi) {
        return null;
    }

    return (
        <div className={clsx(s.root, 'alert alert-danger')}>
            <div className={s.info}>
                {timestamp ? (
                    <>
                        <Calendar />
                        Currently previewing: <Moment format="YYYY/MM/DD, h:mm:ss a">{Number(timestamp)}</Moment>
                    </>
                ) : (
                    <>
                        <Calendar /> Currently previewing: Quick Preview mode
                    </>
                )}
            </div>
            <div className={s.controls}>
                <Link href="/current">
                    <button type="button" className="btn btn-outline-danger btn-sm">
                        View Current
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PreviewToolbar;
