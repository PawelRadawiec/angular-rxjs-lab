import { Injectable } from '@angular/core';
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
}
