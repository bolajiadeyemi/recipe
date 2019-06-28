import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {DataStorageService} from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Output() onPageChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() activePage;

  constructor(private router: Router, private dataStorageService: DataStorageService) {

  }

  ngOnInit() {
  }

  onSelect(page) {
    this.onPageChange.emit(page);
  }

  onSaveData() {
    this.dataStorageService.saveRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe( );
  }

}

