import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config()

const client = new OpenAI({
  apiKey: process.env.OPENAI_SECRET,
});

const openAI = async (arrayOfIngredients: string[]) => {
  try {
    const prompt = `Genera una o más (tres en lo posible) recetas posibles utilizando únicamente los siguientes ingredientes: ${arrayOfIngredients.join(", ")}. 

La respuesta debe ser un array con cada receta dentro de él, en el siguiente formato JSON **válido**:

[
  {
    "name": "Nombre de la receta",
    "category": "Categoría de la receta (Desayuno, Almuerzo, Cena, Postre)",
    "prepTime": "Tiempo estimado de preparación (ejemplo: 10 min)",
    "cookTime": "Tiempo estimado de cocción (ejemplo: 20 min)",
    "servings": Número de porciones que rinde la receta,
    "ingredients": [
      { "name": "Nombre del ingrediente", "amount": "Cantidad y unidad (ejemplo: 200g, 1 taza, 2 unidades)" }
    ],
    "instructions": [
      "Paso 1 detallado de la preparación.",
      "Paso 2 detallado de la preparación.",
      "Paso 3 detallado de la preparación."
    ],
    "nutrition": {
      "calories": Cantidad de calorías por porción (ejemplo: 350),
      "proteins": "Cantidad de proteínas por porción (ejemplo: 8g)",
      "carbs": "Cantidad de carbohidratos por porción (ejemplo: 50g)",
      "fats": "Cantidad de grasas por porción (ejemplo: 15g)"
    }
  }
]

Asegúrate de que:
- La respuesta sea un **JSON válido** sin ningún otro texto adicional.
- Las instrucciones sean claras, detalladas y con un lenguaje sencillo.
- Los tiempos y porciones sean realistas en función de los ingredientes disponibles.
- La información nutricional esté bien balanceada según los ingredientes usados.
`
    const clientCompletion = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "chatgpt-4o-latest",
    });

    let responseText = clientCompletion.choices[0].message.content as string;
    responseText = responseText.replace(/```json|```/g, "").trim();
    return JSON.parse(responseText);
  } catch (error) {
    throw error;
  }
};

export default openAI
