const queryBuilder = (
    id: string = '',
    page: string = '',
    sort: string = '',
    order: string = '',
    limit: string = '7'
    ) => {

    let query = '';

    id ? query = query + `/${id}` : '';
    query = query + '?';
    query = query + `_page=${page}`;
    query = query + `&_sort=${sort}`;
    query = query + `&_order=${order}`;
    query = query + `&_limit=${limit}`;
    return query;
}

export default queryBuilder;