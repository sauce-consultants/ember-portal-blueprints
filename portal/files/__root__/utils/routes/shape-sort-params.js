export default function shapeSortParams(params) {
  let sort = params.sort;
  delete params.sort;
  return sort;
}