import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { Sizes } from './avatar.model';
import {Profile} from '../../profile/component/profile.model';

@Component({
  selector: 'dvtx-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AvatarComponent implements OnInit {
  avatarSizeNumber: number;
  avatarSizeString: string;
  avatarShowTitle: boolean = false;
  avatarButtonCallback: any = null;

  @Input() profile: Profile;

  @Input() set size(size: any) {
    // tslint:disable radix
    this.avatarSizeNumber = parseInt(Sizes[size]);
    this.avatarSizeString = size;
  };

  @Input() set showTitle(showTitle: boolean) {
    this.avatarShowTitle = showTitle;
  };

  @Input() set callbackFn(callbackFn: any) {
    this.avatarButtonCallback = callbackFn;
  };

  constructor() {
  }

  ngOnInit() {
  }

  
}
