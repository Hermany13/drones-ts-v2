import queryBuilder from '../src/helpers/QueryBuilder';

test('make an quey with id, page, sort, order, limit', () => {
    expect(queryBuilder('', '2', 'name', 'asc', '10'))
    .toBe('?_page=2&_sort=name&_order=asc&_limit=10');
});

test('make an quey with just id', () => {
    expect(queryBuilder('2'))
    .toBe('/2?');
});