import React from 'react';
import '../styles/main.scss';
import '../styles/preview-typography.scss';

import { Head } from '@components/core';
import { WithUI, WithDebugState } from '@components/ui';
import { WithCmsContext } from '@lib/cms/CmsContext';
import WithCart from '@components/cart/CartContext';
import { WithUserContext } from '@lib/user/UserContext';

import { WithLazyAppContext } from '@lib/config/AppContext'

let contentApi = `${getHubName()}.cdn.content.amplience.net`

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true, hideNoControlsWarning: true }
};

window.isStorybook = true
export const decorators = [ 
  (Story) => (
    <>
      <Head />
      <WithDebugState>
        <WithLazyAppContext>
          <WithCmsContext value={{ contentApi }}>
            <WithCart>
              <WithUserContext value={{
                language: 'en',
                country: 'US',
                engines: {},
              }}>
                <WithUI>
                  <Story />
                </WithUI>
              </WithUserContext>
            </WithCart>
          </WithCmsContext>
        </WithLazyAppContext>
      </WithDebugState>
    </>
  )
];