import { Injectable } from '@angular/core';
import { OperatorsHeaderConfig } from '../components/operators-header/operators-header.component';
import { BlockDataHelperService } from './block-data-helper.service';

export enum OperatorRouterNames {
  FORK_JOIN = '/operators/fork-join',
  WITH_LATEST_FROM = '/operators/with-latest-from',
}

@Injectable()
export class HeaderOperatorsDataService {
  constructor(private productService: BlockDataHelperService) {}

  getConfiguration(name: OperatorRouterNames) {
    switch (name) {
      case OperatorRouterNames.WITH_LATEST_FROM:
        return this.withLatestFromConfig();
      case OperatorRouterNames.FORK_JOIN:
        return this.forkJoinConfig();
      default:
        return null;
    }
  }

  private withLatestFromConfig() {
    return {
      info: 'Combines the source Observable with other Observables to create an Observable whose values are calculated from the latest values of each, only when the source emits.',
      title: 'withLatestFrom',
      buttons: [
        {
          name: 'Source',
          callback: () => {
            this.productService.emitFirst();
          },
        },
        {
          name: 'Inner',
          callback: () => {
            this.productService.emitSecond();
          },
        },
      ],
    };
  }

  private forkJoinConfig(): OperatorsHeaderConfig {
    return {
      info: 'This operator is best used when you have a group of observables and only care about the final emitted value of each. One common use case for this is if you wish to issue multiple requests on page load (or some other event) and only want to take action when a response has been received for all.',
      title: 'forkJoin',
      buttons: [
        {
          name: 'Product 1',
          callback: () => {
            this.productService.emitFirst();
          },
        },
        {
          name: 'Product 2',
          callback: () => {
            this.productService.emitSecond();
          },
        },
        {
          name: 'Product 3',
          callback: () => {
            this.productService.emitThird();
          },
        },
      ],
    };
  }
}
