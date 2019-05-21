import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Output() onPageChange: EventEmitter<string>  = new EventEmitter<string>();
  @Input() activePage;

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  onSelect(page) {
    this.onPageChange.emit(page);
  }

}

