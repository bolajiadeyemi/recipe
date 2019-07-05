import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';

export const ADD_INGREDIENT = '[Shopping-list] ADD_INGREDIENT';
export const DELETE_INGREDIENT = '[Shopping-list] DELETE_INGREDIENT';
export const START_EDIT = '[Shopping-list] START_EDIT';
export const STOP_EDIT = '[Shopping-list] STOP_EDIT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;

  constructor() {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: { index: number }) {}
}

export class StopEdit {
  readonly type = STOP_EDIT;

  constructor() {}
}

export type ShoppingListActions =
  | AddIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
