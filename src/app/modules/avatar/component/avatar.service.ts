import { Injectable, ComponentFactoryResolver, Injector } from '@angular/core';
import { AvatarComponent } from './avatar.component';
import { Profile } from './../../profile/component/profile.model';

@Injectable()
export class AvatarService {
  constructor(private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  /**
   * Get an Avatar in native HTML content.
   *
   * @param {Profile} profile The user profile object.
   * @param {string} size of the avatar.
   * @param {Function} [options] callbackFn function for clicking on the avatar.
   * @param {boolean} [optional] showTitle show user name next to the avatar
   * 
   * 
   * @memberOf AvatarService
   */
  get(profile: Profile, size: string, callbackFn?: any, showTitle?: boolean) {
    const factory = this.resolver.resolveComponentFactory(AvatarComponent);
    const componentRef = factory.create(this.injector);
    componentRef.instance.profile = profile;
    componentRef.instance.size = size;
    componentRef.instance.callbackFn = callbackFn;
    componentRef.instance.showTitle = showTitle;
    componentRef.hostView.detectChanges();
    const { nativeElement } = componentRef.location;
    return nativeElement;
  }

}
