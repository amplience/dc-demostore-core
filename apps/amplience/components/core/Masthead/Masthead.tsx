import React, { FC, useMemo } from 'react'
import { useUI, useDebug } from '@components/ui';
import { useNavigation } from './NavigationContext';
import Navigation, {NavigationToggle, NavigationToggleState} from '@components/cms-modern/Navigation'
import Link from 'next/link';
import withConfig from '@components/core/Config/withConfig';
import { CmsImage, getImageURL, ImageFormat } from '@utils/getImageURL';
import { useCmsContext } from '@lib/cms/CmsContext';
import getSymbolFromCurrency from 'currency-symbol-map'

import AE from '@components/icons/Flags/AE';
import CN from '@components/icons/Flags/CN';
import DE from '@components/icons/Flags/DE';
import FR from '@components/icons/Flags/FR';
import US from '@components/icons/Flags/US';
import UK from '@components/icons/Flags/UK';

interface Props {
    variant?: 'default' | 'pride' | 'holiday';
    logo?: CmsImage;
    navigationBackgroundColor?: string;
}

const Masthead: FC<Props> = ({ children, variant = 'default', logo, navigationBackgroundColor }) => {
    
    const {
        openModal
    } = useUI();

    const {
        locale = 'en-US',
        currency = 'USD'
    } = useCmsContext();

    const { rootItems } = useNavigation();

    const {
        debugging,
        setDebugging
    } = useDebug();

    const handleShowLocaleModal = () => {
        openModal('LOCALE');
    };

    const handleShowAccountModal = () => {
        openModal('ACCOUNT');
    };

    const handleToggleDebug = () => {
        setDebugging(!debugging);
    };

    const localeSettings = useMemo(() => {
        switch (locale) {
            case 'en-GB':
                return {
                    Flag: UK,
                    currency: '£GBP',
                    label: 'United Kingdom'
                };
            case 'fr-FR':
                return {
                    Flag: FR,
                    currency: '€EUR',
                    label: 'Français'
                };
            case 'de-DE':
                return {
                    Flag: DE,
                    currency: '€EUR',
                    label: 'Deutschland'
                };
            case 'zh-CN':
                return {
                    Flag: CN,
                    currency: '¥CNY',
                    label: '中国'
                };
            case 'ar-AE':
                return {
                    Flag: AE,
                    currency: 'AED',
                    label: 'الإمارات العربية المتحدة'
                };
        }
        return {
            Flag: US,
            currency: '$USD',
            label: 'United States'
        };
    }, [locale]);

    const {
        Flag,
        currency: localeCurrency,
        label: localeLabel
    } = localeSettings;

    return (
        <NavigationToggleState>
            <a id="top" />
            <section className="af-banner-top">
                { locale === "de-DE" ? 'Profitieren Sie von 10% Rabatt auf Ihren ersten Einkauf mit dem Code FIRST10 an der Kasse - es gelten die AGB'
                    : 'Enjoy 10% off your first purchase using code FIRST10 at checkout - T&Cs apply' }
            </section>
            <section className="af-banner">
              <section className="af-banner__currency-selector">
                <span onClick={handleShowLocaleModal}>
                    <Flag className="af-banner__country-flag" /> {localeLabel} - {getSymbolFromCurrency(currency)}{currency}
                </span>
              </section>
                <NavigationToggle/>
                <div className={logo ? "af-banner__customLogo" : "af-banner__logo"}>
                    <Link href="/">
                        <a>
                            {
                                logo ? (
                                    <img alt="" src={getImageURL(logo, { format: ImageFormat.PNG })} />
                                ) : (
                                    <img alt="" src="/images/AnyaFinn-Logo.svg" />
                                )
                            }
                        </a>
                    </Link>
                </div>
                <div className="af-banner__account-options">
                    <span>
                        <a href="#" className="af-banner__account-option-icon af-banner__account-option-icon--locator">
                            <Link href="/store" passHref>
                                    <img src="/images/store.svg" alt="store" />
                            </Link>
                        </a>
                    </span>
                    <a href="#" className="af-banner__account-option-icon af-banner__account-option-icon--locator" onClick={handleShowLocaleModal}>
                        <img src="https://dcdemo.a.bigcontent.io/v1/static/af-locator" alt="locale" />
                    </a>
                    <a href="#" className="af-banner__account-option-icon af-banner__account-option-icon--account" onClick={handleShowAccountModal}>
                        <img src="https://dcdemo.a.bigcontent.io/v1/static/af-account" alt="account" />
                    </a>
                    <a href="#" className="af-banner__account-option-icon af-banner__account-option-icon--cart" onClick={handleToggleDebug}>
                        <img src="https://dcdemo.a.bigcontent.io/v1/static/af-cart" alt="cart" />
                    </a>
                </div>
            </section>
            <Navigation style={{backgroundColor: navigationBackgroundColor}} pages={rootItems}></Navigation>
        </NavigationToggleState>
    );
}

export default withConfig('masthead')(Masthead);