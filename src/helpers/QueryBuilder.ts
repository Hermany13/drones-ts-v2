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
    page ? query = query + `_page=${page}` : '';
    page ? query = query + `&_sort=${sort}` : '';
    page ? query = query + `&_order=${order}` : '';
    page ? query = query + `&_limit=${limit}` : '';
    return query;
}

export default queryBuilder;