import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredientIndex: number;
  editedIngredient: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredientIndex: -1,
  editedIngredient: null
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ig, index) => index !== state.editedIngredientIndex
        )
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: state.ingredients[action.payload]
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.map((ig, index) => {
          if (index === state.editedIngredientIndex) {
            return {
              ...ig,
              ...action.payload
            };
          }
          return ig;
        })
      };

    default:
      return state;
  }
}
