export default function shapePageParams(params) {
  // create page object to define pagination
  const page = {
    number: params.page,
    size: params.size
  };

  // remove properties from function param
  delete params.page;
  delete params.size;

  return page;
}