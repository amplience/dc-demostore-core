import { Theme } from "@mui/material";

const CategoryStyles = (theme: Theme) => ({
    hero: {
        padding: '30px 0px'
    },
    breadcrumb: {
        marginTop: 20
    },
    topComponents: {
        marginBottom: 30
    },
    container: {
        display: 'grid',
        gridColumnGap: 48,
        gridTemplateAreas:
            `"filter listingGrid"`,
        gridTemplateColumns: '1fr 3fr',
        [theme.breakpoints.down('md')]: {
            gridColumnGap: 0,
            gridTemplateColumns: 'auto',
            gridTemplateAreas: `"listingGrid"`
        }
    },
    facets: {
        gridArea: 'filter',

        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    results: {
    },
    header: {
        marginTop: 20,
        marginBottom: 40
    }
});
export default CategoryStyles