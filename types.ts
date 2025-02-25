interface Ingredient {
    name: string;
    amount: string;
  }
  
  interface Nutrition {
    calories: number;
    proteins: string;
    carbs: string;
    fats: string;
  }
  
  interface Recipe {
    name: string;
    category: "Desayuno" | "Almuerzo" | "Cena" | "Postre";
    prepTime: string;
    cookTime: string;
    servings: number;
    ingredients: Ingredient[];
    instructions: string[];
    nutrition: Nutrition;
  }
  