import { JsonTree } from "@utils/JsonTree";
import { CmsContext } from '@lib/cms/CmsContext';

type ResolverSpec = {
    filter: (data: any) => boolean;
    apply: (data: any, cmsContext: CmsContext) => Promise<any>;
}

function byContentType(schema: string) {
    return (data: any) => {
        return data && data._meta && data._meta.schema && data._meta.schema === schema;
    }
}

const resolvers: ResolverSpec[] = [];

/**
 * Middleware for injecting extra data into content such as product data
 */
export async function enrichPageContent<T>(content: T, cmsContext: CmsContext): Promise<T> {
    if (content) {
        const visitor = async (node: any) => {
            for (let { filter, apply } of resolvers) {
                if (filter(node)) {
                    await apply(node, cmsContext);
                }
            }
        };
        await visitor(content);
        await JsonTree.asyncVisit(content, visitor);
    }
    return content;
}