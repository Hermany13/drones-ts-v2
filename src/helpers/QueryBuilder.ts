const queryBuilder = (id: string = '', page: string = '', sort: string = '', order: string = '') => {
    let query = '';

    id ? query = query + `/${id}` : '';
    query = query + '?';
    page ? query = query + `_page=${page}` : '';
    sort ? query = query + `&_sort=${sort}` : '';
    order ? query = query + `&_order=${order}` : '';

    return query;
}

export default queryBuilder;