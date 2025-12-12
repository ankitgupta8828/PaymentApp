import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
