import React, { useState } from 'react';
import { useUI } from '../UIContext';
import { useUserContext } from '@lib/user/UserContext';
import { CustomerGroup } from '@amplience/dc-integration-middleware';

interface AccountModalProps {
    segments?: CustomerGroup[];
}

const AccountModal = ({ segments }: AccountModalProps) => {
    const { closeModal } = useUI();

    const { segment: initialSegment } = useUserContext();
    const [segment, setSegment] = useState(initialSegment);

    const handleLogin = () => {
        if (segment == 'guest') {
            window.location.href = '/account/logout?redirect=' + encodeURIComponent(window.location.href);
        } else {
            window.location.href =
                '/account/login?username=' +
                encodeURIComponent(segment as string) +
                '&redirect=' +
                encodeURIComponent(window.location.href);
        }
    };

    const handleHide = () => {
        closeModal();
    };

    const handleChangeSegment = (e: any) => {
        setSegment(e.target.value);
    };

    return (
        <>
            <h2>Sign In</h2>
            <div className="af-form-field">
                <label role="text">Username</label>
                <select className="af-select" id="username" value={segment || undefined} onChange={handleChangeSegment}>
                    <option value=""></option>
                    {segments?.map((segment: any, i: number) => {
                        return (
                            <option key={i} value={segment.id}>
                                {segment.name}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div className="af-form-field">
                <label role="text">Password</label>
                <input id="password" type="password" className="af-input" value="password" readOnly />
            </div>

            <div className="af-form-field">
                <button className="af-button af-button-dark" onClick={handleLogin}>
                    Sign In
                </button>
                <button className="af-button af-button-light" onClick={handleHide}>
                    Cancel
                </button>
            </div>

            <hr />

            <label role="text">Don’t have an account?</label>
            <div className="af-form-field">
                <button className="af-button af-button-light" onClick={handleHide}>
                    Create an account
                </button>
            </div>
        </>
    );
};

export default AccountModal;
