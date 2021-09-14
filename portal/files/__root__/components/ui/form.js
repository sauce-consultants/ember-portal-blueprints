import Component from '@glimmer/component';
import { all, task, timeout } from 'ember-concurrency';
import { action } from '@ember/object';

export default class UiFormComponent extends Component {
  // Properties

  // set the false delay any form submit this ensures the user knows
  // that the form is submitting if the actual response is fast
  submitTimeout = 750;

  // Methods

  getArgWithDefault(key, defaultValue) {
    let result = this.args[key];
    if (result === undefined) {
      result = defaultValue;
    }
    return result;
  }

  // Actions

  @action submit(event) {
    event.preventDefault();
    if (!this.args.disabled) {
      this.submitTask.perform();
    }
  }

  // Tasks

  @task(function* () {
    // Grab actions from arguments but default to empty functions
    const onSubmit = this.getArgWithDefault('onSubmit', () => {}),
      afterSubmit = this.getArgWithDefault('afterSubmit', () => {});

    // Add a small artificial delay on from submission
    // to give the user a better experience
    yield all([timeout(this.submitTimeout), onSubmit()]);

    // If the onSubmit task throws an error this code will not execute
    // for example if there was a validation error.

    yield afterSubmit();
  })
  submitTask;
}
