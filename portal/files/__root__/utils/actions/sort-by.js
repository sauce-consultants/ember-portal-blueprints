export default function sortBy(controller, attribute) {
  let sort = controller.sort;
  if (sort === attribute) {
    attribute = `-${sort}`;
  }
  controller.transitionToRoute({
    queryParams: {
      sort: attribute
    }
  });
  controller.set("page", 1);
}