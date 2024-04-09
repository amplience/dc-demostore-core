import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { init } from 'dc-visualization-sdk';
import DcVisualizationStatic from 'dc-visualization-sdk';

type VisualizationConnectionStatus = 'connecting' | 'connected' | 'failed' | 'reloading';

type VisualizationContextState = {
    status: VisualizationConnectionStatus;
    sdk: typeof DcVisualizationStatic | null;
    formModel: any;
};

const VisualizationContext = createContext<VisualizationContextState | null>(null);

interface WithVisualizationProps extends PropsWithChildren<any> {}

export const useVisualization = () => {
    return useContext(VisualizationContext) as VisualizationContextState;
};

const WithVisualization = (props: WithVisualizationProps) => {
    const [status, setStatus] = useState<VisualizationConnectionStatus>('failed');
    const [sdk, setSDK] = useState<typeof DcVisualizationStatic | null>(null);
    const [formModel, setFormModel] = useState<any>(null);

    useEffect(() => {
        setStatus('connecting');

        let removeChangedSubscription: any = undefined;

        init({ connectionTimeout: 30000, debug: true })
            .then(async (sdk: any) => {
                const value: any = await sdk.form.get();

                removeChangedSubscription = sdk.form.changed((value: any) => {
                    console.log('changed');
                    try {
                        setFormModel(value.content);
                    } catch (error) {}
                });

                sdk.form.saved((value: any) => {
                    window.location.reload();
                });

                sdk.locale.changed((value: any) => {
                    window.location.reload();
                });

                setSDK(sdk);
                setFormModel(value.content);
                setStatus('connected');
            })
            .catch(() => {
                setStatus('failed');
            });

        return () => {
            if (removeChangedSubscription) {
                removeChangedSubscription();
            }
        };
    }, []);

    return (
        <VisualizationContext.Provider value={{ sdk, formModel, status }}>
            {props.children}
        </VisualizationContext.Provider>
    );
};

export function useContent(content: any, vse: string): [any, any | undefined] {
    const { formModel } = useVisualization() || {};
    if (vse === '') {
        return [content, undefined];
    }
    if (formModel && formModel._meta?.deliveryId === content?._meta?.deliveryId) {
        return [formModel, content];
    }
    return [content, undefined];
}

export default WithVisualization;
