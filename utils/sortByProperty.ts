export default function sortByProperty(prop: any) {    
    return function(a: any, b: any) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }
}