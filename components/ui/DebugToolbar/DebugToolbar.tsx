import React, { PropsWithChildren } from 'react';
import s from './DebugToolbar.module.css';
import clsx from 'clsx';
import { useDebug } from './DebugContext';

const DebugToolbar = () => {
    const { debugging, showSlots, setShowSlots, showContent, setShowContent, showEditions, setShowEditions } =
        useDebug();

    if (!debugging) {
        return null;
    }

    const toggleShowSlots = () => {
        setShowSlots(!showSlots);
    };

    const toggleShowContent = () => {
        setShowContent(!showContent);
    };

    const toggleShowEditions = () => {
        setShowEditions(!showEditions);
    };

    return (
        <div className={clsx(s.root, 'alert alert-secondary')}>
            <div className={s.controls}>
                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="showSlots"
                        checked={showSlots}
                        onChange={toggleShowSlots}
                    />
                    <label className="custom-control-label" htmlFor="showSlots">
                        Show Slots
                    </label>
                </div>

                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="showContent"
                        checked={showContent}
                        onChange={toggleShowContent}
                    />
                    <label className="custom-control-label" htmlFor="showContent">
                        Show Content
                    </label>
                </div>

                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="showEditions"
                        checked={showEditions}
                        onChange={toggleShowEditions}
                    />
                    <label className="custom-control-label" htmlFor="showEditions">
                        Show Editions
                    </label>
                </div>
            </div>
        </div>
    );
};

export default DebugToolbar;
