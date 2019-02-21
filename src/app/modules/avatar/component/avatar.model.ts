import {AvatarComponent} from './avatar.component';

export enum Sizes {
  xs = 24,
  sm = 36,
  md = 48,
  lg = 64
}

export interface Avatars {
  xs: AvatarComponent;
  sm: AvatarComponent;
  md: AvatarComponent;
  lg: AvatarComponent;
}
