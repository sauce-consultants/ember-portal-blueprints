export default function paginate(controller, props) {
  controller.transitionToRoute({
    queryParams: props
  });
}