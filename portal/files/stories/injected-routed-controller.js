import Controller from '@ember/controller';
import {getOwner} from '@ember/application';
import {on} from '@ember/object/evented';

function injectRoutedController(controllerClass) {
  return on('init', function () {
    const container = getOwner(this);

    container.register('controller:app', controllerClass);

    const routerFactory = container.factoryFor('router:main');
    routerFactory.class.map(function () {
      this.route('storybook');
    });

    const router = container.lookup('router:main');
    router.initialURL = 'storybook';
    router.startRouting(true);

    this.set('controller', container.lookup('controller:storybook'));
  });
}
export default function injectedRoutedController() {
  return injectRoutedController(
    Controller.extend({
      queryParams: ['currentPage'],
      currentPage: 1,
    }),
  );
}
