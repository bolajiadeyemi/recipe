import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private ingredientAddedSub: Subscription;
  // ingredients

  constructor(
    private shoppingListService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{ shoppinglist: { ingredients: Ingredient[] } }> // type of what the state yields
  ) {}

  ngOnInit() {
    /*
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientAddedSub = this.shoppingListService.ingredientAdded.subscribe(
      ingredients => {
        this.ingredients = ingredients;
      }
    );
*/
    this.ingredients = this.store.select('shoppinglist');

    this.loggingService.printLog('Hello from ShoppingListComponent');
  }

  ngOnDestroy(): void {
    if (this.ingredientAddedSub) {
      this.ingredientAddedSub.unsubscribe();
    }
  }

  onEditItem(index) {
    this.shoppingListService.startedEditing.next(index);
  }
}
