import React, { useState } from 'react';
import { useUI } from '../UIContext';
import { useCmsContext } from '@lib/cms/CmsContext';

const LocaleModal = () => {
    const { closeModal } = useUI();

    const { locale: initialLocale, currency: initialCurrency } = useCmsContext();

    const [locale, setLocale] = useState(initialLocale);
    const [currency, setCurrency] = useState(initialCurrency);

    const handleConfirm = () => {
        window.location.href =
            '/locale/' + locale + '/currency/' + currency + '?redirect=' + encodeURIComponent(window.location.href);
    };

    const handleHide = () => {
        closeModal();
    };

    const handleChange = (e: any) => {
        setLocale(e.target.value);
    };

    const handleChangeCurrency = (e: any) => {
        setCurrency(e.target.value);
    };

    return (
        <>
            <h2>Amplience Retail Storefront</h2>

            <div className="af-form">
                <div className="af-form-field">
                    <label role="text">Language</label>
                    <select className="af-select" id="language" value={locale} onChange={handleChange}>
                        <option value="en-US">Select preferred language</option>
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="de-DE">Deutsch</option>
                        <option value="fr-FR">Français</option>
                        <option value="zh-CN">简体中文</option>
                        <option value="ar-AE">العربية</option>
                    </select>
                </div>
            </div>

            <div className="af-form">
                <div className="af-form-field">
                    <label role="text">Currency</label>
                    <select className="af-select" id="currency" value={currency} onChange={handleChangeCurrency}>
                        <option value="USD">Select preferred currency</option>
                        <option value="USD">$ - USD</option>
                        <option value="GBP">£ - GBP</option>
                        <option value="EUR">€ - EUR</option>
                        <option value="CNY">Dhs - AED</option>
                    </select>
                </div>
            </div>

            <div className="af-form">
                <div className="af-form-field">
                    <button className="af-button af-button-dark" onClick={handleConfirm}>
                        Confirm
                    </button>
                    <button className="af-button af-button-light" onClick={handleHide}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default LocaleModal;
