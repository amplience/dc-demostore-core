import { NavigationItem } from "./NavigationContext";

export default function walkNavigation(
    current: NavigationItem, 
    visitor: (item: NavigationItem, parents: NavigationItem[]) => void,
    parents: NavigationItem[] = []
) {
    visitor(current, parents);
    for (let child of current.children) {
        walkNavigation(child, visitor, [...parents, current]);
    }
}

export function walkNavigationItems(items: NavigationItem[], visitor: (item: NavigationItem, parents: NavigationItem[]) => void) {
    for (let item of items) {
        walkNavigation(item, visitor);
    }
}