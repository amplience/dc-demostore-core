import React, { FC, useEffect } from 'react';

import { Footer } from '@components/core';
import {
    PreviewToolbar,
    AccountModal,
    LocaleModal,
    useDebug,
} from '@components/ui';
import { useUI } from '@components/ui/UIContext';
import Modal from '@components/ui/Modal';
import trackPageView from '@lib/analytics/trackPageView';
import Sidebar from '@components/ui/Sidebar';
import AdminPanel from '@components/admin/AdminPanel/AdminPanel';
import { Masthead } from '@components/core';
import { WithNavigationContext } from '../Masthead';
import { WithCMSTheme, WithThemesContext } from '../WithCMSTheme';

interface Props {
    pageProps: {
        content: any;
        hierarchies: any;
        ecommerce: any;
    };
}

const Layout: FC<Props> = ({ children, pageProps }) => {
    const { currentModal, closeModal } = useUI();

    const { debugging, setDebugging } = useDebug();

    const handleCloseDebug = () => {
        setDebugging(false);
    };

    useEffect(() => {
        trackPageView();

        if (!window) {
            return;
        }

        const { amp, loryHelpers, shoppableVideo } = window as any || {};
        if (!amp || !loryHelpers) {
            return;
        }

        try {
            loryHelpers.initSliders(document.querySelectorAll('.js_slider'));
            shoppableVideo.init(document.querySelectorAll('.af-shoppable-video'));
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <WithThemesContext themes={pageProps.hierarchies.themes}>
            <WithCMSTheme
                themes={pageProps.hierarchies.themes}
            >
                <WithNavigationContext
                    pages={pageProps.hierarchies.pages}
                    categories={pageProps.ecommerce.categories}
                >
                    <div>
                        {/* <DebugToolbar /> */}
                        <PreviewToolbar />
                        <Masthead />
                        {children}

                        <Footer />
                        <Modal open={currentModal !== 'NONE'} onClose={closeModal}>
                            {currentModal === 'ACCOUNT' && <AccountModal />}
                            {currentModal === 'LOCALE' && <LocaleModal />}
                        </Modal>

                        <Sidebar
                            variant={'left'}
                            open={debugging}
                            onClose={handleCloseDebug}
                        >
                            <AdminPanel />
                        </Sidebar>
                    </div>
                </WithNavigationContext>
            </WithCMSTheme>
        </WithThemesContext>
    );
};

export default Layout;
