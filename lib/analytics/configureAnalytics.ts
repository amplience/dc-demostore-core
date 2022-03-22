let enabled = false
export function configureAnalytics() {
    let global = (window as any);
    if (global && enabled && !global.GA_INITIALIZED) {
        // TODO: Initialize React GA
        global.GA_INITIALIZED = true;
    }
}