import { ViewContainerRef, Injector, ComponentFactoryResolver, ElementRef } from '@angular/core';

/** Interface that can be used to generically type a class. */
export interface ComponentType<T> {
  new (...args: any[]): T;
}

export class RiftConfig<C> {

  riftClass?: string | string[] = '';

  hasBackdrop?: boolean = false;

  backdropClass?: string | string[] = 'rift-backdrop';

  minWidth?: number | string;

  minHeight?: number | string;

  maxWidth?: number | string;

  maxHeight?: number | string;

  width?: number | string;

  height?: number | string;

  data?:any;

  // for component creation
  component: ComponentType<C>;
  viewContainerRef?: ViewContainerRef | null;
  elRef:ElementRef | null;
  injector?: Injector | null;
  componentFactoryResolver?: ComponentFactoryResolver | null;

  constructor(config?: RiftConfig<any>) {
    if (config) {
      Object.keys(config).forEach(k => {      
        if (config[k]) {
          this[k] = config[k];
        }
      });
    }
  }

}
